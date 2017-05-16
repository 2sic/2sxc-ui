import { Component, OnInit, Input, NgModule, Inject } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { ModuleApiService } from "app/core/module-api.service";
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TemplateFilterPipe } from "app/template-picker/template-filter.pipe";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { $2sxcService } from "app/core/$2sxc.service";
import { App } from "app/core/app";

declare const $2sxc: any;
var win = window;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss']
})
export class TemplatePickerComponent implements OnInit {
  allTemplates: any[] = [];
  templates: any[] = [];
  contentTypes: any[] = [];
  apps: App[] = [];
  frame: IDialogFrameElement;
  dashInfo: any;
  cViewWithoutContent: string = '_LayoutElement';
  cAppActionManage: number = -2;
  cAppActionImport: number = -1;
  cAppActionCreate: number = -3;
  isContentApp: boolean;
  supportsAjax: boolean;
  showProgress: boolean = false;
  showAdvanced: boolean;
  templateId: number;
  undoTemplateId: number;
  contentTypeId: number;
  undoContentTypeId: number;
  savedAppId: number;
  appId: number;
  isLoading: boolean = false;
  showInstaller: boolean = false;

  constructor(
    private api: ModuleApiService,
    private route: ActivatedRoute,
    public templateFilter: TemplateFilterPipe,
    private sxc: $2sxcService
  ) {
    this.frame = <IDialogFrameElement>win.frameElement;
    this.api.templates
      .subscribe(templates => this.setTemplates(templates));

    this.api.contentTypes
      .subscribe(contentTypes => this.setContentTypes(contentTypes));

    this.api.apps
      .subscribe(apps => this.setApps(apps));

    Observable.combineLatest([
      this.api.templates,
      this.api.contentTypes,
      this.api.apps
    ]).subscribe(res => {
      this.showInstaller = this.isContentApp
        ? res[0].length === 0
        : res[2].filter(a => a.appId !== this.cAppActionImport).length === 0
    });
  }

  ngOnInit() {
    console.log("frame", this.frame);
    this.dashInfo = this.frame.getAdditionalDashboardConfig();
    this.isContentApp = this.dashInfo.isContent;
    this.supportsAjax = this.isContentApp || this.dashInfo.supportsAjax;
    this.showAdvanced = this.dashInfo.user.canDesign;
    this.templateId = this.dashInfo.templateId;
    this.undoTemplateId = this.dashInfo.templateId;
    this.contentTypeId = this.dashInfo.contentTypeId;
    this.undoContentTypeId = this.contentTypeId;
    this.appId = this.dashInfo.appId || null;
    this.savedAppId = this.dashInfo.appId;
    this.frame.isDirty = this.isDirty;
    this.dashInfo.templateChooserVisible = true;

    console.log("inner content", this);

    this.api.loadTemplates();
    this.api.loadContentTypes();
    this.api.loadApps();
  }

  isDirty(): boolean {
    return false;
  }

  persistTemplate() {
    let cb = this.frame.sxc.manage.contentBlock;
    cb.templateId = this.templateId;
    cb.persistTemplate(false, false)
  }

  private appStore() {
    win.open("http://2sxc.org/en/apps");
  }

  private setTemplates(templates: any[]) {
    this.allTemplates = templates;
    this.filterTemplates(templates);
  }

  private filterTemplates(templates: any[]) {
    this.templates = this.templateFilter.transform(templates, {
      contentTypeId: this.contentTypeId,
      isContentApp: this.isContentApp
    });
  }

  private setApps(apps: App[]) {
    this.apps = apps;
    if (this.showAdvanced) apps.push(<App>{
      name: 'TemplatePicker.Install',
      appId: this.cAppActionImport
    });
  }

  private setContentTypes(contentTypes: any[]) {
    contentTypes
      .filter(c => c.StaticName === this.contentTypeId || c.TemplateId === this.templateId)
      .forEach(c => c.IsHidden = false);

    // option for no content types
    if (this.templates.find(t => t.ContentTypeStaticName === '')) {

      // TODO: i18n
      let name = "TemplatePicker.LayoutElement";
      contentTypes.push({
        StaticName: this.cViewWithoutContent,
        Name: name,
        Label: name,
        IsHidden: false
      });
    }

    this.contentTypes = contentTypes
      .sort((a, b) => {
        if (a.Name > b.Name) return 1;
        if (a.Name < b.Name) return -1;
        return 0;
      });
  }

  private updateTemplateId(evt) {
    let id = evt.value;
    if (this.supportsAjax) return this.frame.sxc.manage.contentBlock.reload(id);

    // TODO: Not sure why we need to set this value before calling persistTemplate. Clean up!
    this.frame.sxc.manage.contentBlock.templateId = this.templateId;

    // app
    this.frame.sxc.manage.contentBlock.persistTemplate(false)
      .then(() => win.parent.location.reload());
  }

  updateContentTypeId(evt) {
    let id = evt.value;

    this.filterTemplates(this.allTemplates);

    // select first template
    if (this.templates.length === 0) return false;
    this.templateId = this.templates[0].TemplateId;
  }

  updateAppId(evt) {
    let id = evt.value;

    // add app
    if (id === this.cAppActionImport) return this.frame.sxc.manage.run('app-import');

    // find new app specs
    let newApp = this.apps.find(a => a.appId === id);

    this.api.setAppId(id)
      .subscribe(res => {
        if (newApp.supportsAjaxReload) return this.frame.sxc.manage.contentBlock.reloadAndReInitialize(true);
        win.parent.location.reload();
      })
  }

  toggle() {
    if (this.dashInfo.templateChooserVisible) return this.frame.sxc.manage.contentBlock._cancelTemplateChange();
  }
}