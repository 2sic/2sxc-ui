import { ContextIdentifier } from '../sxc-global/context-identifier';
import { SxcWebApi } from './web-api/sxc-web-api';
import { HasLog } from '../../../core';
import { SxcManage } from './sxc-manage';
import { SxcData } from './data/sxc-data';
import { SxcQuery } from './data/sxc-query';
import { SxcGlobal } from '..';
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
     * the id/key of this instance in the cache for reset
     * @internal
     */
    cacheKey: string;
    /**
     * The environment information, important for http-calls
     * @internal
     */
    readonly root: SxcGlobal;
    /**
     * Custom context information provided by the constructor - will replace auto-context detection
     * @internal
     */
    ctx?: ContextIdentifier;
    /** @internal */
    private _isSxcInstance;
    /**
     * Web API calls for this instance.
     * This is the pure call APIs system.
     * To get data or queries, best use the data or query services.
     * @type {SxcWebApi}
     * @memberof Sxc
     */
    webApi: SxcWebApi;
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     * @memberof SxcInstance
     * @internal
     */
    manage: SxcManage;
    /**
     * CMS operations on this sxc-instance, such as opening the edit dialog etc.
     */
    cms: SxcCms;
    /** @internal */
    constructor(
    /** the sxc-instance ID, which is usually the DNN Module Id */
    id: number, 
    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number, 
    /**
     * the id/key of this instance in the cache for reset
     * @internal
     */
    cacheKey: string, 
    /**
     * The environment information, important for http-calls
     * @internal
     */
    root: SxcGlobal, 
    /**
     * Custom context information provided by the constructor - will replace auto-context detection
     * @internal
     */
    ctx?: ContextIdentifier);
    /**
     * TypeGuard for TypeScript to verify this is a SxcInstance
     * @param thing
     * @internal
     */
    static is(thing: unknown): thing is Sxc;
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
    * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
    * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
    * @deprecated use http.apiUrl instead
    * @param virtualPath
    * @returns mapped path
    * @internal
    */
    resolveServiceUrl(virtualPath: string): string;
    /**
     * Show a nice error with more infos around 2sxc
     * @param result
     * @returns
     * @internal
     */
    showDetailedHttpError(result: any): any;
    /**
     * Test if the current code is in edit-mode and additional javascripts have been loaded to make it work
     * @returns true if we are in edit-mode
     */
    isEditMode(): boolean;
    /**
     *
     * @param resetCache
     * @returns
     * @internal
     */
    recreate(resetCache: boolean): Sxc;
}
