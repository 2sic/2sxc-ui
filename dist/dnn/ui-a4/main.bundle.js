webpackJsonp([1,4],{

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

module.exports = "<h1>\n  <app-template-picker [environment]=\"env\"></app-template-picker>\n</h1>\n"

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports = "<!--<md-select placeholder=\"Favorite food\">\n    <md-option *ngFor=\"let food of foods\" [value]=\"food.value\">\n        {{ food.viewValue }}\n    </md-option>\n</md-select>-->\n\n<!--<div class=\"sc-selectors\">-->\n    <!-- App Selector - only relevant in App-Mode -->\n    <!--<div ng-show=\"!vm.isContentApp\" style=\"overflow:hidden;\">\n        <select ng-model=\"vm.appId\" class=\"sc-selector-app input-lg pull-left\" ng-options=\"a.AppId as (a.Name.indexOf('TemplatePicker.') === 0 ? '[+] ' + (a.Name | translate) : a.Name) for a in vm.apps\"\n            ng-disabled=\"vm.dashInfo.hasContent\">\n                <option value=\"\" ng-disabled=\"vm.appId != null\" translate=\"TemplatePicker.AppPickerDefault\"></option>\n            </select>\n        <span>\n                <span ng-if=\"vm.showAdvanced && !vm.isContentApp\">\n                    <button type=\"button\" class=\"btn btn-default\"\n                            ng-show=\"vm.appId != null\"\n                            ng-click=\"vm.appSettings();\"\n                            title=\"{{ 'TemplatePicker.App' | translate }}\">\n                        <i class=\"icon-eav-settings\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default\"\n                            ng-click=\"vm.appImport();\"\n                            title=\"{{ 'TemplatePicker.Install' | translate }}\">\n                        <i class=\"icon-eav-plus\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default\"\n                            ng-click=\"vm.appStore();\"\n                            title=\"{{ 'TemplatePicker.Catalog' | translate }}\">\n                        <i class=\"icon-eav-cart-arrow-down\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default\"\n                            ng-click=\"vm.manageApps();\"\n                            title=\"{{ 'TemplatePicker.Zone' | translate }}\">\n                        <i class=\"icon-eav-manage\"></i>\n                    </button>\n                </span>\n        </span>\n    </div>-->\n\n    <!-- content type selector, only for content-mode -->\n    <!--<select ng-show=\"vm.isContentApp\" ng-model=\"vm.contentTypeId\" class=\"input-lg\" ng-options=\"c.StaticName as c.Label for c in vm.contentTypes | filter: { IsHidden : false } | orderBy: 'Label'\"\n        ng-disabled=\"vm.dashInfo.hasContent || vm.dashInfo.isList\">\n            <option ng-disabled=\"vm.contentTypeId != ''\" value=\"\" translate=\"TemplatePicker.ContentTypePickerDefault\"></option>\n        </select>-->\n\n    <!-- view / template selector -->\n    <!--<div>\n        <select ng-show=\"vm.isContentApp ? vm.contentTypeId != 0 : (vm.savedAppId != null)\" x=\"( && vm.filteredTemplates().length > 1)\"\n            ng-disabled=\"vm.templateId && vm.filteredTemplates().length <= 1\" class=\"input-lg pull-left\" ng-model=\"vm.templateId\"\n            ng-options=\"t.TemplateId as t.Name for t in vm.filteredTemplates(vm.contentTypeId)\"></select>\n\n        <button ng-show=\"vm.templateId != null && vm.savedTemplateId != vm.templateId\" class=\"btn btn-primary\" ng-click=\"vm.persistTemplate(false, false);\"\n            title=\"{{ 'TemplatePicker.Save' | translate }}\" type=\"button\">\n                <i class=\"icon-eav-ok\"></i>\n            </button>\n        <button ng-show=\"vm.undoTemplateId != null\" class=\"btn btn-default\" ng-click=\"vm.cancelTemplateChange();\" type=\"button\" title=\"{{ 'TemplatePicker.' + (vm.isContentApp ? 'Cancel' : 'Close') | translate }}\">\n                <i class=\"icon-eav-cancel\"></i>\n            </button>\n    </div>\n</div>\n\n<div class=\"sc-loading\" ng-show=\"vm.loading\">\n    <i class=\"icon-eav-spinner animate-spin\"></i>\n</div>-->\n\n<!-- the auto-installer iframe, with spinner and everything -->\n<!--<div style=\"position: relative;\" ng-if=\"vm.showRemoteInstaller\">\n    <iframe id=\"frGettingStarted\" ng-src=\"{{vm.remoteInstallerUrl}}\" width=\"100%\" height=\"300px\"></iframe>\n    <div class=\"sc-loading\" id=\"pnlLoading\" ng-if=\"vm.progressIndicator.show\">\n        <i class=\"icon-eav-spinner animate-spin\"></i>\n        <br>\n        <br>\n        <span class=\"sc-loading-label\">\n                installing <span id=\"packageName\">{{vm.progressIndicator.label}}</span>\n        </span>\n    </div>\n</div>-->"

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 69;


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(81);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var AppComponent = (function () {
    function AppComponent(win) {
        var iframe = win.frameElement || win, window = win.parent || win;
        this.env = {
            window: window,
            sxc: iframe.sxc,
            contentBlock: iframe.sxc.manage.contentBlock,
            dashInfo: iframe.getAdditionalDashboardConfig
        };
        iframe.vm = this.env;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(138),
        styles: [__webpack_require__(136)]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Inject */])("windowObject")),
    __metadata("design:paramtypes", [Object])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_template_picker_template_picker_module__ = __webpack_require__(80);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_template_picker_template_picker_module__["a" /* TemplatePickerModule */]
        ],
        providers: [{ provide: "windowObject", useValue: window }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatePickerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TemplatePickerComponent = (function () {
    function TemplatePickerComponent() {
    }
    TemplatePickerComponent.prototype.ngOnInit = function () {
    };
    return TemplatePickerComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", Object)
], TemplatePickerComponent.prototype, "environment", void 0);
TemplatePickerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Component */])({
        selector: 'app-template-picker',
        template: __webpack_require__(139),
        styles: [__webpack_require__(135)]
    }),
    __metadata("design:paramtypes", [])
], TemplatePickerComponent);

//# sourceMappingURL=template-picker.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_picker_component__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatePickerModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TemplatePickerModule = (function () {
    function TemplatePickerModule() {
    }
    return TemplatePickerModule;
}());
TemplatePickerModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__template_picker_component__["a" /* TemplatePickerComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__template_picker_component__["a" /* TemplatePickerComponent */]]
    })
], TemplatePickerModule);

//# sourceMappingURL=template-picker.module.js.map

/***/ }),

/***/ 81:
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

},[164]);
//# sourceMappingURL=main.bundle.js.map