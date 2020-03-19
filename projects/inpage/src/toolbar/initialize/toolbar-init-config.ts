import * as Constants from '../../constants';
import { HtmlTools } from '../../html/dom-tools';
import { IDs } from '../../settings/2sxc.consts';
import { InPageButtonJson, InPageCommandJson, ToolbarWip } from '../config-loaders';
import { Button } from '../config/button';
import * as Toolbarsettings from '../config/toolbar-settings';
import ToolbarSettings = Toolbarsettings.ToolbarSettings;
import { ToolbarTemplate } from '../templates/toolbar-template-toolbar';

// export type ToolbarVariationsBeforeInitializing = ToolbarVariationsForInitializing;

// export interface ToolbarVariationsForInitializing extends ToolbarTemplateToolbar {
//     action?: string;
//     // groups?: ButtonGroup[];
//     buttons: Button[];
// }

/**
 * take various common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
 * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
 * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
 * button (detected by "command"): { command: ""|[], icon: "..", ... }
 * just a command (detected by "action"): { entityId: 17, action: "edit" }
 * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
 */
export type InPageToolbarConfigVariations =
    ToolbarWip
    | InPageButtonJson
    | InPageCommandJson
    | ToolbarTemplate;

/**
 * The configuration / settings of a toolbar as loaded from the DOM
 */
export class ToolbarInitConfig {
    toolbar: InPageToolbarConfigVariations;
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
