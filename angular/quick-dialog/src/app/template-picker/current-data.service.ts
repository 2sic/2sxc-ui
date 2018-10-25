import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject,  } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';
import { log as parentLog } from 'app/core/log';
import { ContentTypesProcessor } from './data/content-types-processor.service';
import { TemplateProcessor } from './data/template-processor';

const debug = true;
const debugStreams = true;
const debugInitValues = true;
const debugInitDetailed = false;
const log = parentLog.subLog('state', debug);

@Injectable()
export class CurrentDataService {
  /** Currently selected app */
  app$: Observable<App>;

  /** Relevant types */
  types$: Observable<ContentType[]>;

  /** The currently selected type */
  type$: Observable<ContentType>;

  /** Stream containing the currently selected template or null if not selected */
  template$: Observable<Template>;

  /** all templates relevant for the UI */
  templates$: Observable<Template[]>;

  private appId = new BehaviorSubject<number>(null);
  private initialTypeId = new Subject<string>();
  private initialTemplateId = new Subject<number>();
  private selectedType = new BehaviorSubject<ContentType>(null);
  private selectedTemplate = new BehaviorSubject<Template>(null);


  private config: IQuickDialogConfig;

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
    private ctProcessor: ContentTypesProcessor
  ) {
    // app-stream should contain selected app, once the ID is known
    this.app$ = Observable.combineLatest(
      this.api.apps$,
      this.appId.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId));

    // current type should be either the initial type, or a manually selected type
    const initialType$ = this.initialTypeId.asObservable()
      .combineLatest(this.api.contentTypes$,
      (typeId, all) => ContentTypesProcessor.findContentTypesById(all, typeId));
    this.type$ = Observable
      .merge(initialType$, this.selectedType.asObservable())
      .share();


    // reset template if the app or type changes
    // this.app$.distinctUntilChanged().filter(a => !!a)
    //   .subscribe(() => this.activateTemplate(null));
    // this.type$.distinctUntilChanged().filter(t => !!t)
    //   .subscribe(() => this.activateTemplate(null));

    // the templates-list is always filtered by the currently selected type
    this.templates$ = Observable.combineLatest(
      this.api.templates$,
      this.type$,
      (all, current) => this.findTemplatesForTypeOrAll(all, current))
      .startWith(new Array<Template>());

    // the current template is either the last selected, or auto-selected when conditions change
    const initialTemplate$ = this.initialTemplateId.asObservable()
      .combineLatest(this.api.templates$.first(),
        (id, templates) => templates.find(t => t.TemplateId === id))
      .share();
    const selected$ = Observable.merge(initialTemplate$, this.selectedTemplate.asObservable());
    this.template$ = Observable.combineLatest(
      selected$,
      this.templates$,
      this.type$,
      this.app$,
      (selected, templates, type, app) => TemplateProcessor.pickSelected(selected, templates, type, app))
      .startWith(null)
      .share();

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
    log.add(`initializing with config:`, config);
    const initAppReady$ = this.app$
      .map(a => config.isContent || !!a)
      .startWith(config.isContent || !config.appId);
    const initTypeReady$ = this.type$
      .map(t => !!t)
      .startWith(!config.contentTypeId);
    const initTemplateReady$ = this.template$
      .map(t => !!t)
      .debounceTime(100) // need to debounce, because the template might have a value and change again
      .startWith(!config.templateId);
    const initAllReady$ = Observable
      .combineLatest(initAppReady$, initTemplateReady$, initTypeReady$)
      .map(set => set[0] && set[1] && set[2]);

    if (debug) this.initObservableLogging(initAppReady$, initTypeReady$, initTemplateReady$, initAllReady$);

    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.initialTypeId.next(config.contentTypeId);
    this.initialTemplateId.next(config.templateId);

    // this.api.contentTypes$
    //   .subscribe(contentTypes => this.findContentTypesById(contentTypes, config.contentTypeId));

    // start with the current template, if it was selected (looks for template w/ID)
    // this.api.templates$.first()
    //   .do(templates => {
    //     if (config.templateId) {
    //       log.add(`starting with templateId = ${config.templateId}`);
    //       this.activateTemplate(templates.find(t => t.TemplateId === config.templateId));
    //     }
    //     // hacky - find better solution in the future
    //     // this.initDoneSubject.next(true);
    //   }).subscribe();


    return initAllReady$;
  }

  private initObservableLogging(inita$: Observable<boolean>,
    inittyp$: Observable<boolean>,
    initt$: Observable<boolean>,
    initAll$: Observable<boolean>): void {
    const prefix = 'stream:';
    function addLog(name: string, obj: any): void {
      log.add(`${prefix}${name}:`, obj);
    }

    if (debugInitValues) {
      this.initialTypeId.asObservable().do(t => addLog(`initial TypeId:'${t}'`, t)).subscribe();
      this.initialTemplateId.asObservable().do(t => addLog(`initial TypeId:'${t}'`, t)).subscribe();
    }

    if (debugStreams) {
      this.type$.do(t => addLog(`type update:'${t && t.Label}'`, t)).subscribe();
      this.app$.do(a => addLog(`app update:'${a && a.appId}'`, a)).subscribe();
      this.template$.do(t => addLog(`template update:'${t && t.TemplateId}'`, t)).subscribe();
      this.templates$.do(t => addLog(`templates count:'${t && t.length}'`, t)).subscribe();
      this.types$.do(t => addLog(`types count:'${t && t.length}'`, t)).subscribe();
    }

    if (debugInitDetailed) {
      inita$.do(t => addLog(`init app`, t)).subscribe();
      inittyp$.do(t => addLog(`init type`, t)).subscribe();
      initt$.do(t => addLog(`init temp`, t)).subscribe();
    }
    initAll$.do(t => addLog(`init all`, t)).subscribe();
  }



  //#region activate calls from outside
  activateCurrentApp(appId: number) {
    this.appId.next(appId);
    // this.activateTemplate(null);
  }
  activateType(contentType: ContentType) {
    this.selectedType.next(contentType);
    // this.activateTemplate(null);
  }
  activateTemplate(template: Template) {
    this.selectedTemplate.next(template);
  }
  //#endregion

  private findTemplatesForTypeOrAll(allTemplates: Template[], contentType: ContentType): Template[] {
    return this.templateFilter.transform(allTemplates, { contentType, isContent: this.config.isContent });
  }

}
