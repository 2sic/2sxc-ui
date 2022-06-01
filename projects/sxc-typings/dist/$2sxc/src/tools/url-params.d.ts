/**
 * Helper object to read url params.
 * Available on `$2sxc.urlParams`
 */
export declare class UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     * If not found, will return an empty string `''`
     * @param {string} name
     * @memberof QueryParams
     */
    get(name: string): string;
    /**
     * Get a required param from the url, no matter if it's behind ? or #
     * Will throw an error if not found
     * @param {string} name
     * @memberof QueryParams
     */
    require(name: string): string;
    /**
     * Checks if debug is enabled in the URL
     * @returns
     */
    isDebug(): boolean;
}
