import { DictionaryValue, TypeTbD } from '../../plumbing';
import { ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarTemplateGroup } from './toolbar-template-group';

/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 */
export class ToolbarTemplate {
    name: string;
    groups: ToolbarTemplateGroup[] = [];
    defaults?: DictionaryValue = {};
    params?: DictionaryValue = {};
    settings?: Partial<ToolbarSettings> = {};
    debug?: boolean;
    _isToolbarTemplate: true;

    static is(thing: TypeTbD): thing is ToolbarTemplate {
        return (thing as ToolbarTemplate)._isToolbarTemplate;
    }

    static hasGroups(thing: TypeTbD): thing is ToolbarTemplate {
        return Array.isArray((thing as ToolbarTemplate).groups);
    }

}
