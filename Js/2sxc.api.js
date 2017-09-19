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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Data__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ToSic_Sxc_Data__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_Instance__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_Instance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ToSic_Sxc_Instance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToSic_Sxc_TotalPopup__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ToSic_Sxc_TotalPopup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ToSic_Sxc_TotalPopup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToSic_Sxc_Url__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToSic_Sxc_Url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ToSic_Sxc_Url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToSic_Sxc_WebApi__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToSic_Sxc_WebApi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ToSic_Sxc_WebApi__);





if (!window.$2sxc)
    window.$2sxc = ToSic.Sxc.buildSxcController();


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

var ToSic;
(function (ToSic) {
    var Sxc;
    (function (Sxc) {
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
                this.webApi = new Sxc.SxcWebApiWithInternals(this, id, cbid);
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
                _this.data = new Sxc.SxcDataWithInternals(_this);
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
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var ToSic;
(function (ToSic) {
    var Sxc;
    (function (Sxc) {
        var TotalPopup = (function () {
            function TotalPopup() {
                this.frame = undefined;
                this.callback = undefined;
            }
            TotalPopup.prototype.open = function (url, callback) {
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
        Sxc.TotalPopup = TotalPopup;
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var ToSic;
(function (ToSic) {
    var Sxc;
    (function (Sxc) {
        var UrlParamManager = (function () {
            function UrlParamManager() {
            }
            UrlParamManager.prototype.get = function (name) {
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
        Sxc.UrlParamManager = UrlParamManager;
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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
                        preventAutoFail: preventAutoFail
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
        Sxc.SxcWebApiWithInternals = SxcWebApiWithInternals;
    })(Sxc = ToSic.Sxc || (ToSic.Sxc = {}));
})(ToSic || (ToSic = {}));


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWZlYTk2NmI2YThmOGI0YTFkYWUiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvei5sb2FkbGFzdC4yc3hjLmFwaS50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuRGF0YS50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuSW5zdGFuY2UudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLlRvdGFsUG9wdXAudHMiLCJ3ZWJwYWNrOi8vLy4vMnN4Yy1hcGkvanMvVG9TaWMuU3hjLlVybC50cyIsIndlYnBhY2s6Ly8vLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuV2ViQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZEMEI7QUFDSTtBQUNFO0FBQ1A7QUFDRztBQUs1QixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7Ozs7Ozs7QUNmbEQsSUFBTyxLQUFLLENBZ0dYO0FBaEdELFdBQU8sS0FBSztJQUFD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O0FBQUQsQ0FBQyxFQS9ITSxLQUFLLEtBQUwsS0FBSyxRQStIWCIsImZpbGUiOiIyc3hjLmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFmZWE5NjZiNmE4ZjhiNGExZGFlIiwiLy8gdGhpcyBpcyB0aGUgMnN4Yy1qYXZhc2NyaXB0IEFQSVxyXG4vLyAyc3hjIHdpbGwgaW5jbHVkZSB0aGlzIGF1dG9tYXRpY2FsbHkgd2hlbiBhIHVzZXIgaGFzIGVkaXQtcmlnaHRzXHJcbi8vIGEgdGVtcGxhdGUgZGV2ZWxvcGVyIHdpbGwgdHlwaWNhbGx5IHVzZSB0aGlzIHRvIHVzZSB0aGUgZGF0YS1hcGkgdG8gcmVhZCAyc3hjLWRhdGEgZnJvbSB0aGUgc2VydmVyXHJcbi8vIHJlYWQgbW9yZSBhYm91dCB0aGlzIGluIHRoZSB3aWtpOiBodHRwczovL2dpdGh1Yi5jb20vMnNpYy8yc3hjL3dpa2kvSmF2YVNjcmlwdC0lMjQyc3hjXHJcblxyXG5pbXBvcnQgKiBhcyBDdCBmcm9tIFwiLi9Ub1NpYy5TeGMuQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL1RvU2ljLlN4Yy5EYXRhXCI7XHJcbmltcG9ydCBcIi4vVG9TaWMuU3hjLkluc3RhbmNlXCI7XHJcbmltcG9ydCBcIi4vVG9TaWMuU3hjLlRvdGFsUG9wdXBcIjtcclxuaW1wb3J0IFwiLi9Ub1NpYy5TeGMuVXJsXCI7XHJcbmltcG9ydCBcIi4vVG9TaWMuU3hjLldlYkFwaVwiO1xyXG5cclxuLy8gUmVTaGFycGVyIGRpc2FibGUgSW5jb25zaXN0ZW50TmFtaW5nXHJcbmRlY2xhcmUgY29uc3Qgd2luZG93OiBDdC5XaW5kb3c7XHJcblxyXG5pZiAoIXdpbmRvdy4kMnN4YykgLy8gcHJldmVudCBkb3VibGUgZXhlY3V0aW9uXHJcbiAgICB3aW5kb3cuJDJzeGMgPSBUb1NpYy5TeGMuYnVpbGRTeGNDb250cm9sbGVyKCk7XHJcbi8vIFJlU2hhcnBlciByZXN0b3JlIEluY29uc2lzdGVudE5hbWluZ1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy96LmxvYWRsYXN0LjJzeGMuYXBpLnRzIiwiXHJcbm1vZHVsZSBUb1NpYy5TeGMge1xyXG4gICAgZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN4Y0RhdGFXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICBzb3VyY2U6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLy8gaW4tc3RyZWFtc1xyXG4gICAgICAgIFwiaW5cIjogYW55ID0ge307XHJcblxyXG4gICAgICAgIC8vIHdpbGwgaG9sZCB0aGUgZGVmYXVsdCBzdHJlYW0gKFtcImluXCJdW1wiRGVmYXVsdFwiXS5MaXN0XHJcbiAgICAgICAgTGlzdDogYW55ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwcml2YXRlIGNvbnRyb2xsZXI6IFN4Y0luc3RhbmNlV2l0aEludGVybmFscyxcclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzb3VyY2UgcGF0aCBkZWZhdWx0aW5nIHRvIGN1cnJlbnQgcGFnZSArIG9wdGlvbmFsIHBhcmFtc1xyXG4gICAgICAgIHNvdXJjZVVybChwYXJhbXM/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jb250cm9sbGVyLnJlc29sdmVTZXJ2aWNlVXJsKFwiYXBwLXN5cy9hcHBjb250ZW50L0dldENvbnRlbnRCbG9ja0RhdGFcIik7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSBcInN0cmluZ1wiKSAvLyB0ZXh0IGxpa2UgJ2lkPTcnXHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImXCIgKyBwYXJhbXM7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gbG9hZCBkYXRhIHZpYSBhamF4XHJcbiAgICAgICAgbG9hZChzb3VyY2U/OiBhbnkpIHtcclxuICAgICAgICAgICAgLy8gaWYgc291cmNlIGlzIGFscmVhZHkgdGhlIGRhdGEsIHNldCBpdFxyXG4gICAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAyMDE3LTA5LTA1IDJkbTogZGlzY292ZXJkIGEgY2FsbCB0byBhbiBpbmV4aXN0aW5nIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSB0aGlzIGlzIGFuIG9sZCBBUEkgd2hpY2ggaXMgYmVpbmcgZGVwcmVjYXRlZCwgcGxlYXNlIGRvbid0IGZpeCB1bmxlc3Mgd2UgZ2V0IGFjdGl2ZSBmZWVkYmFja1xyXG4gICAgICAgICAgICAgICAgLy8gY29udHJvbGxlci5kYXRhLnNldERhdGEoc291cmNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuZGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UudXJsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS51cmwgPSB0aGlzLmNvbnRyb2xsZXIuZGF0YS5zb3VyY2VVcmwoKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5vcmlnU3VjY2VzcyA9IHNvdXJjZS5zdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgc291cmNlLnN1Y2Nlc3MgPSAoZGF0YTogYW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGF0YVNldE5hbWUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShkYXRhU2V0TmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtkYXRhU2V0TmFtZV0uTGlzdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5kYXRhW1wiaW5cIl1bZGF0YVNldE5hbWVdID0gZGF0YVtkYXRhU2V0TmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRhdGFbXCJpblwiXVtkYXRhU2V0TmFtZV0ubmFtZSA9IGRhdGFTZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5kYXRhW1wiaW5cIl0uRGVmYXVsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMjAxNy0wOS0wNSAyZG06IHByZXZpb3VzbHkgd3JvdGUgaXQgdG8gY29udHJvbGxlci5MaXN0LCBidXQgdGhpcyBpcyBhbG1vc3QgY2VydGFpbmx5IGEgbWlzdGFrZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCdzIGFuIG9sZCBBUEkgd2hpY2ggaXMgYmVpbmcgZGVwcmVjYXRlZCwgd2Ugd29uJ3QgZml4IGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGlzdCA9IHRoaXNbXCJpblwiXS5EZWZhdWx0Lkxpc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2Uub3JpZ1N1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5vcmlnU3VjY2Vzcyh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmlzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIubGFzdFJlZnJlc2ggPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMpLl90cmlnZ2VyTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmVycm9yID0gKHJlcXVlc3Q6IGFueSkgPT4geyBhbGVydChyZXF1ZXN0LnN0YXR1c1RleHQpOyB9O1xyXG4gICAgICAgICAgICAgICAgc291cmNlLnByZXZlbnRBdXRvRmFpbCA9IHRydWU7IC8vIHVzZSBvdXIgZmFpbCBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWxvYWQoKTpTeGNEYXRhV2l0aEludGVybmFscyB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci53ZWJBcGkuZ2V0KHRoaXMuc291cmNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5zb3VyY2Uuc3VjY2VzcywgdGhpcy5zb3VyY2UuZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uKGV2ZW50czpFdmVudCwgY2FsbGJhY2s6RnVuY3Rpb24pOlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmJpbmQoXCIyc2NMb2FkXCIsIGNhbGxiYWNrKVswXS5fdHJpZ2dlckxvYWRlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3RyaWdnZXJMb2FkZWQoKTpQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmlzTG9hZGVkXHJcbiAgICAgICAgICAgICAgICA/ICQodGhpcykudHJpZ2dlcihcIjJzY0xvYWRcIiwgW3RoaXNdKVswXVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25lKGV2ZW50czpFdmVudCwgY2FsbGJhY2s6RnVuY3Rpb24pOlN4Y0RhdGFXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRyb2xsZXIuaXNMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vbmUoXCIyc2NMb2FkXCIsIGNhbGxiYWNrKVswXTtcclxuICAgICAgICAgICAgY2FsbGJhY2soe30sIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuRGF0YS50cyIsIlxyXG5tb2R1bGUgVG9TaWMuU3hjIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0eXBpY2FsIHN4Yy1pbnN0YW5jZSBvYmplY3QgZm9yIGEgc3BlY2lmaWMgRE5OIG1vZHVsZSBvciBjb250ZW50LWJsb2NrXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTeGNJbnN0YW5jZSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaGVscGVycyBmb3IgYWpheCBjYWxsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHdlYkFwaTogU3hjV2ViQXBpV2l0aEludGVybmFscztcclxuICAgICAgICBwcm90ZWN0ZWQgc2VydmljZVJvb3Q6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2VTY29wZXMgPSBbXCJhcHBcIiwgXCJhcHAtc3lzXCIsIFwiYXBwLWFwaVwiLCBcImFwcC1xdWVyeVwiLCBcImFwcC1jb250ZW50XCIsIFwiZWF2XCIsIFwidmlld1wiLCBcImRublwiXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiB0aGUgc3hjLWluc3RhbmNlIElELCB3aGljaCBpcyB1c3VhbGx5IHRoZSBETk4gTW9kdWxlIElkXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBwdWJsaWMgaWQ6IG51bWJlcixcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBjb250ZW50LWJsb2NrIElELCB3aGljaCBpcyBlaXRoZXIgdGhlIG1vZHVsZSBJRCwgb3IgdGhlIGNvbnRlbnQtYmxvY2sgZGVmaW5pdGlpb24gZW50aXR5IElEXHJcbiAgICAgICAgICAgICAqIHRoaXMgaXMgYW4gYWR2YW5jZWQgY29uY2VwdCB5b3UgdXN1YWxseSBkb24ndCBjYXJlIGFib3V0LCBvdGhlcndpc2UgeW91IHNob3VsZCByZXNlYXJjaCBpdFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcHVibGljIGNiaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRublNmOiBhbnlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlUm9vdCA9IGRublNmKGlkKS5nZXRTZXJ2aWNlUm9vdChcIjJzeGNcIik7XHJcbiAgICAgICAgICAgIHRoaXMud2ViQXBpID0gbmV3IFN4Yy5TeGNXZWJBcGlXaXRoSW50ZXJuYWxzKHRoaXMsIGlkLCBjYmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNvbnZlcnRzIGEgc2hvcnQgYXBpLWNhbGwgcGF0aCBsaWtlIFwiL2FwcC9CbG9nL3F1ZXJ5L3h5elwiIHRvIHRoZSBETk4gZnVsbCBwYXRoXHJcbiAgICAgICAgICogd2hpY2ggdmFyaWVzIGZyb20gaW5zdGFsbGF0aW9uIHRvIGluc3RhbGxhdGlvbiBsaWtlIFwiL2Rlc2t0b3Btb2R1bGVzL2FwaS8yc3hjL2FwcC8uLi5cIlxyXG4gICAgICAgICAqIEBwYXJhbSB2aXJ0dWFsUGF0aCBcclxuICAgICAgICAgKiBAcmV0dXJucyBtYXBwZWQgcGF0aCBcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXNvbHZlU2VydmljZVVybCh2aXJ0dWFsUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3BlID0gdmlydHVhbFBhdGguc3BsaXQoXCIvXCIpWzBdLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9wIGlmIGl0J3Mgbm90IG9uZSBvZiBvdXIgc3BlY2lhbCBwYXRoc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlU2NvcGVzLmluZGV4T2Yoc2NvcGUpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB2aXJ0dWFsUGF0aDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VSb290ICsgc2NvcGUgKyBcIi9cIiArIHZpcnR1YWxQYXRoLnN1YnN0cmluZyh2aXJ0dWFsUGF0aC5pbmRleE9mKFwiL1wiKSArIDEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIFNob3cgYSBuaWNlIGVycm9yIHdpdGggbW9yZSBpbmZvcyBhcm91bmQgMnN4Y1xyXG4gICAgICAgIHNob3dEZXRhaWxlZEh0dHBFcnJvcihyZXN1bHQ6IGFueSk6IGFueSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gNDA0ICYmXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuY29uZmlnICYmXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuY29uZmlnLnVybCAmJlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNvbmZpZy51cmwuaW5kZXhPZihcIi9kaXN0L2kxOG4vXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuY29uc29sZSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImp1c3QgZnlpOiBmYWlsZWQgdG8gbG9hZCBsYW5ndWFnZSByZXNvdXJjZTsgd2lsbCBoYXZlIHRvIHVzZSBkZWZhdWx0XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYW4gdW5zcGVjaWZpZWQgMC1lcnJvciwgaXQncyBwcm9iYWJseSBub3QgYW4gZXJyb3IgYnV0IGEgY2FuY2VsbGVkIHJlcXVlc3QsIChoYXBwZW5zIHdoZW4gY2xvc2luZyBwb3B1cHMgY29udGFpbmluZyBhbmd1bGFySlMpXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAwIHx8IHJlc3VsdC5zdGF0dXMgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCdzIHRyeSB0byBzaG93IGdvb2QgbWVzc2FnZXMgaW4gbW9zdCBjYXNlc1xyXG4gICAgICAgICAgICBsZXQgaW5mb1RleHQgPSBcIkhhZCBhbiBlcnJvciB0YWxraW5nIHRvIHRoZSBzZXJ2ZXIgKHN0YXR1cyBcIiArIHJlc3VsdC5zdGF0dXMgKyBcIikuXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHNydlJlc3AgPSByZXN1bHQucmVzcG9uc2VUZXh0XHJcbiAgICAgICAgICAgICAgICA/IEpTT04ucGFyc2UocmVzdWx0LnJlc3BvbnNlVGV4dCkgLy8gZm9yIGpxdWVyeSBhamF4IGVycm9yc1xyXG4gICAgICAgICAgICAgICAgOiByZXN1bHQuZGF0YTsgLy8gZm9yIGFuZ3VsYXIgJGh0dHBcclxuICAgICAgICAgICAgaWYgKHNydlJlc3ApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IHNydlJlc3AuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChtc2cpIGluZm9UZXh0ICs9IFwiXFxuTWVzc2FnZTogXCIgKyBtc2c7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtc2dEZXQgPSBzcnZSZXNwLk1lc3NhZ2VEZXRhaWwgfHwgc3J2UmVzcC5FeGNlcHRpb25NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1zZ0RldCkgaW5mb1RleHQgKz0gXCJcXG5EZXRhaWw6IFwiICsgbXNnRGV0O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXNnRGV0ICYmIG1zZ0RldC5pbmRleE9mKFwiTm8gYWN0aW9uIHdhcyBmb3VuZFwiKSA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXNnRGV0LmluZGV4T2YoXCJ0aGF0IG1hdGNoZXMgdGhlIG5hbWVcIikgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCArPSBcIlxcblxcblRpcCBmcm9tIDJzeGM6IHlvdSBwcm9iYWJseSBnb3QgdGhlIGFjdGlvbi1uYW1lIHdyb25nIGluIHlvdXIgSlMuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobXNnRGV0LmluZGV4T2YoXCJ0aGF0IG1hdGNoZXMgdGhlIHJlcXVlc3QuXCIpID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgKz0gXCJcXG5cXG5UaXAgZnJvbSAyc3hjOiBTZWVtcyBsaWtlIHRoZSBwYXJhbWV0ZXJzIGFyZSB0aGUgd3JvbmcgYW1vdW50IG9yIHR5cGUuXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1zZyAmJiBtc2cuaW5kZXhPZihcIkNvbnRyb2xsZXJcIikgPT09IDAgJiYgbXNnLmluZGV4T2YoXCJub3QgZm91bmRcIikgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ICs9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuXFxuVGlwIGZyb20gMnN4YzogeW91IHByb2JhYmx5IHNwZWxsZWQgdGhlIGNvbnRyb2xsZXIgbmFtZSB3cm9uZyBvciBmb3Jnb3QgdG8gcmVtb3ZlIHRoZSB3b3JkICdjb250cm9sbGVyJyBmcm9tIHRoZSBjYWxsIGluIEpTLiBUbyBjYWxsIGEgY29udHJvbGxlciBjYWxsZWQgJ0RlbW9Db250cm9sbGVyJyBvbmx5IHVzZSAnRGVtbycuXCI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZm9UZXh0ICs9IFwiXFxuXFxuaWYgeW91IGFyZSBhbiBhZHZhbmNlZCB1c2VyIHlvdSBjYW4gbGVhcm4gbW9yZSBhYm91dCB3aGF0IHdlbnQgd3JvbmcgLSBkaXNjb3ZlciBob3cgb24gMnN4Yy5vcmcvaGVscD90YWc9ZGVidWdcIjtcclxuICAgICAgICAgICAgYWxlcnQoaW5mb1RleHQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmhhbmNlZCBzeGMgaW5zdGFuY2Ugd2l0aCBhZGRpdGlvbmFsIGVkaXRpbmcgZnVuY3Rpb25hbGl0eVxyXG4gICAgICogVXNlIHRoaXMsIGlmIHlvdSBpbnRlbmQgdG8gcnVuIGNvbnRlbnQtbWFuYWdlbWVudCBjb21tYW5kcyBsaWtlIFwiZWRpdFwiIGZyb20geW91ciBKUyBkaXJlY3RseVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgU3hjSW5zdGFuY2VXaXRoRWRpdGluZyBleHRlbmRzIFN4Y0luc3RhbmNlIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBtYW5hZ2Ugb2JqZWN0IHdoaWNoIHByb3ZpZGVzIGFjY2VzcyB0byBhZGRpdGlvbmFsIGNvbnRlbnQtbWFuYWdlbWVudCBmZWF0dXJlc1xyXG4gICAgICAgICAqIGl0IG9ubHkgZXhpc3RzIGlmIDJzeGMgaXMgaW4gZWRpdCBtb2RlIChvdGhlcndpc2UgdGhlIEpTIGFyZSBub3QgaW5jbHVkZWQgZm9yIHRoZXNlIGZlYXR1cmVzKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1hbmFnZTogYW55ID0gbnVsbDsgLy8gaW5pdGlhbGl6ZSBjb3JyZWN0bHkgbGF0ZXIgb25cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyBpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgJDJzeGM6IFN4Y0NvbnRyb2xsZXJXaXRoSW50ZXJuYWxzLFxyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZG5uU2Y6IGFueVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzdXBlcihpZCwgY2JpZCwgZG5uU2YpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIG1hbmFnZSBwcm9wZXJ0eSwgYnV0IG5vdCB3aXRoaW4gaW5pdGlhbGl6ZXIsIGJlY2F1c2UgaW5zaWRlIHRoZSBtYW5hZ2UtaW5pdGlhbGl6ZXIgaXQgbWF5IHJlZmVyZW5jZSAyc3hjIGFnYWluXHJcbiAgICAgICAgICAgIHRyeSB7IC8vIHNvbWV0aW1lcyB0aGUgbWFuYWdlIGNhbid0IGJlIGJ1aWx0LCBsaWtlIGJlZm9yZSBpbnN0YWxsaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoJDJzeGMuX21hbmFnZSkgJDJzeGMuX21hbmFnZS5pbml0SW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMgb25seSB3b3JrcyB3aGVuIG1hbmFnZSBleGlzdHMgKG5vdCBpbnN0YWxsaW5nKSBhbmQgdHJhbnNsYXRvciBleGlzdHMgdG9vXHJcbiAgICAgICAgICAgIGlmICgkMnN4Yy5fdHJhbnNsYXRlSW5pdCAmJiB0aGlzLm1hbmFnZSkgJDJzeGMuX3RyYW5zbGF0ZUluaXQodGhpcy5tYW5hZ2UpOyAgICAvLyBpbml0IHRyYW5zbGF0ZSwgbm90IHJlYWxseSBuaWNlLCBidXQgb2sgZm9yIG5vd1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNoZWNrcyBpZiB3ZSdyZSBjdXJyZW50bHkgaW4gZWRpdCBtb2RlXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzRWRpdE1vZGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hbmFnZSAmJiB0aGlzLm1hbmFnZS5faXNFZGl0TW9kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN4Y0luc3RhbmNlV2l0aEludGVybmFscyBleHRlbmRzIFN4Y0luc3RhbmNlV2l0aEVkaXRpbmcge1xyXG4gICAgICAgIGRhdGE6IFN4Y0RhdGFXaXRoSW50ZXJuYWxzO1xyXG4gICAgICAgIHNvdXJjZTogYW55ID0gbnVsbDtcclxuICAgICAgICBpc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxhc3RSZWZyZXNoOiBEYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyBpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwdWJsaWMgY2JpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwcml2YXRlIGNhY2hlS2V5OiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHByb3RlY3RlZCAkMnN4YzogU3hjQ29udHJvbGxlcldpdGhJbnRlcm5hbHMsXHJcbiAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBkbm5TZjogYW55XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGlkLCBjYmlkLCAkMnN4YywgZG5uU2YpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgU3hjRGF0YVdpdGhJbnRlcm5hbHModGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWNyZWF0ZShyZXNldENhY2hlOiBib29sZWFuKTogU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICAgICAgaWYgKHJlc2V0Q2FjaGUpIGRlbGV0ZSB0aGlzLiQyc3hjLl9jb250cm9sbGVyc1t0aGlzLmNhY2hlS2V5XTsgLy8gY2xlYXIgY2FjaGVcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJDJzeGModGhpcy5pZCwgdGhpcy5jYmlkKSBhcyBhbnkgYXMgU3hjSW5zdGFuY2VXaXRoSW50ZXJuYWxzOyAvLyBnZW5lcmF0ZSBuZXdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuSW5zdGFuY2UudHMiLCJcclxubW9kdWxlIFRvU2ljLlN4YyB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRvdGFsUG9wdXAge1xyXG4gICAgICAgIG9wZW4odXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBjb3VudCBwYXJlbnRzIHRvIHNlZSBob3cgaGlnaCB0aGUgei1pbmRleCBuZWVkcyB0byBiZVxyXG4gICAgICAgICAgICBsZXQgeiA9IDEwMDAwMDEwLCBwID0gd2luZG93OyAvLyBOZWVkcyBhdCBsZWFzdCAxMDAwMDAwMCB0byBiZSBvbiB0b3Agb2YgdGhlIEROTjkgYmFyXHJcbiAgICAgICAgICAgIHdoaWxlIChwICE9PSB3aW5kb3cudG9wICYmIHogPCAxMDAwMDEwMCkge1xyXG4gICAgICAgICAgICAgICAgeisrO1xyXG4gICAgICAgICAgICAgICAgcCA9IHAucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIiB0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7IHBvc2l0aW9uOmZpeGVkOyB6LWluZGV4OlwiICsgeik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZnJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcclxuICAgICAgICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoXCJhbGxvd3RyYW5zcGFyZW5jeVwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0b3A6IDA7bGVmdDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpO1xyXG4gICAgICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcInNyY1wiLCB1cmwpO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlmcm0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSBcIiBzeGMtcG9wdXAtb3BlblwiO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gaWZybTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoXCJzeGMtcG9wdXAtb3BlblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZybSA9IHRoaXMuZnJhbWU7XHJcbiAgICAgICAgICAgICAgICBmcm0ucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZybS5wYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2VUaGlzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAod2luZG93LnBhcmVudCBhcyBhbnkpLiQyc3hjLnRvdGFsUG9wdXAuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyYW1lOiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgY2FsbGJhY2s6IGFueSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yc3hjLWFwaS9qcy9Ub1NpYy5TeGMuVG90YWxQb3B1cC50cyIsIlxyXG5tb2R1bGUgVG9TaWMuU3hjIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVcmxQYXJhbU1hbmFnZXIge1xyXG4gICAgICAgIGdldChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gd2FybmluZzogdGhpcyBtZXRob2QgaXMgZHVwbGljYXRlZCBpbiAyIHBsYWNlcyAtIGtlZXAgdGhlbSBpbiBzeW5jLlxyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbnMgYXJlIGVhdiBhbmQgMnN4YzRuZ1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxdXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hSeCA9IG5ldyBSZWdFeHAoXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCIsIFwiaVwiKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBzZWFyY2hSeC5leGVjKGxvY2F0aW9uLnNlYXJjaCksXHJcbiAgICAgICAgICAgICAgICBzdHJSZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNoUnggPSBuZXcgUmVnRXhwKFwiWyMmXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCIsIFwiaVwiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBoYXNoUnguZXhlYyhsb2NhdGlvbi5oYXNoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgbm90aGluZyBmb3VuZCwgdHJ5IG5vcm1hbCBVUkwgYmVjYXVzZSBETk4gcGxhY2VzIHBhcmFtZXRlcnMgaW4gL2tleS92YWx1ZSBub3RhdGlvblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHRyeSBwYXJ0cyBvZiB0aGUgVVJMXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAoXCIvXCIgKyBuYW1lICsgXCIvKFteL10rKVwiLCBcImlcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGFueXRoaW5nLCBpZiB3ZSBkbyBmaW5kIGl0LCB3ZSBtdXN0IHJldmVyc2UgdGhlIHJlc3VsdHMgc28gd2UgZ2V0IHRoZSBcImxhc3RcIiBvbmUgaW4gY2FzZSB0aGVyZSBhcmUgbXVsdGlwbGUgaGl0c1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0clJlc3VsdCA9IG1hdGNoZXMucmV2ZXJzZSgpWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHN0clJlc3VsdCA9IHJlc3VsdHNbMV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RyUmVzdWx0ID09PSBudWxsIHx8IHN0clJlc3VsdCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGRlY29kZVVSSUNvbXBvbmVudChzdHJSZXN1bHQucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1aXJlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuZ2V0KG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZm91bmQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgUmVxdWlyZWQgcGFyYW1ldGVyICgke25hbWV9KSBtaXNzaW5nIGZyb20gdXJsIC0gY2Fubm90IGNvbnRpbnVlYDtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5VcmwudHMiLCJcclxubW9kdWxlIFRvU2ljLlN4YyB7XHJcbiAgICBkZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGhlbHBlciBBUEkgdG8gcnVuIGFqYXggLyBSRVNUIGNhbGxzIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqIGl0IHdpbGwgZW5zdXJlIHRoYXQgdGhlIGhlYWRlcnMgZXRjLiBhcmUgc2V0IGNvcnJlY3RseVxyXG4gICAgICogYW5kIHRoYXQgdXJscyBhcmUgcmV3cml0dGVuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTeGNXZWJBcGlXaXRoSW50ZXJuYWxzIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb250cm9sbGVyOiBTeGNJbnN0YW5jZSxcclxuICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNiaWQ6IG51bWJlclxyXG4gICAgICAgICkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmV0dXJucyBhbiBodHRwLWdldCBwcm9taXNlXHJcbiAgICAgICAgICogQHBhcmFtIHNldHRpbmdzT3JVcmwgdGhlIHVybCB0byBnZXRcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBqUXVlcnkgc3R5bGUgZGF0YSBmb3IgcG9zdC9wdXQgcmVxdWVzdHNcclxuICAgICAgICAgKiBAcGFyYW0gcHJldmVudEF1dG9GYWlsXHJcbiAgICAgICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0KHNldHRpbmdzT3JVcmw6IHN0cmluZyB8IGFueSwgcGFyYW1zPzphbnksIGRhdGE/OmFueSwgcHJldmVudEF1dG9GYWlsPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3Qoc2V0dGluZ3NPclVybCwgcGFyYW1zLCBkYXRhLCBwcmV2ZW50QXV0b0ZhaWwsIFwiR0VUXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmV0dXJucyBhbiBodHRwLWdldCBwcm9taXNlXHJcbiAgICAgICAgICogQHBhcmFtIHNldHRpbmdzT3JVcmwgdGhlIHVybCB0byBnZXRcclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIGpRdWVyeSBzdHlsZSBhamF4IHBhcmFtZXRlcnNcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBqUXVlcnkgc3R5bGUgZGF0YSBmb3IgcG9zdC9wdXQgcmVxdWVzdHNcclxuICAgICAgICAgKiBAcGFyYW0gcHJldmVudEF1dG9GYWlsXHJcbiAgICAgICAgICogQHJldHVybnMge1Byb21pc2V9IGpRdWVyeSBhamF4IHByb21pc2Ugb2JqZWN0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcG9zdChzZXR0aW5nc09yVXJsOiBzdHJpbmcgfCBhbnksIHBhcmFtcz86YW55LCBkYXRhPzphbnksIHByZXZlbnRBdXRvRmFpbD86IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHNldHRpbmdzT3JVcmwsIHBhcmFtcywgZGF0YSwgcHJldmVudEF1dG9GYWlsLCBcIlBPU1RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAgICAgKiBAcGFyYW0gc2V0dGluZ3NPclVybCB0aGUgdXJsIHRvIGdldFxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMgalF1ZXJ5IHN0eWxlIGFqYXggcGFyYW1ldGVyc1xyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICAgICAqIEBwYXJhbSBwcmV2ZW50QXV0b0ZhaWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0galF1ZXJ5IGFqYXggcHJvbWlzZSBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWxldGUoc2V0dGluZ3NPclVybDogc3RyaW5nIHwgYW55LCBwYXJhbXM/OmFueSwgZGF0YT86YW55LCBwcmV2ZW50QXV0b0ZhaWw/OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChzZXR0aW5nc09yVXJsLCBwYXJhbXMsIGRhdGEsIHByZXZlbnRBdXRvRmFpbCwgXCJERUxFVEVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiByZXR1cm5zIGFuIGh0dHAtZ2V0IHByb21pc2VcclxuICAgICAgICAgKiBAcGFyYW0gc2V0dGluZ3NPclVybCB0aGUgdXJsIHRvIGdldFxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMgalF1ZXJ5IHN0eWxlIGFqYXggcGFyYW1ldGVyc1xyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIGpRdWVyeSBzdHlsZSBkYXRhIGZvciBwb3N0L3B1dCByZXF1ZXN0c1xyXG4gICAgICAgICAqIEBwYXJhbSBwcmV2ZW50QXV0b0ZhaWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0galF1ZXJ5IGFqYXggcHJvbWlzZSBvYmplY3RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdXQoc2V0dGluZ3NPclVybDogc3RyaW5nIHwgYW55LCBwYXJhbXM/OmFueSwgZGF0YT86YW55LCBwcmV2ZW50QXV0b0ZhaWw/OiBib29sZWFuKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChzZXR0aW5nc09yVXJsLCBwYXJhbXMsIGRhdGEsIHByZXZlbnRBdXRvRmFpbCwgXCJQVVRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJlcXVlc3Qoc2V0dGluZ3M6IHN0cmluZyB8IGFueSwgcGFyYW1zOmFueSwgZGF0YTphbnksIHByZXZlbnRBdXRvRmFpbDpib29sZWFuLCBtZXRob2Q6c3RyaW5nKTogYW55IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHVybCBwYXJhbWV0ZXI6IGF1dG9jb252ZXJ0IGEgc2luZ2xlIHZhbHVlIChpbnN0ZWFkIG9mIG9iamVjdCBvZiB2YWx1ZXMpIHRvIGFuIGlkPS4uLiBwYXJhbWV0ZXJcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmN1cmx5XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwYXJhbXMgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7IGlkOiBwYXJhbXMgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIHJlc29sdmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbGxlckFjdGlvbiA9IHNldHRpbmdzLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xsZXJOYW1lID0gY29udHJvbGxlckFjdGlvblswXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbk5hbWUgPSBjb250cm9sbGVyQWN0aW9uWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVyTmFtZSA9PT0gXCJcIiB8fCBhY3Rpb25OYW1lID09PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3I6IGNvbnRyb2xsZXIgb3IgYWN0aW9uIG5vdCBkZWZpbmVkLiBXaWxsIGNvbnRpbnVlIHdpdGggbGlrZWx5IGVycm9ycy5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogY29udHJvbGxlckFjdGlvbi5sZW5ndGggPiAyID8gc2V0dGluZ3MgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRBdXRvRmFpbFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCA9PT0gbnVsbCA/IFwiUE9TVFwiIDogbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBudWxsIGFzIGFueSxcclxuICAgICAgICAgICAgICAgIHByZXZlbnRBdXRvRmFpbDogZmFsc2UsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNmID0gJC5TZXJ2aWNlc0ZyYW1ld29yayh0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogc2V0dGluZ3MuZGF0YVR5cGUgfHwgXCJqc29uXCIsIC8vIGRlZmF1bHQgaXMganNvbiBpZiBub3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShzZXR0aW5ncy5kYXRhKSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNldHRpbmdzLm1ldGhvZCxcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5nZXRBY3Rpb25Vcmwoc2V0dGluZ3MpLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VuZCh4aHI6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudEJsb2NrSWRcIiwgdGhpcy5jYmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZi5zZXRNb2R1bGVIZWFkZXJzKHhocik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MucHJldmVudEF1dG9GYWlsKVxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5mYWlsKHRoaXMuY29udHJvbGxlci5zaG93RGV0YWlsZWRIdHRwRXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEFjdGlvblVybChzZXR0aW5nczogYW55KTogc3RyaW5nIHtcclxuICAgICAgICAgICAgY29uc3Qgc2YgPSAkLlNlcnZpY2VzRnJhbWV3b3JrKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlID0gKHNldHRpbmdzLnVybClcclxuICAgICAgICAgICAgICAgID8gdGhpcy5jb250cm9sbGVyLnJlc29sdmVTZXJ2aWNlVXJsKHNldHRpbmdzLnVybClcclxuICAgICAgICAgICAgICAgIDogc2YuZ2V0U2VydmljZVJvb3QoXCIyc3hjXCIpICsgXCJhcHAvYXV0by9hcGkvXCIgKyBzZXR0aW5ncy5jb250cm9sbGVyICsgXCIvXCIgKyBzZXR0aW5ncy5hY3Rpb247XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlICsgKHNldHRpbmdzLnBhcmFtcyA9PT0gbnVsbCA/IFwiXCIgOiAoXCI/XCIgKyAkLnBhcmFtKHNldHRpbmdzLnBhcmFtcykpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJzeGMtYXBpL2pzL1RvU2ljLlN4Yy5XZWJBcGkudHMiXSwic291cmNlUm9vdCI6IiJ9