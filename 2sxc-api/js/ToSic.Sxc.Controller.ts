// ReSharper disable InconsistentNaming

import { SxcInstance, SxcInstanceWithEditing, SxcInstanceWithInternals } from './ToSic.Sxc.Instance';
import { TotalPopup } from './ToSic.Sxc.TotalPopup';
import { UrlParamManager } from './ToSic.Sxc.Url';
import { Stats } from './Stats';
import { Environment } from './environment/Environment';

export interface Window { $2sxc: SxcController | SxcControllerWithInternals; }

declare const $2sxc_jQSuperlight: any;
declare const window: Window;
const sxcVersion = '10.25.01';

const environment = new Environment();

/**
 * This is the interface for the main $2sxc object on the window
 */
export interface SxcController {
    /**
     * returns a 2sxc-instance of the id or html-tag passed in
     * @param id
     * @param cbid
     * @returns {}
     */
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals,

    /**
     * system information, mainly for checking which version of 2sxc is running
     * note: it's not always updated reliably, but it helps when debugging
     */
    sysinfo: {
        /**
         * the version using the ##.##.## syntax
         */
        version: string,

        /**
         * a short text description, for people who have no idea what this is
         */
        description: string,
    };

    env: Environment;
    // future: make a method to get jQuery from DNN or internal
    get$(): JQuery;

    _controllers: SxcInstanceWithInternals[];
    beta: any;
    _data: any;
    totalPopup: TotalPopup;
    urlParams: UrlParamManager;
    debug: any;
    stats: Stats;

    /** Very internal bit, probably will be deprecated */
    parts: any;
}

/**
 * returns a 2sxc-instance of the id or html-tag passed in
 * @param id
 * @param cbid
 * @returns {}
 */
function SxcController(id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals {
    const $2sxc = window.$2sxc as SxcControllerWithInternals;
    if (!$2sxc._controllers)
        throw new Error('$2sxc not initialized yet');

    // if it's a dom-element, use auto-find
    if (typeof id === 'object') {
        const idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }

    if (!cbid) cbid = id;           // if content-block is unknown, use id of module
    const cacheKey = id + ':' + cbid; // neutralize the id from old "34" format to the new "35:353" format

    // either get the cached controller from previous calls, or create a new one
    if ($2sxc._controllers[cacheKey]) return $2sxc._controllers[cacheKey];

    // also init the data-cache in case it's ever needed
    if (!$2sxc._data[cacheKey]) $2sxc._data[cacheKey] = {};

    return ($2sxc._controllers[cacheKey]
        = new SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, environment));
}

/**
 * Build a SXC Controller for the page. Should only ever be executed once
 */
export function buildSxcController(): SxcController | SxcControllerWithInternals {
    const urlManager = new UrlParamManager();
    const debug = {
        load: (urlManager.get('debug') === 'true'),
        uncache: urlManager.get('sxcver'),
    };
    const stats = new Stats();

    const addOn: Partial<SxcController> = {
        _controllers: {} as any,
        sysinfo: {
            version: sxcVersion,
            description: 'The 2sxc Controller object - read more about it on docs.2sxc.org',
        },
        beta: {},
        _data: {},
        // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
        totalPopup: new TotalPopup(),
        urlParams: urlManager,
        // note: I would like to remove this from $2sxc, but it's currently
        // used both in the inpage-edit and in the dialogs
        // debug state which is needed in various places
        debug,
        stats: stats,
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        parts: {
            getUrl(url: string, preventUnmin: boolean) {
                let r = (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
                if (debug.uncache && r.indexOf('sxcver') === -1)
                    r = r + ((r.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return r;
            },
        },
        env: environment,
        get$: function() { return  $2sxc_jQSuperlight; },
    };
    for (const property in addOn)
        if (addOn.hasOwnProperty(property))
            SxcController[property] = addOn[property] as any;
    return SxcController as any as SxcControllerWithInternals;
}

function autoFind(domElement: HTMLElement): [number, number] {
    const containerTag = $2sxc_jQSuperlight(domElement).closest('.sc-content-block')[0];
    if (!containerTag) return null;
    const iid = containerTag.getAttribute('data-cb-instance');
    const cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid) return null;
    return [iid, cbid];
}

export interface SxcControllerWithInternals extends SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
    totalPopup: TotalPopup;
    urlParams: UrlParamManager;
    beta: any;
    _controllers: any;
    _data: any;
    _manage: any;
    _translateInit: any;
    debug: any;
    parts: any;

}

// ReSharper restore InconsistentNaming
