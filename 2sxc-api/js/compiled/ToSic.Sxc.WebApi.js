var SxcWebApiWithInternals = (function () {
    function SxcWebApiWithInternals(controller, id, cbid) {
        this.controller = controller;
        this.id = id;
        this.cbid = cbid;
    }
    SxcWebApiWithInternals.prototype.get = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, "GET");
    };
    SxcWebApiWithInternals.prototype.post = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, "POST");
    };
    SxcWebApiWithInternals.prototype.delete = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, "DELETE");
    };
    SxcWebApiWithInternals.prototype.put = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, "PUT");
    };
    SxcWebApiWithInternals.prototype.request = function (settings, params, data, preventAutoFail, method) {
        if (typeof params !== "object" && typeof params !== "undefined")
            params = { id: params };
        if (typeof settings === "string") {
            var controllerAction = settings.split("/");
            var controllerName = controllerAction[0];
            var actionName = controllerAction[1];
            if (controllerName === "" || actionName === "")
                alert("Error: controller or action not defined. Will continue with likely errors.");
            settings = {
                controller: controllerName,
                action: actionName,
                params: params,
                data: data,
                url: controllerAction.length > 2 ? settings : null,
                preventAutoFail: preventAutoFail,
            };
        }
        var defaults = {
            method: method === null ? "POST" : method,
            params: null,
            preventAutoFail: false,
        };
        settings = $.extend({}, defaults, settings);
        var sf = $.ServicesFramework(this.id);
        var cbid = this.cbid;
        var promise = $.ajax({
            async: true,
            dataType: settings.dataType || "json",
            data: JSON.stringify(settings.data),
            contentType: "application/json",
            type: settings.method,
            url: this.getActionUrl(settings),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ContentBlockId", cbid);
                sf.setModuleHeaders(xhr);
            },
        });
        if (!settings.preventAutoFail)
            promise.fail(this.controller.showDetailedHttpError);
        return promise;
    };
    SxcWebApiWithInternals.prototype.getActionUrl = function (settings) {
        var sf = $.ServicesFramework(this.id);
        var base = (settings.url)
            ? this.controller.resolveServiceUrl(settings.url)
            : sf.getServiceRoot("2sxc") + "app/auto/api/" + settings.controller + "/" + settings.action;
        return base + (settings.params === null ? "" : ("?" + $.param(settings.params)));
    };
    return SxcWebApiWithInternals;
}());
export { SxcWebApiWithInternals };
//# sourceMappingURL=ToSic.Sxc.WebApi.js.map