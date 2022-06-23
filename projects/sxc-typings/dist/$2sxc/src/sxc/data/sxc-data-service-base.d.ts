import { Sxc } from '..';
import { SxcPart } from '../sxc-part';
import { SxcWebApi } from '../web-api/sxc-web-api';
/**
* Base class doing common checks
* @internal
*/
export declare class SxcDataServiceBase extends SxcPart {
    readonly name: string;
    protected readonly webApi: SxcWebApi;
    /**
    * Creates an instance of SxcData.
    * @param {Sxc} sxc
    * @param {string} name the content-type name
    * @memberof SxcData
    */
    constructor(sxc: Sxc, name: string, nameInError: string);
}
