import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { App } from 'app/core/app';
import { BehaviorObservable } from 'app/core/behavior-observable';
import { Log, log as parentLog } from 'app/core/log';
import { DebugConfig } from 'app/debug-config';
import { IDialogFrameElement, IIFrameBridge, IQuickDialogConfig } from 'app/interfaces/shared';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';
import { combineLatest, merge, Observable, timer, BehaviorSubject } from 'rxjs';
import { filter, map, skipUntil, startWith, share } from 'rxjs/operators';
import { BackendSettings } from '../core/backend-settings';
import { CurrentDataService } from './current-data.service';
import { ContentTypesProcessor } from './data/content-types-processor.service';
import { PickerService } from './picker.service';
import { nameofFactory } from '../core/nameof';

const log = parentLog.subLog('picker', DebugConfig.picker.enabled);

const nameofTPC = nameofFactory<TemplatePickerComponent>();

const debug = false;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
})
export class TemplatePickerComponent implements OnInit {
  // #region properties
  /** Stream of all apps */
  apps$: Observable<App[]>;

  /** is cancelling possible */
  showCancel = true;

  /** is in the main content-app or a generic app */
  isContent: boolean;

  /** Needs the installer */
  installerNeeded = false;

  /** Show the Installer */
  installerShow = false;

  /** Stream to indicate ready, for loading-indicator */
  ready$: Observable<boolean>;
  templatesLoading$: Observable<boolean>;

  /** Tab-id, when we set it, the tab switches */
  tabIndex = 0;

  /** Indicate if the user is allowed to change content-types or not */
  preventTypeSwitch: boolean;

  /** Indicates whether the installer can be shown in this dialog or not. True if inner-content. */
  isInnerContent = false;

  /** Indicates whether the search bar will be shown in this dialog or not */
  showSearchBar = false;

  /**
   * Indicates whether the install apps and all apps buttons will be shown in this dialog or not
   * only on empty-content or all apps in admin-mode
   */
  showInstallAndAllApps = false;

  /** Show the admin-this-app button */
  showAdminApp = false;

  /** The communication-object to the parent */
  private bridge: IIFrameBridge;

  /** internal loading state */
  private loading$ = BehaviorObservable.create<boolean>(false);

  /** Ajax-support changes how saving/changing is handled */
  private supportsAjax: boolean;

  preventAppSwitch = false;

  public showDebug = DebugConfig.picker.showDebugPanel;

  appFilter = '';
  contentTypeFilter = '';
  templateFilter = '';
  // #endregion

  // #region data to show - using local variables, because streams didn't update correctly :(
  app: App;
  templates: Template[];
  template: Template;
  contentType: ContentType;
  types: ContentType[];
  defaultContentType: ContentType;
  ready = false;
  //#endregion

  constructor(
    private backendSettings: BackendSettings,
    private api: PickerService,
    public state: CurrentDataService,
    private cdRef: ChangeDetectorRef
  ) {
    // get configuration from iframe-bridge and set everything
    this.bridge = (<IDialogFrameElement>window.frameElement).bridge;
    const dashInfo = this.bridge.getAdditionalDashboardConfig();

    this.boot(dashInfo);
    if (debug) this.debugObservables();
    console.log('2dm - CONSTRUCTOR');
  }

  ngOnInit(): void {
    this.autosyncObservablesToEnsureUiUpdates();
  }


  private boot(dashInfo: IQuickDialogConfig) {
    this.showDebug = dashInfo.debug;
    Log.configureRuntimeLogging(dashInfo.debug);

    // Make sure we have the latest backend settings
    this.backendSettings.setApp(dashInfo.appId);
    // start data-loading
    this.api.initLoading(!dashInfo.isContent);

    // init parts, variables, observables
    const initDone$ = this.state.init(dashInfo);
    this.initObservables(initDone$);
    this.initValuesFromBridge(dashInfo);
    this.loading$.next(false);
  }

  private debugObservables() {
    console.log('debugObservables');
    // this.tab$.subscribe(t => log.add(`tab changed to ${t}`));

    if (!DebugConfig.picker.streams) return;
    this.loading$.subscribe(l => log.add(`quick-dialog loading$:${l}`));
    this.ready$.subscribe(r => log.add(`quick-dialog ready$:${r}`));
  }

  /**
   * wire up observables for this component
   */
  private observablesAlreadyInitialized = false;
  private initObservables(initDone$: Observable<boolean>): void {
    if (this.observablesAlreadyInitialized) return;
    this.observablesAlreadyInitialized = true;

    const initTrue$ = initDone$.pipe(filter(t => !!t));

    // wire up basic observables
    this.ready$ = combineLatest([this.api.ready$, this.loading$]).pipe(
      map(([ready, loading]) => ready && !loading),
      share()
    );

    // all apps are the same as provided by the api
    this.apps$ = this.api.apps$;

    // if the content-type or app is set, switch tabs (ignore null/empty states)
    const typeOrAppReady = merge(this.state.type$, this.state.app$).pipe(
      filter(t => !!t),
      share()
    );
    combineLatest([typeOrAppReady, initTrue$]).subscribe(_ => this.switchTab('type/app ready and init-true'));

    // once the data is known, check if installer is needed
    combineLatest([
      this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$,
      this.api.ready$.pipe(filter(r => !!r)),
      this.backendSettings.showAdvanced$
    ]).pipe(
        map(([templates, _, apps, _2, showAdv]) => {
          log.add('apps/templates loaded, will check if we should show installer');
          // Installer is needed on content without templates, or apps without any apps
          this.installerNeeded = this.isContent
            ? templates.length === 0
            : apps.length === 0;
          this.installerShow = showAdv && this.installerNeeded && !this.isInnerContent;
          this.showSearchBar = !this.installerNeeded;
          this.showInstallAndAllApps = showAdv && (this.installerShow || !this.isContent);
          this.showAdminApp = showAdv && !this.installerNeeded;

          log.add('Debug Relevant Properties', {
            installerNeeded: this.installerNeeded,
            showAdv: showAdv,
            isInnerContent: this.isInnerContent,
            installerShow: this.installerShow,
          });

          // if (this.showDebug) console.log('initObservables...combineLatest(...)', this);
        }))
      .subscribe();

    // template loading is true, when the template-list or selected template are not ready
    this.templatesLoading$ = combineLatest([this.state.templates$, this.state.template$])
      .pipe(
        map(([all, selected]) => !(all && selected)),
        startWith(false)
      );

    // whenever the template changes, ensure the preview reloads
    // but don't do this when initializing, that's why we listen to initDone$
    this.state.template$.pipe(
      filter(t => !!t),
      skipUntil(initTrue$))
      .subscribe(t => this.previewTemplate(t));
  }

  /** The UI doesn't update reliably :(, so we copy the data to local variables */
  private autosyncObservablesToEnsureUiUpdates(): any {
    this.state.app$.subscribe(a => this.app = a);
    this.state.templates$.subscribe(t => this.templates = t);
    this.state.template$.subscribe(t => this.template = t);
    this.state.types$.subscribe(t => {
      this.types = t;
      this.defaultContentType = ContentTypesProcessor.firstDefault(t);
    });
    this.state.type$.subscribe(t => this.contentType = t);

    this.ready$.subscribe(r => this.ready = r);
    merge(
      this.ready$,
      this.state.app$,
      this.state.type$,
      this.state.types$,
      this.state.template$,
      this.state.templates$,
      ).subscribe(() => this.cdRef.detectChanges());
  }


  private initValuesFromBridge(config: IQuickDialogConfig): void {
    if (this.showDebug) console.log(`initValuesFromBridge(config)`, config);
    this.preventTypeSwitch = config.hasContent;
    this.isInnerContent = config.isInnerContent;
    this.isContent = config.isContent;
    this.supportsAjax = this.isContent || config.supportsAjax;
    this.preventAppSwitch = config.hasContent;
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
    if (before && before.AppId === after.AppId) {
      this.switchTab('select app');
    } else {
      this.updateApp(after);
      this.templateFilter = '';
    }
  }

  /**
   * content-type selection from UI
   */
  selectContentType(before: ContentType, after: ContentType): void {
    if (before && before.StaticName === after.StaticName) {
      this.switchTab('select template');
    } else {
      this.setContentType(after);
      this.templateFilter = '';
    }
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

  switchTab(message: string) {
    const msg = `switchTab(${message})`;
    log.add(msg);
    this.tabIndex = 1;
    this.cdRef.detectChanges();
    // repeat after delay because of a bug in the tabs-updating (unclear why...)
    // timer(100).toPromise().then(_ => {
    //   return this.tabIndex = 1;
    // });
  }


  private updateApp(newApp: App): void {
    // ajax-support can change as apps are changed; for ajax, maybe both the previous and new must support it
    // or just new? still WIP
    const ajax = newApp.SupportsAjaxReload;
    log.add(`changing app to ${newApp.AppId}; prevent-switch: ${this.preventAppSwitch} use-ajax:${ajax}`);
    if (this.preventAppSwitch) return;


    this.loading$.next(true);
    this.bridge.showMessage('loading App...');
    const savePromise = this.api.saveAppId(newApp.AppId.toString(), ajax);

    if (ajax) {
      savePromise.then(() => {
        log.add('saved app, will reset some stuff');
        // do this after save completed, to ensure that the module is ready on the server
        log.add('calling reloadAndReInit()');
        this.bridge.reloadAndReInit()
          .then(newConfig => this.boot(newConfig));
      });
    } else {
      savePromise.then(() => window.parent.location.reload());
    }

  }



  private previewTemplate(t: Template): void {
    log.add(`previewTemplate(${t.TemplateId}), ajax is ${this.supportsAjax}`);
    this.loading$.next(true);
    this.bridge
      .setTemplate(t.TemplateId, t.Name, false)
      .then(_ => this.loading$.next(false));
  }

}
