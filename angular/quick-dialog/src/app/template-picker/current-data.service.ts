import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { App } from 'app/core/app';
import { PickerService } from './picker.service';
import { IQuickDialogConfig } from 'app/interfaces-shared/iquick-dialog-config';
import { Template } from './template';
import { ContentType } from './content-type';
import { TemplateFilterPipe } from './template-filter.pipe';
import { cViewWithoutContent, i18nTemplatePicker } from './constants';
import { log } from 'app/core/log';


@Injectable()
export class CurrentDataService {
  config: IQuickDialogConfig;
  app$: Observable<App>;

  relevantTypes$: Observable<ContentType[]>;


  template: Template;
  templates: Template[] = [];
  private allTemplates: Template[] = [];

  // contentTypes: ContentType[] = [];
  // contentType: ContentType; // todo: try to remove, and use stream only...

  private appIdSubject = new ReplaySubject<number>();
  private ctSubject = new ReplaySubject<ContentType>();
  contentType$ = this.ctSubject.asObservable();

  constructor(
    private api: PickerService,
    private templateFilter: TemplateFilterPipe,
  ) {
    // app-stream should contain selected app
    this.app$ = Observable.combineLatest(this.api.apps$, this.appIdSubject.asObservable(),
        (apps, appId) => apps.find(a => a.appId === appId));

    // content-type stream should contain current content-type
    // this.contentType$ = this.ctSubject.asObservable();

    // construct list of relevant types for the UI
    this.relevantTypes$ = this.api.contentTypes$.combineLatest(
      this.contentType$,
      this.api.templates$).do(() => log.add('do')).map(set => {
        console.log('...');
        const unhide = unhideSelectedType(set[0], set[1], this.template);
        return addEmptyTypeIfNeeded(unhide, set[2]);
      });
    this.relevantTypes$.subscribe(list => log.add(`got relevant types: ${list.length}`));

    // load all templates into the array for further use
    this.api.templates$
      .subscribe(templates => this.allTemplates = templates);
  }


  init(config: IQuickDialogConfig) {
    this.config = config;
    this.activateCurrentApp(config.appId);

    // automatically set the current type once the types are loaded
    this.api.contentTypes$
      .subscribe(contentTypes => this.initSelectedContentTypes(contentTypes, config.contentTypeId));

    // todo: change all users to use the observable instead
    // update the provided contentType on every change
    // this.contentType$.do(ct => this.contentType = ct).subscribe();

    // start with the current template, if it was selected
    this.api.templates$
      .take(1)
      .do(templates => {
        if (config.templateId)
          this.template = templates.find(t => t.TemplateId === config.templateId);
      })
      .subscribe();

    Observable.combineLatest(
      this.api.templates$,
      this.api.contentTypes$,
      this.api.apps$,
      this.contentType$,
    ).subscribe(res => {
      this.acivateCurrentTemplates(res[3]);
    });
  }

  activateCurrentApp(appId: number) {
    this.appIdSubject.next(appId);
  }

  activateContentType(contentType: ContentType) {
    this.ctSubject.next(contentType);
    this.acivateCurrentTemplates(contentType);
  }

  acivateCurrentTemplates(contentType: ContentType) {
    this.templates = this.findTemplatesForContentType(contentType);
  }

  private findTemplatesForContentType(contentType: ContentType): Template[] {
    return this.templateFilter.transform(this.allTemplates, {
      contentTypeId: contentType ? contentType.StaticName : undefined,
      isContentApp: this.config.isContent
    });
  }

  private initSelectedContentTypes(contentTypes: ContentType[], selectedContentTypeId: string): void {
    log.add(`initSelectedContentTypes(..., ${selectedContentTypeId}`);
    if (selectedContentTypeId) {
      const ct = contentTypes.find(c => c.StaticName === selectedContentTypeId);
      // if (ct)
        this.ctSubject.next(ct);
    } else {
      this.ctSubject.next(undefined);
    }

  }





}

function addEmptyTypeIfNeeded(contentTypes: ContentType[], templates: Template[]): ContentType[] {
  // add option for empty content type
  if (templates && templates.find(t => t.ContentTypeStaticName === '')) {
    contentTypes = contentTypes.slice(); // copy it first to not change original
    contentTypes.push({
      StaticName: cViewWithoutContent,
      Name: i18nTemplatePicker,
      Thumbnail: null,
      Label: i18nTemplatePicker,
      IsHidden: false,
    } as ContentType);
    return contentTypes;
  }

  return sortTypes(contentTypes);
}

/**
 * Ensure current content-type is visible, just in case it's configured as hidden
 */
function unhideSelectedType(contentTypes: ContentType[], currentType: ContentType, currentTemplate: Template): ContentType[] {
  
  contentTypes
    .filter(c => (currentTemplate && currentTemplate.TemplateId === c.TemplateId)
      || (currentType && c.StaticName === currentType.StaticName))
    .forEach(c => c.IsHidden = false);
  return contentTypes;
}


function sortTypes(contentTypes: ContentType[]): ContentType[] {
  // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
  return contentTypes.sort((a, b) => ('' + a.Name).localeCompare(b.Name));
}
