import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { log } from 'app/core/log';
import { Config } from '../config';
import { BackendSettings } from '../core/backend-settings';
import { InstallRule, InstallSettings, InstalledApp } from './installer-models';

interface AppInstallationResponse {
  settings?: { remoteUrl: string }[];
  installedApps?: InstalledApp[];
  rules?: InstallRule[];
}

// copied to eav-ui
@Injectable()
export class AppInstallSettingsService {

  private readonly installSettingsSubject = new Subject<InstallSettings>();
  settings$: Observable<InstallSettings> = this.installSettingsSubject.asObservable();

  constructor(private http: HttpClient, private backendSettings: BackendSettings) {
    const ready$ = this.settings$.pipe(
      map(() => true),
      startWith(false));

    ready$.pipe(tap(r => log.add(`ready getting started:${r}`))).subscribe();
  }

  public loadGettingStarted(isContentApp: boolean): void {
    this.backendSettings.data.pipe(
      take(1),
      switchMap(context => {
        // When no app exists yet, appId is 0 and the system query must run in the primary app.
        const appId = Config.appId() || context.Site?.PrimaryApp?.AppId;
        if (!appId) throw new Error('Could not determine an app ID for the installation settings.');

        return this.http.get<AppInstallationResponse>('app/auto/query/System.SysData/', {
          params: {
            appId,
            SysDataSource: 'System.AppInstallation',
            IsContentApp: isContentApp,
            '$casing': 'camel',
          },
        });
      }),
      map(result => ({
        remoteUrl: result.settings?.[0]?.remoteUrl ?? '',
        installedApps: result.installedApps ?? [],
        rules: result.rules ?? [],
      } satisfies InstallSettings)),
    ).subscribe(settings => this.installSettingsSubject.next(settings));
  }
}
