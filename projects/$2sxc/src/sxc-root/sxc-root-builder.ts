import { TotalPopup } from '../tools/total-popup';
import { UrlParamManager } from '../tools/url-param-manager';
import { Stats } from '../Stats';
import { getRootPartsV2 } from './sxc-root';
import { Window } from '../_/window';
import { Debug, SxcInstance, SxcRoot } from '..';
import { Insights, SxcVersion } from '../../../core';
import { ContextIdentifier } from './context-identifier';

declare const window: Window;
// TODO: copied from selectors in inpage project. Probably best to move selectors from inpage to core
const toolbarSelector = `.sc-menu[toolbar],.sc-menu[data-toolbar],[sxc-toolbar]`;
const sxcDivsSelector = 'div[data-edit-context]';

/**
 * returns a 2sxc-instance of the id or html-tag passed in
 * @param id
 * @param cbid
 * @returns {}
 */
function FindSxcInstance(id: number | ContextIdentifier | HTMLElement | SxcInstance, cbid?: number): SxcInstance {
    const $2sxc = window.$2sxc as SxcRoot;
    $2sxc.log.add('FindSxcInstance(' + id + ',' + cbid);
    if (!$2sxc._controllers)
        throw new Error('$2sxc not initialized yet');

    // Test if it already is such an instance, in which case we just preserve it and return it
    // Used in cases where the $2sxc(something) is just used to ensure it really is this
    if (SxcInstance.is(id)) return id;

    // check if it's a context identifier
    let ctxId: ContextIdentifier = null;
    if (ContextIdentifier.is(id)) {
        id = ContextIdentifier.ensureCompleteOrThrow(id);
        ctxId = id;
        // create a fake id, based on zone and app because this is used to identify the object in the cache
        id = id.zoneId * 100000 + id.appId;
    } else if (id instanceof HTMLElement && id.matches(toolbarSelector) && !id.closest(sxcDivsSelector)) {
        // for toolbars that are not inside 2sxc modules (e.g. in skin)
        const contextAttribute = id.getAttribute('sxc-context');
        ctxId = JSON.parse(contextAttribute);
        return FindSxcInstance(ctxId);
    } else if (typeof id === 'object') {
        // if it's a dom-element, use auto-find
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
        = new SxcInstance(id, cbid, cacheKey, $2sxc, ctxId));
}

/**
 * Build a SXC Controller for the page. Should only ever be executed once
 * @internal
 */
export function buildSxcRoot(): SxcRoot {
    const rootApiV2 = getRootPartsV2();

    const urlManager = new UrlParamManager();
    const debug = new Debug();
    //  {
    //     load: (urlManager.get('debug') === 'true'),
    //     uncache: urlManager.get('sxcver'),
    // };
    const stats = new Stats();


    const addOn: Partial<SxcRoot> = {
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
        insights: (partName: string, index?: number, start?: number, length?: number) => Insights.show(partName, index, start, length),
        _insights: Insights,
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        parts: {
            getUrl(url: string, preventUnmin: boolean) {
                // let r = url;// (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
                if (debug.uncache && url.indexOf('sxcver') === -1)
                    return url + ((url.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return url;
            },
        },
    };

    const merged = Object.assign(FindSxcInstance, addOn, rootApiV2) as SxcRoot;
    merged.log.add('sxc controller built');

    console.log(`$2sxc ${SxcVersion} with insights-logging - see https://r.2sxc.org/insights`)

    return merged;
}


function autoFind(domElement: HTMLElement): [number, number] {
    const containerTag = domElement.closest('.sc-content-block');
    if (!containerTag) return null;
    const iid = containerTag.getAttribute('data-cb-instance');
    const cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid) return null;
    return [parseInt(iid, 10), parseInt(cbid, 10)];
}
