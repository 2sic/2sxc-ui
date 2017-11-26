
declare const $: any;
import { SxcInstance } from "./ToSic.Sxc.Instance";

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
        return this.request(settingsOrUrl, params, data, preventAutoFail, "GET");
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
        return this.request(settingsOrUrl, params, data, preventAutoFail, "POST");
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
        return this.request(settingsOrUrl, params, data, preventAutoFail, "DELETE");
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
        return this.request(settingsOrUrl, params, data, preventAutoFail, "PUT");
    }

    private request(settings: string | any, params: any, data: any, preventAutoFail: boolean, method: string): any {

        // url parameter: autoconvert a single value (instead of object of values) to an id=... parameter
        // tslint:disable-next-line:curly
        if (typeof params !== "object" && typeof params !== "undefined")
            params = { id: params };

        // if the first parameter is a string, resolve settings
        if (typeof settings === "string") {
            const controllerAction = settings.split("/");
            const controllerName = controllerAction[0];
            const actionName = controllerAction[1];

            if (controllerName === "" || actionName === "")
                alert("Error: controller or action not defined. Will continue with likely errors.");

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
            method: method === null ? "POST" : method,
            params: null as any,
            preventAutoFail: false,
        };
        settings = $.extend({}, defaults, settings);
        const sf = $.ServicesFramework(this.id);
        const cbid = this.cbid; // must read here, as the "this" will change inside the method

        const promise = $.ajax({
            async: true,
            dataType: settings.dataType || "json", // default is json if not specified
            data: JSON.stringify(settings.data),
            contentType: "application/json",
            type: settings.method,
            url: this.getActionUrl(settings),
            beforeSend(xhr: any) {
                xhr.setRequestHeader("ContentBlockId", cbid);
                sf.setModuleHeaders(xhr);
            },
        });

        if (!settings.preventAutoFail)
            promise.fail(this.controller.showDetailedHttpError);

        return promise;
    }

    private getActionUrl(settings: any): string {
        const sf = $.ServicesFramework(this.id);
        const base = (settings.url)
            ? this.controller.resolveServiceUrl(settings.url)
            : sf.getServiceRoot("2sxc") + "app/auto/api/" + settings.controller + "/" + settings.action;
        return base + (settings.params === null ? "" : ("?" + $.param(settings.params)));
    }

}
