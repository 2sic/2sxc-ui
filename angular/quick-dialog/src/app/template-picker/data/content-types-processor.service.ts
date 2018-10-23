import { ContentType } from '../content-type';
import { cViewWithoutContent, i18nTemplatePicker } from '../constants';
import { Template } from '../template';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'app/core/log';

@Injectable()
export class ContentTypesProcessor {
  constructor(private translate: TranslateService) {}

  public getRelevantTypesAndSort(allTypes, type, allTemplates, template): ContentType[] {
    let unhide = this.unhideSelectedType(allTypes, type, template);
    unhide = this.addEmptyTypeIfNeeded(unhide, allTemplates);
    return this.sortTypes(unhide);
  }

  /**
   * Ensure current content-type is visible, just in case it's configured as hidden
   */
  private unhideSelectedType(contentTypes: ContentType[], currentType: ContentType, currentTemplate: Template): ContentType[] {
    contentTypes.filter(
      c => (currentTemplate && currentTemplate.TemplateId === c.TemplateId)
        || (currentType && c.StaticName === currentType.StaticName))
      .forEach(c => c.IsHidden = false);
    return contentTypes;
  }


  /**
   * add an empty content-type for UI selection if any template would support "no content-type"
   */
  private addEmptyTypeIfNeeded(contentTypes: ContentType[], templates: Template[]): ContentType[] {
    const layoutElementLabel = (this.translate && this.translate.instant(i18nTemplatePicker))
      || cViewWithoutContent; // if translate is not ready, use the nicer label

    // add option for empty content type
    if (templates && templates.find(t => t.ContentTypeStaticName === '')) {
      contentTypes = contentTypes.slice(); // copy it first to not change original
      contentTypes.push({
        StaticName: cViewWithoutContent,
        Name: i18nTemplatePicker,
        Thumbnail: null,
        Label: layoutElementLabel,
        IsHidden: false,
      } as ContentType);
    }
    return contentTypes;
  }

  private sortTypes(contentTypes: ContentType[]): ContentType[] {
    // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    return contentTypes.sort((a, b) => ('' + a.Label).localeCompare(b.Label));
  }
}

