
import { startWith, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { log } from 'app/core/log';
import { Constants } from 'app/core/constants';

@Injectable()
export class GettingStartedService {
  gettingStarted$: Observable<string>;
  ready$ = new Observable<boolean>();

  private gettingStartedSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.gettingStarted$ = this.gettingStartedSubject.asObservable();
    this.ready$ = this.gettingStarted$.pipe(
      map(() => true),
      startWith(false));

    this.ready$.pipe(tap(r => log.add(`ready getting started:${r}`))).subscribe();
  }

  public loadGettingStarted(isContentApp: boolean): void {
    this.http.get<string>(`${Constants.webApiRemoteInstaller}?isContentApp=${isContentApp}`)
      .subscribe(json => this.gettingStartedSubject.next(json));
  }

}
