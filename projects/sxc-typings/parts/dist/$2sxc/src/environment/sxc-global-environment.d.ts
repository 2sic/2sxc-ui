import { EnvironmentSpecs } from '..';
import { EnvironmentMetaLoader } from './env-loader-meta';
import { HasLog } from '../../../core';
/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 * @public
 */
export declare class SxcGlobalEnvironment extends HasLog {
    /** @internal */
    private header;
    /**
     * Flag to determine if the environment information is available.
     */
    ready: boolean;
    /**
     * Where the environment information came from.
     */
    source: string;
    /** @internal */
    metaLoader: EnvironmentMetaLoader;
    /** @internal */
    constructor();
    /**
     * Manually load a new EnvironmentSpecs in cases where the page cannot provide them.
     * This is only used in scenarios outside of Dnn / Oqtane, you will usually not need this.
     * @param envSpecs new info to load
     * @param source _optional_ name where the data came from
     */
    load(envSpecs: EnvironmentSpecs, source?: string): void;
    /** @internal */
    private replacedRvt;
    /** @internal */
    updateRvt(newRvt: string): void;
    /**
     * The API endpoint url from the environment
     */
    api(): string;
    /** @internal */
    appApi(): string;
    /**
     * The current page ID - often needed in API calls
     */
    page(): number;
    /**
     * The request verification token header name for internal WebAPI calls
     */
    rvtHeader(): string;
    /**
     * The request-verification token for internal WebAPI calls
     */
    rvt(): string;
    /**
     * The uiRoot path
     * @internal
     */
    uiRoot(): string;
    /**
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    platform(): string;
    /** @internal */
    private ensureReadyOrThrow;
}
