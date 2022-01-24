import * as Public from '../../../../sxc-typings/index';
import { SxcInstance } from '../sxc-instance';
import { AjaxPromise } from './ajax-promise';
import { Environment } from '../../environment';
import { AjaxSettings } from './ajax-settings';
import { NoJQ } from '../..';

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
export class SxcWebApi implements Public.SxcWebApi {
    public readonly env: Environment;
    constructor(private readonly sxc: SxcInstance) {
        this.env = sxc.root.env;
    }
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'GET');
    }

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'POST');
    }

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'DELETE');
    }

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'PUT');
    }

    /**
     * Generic http request
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns {Promise} jQuery ajax promise object
     */
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): JQueryPromise<any> {

        // url parameter: auto convert a single value (instead of object of values) to an id=... parameter
        // tslint:disable-next-line:curly
        if (typeof params !== 'object' && typeof params !== 'undefined')
            params = { id: params };

        // if the first parameter is a string, resolve settings
        if (typeof settings === 'string') {
            const controllerAction = settings.split('/');
            const controllerName = controllerAction[0];
            const actionName = controllerAction[1];

            if (controllerName === '' || actionName === '')
                console.warn('Error: controller or action not defined. Will continue with likely errors.');

            settings = {
                controller: controllerName,
                action: actionName,
                params,
                data,
                url: controllerAction.length > 2 ? settings : null,
                preventAutoFail,
            };
        }

        const defaults = {
            method: method === null ? 'POST' : method,
            params: null as any,
            preventAutoFail: false,
        };
        // new 10.25
        var http = new AjaxPromise(this, this.sxc);

        settings = Object.assign({}, defaults, settings);

        const promise = http.makePromise(settings as AjaxSettings);

        return promise;
    }

    /**
     * Will retrieve data from the backend using a standard fetch.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing a Response object, just like a normal fetch would.
     * example: webApi.fetch('Rss/Feed');
     * example: webApi.fetch(webApi.url('Rss/Feed', { id: 47 })); // url params
     * example: webApi.fetch('Rss/Feed', { id: 47 }); // post params
     * example: webApi.fetch(webApi.url('Rss/Feed', { id: 47 }), { something: 'this is a test' }); // url & post params
     * maybe: webApi.fetch({url: 'Rss/Feed', params: { id: 47 }})
     * maybe: webApi.fetch({url: ..., params: { ...}, body: { ...}, method: 'GET' })
     */
    fetch(url: string, data?: string | Record<string, any>, method?: string): Promise<Response> {
        url = this.url(url);
        method = method || (data ? 'POST' : 'GET');
        const headers = this.headers(method);

        if (data) {
            // test if data is a json. If it's not, convert it to json
            try {
                JSON.parse(data as string);
            } catch {
                data = JSON.stringify(data);
            }
        }

        return fetch(url, {
            headers,
            method,
            ...(data && { body: data as string }),
        });
    }

    /**
     * Will retrieve data from the backend using a standard fetch and give you an object.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing any object.
     */
    fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string): Promise<T> {
        return this.fetch(url, data, method).then(response => response.json());
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     * @param method Optional. If set, will add Accept or Content-Type headers
     * @returns a Record / Dictionary of headers
     */
    headers(method?: string): Record<string, string> {
        const headers = this.sxc.root.http.headers(this.sxc.id, this.sxc.cbid, this.sxc.blockIds);
        if (!method) {
            return headers;
        }

        switch (method.toLocaleUpperCase()) {
            case 'GET':
                headers['Accept'] = 'application/json';
                break;
            default:
                headers['Accept'] = 'application/json';
                headers['Content-Type'] = 'application/json';
        }
        return headers;
    }

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
    url(url: string, params?: string | Record<string, any>): string {
        if (url == null) return url;

        const urlAndParams = url.split('#')[0].split('?');

        // url fixes
        url = urlAndParams[0];
        const urlParts = url.split('/');
        if (urlParts.length === 2 && urlParts[0] && urlParts[1]) {
            const controller = urlParts[0];
            const action = urlParts[1];
            url = `app/auto/api/${controller}/${action}`;
        }
        url = this.sxc.root.http.apiUrl(url);

        // params fixes
        params = `${urlAndParams[1] || ''}&${params ? typeof params === 'string' ? params : NoJQ.param(params) : ''}`
            .split('&')
            .filter(p => !!p)
            .join('&');

        // result
        url = [url, params].filter(p => !!p).join('?');
        return url;
    }
}
