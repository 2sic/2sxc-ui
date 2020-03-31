import { ListWithCursor, ToolbarTemplateGroup } from '.';
import { DictionaryValue, TypeTbD } from '../../plumbing';
import { ToolbarSettings } from '../config/toolbar-settings';

/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 */
export class ToolbarTemplate implements ListWithCursor {
    name: string;
    groups: ToolbarTemplateGroup[] = [];
    defaults?: DictionaryValue = {};
    params?: DictionaryValue = {};
    settings?: Partial<ToolbarSettings> = {};
    debug?: boolean;
    _isToolbarTemplate: true;
    _insertCursor?: 0;

    static is(thing: TypeTbD): thing is ToolbarTemplate {
        return (thing as ToolbarTemplate)._isToolbarTemplate;
    }

    static hasGroups(thing: TypeTbD): thing is ToolbarTemplate {
        return Array.isArray((thing as ToolbarTemplate).groups);
    }

}
