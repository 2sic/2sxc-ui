import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { App } from 'app/core/app';
import { Subject } from 'rxjs/Subject';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';

@Injectable()
export class ModuleApiService {
  apps: Observable<App[]>;
  contentTypes: Observable<ContentType[]>;
  gettingStarted: Observable<string>;
  templates: Observable<Template[]>;

  private appSubject: Subject<App[]> = new Subject<App[]>();
  private contentTypeSubject: Subject<ContentType[]> = new Subject<ContentType[]>();
  private gettingStartedSubject: Subject<string> = new Subject<string>();
  private templateSubject: Subject<Template[]> = new Subject<Template[]>();

  constructor(private http: Http) {
    this.apps = this.appSubject.asObservable();
    this.contentTypes = this.contentTypeSubject.asObservable();
    this.gettingStarted = this.gettingStartedSubject.asObservable();
    this.templates = this.templateSubject.asObservable();
  }

  public setAppId(appId: string): Observable<any> {
    return this.http.get(`view/Module/SetAppId?appId=${appId}`);
  }

  public loadGettingStarted(isContentApp: boolean): Observable<string> {
    const obs = this.http.get(`View/Module/RemoteInstallDialogUrl?dialog=gettingstarted&isContentApp=${isContentApp}`)
      .map(response => response.json());
    obs.subscribe(json => this.gettingStartedSubject.next(json));
    return obs;
  }

  public loadTemplates(): Observable<Template> {
    const obs = this.http.get('View/Module/GetSelectableTemplates')
      .map(response => response.json() || []);
    obs.subscribe(json => this.templateSubject.next(json));
    return obs;
  }

  public loadContentTypes(): Observable<ContentType> {
    const obs = this.http.get('View/Module/GetSelectableContentTypes')
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
    const obs = this.http.get('View/Module/GetSelectableApps')
      .map(response => response.json().map(this.parseResultObject));
    obs.subscribe(json => this.appSubject.next(json));
    return obs;
  }

  private parseResultObject(obj): any {
    return Object.keys(obj)
      .reduce((t, v) => {
        t[v.split('').reduce((t, v, k) => t + (k === 0 ? v.toLowerCase() : v), '')] = obj[v];
        return t;
      }, {});
  }
}
