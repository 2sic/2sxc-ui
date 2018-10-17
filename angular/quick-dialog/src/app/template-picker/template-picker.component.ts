import { TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { IDialogFrameElement } from 'app/interfaces-shared/idialog-frame-element';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { TemplateFilterPipe } from 'app/template-picker/template-filter.pipe';
import { App } from 'app/core/app';
import { Template } from 'app/template-picker/template';
import { ContentType } from 'app/template-picker/content-type';
import { IIFrameBridge } from 'app/interfaces-shared/iiframe-bridge';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { cAppActionImport, cViewWithoutContent } from './constants';
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
export class TemplatePickerComponent implements OnInit {
  //#region iframe bridge
  dashInfo: IQuickDialogConfig;
  private bridge: IIFrameBridge;
  //#endregion

  //#region properties
  apps$: Observable<App[]>;
  // currentApp$: Observable<App>;
  // template$: Observable<Template[]>;


  savedAppId: number;
  templates: Template[] = [];
  // template: Template;
  undoTemplateId: number;
  contentTypes: ContentType[] = [];
  contentType: ContentType;
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
  private allTemplates: Template[] = [];
  private supportsAjax: boolean;
  //#endregion

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
    private appRef: ApplicationRef,
    private translate: TranslatePipe,
    public state: CurrentDataService
  ) {
    this.bridge = (<IDialogFrameElement>win.frameElement).bridge;
    this.dashInfo = this.bridge.getAdditionalDashboardConfig();
    this.state.init(this.dashInfo);
    this.allowContentTypeChange = !(this.dashInfo.hasContent || this.dashInfo.isList);

    const info = this.bridge.getManageInfo();
    this.isInnerContent = info.mid !== info.cbid;
    this.ready$ = Observable.combineLatest(this.api.ready$, this.loadingSubject, (r, l) => r && !l);
    this.apps$ = this.api.apps$;
    // this.currentApp$ = this.current.app$;
    // this.current.activateCurrentApp(this.dashInfo.appId);

    // this.api.currentApp$.subscribe(a => log.add(`active app is ${a && a.appId}`));
    this.wireUpOldObservableChangeWatchers();
  }

  ngOnInit() {
    this.initializeValuesFromBridge();
  }


  /**
   * This wires up the old model of observable watchers
   * It's not a good solution, because it's not clean observables,
   * but more a "watch changes, then put into static variable"
   * Todo: try to refactor into clean observables
   */
  private wireUpOldObservableChangeWatchers(): void {

    this.api.templates$
      .subscribe(templates => this.allTemplates = templates); // this.initTemplates(templates, this.dashInfo.templateId));

    this.api.contentTypes$
      .subscribe(contentTypes => this.initContentTypes(contentTypes, this.dashInfo.contentTypeId));

    Observable.combineLatest([
      this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$
    ]).subscribe(res => {
      this.templates = this.findTemplatesForContentType(this.contentType);
      this.showInstaller = this.isContentApp
        ? res[0].length === 0
        : res[2].filter(a => a.appId !== cAppActionImport).length === 0;
    });
  }




  private initializeValuesFromBridge(): void {
    this.isContentApp = this.dashInfo.isContent;
    this.supportsAjax = this.isContentApp || this.dashInfo.supportsAjax;
    this.showAdvanced = this.dashInfo.user.canDesign;
    this.undoTemplateId = this.dashInfo.templateId;
    this.undoContentTypeId = this.dashInfo.contentTypeId;
    this.savedAppId = this.dashInfo.appId;
    this.dashInfo.templateChooserVisible = true;

    this.api.loadEverything();
  }

  cancel(): void { this.bridge.cancel(); }

  run(action: string): void { this.bridge.run(action); }

  persistTemplate() { this.bridge.saveTemplate(this.state.template.TemplateId); }


  private findTemplatesForContentType(contentType: ContentType): Template[] {
    return this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.isContentApp
    });
  }


  private initTemplates(templates: Template[], selectedTemplateId: number) {
    // if (selectedTemplateId) {
    //   this.state.template = templates.find(t => t.TemplateId === selectedTemplateId);
    // }
    this.allTemplates = templates;
  }


  private initContentTypes(contentTypes: ContentType[], selectedContentTypeId) {
    if (selectedContentTypeId) {
      this.contentType = contentTypes.find(c => c.StaticName === selectedContentTypeId);
      this.switchTab();
    }
    contentTypes
      .filter(c => (this.state.template && c.TemplateId === this.state.template.TemplateId)
        || (this.contentType && c.StaticName === this.contentType.StaticName))
      .forEach(c => c.IsHidden = false);

    // option for no content types
    if (this.allTemplates.find(t => t.ContentTypeStaticName === '')) {
      const name = 'TemplatePicker.LayoutElement';
      contentTypes.push({
        StaticName: cViewWithoutContent,
        Name: name,
        Thumbnail: null,
        Label: this.translate.transform(name),
        IsHidden: false,
      } as ContentType);
    }

    this.contentTypes = contentTypes
      .sort((a, b) => {
        if (a.Name > b.Name) return 1;
        if (a.Name < b.Name) return -1;
        return 0;
      });
  }

  updateContentType(contentType: ContentType, keepTemplate: boolean = false): boolean {
    if (!this.allowContentTypeChange) return false;
    this.contentType = contentType;
    this.switchTab();
    this.loadingTemplates = true;
    this.templates = this.findTemplatesForContentType(contentType);

    if (this.templates.length === 0) return false;
    this.setTemplate(
      (keepTemplate ? (this.state.template || this.templates[0]) : this.templates[0]),
    );
    return true;
  }

  switchTab() {
    log.add('switchTab()');
    this.tabIndex = 1;
  }

  updateApp(app: App) {
    this.state.activateCurrentApp(app.appId);
    this.templates = [];
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
          this.state.template = this.templates[0];
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
