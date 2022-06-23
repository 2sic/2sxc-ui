import { Sxc } from '../sxc';
import { SxcGlobalEnvironment } from '../../environment';
import { AjaxSettings } from './ajax-settings';
import { SxcWebApiDeprecated } from './sxc-web-api-deprecated';
/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export declare class SxcWebApi implements SxcWebApiDeprecated {
    private readonly sxc;
    /**
     * @type {SxcGlobalEnvironment}
     * @memberof SxcWebApi
     * @internal
     */
    readonly env: SxcGlobalEnvironment;
    /**
     *
     * @param sxc
     * @internal
     */
    constructor(sxc: Sxc);
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): any;
    /**
     * Will retrieve data from the backend using a standard fetch.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing a Response object, just like a normal fetch would.
     * example: webApi.fetchRaw('Rss/Feed');
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 })); // url params
     * example: webApi.fetchRaw('Rss/Feed', { id: 47 }); // post params
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 }), { something: 'this is a test' }); // url & post params
     * maybe: webApi.fetchRaw({url: 'Rss/Feed', params: { id: 47 }})
     * maybe: webApi.fetchRaw({url: ..., params: { ...}, body: { ...}, method: 'GET' })
     */
    fetchRaw(url: string, data?: string | Record<string, any>, method?: string): Promise<Response>;
    /** @internal */
    fetch(url: string, data?: string | Record<string, any>, method?: string): Promise<Response>;
    /**
     * Will retrieve data from the backend using a standard fetch and give you an object.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing any object.
     */
    fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string): Promise<T>;
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(method?: string): Record<string, string>;
    /**
     *
     * @param url A short, medium or long url.
     * Short like `controller/method`,
     * medium like `app/auto/api/controller/method`
     * long like `https://xyz.
     * In all cases it can also have ?params etc.
     * @param params Optional parameters as string or object, will be added to url-params.
     * @returns In the cases of a short/medium url,
     * it will auto-expand to have the full url as needed for an API call.
     */
    url(url: string, params?: string | Record<string, any>): string;
}
