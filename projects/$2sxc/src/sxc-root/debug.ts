import { UrlParamManager } from '..';

const urlManager = new UrlParamManager();
const urlDebugState = urlManager.get('debug') === 'true';

/** @internal */
export class Debug {
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

    static urlState = urlDebugState;
}
