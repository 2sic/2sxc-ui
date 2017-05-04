import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { $2sxcService } from "app/core/$2sxc.service";

@Injectable()
export class ModuleApiService {
  private readonly base: string = 'http://2sxc.dev/desktopmodules/2sxc/api/';
  private headers: Headers;
  
  constructor(
    private http: Http,
    private sxc: $2sxcService
  ) {}
  
  public getSelectableApps(): Observable<any> {
    return this.http.get('View/Module/GetSelectableApps')
      .map(response => response.json());
  }

  public setAppId(appId: string): Observable<any> {
    return this.http.get(`view/Module/SetAppId?appId=${appId}`);
  }

  public getSelectableContentTypes(): Observable<any> {
    return this.http.get('View/Module/GetSelectableContentTypes')
      .map(response => (response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      }));
  }

  public getSelectableTemplates(): Observable<any> {
    return this.http.get('View/Module/GetSelectableTemplates')
      .map(response => response.json());
  }

  public gettingStartedUrl(): Observable<any> {
    return this.http.get('View/Module/RemoteInstallDialogUrl?dialog=gettingstarted');
  }
}
