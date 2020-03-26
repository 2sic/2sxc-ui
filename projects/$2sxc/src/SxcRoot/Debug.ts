import { UrlParamManager } from '..';

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
        const urlManager = new UrlParamManager();
        this.load = urlManager.get('debug') === 'true';
        this.uncache = urlManager.get('sxcver');
    }
}