import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'app/core/log';
import { Observable, Subject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { InstallRule, InstallSettings, InstalledApp } from './installer-models';

interface AppInstallationStreams {
  settings?: { remoteUrl: string }[];
  installedApps?: InstalledApp[];
  rules?: InstallRule[];
}

// copied to eav-ui
@Injectable()
export class AppInstallSettingsService {

  private installSettingsSubject: Subject<InstallSettings> = new Subject<InstallSettings>();
  settings$: Observable<InstallSettings> = this.installSettingsSubject.asObservable();

  constructor(private http: HttpClient) {
    const ready$ = this.settings$.pipe(
      map(() => true),
      startWith(false));

    ready$.pipe(tap(r => log.add(`ready getting started:${r}`))).subscribe();
  }

  public loadGettingStarted(isContentApp: boolean): void {
    this.http.get<AppInstallationStreams>('app/auto/query/System.SysData/', {
      params: {
        SysDataSource: 'System.AppInstallation',
        IsContentApp: isContentApp.toString(),
        '$casing': 'camel',
      },
    }).pipe(
      map(result => ({
        remoteUrl: result.settings?.[0]?.remoteUrl ?? '',
        installedApps: result.installedApps ?? [],
        rules: result.rules ?? [],
      } satisfies InstallSettings)),
    ).subscribe(settings => this.installSettingsSubject.next(settings));
  }
}