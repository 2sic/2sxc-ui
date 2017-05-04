import { Component, OnInit, Input, NgModule, Inject } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { ModuleApiService } from "app/core/module-api.service";
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TemplateFilterPipe } from "app/template-picker/template-filter.pipe";
import { HttpInterceptorService } from "app/http-interceptor.service";
import { Http } from "@angular/http";
import { GettingStartedService } from "app/getting-started.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { $2sxcService } from "app/core/$2sxc.service";
import { MdProgressBarModule } from '@angular/material';

declare const $2sxc: any;
var win = window;

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss']
})
export class TemplatePickerComponent implements OnInit {
  frame: IDialogFrameElement;
  dashInfo: any;
  cViewWithoutContent: string = '_LayoutElement';
  cAppActionManage: number = -2;
  cAppActionImport: number = -1;
  cAppActionCreate: number = -3;
  apps: any[] = [];
  contentTypes: any[] = [];
  templates: any[] = [];
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
  showRemoteInstaller: boolean = false;
  remoteInstallerUrl: string = '';
  isLoading: boolean = false;
  externalInstaller: any = {
    showIfConfigIsEmpty: () => {
      var showAutoInstaller = this.isContentApp
        ? this.templates.length === 0
        : this.apps.length === 0;

      if (showAutoInstaller) this.externalInstaller.setup();
    },
    configureCallback: () => {
      window.addEventListener("message", evt => {
        this.showProgress = true;
        // TODO: mid into service
        this.gettingStarted.processInstallMessage(evt, $2sxc.urlParams.require('mid'))
          .subscribe(() => this.showProgress = false);
      }, false);
    },
    setup: () => {
      this.api.gettingStartedUrl()
        .subscribe(response => {
          // only show getting started if it's really still a blank system, otherwise the server will return null, then don't do anything
          if (!response.json()) return;
          this.externalInstaller.configureCallback();
          this.showRemoteInstaller = true;
          this.remoteInstallerUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(response.json());
        });
    }
  };

  constructor(
    private api: ModuleApiService,
    private route: ActivatedRoute,
    private http: Http,
    private gettingStarted: GettingStartedService,
    public templateFilter: TemplateFilterPipe,
    private sanitizer: DomSanitizer,
    private sxc: $2sxcService
  ) {
    this.frame = <IDialogFrameElement>win.frameElement;
  }

  isDirty(): boolean {
    return false;
  }

  private appStore() {
    win.open("http://2sxc.org/en/apps");
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

    // select first template
    let firstTemplateId = this.templateFilter.transform(this.templates, id)[0].TemplateId;
    if (firstTemplateId === null) return false;
    this.templateId = firstTemplateId;
  }

  updateAppId(evt) {
    let id = evt.value;

    // add app
    if (id === this.cAppActionImport) return this.frame.sxc.manage.run('app-import');

    // find new app specs
    var newApp = this.apps.find(a => a.AppId === id);

    this.api.setAppId(id)
      .subscribe(res => {
        if (newApp.SupportsAjaxReload) return this.frame.sxc.manage.contentBlock.reloadAndReInitialize(true);
        win.parent.location.reload();
      })
  }

  ngOnInit() {
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
    this.reloadTemplatesAndContentTypes();
    this.show(true);
  }

  private reloadTemplatesAndContentTypes(): Observable<any> {
    this.isLoading = true;
    let obs = Observable.forkJoin([
      this.api.getSelectableContentTypes(),
      this.api.getSelectableTemplates()
    ]);

    obs.subscribe(res => {
      this.contentTypes = res[0] || [];
      this.templates = res[1] || [];

      // ensure current content type is visible
      this.contentTypes
        .filter(c => c.StaticName === this.contentTypeId || c.TemplateId === this.templateId)
        .forEach(c => c.IsHidden = false);

      // add option for no content type if there are templates without
      if (this.templates.find(t => t.ContentTypeStaticName === '')) {

        // TODO: i18n
        let name = "TemplatePicker.LayoutElement";
        this.contentTypes.push({
          StaticName: this.cViewWithoutContent,
          Name: name,
          Label: name,
          IsHidden: false
        });
      }

      // sort the content types
      this.contentTypes = this.contentTypes
        .sort((a, b) => {
          if (a.Name > b.Name) return 1;
          if (a.Name < b.Name) return -1;
          return 0;
        });

      this.isLoading = false;
    });

    return obs;
  }

  toggle() {
    if (this.dashInfo.templateChooserVisible) return this.frame.sxc.manage.contentBlock._cancelTemplateChange();
    this.show(true);
  }

  private show(stateChange): Subscription {
    // todo 8.4 disabled this, as this info should never be set from here again...
    if (stateChange !== undefined)  // optionally change the show-state
      this.dashInfo.templateChooserVisible = stateChange;

    if (this.dashInfo.templateChooserVisible) {
      let observables = [];

      if (this.appId !== null) // if an app had already been chosen OR the content-app (always chosen)
        observables.push(this.reloadTemplatesAndContentTypes());

      // if it's the app-dialog and the app's haven't been loaded yet...
      if (!this.isContentApp && this.apps.length === 0)
        observables.push(this.loadApps());

      return Observable.forkJoin(observables)
        .subscribe(this.externalInstaller.showIfConfigIsEmpty)
    }
  }

  private loadApps(): Observable<any> {
    let obs = this.api.getSelectableApps();
    obs.subscribe(apps => {
      this.apps = apps;
      console.log("apps", apps);


      if (this.showAdvanced) {
        this.apps.push({ Name: "TemplatePicker.Install", AppId: this.cAppActionImport });
      }
    });
    return obs;
  };
}
