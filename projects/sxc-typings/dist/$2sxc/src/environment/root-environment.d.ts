import { JsInfo } from '..';
import { HasLog } from '../../../core';
/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export declare class Environment extends HasLog {
    ready: boolean;
    source: string;
    /**
     * Load a new jsInfo - must be public, as it's used in iframes where jquery is missing
     * @param newJsInfo new info to load
     */
    load(newJsInfo: JsInfo, source?: string): void;
    /**
     * The API endpoint url from the environment
     */
    api(): string;
    /**
     * The current page ID
     */
    page(): number;
    /**
     * The request verification token header name
     */
    rvtHeader(): string;
    /**
     * The request verification token value
     */
    rvt(): string;
    /**
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    platform(): string;
}
