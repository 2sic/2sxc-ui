import { ContentType } from '../content-type';
import { cViewWithoutContent, i18nTemplatePicker } from '../constants';
import { Template } from '../template';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { log as parentLog } from 'app/core/log';
import { DebugConfig } from 'app/debug-config';

// const debug = true;
const log = parentLog.subLog('ct-processor', DebugConfig.typeProcessor);

/**
 * This is a helper to do various transformations for the list of content-types
 */
@Injectable()
export class ContentTypesProcessor {
  constructor(private translate: TranslateService) {}

  public buildList(allTypes: ContentType[], type: ContentType, allTemplates: Template[], template: Template): ContentType[] {
    log.add('buildList(...) of content-types to show');
    // let unhide = this.hideTypesWithoutTemplates(allTypes, allTemplates);
    let unhide = this.unhideSelectedType(allTypes, type, template);
    unhide = this.addEmptyTypeIfNeeded(unhide, allTemplates);
    return this.sortTypes(unhide);
  }

  // 2018-11-05 trying to fix https://github.com/2sic/2sxc/issues/1614
  // but it appears that this is actually not an issue...unclear why it's posted.
  // private hideTypesWithoutTemplates(types: ContentType[], templates: Template[]): ContentType[] {
  //   types.filter(c => templates.find(t => t.ContentTypeStaticName == c.StaticName))
  //     .forEach(c => c.IsHidden = true);
  //   return types;
  // }


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

  /**
   * Sort the types by label
   */
  private sortTypes(contentTypes: ContentType[]): ContentType[] {
    // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    return contentTypes.sort((a, b) => ('' + a.Label).localeCompare(b.Label));
  }


  // tslint:disable-next-line:member-ordering
  static findContentTypesById(contentTypes: ContentType[], selectedContentTypeId: string): ContentType {
    log.add(`findContentTypesById(..., ${selectedContentTypeId}`);
    return selectedContentTypeId
      ? contentTypes.find(c => c.StaticName === selectedContentTypeId)
      : null;
  }

}

