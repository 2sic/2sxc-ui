
import { startWith, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { log } from 'app/core/log';
import { Constants } from 'app/core/constants';
import { InstallSettings } from './installer-models';

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
    this.http.get<InstallSettings>(`${Constants.webApiInstallSettings}?isContentApp=${isContentApp}`)
      .subscribe(json => this.installSettingsSubject.next(json));
  }
}
