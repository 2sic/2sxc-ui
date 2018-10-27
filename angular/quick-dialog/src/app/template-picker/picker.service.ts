import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { App } from 'app/core/app';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';
import { log as parentLog } from 'app/core/log';
import { Constants } from 'app/core/constants';

const debug = true;
const debugStreams = true;
const log = parentLog.subLog('api', debug);

@Injectable()
export class PickerService {
  apps$: Observable<App[]>;
  contentTypes$: Observable<ContentType[]>;
  templates$: Observable<Template[]>;
  ready$ = new Observable<boolean>();

  private mustLoadApps = false;
  // all the subjects - these are all multi-cast, so don't use share!
  private appsSubject = new BehaviorSubject<App[]>([]);
  private contentTypesSubject = new Subject<ContentType[]>();
  private templatesSubject = new Subject<Template[]>();

  constructor(private http: Http) {
    this.apps$ = this.appsSubject.asObservable();
    this.contentTypes$ = this.contentTypesSubject.asObservable();
    this.templates$ = this.templatesSubject.asObservable();
    this.ready$ = Observable
      .combineLatest(this.apps$, this.contentTypes$, this.templates$,
        (a, ct, t) => ({ apps: a, types: ct, templates: t}))
        .do(x => log.add(`prefilter update`))
      .filter(set => this.mustLoadApps || !!set.apps)
        .do(x => log.add(`postfilter update`))
      .map(() => true)
      .startWith(false)
      .share();

    this.enableLogging();
  }

  public setAppId(appId: string): Observable<any> {
    // skip doing anything here, if we're in content-mode (which doesn't use/change apps)
    if (!this.loadApps) return;

    const appSet$ = this.http.get(`${Constants.apiRoot}SetAppId?appId=${appId}`);
    appSet$.subscribe(() => {
      this.loadTemplates();
      this.loadContentTypes();
    });
    return appSet$;
  }


  public initLoading(requireApps: boolean) {
    this.mustLoadApps = requireApps;
    if (requireApps) this.loadApps();
    this.loadTemplates();
    this.loadContentTypes();
  }

  /**
   * load templates - is sometimes repeated if the app changes
   */
  public loadTemplates(): void {
    const obs = this.http.get(`${Constants.apiRoot}GetSelectableTemplates`)
      .map(response => response.json() || []);
    obs.subscribe(json => this.templatesSubject.next(json));
  }

  /**
   * Load the ContentTypes - only needed on first initialization
   */
  private loadContentTypes(): void {
    this.http.get(`${Constants.apiRoot}GetSelectableContentTypes`)
      .map(response => (response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      }))
      .subscribe(json => this.contentTypesSubject.next(json));
  }

  /**
   * Load all Apps, only needed on first initialization
   */
  private loadApps(): void {
    this.http.get(`${Constants.apiRoot}GetSelectableApps`)
      .map(response => response.json().map(this.pascalCaseToCamelCase))
      .subscribe(json => this.appsSubject.next(json));
  }

  private pascalCaseToCamelCase(obj): any {
    return Object.keys(obj)
      .reduce((t, v) => {
        t[v.split('').reduce((t, v, k) => t + (k === 0 ? v.toLowerCase() : v), '')] = obj[v];
        return t;
      }, {});
  }


  private enableLogging() {
    if (debugStreams) {
      this.apps$.subscribe(a => log.add(`app$:${a && a.length}`));
      this.contentTypes$.subscribe(ct => log.add(`contentTypes$:${ct && ct.length}`));
      this.templates$.subscribe(t => log.add(`templates$:${t && t.length}`));
    }
    this.ready$.subscribe(r => log.add(`ready$:${r}`) );
  }

}
