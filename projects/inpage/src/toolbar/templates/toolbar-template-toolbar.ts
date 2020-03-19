import { DictionaryValue, TypeTbD } from '../../plumbing';
import { ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarTemplateButtonGroup } from './toolbar-templaten-button-group';

/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 */
export class ToolbarTemplate {
    groups: ToolbarTemplateButtonGroup[] = [];
    defaults?: DictionaryValue = {};
    params?: DictionaryValue = {};
    settings?: Partial<ToolbarSettings> = {};
    debug?: boolean;
    _isToolbarTemplate: true;

    static is(thing: TypeTbD): thing is ToolbarTemplate {
        return (thing as ToolbarTemplate)._isToolbarTemplate;
    }
}
