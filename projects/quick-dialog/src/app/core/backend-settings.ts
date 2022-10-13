import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, share, distinctUntilChanged } from 'rxjs/operators';
import { Constants } from './constants';
import { ContextDto } from '../../../../shared';

@Injectable({
  providedIn: 'root',
})
export class BackendSettings {

  appId = new BehaviorSubject<number>(0);

  data: Observable<ContextDto>;

  showAdvanced$: Observable<boolean>;

  constructor(http: HttpClient) {
    this.data = this.appId.pipe(
      distinctUntilChanged(),
      switchMap(id => http.get<{ Context: ContextDto }>(`${Constants.webApiDialogContext}?appId=${id}`)),
      map(bundle => bundle.Context),
      share()
    );

    this.showAdvanced$ = this.data.pipe(map(settings => settings.Enable?.CodeEditor ?? false));
  }

  setApp(id: number) {
    this.appId.next(id);
  }
}
