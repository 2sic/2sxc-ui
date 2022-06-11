import { EnvironmentSpecs } from '..';
import { HasLog } from '../../../core';
/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export declare class Environment extends HasLog {
    ready: boolean;
    source: string;
    /**
     * Manually load a new EnvironmentSpecs in cases where the page cannot provide them.
     * This is only used in scenarios outside of Dnn / Oqtane, you will usually not need this.
     * @param envSpecs new info to load
     * @param source _optional_ name where the data came from
     */
    load(envSpecs: EnvironmentSpecs, source?: string): void;
    /**
     * The API endpoint url from the environment
     */
    api(): string;
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
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    platform(): string;
}
