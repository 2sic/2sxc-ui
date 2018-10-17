import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { App } from 'app/core/app';
import { Subject } from 'rxjs/Subject';
import { ContentType } from 'app/template-picker/content-type';
import { Template } from 'app/template-picker/template';
import { log } from 'app/core/log';
import { Constants } from 'app/core/constants';


@Injectable()
export class PickerService {
  apps$: Observable<App[]>;
  contentTypes$: Observable<ContentType[]>;
  templates$: Observable<Template[]>;
  ready$ = new Observable<boolean>();

  private appSubject: Subject<App[]> = new Subject<App[]>();
  private contentTypeSubject: Subject<ContentType[]> = new Subject<ContentType[]>();
  private templateSubject: Subject<Template[]> = new Subject<Template[]>();

  constructor(private http: Http) {
    this.apps$ = this.appSubject.asObservable();
    this.contentTypes$ = this.contentTypeSubject.asObservable();
    this.templates$ = this.templateSubject.asObservable();
    this.ready$ = Observable
      .combineLatest(this.apps$, this.contentTypes$, this.templates$)
      .map(() => true)
      .startWith(false);

    this.ready$.do(r => log.add(`ready:${r}`) ).subscribe();
  }

  public setAppId(appId: string): Observable<any> {
    const appSet$ = this.http.get(`${Constants.apiRoot}SetAppId?appId=${appId}`);
    appSet$.subscribe(() => {
      this.loadTemplates();
      this.loadContentTypes();
    });
    return appSet$;
  }


  public loadEverything() {
    this.loadApps();
    this.loadTemplates();
    this.loadContentTypes();
  }

  public loadTemplates(): Observable<Template> {
    const obs = this.http.get(`${Constants.apiRoot}GetSelectableTemplates`)
      .map(response => response.json() || []);
    obs.subscribe(json => this.templateSubject.next(json));
    return obs;
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
      .subscribe(json => this.contentTypeSubject.next(json));
  }

  /**
   * Load all Apps, only needed on first initialization
   */
  private loadApps(): void {
    this.http.get(`${Constants.apiRoot}GetSelectableApps`)
      .map(response => response.json().map(this.parseResultObject))
      .subscribe(json => this.appSubject.next(json));
  }

  private parseResultObject(obj): any {
    return Object.keys(obj)
      .reduce((t, v) => {
        t[v.split('').reduce((t, v, k) => t + (k === 0 ? v.toLowerCase() : v), '')] = obj[v];
        return t;
      }, {});
  }
}
