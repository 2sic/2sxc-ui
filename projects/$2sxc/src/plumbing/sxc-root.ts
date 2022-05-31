import { Environment } from '../environment';
import { Insights, Log } from '../../../core';
import { UrlParams } from './url-params';
import { ContextIdentifier, Debug, Stats, SxcInstance, TotalPopup } from '..';
import { SxcHttp } from '../http/sxc-http';

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
    (id: number | HTMLElement | ContextIdentifier | SxcInstance, cbid?: number): SxcInstance;

    /** @internal */
    _controllers: { [id: string]: SxcInstance };

    /** @internal */
    beta: any;

    /** @internal */
    _data: any;

    /** @internal */
    _manage: any;

    /** @internal */
    _translateInit: any;

    /** @internal */
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
    http: SxcHttp;

    /** 
     * The debugging / insights system 
     */
    insights: typeof Insights.show;

    /** @internal */
    _insights: typeof Insights;
    

    /**
     * Internal logger to better see what's happening
     */
    log: Log;

    /** 
     * Very internal bit, probably will be deprecated 
     * @internal
     */
    parts: any;


    /**
     * Helper to work with url parameters behind ? or #
     * @type {UrlParams}
     * @memberof SxcRoot
     */
    urlParams: UrlParams;

    /**
     * A simple helper to create full-screen popups
     * @internal
     */
    totalPopup: TotalPopup;
}
