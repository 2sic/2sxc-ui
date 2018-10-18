import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';
import { cViewWithoutContent, i18nTemplatePicker } from './constants';


@Injectable()
export class CurrentDataService {
  config: IQuickDialogConfig;
  app$: Observable<App>;
  contentType$: Observable<ContentType>;


  template: Template;
  templates: Template[] = [];
  private allTemplates: Template[] = [];

  contentTypes: ContentType[] = [];
  contentType: ContentType; // todo: try to remove, and use stream only...

  private appIdSubject = new ReplaySubject<number>();
  private ctSubject = new ReplaySubject<ContentType>();

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
    ) {

    this.app$ = Observable
      .combineLatest(this.api.apps$, this.appIdSubject,
        (apps, appId) => apps.find(a => a.appId === appId));

    this.contentType$ = this.ctSubject.asObservable();

    // load all templates into the array for further use
    this.api.templates$
        .subscribe(templates => this.allTemplates = templates);
  }


  init(config: IQuickDialogConfig) {
    this.config = config;
    this.activateCurrentApp(config.appId);

    this.api.contentTypes$
      .subscribe(contentTypes => this.initContentTypes(contentTypes, config.contentTypeId));

    this.contentType$.do(ct => this.contentType = ct).subscribe();

    // start with the current template, if it was selected
    this.api.templates$
      .take(1)
      .do(templates => {
        if (config.templateId)
          this.template = templates.find(t => t.TemplateId === config.templateId);
      })
      .subscribe();

      Observable.combineLatest([
        this.api.templates$,
        this.api.contentTypes$,
        this.api.apps$
      ]).subscribe(res => {
        this.activateContentType(this.contentType);
        // this.showInstaller = this.isContentApp
        //   ? res[0].length === 0
        //   : res[2].filter(a => a.appId !== cAppActionImport).length === 0;
      });
  }

  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
  }

  activateContentType(contentType: ContentType) {
    // this.contentType = contentType;
    this.ctSubject.next(contentType);
    this.templates = this.findTemplatesForContentType(contentType);
  }

  private findTemplatesForContentType(contentType: ContentType): Template[] {
    return this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.config.isContent
    });
  }

  private initContentTypes(contentTypes: ContentType[], selectedContentTypeId: string) {
    let ct: ContentType;
    if (selectedContentTypeId) {
      ct = contentTypes.find(c => c.StaticName === selectedContentTypeId);
      if (ct)
        this.ctSubject.next(ct);
    }
    contentTypes
      .filter(c => (this.template && c.TemplateId === this.template.TemplateId)
        || (ct && c.StaticName === ct.StaticName))
      .forEach(c => c.IsHidden = false);

    // option for no content types
    // const name = 'TemplatePicker.LayoutElement';
    if (this.allTemplates.find(t => t.ContentTypeStaticName === '')) {
      contentTypes.push({
        StaticName: cViewWithoutContent,
        Name: i18nTemplatePicker,
        Thumbnail: null,
        Label: i18nTemplatePicker, // todo this.translate.transform(name),
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

}
