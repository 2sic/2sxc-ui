import { Injectable } from '@angular/core';
import { Observable as O, BehaviorSubject, Subject,  } from 'rxjs/Rx';
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

const debug = false;
const debugStreams = true;
const debugInitValues = true;
const debugInitDetailed = false;
const log = parentLog.subLog('state', debug);

@Injectable()
export class CurrentDataService {
  /** Currently selected app */
  app$: O<App>;

  /** Relevant types */
  types$: O<ContentType[]>;

  /** The currently selected type */
  type$: O<ContentType>;

  /** Stream containing the currently selected template or null if not selected */
  template$: O<Template>;

  /** all templates relevant for the UI */
  templates$: O<Template[]>;

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
    this.buildBasicObservables();
  }

  private buildBasicObservables() {
    // app-stream should contain selected app, once the ID is known
    this.app$ = O.combineLatest(
      this.api.apps$,
      this.appId.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId));

    // current type should be either the initial type, or a manually selected type
    const initialType$ = this.initialTypeId.asObservable()
      .combineLatest(this.api.contentTypes$,
      (typeId, all) => ContentTypesProcessor.findContentTypesById(all, typeId));
    this.type$ = O
      .merge(initialType$, this.selectedType.asObservable())
      .startWith(null)
      .share();

    // the templates-list is always filtered by the currently selected type
    this.templates$ = O.combineLatest(
      this.api.templates$,
      this.type$,
      (all, current) => this.findTemplatesForTypeOrAll(all, current))
      .startWith(new Array<Template>());

    // the current template is either the last selected, or auto-selected when conditions change
    const initialTemplate$ = this.initialTemplateId.asObservable()
      .combineLatest(this.api.templates$.first(),
        (id, templates) => templates.find(t => t.TemplateId === id))
      .startWith(null)
      .share();
    const selected$ = O.merge(initialTemplate$, this.selectedTemplate.asObservable());
    this.template$ = O.combineLatest(
      selected$,
      this.templates$,
      this.type$,
      this.app$,
      (selected, templates, type, app) => TemplateProcessor.pickSelected(selected, templates, type, app))
      .startWith(null)
      .share();

    // construct list of relevant types for the UI
    this.types$ = O.combineLatest(
      this.api.contentTypes$,
      this.type$,
      this.api.templates$,
      this.template$,
      (types, type, templates, template) => this.ctProcessor.buildList(types, type, templates, template));
  }

  init(config: IQuickDialogConfig): O<boolean> {
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
    const isEverythingReady$ = O
      .combineLatest(initAppReady$, initTemplateReady$, initTypeReady$)
      .map(set => set[0] && set[1] && set[2]);

    if (debug) this.initObservableLogging(initAppReady$, initTypeReady$, initTemplateReady$, isEverythingReady$);

    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.initialTypeId.next(config.contentTypeId);
    this.initialTemplateId.next(config.templateId);

    return isEverythingReady$;
  }

  private initObservableLogging(inita$: O<boolean>,
    inittyp$: O<boolean>,
    initt$: O<boolean>,
    initAll$: O<boolean>): void {
      const slog = log.subLog('stream ');

      if (debugInitValues) {
        this.initialTypeId.asObservable().do(t => slog.add(`initial TypeId:'${t}'`, t)).subscribe();
        this.initialTemplateId.asObservable().do(t => slog.add(`initial TypeId:'${t}'`, t)).subscribe();
      }

      if (debugStreams) {
        this.type$.do(t => slog.add(`type update:'${t && t.Label}'`, t)).subscribe();
        this.app$.do(a => slog.add(`app update:'${a && a.appId}'`, a)).subscribe();
        this.template$.do(t => slog.add(`template update:'${t && t.TemplateId}'`, t)).subscribe();
        this.templates$.do(t => slog.add(`templates count:'${t && t.length}'`, t)).subscribe();
        this.types$.do(t => slog.add(`types count:'${t && t.length}'`, t)).subscribe();
      }

      if (debugInitDetailed) {
        inita$.do(t => slog.add(`init app`, t)).subscribe();
        inittyp$.do(t => slog.add(`init type`, t)).subscribe();
        initt$.do(t => slog.add(`init temp`, t)).subscribe();
      }
      initAll$.do(t => slog.add(`init all`, t)).subscribe();
  }



  //#region activate calls from outside
  activateCurrentApp(appId: number) {
    this.appId.next(appId);
  }
  activateType(contentType: ContentType) {
    this.selectedType.next(contentType);
  }
  activateTemplate(template: Template) {
    this.selectedTemplate.next(template);
  }
  //#endregion

  private findTemplatesForTypeOrAll(allTemplates: Template[], contentType: ContentType): Template[] {
    return this.templateFilter.transform(allTemplates, { contentType, isContent: this.config.isContent });
  }

}
