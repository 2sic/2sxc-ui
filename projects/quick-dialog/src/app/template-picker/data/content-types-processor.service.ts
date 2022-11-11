import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { log as parentLog } from 'app/core/log';
import { DebugConfig } from 'app/debug-config';
import { i18nPrefix } from 'app/i18n';
import { cViewWithoutContent } from '../constants';
import { ContentType } from '../content-type';
import { Template } from '../template';

// const debug = true;
const log = parentLog.subLog('ct-processor', DebugConfig.typeProcessor);

/**
 * This is a helper to do various transformations for the list of content-types
 */
@Injectable()
export class ContentTypesProcessor {
  constructor(private translate: TranslateService) { }

  public buildList(allTypes: ContentType[], type: ContentType, allTemplates: Template[], template: Template): ContentType[] {
    log.add('buildList(...) of content-types to show');
    let unhide = this.unhideSelectedType(allTypes, type, template);
    unhide = this.addEmptyTypeIfNeeded(unhide, allTemplates);
    const filtered = this.hideNecessaryTypes(unhide);
    return this.sortTypes(filtered);
  }

  private hideNecessaryTypes(types: ContentType[]): ContentType[] {
    return types.filter(t => !t.IsHidden);
  }

  /**
   * Ensure current content-type is visible, just in case it's configured as hidden
   */
  private unhideSelectedType(contentTypes: ContentType[], currentType: ContentType, currentTemplate: Template): ContentType[] {
    console.log('2dm before', JSON.parse(JSON.stringify(contentTypes)));
    console.log('2dm current T', currentTemplate?.TemplateId);
    console.log('2dm currentType Static', currentType?.StaticName);
    contentTypes
      // 2022-11-04 2dm disabled, think it's never used
      // 2022-11-11 trying to fix another issue....
      // .filter(c => (currentTemplate?.TemplateId === c.TemplateId) || (c.StaticName === currentType?.StaticName))
      .filter(c => (c.StaticName === currentType?.StaticName && c.StaticName !== undefined))
      .forEach(c => c.IsHidden = false);
    // console.log('2dm after', contentTypes);
    return contentTypes;
  }


  /**
   * add an empty content-type for UI selection if any template would support "no content-type"
   */
  private addEmptyTypeIfNeeded(contentTypes: ContentType[], templates: Template[]): ContentType[] {
    const layoutElementLabel = (this.translate && this.translate.instant(i18nPrefix))
      || cViewWithoutContent; // if translate is not ready, use the nicer label

    // add option for empty content type
    if (templates && templates.find(t => t.ContentTypeStaticName === '')) {
      contentTypes = contentTypes.slice(); // copy it first to not change original
      contentTypes.push({
        StaticName: cViewWithoutContent,
        Name: i18nPrefix,
        Thumbnail: null,
        Label: layoutElementLabel,
        IsHidden: false,
      } as ContentType);
    }
    return contentTypes;
  }

  /**
   * Sort the types by label
   */
  private sortTypes(contentTypes: ContentType[]): ContentType[] {
    // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    return contentTypes.sort((a, b) => ('' + a.Label).localeCompare(b.Label));
  }

  /**
   * Sort the types by IsDefault DESC and Label ASC
  */
  private static sortTypesWithDefault(contentTypes: ContentType[]): ContentType[] {
    return contentTypes.sort((a, b) => {
      // first sort by IsDefault DESC
      if (a.IsDefault > b.IsDefault) return -1;
      if (a.IsDefault < b.IsDefault) return 1;
      // than sort by Label ASC
      return ('' + a.Label).localeCompare(b.Label);
    });
  }

  /**
   * Get first default or alphabetically
   */
  static firstDefault(contentTypes: ContentType[]): ContentType {
    return this.sortTypesWithDefault([...contentTypes])[0];
  }

  // tslint:disable-next-line:member-ordering
  static findContentTypesById(contentTypes: ContentType[], selectedContentTypeId: string): ContentType {
    log.add(`findContentTypesById(..., ${selectedContentTypeId}`);
    return selectedContentTypeId
      ? contentTypes.find(c => c.StaticName === selectedContentTypeId)
      : null;
  }

}
