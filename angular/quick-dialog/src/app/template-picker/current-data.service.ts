import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject,  } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';
import { log as parentLog } from 'app/core/log';
import { ContentTypesProcessor } from './data/content-types-processor.service';

const debug = true;
const log = parentLog.subLog('state', debug);

@Injectable()
export class CurrentDataService {
  /** Currently selected app */
  app$: Observable<App>;

  /** Relevant types */
  types$: Observable<ContentType[]>;

  // private initDoneSubject = new BehaviorSubject<boolean>(false);

  /** stream saying when it's ready */
  // initDone$ = this.initDoneSubject.filter(i => i); // don't fire till ready

  /** Stream containing the currently selected template or null if not selected */
  template$: Observable<Template>;

  /** all templates relevant for the UI */
  templates$: Observable<Template[]>;

  private appIdSubject = new BehaviorSubject<number>(null);
  private ctSubject = new BehaviorSubject<ContentType>(null);
  private templateSubject = new BehaviorSubject<Template>(null);

  /** The currently selected type */
  type$ = this.ctSubject.asObservable();

  private config: IQuickDialogConfig;

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
    private ctProcessor: ContentTypesProcessor
  ) {
    // app-stream should contain selected app
    this.app$ = Observable.combineLatest(
      this.api.apps$,
      this.appIdSubject.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId));

    // reset template if the app or type changes
    this.app$.distinctUntilChanged().filter(a => !!a)
      .subscribe(() => this.activateTemplate(null));
    this.type$.distinctUntilChanged().filter(t => !!t)
      .subscribe(() => this.activateTemplate(null));

    // the templates-list is always filtered by the currently selected type
    this.templates$ = Observable.combineLatest(
      this.api.templates$,
      this.type$,
      (all, current) => this.findTemplatesForTypeOrAll(all, current))
      .startWith(new Array<Template>());

    // the current template is either the last selected, or auto-selected when conditions change
    this.template$ = Observable.combineLatest(
      this.templateSubject.asObservable(),
      this.templates$,
      this.type$,
      this.app$,
      (selected, templates, type, app) => this.pickSelectedTemplate(selected, templates, type, app))
      .startWith(null);

    // construct list of relevant types for the UI
    this.types$ = Observable.combineLatest(
      this.api.contentTypes$,
      this.type$,
      this.api.templates$,
      this.template$,
      (types, type, templates, template) => this.ctProcessor.buildList(types, type, templates, template));
  }

  init(config: IQuickDialogConfig): Observable<boolean> {
    this.config = config;
    // app-init is ready, if it has an app or doesn't need to init one
    const initAppReady$ = this.app$.map(a => !!a).startWith(!config.appId);
    const initTemplateReady$ = this.template$.map(t => !!t).startWith(!config.templateId);
    const initTypeReady$ = this.type$.map(t => !!t).startWith(!config.contentTypeId);
    const initAllReady$ = Observable.combineLatest(initAppReady$, initTemplateReady$, initTypeReady$,
      (a, tem, typ) => a && tem && typ);

    if (debug) this.initObservableLogging(initAppReady$, initTypeReady$, initTemplateReady$, initAllReady$);

    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.api.contentTypes$
      .subscribe(contentTypes => this.initSelectedContentTypes(contentTypes, config.contentTypeId));

    // start with the current template, if it was selected (looks for template w/ID)
    this.api.templates$.first()//take(1)
      .do(templates => {
        if (config.templateId) {
          log.add(`starting with templateId = ${config.templateId}`);
          this.activateTemplate(templates.find(t => t.TemplateId === config.templateId));
        }
        // hacky - find better solution in the future
        // this.initDoneSubject.next(true);
      }).subscribe();


    return initAllReady$; // this.initDone$;
  }

  private initObservableLogging(inita$: Observable<boolean>,
    inittyp$: Observable<boolean>,
    initt$: Observable<boolean>,
    initAll$: Observable<boolean>): void {
    const prefix = 'stream:';
    function addLog(name: string, obj: any): void {
      log.add(`${prefix}${name}: ${obj}`);
    }
    this.type$.do(t => addLog(`type`, t && t.Label)).subscribe();
    this.app$.do(a => addLog(`app`, a && a.appId)).subscribe();
    this.template$.do(t => addLog(`template`, t && t.TemplateId)).subscribe();
    inita$.do(t => addLog(`init app`, t)).subscribe();
    inittyp$.do(t => addLog(`init type`, t)).subscribe();
    initt$.do(t => addLog(`init temp`, t)).subscribe();
    initAll$.do(t => addLog(`init all`, t)).subscribe();
  }



  //#region activate calls from outside
  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
    // this.activateTemplate(null);
  }
  activateType(contentType: ContentType) {
    this.ctSubject.next(contentType);
    // this.activateTemplate(null);
  }
  activateTemplate(template: Template) { this.templateSubject.next(template); }
  //#endregion


  //#region transformations for observables
  private pickSelectedTemplate(selected: Template, templates: Template[], type: ContentType, app: App): Template {
    // if one is selected, return that
    if (selected) return selected;

    // if none is selected, return the first; assuming a type or app has been selected
    if ((type || app) && templates && templates.length) return templates[0];

    // nothing valid
    return null;
  }

  private findTemplatesForTypeOrAll(allTemplates: Template[], contentType: ContentType): Template[] {
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
  //#endregion
}
