import { UrlParams } from '..';

const urlManager = new UrlParams();
const urlDebugState = urlManager.isDebug() === true;

/** @internal */
export class SxcGlobalDebug {
    /**
     * The load-debug state (provided by the url with debug=true)
     */
    load: boolean;

    /**
     * Cache breaker string, contans the version number of 2sxc if one is provided with sxcver=...
     */
    uncache: string;

    constructor() {
        this.load = urlDebugState;
        this.uncache = urlManager.get('sxcver');
    }
}
