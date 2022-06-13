import { SxcWebApi } from './web-api/sxc-web-api';
import { HasLog } from '../../../core';
import { SxcData } from './data/sxc-data';
import { SxcQuery } from './data/sxc-query';
import { SxcCms } from './sxc-cms';
/**
* The typical sxc-instance object for a specific DNN module or content-block
*/
export declare class Sxc extends HasLog {
    /** the sxc-instance ID, which is usually the DNN Module Id */
    id: number;
    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number;
    /**
     * Web API calls for this instance.
     * This is the pure call APIs system.
     * To get data or queries, best use the data or query services.
     * @type {SxcWebApi}
     * @memberof Sxc
     */
    webApi: SxcWebApi;
    /**
     * CMS operations on this sxc-instance, such as opening the edit dialog etc.
     */
    cms: SxcCms;
    /**
     * Get a data service for a specific content-type.
     *
     * @param {string} contentType name of the content type which this service will get
     * @returns SxcData<T>
     * @memberof SxcInstance
     */
    data<T = unknown>(contentType: string): SxcData<T>;
    /**
     *
     * @param query
     * @returns SxcQuery
     * @memberof SxcInstance
     */
    query(query: string): SxcQuery;
    /**
     * Test if the current code is in edit-mode and additional javascripts have been loaded to make it work
     * @returns true if we are in edit-mode
     */
    isEditMode(): boolean;
}
