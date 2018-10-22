import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs/Rx';
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

  private initDoneSubject = new BehaviorSubject<boolean>(false);
  initDone$ = this.initDoneSubject.filter(i => i); // don't fire till ready

  template: Template;

  /** Stream containing the currently selected template or null if not selected */
  template$: Observable<Template>;

  templates: Template[]; // = [];
  templates$: Observable<Template[]>;
  // private allTemplates: Template[] = [];

  private appIdSubject = new ReplaySubject<number>();
  private ctSubject = new ReplaySubject<ContentType>();
  private templateSubject = new ReplaySubject<Template>();
  type$ = this.ctSubject.asObservable();

  private config: IQuickDialogConfig;

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
  ) {
    // app-stream should contain selected app
    this.app$ = Observable.combineLatest(
      this.api.apps$,
      this.appIdSubject.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId)
    );

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

    this.template$ = Observable.combineLatest(
      this.api.templates$,
      this.templateSubject.asObservable(),
      (all, selected) => {
        if (selected) return selected;
        if (all && all.length) return all[0];
        return null;
      })
      .startWith(null);

    // temp till we don't need the template any more
    this.template$.subscribe(t => this.template = t);

    this.initObservableLogging();
  }


  init(config: IQuickDialogConfig) {
    this.config = config;
    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.api.contentTypes$
      .subscribe(contentTypes => this.initSelectedContentTypes(contentTypes, config.contentTypeId));

    // start with the current template, if it was selected (looks for template w/ID)
    this.api.templates$.take(1)
      .do(templates => {
        if (config.templateId)
          this.activateTemplate(templates.find(t => t.TemplateId === config.templateId));
        // hacky - find better solution in the future
        this.initDoneSubject.next(true);
      }).subscribe();

  }

  private initObservableLogging(): void {
    const prefix = 'stream:';
    function addLog(name: string, obj: any): void {
      log.add(`${prefix}${name}: ${obj}`);
    }
    this.type$.do(t => addLog(`type`, t)).subscribe();
    this.app$.do(a => addLog(`app`, a)).subscribe();
    this.template$.do(t => addLog(`template`, t)).subscribe();
    this.initDone$.do(t => addLog(`initDone`, t)).subscribe();
  }


  //#region activate calls from outside
  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
    this.templateSubject.next(null);
  }
  activateType(contentType: ContentType) {
    this.ctSubject.next(contentType);
    this.templateSubject.next(null);
  }
  activateTemplate(template: Template) { this.templateSubject.next(template); }
  //#endregion

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
      : null);
  }

}
