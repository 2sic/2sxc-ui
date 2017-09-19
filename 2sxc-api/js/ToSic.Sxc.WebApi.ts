
module ToSic.Sxc {
    declare const $: any;

    /**
    * helper API to run ajax / REST calls to the server
    * it will ensure that the headers etc. are set correctly
    * and that urls are rewritten
    */
    export class SxcWebApiWithInternals {
        constructor(
            private readonly controller: SxcInstance,
            private readonly id: number,
            private readonly cbid: number
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
        get(settingsOrUrl, params?, data?, preventAutoFail?: boolean): any {
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
        post(settingsOrUrl, params?, data?, preventAutoFail?: boolean): any {
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
        delete(settingsOrUrl, params?, data?, preventAutoFail?: boolean): any {
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
        put(settingsOrUrl, params?, data?, preventAutoFail?: boolean): any {
            return this.request(settingsOrUrl, params, data, preventAutoFail, "PUT");
        }

        private request(settings: string | any, params, data, preventAutoFail, method): any {

            // Url parameter: autoconvert a single value (instead of object of values) to an id=... parameter
            if (typeof params != "object" && typeof params != "undefined")
                params = { id: params };

            // If the first parameter is a string, resolve settings
            if (typeof settings == "string") {
                const controllerAction = settings.split("/");
                const controllerName = controllerAction[0];
                const actionName = controllerAction[1];

                if (controllerName === "" || actionName === "")
                    alert("Error: controller or action not defined. Will continue with likely errors.");

                settings = {
                    controller: controllerName,
                    action: actionName,
                    params: params,
                    data: data,
                    url: controllerAction.length > 2 ? settings : null,
                    preventAutoFail: preventAutoFail
                };
            }

            const defaults = {
                method: method === null ? "POST" : method,
                params: null,
                preventAutoFail: false
            };
            settings = $.extend({}, defaults, settings);
            var sf = $.ServicesFramework(this.id);

            const promise = $.ajax({
                type: settings.method,
                dataType: settings.dataType || "json", // default is json if not specified
                async: true,
                data: JSON.stringify(settings.data),
                contentType: "application/json",
                url: this.getActionUrl(settings),
                beforeSend(xhr) {
                    xhr.setRequestHeader("ContentBlockId", this.cbid);
                    sf.setModuleHeaders(xhr);
                }
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

}