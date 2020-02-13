
export interface UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     *
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
}
