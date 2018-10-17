import { TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { IDialogFrameElement } from 'app/interfaces-shared/idialog-frame-element';
import { ModuleApiService } from 'app/core/module-api.service';
import { Observable } from 'rxjs/Rx';
import { TemplateFilterPipe } from 'app/template-picker/template-filter.pipe';
import { App } from 'app/core/app';
import { Subject } from 'rxjs/Subject';
import { Template } from 'app/template-picker/template';
import { ContentType } from 'app/template-picker/content-type';
import { IIFrameBridge } from 'app/interfaces-shared/iiframe-bridge';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { cAppActionImport, cViewWithoutContent } from './constants';

const win = window;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
  providers: [TranslatePipe],
})
export class TemplatePickerComponent implements OnInit {
  //#region properties
  apps: App[] = [];
  app: App;
  savedAppId: number;
  templates: Template[] = [];
  template: Template;
  undoTemplateId: number;
  contentTypes: ContentType[] = [];
  contentType: ContentType;
  undoContentTypeId: string;
  dashInfo: IQuickDialogConfig;
  isContentApp: boolean;
  showProgress = false;
  showAdvanced: boolean;
  showInstaller = false;
  loading = false;
  loadingTemplates = false;
  ready = false;
  tabIndex = 0;
  updateTemplateSubject: Subject<Template> = new Subject<Template>();
  // updateAppSubject: Subject<App> = new Subject<App>();
  allowContentTypeChange: boolean;
  isInnerContent = false;

  private allTemplates: Template[] = [];
  private frame: IDialogFrameElement;
  private bridge: IIFrameBridge;
  private supportsAjax: boolean;
  //#endregion

  constructor(
    private api: ModuleApiService,
    private templateFilter: TemplateFilterPipe,
    private appRef: ApplicationRef,
    private translate: TranslatePipe
  ) {
    this.frame = <IDialogFrameElement>win.frameElement;
    this.bridge = this.frame.bridge;
    this.dashInfo = this.bridge.getAdditionalDashboardConfig();
    this.allowContentTypeChange = !(this.dashInfo.hasContent || this.dashInfo.isList);

    const info = this.bridge.getManageInfo();
    this.isInnerContent = info.mid !== info.cbid;
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

    Observable.merge(
      this.updateTemplateSubject.asObservable(),
      // this.updateAppSubject.asObservable()
    ).subscribe(() => {
        this.loading = true;
      });

    // this.updateAppSubject
    //   .subscribe((app) => {
    //     this.api.setAppId(app.appId.toString())
    //       .switchMap(() => {
    //           if (app.supportsAjaxReload) {
    //             return this.bridge.reloadAndReInit()
    //               .then(() => this.api.loadTemplates().toPromise())
    //               .then(() => {
    //                 this.loadingTemplates = false;
    //                 this.template = this.templates[0];
    //                 this.appRef.tick();
    //                 this.doPostAjaxScrolling();
    //               });
    //           } else {
    //             this.bridge.showMessage('loading App..');
    //             this.doPostAjaxScrolling();
    //             this.bridge.persistDia();
    //             win.parent.location.reload();
    //           }
    //         });
    //   });

    this.updateTemplateSubject
      .subscribe((template) => {
        this.loadingTemplates = false;
        this.template = template;
        this.appRef.tick();

        if (this.supportsAjax) return this.bridge.previewTemplate(template.TemplateId)
          .then(() => this.doPostAjaxScrolling());

        this.bridge.showMessage(`refreshing <b>${template.Name}</b>...`);
        this.doPostAjaxScrolling();
        this.bridge.persistDia();
        return this.bridge.saveTemplate(this.template.TemplateId)
          .then(() => win.parent.location.reload());
      });

    this.api.apps$
      .subscribe(apps => {
        this.app = apps.find(a => a.appId === this.dashInfo.appId);
        if (this.app) this.tabIndex = 1;
        this.apps = apps;
      });

    this.api.templates$
      .subscribe(templates => this.setTemplates(templates, this.dashInfo.templateId));

    this.api.contentTypes$
      .subscribe(contentTypes => this.setContentTypes(contentTypes, this.dashInfo.contentTypeId));

    Observable.combineLatest([
      this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$
    ]).subscribe(res => {
      this.filterTemplates(this.contentType);
      this.ready = true;
      this.showInstaller = this.isContentApp
        ? res[0].length === 0
        : res[2].filter(a => a.appId !== cAppActionImport).length === 0;
    });
  }

  private updateAppAndReloadCorrectly(app: App): void {
    console.log(`changing app to ${app.appId}`);
    this.api.setAppId(app.appId.toString())
      .switchMap(() => {
        if (app.supportsAjaxReload) {
          return this.bridge.reloadAndReInit()
            .then(() => this.api.loadTemplates().toPromise())
            .then(() => {
              this.loadingTemplates = false;
              this.template = this.templates[0];
              this.appRef.tick();
              this.doPostAjaxScrolling();
            });
        } else {
          this.bridge.showMessage('loading App..');
          this.doPostAjaxScrolling();
          this.bridge.persistDia();
          win.parent.location.reload();
        }
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

  persistTemplate() { this.bridge.saveTemplate(this.template.TemplateId); }

  setTemplate(template: Template) { this.updateTemplateSubject.next(template); }

  private filterTemplates(contentType: ContentType) {
    this.templates = this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.isContentApp
    });
  }


  private setTemplates(templates: Template[], selectedTemplateId: number) {
    if (selectedTemplateId) this.template = templates.find(t => t.TemplateId === selectedTemplateId);
    this.allTemplates = templates;
  }


  private setContentTypes(contentTypes: ContentType[], selectedContentTypeId) {
    if (selectedContentTypeId) {
      this.contentType = contentTypes.find(c => c.StaticName === selectedContentTypeId);
      this.tabIndex = 1;
    }
    contentTypes
      .filter(c => (this.template && c.TemplateId === this.template.TemplateId)
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
    this.tabIndex = 1;
    this.templates = [];
    this.loadingTemplates = true;

    this.filterTemplates(contentType);
    if (this.templates.length === 0) return false;
    this.updateTemplateSubject.next(
      (keepTemplate ? (this.template || this.templates[0]) : this.templates[0]),
    );
    return true;
  }

  reloadContentType() {
    this.updateContentType(this.contentType, true);
  }

  switchTab() {
    this.tabIndex = 1;
  }

  updateApp(app: App) {
    this.app = app;
    this.templates = [];
    this.loadingTemplates = true;
    this.updateAppAndReloadCorrectly(app);
    // this.updateAppSubject.next(app);
  }

  doPostAjaxScrolling() {
    this.loading = false;
    this.bridge.scrollToTarget();
    this.appRef.tick();
  }
}
