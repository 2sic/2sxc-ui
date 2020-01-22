import * as I from '../../../typings/index';
import { HeaderNames, ToSxcName, ApiExtensionPlaceholder } from '../constants';
import { Environment } from '../environment/Environment';

export class SxcHttp implements I.SxcHttp {
    constructor(private env: Environment) {
        
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(id?: number, cbid?: number): I.Dictionary<string> {
        const fHeaders = {};
        if(id) fHeaders[HeaderNames.ModuleId] = id;
        if(cbid) fHeaders[HeaderNames.ContentBlockId] = cbid;
        fHeaders[HeaderNames.TabId] = this.env.page();
        fHeaders[HeaderNames.Rvt] = this.env.rvt();
        return fHeaders;
    }

    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
    apiRoot(endpointName: string): string {
        return this.env.api().replace(ApiExtensionPlaceholder, endpointName);
    }

    /**
     * Get the URL for a specific web API endpoint
     * Will ignore urls which clearly already are the full url.
     * @param {string} url
     * @param {string} [endpointName]
     * @returns
     * @memberof SxcHttp
     */
    apiUrl(url: string, endpointName?: string)
    {
        // if starts with http: or https: then ignore
        if(!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return url;
        
        // if no endpoint specified, then also skip absolute and relative urls
        if(!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return url;

        var baseUrl = this.apiRoot(endpointName || ToSxcName);
        // ensure base ends with slash
        if(baseUrl[baseUrl.length-1] != '/') baseUrl += '/';
        // ensure url doesn't start with slash
        if(url[0] == '/') url = url.slice(1);
        return baseUrl + url;
    }
}