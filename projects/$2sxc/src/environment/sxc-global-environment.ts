import { EnvironmentSpecs } from '..';
import { EnvironmentMetaLoader } from './env-loader-meta';
import { HasLog, Insights, SxcApiUrlRoot } from '../../../core';
import { AntiForgeryTokenHeaderNameDnn, DnnUiRoot, PlatformDnn } from '../constants';

declare const _jsApi: EnvironmentSpecs;

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 * @public
 */
export class SxcGlobalEnvironment extends HasLog {
    /** @internal */
    private header: EnvironmentSpecs;
    /** 
     * Flag to determine if the environment information is available. 
     */
    public ready = false;
    /** 
     * Where the environment information came from.
     */
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
     * Manually load a new EnvironmentSpecs in cases where the page cannot provide them. 
     * This is only used in scenarios outside of Dnn / Oqtane, you will usually not need this. 
     * @param envSpecs new info to load
     * @param source _optional_ name where the data came from
     */
    public load(envSpecs: EnvironmentSpecs, source?: string) {
        const cl = this.log.call('load');
        if(envSpecs.root && !envSpecs.api) {
            cl.add('root provided, api missing, will auto-complete');
            const addSlash = (envSpecs.root.endsWith('/') ? '' : '/');
            envSpecs.api = `${envSpecs.root}${addSlash}${SxcApiUrlRoot}`;
        }
        this.header = envSpecs;

        // in some cases the UpdateRvt may already have been called before
        // in which case it's probably more relevant
        // so we should set it again
        if(this.replacedRvt) this.header.rvt = this.replacedRvt;

        this.ready = true;
        this.source = source || 'external/unknown' + (this.replacedRvt ? '+rvt': '');
        cl.return(envSpecs, 'loaded from ' + this.source);
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
     * The current page ID - often needed in API calls
     */
    public page(): number {
        this.ensureReadyOrThrow('page');
        return this.header.page;
    }

    /**
     * The request verification token header name for internal WebAPI calls
     */
    public rvtHeader(): string {
        this.ensureReadyOrThrow('rvtHeader');
        return this.header.rvtHeader || AntiForgeryTokenHeaderNameDnn;
    }

    /**
     * The request-verification token for internal WebAPI calls
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

