import { TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { IDialogFrameElement } from 'app/interfaces-shared/idialog-frame-element';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { App } from 'app/core/app';
import { Template } from 'app/template-picker/template';
import { ContentType } from 'app/template-picker/content-type';
import { IIFrameBridge } from 'app/interfaces-shared/iiframe-bridge';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { cAppActionImport } from './constants';
import { log } from 'app/core/log';
import { PickerService } from './picker.service';
import { CurrentDataService } from './current-data.service';

const win = window;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
  providers: [TranslatePipe],
})
export class TemplatePickerComponent {
  private bridge: IIFrameBridge;

  //#region properties
  apps$: Observable<App[]>;

  savedAppId: number;
  undoTemplateId: number;
  undoContentTypeId: string;
  isContentApp: boolean;
  showProgress = false;
  showAdvanced: boolean;
  showInstaller = false;
  ready$: Observable<boolean>;
  loadingTemplates = false;

  tabIndex = 0;
  allowContentTypeChange: boolean;
  isInnerContent = false;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private supportsAjax: boolean;
  //#endregion

  constructor(
    private api: PickerService,
    private appRef: ApplicationRef,
    public translate: TranslatePipe, // for the UI
    public state: CurrentDataService
  ) {
    this.bridge = (<IDialogFrameElement>win.frameElement).bridge;
    const dashInfo = this.bridge.getAdditionalDashboardConfig();
    this.state.init(dashInfo);
    this.allowContentTypeChange = !(dashInfo.hasContent || dashInfo.isList);

    const info = this.bridge.getManageInfo();
    this.isInnerContent = info.mid !== info.cbid;
    this.ready$ = Observable.combineLatest(this.api.ready$, this.loadingSubject, (r, l) => r && !l);
    this.apps$ = this.api.apps$;
    this.wireUpOldObservableChangeWatchers();

    this.initializeValuesFromBridge(dashInfo);
    this.api.loadEverything();
  }


  /**
   * This wires up the old model of observable watchers
   * It's not a good solution, because it's not clean observables,
   * but more a "watch changes, then put into static variable"
   * Todo: try to refactor into clean observables
   */
  private wireUpOldObservableChangeWatchers(): void {

    this.state.contentType$
      .do(() => this.switchTab())
      .subscribe();

    Observable.combineLatest([
      this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$
    ]).subscribe(res => {
      this.showInstaller = this.isContentApp
        ? res[0].length === 0
        : res[2].filter(a => a.appId !== cAppActionImport).length === 0;
    });
  }




  private initializeValuesFromBridge(config: IQuickDialogConfig): void {
    this.isContentApp = config.isContent;
    this.supportsAjax = this.isContentApp || config.supportsAjax;
    this.showAdvanced = config.user.canDesign;
    this.undoTemplateId = config.templateId;
    this.undoContentTypeId = config.contentTypeId;
    this.savedAppId = config.appId;
    config.templateChooserVisible = true;

  }

  cancel(): void { this.bridge.cancel(); }

  run(action: string): void { this.bridge.run(action); }

  persistTemplate() { this.bridge.saveTemplate(this.state.template.TemplateId); }



  updateContentType(contentType: ContentType, keepTemplate: boolean = false): void {
    log.add(`select content-type '${contentType.Name}'; allowed: ${this.allowContentTypeChange}`);
    if (!this.allowContentTypeChange) return;
    this.state.activateContentType(contentType);
    this.loadingTemplates = true;

    if (this.state.templates.length === 0) return;
    this.setTemplate(
      (keepTemplate ? (this.state.template || this.state.templates[0]) : this.state.templates[0]),
    );
  }

  switchTab() {
    log.add('switchTab()');
    this.tabIndex = 1;
  }

  updateApp(app: App) {
    this.state.activateCurrentApp(app.appId);
    this.state.templates = [];
    this.loadingTemplates = true;
    this.updateAppAndReloadCorrectly(app);
  }

  doPostAjaxScrolling() {
    this.loadingSubject.next(false);
    this.bridge.scrollToTarget();
    this.appRef.tick();
  }

// todo: must verify both previous and new apps support ajax!
private updateAppAndReloadCorrectly(newApp: App): void {
  const newAppAjax = newApp.supportsAjaxReload;
  log.add(`changing app to ${newApp.appId}; new app-ajax:${newAppAjax}`);
  this.api.setAppId(newApp.appId.toString())
    .subscribe(() => {
      if (newApp.supportsAjaxReload) {
        // 2018-10-17 2dm new
        this.api.templates$.take(1).do(() => {
          log.add('reloaded templates, will reset some stuff');
          this.loadingTemplates = false;
          this.state.template = this.state.templates[0];
          this.appRef.tick();
          this.doPostAjaxScrolling();
        });
        log.add('calling reloadAndReInit()');
        /* return */
        this.bridge.reloadAndReInit()
          .then(() => this.api.loadTemplates());
          // 2018-10-17 2dm old
          // .toPromise())
          // .then(() => {
          //   this.loadingTemplates = false;
          //   this.template = this.templates[0];
          //   this.appRef.tick();
          //   this.doPostAjaxScrolling();
          // });
      } else {
        this.setInpageMessageBeforeReload('loading App...');
        win.parent.location.reload();
      }
    });
  }


  setTemplate(template: Template): void {
    log.add(`set template ${template.TemplateId}, ajax is ${this.supportsAjax}`);
    this.loadingSubject.next(true);
    this.loadingTemplates = false;
    this.state.template = template;
    this.appRef.tick();

    if (this.supportsAjax) {
      this.bridge
        .previewTemplate(template.TemplateId)
        .then(() => this.doPostAjaxScrolling());
    } else {
      this.setInpageMessageBeforeReload(`refreshing <b>${template.Name}</b>...`);
      this.bridge
        .saveTemplate(this.state.template.TemplateId)
        .then(() => win.parent.location.reload());
    }
  }

  private setInpageMessageBeforeReload(msg: string) {
    log.add('no ajax, will reload page...');
    this.bridge.showMessage(msg);
    this.doPostAjaxScrolling();
    this.bridge.persistDia();
  }
}
