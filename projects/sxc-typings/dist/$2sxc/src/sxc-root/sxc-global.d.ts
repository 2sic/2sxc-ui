import { UrlParams } from '../tools';
import { Environment } from '../environment';
import { Log } from '../../../core';
import { ContextIdentifier, Sxc } from '..';
import { HttpGlobal } from './http-global';
/**
 * This is the root global `window.$2sxc` function / object.
 *
 * It is both a function `window.$2sxc(...)` and object `window.$2sxc.insights...`
 *
 */
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
}
