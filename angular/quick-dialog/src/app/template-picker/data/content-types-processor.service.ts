import { ContentType } from '../content-type';
import { cViewWithoutContent, i18nTemplatePicker } from '../constants';
import { Template } from '../template';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ContentTypesProcessor {
  constructor(private translate: TranslateService) {
  }

  getRelevantTypesAndSort(allTypes, type, allTemplates, template): ContentType[] {
    let unhide = unhideSelectedType(allTypes, type, template);
    unhide = addEmptyTypeIfNeeded(unhide, allTemplates, this.translate);
    return sortTypes(unhide);
  }

}

/**
 * Ensure current content-type is visible, just in case it's configured as hidden
 */
function unhideSelectedType(contentTypes: ContentType[], currentType: ContentType, currentTemplate: Template): ContentType[] {
  contentTypes.filter(
    c => (currentTemplate && currentTemplate.TemplateId === c.TemplateId)
      || (currentType && c.StaticName === currentType.StaticName))
    .forEach(c => c.IsHidden = false);
  return contentTypes;
}



function addEmptyTypeIfNeeded(contentTypes: ContentType[], templates: Template[], translate: TranslateService): ContentType[] {
  const layoutElementLabel = (translate && translate.instant(cViewWithoutContent)) || cViewWithoutContent;
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

function sortTypes(contentTypes: ContentType[]): ContentType[] {
  // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
  return contentTypes.sort((a, b) => ('' + a.Name).localeCompare(b.Name));
}
