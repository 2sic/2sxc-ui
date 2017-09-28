import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { $2sxcService } from "app/core/$2sxc.service";
import { Http } from "@angular/http";
import { App } from "app/core/app";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ModuleApiService {
  apps: Observable<any[]>;
  contentTypes: Observable<any[]>;
  gettingStarted: Observable<string>;
  templates: Observable<any[]>;

  private appSubject: Subject<any[]> = new Subject<any[]>();
  private contentTypeSubject: Subject<any[]> = new Subject<any[]>();
  private gettingStartedSubject: Subject<string> = new Subject<string>();
  private templateSubject: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: Http,
    private sxc: $2sxcService
  ) {
    this.apps = this.appSubject.asObservable();
    this.contentTypes = this.contentTypeSubject.asObservable();
    this.gettingStarted = this.gettingStartedSubject.asObservable();
    this.templates = this.templateSubject.asObservable();
  }

  public setAppId(appId: string): Observable<any> {
    return this.http.get(`view/Module/SetAppId?appId=${appId}`);
  }

  public loadGettingStarted(isContentApp: boolean): Observable<string> {
    let obs = this.http.get(`View/Module/RemoteInstallDialogUrl?dialog=gettingstarted&isContentApp=${isContentApp}`)
      .map(response => response.json());
    obs.subscribe(json => this.gettingStartedSubject.next(json));
    return obs;
  }

  public loadTemplates(): Observable<any> {
    let obs = this.http.get('View/Module/GetSelectableTemplates')
      .map(response => response.json() || []);
    obs.subscribe(json => this.templateSubject.next(json));
    return obs;
  }

  public loadContentTypes(): Observable<any> {
    let obs = this.http.get('View/Module/GetSelectableContentTypes')
      .map(response => (response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      }));
    obs.subscribe(json => this.contentTypeSubject.next(json));
    return obs;
  }

  public loadApps(): Observable<App[]> {
    let obs = this.http.get('View/Module/GetSelectableApps')
      .map(response => response.json().map(this.parseResultObject));
    obs.subscribe(json => this.appSubject.next(json));
    return obs;
  }

  private parseResultObject(obj): any {
    return Object.keys(obj)
      .reduce((t, v, k: any) => {
        t[v.split('').reduce((t, v, k) => t + (k === 0 ? v.toLowerCase() : v), '')] = obj[v];
        return t;
      }, {})
  }
}
