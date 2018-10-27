// #region imports
import { Injectable } from '@angular/core';
import { Observable as O, BehaviorSubject, Subject, } from 'rxjs/Rx';
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
import { DebugConfig } from 'app/debug-config';
// #endregion

const debugInitValues = true;
const debugInitDetailed = true;
const log = parentLog.subLog('state', DebugConfig.state);

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
  private initialTypeId = new BehaviorSubject<string>(null);
  private initialTemplateId = new BehaviorSubject<number>(null);
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
    // app-stream should contain selected app, once the ID is known - or null
    this.app$ = O.combineLatest(
      this.api.apps$,
      this.appId.asObservable(),
      (apps, appId) => apps.find(a => a.appId === appId));

    // current type should be either the initial type, or a manually selected type
    const initialType$ = O.combineLatest(
      this.initialTypeId.asObservable(),
      this.api.contentTypes$,
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
    const initialTemplate$ = O.combineLatest(
      this.initialTemplateId.asObservable(),
      this.api.templates$.first(),
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
    const appReady$ = this.app$
      .map(a => config.isContent || !!a)
      .startWith(config.isContent || !config.appId);

    const typeReady$ = this.type$
      .map(t => !!t)
      .scan((acc, value) => acc || value, !config.contentTypeId);
    const templReady$ = this.template$
      .map(t => !!t)
      .debounceTime(100) // need to debounce, because the template might have a value and change again
      .startWith(!config.templateId);

    const loadAll$ = O.combineLatest(appReady$, templReady$, typeReady$)
      .map(set => set[0] && set[1] && set[2]);

    this.initLogging(appReady$, typeReady$, templReady$, loadAll$);

    // automatically set the app, type and template
    this.activateCurrentApp(config.appId);
    this.initialTypeId.next(config.contentTypeId);
    this.initialTemplateId.next(config.templateId);

    return loadAll$;
  }

  private initLogging(inita$: O<boolean>,
    inittyp$: O<boolean>,
    initt$: O<boolean>,
    initAll$: O<boolean>): void {
    const slog = log.subLog('stream', DebugConfig.stateStreams);
    this.type$.subscribe(t => slog.add(`type$ update:'${t && t.Label}'`, t));
    this.app$.subscribe(a => slog.add(`app$ update:'${a && a.appId}'`, a));
    this.template$.subscribe(t => slog.add(`template$ update:'${t && t.TemplateId}'`, t));
    this.templates$.subscribe(t => slog.add(`templates$ count:'${t && t.length}'`, t));
    this.types$.subscribe(t => slog.add(`types$ count:'${t && t.length}'`, t));

    const initLog = log.subLog('stream-init', DebugConfig.stateInits);
    this.initialTypeId.asObservable().do(t => initLog.add(`initial TypeId:'${t}'`, t)).subscribe();
    this.initialTemplateId.asObservable().do(t => initLog.add(`initial TypeId:'${t}'`, t)).subscribe();
    inita$.do(t => initLog.add(`init app$`, t)).subscribe();
    inittyp$.do(t => initLog.add(`init type$`, t)).subscribe();
    initt$.do(t => initLog.add(`init temp$`, t)).subscribe();
    initAll$.subscribe(t => initLog.add(`init all$`, t));
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
