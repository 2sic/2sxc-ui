import { Dictionary, HasLog } from '../../../core';
import { ContextIdentifier } from '..';
/**
 * Global HTTP Service for information and helpers.
 * Provided on on `$2sxc.http`
 */
export declare class HttpGlobal extends HasLog {
    private env;
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(id?: number, cbid?: number, ctx?: ContextIdentifier): Dictionary<string>;
    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof Http
     */
    apiRoot(endpointName: string): string;
    /**
     * Get the URL for a specific web API endpoint
     * Will ignore urls which clearly already are the full url.
     * @param {string} url
     * @param {string} [endpointName]
     * @returns
     * @memberof Http
     */
    apiUrl(url: string, endpointName?: string): string;
}
