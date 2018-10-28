//#region imports
import { Component, ApplicationRef } from '@angular/core';
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
import { timer } from 'rxjs/observable/timer';
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
  allowContentTypeChange: boolean;

  /** Indicates whether the installer can be shown in this dialog or not */
  isBadContextForInstaller = false;

  /** The communication-object to the parent */
  private bridge: IIFrameBridge;

  /** internal loading state */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  /** Ajax-support changes how saving/changing is handled */
  private supportsAjax: boolean;

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
    private appRef: ApplicationRef,
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
    // wire up basic observables
    this.ready$ = Observable.combineLatest(
      this.api.ready$,
      this.loadingSubject.asObservable(),
      (r, l) => r && !l);
    this.apps$ = this.api.apps$;

    // if the content-type or app is set, switch tabs
    Observable.merge(this.state.type$, this.state.app$)
      .filter(t => !!t) // ignore null/empty state changes
      .subscribe(_ => this.switchTab());

    // once the data is known, check if installer is needed
    Observable.combineLatest(this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$,
      this.api.ready$.filter(r => !!r),
      (templates, c, apps) => {
      this.showInstaller = this.isContent
        ? templates.length === 0
        : apps.filter(a => a.appId !== cAppActionImport).length === 0;
    }).subscribe();

    // template loading is true, when the template-list or selected template are not ready
    this.templatesLoading$ = Observable.combineLatest(
      this.state.templates$,
      this.state.template$,
      (all, selected) => !(all && selected))
      .startWith(false);

    // whenever the template changes, ensure the preview reloads
    // but don't do this when initializing, that's why we listen to initDone$
    this.state.template$
      .filter(t => !!t)
      .skipUntil(initDone$.filter(x => x))
      .do(t => this.loadTemplate(t))
      .subscribe();
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
    this.allowContentTypeChange = !(config.hasContent || config.isList);
    this.isBadContextForInstaller = config.isInnerContent;
    this.isContent = config.isContent;
    this.supportsAjax = this.isContent || config.supportsAjax;
    this.showAdvanced = config.user.canDesign;
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
    log.add(`select content-type '${contentType.Name}'; allowed: ${this.allowContentTypeChange}`);
    if (!this.allowContentTypeChange) return;
    this.state.activateType(contentType);
  }

  switchTab() {
    log.add('switchTab()');
    // must delay change because of a bug in the tabs-updating
    timer(100).take(1).subscribe(_ => this.tabIndex = 1);
  }


  private updateApp(newApp: App): void {
    // ajax-support can change as apps are changed; for ajax, both the previous and new must support it
    this.supportsAjax = this.supportsAjax && newApp.supportsAjaxReload;
    log.add(`changing app to ${newApp.appId}; use-ajax:${this.supportsAjax}`);

    this.state.activateCurrentApp(newApp.appId);

    const save = this.api.saveAppId(newApp.appId.toString(), this.supportsAjax);
    if (!!save) return;

    if (this.supportsAjax) {
      save.toPromise().then(() => {
        // this.api.templates$.take(1).subscribe(() => {
        log.add('reloaded templates, will reset some stuff');
        this.appRef.tick();
        this.setLoadingDone();
        // });
        log.add('calling reloadAndReInit()');
        // todo - we have multiple releases of reload, this one looks more correct...
        this.bridge.reloadAndReInit()
          .then(() => this.api.reloadAppParts());
      });
    } else {
      save.subscribe(() => {
          this.setInpageMessageBeforeReload('loading App...');
          window.parent.location.reload();
        });
    }
    //   .subscribe(() => {
    //     if (this.supportsAjax) {
    //       this.api.templates$.take(1).do(() => {
    //         log.add('reloaded templates, will reset some stuff');
    //         this.appRef.tick();
    //         this.doPostAjaxScrolling();
    //       });
    //       log.add('calling reloadAndReInit()');
    //       this.bridge.reloadAndReInit()
    //         .then(() => this.api.loadTemplates());
    //     } else {
    //       this.setInpageMessageBeforeReload('loading App...');
    //       window.parent.location.reload();
    //     }
    // });
  }



  private loadTemplate(template: Template): void {
    log.add(`load template ${template.TemplateId}, ajax is ${this.supportsAjax}`);

    this.loadingSubject.next(true);
    this.bridge.setTemplate(template.TemplateId, template.Name, false)
      .then(() => this.setLoadingDone());

    // Now reload in the preferred way
    // if (this.supportsAjax) {
    //   this.bridge
    //     .previewTemplate(template.TemplateId)
    //     .then(() => this.setLoadingDone());
    // } else {
    //   this.setInpageMessageBeforeReload(`refreshing <b>${template.Name}</b>...`);
    //   this.bridge
    //     .saveTemplate(template.TemplateId)
    //     .then(() => window.parent.location.reload());
    // }
  }

  private setInpageMessageBeforeReload(msg: string) {
    log.add('no ajax, will reload page...');
    this.bridge.showMessage(msg);
    this.setLoadingDone();
  }

  private setLoadingDone() {
    this.loadingSubject.next(false);
    this.appRef.tick();
  }

}
