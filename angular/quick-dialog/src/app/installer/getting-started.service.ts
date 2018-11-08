
import { startWith, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';

import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { log } from 'app/core/log';
import { Constants } from 'app/core/constants';


@Injectable()
export class GettingStartedService {
  gettingStarted$: Observable<string>;
  ready$ = new Observable<boolean>();

  private gettingStartedSubject: Subject<string> = new Subject<string>();

  constructor(private http: Http) {
    this.gettingStarted$ = this.gettingStartedSubject.asObservable();
    this.ready$ = this.gettingStarted$.pipe(
      map(() => true),
      startWith(false));

    this.ready$.pipe(tap(r => log.add(`ready getting started:${r}`))).subscribe();
  }

  public loadGettingStarted(isContentApp: boolean): void {
    this.http.get(`${Constants.apiRoot}RemoteInstallDialogUrl?dialog=gettingstarted&isContentApp=${isContentApp}`)
      .pipe(map(response => response.json()))
      .subscribe(json => this.gettingStartedSubject.next(json));
  }

}
