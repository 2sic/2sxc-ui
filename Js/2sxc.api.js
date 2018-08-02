/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Controller__ = __webpack_require__(1);

if (!window.$2sxc)
    window.$2sxc = Object(__WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Controller__["a" /* buildSxcController */])();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = buildSxcController;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Instance__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_TotalPopup__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToSic_Sxc_Url__ = __webpack_require__(6);



function SxcController(id, cbid) {
    var $2sxc = window.$2sxc;
    if (!$2sxc._controllers)
        throw new Error("$2sxc not initialized yet");
    if (typeof id === "object") {
        var idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }
    if (!cbid)
        cbid = id;
    var cacheKey = id + ":" + cbid;
    if ($2sxc._controllers[cacheKey])
        return $2sxc._controllers[cacheKey];
    if (!$2sxc._data[cacheKey])
        $2sxc._data[cacheKey] = {};
    return ($2sxc._controllers[cacheKey]
        = new __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Instance__["a" /* SxcInstanceWithInternals */](id, cbid, cacheKey, $2sxc, $.ServicesFramework));
}
function buildSxcController() {
    var urlManager = new __WEBPACK_IMPORTED_MODULE_2__ToSic_Sxc_Url__["a" /* UrlParamManager */]();
    var debug = {
        load: (urlManager.get("debug") === "true"),
        uncache: urlManager.get("sxcver"),
    };
    var addOn = {
        _controllers: {},
        sysinfo: {
            version: "09.05.02",
            description: "The 2sxc Controller object - read more about it on 2sxc.org",
        },
        beta: {},
        _data: {},
        totalPopup: new __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_TotalPopup__["a" /* TotalPopup */](),
        urlParams: urlManager,
        debug: debug,
        parts: {
            getUrl: function (url, preventUnmin) {
                var r = (preventUnmin || !debug.load) ? url : url.replace(".min", "");
                if (debug.uncache && r.indexOf("sxcver") === -1)
                    r = r + ((r.indexOf("?") === -1) ? "?" : "&") + "sxcver=" + debug.uncache;
                return r;
            },
        },
    };
    for (var property in addOn)
        if (addOn.hasOwnProperty(property))
            SxcController[property] = addOn[property];
    return SxcController;
}
function autoFind(domElement) {
    var containerTag = $(domElement).closest(".sc-content-block")[0];
    if (!containerTag)
        return null;
    var iid = containerTag.getAttribute("data-cb-instance");
    var cbid = containerTag.getAttribute("data-cb-id");
    if (!iid || !cbid)
        return null;
    return [iid, cbid];
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SxcInstance */
/* unused harmony export SxcInstanceWithEditing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstanceWithInternals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Data__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_WebApi__ = __webpack_require__(4);
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


var SxcInstance = (function () {
    function SxcInstance(id, cbid, dnnSf) {
        this.id = id;
        this.cbid = cbid;
        this.dnnSf = dnnSf;
        this.serviceScopes = ["app", "app-sys", "app-api", "app-query", "app-content", "eav", "view", "dnn"];
        this.serviceRoot = dnnSf(id).getServiceRoot("2sxc");
        this.webApi = new __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_WebApi__["a" /* SxcWebApiWithInternals */](this, id, cbid);
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
            console.error('error in 2sxc - will only log but not throw', e);
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
        _this.data = new __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Data__["a" /* SxcDataWithInternals */](_this);
        return _this;
    }
    SxcInstanceWithInternals.prototype.recreate = function (resetCache) {
        if (resetCache)
            delete this.$2sxc._controllers[this.cacheKey];
        return this.$2sxc(this.id, this.cbid);
    };
    return SxcInstanceWithInternals;
}(SxcInstanceWithEditing));



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcDataWithInternals; });
var SxcDataWithInternals = (function () {
    function SxcDataWithInternals(controller) {
        this.controller = controller;
        this.source = undefined;
        this["in"] = {};
        this.List = [];
    }
    SxcDataWithInternals.prototype.sourceUrl = function (params) {
        var url = this.controller.resolveServiceUrl("app-sys/appcontent/GetContentBlockData");
        if (typeof params === "string")
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
                            _this.controller.data.in[dataSetName] = data[dataSetName];
                            _this.controller.data.in[dataSetName].name = dataSetName;
                        }
                }
                if (_this.controller.data.in.Default)
                    _this.List = _this.in.Default.List;
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



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcWebApiWithInternals; });
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



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TotalPopup; });
var TotalPopup = (function () {
    function TotalPopup() {
        this.frame = undefined;
        this.callback = undefined;
    }
    TotalPopup.prototype.open = function (url, callback) {
        var z = 10000010;
        var p = window;
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
        this.frame = ifrm;
        this.callback = callback;
    };
    TotalPopup.prototype.close = function () {
        if (this.frame) {
            document.body.className = document.body.className.replace("sxc-popup-open", "");
            var frm = this.frame;
            frm.parentNode.parentNode.removeChild(frm.parentNode);
            this.callback();
        }
    };
    TotalPopup.prototype.closeThis = function () {
        window.parent.$2sxc.totalPopup.close();
    };
    return TotalPopup;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlParamManager; });
var UrlParamManager = (function () {
    function UrlParamManager() {
    }
    UrlParamManager.prototype.get = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var searchRx = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
        var results = searchRx.exec(location.search);
        var strResult;
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
        return strResult === null || strResult === undefined
            ? ""
            : decodeURIComponent(strResult.replace(/\+/g, " "));
    };
    UrlParamManager.prototype.require = function (name) {
        var found = this.get(name);
        if (found === "") {
            var message = "Required parameter (" + name + ") missing from url - cannot continue";
            alert(message);
            throw message;
        }
        return found;
    };
    return UrlParamManager;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmQwM2I2OTkyY2JjMjE5YTU2ODciLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvMnN4Yy5hcGkudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLkNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLkluc3RhbmNlLnRzIiwid2VicGFjazovLy8uLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5EYXRhLnRzIiwid2VicGFjazovLy8uLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5XZWJBcGkudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLlRvdGFsUG9wdXAudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLlVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN4RG9FO0FBS3BFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztJQUNiLE1BQU0sQ0FBQyxLQUFLLEdBQUcseUZBQWtCLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVDZEO0FBQ2pEO0FBQ0Y7QUEwQ2xELHVCQUF1QixFQUF3QixFQUFFLElBQWE7SUFDMUQsSUFBTSxLQUFL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T0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDN0IsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4Qzs7WUFDRyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUztZQUNoRCxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBWTtRQUNoQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNkLElBQU0sT0FBTyxHQUFHLHlCQUF1QixJQUFJLHlDQUFzQyxDQUFDO1lBQ2xGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNmLE1BQU0sT0FBTyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiIyc3hjLmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZkMDNiNjk5MmNiYzIxOWE1Njg3IiwiLy8gdGhpcyBpcyB0aGUgMnN4Yy1qYXZhc2NyaXB0IEFQSVxyXG4vLyAyc3hjIHdpbGwgaW5jbHVkZSB0aGlzIGF1dG9tYXRpY2FsbHkgd2hlbiBhIHVzZXIgaGFzIGVkaXQtcmlnaHRzXHJcbi8vIGEgdGVtcGxhdGUgZGV2ZWxvcGVyIHdpbGwgdHlwaWNhbGx5IHVzZSB0aGlzIHRvIHVzZSB0aGUgZGF0YS1hcGkgdG8gcmVhZCAyc3hjLWRhdGEgZnJvbSB0aGUgc2VydmVyXHJcbi8vIHJlYWQgbW9yZSBhYm91dCB0aGlzIGluIHRoZSB3aWtpOiBodHRwczovL2dpdGh1Yi5jb20vMnNpYy8yc3hjL3dpa2kvSmF2YVNjcmlwdC0lMjQyc3hjXHJcblxyXG5pbXBvcnQgeyBidWlsZFN4Y0NvbnRyb2xsZXIsIFdpbmRvdyB9IGZyb20gXCIuL1RvU2ljLlN4Yy5Db250cm9sbGVyXCI7XHJcblxyXG4vLyBSZVNoYXJwZXIgZGlzYWJsZSBJbmNvbnNpc3RlbnROYW1pbmdcclxuZGVjbGFyZSBjb25zdCB3aW5kb3c6IFdpbmRvdztcclxuXHJcbmlmICghd2luZG93LiQyc3hjKSAvLyBwcmV2ZW50IGRvdWJsZSBleGVjdXRpb25cclxuICAgIHdpbmRvdy4kMnN4YyA9IGJ1aWxkU3hjQ29udHJvbGxlcigpO1xyXG5cclxuLy8gUmVTaGFycGVyIHJlc3RvcmUgSW5jb25zaXN0ZW50TmFtaW5nXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzLzJzeGMuYXBpLnRzIiwiLy8gUmVTaGFycGVyIGRpc2FibGUgSW5jb25zaXN0ZW50TmFtaW5nXHJcblxyXG5pbXBvcnQgeyBTeGNJbnN0YW5jZSwgU3hjSW5zdGFuY2VXaXRoRWRpdGluZywgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLkluc3RhbmNlXCI7XHJcbmltcG9ydCB7IFRvdGFsUG9wdXAgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuVG90YWxQb3B1cFwiO1xyXG5pbXBvcnQgeyBVcmxQYXJhbU1hbmFnZXIgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuVXJsXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvdyB7ICQyc3hjOiBTeGNDb250cm9sbGVyIHwgU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHM7IH1cclxuXHJcbmRlY2xhcmUgY29uc3QgJDogYW55O1xyXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogV2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgdGhlIG1haW4gJDJzeGMgb2JqZWN0IG9uIHRoZSB3aW5kb3dcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3hjQ29udHJvbGxlciB7XHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYSAyc3hjLWluc3RhbmNlIG9mIHRoZSBpZCBvciBodG1sLXRhZyBwYXNzZWQgaW5cclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHBhcmFtIGNiaWRcclxuICAgICAqIEByZXR1cm5zIHt9XHJcbiAgICAgKi9cclxuICAgIChpZDogbnVtYmVyIHwgSFRNTEVsZW1lbnQsIGNiaWQ/OiBudW1iZXIpOiBTeGNJbnN0YW5jZSB8IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHN5c3RlbSBpbmZvcm1hdGlvbiwgbWFpbmx5IGZvciBjaGVja2luZyB3aGljaCB2ZXJzaW9uIG9mIDJzeGMgaXMgcnVubmluZ1xyXG4gICAgICogbm90ZTogaXQncyBub3QgYWx3YXlzIHVwZGF0ZWQgcmVsaWFibHksIGJ1dCBpdCBoZWxwcyB3aGVuIGRlYnVnZ2luZ1xyXG4gICAgICovXHJcbiAgICBzeXNpbmZvOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdGhlIHZlcnNpb24gdXNpbmcgdGhlICMjLiMjLiMjIHN5bnRheFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnNpb246IHN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYSBzaG9ydCB0ZXh0IGRlc2NyaXB0aW9uLCBmb3IgcGVvcGxlIHdobyBoYXZlIG5vIGlkZWEgd2hhdCB0aGlzIGlzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIGEgMnN4Yy1pbnN0YW5jZSBvZiB0aGUgaWQgb3IgaHRtbC10YWcgcGFzc2VkIGluXHJcbiAqIEBwYXJhbSBpZFxyXG4gKiBAcGFyYW0gY2JpZFxyXG4gKiBAcmV0dXJucyB7fVxyXG4gKi9cclxuZnVuY3Rpb24gU3hjQ29udHJvbGxlcihpZDogbnVtYmVyIHwgSFRNTEVsZW1lbnQsIGNiaWQ/OiBudW1iZXIpOiBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMge1xyXG4gICAgY29uc3QgJDJzeGMgPSB3aW5kb3cuJDJzeGMgYXMgU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHM7XHJcbiAgICBpZiAoISQyc3hjLl9jb250cm9sbGVycylcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIkMnN4YyBub3QgaW5pdGlhbGl6ZWQgeWV0XCIpO1xyXG5cclxuICAgIC8vIGlmIGl0J3MgYSBkb20tZWxlbWVudCwgdXNlIGF1dG8tZmluZFxyXG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnN0IGlkVHVwbGUgPSBhdXRvRmluZChpZCk7XHJcbiAgICAgICAgaWQgPSBpZFR1cGxlWzBdO1xyXG4gICAgICAgIGNiaWQgPSBpZFR1cGxlWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2JpZCkgY2JpZCA9IGlkOyAgICAgICAgICAgLy8gaWYgY29udGVudC1ibG9jayBpcyB1bmtub3duLCB1c2UgaWQgb2YgbW9kdWxlXHJcbiAgICBjb25zdCBjYWNoZUtleSA9IGlkICsgXCI6XCIgKyBjYmlkOyAvLyBuZXV0cmFsaXplIHRoZSBpZCBmcm9tIG9sZCBcIjM0XCIgZm9ybWF0IHRvIHRoZSBuZXcgXCIzNTozNTNcIiBmb3JtYXRcclxuXHJcbiAgICAvLyBlaXRoZXIgZ2V0IHRoZSBjYWNoZWQgY29udHJvbGxlciBmcm9tIHByZXZpb3VzIGNhbGxzLCBvciBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICBpZiAoJDJzeGMuX2NvbnRyb2xsZXJzW2NhY2hlS2V5XSkgcmV0dXJuICQyc3hjLl9jb250cm9sbGVyc1tjYWNoZUtleV07XHJcblxyXG4gICAgLy8gYWxzbyBpbml0IHRoZSBkYXRhLWNhY2hlIGluIGNhc2UgaXQncyBldmVyIG5lZWRlZFxyXG4gICAgaWYgKCEkMnN4Yy5fZGF0YVtjYWNoZUtleV0pICQyc3hjLl9kYXRhW2NhY2hlS2V5XSA9IHt9O1xyXG5cclxuICAgIHJldHVybiAoJDJzeGMuX2NvbnRyb2xsZXJzW2NhY2hlS2V5XVxyXG4gICAgICAgID0gbmV3IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyhpZCwgY2JpZCwgY2FjaGVLZXksICQyc3hjLCAkLlNlcnZpY2VzRnJhbWV3b3JrKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBhIFNYQyBDb250cm9sbGVyIGZvciB0aGUgcGFnZS4gU2hvdWxkIG9ubHkgZXZlciBiZSBleGVjdXRlZCBvbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTeGNDb250cm9sbGVyKCk6IFN4Y0NvbnRyb2xsZXIgfCBTeGNDb250cm9sbGVyV2l0aEludGVybmFscyB7XHJcbiAgICBjb25zdCB1cmxNYW5hZ2VyID0gbmV3IFVybFBhcmFtTWFuYWdlcigpO1xyXG4gICAgY29uc3QgZGVidWcgPSB7XHJcbiAgICAgICAgbG9hZDogKHVybE1hbmFnZXIuZ2V0KFwiZGVidWdcIikgPT09IFwidHJ1ZVwiKSxcclxuICAgICAgICB1bmNhY2hlOiB1cmxNYW5hZ2VyLmdldChcInN4Y3ZlclwiKSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWRkT246IGFueSA9IHtcclxuICAgICAgICBfY29udHJvbGxlcnM6IHt9IGFzIGFueSxcclxuICAgICAgICBzeXNpbmZvOiB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMDkuMDUuMDJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIDJzeGMgQ29udHJvbGxlciBvYmplY3QgLSByZWFkIG1vcmUgYWJvdXQgaXQgb24gMnN4Yy5vcmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJldGE6IHt9LFxyXG4gICAgICAgIF9kYXRhOiB7fSxcclxuICAgICAgICAvLyB0aGlzIGNyZWF0ZXMgYSBmdWxsLXNjcmVlbiBpZnJhbWUtcG9wdXAgYW5kIHByb3ZpZGVzIGEgY2xvc2UtY29tbWFuZCB0byBmaW5pc2ggdGhlIGRpYWxvZyBhcyBuZWVkZWRcclxuICAgICAgICB0b3RhbFBvcHVwOiBuZXcgVG90YWxQb3B1cCgpLFxyXG4gICAgICAgIHVybFBhcmFtczogdXJsTWFuYWdlcixcclxuICAgICAgICAvLyBub3RlOiBJIHdvdWxkIGxpa2UgdG8gcmVtb3ZlIHRoaXMgZnJvbSAkMnN4YywgYnV0IGl0J3MgY3VycmVudGx5XHJcbiAgICAgICAgLy8gdXNlZCBib3RoIGluIHRoZSBpbnBhZ2UtZWRpdCBhbmQgaW4gdGhlIGRpYWxvZ3NcclxuICAgICAgICAvLyBkZWJ1ZyBzdGF0ZSB3aGljaCBpcyBuZWVkZWQgaW4gdmFyaW91cyBwbGFjZXNcclxuICAgICAgICBkZWJ1ZyxcclxuICAgICAgICAvLyBtaW5pLWhlbHBlcnMgdG8gbWFuYWdlIDJzeGMgcGFydHMsIGEgYml0IGxpa2UgYSBkZXBlbmRlbmN5IGxvYWRlclxyXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgb3B0aW1pemUgdG8gbG9hZCBtaW4vbWF4IGRlcGVuZGluZyBvbiBkZWJ1ZyBzdGF0ZVxyXG4gICAgICAgIHBhcnRzOiB7XHJcbiAgICAgICAgICAgIGdldFVybCh1cmw6IHN0cmluZywgcHJldmVudFVubWluOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgciA9IChwcmV2ZW50VW5taW4gfHwgIWRlYnVnLmxvYWQpID8gdXJsIDogdXJsLnJlcGxhY2UoXCIubWluXCIsIFwiXCIpOyAvLyB1c2UgbWluIG9yIG5vdFxyXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnLnVuY2FjaGUgJiYgci5pbmRleE9mKFwic3hjdmVyXCIpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICByID0gciArICgoci5pbmRleE9mKFwiP1wiKSA9PT0gLTEpID8gXCI/XCIgOiBcIiZcIikgKyBcInN4Y3Zlcj1cIiArIGRlYnVnLnVuY2FjaGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gYWRkT24pXHJcbiAgICAgICAgaWYgKGFkZE9uLmhhc093blByb3BlcnR5KHByb3BlcnR5KSlcclxuICAgICAgICAgICAgU3hjQ29udHJvbGxlcltwcm9wZXJ0eV0gPSBhZGRPbltwcm9wZXJ0eV0gYXMgYW55O1xyXG4gICAgcmV0dXJuIFN4Y0NvbnRyb2xsZXIgYXMgYW55IGFzIFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhdXRvRmluZChkb21FbGVtZW50OiBIVE1MRWxlbWVudCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgY29uc3QgY29udGFpbmVyVGFnID0gJChkb21FbGVtZW50KS5jbG9zZXN0KFwiLnNjLWNvbnRlbnQtYmxvY2tcIilbMF07XHJcbiAgICBpZiAoIWNvbnRhaW5lclRhZykgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBpaWQgPSBjb250YWluZXJUYWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYi1pbnN0YW5jZVwiKTtcclxuICAgIGNvbnN0IGNiaWQgPSBjb250YWluZXJUYWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYi1pZFwiKTtcclxuICAgIGlmICghaWlkIHx8ICFjYmlkKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBbaWlkLCBjYmlkXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTeGNDb250cm9sbGVyV2l0aEludGVybmFscyBleHRlbmRzIFN4Y0NvbnRyb2xsZXIge1xyXG4gICAgKGlkOiBudW1iZXIgfCBIVE1MRWxlbWVudCwgY2JpZD86IG51bWJlcik6IFN4Y0luc3RhbmNlIHwgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzO1xyXG4gICAgdG90YWxQb3B1cDogVG90YWxQb3B1cDtcclxuICAgIHVybFBhcmFtczogVXJsUGFyYW1NYW5hZ2VyO1xyXG4gICAgYmV0YTogYW55O1xyXG4gICAgX2NvbnRyb2xsZXJzOiBhbnk7XHJcbiAgICBfZGF0YTogYW55O1xyXG4gICAgX21hbmFnZTogYW55O1xyXG4gICAgX3RyYW5zbGF0ZUluaXQ6IGFueTtcclxuICAgIGRlYnVnOiBhbnk7XHJcbiAgICBwYXJ0czogYW55O1xyXG5cclxufVxyXG5cclxuLy8gUmVTaGFycGVyIHJlc3RvcmUgSW5jb25zaXN0ZW50TmFtaW5nXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5Db250cm9sbGVyLnRzIiwiXHJcbmltcG9ydCB7IFN4Y0NvbnRyb2xsZXIsIFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgU3hjRGF0YVdpdGhJbnRlcm5hbHMgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuRGF0YVwiO1xyXG5pbXBvcnQgeyBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLldlYkFwaVwiO1xyXG4vKipcclxuICogVGhlIHR5cGljYWwgc3hjLWluc3RhbmNlIG9iamVjdCBmb3IgYSBzcGVjaWZpYyBETk4gbW9kdWxlIG9yIGNvbnRlbnQtYmxvY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZSB7XHJcbiAgICAvKipcclxuICAgICAqIGhlbHBlcnMgZm9yIGFqYXggY2FsbHNcclxuICAgICAqL1xyXG4gICAgd2ViQXBpOiBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzO1xyXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VSb290OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2VTY29wZXMgPSBbXCJhcHBcIiwgXCJhcHAtc3lzXCIsIFwiYXBwLWFwaVwiLCBcImFwcC1xdWVyeVwiLCBcImFwcC1jb250ZW50XCIsIFwiZWF2XCIsIFwidmlld1wiLCBcImRublwiXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0aGUgc3hjLWluc3RhbmNlIElELCB3aGljaCBpcyB1c3VhbGx5IHRoZSBETk4gTW9kdWxlIElkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGlkOiBudW1iZXIsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNvbnRlbnQtYmxvY2sgSUQsIHdoaWNoIGlzIGVpdGhlciB0aGUgbW9kdWxlIElELCBvciB0aGUgY29udGVudC1ibG9jayBkZWZpbml0aWlvbiBlbnRpdHkgSURcclxuICAgICAgICAgKiB0aGlzIGlzIGFuIGFkdmFuY2VkIGNvbmNlcHQgeW91IHVzdWFsbHkgZG9uJ3QgY2FyZSBhYm91dCwgb3RoZXJ3aXNlIHlvdSBzaG91bGQgcmVzZWFyY2ggaXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkbm5TZjogYW55LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlUm9vdCA9IGRublNmKGlkKS5nZXRTZXJ2aWNlUm9vdChcIjJzeGNcIik7XHJcbiAgICAgICAgdGhpcy53ZWJBcGkgPSBuZXcgU3hjV2ViQXBpV2l0aEludGVybmFscyh0aGlzLCBpZCwgY2JpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0cyBhIHNob3J0IGFwaS1jYWxsIHBhdGggbGlrZSBcIi9hcHAvQmxvZy9xdWVyeS94eXpcIiB0byB0aGUgRE5OIGZ1bGwgcGF0aFxyXG4gICAgICogd2hpY2ggdmFyaWVzIGZyb20gaW5zdGFsbGF0aW9uIHRvIGluc3RhbGxhdGlvbiBsaWtlIFwiL2Rlc2t0b3Btb2R1bGVzL2FwaS8yc3hjL2FwcC8uLi5cIlxyXG4gICAgICogQHBhcmFtIHZpcnR1YWxQYXRoXHJcbiAgICAgKiBAcmV0dXJucyBtYXBwZWQgcGF0aFxyXG4gICAgICovXHJcbiAgICByZXNvbHZlU2VydmljZVVybCh2aXJ0dWFsUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB2aXJ0dWFsUGF0aC5zcGxpdChcIi9cIilbMF0udG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcCBpZiBpdCdzIG5vdCBvbmUgb2Ygb3VyIHNwZWNpYWwgcGF0aHNcclxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlU2NvcGVzLmluZGV4T2Yoc2NvcGUpID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZpcnR1YWxQYXRoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlUm9vdCArIHNjb3BlICsgXCIvXCIgKyB2aXJ0dWFsUGF0aC5zdWJzdHJpbmcodmlydHVhbFBhdGguaW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gU2hvdyBhIG5pY2UgZXJyb3Igd2l0aCBtb3JlIGluZm9zIGFyb3VuZCAyc3hjXHJcbiAgICBzaG93RGV0YWlsZWRIdHRwRXJyb3IocmVzdWx0OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IDQwNCAmJlxyXG4gICAgICAgICAgICByZXN1bHQuY29uZmlnICYmXHJcbiAgICAgICAgICAgIHJlc3VsdC5jb25maWcudXJsICYmXHJcbiAgICAgICAgICAgIHJlc3VsdC5jb25maWcudXJsLmluZGV4T2YoXCIvZGlzdC9pMThuL1wiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianVzdCBmeWk6IGZhaWxlZCB0byBsb2FkIGxhbmd1YWdlIHJlc291cmNlOyB3aWxsIGhhdmUgdG8gdXNlIGRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgaXQncyBhbiB1bnNwZWNpZmllZCAwLWVycm9yLCBpdCdzIHByb2JhYmx5IG5vdCBhbiBlcnJvciBidXQgYSBjYW5jZWxsZWQgcmVxdWVzdCxcclxuICAgICAgICAvLyAoaGFwcGVucyB3aGVuIGNsb3NpbmcgcG9wdXBzIGNvbnRhaW5pbmcgYW5ndWxhckpTKVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAwIHx8IHJlc3VsdC5zdGF0dXMgPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICAvLyBsZXQncyB0cnkgdG8gc2hvdyBnb29kIG1lc3NhZ2VzIGluIG1vc3QgY2FzZXNcclxuICAgICAgICBsZXQgaW5mb1RleHQgPSBcIkhhZCBhbiBlcnJvciB0YWxraW5nIHRvIHRoZSBzZXJ2ZXIgKHN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMgKyBcIikuXCI7XHJcbiAgICAgICAgY29uc3Qgc3J2UmVzcCA9IHJlc3VsdC5yZXNwb25zZVRleHRcclxuICAgICAgICAgICAgPyBKU09OLnBhcnNlKHJlc3VsdC5yZXNwb25zZVRleHQpIC8vIGZvciBqcXVlcnkgYWpheCBlcnJvcnNcclxuICAgICAgICAgICAgOiByZXN1bHQuZGF0YTsgLy8gZm9yIGFuZ3VsYXIgJGh0dHBcclxuICAgICAgICBpZiAoc3J2UmVzcCkge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBzcnZSZXNwLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIGluZm9UZXh0ICs9IFwiXFxuTWVzc2FnZTogXCIgKyBtc2c7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZ0RldCA9IHNydlJlc3AuTWVzc2FnZURldGFpbCB8fCBzcnZSZXNwLkV4Y2VwdGlvbk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmIChtc2dEZXQpIGluZm9UZXh0ICs9IFwiXFxuRGV0YWlsOiBcIiArIG1zZ0RldDtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobXNnRGV0ICYmIG1zZ0RldC5pbmRleE9mKFwiTm8gYWN0aW9uIHdhcyBmb3VuZFwiKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIGlmIChtc2dEZXQuaW5kZXhPZihcInRoYXQgbWF0Y2hlcyB0aGUgbmFtZVwiKSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgKz0gXCJcXG5cXG5UaXAgZnJvbSAyc3hjOiB5b3UgcHJvYmFibHkgZ290IHRoZSBhY3Rpb24tbmFtZSB3cm9uZyBpbiB5b3VyIEpTLlwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobXNnRGV0LmluZGV4T2YoXCJ0aGF0IG1hdGNoZXMgdGhlIHJlcXVlc3QuXCIpID4gMClcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCArPSBcIlxcblxcblRpcCBmcm9tIDJzeGM6IFNlZW1zIGxpa2UgdGhlIHBhcmFtZXRlcnMgYXJlIHRoZSB3cm9uZyBhbW91bnQgb3IgdHlwZS5cIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChtc2cgJiYgbXNnLmluZGV4T2YoXCJDb250cm9sbGVyXCIpID09PSAwICYmIG1zZy5pbmRleE9mKFwibm90IGZvdW5kXCIpID4gMClcclxuICAgICAgICAgICAgICAgIGluZm9UZXh0ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuXFxuVGlwIGZyb20gMnN4YzogeW91IHByb2JhYmx5IHNwZWxsZWQgdGhlIGNvbnRyb2xsZXIgbmFtZSB3cm9uZyBvciBmb3Jnb3QgdG8gcmVtb3ZlIHRoZSB3b3JkICdjb250cm9sbGVyJyBmcm9tIHRoZSBjYWxsIGluIEpTLiBUbyBjYWxsIGEgY29udHJvbGxlciBjYWxsZWQgJ0RlbW9Db250cm9sbGVyJyBvbmx5IHVzZSAnRGVtbycuXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgaW5mb1RleHQgKz0gXCJcXG5cXG5pZiB5b3UgYXJlIGFuIGFkdmFuY2VkIHVzZXIgeW91IGNhbiBsZWFybiBtb3JlIGFib3V0IHdoYXQgd2VudCB3cm9uZyAtIGRpc2NvdmVyIGhvdyBvbiAyc3hjLm9yZy9oZWxwP3RhZz1kZWJ1Z1wiO1xyXG4gICAgICAgIGFsZXJ0KGluZm9UZXh0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuaGFuY2VkIHN4YyBpbnN0YW5jZSB3aXRoIGFkZGl0aW9uYWwgZWRpdGluZyBmdW5jdGlvbmFsaXR5XHJcbiAqIFVzZSB0aGlzLCBpZiB5b3UgaW50ZW5kIHRvIHJ1biBjb250ZW50LW1hbmFnZW1lbnQgY29tbWFuZHMgbGlrZSBcImVkaXRcIiBmcm9tIHlvdXIgSlMgZGlyZWN0bHlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZVdpdGhFZGl0aW5nIGV4dGVuZHMgU3hjSW5zdGFuY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBtYW5hZ2Ugb2JqZWN0IHdoaWNoIHByb3ZpZGVzIGFjY2VzcyB0byBhZGRpdGlvbmFsIGNvbnRlbnQtbWFuYWdlbWVudCBmZWF0dXJlc1xyXG4gICAgICogaXQgb25seSBleGlzdHMgaWYgMnN4YyBpcyBpbiBlZGl0IG1vZGUgKG90aGVyd2lzZSB0aGUgSlMgYXJlIG5vdCBpbmNsdWRlZCBmb3IgdGhlc2UgZmVhdHVyZXMpXHJcbiAgICAgKi9cclxuICAgIG1hbmFnZTogYW55ID0gbnVsbDsgLy8gaW5pdGlhbGl6ZSBjb3JyZWN0bHkgbGF0ZXIgb25cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4vLyBSZVNoYXJwZXIgZGlzYWJsZSBvbmNlIEluY29uc2lzdGVudE5hbWluZ1xyXG4gICAgICAgIHByb3RlY3RlZCAkMnN4YzogU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHMsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRublNmOiBhbnksXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihpZCwgY2JpZCwgZG5uU2YpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbWFuYWdlIHByb3BlcnR5LCBidXQgbm90IHdpdGhpbiBpbml0aWFsaXplciwgYmVjYXVzZSBpbnNpZGUgdGhlIG1hbmFnZS1pbml0aWFsaXplciBpdCBtYXkgcmVmZXJlbmNlIDJzeGMgYWdhaW5cclxuICAgICAgICB0cnkgeyAvLyBzb21ldGltZXMgdGhlIG1hbmFnZSBjYW4ndCBiZSBidWlsdCwgbGlrZSBiZWZvcmUgaW5zdGFsbGluZ1xyXG4gICAgICAgICAgICBpZiAoJDJzeGMuX21hbmFnZSkgJDJzeGMuX21hbmFnZS5pbml0SW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciBpbiAyc3hjIC0gd2lsbCBvbmx5IGxvZyBidXQgbm90IHRocm93JywgZSk7XHJcbiAgICAgICAgICAgIC8vIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGlzIG9ubHkgd29ya3Mgd2hlbiBtYW5hZ2UgZXhpc3RzIChub3QgaW5zdGFsbGluZykgYW5kIHRyYW5zbGF0b3IgZXhpc3RzIHRvb1xyXG4gICAgICAgIGlmICgkMnN4Yy5fdHJhbnNsYXRlSW5pdCAmJiB0aGlzLm1hbmFnZSkgJDJzeGMuX3RyYW5zbGF0ZUluaXQodGhpcy5tYW5hZ2UpOyAgICAvLyBpbml0IHRyYW5zbGF0ZSwgbm90IHJlYWxseSBuaWNlLCBidXQgb2sgZm9yIG5vd1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoZWNrcyBpZiB3ZSdyZSBjdXJyZW50bHkgaW4gZWRpdCBtb2RlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNFZGl0TW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2UgJiYgdGhpcy5tYW5hZ2UuX2lzRWRpdE1vZGUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMgZXh0ZW5kcyBTeGNJbnN0YW5jZVdpdGhFZGl0aW5nIHtcclxuICAgIGRhdGE6IFN4Y0RhdGFXaXRoSW50ZXJuYWxzO1xyXG4gICAgc291cmNlOiBhbnkgPSBudWxsO1xyXG4gICAgaXNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxhc3RSZWZyZXNoOiBEYXRlID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgY2FjaGVLZXk6IHN0cmluZyxcclxuLy8gUmVTaGFycGVyIGRpc2FibGUgb25jZSBJbmNvbnNpc3RlbnROYW1pbmdcclxuICAgICAgICBwcm90ZWN0ZWQgJDJzeGM6IFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkbm5TZjogYW55LFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIGNiaWQsICQyc3hjLCBkbm5TZik7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IFN4Y0RhdGFXaXRoSW50ZXJuYWxzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY3JlYXRlKHJlc2V0Q2FjaGU6IGJvb2xlYW4pOiBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMge1xyXG4gICAgICAgIGlmIChyZXNldENhY2hlKSBkZWxldGUgdGhpcy4kMnN4Yy5fY29udHJvbGxlcnNbdGhpcy5jYWNoZUtleV07IC8vIGNsZWFyIGNhY2hlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJDJzeGModGhpcy5pZCwgdGhpcy5jYmlkKSBhcyBhbnkgYXMgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzOyAvLyBnZW5lcmF0ZSBuZXdcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuSW5zdGFuY2UudHMiLCJpbXBvcnQgeyBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuSW5zdGFuY2VcIjtcclxuXHJcbmRlY2xhcmUgY29uc3QgJDogYW55O1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTeGNEYXRhV2l0aEludGVybmFscyB7XHJcbiAgICBzb3VyY2U6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvLyBpbi1zdHJlYW1zXHJcbiAgICBcImluXCI6IGFueSA9IHt9O1xyXG5cclxuICAgIC8vIHdpbGwgaG9sZCB0aGUgZGVmYXVsdCBzdHJlYW0gKFtcImluXCJdW1wiRGVmYXVsdFwiXS5MaXN0XHJcbiAgICBMaXN0OiBhbnkgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNvbnRyb2xsZXI6IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyxcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBzb3VyY2UgcGF0aCBkZWZhdWx0aW5nIHRvIGN1cnJlbnQgcGFnZSArIG9wdGlvbmFsIHBhcmFtc1xyXG4gICAgc291cmNlVXJsKHBhcmFtcz86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuY29udHJvbGxlci5yZXNvbHZlU2VydmljZVVybChcImFwcC1zeXMvYXBwY29udGVudC9HZXRDb250ZW50QmxvY2tEYXRhXCIpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSAvLyB0ZXh0IGxpa2UgJ2lkPTcnXHJcbiAgICAgICAgICAgIHVybCArPSBcIiZcIiArIHBhcmFtcztcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBsb2FkIGRhdGEgdmlhIGFqYXhcclxuICAgIGxvYWQoc291cmNlPzogYW55KSB7XHJcbiAgICAgICAgLy8gaWYgc291cmNlIGlzIGFscmVhZHkgdGhlIGRhdGEsIHNldCBpdFxyXG4gICAgICAgIGlmIChzb3VyY2UgJiYgc291cmNlLkxpc3QpIHtcclxuICAgICAgICAgICAgLy8gMjAxNy0wOS0wNSAyZG06IGRpc2NvdmVyZCBhIGNhbGwgdG8gYW4gaW5leGlzdGluZyBmdW5jdGlvblxyXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGlzIGlzIGFuIG9sZCBBUEkgd2hpY2ggaXMgYmVpbmcgZGVwcmVjYXRlZCwgcGxlYXNlIGRvbid0IGZpeCB1bmxlc3Mgd2UgZ2V0IGFjdGl2ZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAvLyBjb250cm9sbGVyLmRhdGEuc2V0RGF0YShzb3VyY2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSB7fTtcclxuICAgICAgICAgICAgaWYgKCFzb3VyY2UudXJsKVxyXG4gICAgICAgICAgICAgICAgc291cmNlLnVybCA9IHRoaXMuY29udHJvbGxlci5kYXRhLnNvdXJjZVVybCgpO1xyXG4gICAgICAgICAgICBzb3VyY2Uub3JpZ1N1Y2Nlc3MgPSBzb3VyY2Uuc3VjY2VzcztcclxuICAgICAgICAgICAgc291cmNlLnN1Y2Nlc3MgPSAoZGF0YTogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkYXRhU2V0TmFtZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoZGF0YVNldE5hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtkYXRhU2V0TmFtZV0uTGlzdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRhdGEuaW5bZGF0YVNldE5hbWVdID0gZGF0YVtkYXRhU2V0TmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIuZGF0YS5pbltkYXRhU2V0TmFtZV0ubmFtZSA9IGRhdGFTZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5kYXRhLmluLkRlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMjAxNy0wOS0wNSAyZG06IHByZXZpb3VzbHkgd3JvdGUgaXQgdG8gY29udHJvbGxlci5MaXN0LCBidXQgdGhpcyBpcyBhbG1vc3QgY2VydGFpbmx5IGEgbWlzdGFrZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0J3MgYW4gb2xkIEFQSSB3aGljaCBpcyBiZWluZyBkZXByZWNhdGVkLCB3ZSB3b24ndCBmaXggaXRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxpc3QgPSB0aGlzLmluLkRlZmF1bHQuTGlzdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLm9yaWdTdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5vcmlnU3VjY2Vzcyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmxhc3RSZWZyZXNoID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSkuX3RyaWdnZXJMb2FkZWQoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc291cmNlLmVycm9yID0gKHJlcXVlc3Q6IGFueSkgPT4geyBhbGVydChyZXF1ZXN0LnN0YXR1c1RleHQpOyB9O1xyXG4gICAgICAgICAgICBzb3VyY2UucHJldmVudEF1dG9GYWlsID0gdHJ1ZTsgLy8gdXNlIG91ciBmYWlsIG1lc3NhZ2VcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWxvYWQoKTogU3hjRGF0YVdpdGhJbnRlcm5hbHMge1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlci53ZWJBcGkuZ2V0KHRoaXMuc291cmNlKVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLnNvdXJjZS5zdWNjZXNzLCB0aGlzLnNvdXJjZS5lcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb24oZXZlbnRzOiBFdmVudCwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiAkKHRoaXMpLmJpbmQoXCIyc2NMb2FkXCIsIGNhbGxiYWNrKVswXS5fdHJpZ2dlckxvYWRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF90cmlnZ2VyTG9hZGVkKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5pc0xvYWRlZFxyXG4gICAgICAgICAgICA/ICQodGhpcykudHJpZ2dlcihcIjJzY0xvYWRcIiwgW3RoaXNdKVswXVxyXG4gICAgICAgICAgICA6IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb25lKGV2ZW50czogRXZlbnQsIGNhbGxiYWNrOiAoeDogYW55LCB5OiBhbnkpID0+IHZvaWQpOiBTeGNEYXRhV2l0aEludGVybmFscyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2xsZXIuaXNMb2FkZWQpXHJcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm9uZShcIjJzY0xvYWRcIiwgY2FsbGJhY2spWzBdO1xyXG4gICAgICAgIGNhbGxiYWNrKHt9LCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuRGF0YS50cyIsIlxyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuaW1wb3J0IHsgU3hjSW5zdGFuY2UgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuSW5zdGFuY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBoZWxwZXIgQVBJIHRvIHJ1biBhamF4IC8gUkVTVCBjYWxscyB0byB0aGUgc2VydmVyXHJcbiAqIGl0IHdpbGwgZW5zdXJlIHRoYXQgdGhlIGhlYWRlcnMgZXRjLiBhcmUgc2V0IGNvcnJlY3RseVxyXG4gKiBhbmQgdGhhdCB1cmxzIGFyZSByZXdyaXR0ZW5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY29udHJvbGxlcjogU3hjSW5zdGFuY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBpZDogbnVtYmVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2JpZDogbnVtYmVyLFxyXG4gICAgKSB7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAqIEBwYXJhbSBzZXR0aW5nc09yVXJsIHRoZSB1cmwgdG8gZ2V0XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHByZXZlbnRBdXRvRmFpbFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGdldChzZXR0aW5nc09yVXJsOiBzdHJpbmcgfCBhbnksIHBhcmFtcz86IGFueSwgZGF0YT86IGFueSwgcHJldmVudEF1dG9GYWlsPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChzZXR0aW5nc09yVXJsLCBwYXJhbXMsIGRhdGEsIHByZXZlbnRBdXRvRmFpbCwgXCJHRVRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAqIEBwYXJhbSBzZXR0aW5nc09yVXJsIHRoZSB1cmwgdG8gZ2V0XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHByZXZlbnRBdXRvRmFpbFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHBvc3Qoc2V0dGluZ3NPclVybDogc3RyaW5nIHwgYW55LCBwYXJhbXM/OiBhbnksIGRhdGE/OiBhbnksIHByZXZlbnRBdXRvRmFpbD86IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3Qoc2V0dGluZ3NPclVybCwgcGFyYW1zLCBkYXRhLCBwcmV2ZW50QXV0b0ZhaWwsIFwiUE9TVFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYW4gaHR0cC1nZXQgcHJvbWlzZVxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzT3JVcmwgdGhlIHVybCB0byBnZXRcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgalF1ZXJ5IHN0eWxlIGFqYXggcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIGRhdGEgalF1ZXJ5IHN0eWxlIGRhdGEgZm9yIHBvc3QvcHV0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gcHJldmVudEF1dG9GYWlsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0galF1ZXJ5IGFqYXggcHJvbWlzZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgZGVsZXRlKHNldHRpbmdzT3JVcmw6IHN0cmluZyB8IGFueSwgcGFyYW1zPzogYW55LCBkYXRhPzogYW55LCBwcmV2ZW50QXV0b0ZhaWw/OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHNldHRpbmdzT3JVcmwsIHBhcmFtcywgZGF0YSwgcHJldmVudEF1dG9GYWlsLCBcIkRFTEVURVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYW4gaHR0cC1nZXQgcHJvbWlzZVxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzT3JVcmwgdGhlIHVybCB0byBnZXRcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgalF1ZXJ5IHN0eWxlIGFqYXggcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIGRhdGEgalF1ZXJ5IHN0eWxlIGRhdGEgZm9yIHBvc3QvcHV0IHJlcXVlc3RzXHJcbiAgICAgKiBAcGFyYW0gcHJldmVudEF1dG9GYWlsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0galF1ZXJ5IGFqYXggcHJvbWlzZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHV0KHNldHRpbmdzT3JVcmw6IHN0cmluZyB8IGFueSwgcGFyYW1zPzogYW55LCBkYXRhPzogYW55LCBwcmV2ZW50QXV0b0ZhaWw/OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHNldHRpbmdzT3JVcmwsIHBhcmFtcywgZGF0YSwgcHJldmVudEF1dG9GYWlsLCBcIlBVVFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcXVlc3Qoc2V0dGluZ3M6IHN0cmluZyB8IGFueSwgcGFyYW1zOiBhbnksIGRhdGE6IGFueSwgcHJldmVudEF1dG9GYWlsOiBib29sZWFuLCBtZXRob2Q6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgICAgIC8vIHVybCBwYXJhbWV0ZXI6IGF1dG9jb252ZXJ0IGEgc2luZ2xlIHZhbHVlIChpbnN0ZWFkIG9mIG9iamVjdCBvZiB2YWx1ZXMpIHRvIGFuIGlkPS4uLiBwYXJhbWV0ZXJcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y3VybHlcclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcGFyYW1zICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICBwYXJhbXMgPSB7IGlkOiBwYXJhbXMgfTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGZpcnN0IHBhcmFtZXRlciBpcyBhIHN0cmluZywgcmVzb2x2ZSBzZXR0aW5nc1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbGxlckFjdGlvbiA9IHNldHRpbmdzLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbGxlck5hbWUgPSBjb250cm9sbGVyQWN0aW9uWzBdO1xyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25OYW1lID0gY29udHJvbGxlckFjdGlvblsxXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyTmFtZSA9PT0gXCJcIiB8fCBhY3Rpb25OYW1lID09PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcjogY29udHJvbGxlciBvciBhY3Rpb24gbm90IGRlZmluZWQuIFdpbGwgY29udGludWUgd2l0aCBsaWtlbHkgZXJyb3JzLlwiKTtcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBjb250cm9sbGVyQWN0aW9uLmxlbmd0aCA+IDIgPyBzZXR0aW5ncyA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50QXV0b0ZhaWwsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QgPT09IG51bGwgPyBcIlBPU1RcIiA6IG1ldGhvZCxcclxuICAgICAgICAgICAgcGFyYW1zOiBudWxsIGFzIGFueSxcclxuICAgICAgICAgICAgcHJldmVudEF1dG9GYWlsOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgY29uc3Qgc2YgPSAkLlNlcnZpY2VzRnJhbWV3b3JrKHRoaXMuaWQpO1xyXG4gICAgICAgIGNvbnN0IGNiaWQgPSB0aGlzLmNiaWQ7IC8vIG11c3QgcmVhZCBoZXJlLCBhcyB0aGUgXCJ0aGlzXCIgd2lsbCBjaGFuZ2UgaW5zaWRlIHRoZSBtZXRob2RcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogc2V0dGluZ3MuZGF0YVR5cGUgfHwgXCJqc29uXCIsIC8vIGRlZmF1bHQgaXMganNvbiBpZiBub3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLmRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IHNldHRpbmdzLm1ldGhvZCxcclxuICAgICAgICAgICAgdXJsOiB0aGlzLmdldEFjdGlvblVybChzZXR0aW5ncyksXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQoeGhyOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudEJsb2NrSWRcIiwgY2JpZCk7XHJcbiAgICAgICAgICAgICAgICBzZi5zZXRNb2R1bGVIZWFkZXJzKHhocik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghc2V0dGluZ3MucHJldmVudEF1dG9GYWlsKVxyXG4gICAgICAgICAgICBwcm9taXNlLmZhaWwodGhpcy5jb250cm9sbGVyLnNob3dEZXRhaWxlZEh0dHBFcnJvcik7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWN0aW9uVXJsKHNldHRpbmdzOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNmID0gJC5TZXJ2aWNlc0ZyYW1ld29yayh0aGlzLmlkKTtcclxuICAgICAgICBjb25zdCBiYXNlID0gKHNldHRpbmdzLnVybClcclxuICAgICAgICAgICAgPyB0aGlzLmNvbnRyb2xsZXIucmVzb2x2ZVNlcnZpY2VVcmwoc2V0dGluZ3MudXJsKVxyXG4gICAgICAgICAgICA6IHNmLmdldFNlcnZpY2VSb290KFwiMnN4Y1wiKSArIFwiYXBwL2F1dG8vYXBpL1wiICsgc2V0dGluZ3MuY29udHJvbGxlciArIFwiL1wiICsgc2V0dGluZ3MuYWN0aW9uO1xyXG4gICAgICAgIHJldHVybiBiYXNlICsgKHNldHRpbmdzLnBhcmFtcyA9PT0gbnVsbCA/IFwiXCIgOiAoXCI/XCIgKyAkLnBhcmFtKHNldHRpbmdzLnBhcmFtcykpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLldlYkFwaS50cyIsIlxyXG5leHBvcnQgY2xhc3MgVG90YWxQb3B1cCB7XHJcbiAgICBmcmFtZTogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgY2FsbGJhY2s6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBvcGVuKHVybDogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvdW50IHBhcmVudHMgdG8gc2VlIGhvdyBoaWdoIHRoZSB6LWluZGV4IG5lZWRzIHRvIGJlXHJcbiAgICAgICAgbGV0IHogPSAxMDAwMDAxMDsgLy8gTmVlZHMgYXQgbGVhc3QgMTAwMDAwMDAgdG8gYmUgb24gdG9wIG9mIHRoZSBETk45IGJhclxyXG4gICAgICAgIGxldCBwID0gd2luZG93O1xyXG4gICAgICAgIHdoaWxlIChwICE9PSB3aW5kb3cudG9wICYmIHogPCAxMDAwMDEwMCkge1xyXG4gICAgICAgICAgICB6Kys7XHJcbiAgICAgICAgICAgIHAgPSBwLnBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCIgdG9wOiAwO2xlZnQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlOyBwb3NpdGlvbjpmaXhlZDsgei1pbmRleDpcIiArIHopO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IGlmcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwiYWxsb3d0cmFuc3BhcmVuY3lcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpO1xyXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwic3JjXCIsIHVybCk7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChpZnJtKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSBcIiBzeGMtcG9wdXAtb3BlblwiO1xyXG4gICAgICAgIHRoaXMuZnJhbWUgPSBpZnJtO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5mcmFtZSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoXCJzeGMtcG9wdXAtb3BlblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZnJtID0gdGhpcy5mcmFtZTtcclxuICAgICAgICAgICAgZnJtLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmcm0ucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VUaGlzKCk6IHZvaWQge1xyXG4gICAgICAgICh3aW5kb3cucGFyZW50IGFzIGFueSkuJDJzeGMudG90YWxQb3B1cC5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuVG90YWxQb3B1cC50cyIsIlxyXG4gICAgZXhwb3J0IGNsYXNzIFVybFBhcmFtTWFuYWdlciB7XHJcbiAgICAgICAgZ2V0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvLyB3YXJuaW5nOiB0aGlzIG1ldGhvZCBpcyBkdXBsaWNhdGVkIGluIDIgcGxhY2VzIC0ga2VlcCB0aGVtIGluIHN5bmMuXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9ucyBhcmUgZWF2IGFuZCAyc3hjNG5nXHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXF1cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFJ4ID0gbmV3IFJlZ0V4cChcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIiwgXCJpXCIpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHNlYXJjaFJ4LmV4ZWMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgICAgICAgICAgbGV0IHN0clJlc3VsdDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2hSeCA9IG5ldyBSZWdFeHAoXCJbIyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIiwgXCJpXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IGhhc2hSeC5leGVjKGxvY2F0aW9uLmhhc2gpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBub3RoaW5nIGZvdW5kLCB0cnkgbm9ybWFsIFVSTCBiZWNhdXNlIEROTiBwbGFjZXMgcGFyYW1ldGVycyBpbiAva2V5L3ZhbHVlIG5vdGF0aW9uXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgdHJ5IHBhcnRzIG9mIHRoZSBVUkxcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2gobmV3IFJlZ0V4cChcIi9cIiArIG5hbWUgKyBcIi8oW14vXSspXCIsIFwiaVwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgZm91bmQgYW55dGhpbmcsIGlmIHdlIGRvIGZpbmQgaXQsIHdlIG11c3QgcmV2ZXJzZSB0aGVcclxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdHMgc28gd2UgZ2V0IHRoZSBcImxhc3RcIiBvbmUgaW4gY2FzZSB0aGVyZSBhcmUgbXVsdGlwbGUgaGl0c1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0clJlc3VsdCA9IG1hdGNoZXMucmV2ZXJzZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHN0clJlc3VsdCA9IHJlc3VsdHNbMV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RyUmVzdWx0ID09PSBudWxsIHx8IHN0clJlc3VsdCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IFwiXCJcclxuICAgICAgICAgICAgICAgIDogZGVjb2RlVVJJQ29tcG9uZW50KHN0clJlc3VsdC5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVpcmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5nZXQobmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChmb3VuZCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBSZXF1aXJlZCBwYXJhbWV0ZXIgKCR7bmFtZX0pIG1pc3NpbmcgZnJvbSB1cmwgLSBjYW5ub3QgY29udGludWVgO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBtZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5VcmwudHMiXSwic291cmNlUm9vdCI6IiJ9