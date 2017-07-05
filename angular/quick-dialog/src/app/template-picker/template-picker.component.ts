import { TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit, Input, NgModule, Inject, ApplicationRef } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { ModuleApiService } from "app/core/module-api.service";
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { TemplateFilterPipe } from "app/template-picker/template-filter.pipe";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { $2sxcService } from "app/core/$2sxc.service";
import { App } from "app/core/app";
import { Subject } from "rxjs/Subject";
import { Template } from "app/template-picker/template";
import { ContentType } from "app/template-picker/content-type";

declare const $2sxc: any;
var win = window;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss'],
  providers: [TranslatePipe],
})
export class TemplatePickerComponent implements OnInit {
  apps: App[] = [];
  app: App;
  savedAppId: number;
  templates: any[] = [];
  template: Template;
  undoTemplateId: number;
  contentTypes: any[] = [];
  contentType: ContentType;
  undoContentTypeId: number;
  dashInfo: any;
  isContentApp: boolean;
  showProgress: boolean = false;
  showAdvanced: boolean;
  showInstaller: boolean = false;
  loading: boolean = false;
  loadingTemplates: boolean = false;
  ready: boolean = false;
  tabIndex: number = 0;
  updateTemplateSubject: Subject<any> = new Subject<any>();
  updateAppSubject: Subject<any> = new Subject<any>();
  allowContentTypeChange: boolean;

  private allTemplates: any[] = [];
  private frame: IDialogFrameElement;
  private cViewWithoutContent: string = '_LayoutElement';
  private cAppActionImport: number = -1;
  private supportsAjax: boolean;

  constructor(
    private api: ModuleApiService,
    private templateFilter: TemplateFilterPipe,
    private appRef: ApplicationRef,
    private translate: TranslatePipe
  ) {
    this.frame = <IDialogFrameElement>win.frameElement;
    this.dashInfo = this.frame.getAdditionalDashboardConfig();
    this.allowContentTypeChange = !(this.dashInfo.hasContent || this.dashInfo.isList);

    Observable.merge(
      this.updateTemplateSubject.asObservable(),
      this.updateAppSubject.asObservable()
    ).subscribe(res => {
      this.loading = true;
    });

    this.updateAppSubject
      .debounceTime(400)
      .subscribe(({ app }) => {
        this.api.setAppId(app.appId.toString()).toPromise()
          .then(res => {
            if (app.supportsAjaxReload) return this.frame.sxc.manage.contentBlock.reloadAndReInitialize(true, true)
              .then(() => {
                return this.api.loadTemplates().toPromise()
                  .then(() => {
                    this.loadingTemplates = false;
                    this.template = this.templates[0];
                    this.appRef.tick();
                  })
                  .then(() => {
                    this.loading = false;
                    this.frame.scrollToTarget();
                    this.appRef.tick();
                  });
              });

            this.frame.sxc.manage.contentBlock.reloadNoLivePreview(`<p class="no-live-preview-available">Reloading App. Please wait.</p>`)
              .then(() => {
                this.loading = false;
                this.frame.scrollToTarget();
                this.appRef.tick();
              });

            this.frame.persistDia();
            win.parent.location.reload();
          })
      });

    this.updateTemplateSubject
      .debounceTime(400)
      .subscribe(({ template }) => {
        this.loadingTemplates = false;
        this.template = template;
        this.appRef.tick();

        if (this.supportsAjax) return this.frame.sxc.manage.contentBlock.reload(template.TemplateId)
          .then(() => {
            this.loading = false;
            this.frame.scrollToTarget();
            this.appRef.tick();
          });

        this.frame.sxc.manage.contentBlock.reloadNoLivePreview(`<p class="no-live-preview-available">Reloading content type <b>${template.Name}</b>. Please wait.</p>`)
          .then(() => {
            this.loading = false;
            this.frame.scrollToTarget();
            this.appRef.tick();
          });

        // TODO: Not sure why we need to set this value before calling persistTemplate. Clean up!
        this.frame.sxc.manage.contentBlock.templateId = this.template.TemplateId;

        return this.frame.sxc.manage.contentBlock.persistTemplate(false)
          .then(() => win.parent.location.reload());
      });

    this.api.apps
      .subscribe(apps => {
        this.app = apps.find(a => a.appId === this.dashInfo.appId);
        if (this.app) this.tabIndex = 1;
        this.apps = apps;
      });

    this.api.templates
      .subscribe(templates => this.setTemplates(templates, this.dashInfo.templateId));

    this.api.contentTypes
      .subscribe(contentTypes => this.setContentTypes(contentTypes, this.dashInfo.contentTypeId));

    Observable.combineLatest([
      this.api.templates,
      this.api.contentTypes,
      this.api.apps
    ]).subscribe(res => {
      this.filterTemplates(this.contentType);
      this.ready = true;
      this.showInstaller = this.isContentApp
        ? res[0].length === 0
        : res[2].filter(a => a.appId !== this.cAppActionImport).length === 0
    });
  }

  ngOnInit() {
    this.isContentApp = this.dashInfo.isContent;
    this.supportsAjax = this.isContentApp || this.dashInfo.supportsAjax;
    this.showAdvanced = this.dashInfo.user.canDesign;
    this.undoTemplateId = this.dashInfo.templateId;
    this.undoContentTypeId = this.dashInfo.contentTypeId;
    this.savedAppId = this.dashInfo.appId;
    this.frame.isDirty = this.isDirty;
    this.dashInfo.templateChooserVisible = true;

    this.api.loadTemplates()
      .take(1)
      .subscribe(templates => this.api.loadContentTypes())

    this.api.loadApps();
  }

  isDirty(): boolean {
    return false;
  }
  
  persistTemplate() {
    let cb = this.frame.sxc.manage.contentBlock;
    cb.templateId = this.template.TemplateId;
    cb.persistTemplate(false, false)
  }

  private appStore() {
    win.open("http://2sxc.org/en/apps");
  }

  private filterTemplates(contentType: ContentType) {
    this.templates = this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.isContentApp
    });
  }

  private setTemplates(templates: any[], selectedTemplateId: number) {
    if (selectedTemplateId) this.template = templates.find(t => t.TemplateId === selectedTemplateId);
    this.allTemplates = templates;
  }

  private setContentTypes(contentTypes: any[], selectedContentTypeId) {
    if (selectedContentTypeId) this.contentType = contentTypes.find(c => c.StaticName === selectedContentTypeId);
    contentTypes
      .filter(c => (this.template && c.TemplateId === this.template.TemplateId) || (this.contentType && c.StaticName === this.contentType.StaticName))
      .forEach(c => c.IsHidden = false);

    // option for no content types
    if (this.allTemplates.find(t => t.ContentTypeStaticName === '')) {
      let name = "TemplatePicker.LayoutElement";
      contentTypes.push({
        StaticName: this.cViewWithoutContent,
        Name: name,
        Thumbnail: null,
        Label: this.translate.transform(name),
        IsHidden: false,
      });
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
    this.updateTemplateSubject.next({
      template: keepTemplate ? (this.template || this.templates[0]) : this.templates[0],
    });
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

    this.updateAppSubject.next({
      app,
    });
  }
}