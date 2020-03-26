import * as Public from '../../../../sxc-typings/index';
import { SxcInstance } from '../sxc-instance';
import { AjaxPromise } from './ajax-promise';
import { Environment } from '../../environment';
import { AjaxSettings } from './ajax-settings';

declare const $2sxc_jQSuperlight: JQuery;

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
export class SxcWebApi implements Public.SxcWebApi {
    public readonly env: Environment;
    constructor(
        private readonly sxc: SxcInstance,
        // private readonly id: number,
        // private readonly cbid: number,
        // public readonly env: Environment
    ) {
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

        settings = $2sxc_jQSuperlight.extend({}, defaults, settings);

        const promise = http.makePromise(settings as AjaxSettings);

        return promise;
    }

    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(): Public.Dictionary<string> {
        return this.sxc.root.http.headers(this.sxc.id, this.sxc.cbid);
    }
}
