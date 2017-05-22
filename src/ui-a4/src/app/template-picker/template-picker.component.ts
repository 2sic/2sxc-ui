import { Component, OnInit, Input, NgModule, Inject, ApplicationRef } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { ModuleApiService } from "app/core/module-api.service";
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TemplateFilterPipe } from "app/template-picker/template-filter.pipe";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { $2sxcService } from "app/core/$2sxc.service";
import { App } from "app/core/app";
import { Subject } from "rxjs/Subject";

declare const $2sxc: any;
var win = window;

class Template {
  TemplateId: number;
  Name: string;
}

class ContentType {
  StaticName: string;
  Label: string;
}

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss']
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
  ready: boolean = false;
  tabIndex: number = 0;
  updateTemplateSubject: Subject<any> = new Subject<any>();
  updateAppSubject: Subject<any> = new Subject<any>();

  private allTemplates: any[] = [];
  private frame: IDialogFrameElement;
  private cViewWithoutContent: string = '_LayoutElement';
  private cAppActionImport: number = -1;
  private supportsAjax: boolean;
  private updatingApp: boolean = false;

  constructor(
    private api: ModuleApiService,
    private route: ActivatedRoute,
    private templateFilter: TemplateFilterPipe,
    private sxc: $2sxcService,
    private appRef: ApplicationRef
  ) {
    this.frame = <IDialogFrameElement>win.frameElement;
    this.dashInfo = this.frame.getAdditionalDashboardConfig();

    Observable.merge(
      this.updateTemplateSubject.asObservable(),
      this.updateAppSubject.asObservable()
    ).subscribe(res => {
      this.loading = true;
    });

    this.updateAppSubject
      .debounceTime(400)
      .subscribe(({ app, preview }) => {
        this.api.setAppId(app.appId.toString())
          .subscribe(res => {
            if (app.supportsAjaxReload) return this.frame.sxc.manage.contentBlock.reloadAndReInitialize(true, true)
              .then(() => {
                (() => {
                  if (!preview) return this.api.loadTemplates().toPromise()
                    .then(() => this.template = this.templates[0]);
                  return Promise.resolve();
                })()
                  .then(() => {
                    this.loading = false;
                    this.frame.scrollToTarget();
                    this.appRef.tick();
                    this.updatingApp = false;
                  });
              });

            if (preview) return this.frame.sxc.manage.contentBlock.reloadNoLivePreview(`<p class="no-live-preview-available">The app <b>${app.name}</b> does not have a live preview. Please click on it to see it in action!</p>`)
              .then(() => {
                this.loading = false;
                this.frame.scrollToTarget();
                this.appRef.tick();
              });

            win.parent.location.reload();
            this.updatingApp = false;
          })
      });

    this.updateTemplateSubject
      .debounceTime(400)
      .subscribe(({ template, preview }) => {
        console.log('updaing template');
        if (!preview) this.template = template;
        if (this.supportsAjax) return this.frame.sxc.manage.contentBlock.reload(template.TemplateId)
          .then(() => {
            this.loading = false;
            this.frame.scrollToTarget();
            this.appRef.tick();
          });

        if (preview) return this.frame.sxc.manage.contentBlock.reloadNoLivePreview(`<p class="no-live-preview-available">The content type <b>${template.Name}</b> does not have a live preview. Please click on it to see it in action!</p>`)
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
        this.setApps(apps)
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

    Observable.concat([
      this.api.loadTemplates(),
      this.api.loadContentTypes()
    ]);
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

  private setApps(apps: App[]) {
    this.apps = apps;
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
    if (this.templates.find(t => t.ContentTypeStaticName === '')) {
      let name = "TemplatePicker.LayoutElement";
      contentTypes.push({
        StaticName: this.cViewWithoutContent,
        Name: name,
        Label: name,
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

  updateContentType(contentType: ContentType, preview: boolean = false, keepTemplate: boolean = false) {
    if (!preview) {
      this.contentType = contentType;
      this.tabIndex = 1;
    }

    this.filterTemplates(contentType);
    if (this.templates.length === 0) return false;
    this.updateTemplateSubject.next({
      template: keepTemplate ? this.template : this.templates[0],
      preview
    });
  }

  reloadContentType() {
    this.updateContentType(this.contentType, true, true);
  }

  reloadApp() {
    this.updateApp(this.app, true);
  }

  updateApp(app: App, preview: boolean = false) {
    if (!preview) {
      this.app = app;
      this.tabIndex = 1;
      this.updatingApp = true;
    } else if (this.updatingApp) {
      return false;
    }

    this.updateAppSubject.next({
      app,
      preview,
    });
  }

  toggle() {
    if (this.dashInfo.templateChooserVisible) return this.frame.sxc.manage.contentBlock._cancelTemplateChange();
  }
}