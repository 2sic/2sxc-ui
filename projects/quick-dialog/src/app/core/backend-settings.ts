import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, share, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ContextDto } from '../../../../shared';
import { requestOptions } from '../template-picker/request-options';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root',
})
export class BackendSettings {

  appId = new BehaviorSubject<number>(0);

  data: Observable<ContextDto>;

  blockIds$ = new ReplaySubject<string>(1);

  constructor(http: HttpClient) {
    this.data = this.appId.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.blockIds$),
      tap(_ => console.log('stv: blockIds:', _)),
      switchMap(([id, blockIds]) => http.get<{ Context: ContextDto }>(`${Constants.webApiDialogContext}?appId=${id}`, requestOptions(blockIds))),
      map(bundle => bundle.Context),
      share()
    );
  }

  setApp(id: number) {
    this.appId.next(id);
  }
}
