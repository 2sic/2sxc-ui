import { C } from '../../constants';
import { HtmlTools } from '../../html/dom-tools';
import { InPageButtonJson, InPageCommandJson, ToolbarWip } from '../config-loaders';
import * as Toolbarsettings from '../config/toolbar-settings';
import ToolbarSettings = Toolbarsettings.ToolbarSettings;
import { ToolbarTemplate } from '../templates';

/**
 * take various common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): \{ groups: [ \{\}, \{\}], name: ..., defaults: \{...\} \}
 * group of buttons (detected by "buttons): \{ buttons: "..." | [], name: ..., ... \}
 * list of buttons (detected by IsArray with action): [ \{ action: "..." | []\}, \{ action: ""|[]\} ]
 * button (detected by "command"): \{ command: ""|[], icon: "..", ... \}
 * just a command (detected by "action"): \{ entityId: 17, action: "edit" \}
 * array of commands: [\{entityId: 17, action: "edit"\}, \{contentType: "blog", action: "new"\}]
 * @internal
 */
export type InPageToolbarConfigVariations =
    ToolbarWip
    | InPageButtonJson
    | InPageCommandJson
    | ToolbarTemplate;

/**
 * The configuration / settings of a toolbar as loaded from the DOM
 * @internal
 */
export class ToolbarInitConfig {
    toolbar: InPageToolbarConfigVariations | string[];
    settings: ToolbarSettings;

    /**
     * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
     * @param tag
     * @returns a configuration object or null in case of an error
     */
    static loadFromTag(tag: HTMLElement): ToolbarInitConfig {
        try {
            const newConfigFormat = HtmlTools.tryGetAttrText(tag, C.Toolbar.attr.full);
            if (newConfigFormat) {
                const result = JSON.parse(newConfigFormat);
                // check for new V10.27 format, which is just an array!
                if (Array.isArray(result))
                    return { toolbar: result } as ToolbarInitConfig;
                return result as ToolbarInitConfig;
            } else {
                const at = C.IDs.attr;
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
