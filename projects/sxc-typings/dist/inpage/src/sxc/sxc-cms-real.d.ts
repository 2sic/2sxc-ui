import { Sxc } from '../../../$2sxc/src';
import { RunParams } from '../../../$2sxc/src/cms';
import { SxcCms } from '../../../$2sxc/src/sxc/sxc-cms';
/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @internal
 */
export declare class SxcCmsReal extends SxcCms {
    /** @internal */
    constructor(sxc: Sxc);
    /**
     * Run a command on this sxc-instance.
     * Requires edit mode to be on, which would enable the edit-JS parts.
     * To use, remember to activate `2sxc.JsCms` on the page
     * @param runParams - real type is actually RunParams
     */
    run<T>(runParams: RunParams): Promise<void | T>;
}
