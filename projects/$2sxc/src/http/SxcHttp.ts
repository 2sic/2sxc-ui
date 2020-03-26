import * as Public from '../../../sxc-typings/index';
import { HeaderNames, ToSxcName, ApiExtensionPlaceholder } from '../constants';
import { Environment, HasLog, Log } from '../index';

export class SxcHttp extends HasLog implements Omit<Public.Http, 'log'> {
    constructor(private env: Environment) {
        super('Sxc.Http');
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(id?: number, cbid?: number): Public.Dictionary<string> {
        const cl = this.log.call('headers', `${id}, ${cbid}`);
        const fHeaders : Public.Dictionary<string> = {}; // as any;
        if(id) fHeaders[HeaderNames.ModuleId] = id.toString();
        if(cbid) fHeaders[HeaderNames.ContentBlockId] = cbid.toString();
        fHeaders[HeaderNames.TabId] = this.env.page().toString();
        fHeaders[HeaderNames.Rvt] = this.env.rvt();
        return cl.return(fHeaders, `headers(id:${id}, cbid:${cbid})`);
    }

    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
    apiRoot(endpointName: string): string {
        const cl = this.log.call('apiRoot');
        var result = this.env.api().replace(ApiExtensionPlaceholder, endpointName);
        return cl.return(result, `apiRoot('${endpointName}')`);
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
        const cl = this.log.call('apiUrl');
        this.log.add(`apiUrl(url:'${url}', endpointName:'${endpointName}')`);
        // if starts with http: or https: then ignore
        if(!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return cl.return(url);
        
        // if no endpoint specified, then also skip absolute and relative urls
        if(!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return cl.return(url);

        var baseUrl = this.apiRoot(endpointName || ToSxcName);
        // ensure base ends with slash
        if(baseUrl[baseUrl.length-1] != '/') baseUrl += '/';
        // ensure url doesn't start with slash
        if(url[0] == '/') url = url.slice(1);
        return cl.return(baseUrl + url);
    }
}