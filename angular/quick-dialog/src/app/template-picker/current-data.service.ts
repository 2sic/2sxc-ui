import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';
import { log } from 'app/core/log';
import { TemplateData } from './data/template-data';


@Injectable()
export class CurrentDataService {
  app$: Observable<App>;
  relevantTypes$: Observable<ContentType[]>;

  template: Template;
  templates: Template[]; // = [];
  templates$: Observable<Template[]>;
  private allTemplates: Template[] = [];

  private appIdSubject = new ReplaySubject<number>();
  private ctSubject = new ReplaySubject<ContentType>();
  type$ = this.ctSubject.asObservable();

  private config: IQuickDialogConfig;

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
  ) {
    // app-stream should contain selected app
    this.app$ = Observable.combineLatest(this.api.apps$, this.appIdSubject.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId));

    // construct list of relevant types for the UI
    this.relevantTypes$ = Observable.combineLatest(
      this.api.contentTypes$,
      this.type$,
      this.api.templates$,
      (types, type, templates) => {
        let unhide = TemplateData.unhideSelectedType(types, type, this.template);
        unhide = TemplateData.addEmptyTypeIfNeeded(unhide, templates);
        return TemplateData.sortTypes(unhide);
      });

    // the templates-list is always filtered by the currently selected type
    this.templates$ = Observable.combineLatest(
      this.api.templates$,
      this.type$,
      (all, current) => this.findTemplatesForContentType(all, current)
    ).startWith(new Array<Template>());
    this.templates$.subscribe(all => this.templates = all); // temp till fixed

    // todo: get rid of this - as soon as template$ works
    // Observable.combineLatest(
    //   this.api.templates$,
    //   this.api.contentTypes$,
    //   this.api.apps$,
    //   this.type$,
    // ).subscribe(res => {
    //   this.activateTemplatesOfType(res[3]);
    // });

    // load all templates into the array for further use
    this.api.templates$
      .subscribe(templates => this.allTemplates = templates);
  }


  init(config: IQuickDialogConfig) {
    this.config = config;
    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.api.contentTypes$
      .subscribe(contentTypes => this.initSelectedContentTypes(contentTypes, config.contentTypeId));

    // start with the current template, if it was selected
    this.api.templates$
      .take(1)
      .do(templates => {
        if (config.templateId)
          this.template = templates.find(t => t.TemplateId === config.templateId);
      })
      .subscribe();

  }

  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
  }

  activateContentType(contentType: ContentType) {
    this.ctSubject.next(contentType);
    // this.activateTemplatesOfType(contentType);
  }

  // private activateTemplatesOfType(contentType: ContentType) {
  //   this.templates = this.findTemplatesForContentType(this.allTemplates, contentType);
  // }

  private findTemplatesForContentType(allTemplates: Template[], contentType: ContentType): Template[] {
    return this.templateFilter.transform(allTemplates, {
      typeId: contentType ? contentType.StaticName : undefined,
      isContent: this.config.isContent
    });
  }

  private initSelectedContentTypes(contentTypes: ContentType[], selectedContentTypeId: string): void {
    log.add(`initSelectedContentTypes(..., ${selectedContentTypeId}`);
    this.ctSubject.next(selectedContentTypeId
      ? contentTypes.find(c => c.StaticName === selectedContentTypeId)
      : undefined);
  }

}
