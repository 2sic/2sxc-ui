import { SxcInstanceInternal } from '..';

/**
* Base class for anything attached to an sxc-instance
* @internal
*/
export class SxcInstancePart {
  /**
  * Creates an instance of SxcData.
  * @param {SxcInstanceInternal} sxc
  * @param {string} partName name of the part
  * @memberof SxcData
  */
  constructor(public sxc: SxcInstanceInternal, public partName: string) {
      
  }

}
  