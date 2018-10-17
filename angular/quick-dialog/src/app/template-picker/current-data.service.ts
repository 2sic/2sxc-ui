import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';


@Injectable()
export class CurrentDataService {
  config: IQuickDialogConfig;
  app$: Observable<App>;


  template: Template;
  templates: Template[] = [];
  public allTemplates: Template[] = []; // todo: make private as soon as possible

  private appIdSubject = new ReplaySubject<number>();

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
    ) {

    this.app$ = Observable
      .combineLatest(this.api.apps$, this.appIdSubject,
        (apps, appId) => apps.find(a => a.appId === appId));

    // load all templates into the array for further use
    this.api.templates$
        .subscribe(templates => this.allTemplates = templates);
  }


  init(config: IQuickDialogConfig) {
    this.config = config;
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

  activateContentType(contentType: ContentType) {
    this.templates = this.findTemplatesForContentType(contentType);
  }

  private findTemplatesForContentType(contentType: ContentType): Template[] {
    return this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.config.isContent
    });
  }

}
