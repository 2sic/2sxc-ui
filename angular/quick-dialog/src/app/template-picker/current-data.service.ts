import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';


@Injectable()
export class CurrentDataService {
  currentApp$: Observable<App>;

  private currentAppIdSubject = new ReplaySubject<number>();

  constructor(private api: PickerService) {

    this.currentApp$ = Observable
      .combineLatest(this.api.apps$, this.currentAppIdSubject,
        (apps, appId) => apps.find(a => a.appId === appId));

  }

  activateCurrentApp(appId: number) {
    this.currentAppIdSubject.next(appId);
  }


}
