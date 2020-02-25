
// #region imports
import { scan, debounceTime, share, startWith, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable as O, combineLatest, merge } from 'rxjs';

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
import { BehaviorObservable } from 'app/core/behavior-observable';
// #endregion

const log = parentLog.subLog('state', DebugConfig.state.enabled);

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

  private appId$ = BehaviorObservable.create<number>(null);
  private initialTypeId$ = BehaviorObservable.create<string>(null);
  private initialTemplateId$ = BehaviorObservable.create<number>(null);
  private selectedType$ = BehaviorObservable.create<ContentType>(null);
  private selectedTemplate$ = BehaviorObservable.create<Template>(null);


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
    this.app$ = combineLatest(
      this.api.apps$,
      this.appId$,
      (apps, appId) => apps.find(a => a.AppId === appId));

    // current type should be either the initial type, or a manually selected type
    const initialType$ = combineLatest(
      this.initialTypeId$,
      this.api.contentTypes$,
      (typeId, all) => ContentTypesProcessor.findContentTypesById(all, typeId));
    this.type$ = merge(initialType$, this.selectedType$).pipe(
      startWith(null),
      share());

    // the templates-list is always filtered by the currently selected type
    this.templates$ = combineLatest(
      this.api.templates$,
      this.type$,
      (all, current) => this.findTemplatesForTypeOrAll(all, current))
      .pipe(startWith(new Array<Template>()));

    // the current template is either the last selected, or auto-selected when conditions change
    const initialTemplate$ = combineLatest(
      this.initialTemplateId$,
      this.api.templates$, //.pipe(first()),
      (id, templates) => templates.find(t => t.TemplateId === id)).pipe(
        filter(t => t != null), // only allow new values which are not null, to guarantee later template$ updates don't affect this
        startWith(null),
        share());

    const selected$ = merge(initialTemplate$, this.selectedTemplate$.pipe(filter(t => t !== null)));
    this.template$ = combineLatest(
      selected$,
      this.templates$,
      this.type$,
      this.app$,
      (selected, templates, type, app) => TemplateProcessor.pickSelected(selected, templates, type, app))
      .pipe(
        startWith(null),
        share());

    // construct list of relevant types for the UI
    this.types$ = combineLatest(
      this.api.contentTypes$,
      this.type$,
      this.api.templates$,
      this.template$,
      (types, type, templates, template) => this.ctProcessor.buildList(types, type, templates, template));
  }

  init(config: IQuickDialogConfig): O<boolean> {
    this.config = config;
    // app-init is ready, if it has an app or doesn't need to init one
    log.add(`initializing with config:${JSON.stringify(config)}`, config);
    const appReady$ = this.app$.pipe(
      map(a => config.isContent || !!a),
      startWith(config.isContent || !config.appId));

    const typeReady$ = this.type$.pipe(
      map(t => !!t),
      scan((acc, value) => acc || value, !config.contentTypeId));
    const templReady$ = this.template$.pipe(
      map(t => !!t),
      debounceTime(100), // need to debounce, because the template might have a value and change again
      startWith(!config.templateId));

    const loadAll$ = combineLatest(appReady$, templReady$, typeReady$)
      .pipe(map(set => set[0] && set[1] && set[2]));

    this.initLogging(appReady$, typeReady$, templReady$, loadAll$);

    // automatically set the app, type and template
    this.activateCurrentApp(config.appId);
    this.initialTypeId$.next(config.contentTypeId);
    this.initialTemplateId$.next(config.templateId);

    return loadAll$;
  }

  private initLogging(inita$: O<boolean>,
    inittyp$: O<boolean>,
    initt$: O<boolean>,
    initAll$: O<boolean>): void {
    const slog = log.subLog('stream', DebugConfig.state.streams);
    this.type$.subscribe(t => slog.add(`type$ update:'${t && t.Label}'`, t));
    this.app$.subscribe(a => slog.add(`app$ update:'${a && a.AppId}'`, a));
    this.template$.subscribe(t => slog.add(`template$ update:'${t && t.TemplateId}'`, t));
    this.templates$.subscribe(t => slog.add(`templates$ count:'${t && t.length}'`, t));
    this.types$.subscribe(t => slog.add(`types$ count:'${t && t.length}'`, t));
    this.selectedTemplate$.subscribe(t => slog.add(`selectedTemplate$: ${t && t.TemplateId}`));

    const initLog = log.subLog('stream-init', DebugConfig.state.inits);
    this.initialTypeId$.subscribe(t => initLog.add(`initial TypeId:'${t}'`, t));
    this.initialTemplateId$.subscribe(t => initLog.add(`initial TemplateId:'${t}'`, t));
    inita$.subscribe(t => initLog.add(`init app$`, t));
    inittyp$.subscribe(t => initLog.add(`init type$`, t));
    initt$.subscribe(t => initLog.add(`init temp$`, t));
    initAll$.subscribe(t => initLog.add(`init all$`, t));
  }



  //#region activate calls from outside
  activateCurrentApp(appId: number) {
    log.add(`activateApp(${appId})`);
    this.appId$.next(appId);
  }
  activateType(contentType: ContentType) {
    log.add(`activateType(${contentType.Name})`);
    this.selectedType$.next(contentType);
  }
  activateTemplate(template: Template) {
    log.add(`activateTemplate(${template.TemplateId})`);
    this.selectedTemplate$.next(template);
  }
  //#endregion

  private findTemplatesForTypeOrAll(allTemplates: Template[], contentType: ContentType): Template[] {
    return this.templateFilter.transform(allTemplates, { contentType, isContent: this.config.isContent });
  }

}
