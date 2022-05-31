import { SxcInstance } from '..';
import { SxcInstancePart } from '../sxc-instance-part';
import { SxcWebApi } from '../web-api/sxc-web-api';

/**
* Base class doing common checks
* @internal
*/
export class SxcDataQueryBase extends SxcInstancePart {
  protected readonly webApi: SxcWebApi;
  /**
  * Creates an instance of SxcData.
  * @param {SxcInstance} sxc
  * @param {string} name the content-type name
  * @memberof SxcData
  */
  constructor(
    sxc: SxcInstance,
    readonly name: string,
    nameInError: string
  ) {
    super(sxc, 'data');
    this.webApi = sxc.webApi;
    
    // Fail early if something is wrong
    nameInError += ' name ';
    if (name == null) throw nameInError + 'is empty';
    if (name.indexOf("/") != -1 || name.indexOf("\\") != -1) throw nameInError + 'has slashes - not allowed';
    if (name.indexOf("?") != -1) throw nameInError + 'has "?" - not allowed';
  }

}
  