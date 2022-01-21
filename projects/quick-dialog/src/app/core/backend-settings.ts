import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, share, distinctUntilChanged } from 'rxjs/operators';
import { Constants } from './constants';
import { ContextDto } from '../../../../shared';
import { requestOptions } from 'app/template-picker/request-options';

@Injectable({
  providedIn: 'root',
})
export class BackendSettings {

  appId = new BehaviorSubject<number>(0);

  data: Observable<ContextDto>

  blockIds: string;

  constructor(http: HttpClient) {
    this.data = this.appId.pipe(
      distinctUntilChanged(),
      switchMap(id => http.get<{ Context: ContextDto }>(`${Constants.webApiDialogContext}?appId=${id}`, requestOptions(this.blockIds))),
      map(bundle => bundle.Context),
      share()
    );
  }

  setApp(id: number) {
    this.appId.next(id);
  }
}
