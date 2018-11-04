// #region imports
import {combineLatest} from 'rxjs';

import {map, filter, startWith, share} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Http } from '@angular/http';
import { App } from 'app/core/app';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';
import { log as parentLog } from 'app/core/log';
import { Constants } from 'app/core/constants';
import { DebugConfig } from 'app/debug-config';
// #endregion

const log = parentLog.subLog('api', DebugConfig.api);
const emptyAppList = []; // this must be created as a variable, so we can check later if it's still the original or a new empty list
@Injectable()
export class PickerService {
  // #region public properties
  /** all apps of the zone */
  apps$: Observable<App[]>;

  /** all types of this app */
  contentTypes$: Observable<ContentType[]>;

  /** templates/views of this app */
  templates$: Observable<Template[]>;

  /**
   * ready is true when all necessary data is loaded
   * note that apps are not loaded if not needed */
  ready$ = new Observable<boolean>();
  // #endregion

  // #region private properties
  private mustLoadApps = false;
  // all the subjects - these are all multi-cast, so don't use share!
  const 
  private appsSubject = new BehaviorSubject<App[]>(emptyAppList);
  private contentTypesSubject = new Subject<ContentType[]>();
  private templatesSubject = new Subject<Template[]>();
  // #endregion

  constructor(private http: Http) {
    log.add('constructor()');
    this.buildObservables();
    this.enableLogging();
  }

  private buildObservables() {
    log.add(`buildObservables()`);
    this.apps$ = this.appsSubject.asObservable();
    this.contentTypes$ = this.contentTypesSubject.asObservable();
    this.templates$ = this.templatesSubject.asObservable();

    // ready requires all to have data, but app can be skipped if not required
    this.ready$ = combineLatest(this.apps$, this.contentTypes$, this.templates$,
        (a, ct, t) => ({ apps: a, types: ct, templates: t })).pipe(
      filter(set => !this.mustLoadApps || !!(set.apps && set.apps !== emptyAppList)))
        .pipe(
      map(() => true),
      startWith(false),
      share());
  }

  public saveAppId(appId: string, reloadParts: boolean): Promise<any> {
    log.add(`saveAppId(${appId}, ${reloadParts})`);
    // skip doing anything here, if we're in content-mode (which doesn't use/change apps)
    if (!this.loadApps) throw "can't save app, as we're not in app-mode";

    return this.http.get(`${Constants.apiRoot}SetAppId?appId=${appId}`).toPromise();
  }

  public reloadAppParts(): Observable<any> {
    return combineLatest(
      this.loadTemplates(),
      this.loadContentTypes());
  }

  public initLoading(requireApps: boolean) {
    log.add(`initLoading(requireApps: ${requireApps})`);
    this.mustLoadApps = requireApps;
    if (requireApps) this.loadApps();
    this.loadTemplates();
    this.loadContentTypes();
  }

  /**
   * load templates - is sometimes repeated if the app changes
   */
  public loadTemplates(): Observable<any> {
    log.add('loadTemplates()');
    const obs = this.http.get(`${Constants.apiRoot}GetSelectableTemplates`).pipe(
      share(), // ensure it's only run once
      map(response => response.json() || []));
    obs.subscribe(json => this.templatesSubject.next(json));
    return obs;
  }

  /**
   * Load the ContentTypes - only needed on first initialization
   */
  private loadContentTypes(): Observable<any> {
    log.add(`loadContentTypes()`);
    const obs = this.http.get(`${Constants.apiRoot}GetSelectableContentTypes`).pipe(
      share(), // ensure it's only run once
      map(response => (response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      })));
    obs.subscribe(json => this.contentTypesSubject.next(json));
    return obs;
  }

  /**
   * Load all Apps, only needed on first initialization
   */
  private loadApps(): void {
    log.add('loadApps()');
    this.http.get(`${Constants.apiRoot}GetSelectableApps`).pipe(
      map(response => response.json().map(this.pascalCaseToCamelCase)))
      .subscribe(json => this.appsSubject.next(json));
  }

  private pascalCaseToCamelCase(obj): any {
    return Object.keys(obj)
      .reduce((t, v) => {
        t[v.split('').reduce((prev, current, i) => prev + (i === 0 ? current.toLowerCase() : current), '')] = obj[v];
        return t;
      }, {});
  }


  private enableLogging() {
    const streamLog = parentLog.subLog('api-streams', DebugConfig.apiStreams);
    this.apps$.subscribe(a => streamLog.add(`app$:${a && a.length}`));
    this.contentTypes$.subscribe(ct => streamLog.add(`contentTypes$:${ct && ct.length}`));
    this.templates$.subscribe(t => streamLog.add(`templates$:${t && t.length}`));
    this.ready$.subscribe(r => streamLog.add(`ready$:${r}`));
  }

}
