import { ToolbarConfigLoader } from '.';
import { InPageCommandJson, InPageCommandJsonWithTooMuchInfo } from '.';
import { HasLog } from '../../core';
/**
 * @internal
 */
export declare class CommandConfigLoader extends HasLog {
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    /**
     * entity support (compatibility for pre 2sxc v9.x)
     * does some clean-up work on a button-definition object
     * because the target item could be specified directly, or in a complex internal object called entity
     * @param actDef
     */
    updateToV9(actDef: InPageCommandJsonWithTooMuchInfo): InPageCommandJson;
}
