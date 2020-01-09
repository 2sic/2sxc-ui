
import { SxcInstance } from './ToSic.Sxc.Instance';
import { HttpAbstractor } from './HttpAbstractor';
import { Environment } from './Environment';

declare const $2sxc_jQSuperlight: JQuery;

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
export class SxcWebApiWithInternals {
    constructor(
        private readonly controller: SxcInstance,
        private readonly id: number,
        private readonly cbid: number,
        public readonly env: Environment
    ) {

    }
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    get(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any {
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
    post(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any {
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
    delete(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any {
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
    put(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'PUT');
    }

    private request(settings: string | any, params: any, data: any, preventAutoFail: boolean, method: string): any {

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
                alert('Error: controller or action not defined. Will continue with likely errors.');

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
        var http = new HttpAbstractor(this.controller);

        settings = $2sxc_jQSuperlight.extend({}, defaults, settings);

        const promise = http.makePromise(settings);

        return promise;
    }

}
