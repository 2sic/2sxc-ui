import { combineLatest } from 'rxjs';
import { map, startWith, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { App } from 'app/core/app';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';
import { log as parentLog } from 'app/core/log';
import { Constants } from 'app/core/constants';
import { DebugConfig } from 'app/debug-config';
import { BehaviorObservable } from 'app/core/behavior-observable';
import { Config } from '../config';

const log = parentLog.subLog('api', DebugConfig.api.enabled);
const uninitializedList = []; // this must be created as a variable, so we can check later if it's still the original or a new empty list
@Injectable()
export class PickerService {
  // #region public properties
  /** all apps of the zone */
  apps$ = BehaviorObservable.create<App[]>(uninitializedList);

  /** all types of this app */
  contentTypes$ = BehaviorObservable.create<ContentType[]>(uninitializedList);

  /** templates/views of this app */
  templates$ = BehaviorObservable.create<Template[]>(uninitializedList);

  /**
   * ready is true when all necessary data is loaded
   * note that apps are not loaded if not needed */
  ready$ = new Observable<boolean>();
  // #endregion

  // #region private properties
  private mustLoadApps = false;
  // all the subjects - these are all multi-cast, so don't use share!
  // #endregion

  constructor(private http: HttpClient) {
    log.add('constructor()');
    this.buildObservables();
    this.enableLogging();
  }

  private buildObservables() {
    log.add(`buildObservables()`);

    // ready requires all to have data, but app can be skipped if not required
    this.ready$ = combineLatest([this.apps$, this.contentTypes$, this.templates$])
      .pipe(
        map(([a, ct, t]) => ({ apps: a, types: ct, templates: t })),
        map(set => set.templates !== uninitializedList
          && set.types !== uninitializedList
          && (!this.mustLoadApps || !!(set.apps && set.apps !== uninitializedList))),
        startWith(false),
        share());
  }

  public saveAppId(appId: string, reloadParts: boolean): Promise<any> {
    log.add(`saveAppId(${appId}, ${reloadParts})`);
    // skip doing anything here, if we're in content-mode (which doesn't use/change apps)
    if (!this.loadApps) throw new Error(`can't save app, as we're not in app-mode`);
    return this.http.post(`${Constants.webApiSetApp}?appId=${appId}`, {}).toPromise();
  }



  public initLoading(requireApps: boolean): Observable<any> {
    log.add(`initLoading(requireApps: ${requireApps})`);
    this.mustLoadApps = requireApps;
    if (requireApps) this.loadApps();
    return this.reloadAppParts();
  }

  public reloadAppParts(): Observable<any> {
    return combineLatest([this.loadTemplates(), this.loadContentTypes()]);
  }

  /**
   * load templates - is sometimes repeated if the app changes
   */
  public loadTemplates(): Observable<any> {
    log.add('loadTemplates()');
    this.templates$.reset();
    const obs = this.http.get<Template[]>(Constants.webApiGetTemplates)
      .pipe(share()); // ensure it's only run once

    obs.subscribe(response => this.templates$.next(response || []));
    return obs;
  }

  /**
   * Load the ContentTypes - only needed on first initialization
   */
  private loadContentTypes(): Observable<any> {
    log.add(`loadContentTypes()`);
    this.contentTypes$.reset();
    const obs = this.http.get<ContentType[]>(Constants.webApiGetTypes)
      .pipe(share()); // ensure it's only run once
    obs.pipe(map(response => (response || []).map(ct => {
        ct.Label = ct.Properties?.Label ?? ct.Name;
        return ct;
      })))
      .subscribe(json => this.contentTypes$.next(json));
    return obs;
  }

  /**
   * Load all Apps, only needed on first initialization
   */
  private loadApps(): Observable<any> {
    const alreadyLoaded = !this.apps$.isInitial();
    log.add(`loadApps() - skip:${alreadyLoaded}`);
    if (alreadyLoaded) return;

    const appsFilter = Config.apps();

    const obs = this.http.get<any[]>(`${Constants.webApiGetApps}?apps=${appsFilter}`)
      .pipe(share()); // ensure it's only run once

    obs.subscribe(response => this.apps$.subject.next(response.map(a => new App(a))));
    return obs;
  }

  private enableLogging() {
    const streamLog = parentLog.subLog('api-streams', DebugConfig.api.streams);
    this.apps$.subscribe(a => streamLog.add(`app$:${a && a.length}`));
    this.contentTypes$.subscribe(ct => streamLog.add(`contentTypes$:${ct && ct.length}`));
    this.templates$.subscribe(t => streamLog.add(`templates$:${t && t.length}`));
    this.ready$.subscribe(r => streamLog.add(`ready$:${r}`));
  }

}
