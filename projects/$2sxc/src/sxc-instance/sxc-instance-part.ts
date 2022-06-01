import { Sxc } from '..';

/**
* Base class for anything attached to an sxc-instance
* @internal
*/
export class SxcPart {
  /**
  * Creates an instance of SxcData.
  * @param {Sxc} sxc
  * @param {string} partName name of the part
  * @memberof SxcData
  */
  constructor(public sxc: Sxc, public partName: string) {
      
  }

}
  