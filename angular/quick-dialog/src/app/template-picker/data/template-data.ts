import { ContentType } from '../content-type';
import { cViewWithoutContent, i18nTemplatePicker } from '../constants';
import { Template } from '../template';

export class TemplateData {

  static addEmptyTypeIfNeeded(contentTypes: ContentType[], templates: Template[]): ContentType[] {
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
    }
    return contentTypes;
  }

  /**
   * Ensure current content-type is visible, just in case it's configured as hidden
   */
  static unhideSelectedType(contentTypes: ContentType[], currentType: ContentType, currentTemplate: Template): ContentType[] {
    contentTypes.filter(
      c => (currentTemplate && currentTemplate.TemplateId === c.TemplateId)
        || (currentType && c.StaticName === currentType.StaticName))
      .forEach(c => c.IsHidden = false);
    return contentTypes;
  }


  static sortTypes(contentTypes: ContentType[]): ContentType[] {
    // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    return contentTypes.sort((a, b) => ('' + a.Name).localeCompare(b.Name));
  }
}
