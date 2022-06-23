import { SxcPart } from './sxc-part';
import { RunParams } from '../cms/run-params';
import { Sxc } from '.';
/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 */
export declare class SxcCms extends SxcPart {
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
