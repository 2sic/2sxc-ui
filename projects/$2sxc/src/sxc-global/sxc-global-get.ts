import { Sxc, SxcGlobal } from '..';
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
 * @internal
 */
export function $2sxcGet(id: number | ContextIdentifier | HTMLElement | Sxc, cbid?: number): Sxc {
    const $2sxc = window.$2sxc as SxcGlobal;
    $2sxc.log.add('FindSxcInstance(' + id + ',' + cbid);
    if (!$2sxc._controllers)
        throw new Error('$2sxc not initialized yet');

    // Test if it already is such an instance, in which case we just preserve it and return it
    // Used in cases where the $2sxc(something) is just used to ensure it really is this
    if (Sxc.is(id)) return id;

    // check if it's a context identifier
    let ctx: ContextIdentifier = null;
    if (ContextIdentifier.is(id)) {
        ctx = ContextIdentifier.ensureCompleteOrThrow(id);
        // get moduleId or create fake, based on zone and app because this is used to identify the object in the cache
        id = ctx.moduleId ?? ctx.zoneId * 100000 + ctx.appId;
    } else if (id instanceof HTMLElement && id.matches(toolbarSelector) && !id.closest(sxcDivsSelector)) {
        // for toolbars that are not inside 2sxc modules (e.g. in skin)
        const contextAttribute = id.getAttribute('sxc-context');
        var ctxFromAttribute = JSON.parse(contextAttribute);
        return $2sxcGet(ctxFromAttribute);
    } else if (typeof id === 'object') {
        // if it's a dom-element, use auto-find
        const idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }

    // if content-block is unknown, use id of module, and create an ID in the cache
    if (!cbid) cbid = id;
    const cacheKey = ctx != null ? ContextIdentifier.toCacheKey(ctx) : id + ':' + cbid;

    // either get the cached controller from previous calls, or create a new one
    if ($2sxc._controllers[cacheKey]) {
        $2sxc.log.add('Cache found for: ' + cacheKey);
        return $2sxc._controllers[cacheKey];
    }

    return ($2sxc._controllers[cacheKey]
        = new Sxc(id, cbid, cacheKey, $2sxc, ctx));
}

function autoFind(domElement: HTMLElement): [number, number] {
    const containerTag = domElement.closest('.sc-content-block');
    if (!containerTag) return null;
    const iid = containerTag.getAttribute('data-cb-instance');
    const cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid) return null;
    return [parseInt(iid, 10), parseInt(cbid, 10)];
}
