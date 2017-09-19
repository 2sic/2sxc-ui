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
    window.$2sxc = __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Controller__["a" /* buildSxcController */]();


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
        var promise = $.ajax({
            async: true,
            dataType: settings.dataType || "json",
            data: JSON.stringify(settings.data),
            contentType: "application/json",
            type: settings.method,
            url: this.getActionUrl(settings),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ContentBlockId", this.cbid);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYyNjhiZGE5MjJlMmQxNmUyOTYiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvei5sb2FkbGFzdC4yc3hjLmFwaS50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuSW5zdGFuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLkRhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLldlYkFwaS50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuVG90YWxQb3B1cC50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuVXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3hENkM7QUFLN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2QsTUFBTSxDQUFDLEtBQUssR0FBRyxpRkFBcUIsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUNUMEQ7QUFDakQ7QUFDRjtBQTJDbEQsdUJBQXVCLEVBQXdC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Q0FBQyxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTO2NBQzlDLEVBQUU7Y0FDRixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBWTtRQUNoQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBTSxPQUFPLEdBQUcseUJBQXVCLElBQUkseUNBQXNDLENBQUM7WUFDbEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2YsTUFBTSxPQUFPLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiIyc3hjLmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM2MjY4YmRhOTIyZTJkMTZlMjk2IiwiLy8gdGhpcyBpcyB0aGUgMnN4Yy1qYXZhc2NyaXB0IEFQSVxyXG4vLyAyc3hjIHdpbGwgaW5jbHVkZSB0aGlzIGF1dG9tYXRpY2FsbHkgd2hlbiBhIHVzZXIgaGFzIGVkaXQtcmlnaHRzXHJcbi8vIGEgdGVtcGxhdGUgZGV2ZWxvcGVyIHdpbGwgdHlwaWNhbGx5IHVzZSB0aGlzIHRvIHVzZSB0aGUgZGF0YS1hcGkgdG8gcmVhZCAyc3hjLWRhdGEgZnJvbSB0aGUgc2VydmVyXHJcbi8vIHJlYWQgbW9yZSBhYm91dCB0aGlzIGluIHRoZSB3aWtpOiBodHRwczovL2dpdGh1Yi5jb20vMnNpYy8yc3hjL3dpa2kvSmF2YVNjcmlwdC0lMjQyc3hjXHJcblxyXG5pbXBvcnQgKiBhcyBDdCBmcm9tIFwiLi9Ub1NpYy5TeGMuQ29udHJvbGxlclwiO1xyXG5cclxuLy8gUmVTaGFycGVyIGRpc2FibGUgSW5jb25zaXN0ZW50TmFtaW5nXHJcbmRlY2xhcmUgY29uc3Qgd2luZG93OiBDdC5XaW5kb3c7XHJcblxyXG5pZiAoIXdpbmRvdy4kMnN4YykgLy8gcHJldmVudCBkb3VibGUgZXhlY3V0aW9uXHJcbiAgICB3aW5kb3cuJDJzeGMgPSBDdC5idWlsZFN4Y0NvbnRyb2xsZXIoKTtcclxuLy8gUmVTaGFycGVyIHJlc3RvcmUgSW5jb25zaXN0ZW50TmFtaW5nXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL3oubG9hZGxhc3QuMnN4Yy5hcGkudHMiLCIvLyBSZVNoYXJwZXIgZGlzYWJsZSBJbmNvbnNpc3RlbnROYW1pbmdcclxuXHJcbmltcG9ydCB7IFN4Y0luc3RhbmNlLCBTeGNJbnN0YW5jZVdpdGhFZGl0aW5nLCBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuSW5zdGFuY2VcIjtcclxuaW1wb3J0IHsgVG90YWxQb3B1cCB9IGZyb20gXCIuL1RvU2ljLlN4Yy5Ub3RhbFBvcHVwXCI7XHJcbmltcG9ydCB7IFVybFBhcmFtTWFuYWdlciB9IGZyb20gXCIuL1RvU2ljLlN4Yy5VcmxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2luZG93IHsgJDJzeGM6IFN4Y0NvbnRyb2xsZXIgfCBTeGNDb250cm9sbGVyV2l0aEludGVybmFsczsgfVxyXG5cclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcblxyXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogV2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgdGhlIG1haW4gJDJzeGMgb2JqZWN0IG9uIHRoZSB3aW5kb3dcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3hjQ29udHJvbGxlciB7XHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYSAyc3hjLWluc3RhbmNlIG9mIHRoZSBpZCBvciBodG1sLXRhZyBwYXNzZWQgaW5cclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHBhcmFtIGNiaWRcclxuICAgICAqIEByZXR1cm5zIHt9XHJcbiAgICAgKi9cclxuICAgIChpZDogbnVtYmVyIHwgSFRNTEVsZW1lbnQsIGNiaWQ/OiBudW1iZXIpOiBTeGNJbnN0YW5jZSB8IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHN5c3RlbSBpbmZvcm1hdGlvbiwgbWFpbmx5IGZvciBjaGVja2luZyB3aGljaCB2ZXJzaW9uIG9mIDJzeGMgaXMgcnVubmluZ1xyXG4gICAgICogbm90ZTogaXQncyBub3QgYWx3YXlzIHVwZGF0ZWQgcmVsaWFibHksIGJ1dCBpdCBoZWxwcyB3aGVuIGRlYnVnZ2luZ1xyXG4gICAgICovXHJcbiAgICBzeXNpbmZvOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdGhlIHZlcnNpb24gdXNpbmcgdGhlICMjLiMjLiMjIHN5bnRheFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnNpb246IHN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYSBzaG9ydCB0ZXh0IGRlc2NyaXB0aW9uLCBmb3IgcGVvcGxlIHdobyBoYXZlIG5vIGlkZWEgd2hhdCB0aGlzIGlzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXR1cm5zIGEgMnN4Yy1pbnN0YW5jZSBvZiB0aGUgaWQgb3IgaHRtbC10YWcgcGFzc2VkIGluXHJcbiAqIEBwYXJhbSBpZFxyXG4gKiBAcGFyYW0gY2JpZFxyXG4gKiBAcmV0dXJucyB7fVxyXG4gKi9cclxuZnVuY3Rpb24gU3hjQ29udHJvbGxlcihpZDogbnVtYmVyIHwgSFRNTEVsZW1lbnQsIGNiaWQ/OiBudW1iZXIpOiBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMge1xyXG4gICAgY29uc3QgJDJzeGMgPSB3aW5kb3cuJDJzeGMgYXMgU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHM7XHJcbiAgICBpZiAoISQyc3hjLl9jb250cm9sbGVycylcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIkMnN4YyBub3QgaW5pdGlhbGl6ZWQgeWV0XCIpO1xyXG5cclxuICAgIC8vIGlmIGl0J3MgYSBkb20tZWxlbWVudCwgdXNlIGF1dG8tZmluZFxyXG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIGNvbnN0IGlkVHVwbGUgPSBhdXRvRmluZChpZCk7XHJcbiAgICAgICAgaWQgPSBpZFR1cGxlWzBdO1xyXG4gICAgICAgIGNiaWQgPSBpZFR1cGxlWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2JpZCkgY2JpZCA9IGlkOyAgICAgICAgICAgLy8gaWYgY29udGVudC1ibG9jayBpcyB1bmtub3duLCB1c2UgaWQgb2YgbW9kdWxlXHJcbiAgICBjb25zdCBjYWNoZUtleSA9IGlkICsgXCI6XCIgKyBjYmlkOyAvLyBuZXV0cmFsaXplIHRoZSBpZCBmcm9tIG9sZCBcIjM0XCIgZm9ybWF0IHRvIHRoZSBuZXcgXCIzNTozNTNcIiBmb3JtYXRcclxuXHJcbiAgICAvLyBlaXRoZXIgZ2V0IHRoZSBjYWNoZWQgY29udHJvbGxlciBmcm9tIHByZXZpb3VzIGNhbGxzLCBvciBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICBpZiAoJDJzeGMuX2NvbnRyb2xsZXJzW2NhY2hlS2V5XSkgcmV0dXJuICQyc3hjLl9jb250cm9sbGVyc1tjYWNoZUtleV07XHJcblxyXG4gICAgLy8gYWxzbyBpbml0IHRoZSBkYXRhLWNhY2hlIGluIGNhc2UgaXQncyBldmVyIG5lZWRlZFxyXG4gICAgaWYgKCEkMnN4Yy5fZGF0YVtjYWNoZUtleV0pICQyc3hjLl9kYXRhW2NhY2hlS2V5XSA9IHt9O1xyXG5cclxuICAgIHJldHVybiAoJDJzeGMuX2NvbnRyb2xsZXJzW2NhY2hlS2V5XVxyXG4gICAgICAgID0gbmV3IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyhpZCwgY2JpZCwgY2FjaGVLZXksICQyc3hjLCAkLlNlcnZpY2VzRnJhbWV3b3JrKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBhIFNYQyBDb250cm9sbGVyIGZvciB0aGUgcGFnZS4gU2hvdWxkIG9ubHkgZXZlciBiZSBleGVjdXRlZCBvbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTeGNDb250cm9sbGVyKCk6IFN4Y0NvbnRyb2xsZXIgfCBTeGNDb250cm9sbGVyV2l0aEludGVybmFscyB7XHJcbiAgICBjb25zdCB1cmxNYW5hZ2VyID0gbmV3IFVybFBhcmFtTWFuYWdlcigpO1xyXG4gICAgY29uc3QgZGVidWcgPSB7XHJcbiAgICAgICAgbG9hZDogKHVybE1hbmFnZXIuZ2V0KFwiZGVidWdcIikgPT09IFwidHJ1ZVwiKSxcclxuICAgICAgICB1bmNhY2hlOiB1cmxNYW5hZ2VyLmdldChcInN4Y3ZlclwiKSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWRkT246IGFueSA9IHtcclxuICAgICAgICBfY29udHJvbGxlcnM6IHt9IGFzIGFueSxcclxuICAgICAgICBzeXNpbmZvOiB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMDkuMDUuMDJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIDJzeGMgQ29udHJvbGxlciBvYmplY3QgLSByZWFkIG1vcmUgYWJvdXQgaXQgb24gMnN4Yy5vcmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJldGE6IHt9LFxyXG4gICAgICAgIF9kYXRhOiB7fSxcclxuICAgICAgICAvLyB0aGlzIGNyZWF0ZXMgYSBmdWxsLXNjcmVlbiBpZnJhbWUtcG9wdXAgYW5kIHByb3ZpZGVzIGEgY2xvc2UtY29tbWFuZCB0byBmaW5pc2ggdGhlIGRpYWxvZyBhcyBuZWVkZWRcclxuICAgICAgICB0b3RhbFBvcHVwOiBuZXcgVG90YWxQb3B1cCgpLFxyXG4gICAgICAgIHVybFBhcmFtczogdXJsTWFuYWdlcixcclxuICAgICAgICAvLyBub3RlOiBJIHdvdWxkIGxpa2UgdG8gcmVtb3ZlIHRoaXMgZnJvbSAkMnN4YywgYnV0IGl0J3MgY3VycmVudGx5XHJcbiAgICAgICAgLy8gdXNlZCBib3RoIGluIHRoZSBpbnBhZ2UtZWRpdCBhbmQgaW4gdGhlIGRpYWxvZ3NcclxuICAgICAgICAvLyBkZWJ1ZyBzdGF0ZSB3aGljaCBpcyBuZWVkZWQgaW4gdmFyaW91cyBwbGFjZXNcclxuICAgICAgICBkZWJ1ZyxcclxuICAgICAgICAvLyBtaW5pLWhlbHBlcnMgdG8gbWFuYWdlIDJzeGMgcGFydHMsIGEgYml0IGxpa2UgYSBkZXBlbmRlbmN5IGxvYWRlclxyXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgb3B0aW1pemUgdG8gbG9hZCBtaW4vbWF4IGRlcGVuZGluZyBvbiBkZWJ1ZyBzdGF0ZVxyXG4gICAgICAgIHBhcnRzOiB7XHJcbiAgICAgICAgICAgIGdldFVybCh1cmw6IHN0cmluZywgcHJldmVudFVubWluOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgciA9IChwcmV2ZW50VW5taW4gfHwgIWRlYnVnLmxvYWQpID8gdXJsIDogdXJsLnJlcGxhY2UoXCIubWluXCIsIFwiXCIpOyAvLyB1c2UgbWluIG9yIG5vdFxyXG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnLnVuY2FjaGUgJiYgci5pbmRleE9mKFwic3hjdmVyXCIpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICByID0gciArICgoci5pbmRleE9mKFwiP1wiKSA9PT0gLTEpID8gXCI/XCIgOiBcIiZcIikgKyBcInN4Y3Zlcj1cIiArIGRlYnVnLnVuY2FjaGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gYWRkT24pXHJcbiAgICAgICAgaWYgKGFkZE9uLmhhc093blByb3BlcnR5KHByb3BlcnR5KSlcclxuICAgICAgICAgICAgU3hjQ29udHJvbGxlcltwcm9wZXJ0eV0gPSBhZGRPbltwcm9wZXJ0eV0gYXMgYW55O1xyXG4gICAgcmV0dXJuIFN4Y0NvbnRyb2xsZXIgYXMgYW55IGFzIFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhdXRvRmluZChkb21FbGVtZW50OiBIVE1MRWxlbWVudCk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgY29uc3QgY29udGFpbmVyVGFnID0gJChkb21FbGVtZW50KS5jbG9zZXN0KFwiLnNjLWNvbnRlbnQtYmxvY2tcIilbMF07XHJcbiAgICBpZiAoIWNvbnRhaW5lclRhZykgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBpaWQgPSBjb250YWluZXJUYWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYi1pbnN0YW5jZVwiKTtcclxuICAgIGNvbnN0IGNiaWQgPSBjb250YWluZXJUYWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYi1pZFwiKTtcclxuICAgIGlmICghaWlkIHx8ICFjYmlkKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBbaWlkLCBjYmlkXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTeGNDb250cm9sbGVyV2l0aEludGVybmFscyBleHRlbmRzIFN4Y0NvbnRyb2xsZXIge1xyXG4gICAgKGlkOiBudW1iZXIgfCBIVE1MRWxlbWVudCwgY2JpZD86IG51bWJlcik6IFN4Y0luc3RhbmNlIHwgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzO1xyXG4gICAgdG90YWxQb3B1cDogVG90YWxQb3B1cDtcclxuICAgIHVybFBhcmFtczogVXJsUGFyYW1NYW5hZ2VyO1xyXG4gICAgYmV0YTogYW55O1xyXG4gICAgX2NvbnRyb2xsZXJzOiBhbnk7XHJcbiAgICBfZGF0YTogYW55O1xyXG4gICAgX21hbmFnZTogYW55O1xyXG4gICAgX3RyYW5zbGF0ZUluaXQ6IGFueTtcclxuICAgIGRlYnVnOiBhbnk7XHJcbiAgICBwYXJ0czogYW55O1xyXG5cclxufVxyXG5cclxuLy8gUmVTaGFycGVyIHJlc3RvcmUgSW5jb25zaXN0ZW50TmFtaW5nXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5Db250cm9sbGVyLnRzIiwiXHJcbmltcG9ydCB7IFN4Y0NvbnRyb2xsZXIsIFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLkNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgU3hjRGF0YVdpdGhJbnRlcm5hbHMgfSBmcm9tIFwiLi9Ub1NpYy5TeGMuRGF0YVwiO1xyXG5pbXBvcnQgeyBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLldlYkFwaVwiO1xyXG4vKipcclxuICogVGhlIHR5cGljYWwgc3hjLWluc3RhbmNlIG9iamVjdCBmb3IgYSBzcGVjaWZpYyBETk4gbW9kdWxlIG9yIGNvbnRlbnQtYmxvY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZSB7XHJcbiAgICAvKipcclxuICAgICAqIGhlbHBlcnMgZm9yIGFqYXggY2FsbHNcclxuICAgICAqL1xyXG4gICAgd2ViQXBpOiBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzO1xyXG4gICAgcHJvdGVjdGVkIHNlcnZpY2VSb290OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2VTY29wZXMgPSBbXCJhcHBcIiwgXCJhcHAtc3lzXCIsIFwiYXBwLWFwaVwiLCBcImFwcC1xdWVyeVwiLCBcImFwcC1jb250ZW50XCIsIFwiZWF2XCIsIFwidmlld1wiLCBcImRublwiXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0aGUgc3hjLWluc3RhbmNlIElELCB3aGljaCBpcyB1c3VhbGx5IHRoZSBETk4gTW9kdWxlIElkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGlkOiBudW1iZXIsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNvbnRlbnQtYmxvY2sgSUQsIHdoaWNoIGlzIGVpdGhlciB0aGUgbW9kdWxlIElELCBvciB0aGUgY29udGVudC1ibG9jayBkZWZpbml0aWlvbiBlbnRpdHkgSURcclxuICAgICAgICAgKiB0aGlzIGlzIGFuIGFkdmFuY2VkIGNvbmNlcHQgeW91IHVzdWFsbHkgZG9uJ3QgY2FyZSBhYm91dCwgb3RoZXJ3aXNlIHlvdSBzaG91bGQgcmVzZWFyY2ggaXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkbm5TZjogYW55LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlUm9vdCA9IGRublNmKGlkKS5nZXRTZXJ2aWNlUm9vdChcIjJzeGNcIik7XHJcbiAgICAgICAgdGhpcy53ZWJBcGkgPSBuZXcgU3hjV2ViQXBpV2l0aEludGVybmFscyh0aGlzLCBpZCwgY2JpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0cyBhIHNob3J0IGFwaS1jYWxsIHBhdGggbGlrZSBcIi9hcHAvQmxvZy9xdWVyeS94eXpcIiB0byB0aGUgRE5OIGZ1bGwgcGF0aFxyXG4gICAgICogd2hpY2ggdmFyaWVzIGZyb20gaW5zdGFsbGF0aW9uIHRvIGluc3RhbGxhdGlvbiBsaWtlIFwiL2Rlc2t0b3Btb2R1bGVzL2FwaS8yc3hjL2FwcC8uLi5cIlxyXG4gICAgICogQHBhcmFtIHZpcnR1YWxQYXRoXHJcbiAgICAgKiBAcmV0dXJucyBtYXBwZWQgcGF0aFxyXG4gICAgICovXHJcbiAgICByZXNvbHZlU2VydmljZVVybCh2aXJ0dWFsUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB2aXJ0dWFsUGF0aC5zcGxpdChcIi9cIilbMF0udG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcCBpZiBpdCdzIG5vdCBvbmUgb2Ygb3VyIHNwZWNpYWwgcGF0aHNcclxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlU2NvcGVzLmluZGV4T2Yoc2NvcGUpID09PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuIHZpcnR1YWxQYXRoO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlUm9vdCArIHNjb3BlICsgXCIvXCIgKyB2aXJ0dWFsUGF0aC5zdWJzdHJpbmcodmlydHVhbFBhdGguaW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gU2hvdyBhIG5pY2UgZXJyb3Igd2l0aCBtb3JlIGluZm9zIGFyb3VuZCAyc3hjXHJcbiAgICBzaG93RGV0YWlsZWRIdHRwRXJyb3IocmVzdWx0OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IDQwNCAmJlxyXG4gICAgICAgICAgICByZXN1bHQuY29uZmlnICYmXHJcbiAgICAgICAgICAgIHJlc3VsdC5jb25maWcudXJsICYmXHJcbiAgICAgICAgICAgIHJlc3VsdC5jb25maWcudXJsLmluZGV4T2YoXCIvZGlzdC9pMThuL1wiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianVzdCBmeWk6IGZhaWxlZCB0byBsb2FkIGxhbmd1YWdlIHJlc291cmNlOyB3aWxsIGhhdmUgdG8gdXNlIGRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgaXQncyBhbiB1bnNwZWNpZmllZCAwLWVycm9yLCBpdCdzIHByb2JhYmx5IG5vdCBhbiBlcnJvciBidXQgYSBjYW5jZWxsZWQgcmVxdWVzdCxcclxuICAgICAgICAvLyAoaGFwcGVucyB3aGVuIGNsb3NpbmcgcG9wdXBzIGNvbnRhaW5pbmcgYW5ndWxhckpTKVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAwIHx8IHJlc3VsdC5zdGF0dXMgPT09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICAvLyBsZXQncyB0cnkgdG8gc2hvdyBnb29kIG1lc3NhZ2VzIGluIG1vc3QgY2FzZXNcclxuICAgICAgICBsZXQgaW5mb1RleHQgPSBcIkhhZCBhbiBlcnJvciB0YWxraW5nIHRvIHRoZSBzZXJ2ZXIgKHN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMgKyBcIikuXCI7XHJcbiAgICAgICAgY29uc3Qgc3J2UmVzcCA9IHJlc3VsdC5yZXNwb25zZVRleHRcclxuICAgICAgICAgICAgPyBKU09OLnBhcnNlKHJlc3VsdC5yZXNwb25zZVRleHQpIC8vIGZvciBqcXVlcnkgYWpheCBlcnJvcnNcclxuICAgICAgICAgICAgOiByZXN1bHQuZGF0YTsgLy8gZm9yIGFuZ3VsYXIgJGh0dHBcclxuICAgICAgICBpZiAoc3J2UmVzcCkge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBzcnZSZXNwLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIGluZm9UZXh0ICs9IFwiXFxuTWVzc2FnZTogXCIgKyBtc2c7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZ0RldCA9IHNydlJlc3AuTWVzc2FnZURldGFpbCB8fCBzcnZSZXNwLkV4Y2VwdGlvbk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmIChtc2dEZXQpIGluZm9UZXh0ICs9IFwiXFxuRGV0YWlsOiBcIiArIG1zZ0RldDtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobXNnRGV0ICYmIG1zZ0RldC5pbmRleE9mKFwiTm8gYWN0aW9uIHdhcyBmb3VuZFwiKSA9PT0gMClcclxuICAgICAgICAgICAgICAgIGlmIChtc2dEZXQuaW5kZXhPZihcInRoYXQgbWF0Y2hlcyB0aGUgbmFtZVwiKSA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgKz0gXCJcXG5cXG5UaXAgZnJvbSAyc3hjOiB5b3UgcHJvYmFibHkgZ290IHRoZSBhY3Rpb24tbmFtZSB3cm9uZyBpbiB5b3VyIEpTLlwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobXNnRGV0LmluZGV4T2YoXCJ0aGF0IG1hdGNoZXMgdGhlIHJlcXVlc3QuXCIpID4gMClcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCArPSBcIlxcblxcblRpcCBmcm9tIDJzeGM6IFNlZW1zIGxpa2UgdGhlIHBhcmFtZXRlcnMgYXJlIHRoZSB3cm9uZyBhbW91bnQgb3IgdHlwZS5cIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChtc2cgJiYgbXNnLmluZGV4T2YoXCJDb250cm9sbGVyXCIpID09PSAwICYmIG1zZy5pbmRleE9mKFwibm90IGZvdW5kXCIpID4gMClcclxuICAgICAgICAgICAgICAgIGluZm9UZXh0ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuXFxuVGlwIGZyb20gMnN4YzogeW91IHByb2JhYmx5IHNwZWxsZWQgdGhlIGNvbnRyb2xsZXIgbmFtZSB3cm9uZyBvciBmb3Jnb3QgdG8gcmVtb3ZlIHRoZSB3b3JkICdjb250cm9sbGVyJyBmcm9tIHRoZSBjYWxsIGluIEpTLiBUbyBjYWxsIGEgY29udHJvbGxlciBjYWxsZWQgJ0RlbW9Db250cm9sbGVyJyBvbmx5IHVzZSAnRGVtbycuXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgaW5mb1RleHQgKz0gXCJcXG5cXG5pZiB5b3UgYXJlIGFuIGFkdmFuY2VkIHVzZXIgeW91IGNhbiBsZWFybiBtb3JlIGFib3V0IHdoYXQgd2VudCB3cm9uZyAtIGRpc2NvdmVyIGhvdyBvbiAyc3hjLm9yZy9oZWxwP3RhZz1kZWJ1Z1wiO1xyXG4gICAgICAgIGFsZXJ0KGluZm9UZXh0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuaGFuY2VkIHN4YyBpbnN0YW5jZSB3aXRoIGFkZGl0aW9uYWwgZWRpdGluZyBmdW5jdGlvbmFsaXR5XHJcbiAqIFVzZSB0aGlzLCBpZiB5b3UgaW50ZW5kIHRvIHJ1biBjb250ZW50LW1hbmFnZW1lbnQgY29tbWFuZHMgbGlrZSBcImVkaXRcIiBmcm9tIHlvdXIgSlMgZGlyZWN0bHlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZVdpdGhFZGl0aW5nIGV4dGVuZHMgU3hjSW5zdGFuY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBtYW5hZ2Ugb2JqZWN0IHdoaWNoIHByb3ZpZGVzIGFjY2VzcyB0byBhZGRpdGlvbmFsIGNvbnRlbnQtbWFuYWdlbWVudCBmZWF0dXJlc1xyXG4gICAgICogaXQgb25seSBleGlzdHMgaWYgMnN4YyBpcyBpbiBlZGl0IG1vZGUgKG90aGVyd2lzZSB0aGUgSlMgYXJlIG5vdCBpbmNsdWRlZCBmb3IgdGhlc2UgZmVhdHVyZXMpXHJcbiAgICAgKi9cclxuICAgIG1hbmFnZTogYW55ID0gbnVsbDsgLy8gaW5pdGlhbGl6ZSBjb3JyZWN0bHkgbGF0ZXIgb25cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgIHByb3RlY3RlZCAkMnN4YzogU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHMsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRublNmOiBhbnksXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihpZCwgY2JpZCwgZG5uU2YpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbWFuYWdlIHByb3BlcnR5LCBidXQgbm90IHdpdGhpbiBpbml0aWFsaXplciwgYmVjYXVzZSBpbnNpZGUgdGhlIG1hbmFnZS1pbml0aWFsaXplciBpdCBtYXkgcmVmZXJlbmNlIDJzeGMgYWdhaW5cclxuICAgICAgICB0cnkgeyAvLyBzb21ldGltZXMgdGhlIG1hbmFnZSBjYW4ndCBiZSBidWlsdCwgbGlrZSBiZWZvcmUgaW5zdGFsbGluZ1xyXG4gICAgICAgICAgICBpZiAoJDJzeGMuX21hbmFnZSkgJDJzeGMuX21hbmFnZS5pbml0SW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcyBvbmx5IHdvcmtzIHdoZW4gbWFuYWdlIGV4aXN0cyAobm90IGluc3RhbGxpbmcpIGFuZCB0cmFuc2xhdG9yIGV4aXN0cyB0b29cclxuICAgICAgICBpZiAoJDJzeGMuX3RyYW5zbGF0ZUluaXQgJiYgdGhpcy5tYW5hZ2UpICQyc3hjLl90cmFuc2xhdGVJbml0KHRoaXMubWFuYWdlKTsgICAgLy8gaW5pdCB0cmFuc2xhdGUsIG5vdCByZWFsbHkgbmljZSwgYnV0IG9rIGZvciBub3dcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja3MgaWYgd2UncmUgY3VycmVudGx5IGluIGVkaXQgbW9kZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzRWRpdE1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlICYmIHRoaXMubWFuYWdlLl9pc0VkaXRNb2RlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzIGV4dGVuZHMgU3hjSW5zdGFuY2VXaXRoRWRpdGluZyB7XHJcbiAgICBkYXRhOiBTeGNEYXRhV2l0aEludGVybmFscztcclxuICAgIHNvdXJjZTogYW55ID0gbnVsbDtcclxuICAgIGlzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsYXN0UmVmcmVzaDogRGF0ZSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGlkOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGNiaWQ6IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIGNhY2hlS2V5OiBzdHJpbmcsXHJcbiAgICAgICAgcHJvdGVjdGVkICQyc3hjOiBTeGNDb250cm9sbGVyV2l0aEludGVybmFscyxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG5uU2Y6IGFueSxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKGlkLCBjYmlkLCAkMnN4YywgZG5uU2YpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBTeGNEYXRhV2l0aEludGVybmFscyh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZWNyZWF0ZShyZXNldENhY2hlOiBib29sZWFuKTogU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICBpZiAocmVzZXRDYWNoZSkgZGVsZXRlIHRoaXMuJDJzeGMuX2NvbnRyb2xsZXJzW3RoaXMuY2FjaGVLZXldOyAvLyBjbGVhciBjYWNoZVxyXG4gICAgICAgIHJldHVybiB0aGlzLiQyc3hjKHRoaXMuaWQsIHRoaXMuY2JpZCkgYXMgYW55IGFzIFN4Y0luc3RhbmNlV2l0aEludGVybmFsczsgLy8gZ2VuZXJhdGUgbmV3XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLkluc3RhbmNlLnRzIiwiaW1wb3J0IHsgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzIH0gZnJvbSBcIi4vVG9TaWMuU3hjLkluc3RhbmNlXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3hjRGF0YVdpdGhJbnRlcm5hbHMge1xyXG4gICAgc291cmNlOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgLy8gaW4tc3RyZWFtc1xyXG4gICAgXCJpblwiOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvLyB3aWxsIGhvbGQgdGhlIGRlZmF1bHQgc3RyZWFtIChbXCJpblwiXVtcIkRlZmF1bHRcIl0uTGlzdFxyXG4gICAgTGlzdDogYW55ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjb250cm9sbGVyOiBTeGNJbnN0YW5jZVdpdGhJbnRlcm5hbHMsXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc291cmNlIHBhdGggZGVmYXVsdGluZyB0byBjdXJyZW50IHBhZ2UgKyBvcHRpb25hbCBwYXJhbXNcclxuICAgIHNvdXJjZVVybChwYXJhbXM/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmNvbnRyb2xsZXIucmVzb2x2ZVNlcnZpY2VVcmwoXCJhcHAtc3lzL2FwcGNvbnRlbnQvR2V0Q29udGVudEJsb2NrRGF0YVwiKTtcclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJzdHJpbmdcIikgLy8gdGV4dCBsaWtlICdpZD03J1xyXG4gICAgICAgICAgICB1cmwgKz0gXCImXCIgKyBwYXJhbXM7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gbG9hZCBkYXRhIHZpYSBhamF4XHJcbiAgICBsb2FkKHNvdXJjZT86IGFueSkge1xyXG4gICAgICAgIC8vIGlmIHNvdXJjZSBpcyBhbHJlYWR5IHRoZSBkYXRhLCBzZXQgaXRcclxuICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5MaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIDIwMTctMDktMDUgMmRtOiBkaXNjb3ZlcmQgYSBjYWxsIHRvIGFuIGluZXhpc3RpbmcgZnVuY3Rpb25cclxuICAgICAgICAgICAgLy8gc2luY2UgdGhpcyBpcyBhbiBvbGQgQVBJIHdoaWNoIGlzIGJlaW5nIGRlcHJlY2F0ZWQsIHBsZWFzZSBkb24ndCBmaXggdW5sZXNzIHdlIGdldCBhY3RpdmUgZmVlZGJhY2tcclxuICAgICAgICAgICAgLy8gY29udHJvbGxlci5kYXRhLnNldERhdGEoc291cmNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5kYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghc291cmNlKVxyXG4gICAgICAgICAgICAgICAgc291cmNlID0ge307XHJcbiAgICAgICAgICAgIGlmICghc291cmNlLnVybClcclxuICAgICAgICAgICAgICAgIHNvdXJjZS51cmwgPSB0aGlzLmNvbnRyb2xsZXIuZGF0YS5zb3VyY2VVcmwoKTtcclxuICAgICAgICAgICAgc291cmNlLm9yaWdTdWNjZXNzID0gc291cmNlLnN1Y2Nlc3M7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zdWNjZXNzID0gKGRhdGE6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGF0YVNldE5hbWUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRhdGFTZXROYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbZGF0YVNldE5hbWVdLkxpc3QgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5kYXRhLmluW2RhdGFTZXROYW1lXSA9IGRhdGFbZGF0YVNldE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRhdGEuaW5bZGF0YVNldE5hbWVdLm5hbWUgPSBkYXRhU2V0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuZGF0YS5pbi5EZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIwMTctMDktMDUgMmRtOiBwcmV2aW91c2x5IHdyb3RlIGl0IHRvIGNvbnRyb2xsZXIuTGlzdCwgYnV0IHRoaXMgaXMgYWxtb3N0IGNlcnRhaW5seSBhIG1pc3Rha2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCdzIGFuIG9sZCBBUEkgd2hpY2ggaXMgYmVpbmcgZGVwcmVjYXRlZCwgd2Ugd29uJ3QgZml4IGl0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MaXN0ID0gdGhpcy5pbi5EZWZhdWx0Lkxpc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5vcmlnU3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uub3JpZ1N1Y2Nlc3ModGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmlzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5sYXN0UmVmcmVzaCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAodGhpcyBhcyBhbnkpLl90cmlnZ2VyTG9hZGVkKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNvdXJjZS5lcnJvciA9IChyZXF1ZXN0OiBhbnkpID0+IHsgYWxlcnQocmVxdWVzdC5zdGF0dXNUZXh0KTsgfTtcclxuICAgICAgICAgICAgc291cmNlLnByZXZlbnRBdXRvRmFpbCA9IHRydWU7IC8vIHVzZSBvdXIgZmFpbCBtZXNzYWdlXHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVsb2FkKCk6IFN4Y0RhdGFXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIud2ViQXBpLmdldCh0aGlzLnNvdXJjZSlcclxuICAgICAgICAgICAgLnRoZW4odGhpcy5zb3VyY2Uuc3VjY2VzcywgdGhpcy5zb3VyY2UuZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9uKGV2ZW50czogRXZlbnQsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gJCh0aGlzKS5iaW5kKFwiMnNjTG9hZFwiLCBjYWxsYmFjaylbMF0uX3RyaWdnZXJMb2FkZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfdHJpZ2dlckxvYWRlZCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuaXNMb2FkZWRcclxuICAgICAgICAgICAgPyAkKHRoaXMpLnRyaWdnZXIoXCIyc2NMb2FkXCIsIFt0aGlzXSlbMF1cclxuICAgICAgICAgICAgOiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9uZShldmVudHM6IEV2ZW50LCBjYWxsYmFjazogKHg6IGFueSwgeTogYW55KSA9PiB2b2lkKTogU3hjRGF0YVdpdGhJbnRlcm5hbHMge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250cm9sbGVyLmlzTG9hZGVkKVxyXG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vbmUoXCIyc2NMb2FkXCIsIGNhbGxiYWNrKVswXTtcclxuICAgICAgICBjYWxsYmFjayh7fSwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLkRhdGEudHMiLCJcclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcbmltcG9ydCB7IFN4Y0luc3RhbmNlIH0gZnJvbSBcIi4vVG9TaWMuU3hjLkluc3RhbmNlXCI7XHJcblxyXG4vKipcclxuICogaGVscGVyIEFQSSB0byBydW4gYWpheCAvIFJFU1QgY2FsbHMgdG8gdGhlIHNlcnZlclxyXG4gKiBpdCB3aWxsIGVuc3VyZSB0aGF0IHRoZSBoZWFkZXJzIGV0Yy4gYXJlIHNldCBjb3JyZWN0bHlcclxuICogYW5kIHRoYXQgdXJscyBhcmUgcmV3cml0dGVuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3hjV2ViQXBpV2l0aEludGVybmFscyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRyb2xsZXI6IFN4Y0luc3RhbmNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaWQ6IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNiaWQ6IG51bWJlcixcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyBhbiBodHRwLWdldCBwcm9taXNlXHJcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NPclVybCB0aGUgdXJsIHRvIGdldFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBqUXVlcnkgc3R5bGUgYWpheCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBqUXVlcnkgc3R5bGUgZGF0YSBmb3IgcG9zdC9wdXQgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBwcmV2ZW50QXV0b0ZhaWxcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBqUXVlcnkgYWpheCBwcm9taXNlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBnZXQoc2V0dGluZ3NPclVybDogc3RyaW5nIHwgYW55LCBwYXJhbXM/OiBhbnksIGRhdGE/OiBhbnksIHByZXZlbnRBdXRvRmFpbD86IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3Qoc2V0dGluZ3NPclVybCwgcGFyYW1zLCBkYXRhLCBwcmV2ZW50QXV0b0ZhaWwsIFwiR0VUXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJucyBhbiBodHRwLWdldCBwcm9taXNlXHJcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NPclVybCB0aGUgdXJsIHRvIGdldFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBqUXVlcnkgc3R5bGUgYWpheCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBqUXVlcnkgc3R5bGUgZGF0YSBmb3IgcG9zdC9wdXQgcmVxdWVzdHNcclxuICAgICAqIEBwYXJhbSBwcmV2ZW50QXV0b0ZhaWxcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBqUXVlcnkgYWpheCBwcm9taXNlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwb3N0KHNldHRpbmdzT3JVcmw6IHN0cmluZyB8IGFueSwgcGFyYW1zPzogYW55LCBkYXRhPzogYW55LCBwcmV2ZW50QXV0b0ZhaWw/OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHNldHRpbmdzT3JVcmwsIHBhcmFtcywgZGF0YSwgcHJldmVudEF1dG9GYWlsLCBcIlBPU1RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAqIEBwYXJhbSBzZXR0aW5nc09yVXJsIHRoZSB1cmwgdG8gZ2V0XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHByZXZlbnRBdXRvRmFpbFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZShzZXR0aW5nc09yVXJsOiBzdHJpbmcgfCBhbnksIHBhcmFtcz86IGFueSwgZGF0YT86IGFueSwgcHJldmVudEF1dG9GYWlsPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChzZXR0aW5nc09yVXJsLCBwYXJhbXMsIGRhdGEsIHByZXZlbnRBdXRvRmFpbCwgXCJERUxFVEVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAqIEBwYXJhbSBzZXR0aW5nc09yVXJsIHRoZSB1cmwgdG8gZ2V0XHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHByZXZlbnRBdXRvRmFpbFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1dChzZXR0aW5nc09yVXJsOiBzdHJpbmcgfCBhbnksIHBhcmFtcz86IGFueSwgZGF0YT86IGFueSwgcHJldmVudEF1dG9GYWlsPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChzZXR0aW5nc09yVXJsLCBwYXJhbXMsIGRhdGEsIHByZXZlbnRBdXRvRmFpbCwgXCJQVVRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXF1ZXN0KHNldHRpbmdzOiBzdHJpbmcgfCBhbnksIHBhcmFtczogYW55LCBkYXRhOiBhbnksIHByZXZlbnRBdXRvRmFpbDogYm9vbGVhbiwgbWV0aG9kOiBzdHJpbmcpOiBhbnkge1xyXG5cclxuICAgICAgICAvLyB1cmwgcGFyYW1ldGVyOiBhdXRvY29udmVydCBhIHNpbmdsZSB2YWx1ZSAoaW5zdGVhZCBvZiBvYmplY3Qgb2YgdmFsdWVzKSB0byBhbiBpZD0uLi4gcGFyYW1ldGVyXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmN1cmx5XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHBhcmFtcyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgcGFyYW1zID0geyBpZDogcGFyYW1zIH07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIHJlc29sdmUgc2V0dGluZ3NcclxuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xsZXJBY3Rpb24gPSBzZXR0aW5ncy5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xsZXJOYW1lID0gY29udHJvbGxlckFjdGlvblswXTtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9uTmFtZSA9IGNvbnRyb2xsZXJBY3Rpb25bMV07XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udHJvbGxlck5hbWUgPT09IFwiXCIgfHwgYWN0aW9uTmFtZSA9PT0gXCJcIilcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3I6IGNvbnRyb2xsZXIgb3IgYWN0aW9uIG5vdCBkZWZpbmVkLiBXaWxsIGNvbnRpbnVlIHdpdGggbGlrZWx5IGVycm9ycy5cIik7XHJcblxyXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgIHVybDogY29udHJvbGxlckFjdGlvbi5sZW5ndGggPiAyID8gc2V0dGluZ3MgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcHJldmVudEF1dG9GYWlsLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kID09PSBudWxsID8gXCJQT1NUXCIgOiBtZXRob2QsXHJcbiAgICAgICAgICAgIHBhcmFtczogbnVsbCBhcyBhbnksXHJcbiAgICAgICAgICAgIHByZXZlbnRBdXRvRmFpbDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpO1xyXG4gICAgICAgIGNvbnN0IHNmID0gJC5TZXJ2aWNlc0ZyYW1ld29yayh0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogc2V0dGluZ3MuZGF0YVR5cGUgfHwgXCJqc29uXCIsIC8vIGRlZmF1bHQgaXMganNvbiBpZiBub3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLmRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IHNldHRpbmdzLm1ldGhvZCxcclxuICAgICAgICAgICAgdXJsOiB0aGlzLmdldEFjdGlvblVybChzZXR0aW5ncyksXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQoeGhyOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudEJsb2NrSWRcIiwgdGhpcy5jYmlkKTtcclxuICAgICAgICAgICAgICAgIHNmLnNldE1vZHVsZUhlYWRlcnMoeGhyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5wcmV2ZW50QXV0b0ZhaWwpXHJcbiAgICAgICAgICAgIHByb21pc2UuZmFpbCh0aGlzLmNvbnRyb2xsZXIuc2hvd0RldGFpbGVkSHR0cEVycm9yKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBY3Rpb25Vcmwoc2V0dGluZ3M6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc2YgPSAkLlNlcnZpY2VzRnJhbWV3b3JrKHRoaXMuaWQpO1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSAoc2V0dGluZ3MudXJsKVxyXG4gICAgICAgICAgICA/IHRoaXMuY29udHJvbGxlci5yZXNvbHZlU2VydmljZVVybChzZXR0aW5ncy51cmwpXHJcbiAgICAgICAgICAgIDogc2YuZ2V0U2VydmljZVJvb3QoXCIyc3hjXCIpICsgXCJhcHAvYXV0by9hcGkvXCIgKyBzZXR0aW5ncy5jb250cm9sbGVyICsgXCIvXCIgKyBzZXR0aW5ncy5hY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIGJhc2UgKyAoc2V0dGluZ3MucGFyYW1zID09PSBudWxsID8gXCJcIiA6IChcIj9cIiArICQucGFyYW0oc2V0dGluZ3MucGFyYW1zKSkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuV2ViQXBpLnRzIiwiXHJcbmV4cG9ydCBjbGFzcyBUb3RhbFBvcHVwIHtcclxuICAgIGZyYW1lOiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgICBjYWxsYmFjazogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIG9wZW4odXJsOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY291bnQgcGFyZW50cyB0byBzZWUgaG93IGhpZ2ggdGhlIHotaW5kZXggbmVlZHMgdG8gYmVcclxuICAgICAgICBsZXQgeiA9IDEwMDAwMDEwOyAvLyBOZWVkcyBhdCBsZWFzdCAxMDAwMDAwMCB0byBiZSBvbiB0b3Agb2YgdGhlIEROTjkgYmFyXHJcbiAgICAgICAgbGV0IHAgPSB3aW5kb3c7XHJcbiAgICAgICAgd2hpbGUgKHAgIT09IHdpbmRvdy50b3AgJiYgeiA8IDEwMDAwMTAwKSB7XHJcbiAgICAgICAgICAgIHorKztcclxuICAgICAgICAgICAgcCA9IHAucGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIiB0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7IHBvc2l0aW9uOmZpeGVkOyB6LWluZGV4OlwiICsgeik7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWZybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJhbGxvd3RyYW5zcGFyZW5jeVwiLCBcInRydWVcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRvcDogMDtsZWZ0OiAwO3dpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIik7XHJcbiAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdXJsKTtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlmcm0pO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9IFwiIHN4Yy1wb3B1cC1vcGVuXCI7XHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IGlmcm07XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZyYW1lKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZShcInN4Yy1wb3B1cC1vcGVuXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmcm0gPSB0aGlzLmZyYW1lO1xyXG4gICAgICAgICAgICBmcm0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZybS5wYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVRoaXMoKTogdm9pZCB7XHJcbiAgICAgICAgKHdpbmRvdy5wYXJlbnQgYXMgYW55KS4kMnN4Yy50b3RhbFBvcHVwLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5Ub3RhbFBvcHVwLnRzIiwiXHJcbiAgICBleHBvcnQgY2xhc3MgVXJsUGFyYW1NYW5hZ2VyIHtcclxuICAgICAgICBnZXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIHdhcm5pbmc6IHRoaXMgbWV0aG9kIGlzIGR1cGxpY2F0ZWQgaW4gMiBwbGFjZXMgLSBrZWVwIHRoZW0gaW4gc3luYy5cclxuICAgICAgICAgICAgLy8gbG9jYXRpb25zIGFyZSBlYXYgYW5kIDJzeGM0bmdcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXVwiKTtcclxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoUnggPSBuZXcgUmVnRXhwKFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiLCBcImlcIik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gc2VhcmNoUnguZXhlYyhsb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgICAgICAgICBsZXQgc3RyUmVzdWx0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzaFJ4ID0gbmV3IFJlZ0V4cChcIlsjJl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiLCBcImlcIik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gaGFzaFJ4LmV4ZWMobG9jYXRpb24uaGFzaCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIG5vdGhpbmcgZm91bmQsIHRyeSBub3JtYWwgVVJMIGJlY2F1c2UgRE5OIHBsYWNlcyBwYXJhbWV0ZXJzIGluIC9rZXkvdmFsdWUgbm90YXRpb25cclxuICAgICAgICAgICAgaWYgKHJlc3VsdHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0cnkgcGFydHMgb2YgdGhlIFVSTFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChuZXcgUmVnRXhwKFwiL1wiICsgbmFtZSArIFwiLyhbXi9dKylcIiwgXCJpXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBmb3VuZCBhbnl0aGluZywgaWYgd2UgZG8gZmluZCBpdCwgd2UgbXVzdCByZXZlcnNlIHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBzbyB3ZSBnZXQgdGhlIFwibGFzdFwiIG9uZSBpbiBjYXNlIHRoZXJlIGFyZSBtdWx0aXBsZSBoaXRzXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyUmVzdWx0ID0gbWF0Y2hlcy5yZXZlcnNlKClbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RyUmVzdWx0ID0gcmVzdWx0c1sxXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJSZXN1bHQgPT09IG51bGwgfHwgc3RyUmVzdWx0ID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gXCJcIlxyXG4gICAgICAgICAgICAgICAgOiBkZWNvZGVVUklDb21wb25lbnQoc3RyUmVzdWx0LnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWlyZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLmdldChuYW1lKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYFJlcXVpcmVkIHBhcmFtZXRlciAoJHtuYW1lfSkgbWlzc2luZyBmcm9tIHVybCAtIGNhbm5vdCBjb250aW51ZWA7XHJcbiAgICAgICAgICAgICAgICBhbGVydChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLlVybC50cyJdLCJzb3VyY2VSb290IjoiIn0=