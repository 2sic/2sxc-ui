import { Operations as Operators, RuleParams } from '.';
import { HasLog, Log } from '../../core';
import { TypeValue } from '../../plumbing';
import { BuildSteps } from './build-steps';
/**
 * Contains a rule how to add/modify a toolbar.
 * @internal
 */
export declare class BuildRule extends HasLog {
    ruleString: string;
    /** The ID for this rule - often the same as the name */
    id: string;
    /** Name of the thing being added - often a command name or can be the group name */
    name: string;
    /** The build command to run */
    step: BuildSteps | string;
    /** what this rule should do */
    operator: Operators;
    /** Group name - when adding more buttons */
    group: string;
    /**
     * position where something is added - the group or the button
     * Note that JS preserves -0
     */
    pos: number;
    params?: RuleParams;
    /**
     * Button Rules - determines what a button should do / not do
     * Note: can also be Partial<ToolbarSettings>
     */
    ui: {
        icon?: string;
        class?: string;
        color?: string;
        show?: boolean;
        code?: string;
        title?: string;
        [key: string]: TypeValue;
    };
    /** ATM unused url-part after the hash - will probably be needed in future */
    context: {
        appId?: number;
        zoneId?: number;
        complete?: boolean;
    };
    constructor(ruleString: string, parentLog: Log);
    /** Tells if this rule will override the show settings  */
    overrideShow(): boolean | undefined;
    private load;
    private loadHeader;
    private loadHeaderParts;
    private loadParamsAndPrefill;
    private dicToArray;
    private splitParamsDic;
    private splitParamsArray;
}
