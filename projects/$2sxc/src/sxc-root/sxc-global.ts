import { UrlParams } from '../tools';
import { Environment } from '../environment';
import { Insights, Log } from '../../../core';
import { ContextIdentifier, Debug, Stats, Sxc, TotalPopup } from '..';
import { HttpGlobal } from './http-global';

/**
 * This is the root global `window.$2sxc` function / object. 
 * 
 * It is both a function `window.$2sxc(...)` and object `window.$2sxc.insights...`
 * 
 */
// **Documentation notes**
// Because of limitations in the documentation, the main function isn't documented here as it wouldn't show in docFx
// So additional information is in the docs-project
export interface SxcGlobal {
    /**
     * Get an SxcInstance
     * @param id number: moduleId | HTMLElement: tag in the page | Sxc: an existing sxc - will just be returned | ContextIdentifier: an identifier in complex scenarios without a moduleId/context
     * @param cbid number
     * @returns SxcInstance
     */
    (id: number | HTMLElement | ContextIdentifier | Sxc, cbid?: number): Sxc;

    
    /**
     * Get an SxcInstance
     * @param id number: moduleId | HTMLElement: tag in the page | Sxc: an existing sxc - will just be returned | ContextIdentifier: an identifier in complex scenarios without a moduleId/context
     * @param cbid number
     * @returns SxcInstance
     * @since v14.01
     */
    get(id: number | HTMLElement | ContextIdentifier | Sxc, cbid?: number): Sxc;

    /** @internal */
    _controllers: { [id: string]: Sxc };

    /** @internal */
    beta: any;

    // 2022-06-01 2dm disabled, believe this is for the old .data
    // _data: any;

    /** @internal */
    _manage: any;

    /** @internal */
    _translateInit: any;

    /**
     * 2022-06-01 2dm - I believe this is not used, probably remove
     * @internal */
    debug: Debug;

    /** @internal */
    stats: Stats;


    /**
     * system information, mainly for checking which version of 2sxc is running
     * note: it's not always updated reliably, but it helps when debugging
     */
    sysinfo: {
        /** the version using the ##.##.## syntax */
        version: string;

        /** a short text description, for people who have no idea what this is */
        description: string;
    };

    /**
     * Environment information
     * @type {Environment}
     */
    env: Environment;

    /**
     * Http helper for API calls and such
     */
    http: HttpGlobal;

    /**
     * The debugging / insights system. 
     * Call the `$2sxc.insights()` without parameters to get instructions what the parameters could be.
     * @param partName optional name of a part of the system for which we want to see the logs
     * @param index optional index on that part for which log we want to see
     * @param start log start index - this is to skip the first few lines if there are too many
     * @param length amount of lines to show - in some cases will default to 25
     */
    insights(partName: string, index?: number, start?: number, length?: number): void;

    /** @internal */
    _insights: typeof Insights;
    

    /**
     * Internal logger to better see what's happening
     */
    log: Log;


    /**
     * Helper to work with url parameters behind ? or #
     * @type {UrlParams}
     * @memberof SxcRoot
     */
    urlParams: UrlParams;

    /**
     * A helper to create full-screen popups
     * @internal
     */
    totalPopup: TotalPopup;
}