import { Dictionary } from './Dictionary_T';

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
     * @returns {Promise} jQuery ajax promise object
     */
    get(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * returns an http-post promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    post(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * returns an http-delete promise
     * @param settingsOrUrl the url to talk to
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    delete(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * returns an http-put promise
     * @param settingsOrUrl the url to put
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    put(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * Generic http request
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns {Promise} jQuery ajax promise object
     */
    request(settings: string | any, params: any, data: any, preventAutoFail: boolean, method: string): JQueryPromise<any>;

    fetch(url: string, data?: string | Record<string, any>, method?: string): Promise<Response>;

    fetchJson(url: string, data?: string | Record<string, any>, method?: string): Promise<any>;

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(method?: string): Dictionary<string>;

}

