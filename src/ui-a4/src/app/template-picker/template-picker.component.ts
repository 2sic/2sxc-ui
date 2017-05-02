import { Component, OnInit, Input, NgModule, Inject } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { ModuleApiService } from "app/core/module-api.service";
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-template-picker',
  templateUrl: './template-picker.component.html',
  styleUrls: ['./template-picker.component.scss']
})
export class TemplatePickerComponent implements OnInit {
  private frame: IDialogFrameElement;
  private cViewWithoutContent: string = '_LayoutElement';
  private cAppActionManage: number = -2;
  private cAppActionImport: number = -1;
  private cAppActionCreate: number = -3;
  private apps: any[] = [];
  private contentTypes: any[] = [];
  private templates: any[] = [];
  private isContentApp: boolean;
  private supportsAjax: boolean;
  private showAdvanced: boolean;
  private templateId: number;
  private undoTemplateId: number;
  private contentTypeId: number;
  private undoContentTypeId: number;
  private appId: number;
  private savedAppId: number;
  private showRemoteInstaller: boolean = false;
  private remoteInstallerUrl: string = '';
  private isLoading: boolean = false;

  constructor(
    @Inject("windowObject") window: Window,
    private api: ModuleApiService,
    private router: Router
  ) {
    this.frame = <IDialogFrameElement>window.frameElement;
    console.log(router.parseUrl(router.url).queryParams);
  }

  isDirty(): boolean {
    return false;
  }

  /*realScope.$watch("vm.templateId", function (newTemplateId, oldTemplateId) {
      if (newTemplateId === oldTemplateId)
          return;

      // Content (ajax, don't save the changed value)
      if (vm.supportsAjax)
          return vm.renderTemplate(newTemplateId);

      // ToDo: Not sure why we need to set this value before calling persistTemplate. Clean up
      wrapper.contentBlock.templateId = vm.templateId;

      // App
      vm.persistTemplate(false)
          .then(function () {
              return wrapper.window.location.reload(); //note: must be in a function, as the reload is a method of the location object
          });
  });*/

  ngOnInit() {
    let di = this.frame.getAdditionalDashboardConfig();
    this.isContentApp = di.isContent;
    this.supportsAjax = this.isContentApp || di.supportsAjax;
    this.showAdvanced = di.user.canDesign;
    this.templateId = di.templateId;
    this.undoTemplateId = di.templateId;
    this.contentTypeId = di.contentTypeId;
    this.undoContentTypeId = this.contentTypeId;
    this.appId = di.appId || null;
    this.savedAppId = di.appId;
    this.frame.isDirty = this.isDirty;

    console.log({ frame: this.frame });
    // this.api.configure(moduleId, tabId)

    this.reloadTemplatesAndContentTypes();
  }

  private reloadTemplatesAndContentTypes(): Subscription {
    this.isLoading = true;
    return Observable.forkJoin([
      this.api.getSelectableContentTypes(),
      this.api.getSelectableTemplates()
    ]).subscribe(response => {
      console.log("response", response);
    })
  }

  /*vm.reloadTemplatesAndContentTypes = function () {
    var getContentTypes = svc.getSelectableContentTypes();
    var getTemplates = svc.getSelectableTemplates();

    return $q.all([getContentTypes, getTemplates])
      .then(function (res) {
        // map to view-model
        vm.contentTypes = res[0].data || [];
        vm.templates = res[1].data || [];

        // if the currently selected content-type/template is configured to hidden, 
        // re-show it, so that it can be used in the selectors
        function unhideUsedContentType(filter) {
          var found = vm.contentTypes.filter(filter);
          if (found && found[0] && found[0].IsHidden) found[0].IsHidden = false;
        }
        unhideUsedContentType(function (item) { return item.StaticName === vm.contentTypeId; });
        unhideUsedContentType(function (item) { return item.TemplateId === vm.templateId; });

        // unhide the currently used template
        var tmpl = $filter("filter")(vm.templates, { TemplateId: vm.templateId }, true);
        if (tmpl && tmpl[0]) tmpl[0].IsHidden = false;

        // Add option for no content type if there are templates without
        if ($filter("filter")(vm.templates, { ContentTypeStaticName: "" }, true).length > 0) {
          var le = { StaticName: cViewWithoutContent, Name: $translate.instant("TemplatePicker.LayoutElement"), IsHidden: false };
          le.Label = le.Name;
          vm.contentTypes.push(le);
        }

        // sort them now
        vm.contentTypes = $filter("orderBy")(vm.contentTypes, "Name");

        vm.loading--;
      });
  };*/
}
