import * as Constants from '../../constants';
import { HtmlTools } from '../../html/dom-tools';
import { IDs } from '../../settings/2sxc.consts';
import { ButtonConfig } from '../config/button-config';
import * as Toolbarsettings from '../settings/toolbar-settings';
import ToolbarSettings = Toolbarsettings.ToolbarSettings;
import { ToolbarTemplateToolbar } from '../templates/toolbar-template-toolbar';

export type ToolbarVariationsBeforeInitializing = ToolbarVariationsForInitializing;

export interface ToolbarVariationsForInitializing extends ToolbarTemplateToolbar {
    action?: string;
    // groups?: ButtonGroup[];
    buttons: ButtonConfig[];
}

/**
 * The configuration / settings of a toolbar as loaded from the DOM
 */
export class ToolbarInitConfig {
    toolbar: ToolbarVariationsForInitializing;
    settings: ToolbarSettings;

    /**
     * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
     * @param tag
     * @return a configuration object or null in case of an error
     */
    static loadFromTag(tag: HTMLElement): ToolbarInitConfig {
        try {
            const newConfigFormat = HtmlTools.tryGetAttrText(tag, Constants.toolbar.attr.full);
            if (newConfigFormat) {
                return JSON.parse(newConfigFormat) as ToolbarInitConfig;
            } else {
                const at = IDs.attr;
                const data = HtmlTools.getFirstAttribute(tag, at.toolbar, at.toolbarData);
                const settings = HtmlTools.getFirstAttribute(tag, at.settings, at.settingsData);
                return {
                toolbar: JSON.parse(data),
                settings: JSON.parse(settings) as ToolbarSettings,
                } as ToolbarInitConfig;
            }
        } catch (err) {
        console.error(
            'error in settings JSON - probably invalid - make sure you quote properties like "name": ...', tag, err);
        return null;
        }
    }
}
