import { Sxc } from '..';
/**
* Base class for anything attached to an sxc-instance
* @internal
*/
export declare class SxcPart {
    /** @internal */
    sxc: Sxc;
    /** @internal */
    partName: string;
    /**
    * Creates an instance of SxcData.
    * @param {Sxc} sxc
    * @param {string} partName name of the part
    * @memberof SxcData
    * @internal
    */
    constructor(
    /** @internal */
    sxc: Sxc, 
    /** @internal */
    partName: string);
}
