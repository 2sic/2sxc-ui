import { ApiExtensionPlaceholder } from '../constants';
import { AppApiMarker, HasLog, HeaderNames, ToSxcName } from '../../../core';
import { ContextIdentifier, SxcGlobalEnvironment } from '..';

/**
 * Global HTTP Service for information and helpers on `$2sxc.http`
 * @public
 */
export class SxcGlobalHttp extends HasLog {
    /** @internal */
    constructor(private env: SxcGlobalEnvironment) {
        super('Sxc.Http');
    }

    /**
     * All the headers which are needed in an ajax call.
     * @returns Dictionary / Record of headers
     */
    headers(): Record<string, string>;

    /**
     * All the headers which are needed in an ajax call - within a module context.
     * @param id _optional_ module ID
     * @returns Dictionary / Record of headers
     */
    headers(id: number): Record<string, string>;

    /**
     * All the headers which are needed in an ajax call - within a module and content-block context.
     * @param id _optional_ module ID
     * @param cbid _optional_ content block ID
     * @returns Dictionary / Record of headers
     */
    headers(id: number, cbid: number): Record<string, string>;

    /**
     * All the headers which are needed in an ajax call.
     * Uses a module and content-block context (but these could also be null) 
     * and a full context identifier for advanced operations.
     * @param id _optional_ module ID
     * @param cbid _optional_ content block ID
     * @param ctx _optional_ context information to include in the header
     * @returns Dictionary / Record of headers
     */
    headers(id: number, cbid: number, ctx: ContextIdentifier): Record<string, string>;

    /**
     * All the headers which are needed in an ajax call.
     * Uses a module and content-block context (but these could also be null) 
     * and a full context identifier for advanced operations.
     * @param id _optional_ module ID
     * @param cbid _optional_ content block ID
     * @param ctx _optional_ context information to include in the header
     * @returns Dictionary / Record of headers
     */
    headers(id?: number, cbid?: number, ctx?: ContextIdentifier): Record<string, string> {
        const cl = this.log.call('headers', `${id}, ${cbid}`);
        const fHeaders: Record<string, string> = {};
        const pageId = this.env.page().toString();
        if (!ctx?._ignoreHeaders) {
            if (id) fHeaders[HeaderNames.ModuleId] = id.toString();
            if (cbid) fHeaders[HeaderNames.ContentBlockId] = cbid.toString();
            fHeaders[HeaderNames.TabId] = pageId;
            fHeaders[HeaderNames.PageId] = pageId;
        }
        fHeaders[this.env.rvtHeader()] = this.env.rvt();
        return cl.return(fHeaders, `headers(id:${id}, cbid:${cbid})`);
    }

    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param endpointName 
     * @returns {string}
     * @memberof Http
     * @internal Not relevant for 2sxc, only used if calling platform endpoints
     */
    apiRoot(endpointName: string): string {
        const cl = this.log.call('apiRoot');
        var result = this.env.api().replace(ApiExtensionPlaceholder, endpointName);
        return cl.return(result, `apiRoot('${endpointName}')`);
    }

    /**
     * Get the API-Root path for Apps
     * new in v12
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     * @internal
     */
     appApiRoot(): string {
        const cl = this.log.call('appApiRoot');
        // try to get it, or fall back to the previous / old convention
        var result = this.env.appApi() ?? this.apiRoot(ToSxcName);
        return cl.return(result, `appApiRoot()`);
    }

    /**
     * Convert short urls like `app/auto/api/Posts/All` to the full URL needed.
     * Will ignore urls which clearly already are the full url.
     * @param url short URL like `app/auto/api/Posts/All`
     * @returns the converted, long url with the full endpoint
     */
    apiUrl(url: string): string;

    /**
     * Convert short urls like `app/auto/api/Posts/All` to the full URL needed.
     * Will ignore urls which clearly already are the full url.
     * @param url short URL like `app/auto/api/Posts/All`
     * @param endpointName _optional_ endpoint name if accessing a different exotic endpoint
     * @returns the converted, long url with the full endpoint
     */
    apiUrl(url: string, endpointName: string): string;

    /**
     * Convert short urls like `app/auto/api/Posts/All` to the full URL needed.
     * Will ignore urls which clearly already are the full url.
     * @param url short URL like `app/auto/api/Posts/All`
     * @param endpointName _optional_ endpoint name if accessing a different exotic endpoint
     * @returns the converted, long url with the full endpoint
     */
    apiUrl(url: string, endpointName?: string): string
    {
        const cl = this.log.call('apiUrl');
        this.log.add(`apiUrl(url:'${url}', endpointName:'${endpointName}')`);

        // null/undefined check
        if(url == null) return url;

        // if starts with http: or https: then ignore
        if(!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return cl.return(url);

        // if no endpoint specified, then also skip absolute and relative urls
        if(!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return cl.return(url);

        var baseUrl = url.toLocaleLowerCase().startsWith(AppApiMarker)
            ? this.appApiRoot()
            : this.apiRoot(endpointName || ToSxcName);


        // ensure base ends with slash
        if(baseUrl[baseUrl.length-1] != '/') baseUrl += '/';
        // ensure url doesn't start with slash
        if(url[0] == '/') url = url.slice(1);
        return cl.return(baseUrl + url);
    }
}
