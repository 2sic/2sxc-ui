//#region imports
import { TranslatePipe } from '@ngx-translate/core';
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

//#endregion

const debug = true;
const log = parentLog.subLog('picker', debug);

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
  // providers: [TranslatePipe],
})
export class TemplatePickerComponent {
  //#region properties
  /** Stream of all apps */
  apps$: Observable<App[]>;

  /** is cancelling possible */
  showCancel = true;

  /** is in the main content-app or a generic app */
  isContentApp: boolean;

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
  //#endregion

  constructor(
    private api: PickerService,
    private appRef: ApplicationRef,
    public state: CurrentDataService
  ) {
    // start data-loading
    this.api.loadEverything();

    // get configuration from iframe-bridge and set everything
    this.bridge = (<IDialogFrameElement>window.frameElement).bridge;
    const dashInfo = this.bridge.getAdditionalDashboardConfig();

    // init parts, variables, observables
    const initDone$ = this.state.init(dashInfo);
    this.initObservables(initDone$);
    this.initValuesFromBridge(dashInfo);
  }

  /**
   * wire up observables for this component
   */
  private initObservables(initDone$: Observable<boolean>): void {
    // wire up basic observables
    this.ready$ = Observable.combineLatest(this.api.ready$, this.loadingSubject, (r, l) => r && !l);
    this.apps$ = this.api.apps$;

    // if the content-type is set, switch tabs
    this.state.type$.subscribe(() => this.switchTab());

    // once the data is known, check if installer is needed
    Observable.combineLatest(this.api.templates$, this.api.contentTypes$, this.api.apps$,
      (templates, c, apps) => {
      this.showInstaller = this.isContentApp
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
    initDone$.filter(i => i).first().do(() => {
      this.state.template$
        .do(t => log.add(`pre skip ${t && t.TemplateId}`))
        .skip(1) // skip first set value, as that is the initial value
        .do(t => log.add(`post skip ${t && t.TemplateId}`))
        .filter(t => t !== null && t !== undefined)
        .distinctUntilChanged()
        .do((selected) => this.setTemplate(selected))
        .subscribe();
    }).subscribe();
  }



  private initValuesFromBridge(config: IQuickDialogConfig): void {
    this.allowContentTypeChange = !(config.hasContent || config.isList);
    this.isBadContextForInstaller = config.isInnerContent;
    this.isContentApp = config.isContent;
    this.supportsAjax = this.isContentApp || config.supportsAjax;
    this.showAdvanced = config.user.canDesign;
    this.showCancel = config.templateId != null;
  }

  //#region basic UI action binding
  cancel(): void { this.bridge.cancel(); }

  run(action: string): void { this.bridge.run(action); }

  persistTemplate(template: Template) { this.bridge.saveTemplate(template.TemplateId); }

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
    this.tabIndex = 1;
  }



  private doPostAjaxScrolling() {
    this.loadingSubject.next(false);
    this.bridge.scrollToTarget();
    this.appRef.tick();
  }

  private updateApp(newApp: App): void {
    // ajax-support can change as apps are changed; for ajax, both the previous and new must support it
    this.supportsAjax = this.supportsAjax && newApp.supportsAjaxReload;
    log.add(`changing app to ${newApp.appId}; use-ajax:${this.supportsAjax}`);

    this.state.activateCurrentApp(newApp.appId);

    debugger;

    this.api.setAppId(newApp.appId.toString())
      .subscribe(() => {
        if (this.supportsAjax) {
          this.api.templates$.take(1).do(() => {
            log.add('reloaded templates, will reset some stuff');
            this.appRef.tick();
            this.doPostAjaxScrolling();
          });
          log.add('calling reloadAndReInit()');
          this.bridge.reloadAndReInit()
            .then(() => this.api.loadTemplates());
        } else {
          this.setInpageMessageBeforeReload('loading App...');
          window.parent.location.reload();
        }
    });
  }



  private setTemplate(template: Template): void {
    log.add(`set template ${template.TemplateId}, ajax is ${this.supportsAjax}`);
    debugger;
    this.loadingSubject.next(true);

    // Now reload in the preferred way
    if (this.supportsAjax) {
      this.bridge
        .previewTemplate(template.TemplateId)
        .then(() => this.doPostAjaxScrolling());
    } else {
      this.setInpageMessageBeforeReload(`refreshing <b>${template.Name}</b>...`);
      this.bridge
        .saveTemplate(template.TemplateId)
        .then(() => window.parent.location.reload());
    }
  }

  private setInpageMessageBeforeReload(msg: string) {
    log.add('no ajax, will reload page...');
    this.bridge.showMessage(msg);
    this.doPostAjaxScrolling();
    this.bridge.persistDia();
  }
}
