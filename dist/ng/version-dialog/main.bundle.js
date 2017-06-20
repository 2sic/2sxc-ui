webpackJsonp([1,4],{

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ":host {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ":host {\n  width: 1000px;\n  max-width: 100%;\n  min-height: 420px;\n  display: block; }\n  :host md-toolbar {\n    background: #2196F3; }\n    :host md-toolbar .spacer {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 auto;\n              flex: 1 1 auto; }\n    :host md-toolbar .title {\n      font-weight: 300; }\n  :host .table .header {\n    line-height: 48px;\n    font-weight: 400;\n    padding: 0 22px;\n    color: rgba(0, 0, 0, 0.6);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1); }\n  :host .table .record {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1); }\n    :host .table .record .row {\n      line-height: 48px;\n      font-weight: 400;\n      padding: 0 22px; }\n      :host .table .record .row .right {\n        text-align: right; }\n    :host .table .record.selected {\n      background: rgba(0, 0, 0, 0.04); }\n    :host .table .record .detail {\n      padding: 16px 22px;\n      line-height: 28px; }\n    :host .table .record .label {\n      color: rgba(0, 0, 0, 0.6); }\n  :host footer {\n    padding: 16px 22px; }\n    :host footer button {\n      margin-left: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

module.exports = "<md-toolbar color=\"primary\">\n  <span class=\"title\">Versions of this item</span>\n  <span class=\"spacer\"></span>\n  <a md-icon-button>\n    <md-icon class=\"example-icon\">close</md-icon>\n  </a>\n</md-toolbar>\n<div class=\"table\">\n  <div fxLayout=\"row\" class=\"header\">\n    <div fxFlex=\"10\"></div>\n    <div fxFlex>Version</div>\n    <div fxFlex>Timestamp</div>\n    <div fxFlex>User</div>\n    <div fxFlex=\"10\"></div>\n  </div>\n  <div [ngClass]=\"{ selected: selected === version }\" class=\"record\" *ngFor=\"let version of versions\">\n    <div class=\"row\" fxLayout=\"row\">\n      <div fxFlex=\"10\">\n        <md-checkbox [hidden]=\"selected && selected !== version\" (change)=\"selectOrDeselect($event, version)\"></md-checkbox>\n      </div>\n      <div fxFlex>{{version.version}}</div>\n      <div fxFlex>{{version.timestamp}}</div>\n      <div fxFlex>{{version.user}}</div>\n      <div fxFlex=\"10\" class=\"right\">\n        <a *ngIf=\"focused === version\" md-icon-button (click)=\"focusOrBlur(version)\">\n          <md-icon class=\"example-icon\">remove</md-icon>\n        </a>\n        <a *ngIf=\"focused !== version\" md-icon-button (click)=\"focusOrBlur(version)\">\n          <md-icon class=\"example-icon\">add</md-icon>\n        </a>\n      </div>\n    </div>\n    <div class=\"detail\" *ngIf=\"focused === version\">\n      <div fxLayout=\"row\" *ngFor=\"let data of version.data\">\n        <div fxFlex=\"10\"></div>\n        <div fxFlex=\"14\" class=\"label\">{{data.label}}:</div>\n        <div fxFlex class=\"value\">{{data.value}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n<footer *ngIf=\"selected\" fxLayout=\"row\">\n  <div fxFlex></div>\n  <button md-raised-button>restore as draft</button>\n  <button md-raised-button>restore live</button>\n</footer>"

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DialogComponent = (function () {
    function DialogComponent() {
        this.versions = [
            {
                version: 19,
                timestamp: '2017-04-02 12:42',
                user: 'Daniel01',
                data: [{
                        label: 'title',
                        value: 'Blogging about 2017'
                    }, {
                        label: 'released',
                        value: '2017-06-03'
                    }, {
                        label: 'content',
                        value: 'lorem ipsum dolor sit..'
                    }]
            }, {
                version: 18,
                timestamp: '2017-03-28 17:04',
                user: 'Daniel01',
                data: [{
                        label: 'title',
                        value: 'Blogging about 2017'
                    }, {
                        label: 'released',
                        value: '2017-06-03'
                    }, {
                        label: 'content',
                        value: 'lorem ipsum dolor sit..'
                    }]
            }, {
                version: 17,
                timestamp: '2017-03-26 08:09',
                user: 'Daniel01',
                data: [{
                        label: 'title',
                        value: 'Blogging about 2017'
                    }, {
                        label: 'released',
                        value: '2017-06-03'
                    }, {
                        label: 'content',
                        value: 'lorem ipsum dolor sit..'
                    }]
            }, {
                version: 16,
                timestamp: '2017-03-25 10:25',
                user: 'Daniel01',
                data: [{
                        label: 'title',
                        value: 'Blogging about 2017'
                    }, {
                        label: 'released',
                        value: '2017-06-03'
                    }, {
                        label: 'content',
                        value: 'lorem ipsum dolor sit..'
                    }]
            }
        ];
    }
    DialogComponent.prototype.selectOrDeselect = function ($event, version) {
        this.selected = $event.checked ? version : undefined;
    };
    DialogComponent.prototype.focusOrBlur = function (version) {
        this.focused = this.focused === version ? undefined : version;
    };
    return DialogComponent;
}());
DialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-dialog',
        template: __webpack_require__(153),
        styles: [__webpack_require__(152)]
    }),
    __metadata("design:paramtypes", [])
], DialogComponent);

var Version = (function () {
    function Version() {
    }
    return Version;
}());
//# sourceMappingURL=dialog.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 85;


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(96);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_dialog_component__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(dialog) {
        this.dialog = dialog;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_2_app_dialog_component__["a" /* DialogComponent */]);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
        selector: 'app-root',
        template: '',
        styles: [__webpack_require__(151)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdDialog */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dialog_component__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__dialog_component__["a" /* DialogComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__dialog_component__["a" /* DialogComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.bundle.js.map