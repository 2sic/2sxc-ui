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

    // if none is selected, return the first; assuming a type or app has been selected
    if ((type || app) && templates && templates.length) return templates[0];

    // nothing valid
    return null;
  }
}