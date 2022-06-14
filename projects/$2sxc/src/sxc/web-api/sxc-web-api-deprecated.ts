import { AjaxSettings } from './ajax-settings';

/**
 * **Deprecated**
 * Old APIs on sxc.webApi. 
 * They only exist if jQuery is included on the page, and we highly discourage their use. 
 * @deprecated
 */
export interface SxcWebApiDeprecated {

    /**
     * **Deprecated** 
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson) 
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     * 
     * Returns an http-get promise using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * **Deprecated** 
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson) 
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     * 
     * Returns an http-post promise using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * **Deprecated** 
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson) 
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     * 
     * Returns an http-delete promise using jQuery
     * @param settingsOrUrl the url to talk to
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * **Deprecated** 
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson) 
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     * 
     * Returns an http-put promise using jQuery
     * @param settingsOrUrl the url to put
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;

    /**
     * **Deprecated** 
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson) 
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     * 
     * Generic http request using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): JQueryPromise<any>;

}
