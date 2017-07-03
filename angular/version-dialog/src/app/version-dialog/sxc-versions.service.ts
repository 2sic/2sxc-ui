import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs, Http } from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Version } from "app/version-dialog/version";
import { Observable } from "rxjs/Observable";

declare const $2sxc;

@Injectable()
export class SxcVersionsService {
  versions: Observable<Version[]>;

  private versionsSubject: ReplaySubject<Version[]>;
  private apiUrl;

  constructor(
    private http: Http
  ) {
    this.versionsSubject = new ReplaySubject<Version[]>(1);
    this.versions = this.versionsSubject.asObservable();
    this.apiUrl = $2sxc.urlParams.require('portalroot') + 'desktopmodules/2sxc/api/';
    this.loadVersions();
  }

  private loadVersions(): void {
    let appId = $2sxc.urlParams.require('appId');
    let tabId = $2sxc.urlParams.require('tid');
    let cbId = $2sxc.urlParams.require('cbid');
    let modId = $2sxc.urlParams.require('mid');

    let url = `${this.apiUrl}eav/entities/history?appId=${appId}&entityId=3581`;

    let headers = new Headers();
    headers.append('TabId', tabId);
    headers.append('ModuleId', modId);
    headers.append('ContentBlockId', cbId);
    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options)
      .map(res => res.json())
      .subscribe(v => this.versionsSubject.next(v));
  }
}