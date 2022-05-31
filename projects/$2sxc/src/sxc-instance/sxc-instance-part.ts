import { SxcInstance } from '..';

/**
* Base class for anything attached to an sxc-instance
* @internal
*/
export class SxcInstancePart {
  /**
  * Creates an instance of SxcData.
  * @param {SxcInstance} sxc
  * @param {string} partName name of the part
  * @memberof SxcData
  */
  constructor(public sxc: SxcInstance, public partName: string) {
      
  }

}
  