
import {merge as observableMerge, combineLatest,  timer } from 'rxjs';

import {take, filter, startWith, skipUntil} from 'rxjs/operators';
//#region imports
import { Component } from '@angular/core';
import { IDialogFrameElement } from 'app/interfaces-shared/idialog-frame-element';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { App } from 'app/core/app';
import { Template } from 'app/template-picker/template';
import { ContentType } from 'app/template-picker/content-type';
import { IIFrameBridge } from 'app/interfaces-shared/iiframe-bridge';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { cAppActionImport } from './constants';
import { log as parentLog } from 'app/core/log';
import { PickerService } from './picker.service';
import { CurrentDataService } from './current-data.service';
import { DebugConfig } from 'app/debug-config';

//#endregion

const log = parentLog.subLog('picker', DebugConfig.picker);

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
})
export class TemplatePickerComponent {
  // #region properties
  /** Stream of all apps */
  apps$: Observable<App[]>;

  /** is cancelling possible */
  showCancel = true;

  /** is in the main content-app or a generic app */
  isContent: boolean;

  /** show advanced features (admin/host only) */
  showAdvanced = false;

  /** show the installer */
  showInstaller = false;

  /** Stream to indicate ready, for loading-indicator */
  ready$: Observable<boolean>;
  templatesLoading$: Observable<boolean>;

  /** Tab-id, when we set it, the tab switches */
  tabIndex = 0;

  /** Indicate if the user is allowed to change content-types or not */
  preventTypeSwitch: boolean;

  /** Indicates whether the installer can be shown in this dialog or not */
  isBadContextForInstaller = false;

  /** The communication-object to the parent */
  private bridge: IIFrameBridge;

  /** internal loading state */
  private loading = new BehaviorSubject<boolean>(false);

  /** Ajax-support changes how saving/changing is handled */
  private supportsAjax: boolean;

  private preventAppSwich = false;

  public showDebug = DebugConfig.showInUi;
  // #endregion

  // #region data to show - using local variables, because streams didn't update correctly :(
  app: App;
  templates: Template[];
  template: Template;
  contentType: ContentType;
  types: ContentType[];
  //#endregion

  constructor(
    private api: PickerService,
    public state: CurrentDataService
  ) {
    // get configuration from iframe-bridge and set everything
    this.bridge = (<IDialogFrameElement>window.frameElement).bridge;
    const dashInfo = this.bridge.getAdditionalDashboardConfig();

    this.showDebug = dashInfo.debug;

    // start data-loading
    this.api.initLoading(!dashInfo.isContent);

    // init parts, variables, observables
    const initDone$ = this.state.init(dashInfo);

    this.initObservables(initDone$);
    this.initValuesFromBridge(dashInfo);
    this.transferObservablesToLocalToEnsureUiUpdates();
    this.debugStreams();
  }

  /**
   * wire up observables for this component
   */
  private initObservables(initDone$: Observable<boolean>): void {
    const initTrue$ = initDone$.pipe(filter(t => t));

    // wire up basic observables
    this.ready$ = combineLatest(
      this.api.ready$,
      this.loading.asObservable(),
      (r, l) => r && !l);

    // all apps are the same as provided by the api
    this.apps$ = this.api.apps$;

    // if the content-type or app is set, switch tabs (ignore null/empty states)
    const typeOrAppReady = observableMerge(this.state.type$, this.state.app$).pipe(filter(t => !!t));
    combineLatest(typeOrAppReady, initTrue$).subscribe(_ => this.switchTab());

    // once the data is known, check if installer is needed
    combineLatest(this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$,
      this.api.ready$.pipe(filter(r => !!r)),
      (templates, c, apps) => {
        log.add('apps/templates loaded, will check if we should show installer')
      this.showInstaller = this.isContent
        ? templates.length === 0
        : apps.filter(a => a.appId !== cAppActionImport).length === 0;
    }).subscribe();

    // template loading is true, when the template-list or selected template are not ready
    this.templatesLoading$ = combineLatest(
      this.state.templates$,
      this.state.template$,
      (all, selected) => !(all && selected)).pipe(
      startWith(false));

    // whenever the template changes, ensure the preview reloads
    // but don't do this when initializing, that's why we listen to initDone$
    this.state.template$.pipe(
      filter(t => !!t),
      skipUntil(initTrue$),)
      .subscribe(t => this.previewTemplate(t));
  }

  transferObservablesToLocalToEnsureUiUpdates(): any {
    this.state.app$.subscribe(a => this.app = a);
    this.state.templates$.subscribe(t => this.templates = t);
    this.state.template$.subscribe(t => this.template = t);
    this.state.types$.subscribe(t => this.types = t);
    this.state.type$.subscribe(t => this.contentType = t);

    this.state.types$.subscribe(t => log.add('type update: ', t));
  }

  private debugStreams() {

  }



  private initValuesFromBridge(config: IQuickDialogConfig): void {
    this.preventTypeSwitch = config.hasContent;
    this.isBadContextForInstaller = config.isInnerContent;
    this.isContent = config.isContent;
    this.supportsAjax = this.isContent || config.supportsAjax;
    this.showAdvanced = config.user.canDesign;
    this.preventAppSwich = config.hasContent;
    this.showCancel = config.templateId != null;
  }

  private updateConfigAfterAppChange(config: IQuickDialogConfig): void {
    this.showCancel = config.templateId != null;
  }

  //#region basic UI action binding
  cancel(): void { this.bridge.cancel(); }

  run(action: string): void { this.bridge.run(action); }

  persistTemplate(template: Template) { this.bridge.setTemplate(template.TemplateId, template.Name, true); }

  /**
   * app selection from UI
   */
  selectApp(before: App, after: App): void {
    console.log('selectApp()');
    if (before && before.appId === after.appId) this.switchTab();
    else this.updateApp(after);
  }

  /**
   * content-type selection from UI
   */
  selectContentType(before: ContentType, after: ContentType): void {
    if (before && before.StaticName === after.StaticName) this.switchTab();
    else this.setContentType(after);
  }

  /**
   * activate a template from the UI
   */
  selectTemplate(template: Template): void {
    this.state.activateTemplate(template);
  }
  //#endregion

  private setContentType(contentType: ContentType): void {
    log.add(`select content-type '${contentType.Name}'; prevent: ${this.preventTypeSwitch}`);
    if (this.preventTypeSwitch) return;
    this.state.activateType(contentType);
  }

  switchTab() {
    log.add('switchTab()');
    // must delay change because of a bug in the tabs-updating
    timer(100).pipe(take(1)).subscribe(_ => this.tabIndex = 1);
  }


  private updateApp(newApp: App): void {
    // ajax-support can change as apps are changed; for ajax, maybe both the previous and new must support it
    // or just new? still WIP
    const ajax = /* this.supportsAjax && */ newApp.supportsAjaxReload;
    log.add(`changing app to ${newApp.appId}; prevent-switch: ${this.preventAppSwich} use-ajax:${ajax}`);
    if (this.preventAppSwich) return;

    this.supportsAjax = ajax;
    this.state.activateCurrentApp(newApp.appId);

    const save = this.api.saveAppId(newApp.appId.toString(), this.supportsAjax);
    if (!save) return;

    if (this.supportsAjax) {
      save.then(() => {
        log.add('reloaded templates, will reset some stuff');
        this.loading.next(false);
        log.add('calling reloadAndReInit()');
        // todo - we have multiple releases of reload, this one looks more correct...
        this.bridge.reloadAndReInit()
          .then(newConfig => {
            this.updateConfigAfterAppChange(newConfig);
            // app-parts will auto-reload correctly, because the API behind it knows what app is set on the module
            this.api.reloadAppParts();

          });
      });
    } else {
      save.then(() => {
        this.bridge.showMessage('loading App...');
          window.parent.location.reload();
        });
    }

  }



  private previewTemplate(t: Template): void {
    log.add(`previewTemplate(${t.TemplateId}), ajax is ${this.supportsAjax}`);
    this.loading.next(true);
    this.bridge
      .setTemplate(t.TemplateId, t.Name, false)
      .then(isAjax => { if (isAjax) this.loading.next(false); });
  }

}
