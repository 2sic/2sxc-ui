import { Dictionary } from '../../../core';

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
export interface SxcWebApi {
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     */
    get(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;

    /**
     * returns an http-post promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     */
    post(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;

    /**
     * returns an http-delete promise
     * @param settingsOrUrl the url to talk to
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     */
    delete(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;

    /**
     * returns an http-put promise
     * @param settingsOrUrl the url to put
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     */
    put(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;

    /**
     * Generic http request
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns jQuery ajax promise object
     */
    request(settings: string | any, params: any, data: any, preventAutoFail: boolean, method: string): any;

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

    /**
     * Will retrieve data from the backend using a standard fetch and give you an object. 
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url. 
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing any object.
     */
    fetchJson(url: string, data?: string | Record<string, any>, method?: string): Promise<any>;

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(method?: string): Dictionary<string>;

}

