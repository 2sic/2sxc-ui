import { ToolbarConfigLoader } from '.';
import { InPageToolbarConfigVariations, ToolbarInitConfig } from '..';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { Toolbar, ToolbarSettings } from '../config';
/**
 * @internal
 */
export declare class ToolbarConfigLoaderV09 extends HasLog {
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    loadV9(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    getTemplateIfNoButtonsSpecified(raw: InPageToolbarConfigVariations): InPageToolbarConfigVariations;
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
    buildFullDefinition(toolbarContext: ContextComplete, unstructuredConfig: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): Toolbar;
    /**
     * this will take an input which could already be a tree, but it could also be a
     * button-definition, or just a string, and make sure that afterwards it's a tree with groups
     * the groups could still be in compact form, or already expanded, depending on the input
     * output is object with:
     * - groups containing buttons[], but buttons could still be very flat
     * - defaults, already officially formatted
     * - params, officially formatted
     * @param unstructuredConfig
     * @param toolbarSettings
     */
    private ensureDefinitionTree;
    private findGroups;
}
