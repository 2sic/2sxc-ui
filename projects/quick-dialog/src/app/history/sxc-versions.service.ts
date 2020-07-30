
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { Config } from '../config';
import { VersionDto, Version, historyApiRoot, VersionData, EntityJsonDto } from '.';

@Injectable()
export class SxcVersionsService {
  versions: Observable<Version[]>;
  error: Observable<string>;

  private versionsSubject: ReplaySubject<Version[]>;
  private errorSubject: ReplaySubject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.versionsSubject = new ReplaySubject<Version[]>(1);
    this.versions = this.versionsSubject.asObservable();

    this.errorSubject = new ReplaySubject<string>(1);
    this.error = this.errorSubject.asObservable();

    this.loadVersions();
  }

  restore(changeId: number): Observable<void> {
    const appId = Config.appId();
    const item = Config.item();
    const url = `${historyApiRoot}/restore?appId=${appId}&changeId=${changeId}`;

    return this.http.post<void>(url, item);
  }

  private loadVersions(): void {
    const appId = Config.appId();
    const item = Config.item();
    const url = `${historyApiRoot}/history?appId=${appId}`;

    this.http.post<VersionDto[]>(url, item)
      .pipe(
        map(all =>
          all.map((ver) => ({
            ChangeSetId: ver.ChangeSetId,
            HistoryId: ver.HistoryId,
            Data: convertVersionJsonToData(ver, findPrevious(all, ver)),
            TimeStamp: formatTimestamp(ver.TimeStamp),
            User: ver.User,
            VersionNumber: ver.VersionNumber,
          } as Version)
        ))
      )
      .subscribe(
        v => this.versionsSubject.next(v),
        () => { this.errorSubject.next('Could not load versions.'); }
      );
  }
}


/** Take the multi-level Attributes and flatten for use in the UI */
function convertVersionJsonToData(v: VersionDto, prevAttrs: any[]): VersionData[] {
  const attrs = (JSON.parse(v.Json) as EntityJsonDto).Entity.Attributes;

  return Object.entries(attrs)
    .reduce((t, c) => Array.prototype.concat(t,
      Object.entries(c[1])
        .map(([key, value]) => ({
          key,
          value: Object.entries(value),
          type: c[0],
          hasChanged: prevAttrs && JSON.stringify(prevAttrs[c[0]][key]) !== JSON.stringify(value),
        } as VersionData))
      ), []);
}


function findPrevious(all: VersionDto[], v: VersionDto) {
  const prevVersion = all.find(v2 => v2.VersionNumber === v.VersionNumber - 1);
  const prevVerAttrs = prevVersion && (JSON.parse(prevVersion.Json) as EntityJsonDto).Entity.Attributes;
  return prevVerAttrs;
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d} ${h < 10 ? '0' : ''}${h}:${min < 10 ? '0' : ''}${min}`;
}
