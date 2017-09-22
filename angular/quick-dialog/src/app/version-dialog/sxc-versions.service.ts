import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs, Http } from '@angular/http';
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

  restore(changeId: number): Observable<Response> {
    const appId = $2sxc.urlParams.require('appId');
    const tabId = $2sxc.urlParams.require('tid');
    const cbId = $2sxc.urlParams.require('cbid');
    const modId = $2sxc.urlParams.require('mid');
    const item = JSON.parse($2sxc.urlParams.require('items'))[0];
    const url = `${this.apiUrl}eav/entities/restore?appId=${appId}&changeId=${changeId}`;

    const headers = new Headers();
    headers.append('TabId', tabId);
    headers.append('ModuleId', modId);
    headers.append('ContentBlockId', cbId);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, item, options);
  }

  private loadVersions(): void {
    const appId = $2sxc.urlParams.require('appId');
    const tabId = $2sxc.urlParams.require('tid');
    const cbId = $2sxc.urlParams.require('cbid');
    const modId = $2sxc.urlParams.require('mid');
    const item = JSON.parse($2sxc.urlParams.require('items'))[0];
    const url = `${this.apiUrl}eav/entities/history?appId=${appId}`;

    const headers = new Headers();
    headers.append('TabId', tabId);
    headers.append('ModuleId', modId);
    headers.append('ContentBlockId', cbId);
    const options = new RequestOptions({ headers: headers });

    this.http.post(url, item, options)
      .map(res => res.json()
        .map((v, i, all) => Object.assign(v, {
          Data: (() => {
            let lastVersion = all.find(v2 => v2.VersionNumber === v.VersionNumber - 1);
            const attr = JSON.parse(v.Json).Entity.Attributes;

            if (lastVersion) {
              lastVersion = JSON.parse(lastVersion.Json).Entity.Attributes;
            }

            return Object.entries(attr)
              .reduce((t, c) => Array.prototype.concat(t, Object.entries(c[1])
                .map(([key, value], i2) => ({
                  key,
                  value: Object.entries(value),
                  type: c[0],
                  hasChanged: lastVersion
                    ? JSON.stringify(lastVersion[c[0]][key]) !== JSON.stringify(value)
                    : false
                }))), []);
          })(),
          TimeStamp: (timestamp => {
            const date = new Date(timestamp);
            const y = date.getFullYear();
            const m = date.getUTCMonth();
            const d = date.getDate();
            const h = date.getHours();
            const min = date.getMinutes();
            return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d} ${h < 10 ? '0' : ''}${h}:${min < 10 ? '0' : ''}${min}`;
          })(v.TimeStamp),
        })))
      .subscribe(v => this.versionsSubject.next(v));
  }
}