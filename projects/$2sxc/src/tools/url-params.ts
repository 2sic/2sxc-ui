import { ToolUrlObjects } from './obj2url';
/**
 * Helper object to read url params. 
 * Available on `$2sxc.urlParams`
 * @public
 */
export class UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     * If not found, will return an empty string `''`
     * @param name
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
            const matches = location.pathname.match(new RegExp('/' + name + '/([^/]+)', 'i'));

            // Check if we found anything, if we do find it, we must reverse the
            // results so we get the "last" one in case there are multiple hits
            if (matches && matches.length > 1)
                strResult = matches.reverse()[0];
        } else
            strResult = results[1];

        return strResult == null
            ? ''
            : decodeURIComponent(strResult.replace(/\+/g, ' '));
    }

    /**
     * Get a required param from the url, no matter if it's behind ? or #
     * Will throw an error if not found
     * @param name
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

    /**
     * Convert an object to be used in a URL.
     * Uses a custom, brief syntax which can change at any time. 
     * So to unwrap, always use the toObj method.
     * IMPORTANT: This is an old experiment from ca. 2020 and was never used in production.
     * @param obj 
     * @returns 
     * @internal
     */
    toUrl(obj: any): string {
      return new ToolUrlObjects().toUrl(obj, true);
    }

    /**
     * Convert a url which was created by toUrl back to an object.
     * IMPORTANT: This is an old experiment from ca. 2020 and was never used in production.
     * @param url 
     * @returns
     * @internal
     */
    toObj(url: string): unknown {
      return new ToolUrlObjects().toObj(url, true);
    }
}
