
// #region imports
import { Injectable } from '@angular/core';
import { App } from 'app/core/app';
import { BehaviorObservable } from 'app/core/behavior-observable';
import { log as parentLog } from 'app/core/log';
import { DebugConfig } from 'app/debug-config';
import { IQuickDialogConfig } from 'app/interfaces/shared';
import { combineLatest, merge, Observable } from 'rxjs';
import { debounceTime, filter, map, scan, share, startWith, tap } from 'rxjs/operators';
import { ContentType } from './content-type';
import { ContentTypesProcessor } from './data/content-types-processor.service';
import { TemplateProcessor } from './data/template-processor';
import { PickerService } from './picker.service';
import { Template } from './template';
import { TemplateFilterPipe } from './template-filter.pipe';

// #endregion

const log = parentLog.subLog('state', DebugConfig.state.enabled);

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
    this.app$ = combineLatest([
      this.api.apps$,
      this.appId$
    ]).pipe(map(([apps, appId]) => apps.find(a => a.AppId === appId)));

    // current type should be either the initial type, or a manually selected type
    const initialType$ = combineLatest([
      this.initialTypeId$,
      this.api.contentTypes$
    ]).pipe(map(([typeId, all]) => ContentTypesProcessor.findContentTypesById(all, typeId)));

    this.type$ = merge(initialType$, this.selectedType$).pipe(
      startWith(null as ContentType),
      share()
    );

    // the templates-list is always filtered by the currently selected type
    this.templates$ = combineLatest([
      this.api.templates$,
      this.type$
    ]).pipe(
      map(([all, current]) => this.findTemplatesForTypeOrAll(all, current)),
      startWith(new Array<Template>())
    );

    // the current template is either the last selected, or auto-selected when conditions change
    const initialTemplate$ = combineLatest([
      this.initialTemplateId$,
      this.api.templates$
    ]).pipe(
        map(([id, templates]) => templates.find(t => t.TemplateId === id)),
        filter(t => t != null), // only allow new values which are not null, to guarantee later template$ updates don't affect this
        startWith(null as Template),
        share()
      );

    const selected$ = merge(initialTemplate$, this.selectedTemplate$.pipe(filter(t => t !== null)));
    this.template$ = combineLatest([
      selected$,
      this.templates$,
      this.type$,
      this.app$
    ]).pipe(
      map(([selected, templates, type, app]) => TemplateProcessor.pickSelected(selected, templates, type, app)),
      startWith(null as Template),
      share(),
      );

    // construct list of relevant types for the UI
    this.types$ = combineLatest([
      this.api.contentTypes$,
      this.type$,
      this.api.templates$,
      this.template$
    ]).pipe(
      map(([types, type, templates, template]) => this.ctProcessor.buildList(types, type, templates, template)),
      share()
    );
  }

  init(config: IQuickDialogConfig): Observable<boolean> {
    this.config = config;
    // app-init is ready, if it has an app or doesn't need to init one
    log.add(`initializing with config:${JSON.stringify(config)}`, config);
    const appReady$ = this.app$.pipe(
      map(a => config.isContent || !!a),
      startWith(config.isContent || !config.appId)
    );

    const typeReady$ = this.type$.pipe(
      map(t => !!t),
      scan((acc, value) => acc || value, !config.contentTypeId)
    );
    const templReady$ = this.template$.pipe(
      map(t => !!t),
      debounceTime(100), // need to debounce, because the template might have a value and change again
      startWith(!config.templateId)
    );

    const loadAll$ = combineLatest([
      appReady$,
      templReady$,
      typeReady$
    ]).pipe(map(set => set[0] && set[1] && set[2]));

    this.initLogging(appReady$, typeReady$, templReady$, loadAll$);

    // automatically set the app, type and template
    this.activateCurrentApp(config.appId);
    this.initialTypeId$.next(config.contentTypeId);
    this.initialTemplateId$.next(config.templateId);

    return loadAll$;
  }

  private initLogging(inita$: Observable<boolean>,
    inittyp$: Observable<boolean>,
    initt$: Observable<boolean>,
    initAll$: Observable<boolean>): void {
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
