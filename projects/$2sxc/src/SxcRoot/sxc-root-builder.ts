import { TotalPopup } from '../tools/total-popup';
import { UrlParamManager } from '../tools/url-param-manager';
import { Stats } from '../Stats';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { SxcRootInternals } from './sxc-root-internals';
import { SxcRoot, getRootPartsV2 } from './sxc-root';
import { Window } from "../_/Window";
import { Debug } from '..';
import { Insights } from '../logging';

declare const $2sxc_jQSuperlight: any;
declare const window: Window;

/**
 * returns a 2sxc-instance of the id or html-tag passed in
 * @param id
 * @param cbid
 * @returns {}
 */
function FindSxcInstance(id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals {
    const $2sxc = window.$2sxc as SxcRoot & SxcRootInternals;
    $2sxc.log.add('FindSxcInstance(' + id + ',' + cbid);
    if (!$2sxc._controllers) 
        throw new Error('$2sxc not initialized yet');

    // if it's a dom-element, use auto-find
    if (typeof id === 'object') {
        const idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }

    // if content-block is unknown, use id of module, and create an ID in the cache
    if (!cbid) cbid = id;
    const cacheKey = id + ':' + cbid;

    // either get the cached controller from previous calls, or create a new one
    if ($2sxc._controllers[cacheKey]) {
        $2sxc.log.add('Cache found for: ' + cacheKey);
        return $2sxc._controllers[cacheKey];
    }

    // not found, so also init the data-cache in case it's ever needed
    if (!$2sxc._data[cacheKey]) $2sxc._data[cacheKey] = {};

    return ($2sxc._controllers[cacheKey]
        = new SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc));
}

/**
 * Build a SXC Controller for the page. Should only ever be executed once
 */
export function buildSxcRoot(): SxcRoot & SxcRootInternals {
    const rootApiV2 = getRootPartsV2();

    const urlManager = new UrlParamManager();
    const debug = new Debug();
    //  {
    //     load: (urlManager.get('debug') === 'true'),
    //     uncache: urlManager.get('sxcver'),
    // };
    const stats = new Stats();


    const addOn: Partial<SxcRoot & SxcRootInternals> = {
        _controllers: {} as any,
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
        insights: Insights,
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
        jq: function() { return  $2sxc_jQSuperlight; },
    };

    const merged = addOn.jq().extend(FindSxcInstance, addOn, rootApiV2) as SxcRoot & SxcRootInternals;
    merged.log.add('sxc controller built');

    return merged; //FindSxcInstance as SxcRoot & SxcRootInternals;
}


function autoFind(domElement: HTMLElement | JQuery): [number, number] {
    const containerTag = $2sxc_jQSuperlight(domElement).closest('.sc-content-block')[0];
    if (!containerTag) return null;
    const iid = containerTag.getAttribute('data-cb-instance');
    const cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid) return null;
    return [iid, cbid];
}
