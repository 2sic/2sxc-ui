import { Sxc } from './sxc';

/**
 * Base class for anything attached to an sxc-instance.
 * This is internal and not important, but we can't keep it out of the docs. 
 * @public
 */
export abstract class SxcPart {
  /**
  * Creates an instance of SxcData.
  * @param sxc: sxc
  * @param partName: name of the part
  * @internal
  */
  constructor(
    /** @internal */
    public sxc: Sxc, 
    /** @internal */
    public partName: string) {      
  }

}
  