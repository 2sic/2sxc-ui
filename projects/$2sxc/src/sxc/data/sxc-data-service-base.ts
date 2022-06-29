import { Sxc } from '..';
import { SxcPart } from '../sxc-part';
import { SxcWebApi } from '../web-api/sxc-web-api';

/**
 * Base class doing common checks.
 * This is internal and not important, but we can't keep it out of the docs. 
 * @public
 */
export abstract class SxcDataServiceBase extends SxcPart {
  protected readonly webApi: SxcWebApi;
  /**
  * Creates an instance of SxcData.
  * @param sxc: 
  * @param name: the content-type name
  * @internal
  */
  constructor(
    sxc: Sxc,
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
  