import { InPageButtonJson, InPageCommandJson, ToolbarWip } from '../config-loaders';
import * as Toolbarsettings from '../config/toolbar-settings';
import ToolbarSettings = Toolbarsettings.ToolbarSettings;
import { ToolbarTemplate } from '../templates';
/**
 * take various common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
 * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
 * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
 * button (detected by "command"): { command: ""|[], icon: "..", ... }
 * just a command (detected by "action"): { entityId: 17, action: "edit" }
 * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
 * @internal
 */
export declare type InPageToolbarConfigVariations = ToolbarWip | InPageButtonJson | InPageCommandJson | ToolbarTemplate;
/**
 * The configuration / settings of a toolbar as loaded from the DOM
 * @internal
 */
export declare class ToolbarInitConfig {
    toolbar: InPageToolbarConfigVariations | string[];
    settings: ToolbarSettings;
    /**
     * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
     * @param tag
     * @return a configuration object or null in case of an error
     */
    static loadFromTag(tag: HTMLElement): ToolbarInitConfig;
}
