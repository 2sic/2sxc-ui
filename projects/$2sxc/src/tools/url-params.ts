/**
 * Helper object to read url params. 
 * Available on `$2sxc.urlParams`
 */
export class UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     * If not found, will return an empty string `''`
     * @param {string} name
     * @memberof QueryParams
     */
    get(name: string) {
        // warning: this method is duplicated in 2 places - keep them in sync.
        // locations are eav and 2sxc4ng
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const searchRx = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
        let results = searchRx.exec(location.search);
        let strResult: string;

        if (results === null) {
            const hashRx = new RegExp('[#&]' + name + '=([^&#]*)', 'i');
            results = hashRx.exec(location.hash);
        }

        // if nothing found, try normal URL because DNN places parameters in /key/value notation
        if (results === null) {
            // Otherwise try parts of the URL
            const matches = window.location.pathname.match(new RegExp('/' + name + '/([^/]+)', 'i'));

            // Check if we found anything, if we do find it, we must reverse the
            // results so we get the "last" one in case there are multiple hits
            if (matches && matches.length > 1)
                strResult = matches.reverse()[0];
        } else
            strResult = results[1];

        return strResult === null || strResult === undefined
            ? ''
            : decodeURIComponent(strResult.replace(/\+/g, ' '));
    }

    /**
     * Get a required param from the url, no matter if it's behind ? or #
     * Will throw an error if not found
     * @param {string} name
     * @memberof QueryParams
     */
    require(name: string) {
        const found = this.get(name);
        if (found === '') {
            const message = `Required parameter (${name}) missing from url - cannot continue`;
            alert(message);
            throw message;
        }
        return found;
    }

    /**
     * Checks if debug is enabled in the URL
     * @returns 
     */
    isDebug(): boolean {
        return this.get('debug')?.toLocaleLowerCase() === 'true'
    }
}
