import { JsInfo } from '..';
import { EnvironmentMetaLoader } from './env-loader-meta';
import { HasLog, Insights, SxcApiUrlRoot } from '../../../core';
import { AntiForgeryTokenHeaderNameDnn, DnnUiRoot, PlatformDnn } from '../constants';

declare const _jsApi: JsInfo;

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export class Environment extends HasLog {
    /** @internal */
    private header: JsInfo;
    public ready = false;
    public source = '';

    /** @internal */
    public metaLoader: EnvironmentMetaLoader;

    /** @internal */
    constructor() {
        super('Environment', null, 'starting');
        this.log.keepData = true;   // always keep here for clarity
        Insights.add('system', 'environment', this.log);
        this.metaLoader = new EnvironmentMetaLoader(this);

        // check if a global variable was already set which we should use
        if(typeof _jsApi !== typeof undefined) {
            this.log.add('found _jsApi, will use');
            this.load(_jsApi, 'global variable _jsApi');
        } else {
            this.log.add('will start initializing');
            this.metaLoader.loadMetaFromHeader();
        }
    }

    /**
     * Load a new jsInfo - must be public, as it's used in iframes where jquery is missing
     * @param newJsInfo new info to load
     */
    public load(newJsInfo: JsInfo, source?: string) {
        const cl = this.log.call('load');
        if(newJsInfo.root && !newJsInfo.api) {
            cl.add('root provided, api missing, will auto-complete');
            const addSlash = (newJsInfo.root.endsWith('/') ? '' : '/');
            newJsInfo.api = `${newJsInfo.root}${addSlash}${SxcApiUrlRoot}`;
        }
        this.header = newJsInfo;

        // in some cases the UpdateRvt may already have been called before
        // in which case it's probably more relevant
        // so we should set it again
        if(this.replacedRvt) this.header.rvt = this.replacedRvt;

        this.ready = true;
        this.source = source || 'external/unknown' + (this.replacedRvt ? '+rvt': '');
        cl.return(newJsInfo, 'loaded from ' + this.source);
    }

    /** @internal */
    private replacedRvt: string;

    /** @internal */
    public updateRvt(newRvt: string) {
        if(!newRvt) return;
        this.replacedRvt = newRvt;
        this.header.rvt = newRvt;
    }

    /**
     * The API endpoint url from the environment
     */
    public api(): string {
        this.ensureReadyOrThrow('api');
        return this.header.api;
    }

    // WIP - may return undefined
    /** @internal */
    public appApi(): string {
        // WIP - must get it to work without 'appApi' but only 'api' to ensure ...
        this.ensureReadyOrThrow('appApi');
        return this.header.appApi;
    }

    /**
     * The current page ID
     */
    public page(): number {
        this.ensureReadyOrThrow('page');
        return this.header.page;
    }

    /**
     * The request verification token header name
     */
    public rvtHeader(): string {
        this.ensureReadyOrThrow('rvtHeader');
        return this.header.rvtHeader || AntiForgeryTokenHeaderNameDnn;
    }

    /**
     * The request verification token value
     */
    public rvt(): string {
        this.ensureReadyOrThrow('rvt');
        return this.header.rvt;
    }

    /**
     * The uiRoot path
     * @internal
     */
    public uiRoot(): string {
        this.ensureReadyOrThrow('uiRoot');
        return this.header.uiRoot || DnnUiRoot;
    }

    /**
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    public platform(): string {
        this.ensureReadyOrThrow('platform');
        return this.header.platform || PlatformDnn;
    }

    /** @internal */
    private ensureReadyOrThrow(partRequested: string): void {
        if(this.ready) return;

        // try one last time - usually it should really be ready by now
        this.log.add('ensureReady - force last attempt to load MetaHeader for ' + partRequested)
        this.metaLoader.loadMetaFromHeader(true);

        // if still not ready, throw exception to console log
        if(this.ready) return;
        throw `Can't find ${partRequested} - something went wrong, pls contact 2sxc.org`;
    }

}

