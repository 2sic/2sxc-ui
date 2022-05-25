import { SxcWebApi } from '../..';
import { SxcInstanceInternal } from '../sxc-instance';
import { AjaxPromise } from './ajax-promise';
import { Environment } from '../../environment';
import { AjaxSettings } from './ajax-settings';
import { NoJQ } from '../../../../core';

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @internal
 */
export class SxcWebApiInternal implements SxcWebApi {
    public readonly env: Environment;
    constructor(private readonly sxc: SxcInstanceInternal) {
        this.env = sxc.root.env;
    }

    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'GET');
    }

    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'POST');
    }

    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'DELETE');
    }

    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any> {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'PUT');
    }

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

    fetchRaw(url: string, data?: string | Record<string, any>, method?: string): Promise<Response> {
        const ctxParams = {} as { appId?: number; zoneId?: number; };
        const ctx = this.sxc.ctx;
        const urlLower = url.toLocaleLowerCase();
        if (ctx?._ignoreHeaders && urlLower.includes('app/auto/')) {
            if (ctx?.appId && !urlLower.includes('appid=')) ctxParams.appId = ctx.appId;
            if (ctx?.zoneId && !urlLower.includes('zoneId=')) ctxParams.zoneId = ctx.zoneId;
        }
        url = this.url(url, ctxParams);
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

    // Note: fetch was documented in v12.10 (December 2021) but will probably never be used externally
    // So we rename it to fetchRaw and later will make fetch just be the json implementation.
    // Renamed and added this warning in 13.04 (2022-03-14), will drop in v14 and probably make it do fetchJson by default
    // Changed functionality in 13.10 (2022-05-04) to make it do fetchJson by default
    // Changed functionality back in 13.11 (2022-05-10) because it seems that Mobius was published using fetch
    // Important: Do not document in the docs, as it shouldn't be used
    fetch(url: string, data?: string | Record<string, any>, method?: string): Promise<Response> {
        console.warn(`You are calling 'fetch' on the sxc.webApi. This is deprecated will stop in 2sxc v15, please use fetchRaw(...) or fetchJson(...) instead.`)
        return this.fetchJson(url, data, method);
    }

    fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string): Promise<T> {
        return this.fetchRaw(url, data, method).then(response => response.json());
    }

    headers(method?: string): Record<string, string> {
        const headers = this.sxc.root.http.headers(this.sxc.id, this.sxc.cbid, this.sxc.ctx);
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
