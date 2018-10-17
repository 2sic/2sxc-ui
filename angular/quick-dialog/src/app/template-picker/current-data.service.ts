import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';


@Injectable()
export class CurrentDataService {
  app$: Observable<App>;
  template: Template;

  private appIdSubject = new ReplaySubject<number>();

  constructor(private api: PickerService) {

    this.app$ = Observable
      .combineLatest(this.api.apps$, this.appIdSubject,
        (apps, appId) => apps.find(a => a.appId === appId));

  }

  init(config: IQuickDialogConfig) {
    this.activateCurrentApp(config.appId);

    // start with the current template, if it was selected
    this.api.templates$
      .take(1)
      .do(templates => {
        if (config.templateId)
          this.template = templates.find(t => t.TemplateId === config.templateId);
      })
      .subscribe();
  }

  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
  }


}
