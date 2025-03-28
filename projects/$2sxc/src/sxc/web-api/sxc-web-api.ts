﻿import { Sxc } from '../sxc';
import { AjaxPromise } from './ajax-promise';
import { ZzzAjaxSettingsDeprecated } from './ajax-settings';
import { NoJQ } from '../../../../core';
import { ZzzSxcWebApiDeprecated } from './sxc-web-api-deprecated';
import { FetchOptions } from './fetch-options';
import { SecureEndpoint } from './secure-endpoint';

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export class SxcWebApi implements ZzzSxcWebApiDeprecated {
  // 2023-05-22 believe this is never used, so removing  
  // /**
  //  * @internal
  //  * TODO: PROBABLY remove ? but must be sure it's not used elsewhere
  //  */
  // private readonly env: SxcGlobalEnvironment;

  /**
   * 
   * @param sxc 
   * @internal
   */
  constructor(private readonly sxc: Sxc) {
    // 2023-05-22 believe this is never used, so removing
    // this.env = sxc.root.env;
  }

  /**
   * **Deprecated** - docs in the separate interface
   * @deprecated use fetchJson instead
   */
  get(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any {
    return this.request(settingsOrUrl, params, data, preventAutoFail, 'GET');
  }

  /**
   * **Deprecated** - docs in the separate interface
   * @deprecated use fetchJson instead
   */
  post(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any {
    return this.request(settingsOrUrl, params, data, preventAutoFail, 'POST');
  }

  /**
   * **Deprecated** - docs in the separate interface
   * @deprecated use fetchJson instead
   */
  delete(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any {
    return this.request(settingsOrUrl, params, data, preventAutoFail, 'DELETE');
  }

  /**
   * **Deprecated** - docs in the separate interface
   * @deprecated use fetchJson instead
   */
  put(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any {
    return this.request(settingsOrUrl, params, data, preventAutoFail, 'PUT');
  }

  /**
   * **Deprecated** - docs in the separate interface
   * @deprecated use fetchJson instead
   */
  request(settings: string | ZzzAjaxSettingsDeprecated, params: any, data: any, preventAutoFail: boolean, method: string): any {

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
      } as any;
    }

    const defaults = {
      method: method === null ? 'POST' : method,
      params: null as any,
      preventAutoFail: false,
    };
    // new 10.25
    var http = new AjaxPromise(this, this.sxc);

    settings = Object.assign({}, defaults, settings);

    const promise = http.makePromise(settings as ZzzAjaxSettingsDeprecated);

    return promise;
  }

  /**
   * Will retrieve data from the backend using a standard fetch. 
   * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url. 
   * @param data optional POST data
   * @param method optional method or fetch options, defaults to `GET` unless it has data, in which case it defaults to `POST`
   * @returns a Promise containing a Response object, just like a normal fetch would. 
   * example: webApi.fetchRaw('Rss/Feed');
   * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 })); // url params
   * example: webApi.fetchRaw('Rss/Feed', { id: 47 }); // post params
   * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 }), { something: 'this is a test' }); // url & post params
   * maybe: webApi.fetchRaw({url: 'Rss/Feed', params: { id: 47 }})
   * maybe: webApi.fetchRaw({url: ..., params: { ...}, body: { ...}, method: 'GET' })
   */
  async fetchRaw(url: string, data?: string | Record<string, unknown>, method?: string | FetchOptions): Promise<Response> {
    const ctxParams = {} as { appId?: number; zoneId?: number; };
    const ctx = this.sxc.ctx;

    // Auto-Add appid / zoneid if needed
    // Note: #_autoAppIdsInUrl is only used in edit-ui formulas
    const urlLower = url.toLocaleLowerCase();
    if (ctx?._autoAppIdsInUrl && urlLower.includes('app/auto/')) {
      if (ctx.appId && !urlLower.includes('appid=')) ctxParams.appId = ctx.appId;
      if (ctx.zoneId && !urlLower.includes('zoneid=')) ctxParams.zoneId = ctx.zoneId;
    }
    url = this.url(url, ctxParams);

    // Handle method and options
    const fetchOptions = this.prepareOptions(method, data);

    const headers = this.headers(fetchOptions.method);

    // Handle encryption if needed
    if (fetchOptions.method == 'POST')
      data = await new SecureEndpoint(this.sxc, fetchOptions).encryptData(data);

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
      method: fetchOptions.method,
      ...(data && { body: data as string }),
    });
  }

  // prepare options
  private prepareOptions(methodOrOptions: string | FetchOptions, data: string | Record<string, any>): FetchOptions {
    const defaults: FetchOptions = {
      method: (data ? 'POST' : 'GET'),
      encrypt: 'auto',
      encryptBody: 'auto', 
    };
    if (typeof methodOrOptions === 'string')
      return { ...defaults, method: methodOrOptions };
    
    if (typeof methodOrOptions === 'object')
      return {
        ...methodOrOptions,
        method: methodOrOptions.method || defaults.method,
        encrypt: methodOrOptions.encrypt ?? defaults.encrypt,
        encryptBody: methodOrOptions.encryptBody ?? methodOrOptions.encrypt ?? defaults.encryptBody,
      };
    return defaults;
  }

  // Note: fetch was documented in v12.10 (December 2021) but will probably never be used externally
  // So we rename it to fetchRaw and later will make fetch just be the json implementation.
  // Renamed and added this warning in 13.04 (2022-03-14), will drop in v14 and probably make it do fetchJson by default
  // Changed functionality in 13.10 (2022-05-04) to make it do fetchJson by default
  // Changed functionality back in 13.11 (2022-05-10) because it seems that Mobius was published using fetch
  // Important: Do not document in the docs, as it shouldn't be used
  /** @internal */
  async fetch(url: string, data?: string | Record<string, any>, method?: string | FetchOptions): Promise<Response> {
    console.warn(`You are calling 'fetch' on the sxc.webApi. This is deprecated will stop in 2sxc v15, please use fetchRaw(...) or fetchJson(...) instead.`)
    return this.fetchJson(url, data, method);
  }

  /**
   * Will retrieve data from the backend using a standard fetch and give you an object. 
   * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url. 
   * @param data optional POST data
   * @param method optional method or fetch options,, defaults to `GET` unless it has data, in which case it defaults to `POST`
   * @returns a Promise containing any object.
   */
  async fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string | FetchOptions): Promise<T> {
    return this.fetchRaw(url, data, method).then(response => response.json());
  }

  /**
   * All the headers which are needed in an ajax call for this to work reliably.
   * Use this if you need to get a list of headers in another system
   */
  headers(method?: string): Record<string, string> {
    const headers = this.sxc.http.headers(this.sxc.id, this.sxc.cbid, this.sxc.ctx);
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
    url = this.sxc.http.apiUrl(url);

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
