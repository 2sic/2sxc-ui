import { Environment } from './Environment';
import { Log } from './Log';
import { Http } from './Http';
import { UrlParams } from './UrlParams';
import { SxcInstance } from './SxcInstance';

/**
 * This is the interface for the main $2sxc object on the window
 */
export interface SxcRoot {
    /**
     * Get's an SxcInstance
     * @param id number | HTMLElement
     * @param cbid number
     * @returns SxcInstance
     */
    (id: number | HTMLElement, cbid?: number): SxcInstance;

    /**
     * system information, mainly for checking which version of 2sxc is running
     * note: it's not always updated reliably, but it helps when debugging
     */
    sysinfo: {
        /** the version using the ##.##.## syntax */
        version: string,

        /** a short text description, for people who have no idea what this is */
        description: string,
    };

    /**
     * Environment information
     * @type {Environment}
     */
    env: Environment;

    /**
     * Http helper for API calls and such
     */
    http: Http;

    /**
     * Internal logger to better see what's happening
     */
    log: Log;

    /**
     * Helper to work with url parameters behind ? or #
     * @type {UrlParams}
     * @memberof SxcRoot
     */
    urlParams: UrlParams
}
