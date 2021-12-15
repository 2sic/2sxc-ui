import { Template } from '../template';
import { ContentType } from '../content-type';
import { App } from 'app/core/app';
import { log as parentLog } from 'app/core/log';
import { DebugConfig } from 'app/debug-config';

const log = parentLog.subLog('TemplateProcessor', DebugConfig.templateProcessor);

export class TemplateProcessor {
  static pickSelected(selected: Template, templates: Template[], type: ContentType, app: App): Template {
    log.add(`pickSelected(selected: ${selected && selected.TemplateId}, templates: ${templates.length})`)
    // if one is selected, return that; but only if it's in the list of possible templates
    if (selected && templates.find(t => t.TemplateId === selected.TemplateId))
      return selected;

    // if none is selected, return the first (preferred default DESC); assuming a type or app has been selected
    if ((type || app) && templates && templates.length) return this.sortTemplates([...templates])[0];

    // nothing valid
    return null;
  }

  /**
   * Sort the templates by IsDefault DESC and Name ASC
   */
  static sortTemplates(templates: Template[]): Template[] {
    // https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript
    return templates.sort((a, b) => {
      // first sort by IsDefault DESC
      if (a.IsDefault > b.IsDefault) return -1;
      if (a.IsDefault < b.IsDefault) return 1;
      // than by Name ASC
      return ('' + a.Name).localeCompare(b.Name);
    });
  }
}
