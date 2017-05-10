import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { $2sxcService } from "app/core/$2sxc.service";
import { Http } from "@angular/http";

@Injectable()
export class ModuleApiService {
  private readonly base: string = 'http://2sxc.dev/desktopmodules/2sxc/api/';
  private headers: Headers;

  private appsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public apps: Observable<any[]>;

  private ctSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // public contentTypes: Observable<any[]>;
  private ctLoaded = false;

  constructor(
    private http: Http,
    private sxc: $2sxcService
  ) {
    this.apps = this.appsSubject.asObservable();
    // this.contentTypes = this.ctSubject.asObservable();
  }

  public getContentTypes(): Observable<any> {
    if (!this.ctLoaded) {
      this.getSelectableContentTypes();
      this.ctLoaded = true;
    }
    return this.ctSubject.asObservable();
  }

  public getSelectableApps(): Observable<any> {
    return this.http.get('View/Module/GetSelectableApps')
      .map(response => this.appsSubject.next(response.json()));
  }

  public setAppId(appId: string): Observable<any> {
    return this.http.get(`view/Module/SetAppId?appId=${appId}`);
  }

  public getSelectableContentTypes(): Observable<any> {
    return this.http.get('View/Module/GetSelectableContentTypes')
      .map(response => this.ctSubject.next((response.json() || []).map(x => {
        x.Label = (x.Metadata && x.Metadata.Label)
          ? x.Metadata.Label
          : x.Name;
        return x;
      })));
      // return this.ctSubject.asObservable();
  }

  public getSelectableTemplates(): Observable<any> {
    return this.http.get('View/Module/GetSelectableTemplates')
      .map(response => response.json());
  }

  public gettingStartedUrl(): Observable<any> {
    return this.http.get('View/Module/RemoteInstallDialogUrl?dialog=gettingstarted');
  }
}
