import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ModuleApiService {
  private readonly base: string = 'http://2sxc.dev/desktopmodules/2sxc/api/';
  private headers: Headers;

  constructor(
    private http: Http,
  ) { }
  
  public configure(moduleId: number, tabId: number) {
    this.headers = new Headers({
      moduleId,
      tabId
    });
  }

  public getSelectableApps(): Observable<any> {
    return this.http.get(`${this.base}View/Module/GetSelectableApps`, { headers: this.headers })
      .map(response => response.json());
  }

  public setAppId(appId: string): Observable<any> {
    return this.http.get(`${this.base}view/Module/SetAppId?appId=${appId}`, { headers: this.headers });
  }

  public getSelectableContentTypes(): Observable<any> {
    return this.http.get(`${this.base}View/Module/GetSelectableContentTypes`, { headers: this.headers })
      .map(response => (response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      }));
  }

  public getSelectableTemplates(): Observable<any> {
    return this.http.get(`${this.base}View/Module/GetSelectableTemplates`, { headers: this.headers })
      .map(response => response.json());
  }
  
  public gettingStartedUrl(): Observable<any> {
    let params = new URLSearchParams();
    params.set('dialog', 'gettingstarted');
    return this.http.get(`${this.base}View/Module/RemoteInstallDialogUrl`, { search: params, headers: this.headers });
  }
}
