import { BuildRule } from '.';
import { HasLog } from '../../core';
import { ToolbarConfigLoader } from '../config-loaders';
/**
 * @internal
 */
export declare class RuleManager extends HasLog {
    /** List of rules which were picked up and will be applied */
    rules: BuildRule[];
    ruleManagerId: number;
    /** Basic constructor, must be called from a ToolbarConfigLoader */
    constructor(parent: ToolbarConfigLoader);
    /** Load/initialize the rules which were found */
    load(rawList: string[]): BuildRule[];
    /** Find a single rule matching an ID */
    find(id: string): BuildRule | undefined;
    /** find all rules matching a criteria */
    filter(criteria: (x: BuildRule) => boolean): BuildRule[];
    /** the settings are usually retrieved on settings, but you can also put them behind the toolbar */
    getSettings: () => BuildRule;
    /** the params for the command - if not found, will use the toolbar params */
    getParams: () => BuildRule;
    getToolbar: () => BuildRule;
    getAdd: () => BuildRule[];
    getRemoveGroups: () => BuildRule[];
    /** Find a system rule (marked with '$') */
    private getSystemRule;
}
