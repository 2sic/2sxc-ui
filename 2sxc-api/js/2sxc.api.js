var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    if (window.$2sxc)
        return;
    var $2sxc = window.$2sxc = getInstance;
    function getInstance(id, cbid) {
        if (typeof id === "object")
            return autoFind(id);
        if (!cbid)
            cbid = id;
        var cacheKey = id + ":" + cbid;
        if ($2sxc._controllers[cacheKey])
            return $2sxc._controllers[cacheKey];
        if (!$2sxc._data[cacheKey])
            $2sxc._data[cacheKey] = {};
        return $2sxc._controllers[cacheKey] = new ToSic.Sxc.SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, $.ServicesFramework);
    }
    ;
    $2sxc._controllers = {};
    $2sxc.sysinfo = {
        version: "09.05.00",
        description: "The 2sxc Controller object - read more about it on 2sxc.org"
    };
    $2sxc.beta = {};
    $2sxc._data = {};
    $2sxc.totalPopup = {
        open: function (url, callback) {
            var z = 10000010, p = window;
            while (p !== window.top && z < 10000100) {
                z++;
                p = p.parent;
            }
            var wrapper = document.createElement("div");
            wrapper.setAttribute("style", " top: 0;left: 0;width: 100%;height: 100%; position:fixed; z-index:" + z);
            document.body.appendChild(wrapper);
            var ifrm = document.createElement("iframe");
            ifrm.setAttribute("allowtransparency", "true");
            ifrm.setAttribute("style", "top: 0;left: 0;width: 100%;height: 100%;");
            ifrm.setAttribute("src", url);
            wrapper.appendChild(ifrm);
            document.body.className += " sxc-popup-open";
            $2sxc.totalPopup.frame = ifrm;
            $2sxc.totalPopup.callback = callback;
        },
        close: function () {
            if ($2sxc.totalPopup.frame) {
                document.body.className = document.body.className.replace("sxc-popup-open", "");
                var frm = $2sxc.totalPopup.frame;
                frm.parentNode.parentNode.removeChild(frm.parentNode);
                $2sxc.totalPopup.callback();
            }
        },
        closeThis: function () {
            window.parent.$2sxc.totalPopup.close();
        },
        frame: undefined,
        callback: undefined
    };
    $2sxc.urlParams = {
        get: function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var searchRx = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
            var results = searchRx.exec(location.search), strResult;
            if (results === null) {
                var hashRx = new RegExp("[#&]" + name + "=([^&#]*)", "i");
                results = hashRx.exec(location.hash);
            }
            if (results === null) {
                var matches = window.location.pathname.match(new RegExp("/" + name + "/([^/]+)", "i"));
                if (matches && matches.length > 1)
                    strResult = matches.reverse()[0];
            }
            else
                strResult = results[1];
            return strResult === null || strResult === undefined ? "" : decodeURIComponent(strResult.replace(/\+/g, " "));
        },
        require: function (name) {
            var found = $2sxc.urlParams.get(name);
            if (found === "") {
                var message = "Required parameter (" + name + ") missing from url - cannot continue";
                alert(message);
                throw message;
            }
            return found;
        }
    };
    function autoFind(domElement) {
        var containerTag = $(domElement).closest(".sc-content-block")[0];
        if (!containerTag)
            return null;
        var iid = containerTag.getAttribute("data-cb-instance"), cbid = containerTag.getAttribute("data-cb-id");
        if (!iid || !cbid)
            return null;
        return $2sxc(iid, cbid);
    }
    ;
    $2sxc.debug = {
        load: ($2sxc.urlParams.get("debug") === "true"),
        uncache: $2sxc.urlParams.get("sxcver")
    };
    $2sxc.parts = {
        getUrl: function (url, preventUnmin) {
            var r = (preventUnmin || !$2sxc.debug.load) ? url : url.replace(".min", "");
            if ($2sxc.debug.uncache && r.indexOf("sxcver") === -1)
                r = r + ((r.indexOf("?") === -1) ? "?" : "&") + "sxcver=" + $2sxc.debug.uncache;
            return r;
        }
    };
})();
var ToSic;
(function (ToSic) {
    var Sxc;
    (function (Sxc) {
        var SxcInstance = (function () {
            function SxcInstance(id, cbid, dnnSf) {
                this.id = id;
                this.cbid = cbid;
                this.dnnSf = dnnSf;
                this.serviceScopes = ["app", "app-sys", "app-api", "app-query", "app-content", "eav", "view", "dnn"];
                this.serviceRoot = dnnSf(id).getServiceRoot("2sxc");
                this.webApi = new ToSic.Sxc.SxcWebApiWithInternals(this, id, cbid);
            }
            SxcInstance.prototype.resolveServiceUrl = function (virtualPath) {
                var scope = virtualPath.split("/")[0].toLowerCase();
                if (this.serviceScopes.indexOf(scope) === -1)
                    return virtualPath;
                return this.serviceRoot + scope + "/" + virtualPath.substring(virtualPath.indexOf("/") + 1);
            };
            SxcInstance.prototype.showDetailedHttpError = function (result) {
                if (window.console)
                    console.log(result);
                if (result.status === 404 &&
                    result.config &&
                    result.config.url &&
                    result.config.url.indexOf("/dist/i18n/") > -1) {
                    if (window.console)
                        console.log("just fyi: failed to load language resource; will have to use default");
                    return result;
                }
                if (result.status === 0 || result.status === -1)
                    return result;
                var infoText = "Had an error talking to the server (status " + result.status + ").";
                var srvResp = result.responseText
                    ? JSON.parse(result.responseText)
                    : result.data;
                if (srvResp) {
                    var msg = srvResp.Message;
                    if (msg)
                        infoText += "\nMessage: " + msg;
                    var msgDet = srvResp.MessageDetail || srvResp.ExceptionMessage;
                    if (msgDet)
                        infoText += "\nDetail: " + msgDet;
                    if (msgDet && msgDet.indexOf("No action was found") === 0)
                        if (msgDet.indexOf("that matches the name") > 0)
                            infoText += "\n\nTip from 2sxc: you probably got the action-name wrong in your JS.";
                        else if (msgDet.indexOf("that matches the request.") > 0)
                            infoText += "\n\nTip from 2sxc: Seems like the parameters are the wrong amount or type.";
                    if (msg && msg.indexOf("Controller") === 0 && msg.indexOf("not found") > 0)
                        infoText +=
                            "\n\nTip from 2sxc: you probably spelled the controller name wrong or forgot to remove the word 'controller' from the call in JS. To call a controller called 'DemoController' only use 'Demo'.";
                }
                infoText += "\n\nif you are an advanced user you can learn more about what went wrong - discover how on 2sxc.org/help?tag=debug";
                alert(infoText);
                return result;
            };
            return SxcInstance;
        }());
        Sxc.SxcInstance = SxcInstance;
        var SxcInstanceWithEditing = (function (_super) {
            __extends(SxcInstanceWithEditing, _super);
            function SxcInstanceWithEditing(id, cbid, $2sxc, dnnSf) {
                var _this = _super.call(this, id, cbid, dnnSf) || this;
                _this.id = id;
                _this.cbid = cbid;
                _this.$2sxc = $2sxc;
                _this.dnnSf = dnnSf;
                _this.manage = null;
                try {
                    if ($2sxc._manage)
                        $2sxc._manage.initInstance(_this);
                }
                catch (e) {
                    throw e;
                }
                if ($2sxc._translateInit && _this.manage)
                    $2sxc._translateInit(_this.manage);
                return _this;
            }
            SxcInstanceWithEditing.prototype.isEditMode = function () {
                return this.manage && this.manage._isEditMode();
            };
            return SxcInstanceWithEditing;
        }(SxcInstance));
        Sxc.SxcInstanceWithEditing = SxcInstanceWithEditing;
        var SxcInstanceWithInternals = (function (_super) {
            __extends(SxcInstanceWithInternals, _super);
            function SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, dnnSf) {
                var _this = _super.call(this, id, cbid, $2sxc, dnnSf) || this;
                _this.id = id;
                _this.cbid = cbid;
                _this.cacheKey = cacheKey;
                _this.$2sxc = $2sxc;
                _this.dnnSf = dnnSf;
                _this.source = null;
                _this.isLoaded = false;
                _this.lastRefresh = null;
                _this.data = new SxcDataWithInternals(_this);
                return _this;
            }
            SxcInstanceWithInternals.prototype.recreate = function (resetCache) {
                if (resetCache)
                    delete this.$2sxc._controllers[this.cacheKey];
                return this.$2sxc(this.id, this.cbid);
            };
            return SxcInstanceWithInternals;
        }(SxcInstanceWithEditing));
        Sxc.SxcInstanceWithInternals = SxcInstanceWithInternals;
        var SxcDataWithInternals = (function () {
            function SxcDataWithInternals(controller) {
                this.controller = controller;
                this.source = undefined;
                this["in"] = {};
                this.List = [];
            }
            SxcDataWithInternals.prototype.sourceUrl = function (params) {
                var url = this.controller.resolveServiceUrl("app-sys/appcontent/GetContentBlockData");
                if (typeof params == "string")
                    url += "&" + params;
                return url;
            };
            SxcDataWithInternals.prototype.load = function (source) {
                var _this = this;
                if (source && source.List) {
                    return this.controller.data;
                }
                else {
                    if (!source)
                        source = {};
                    if (!source.url)
                        source.url = this.controller.data.sourceUrl();
                    source.origSuccess = source.success;
                    source.success = function (data) {
                        for (var dataSetName in data) {
                            if (data.hasOwnProperty(dataSetName))
                                if (data[dataSetName].List !== null) {
                                    _this.controller.data["in"][dataSetName] = data[dataSetName];
                                    _this.controller.data["in"][dataSetName].name = dataSetName;
                                }
                        }
                        if (_this.controller.data["in"].Default)
                            _this.List = _this["in"].Default.List;
                        if (source.origSuccess)
                            source.origSuccess(_this);
                        _this.controller.isLoaded = true;
                        _this.controller.lastRefresh = new Date();
                        _this._triggerLoaded();
                    };
                    source.error = function (request) { alert(request.statusText); };
                    source.preventAutoFail = true;
                    this.source = source;
                    return this.reload();
                }
            };
            SxcDataWithInternals.prototype.reload = function () {
                this.controller.webApi.get(this.source)
                    .then(this.source.success, this.source.error);
                return this;
            };
            SxcDataWithInternals.prototype.on = function (events, callback) {
                return $(this).bind("2scLoad", callback)[0]._triggerLoaded();
            };
            SxcDataWithInternals.prototype._triggerLoaded = function () {
                return this.controller.isLoaded
                    ? $(this).trigger("2scLoad", [this])[0]
                    : this;
            };
            SxcDataWithInternals.prototype.one = function (events, callback) {
                if (!this.controller.isLoaded)
                    return $(this).one("2scLoad", callback)[0];
                callback({}, this);
                return this;
            };
            return SxcDataWithInternals;
        }());
        Sxc.SxcDataWithInternals = SxcDataWithInternals;
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));
var ToSic;
(function (ToSic) {
    var Sxc;
    (function (Sxc) {
        var SxcWebApiWithInternals = (function () {
            function SxcWebApiWithInternals(controller, id, cbid) {
                this.controller = controller;
                this.id = id;
                this.cbid = cbid;
            }
            SxcWebApiWithInternals.prototype.get = function (settingsOrUrl, params, data, preventAutoFail) {
                this.request(settingsOrUrl, params, data, preventAutoFail, "GET");
            };
            ;
            SxcWebApiWithInternals.prototype.post = function (settingsOrUrl, params, data, preventAutoFail) {
                this.request(settingsOrUrl, params, data, preventAutoFail, "POST");
            };
            ;
            SxcWebApiWithInternals.prototype.delete = function (settingsOrUrl, params, data, preventAutoFail) {
                this.request(settingsOrUrl, params, data, preventAutoFail, "DELETE");
            };
            ;
            SxcWebApiWithInternals.prototype.put = function (settingsOrUrl, params, data, preventAutoFail) {
                this.request(settingsOrUrl, params, data, preventAutoFail, "PUT");
            };
            ;
            SxcWebApiWithInternals.prototype.request = function (settings, params, data, preventAutoFail, method) {
                if (typeof params != "object" && typeof params != "undefined")
                    params = { id: params };
                if (typeof settings == "string") {
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
                        preventAutoFail: preventAutoFail
                    };
                }
                var defaults = {
                    method: method === null ? "POST" : method,
                    params: null,
                    preventAutoFail: false
                };
                settings = $.extend({}, defaults, settings);
                var sf = $.ServicesFramework(this.id);
                var promise = $.ajax({
                    type: settings.method,
                    dataType: settings.dataType || "json",
                    async: true,
                    data: JSON.stringify(settings.data),
                    contentType: "application/json",
                    url: this.getActionUrl(settings),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("ContentBlockId", this.cbid);
                        sf.setModuleHeaders(xhr);
                    }
                });
                if (!settings.preventAutoFail)
                    promise.fail(this.controller.showDetailedHttpError);
                return promise;
            };
            ;
            SxcWebApiWithInternals.prototype.getActionUrl = function (settings) {
                var sf = $.ServicesFramework(this.id);
                var base = (settings.url)
                    ? this.controller.resolveServiceUrl(settings.url)
                    : sf.getServiceRoot("2sxc") + "app/auto/api/" + settings.controller + "/" + settings.action;
                return base + (settings.params === null ? "" : ("?" + $.param(settings.params)));
            };
            return SxcWebApiWithInternals;
        }());
        Sxc.SxcWebApiWithInternals = SxcWebApiWithInternals;
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));
//# sourceMappingURL=2sxc.api.js.map