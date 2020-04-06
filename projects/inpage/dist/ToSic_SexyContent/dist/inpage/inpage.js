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
/******/ 	return __webpack_require__(__webpack_require__.s = 172);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LogEntryOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LogCall", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Entry", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Insights", function() { return __WEBPACK_IMPORTED_MODULE_0__2sxc_src_logging__["c"]; });
// Logging system is used from $2sxc API



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_code__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_code___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__command_code__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__command_code__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__command_code__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__command__ = __webpack_require__(40);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return __WEBPACK_IMPORTED_MODULE_1__command__["Command"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commands__ = __webpack_require__(10);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Commands", function() { return __WEBPACK_IMPORTED_MODULE_2__commands__["Commands"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__command_index__ = __webpack_require__(74);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAdd", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdAdd"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppImport", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdAppImport"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppResources", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdAppResources"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppSettings", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdAppSettings"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentItems", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdContentItems"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContentListActionParams", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["ContentListActionParams"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["Actions"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentType", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdContentType"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdCustom", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdCustom"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdDelete", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdDelete"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEdit", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdEdit"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEditDialog", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdEditDialog"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharedLogic", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["SharedLogic"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdInstanceList", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdInstanceList"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdItemHistory", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdItemHistory"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdLayout", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdLayout"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMetadata", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdMetadata"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMore", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdMore"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveDown", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdMoveDown"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveUp", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdMoveUp"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNew", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdNew"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNewMode", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdNewMode"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdPublish", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdPublish"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdRemove", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdRemove"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdReplace", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdReplace"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateDevelop", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdTemplateDevelop"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateQuery", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdTemplateQuery"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateSettings", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdTemplateSettings"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdZone", function() { return __WEBPACK_IMPORTED_MODULE_3__command_index__["CmdZone"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__command_params__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__command_params___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__command_params__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__command_params__) if(["Command","Commands","CmdAdd","CmdAppImport","CmdAppResources","CmdAppSettings","CmdContentItems","ContentListActionParams","Actions","CmdContentType","CmdCustom","CmdDelete","CmdEdit","CmdEditDialog","SharedLogic","CmdInstanceList","CmdItemHistory","CmdLayout","CmdMetadata","CmdMore","CmdMoveDown","CmdMoveUp","CmdNew","CmdNewMode","CmdPublish","CmdRemove","CmdReplace","CmdTemplateDevelop","CmdTemplateQuery","CmdTemplateSettings","CmdZone","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_4__command_params__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_cms_engine__ = __webpack_require__(148);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmsEngine", function() { return __WEBPACK_IMPORTED_MODULE_5__engine_cms_engine__["CmsEngine"]; });
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__command_code__) if(["Command","Commands","CmdAdd","CmdAppImport","CmdAppResources","CmdAppSettings","CmdContentItems","ContentListActionParams","Actions","CmdContentType","CmdCustom","CmdDelete","CmdEdit","CmdEditDialog","SharedLogic","CmdInstanceList","CmdItemHistory","CmdLayout","CmdMetadata","CmdMore","CmdMoveDown","CmdMoveUp","CmdNew","CmdNewMode","CmdPublish","CmdRemove","CmdReplace","CmdTemplateDevelop","CmdTemplateQuery","CmdTemplateSettings","CmdZone","CmsEngine","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__command_code__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__metadata_for__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__metadata_for___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__metadata_for__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_6__metadata_for__) if(["Command","Commands","CmdAdd","CmdAppImport","CmdAppResources","CmdAppSettings","CmdContentItems","ContentListActionParams","Actions","CmdContentType","CmdCustom","CmdDelete","CmdEdit","CmdEditDialog","SharedLogic","CmdInstanceList","CmdItemHistory","CmdLayout","CmdMetadata","CmdMore","CmdMoveDown","CmdMoveUp","CmdNew","CmdNewMode","CmdPublish","CmdRemove","CmdReplace","CmdTemplateDevelop","CmdTemplateQuery","CmdTemplateSettings","CmdZone","CmsEngine","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_6__metadata_for__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_sxc_instance_engine__ = __webpack_require__(153);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceEngine", function() { return __WEBPACK_IMPORTED_MODULE_7__engine_sxc_instance_engine__["SxcInstanceEngine"]; });











/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return C; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attributes__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_block__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debug__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_paths__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ids__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toolbar__ = __webpack_require__(82);






var C = {
    ContentBlock: __WEBPACK_IMPORTED_MODULE_1__content_block__["ContentBlock"],
    DialogPaths: __WEBPACK_IMPORTED_MODULE_3__dialog_paths__["DialogPaths"],
    IDs: __WEBPACK_IMPORTED_MODULE_4__ids__["IDs"],
    Attributes: __WEBPACK_IMPORTED_MODULE_0__attributes__["Attributes"],
    Toolbar: __WEBPACK_IMPORTED_MODULE_5__toolbar__["ToolbarConstants"],
    Cb: __WEBPACK_IMPORTED_MODULE_1__content_block__["ContentBlockIds"],
    Debug: __WEBPACK_IMPORTED_MODULE_2__debug__["Debug"],
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SxcEdit", function() { return SxcEdit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2sxc_src__ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SxcEdit = /** @class */ (function (_super) {
    __extends(SxcEdit, _super);
    function SxcEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SxcEdit.is = function (thing) {
        return thing.showDetailedHttpError !== undefined;
    };
    SxcEdit.get = function (module, cbid) {
        var sxc = window.$2sxc(module, cbid);
        return sxc;
    };
    /**
     * get edit-context info of html element or sxc-object
     * @param {SxcEdit} sxc
     * @param {HTMLElement} htmlElement
     * @return {AttrJsonEditContext} edit context info
     */
    SxcEdit.getEditContext = function (sxc, htmlElement) {
        var editContextTag;
        if (htmlElement) {
            editContextTag = SxcEdit.getContainerTag(htmlElement);
        }
        else {
            editContextTag = SxcEdit.getTag(sxc);
        }
        return getEditContextOfTag(editContextTag);
    };
    /**
     * get nearest html tag of the sxc instance with data-edit-context
     * @param htmlTag
     */
    SxcEdit.getContainerTag = function (htmlTag) {
        return $(htmlTag).closest('div[data-edit-context]')[0];
    };
    /**
     * get a html tag of the sxc instance
     * @param {SxcEdit} sxci
     * @return {jquery} - resulting html
     */
    SxcEdit.getTag = function (sxci) {
        return $("div[data-cb-id='" + sxci.cbid + "']")[0];
    };
    return SxcEdit;
}(__WEBPACK_IMPORTED_MODULE_0__2sxc_src__["SxcInstanceWithInternals"]));

/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @return {AttrJsonEditContext} edit-context object
 */
function getEditContextOfTag(htmlTag) {
    var attr = htmlTag.getAttribute('data-edit-context');
    return JSON.parse(attr || '{ }');
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log_entry_options__ = __webpack_require__(174);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__log_entry_options__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__has_log__ = __webpack_require__(175);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__has_log__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Log__ = __webpack_require__(176);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__Log__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__log_call__ = __webpack_require__(188);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__log_call__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entry__ = __webpack_require__(189);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__entry__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__insights__ = __webpack_require__(193);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__insights__["a"]; });








/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(32);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TemplateConstants", function() { return __WEBPACK_IMPORTED_MODULE_0__constants__["TemplateConstants"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_with_cursor__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_with_cursor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__list_with_cursor__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__list_with_cursor__) if(["TemplateConstants","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__list_with_cursor__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_empty__ = __webpack_require__(104);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateEmpty", function() { return __WEBPACK_IMPORTED_MODULE_2__template_empty__["ToolbarTemplateEmpty"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__template_default__ = __webpack_require__(105);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateDefault", function() { return __WEBPACK_IMPORTED_MODULE_3__template_default__["ToolbarTemplateDefault"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__template_listitem__ = __webpack_require__(106);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateInListRight", function() { return __WEBPACK_IMPORTED_MODULE_4__template_listitem__["ToolbarTemplateInListRight"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toolbar_template_manager__ = __webpack_require__(107);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateManager", function() { return __WEBPACK_IMPORTED_MODULE_5__toolbar_template_manager__["ToolbarTemplateManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__toolbar_template__ = __webpack_require__(108);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplate", function() { return __WEBPACK_IMPORTED_MODULE_6__toolbar_template__["ToolbarTemplate"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_template_group__ = __webpack_require__(109);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateGroup", function() { return __WEBPACK_IMPORTED_MODULE_7__toolbar_template_group__["ToolbarTemplateGroup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__template_editor__ = __webpack_require__(110);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TemplateEditor", function() { return __WEBPACK_IMPORTED_MODULE_8__template_editor__["TemplateEditor"]; });











/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_command__ = __webpack_require__(87);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonCommand", function() { return __WEBPACK_IMPORTED_MODULE_0__button_command__["ButtonCommand"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button__ = __webpack_require__(88);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_1__button__["Button"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_safe__ = __webpack_require__(44);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonSafe", function() { return __WEBPACK_IMPORTED_MODULE_2__button_safe__["ButtonSafe"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_group__ = __webpack_require__(90);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return __WEBPACK_IMPORTED_MODULE_3__button_group__["ButtonGroup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar__ = __webpack_require__(91);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar__["Toolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toolbar_settings__ = __webpack_require__(92);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettings", function() { return __WEBPACK_IMPORTED_MODULE_5__toolbar_settings__["ToolbarSettings"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarWhenNoToolbarProvided", function() { return __WEBPACK_IMPORTED_MODULE_5__toolbar_settings__["ToolbarWhenNoToolbarProvided"]; });








/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection__ = __webpack_require__(83);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return __WEBPACK_IMPORTED_MODULE_0__selection__["Selection"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modifier_base__ = __webpack_require__(84);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModifierBase", function() { return __WEBPACK_IMPORTED_MODULE_1__modifier_base__["ModifierBase"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modifier_content_block__ = __webpack_require__(41);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModifierContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_2__modifier_content_block__["ModifierContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__position_coordinates__ = __webpack_require__(119);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PositionCoordinates", function() { return __WEBPACK_IMPORTED_MODULE_3__position_coordinates__["PositionCoordinates"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modifier_dnn_module__ = __webpack_require__(120);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModifierDnnModule", function() { return __WEBPACK_IMPORTED_MODULE_4__modifier_dnn_module__["ModifierDnnModule"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modifier_dnn_module_internal__ = __webpack_require__(121);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ModifierDnnModuleInternal", function() { return __WEBPACK_IMPORTED_MODULE_5__modifier_dnn_module_internal__["ModifierDnnModuleInternal"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__positioning__ = __webpack_require__(122);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Positioning", function() { return __WEBPACK_IMPORTED_MODULE_6__positioning__["Positioning"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__quick_e__ = __webpack_require__(24);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickE", function() { return __WEBPACK_IMPORTED_MODULE_7__quick_e__["QuickE"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quick_e_clipboard__ = __webpack_require__(123);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickEClipboard", function() { return __WEBPACK_IMPORTED_MODULE_8__quick_e_clipboard__["QuickEClipboard"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__selectors_instance__ = __webpack_require__(124);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QeSelectors", function() { return __WEBPACK_IMPORTED_MODULE_9__selectors_instance__["QeSelectors"]; });
// must come first because we're still relying on build order












/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextComplete", function() { return ContextComplete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plumbing__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundle_toolbar__ = __webpack_require__(27);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ContextComplete = /** @class */ (function (_super) {
    __extends(ContextComplete, _super);
    function ContextComplete(editCtx) {
        return _super.call(this, editCtx) || this;
        // note that the button will not be filled here, as it will be filled somewhere else
    }
    /**
     * Primary API to get the context (context is cached)
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    ContextComplete.findContext = function (tagOrSxc, cbid) {
        var sxc;
        var containerTag = null;
        if (__WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].is(tagOrSxc)) { // it is SxcInstance
            sxc = tagOrSxc;
        }
        else if (typeof tagOrSxc === 'number') { // it is number
            sxc = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(tagOrSxc, cbid);
        }
        else { // it is HTMLElement
            sxc = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(tagOrSxc);
            containerTag = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].getContainerTag(tagOrSxc);
        }
        var contextOfButton = ContextComplete.getContextInstance(sxc, containerTag);
        contextOfButton.sxc = sxc;
        return contextOfButton;
    };
    /**
     * Create copy of context, so it can be modified before use
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    ContextComplete.contextCopy = function (htmlElementOrId, cbid) {
        var contextOfButton = ContextComplete.findContext(htmlElementOrId, cbid);
        // set sxc to null because of cyclic reference, so we can serialize it
        contextOfButton.sxc = null;
        // make a copy
        var copyOfContext = __WEBPACK_IMPORTED_MODULE_1__plumbing__["Obj"].DeepClone(contextOfButton); // JSON.parse(JSON.stringify(contextOfButton));
        // bring sxc back to context
        contextOfButton.sxc = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(htmlElementOrId);
        return copyOfContext;
    };
    /**
     * Create new context
     * @param sxc
     * @param htmlElement
     */
    ContextComplete.getContextInstance = function (sxc, htmlElement) {
        var editContext = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].getEditContext(sxc, htmlElement);
        return new ContextComplete(editContext);
    };
    return ContextComplete;
}(__WEBPACK_IMPORTED_MODULE_2__context_bundle_toolbar__["ContextBundleToolbar"]));



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowInPage", function() { return windowInPage; });
// ReSharper restore InconsistentNaming
var windowInPage = window;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Commands", function() { return Commands; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__command__ = __webpack_require__(40);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/** Singleton Catalog of all commands */
var CommandsManagerSingleton = /** @class */ (function (_super) {
    __extends(CommandsManagerSingleton, _super);
    function CommandsManagerSingleton() {
        var _this = _super.call(this, 'Cmd.Catlog') || this;
        _this.commandList = [];
        _this.list = {}; // hash - table of action definitions, to be used a list()["action - name"]
        _this.get = function (name) { return _this.list[name]; }; // a specific action definition
        __WEBPACK_IMPORTED_MODULE_0__logging__["Insights"].add('system', 'command-catalog', _this.log);
        return _this;
    }
    CommandsManagerSingleton.prototype.add = function (name, translateKey, icon, uiOnly, partOfPage, more) {
        var cmd = this.addDef(__WEBPACK_IMPORTED_MODULE_1__command__["Command"].build(name, translateKey, icon, uiOnly, partOfPage, more));
        this.log.add("add command '" + name + "'", cmd);
        return cmd;
    };
    CommandsManagerSingleton.prototype.addDef = function (def) {
        if (!this.list[def.name]) {
            // add
            this.commandList.push(def);
            this.list[def.name] = def;
        }
        else if (this.list[def.name] !== def) {
            // update
            this.list[def.name] = def;
        }
        return def;
    };
    return CommandsManagerSingleton;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));
// only create the catalog once, then use that everywhere
var Commands = new CommandsManagerSingleton();


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return Actions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contentBlock_render__ = __webpack_require__(17);

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @class ActionsCatalog
 */
var ContentListActions = /** @class */ (function () {
    function ContentListActions() {
    }
    /**
     * add an item to the list at this position
     * @param {ContextComplete} context
     * @param {number} sortOrder
     */
    ContentListActions.prototype.addItem = function (context, sortOrder) {
        return getAndReload(context, 'view/module/additem', { sortOrder: sortOrder });
    };
    /**
     * remove an item from a list, then reload
     * @param {ContextComplete} context
     * @param {number} sortOrder
     */
    ContentListActions.prototype.removeFromList = function (context, sortOrder) {
        return getAndReload(context, 'view/module/removefromlist', { sortOrder: sortOrder });
    };
    /**
     * change the order of an item in a list, then reload
     * @param {ContextComplete} context
     * @param {number} initOrder
     * @param {number} newOrder
     */
    ContentListActions.prototype.changeOrder = function (context, initOrder, newOrder) {
        return getAndReload(context, 'view/module/changeorder', {
            sortOrder: initOrder,
            destinationSortOrder: newOrder,
        });
    };
    /**
     * set a content-item in this block to published, then reload
     * @param {ContextComplete} context
     * @param {string} part
     * @param {number} sortOrder
     */
    ContentListActions.prototype.publish = function (context, part, sortOrder) {
        return getAndReload(context, 'view/module/publish', {
            part: part,
            sortOrder: sortOrder,
        });
    };
    /**
     * publish an item using it's ID
     * @param {ContextComplete} context
     * @param {number} entityId
     */
    ContentListActions.prototype.publishId = function (context, entityId) {
        return getAndReload(context, 'view/module/publish', { id: entityId });
    };
    return ContentListActions;
}());
var Actions = new ContentListActions();
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * internal helper, to do something and reload the content block
 * @param {ContextComplete} context
 * @param {string} url
 * @param {ContentListActionParams} params
 * @returns {void | T}
 */
function getAndReload(context, url, params) {
    return new Promise(function (resolve, reject) {
        context.sxc.webApi
            .get({
            url: url,
            params: params,
        })
            .done(function (data, textStatus, jqXHR) {
            if (jqXHR.status === 204 || jqXHR.status === 200) {
                // resolve the promise with the response text
                resolve(data);
            }
            else {
                // otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(textStatus));
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            reject(Error(errorThrown));
        });
    }).then(function () {
        __WEBPACK_IMPORTED_MODULE_0__contentBlock_render__["renderer"].reloadAndReInitialize(context);
    });
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
function translate(key) {
    var tFn = $.t;
    return (tFn && tFn(key)) || key;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ToSxcName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SxcVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiExtensionPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MetaHeaderJsApi; });
var ToSxcName = "2sxc";
var SxcVersion = "10.28.00";
var HeaderNames = {
    // 2sxc specific header
    ContentBlockId: "ContentBlockId",
    // headers as defined by DNN
    ModuleId: "ModuleId",
    TabId: "TabId",
    Rvt: "RequestVerificationToken"
};
var ApiExtensionPlaceholder = '{extension}';
var MetaHeaderJsApi = '_jsApi';


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTools", function() { return HtmlTools; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(3);


var HtmlTools = /** @class */ (function () {
    function HtmlTools() {
    }
    HtmlTools.disable = function (tag) {
        var jtag = $(tag);
        jtag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["C"].Toolbar.attr.disable, 'true');
    };
    HtmlTools.isDisabled = function (sxc) {
        var tag = $(__WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxc));
        return !!tag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["C"].Toolbar.attr.disable);
    };
    /**
     * Find the text of one or more attributes in fallback order, till we found one
     */
    HtmlTools.getFirstAttribute = function (toolbar, name1, name2) {
        return HtmlTools.tryGetAttrText(toolbar, name1) || HtmlTools.tryGetAttrText(toolbar, name2) || '{}';
    };
    /**
     * Get text-content of an attribute (or return null)
     */
    HtmlTools.tryGetAttrText = function (tag, name) {
        var item1 = tag.attributes.getNamedItem(name);
        return item1 && item1.textContent;
    };
    /**
     * Add html classes to a DOM element
     */
    HtmlTools.addClasses = function (element, classes) {
        if (!classes)
            return;
        if (classes.indexOf(','))
            classes = classes.replace(',', ' ');
        var classessArray = classes.split(' ');
        for (var c = 0; c < classessArray.length; c++)
            if (classessArray[c])
                element.classList.add(classessArray[c]);
    };
    return HtmlTools;
}());



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_manager__ = __webpack_require__(25);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarManager", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar_manager__["ToolbarManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_toolbars_tag_toolbar__ = __webpack_require__(42);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagToolbar", function() { return __WEBPACK_IMPORTED_MODULE_1__tag_toolbars_tag_toolbar__["TagToolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag_toolbars_tag_toolbar_manager__ = __webpack_require__(43);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagToolbarManager", function() { return __WEBPACK_IMPORTED_MODULE_2__tag_toolbars_tag_toolbar_manager__["TagToolbarManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render_toolbar_renderer__ = __webpack_require__(26);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarRenderer", function() { return __WEBPACK_IMPORTED_MODULE_3__render_toolbar_renderer__["ToolbarRenderer"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initialize_toolbar_init_config__ = __webpack_require__(46);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarInitConfig", function() { return __WEBPACK_IMPORTED_MODULE_4__initialize_toolbar_init_config__["ToolbarInitConfig"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__initialize_toolbar_finder_and_initializer__ = __webpack_require__(94);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigFinderAndInitializer", function() { return __WEBPACK_IMPORTED_MODULE_5__initialize_toolbar_finder_and_initializer__["ToolbarConfigFinderAndInitializer"]; });








/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__window__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__window__, "Debug")) __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_0__window__["Debug"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__window__, "HasLog")) __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_0__window__["HasLog"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__window__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_0__window__["SxcInstanceWithInternals"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__window__, "UrlParamManager")) __webpack_require__.d(__webpack_exports__, "UrlParamManager", function() { return __WEBPACK_IMPORTED_MODULE_0__window__["UrlParamManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_total_popup__ = __webpack_require__(62);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_url_param_manager__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "UrlParamManager", function() { return __WEBPACK_IMPORTED_MODULE_2__tools_url_param_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging__ = __webpack_require__(4);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_3__logging__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_root_environment__ = __webpack_require__(64);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_js_info__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_js_info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__environment_js_info__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__environment_js_info__, "Debug")) __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_5__environment_js_info__["Debug"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__environment_js_info__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_5__environment_js_info__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__http_sxc_http__ = __webpack_require__(66);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sxc_instance__ = __webpack_require__(67);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__sxc_instance__, "Debug")) __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_7__sxc_instance__["Debug"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__sxc_instance__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_7__sxc_instance__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sxc_root_debug__ = __webpack_require__(183);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_8__sxc_root_debug__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sxc_root_sxc_root__ = __webpack_require__(72);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sxc_root_sxc_root_builder__ = __webpack_require__(185);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sxc_root_sxc_root_internals__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sxc_root_sxc_root_internals___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__sxc_root_sxc_root_internals__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__sxc_root_sxc_root_internals__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_11__sxc_root_sxc_root_internals__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sxc_instance_sxc_instance_manage__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sxc_instance_sxc_instance_manage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__sxc_instance_sxc_instance_manage__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_12__sxc_instance_sxc_instance_manage__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_12__sxc_instance_sxc_instance_manage__["SxcInstanceWithInternals"]; });
/*
    This is just a type-index entry point.
    The purpose is that other 2sxc projects in this repo can access all the types
    in this project from here, without having to know the exact code files

    Note that the order of things in this file can cause trouble
    As webpack needs the order to be correct, meaning some depedencies need to be early
*/
// early things without dependencies, which may be needed by others



// must be pretty early, because most objects rely on this
// and ATM having this on top changes the load order
// this is a side-effect-problem from not clearly using modules












/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderer", function() { return renderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quick_edit_quick_e__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_block_editor__ = __webpack_require__(34);






/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {ContextComplete} context
     * @param {string} newContent
     * @returns {} nothing
     */
    Renderer.prototype.showMessage = function (context, newContent) {
        $(__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getTag(context.sxc)).html(newContent);
    };
    /**
     * this one assumes a replace / change has already happened, but now must be finalized...
     * @param {ContextComplete} context
     * @param {boolean} forceAjax
     * @param {boolean} preview
     */
    Renderer.prototype.reloadAndReInitialize = function (context, forceAjax, preview) {
        // if ajax is not supported, we must reload the whole page
        if (!forceAjax && !context.app.supportsAjax) {
            __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__["windowInPage"].location.reload();
            return Promise.resolve();
        }
        return this.ajaxLoad(context, __WEBPACK_IMPORTED_MODULE_0__constants__["C"].ContentBlock.UseExistingTemplate, preview)
            .then(function (result) {
            // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
            if (__WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__["windowInPage"].dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
                try {
                    __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__["windowInPage"].dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                }
                catch (e) {
                    // ignore
                }
            }
            // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
            // must check for side-effects, which would need the manager to re-build the configuration
            // 2018-11-03 2dm disabled completely for now
            // quickDialog.hide();
            return result;
        }).catch(function (error) { return console.log('Error in reloadAndReInitialize', error); });
    };
    /**
     * ajax-call, then replace
     * @param {ContextComplete} context
     * @param {number} alternateTemplateId
     * @param {boolean} justPreview
     */
    Renderer.prototype.ajaxLoad = function (context, alternateTemplateId, justPreview) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_5__content_block_editor__["ContentBlockEditor"].getPreviewWithTemplate(context, alternateTemplateId)
            .then(function (result) {
            _this.replaceContentBlock(context, result, justPreview);
        })
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_4__quick_edit_quick_e__["QuickE"].reset();
        }); // reset quick-edit, because the config could have changed
    };
    /**
     * ajax update/replace the content of the content-block
     * optionally also initialize the toolbar (if not just preview)
     * @param {ContextComplete} context
     * @param {string} newContent
     * @param {boolean} justPreview
     */
    Renderer.prototype.replaceContentBlock = function (context, newContent, justPreview) {
        try {
            var newDom = $(newContent);
            // Must disable toolbar before we attach to DOM
            if (justPreview)
                __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__["HtmlTools"].disable(newDom);
            $(__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getTag(context.sxc)).replaceWith(newDom);
            // reset the cache, so the sxc-object is refreshed
            context.sxc.recreate(true);
        }
        catch (e) {
            console.log('Error while rendering template:', e);
        }
    };
    return Renderer;
}());
var renderer = new Renderer();


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextForLists", function() { return ContextForLists; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);

var ContextForLists = /** @class */ (function () {
    function ContextForLists() {
    }
    ContextForLists.getFromDom = function (tag) {
        var result = JSON.parse($(tag).attr(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.context) || null) || {};
        result.appList = []; // empty by default
        if (result != null && typeof (result.apps) === 'string' && result.apps.length > 1)
            result.appList = result.apps
                .split(',')
                .map(function (s) { return s.trim(); }) // trim
                .filter(function (s) { return !!s; }); // drop empty ones
        return result;
    };
    return ContextForLists;
}());



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TypeTbD__ = __webpack_require__(89);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isNothing", function() { return __WEBPACK_IMPORTED_MODULE_0__TypeTbD__["isNothing"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__2sxc_src_plumbing__ = __webpack_require__(73);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__2sxc_src_plumbing__) if(["isNothing","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__2sxc_src_plumbing__[key]; }) }(__WEBPACK_IMPORT_KEY__));




/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts_context_app__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfApp", function() { return __WEBPACK_IMPORTED_MODULE_0__parts_context_app__["ContextOfApp"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextComplete", function() { return __WEBPACK_IMPORTED_MODULE_1__bundles_context_bundle_button__["ContextComplete"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parts_context_content_block__ = __webpack_require__(47);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_2__parts_context_content_block__["ContextOfContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parts_context_instance__ = __webpack_require__(48);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfInstance", function() { return __WEBPACK_IMPORTED_MODULE_3__parts_context_instance__["ContextOfInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parts_context_item__ = __webpack_require__(49);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfItem", function() { return __WEBPACK_IMPORTED_MODULE_4__parts_context_item__["ContextOfItem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parts_context_page__ = __webpack_require__(50);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfPage", function() { return __WEBPACK_IMPORTED_MODULE_5__parts_context_page__["ContextOfPage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parts_context_system__ = __webpack_require__(51);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfSystem", function() { return __WEBPACK_IMPORTED_MODULE_6__parts_context_system__["ContextOfSystem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parts_context_tenant__ = __webpack_require__(52);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfTenant", function() { return __WEBPACK_IMPORTED_MODULE_7__parts_context_tenant__["ContextOfTenant"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bundles_context_bundle_toolbar__ = __webpack_require__(27);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return __WEBPACK_IMPORTED_MODULE_8__bundles_context_bundle_toolbar__["ContextBundleToolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__parts_context_ui__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUi", function() { return __WEBPACK_IMPORTED_MODULE_9__parts_context_ui__["ContextOfUi"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__parts_context_user__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUser", function() { return __WEBPACK_IMPORTED_MODULE_10__parts_context_user__["ContextOfUser"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bundles_context_bundle_instance__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return __WEBPACK_IMPORTED_MODULE_11__bundles_context_bundle_instance__["ContextBundleInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bundles_context_bundle_content__ = __webpack_require__(53);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContent", function() { return __WEBPACK_IMPORTED_MODULE_12__bundles_context_bundle_content__["ContextBundleContent"]; });















/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_formats_in_page_button__ = __webpack_require__(55);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InPageButtonJson", function() { return __WEBPACK_IMPORTED_MODULE_0__config_formats_in_page_button__["InPageButtonJson"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_formats_in_page_command__ = __webpack_require__(97);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InPageCommandJson", function() { return __WEBPACK_IMPORTED_MODULE_1__config_formats_in_page_command__["InPageCommandJson"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_formats_in_page_button_group__ = __webpack_require__(98);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InPageButtonGroupJson", function() { return __WEBPACK_IMPORTED_MODULE_2__config_formats_in_page_button_group__["InPageButtonGroupJson"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_config_loader__ = __webpack_require__(99);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_3__button_config_loader__["ButtonConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__command_config_loader__ = __webpack_require__(100);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CommandConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_4__command_config_loader__["CommandConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__group_config_loader__ = __webpack_require__(101);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonGroupConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_5__group_config_loader__["ButtonGroupConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__toolbar_config_loader_v09__ = __webpack_require__(102);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoaderV09", function() { return __WEBPACK_IMPORTED_MODULE_6__toolbar_config_loader_v09__["ToolbarConfigLoaderV09"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_config_loader_v10__ = __webpack_require__(111);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoaderV10", function() { return __WEBPACK_IMPORTED_MODULE_7__toolbar_config_loader_v10__["ToolbarConfigLoaderV10"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_config_loader__ = __webpack_require__(54);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_8__toolbar_config_loader__["ToolbarConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_formats_toolbar_wip__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_formats_toolbar_wip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__config_formats_toolbar_wip__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_9__config_formats_toolbar_wip__) if(["InPageButtonJson","InPageCommandJson","InPageButtonGroupJson","ButtonConfigLoader","CommandConfigLoader","ButtonGroupConfigLoader","ToolbarConfigLoaderV09","ToolbarConfigLoaderV10","ToolbarConfigLoader","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_9__config_formats_toolbar_wip__[key]; }) }(__WEBPACK_IMPORT_KEY__));












/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule_constants__ = __webpack_require__(112);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleConstants", function() { return __WEBPACK_IMPORTED_MODULE_0__rule_constants__["RuleConstants"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operators__ = __webpack_require__(113);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Operations", function() { return __WEBPACK_IMPORTED_MODULE_1__operators__["Operations"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__build_steps__ = __webpack_require__(33);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BuildSteps", function() { return __WEBPACK_IMPORTED_MODULE_2__build_steps__["BuildSteps"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rule_params__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rule_params___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__rule_params__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_3__rule_params__) if(["RuleConstants","Operations","BuildSteps","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_3__rule_params__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rule_params_helper__ = __webpack_require__(115);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleParamsHelper", function() { return __WEBPACK_IMPORTED_MODULE_4__rule_params_helper__["RuleParamsHelper"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rule__ = __webpack_require__(116);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BuildRule", function() { return __WEBPACK_IMPORTED_MODULE_5__rule__["BuildRule"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rule_manager__ = __webpack_require__(117);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RuleManager", function() { return __WEBPACK_IMPORTED_MODULE_6__rule_manager__["RuleManager"]; });









/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdEdit", function() { return CmdEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdEditDialog", function() { return CmdEditDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdEdit = 'edit';
var CmdEditDialog = 'edit';
/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdEdit, 'Edit', 'pencil', false, true, {
    addParamsToLink: function (ctx) { return ({ mode: 'edit' }); },
    showCondition: function (ctx) {
        // need ID or a "slot", otherwise edit won't work
        var result = !!ctx.button.command.params.entityId ||
            !!ctx.button.command.params.useModuleList;
        return result;
    },
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickE", function() { return QuickE; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var configAttr = 'quick-edit-config';
var classForAddContent = 'sc-content-block-menu-addcontent';
var classForAddApp = 'sc-content-block-menu-addapp';
var selectedOverlay = $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
    .append(btn('delete', 'trash-empty', 'Delete'), btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'), "<div id='paneList'></div>");
selectedOverlay.toggleOverlay = function (target) {
    if (!target || target.length === 0) {
        selectedOverlay.hide();
    }
    else {
        var coords = __WEBPACK_IMPORTED_MODULE_0____["Positioning"].get(target);
        coords.yh = coords.y + 20;
        __WEBPACK_IMPORTED_MODULE_0____["Positioning"].positionAndAlign(selectedOverlay, coords);
        selectedOverlay.target = target;
    }
};
/**
 * the quick-edit object
 * the quick-insert object
 */
var QuickESingleton = /** @class */ (function () {
    function QuickESingleton() {
        this.body = $('body');
        this.win = $(window);
        this.main = $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>");
        this.template = "<a class='" + classForAddContent + " sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>"
            + ("<a class='" + classForAddApp + " sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>")
            + ("" + btn('select', 'ok', 'Select', true) + btn('paste', 'paste', 'Paste', true, true));
        this.selected = selectedOverlay;
        // will be populated later in the module section
        this.contentBlocks = null;
        this.cachedPanes = null;
        this.modules = null;
        this.nearestCb = null;
        this.nearestMod = null;
        // add stuff which depends on other values to create
        this.cbActions = $(this.template);
        this.modActions = $(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
            .attr('data-context', 'module')
            .addClass('sc-content-block-menu-module');
        //
        this.config = {
            enable: true,
            innerBlocks: {
                enable: null,
            },
            modules: {
                enable: null,
            },
        };
        this.modActions.click(__WEBPACK_IMPORTED_MODULE_0____["ModifierDnnModule"].onModuleButtonClick);
        this.cbActions.click(__WEBPACK_IMPORTED_MODULE_0____["ModifierContentBlock"].onCbButtonClick);
    }
    QuickESingleton.prototype.prepareToolbarInDom = function () {
        this.body
            .append(this.main)
            .append(this.selected);
        this.main
            .append(this.cbActions)
            .append(this.modActions);
    };
    QuickESingleton.prototype.start = function () {
        try {
            this.loadPageConfig();
            if (this.config.enable) {
                // initialize first body-offset
                this.bodyOffset = __WEBPACK_IMPORTED_MODULE_0____["Positioning"].getBodyPosition();
                enable();
                toggleParts();
                watchMouse();
            }
        }
        catch (e) {
            console.error("couldn't start quick-edit", e);
        }
    };
    /**
     * reset the quick-edit
     * for example after ajax-loading a content-block, which may cause changed configurations
     */
    QuickESingleton.prototype.reset = function () {
        this.loadPageConfig();
        toggleParts();
    };
    QuickESingleton.prototype.loadPageConfig = function () {
        var conf = this.config;
        var configs = $("[" + configAttr + "]");
        var confJ;
        // a.ny inner blocks found? will currently affect if modules can be inserted...
        var hasInnerCBs = ($(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector).length > 0);
        if (configs.length > 0) {
            // go through reverse list, as the last is the most important...
            var finalConfig = {};
            for (var c = configs.length; c >= 0; c--) {
                confJ = configs[0].getAttribute(configAttr);
                try {
                    var confO = JSON.parse(confJ);
                    finalConfig = __assign(__assign({}, finalConfig), confO);
                }
                catch (e) {
                    console.warn('had trouble with json', e);
                }
            }
            conf = this.config = __assign(__assign({}, conf), finalConfig);
        }
        // re-check "auto" or "null"
        // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
        if (conf.modules.enable === null || conf.modules.enable === 'auto')
            conf.modules.enable = !hasInnerCBs;
        // for now, ContentBlocks are only enabled if they exist on the page
        if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
            conf.innerBlocks.enable = hasInnerCBs;
    };
    return QuickESingleton;
}());
var QuickE = new QuickESingleton();
function btn(action, icon, i18N, invisible, unavailable, classes) {
    return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + " " + (invisible ? ' sc-invisible ' : '') + (unavailable ? ' sc-unavailable ' : '') + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
}
function enable() {
    // build all toolbar html-elements
    QuickE.prepareToolbarInDom();
    // Cache the panes (because panes can't change dynamically)
    initPanes();
}
/**
 * start watching for mouse-move
 */
function watchMouse() {
    var refreshTimeout = null;
    $('body').on('mousemove', function (e) {
        if (refreshTimeout === null)
            refreshTimeout = window.setTimeout(function () {
                requestAnimationFrame(function () {
                    __WEBPACK_IMPORTED_MODULE_0____["Positioning"].refresh(e);
                    refreshTimeout = null;
                });
            }, 20);
    });
}
/**
 * cache the panes which can contain modules
 */
function initPanes() {
    QuickE.cachedPanes = $(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
    QuickE.cachedPanes.addClass('sc-cb-pane-glow');
}
/**
 * enable/disable module/content-blocks as configured
 * TODO: 2dm - unclear why this is commented out, probably a bug that was never fixed
 */
function toggleParts() {
    //// content blocks actions
    // quickE.cbActions.toggle(quickE.config.innerBlocks.enable);
    //// module actions
    // quickE.modActions.hide(quickE.config.modules.enable);
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarManager", function() { return ToolbarManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_loaders_toolbar_config_loader__ = __webpack_require__(54);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import { context } from '../context/context';




/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
var ToolbarManagerGlobal = /** @class */ (function (_super) {
    __extends(ToolbarManagerGlobal, _super);
    function ToolbarManagerGlobal() {
        var _this = _super.call(this, 'Tlb.Mngr', null, 'init') || this;
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('system', 'toolbar-manager', _this.log);
        _this.toolbarFinder = new __WEBPACK_IMPORTED_MODULE_0____["ToolbarConfigFinderAndInitializer"](_this);
        return _this;
    }
    ToolbarManagerGlobal.prototype.buildModule = function (parentTag, optionalId) {
        this.toolbarFinder.buildDnnModule(parentTag, optionalId);
    };
    ToolbarManagerGlobal.prototype.build = function (node) {
        this.toolbarFinder.build(node);
    };
    // generate button html
    ToolbarManagerGlobal.prototype.generateButtonHtml = function (context, groupIndex) {
        new __WEBPACK_IMPORTED_MODULE_0____["ToolbarRenderer"](context).button.render(context, groupIndex);
    };
    ToolbarManagerGlobal.prototype.generateToolbarHtml = function (context) {
        return new __WEBPACK_IMPORTED_MODULE_0____["ToolbarRenderer"](context).render();
    };
    ToolbarManagerGlobal.prototype.loadConfig = function (context, config) {
        var loader = this.getLoader(JSON.stringify(config.toolbar || ''));
        return loader.load(context, config);
    };
    /** Generate a single-use loader. It must be single use so the logs work */
    ToolbarManagerGlobal.prototype.getLoader = function (instanceName) {
        var loader = new __WEBPACK_IMPORTED_MODULE_2__config_loaders_toolbar_config_loader__["ToolbarConfigLoader"](this);
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('toolbar', instanceName, loader.log);
        return loader;
    };
    return ToolbarManagerGlobal;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
var ToolbarManager = new ToolbarManagerGlobal();


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarRenderer", function() { return ToolbarRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_button__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render_groups__ = __webpack_require__(93);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var ToolbarRenderer = /** @class */ (function (_super) {
    __extends(ToolbarRenderer, _super);
    function ToolbarRenderer(context) {
        var _a;
        var _this = _super.call(this, 'Rnd.Toolbr') || this;
        _this.context = context;
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('toolbar-render', ((_a = context.toolbar) === null || _a === void 0 ? void 0 : _a.identifier) || '', _this.log);
        _this.groups = new __WEBPACK_IMPORTED_MODULE_3__render_groups__["RenderButtonGroups"](_this);
        _this.button = new __WEBPACK_IMPORTED_MODULE_2__render_button__["RenderButton"](_this);
        return _this;
    }
    ToolbarRenderer.prototype.render = function () {
        var cl = this.log.call('generate');
        return cl.return(this.generate().outerHTML);
    };
    ToolbarRenderer.prototype.generate = function () {
        var _a;
        var cl = this.log.call('generate');
        // render groups of buttons
        var context = this.context;
        cl.data('toolbar config', context.toolbar);
        var groups = this.groups.generate(context);
        // render toolbar
        var tlbTag = document.createElement('ul');
        tlbTag.setAttribute('toolbar-identifier', (_a = context.toolbar) === null || _a === void 0 ? void 0 : _a.identifier);
        tlbTag.classList.add('sc-menu');
        tlbTag.classList.add('group-0'); // IE11 fix, add each class separately
        // add behaviour classes
        var settings = context.toolbar.settings;
        tlbTag.classList.add("sc-tb-hover-" + settings.hover);
        tlbTag.classList.add("sc-tb-show-" + settings.show);
        if (context.toolbar.params.sortOrder === -1)
            tlbTag.classList.add('listContent');
        __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].addClasses(tlbTag, settings.class || settings.classes);
        // add button groups to toolbar
        tlbTag.setAttribute('group-count', context.toolbar.groups.length.toString());
        for (var g = 0; g < groups.length; g++)
            tlbTag.appendChild(groups[g]);
        return cl.return(tlbTag, 'done');
    };
    return ToolbarRenderer;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return ContextBundleToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(95);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ContextBundleToolbar = /** @class */ (function (_super) {
    __extends(ContextBundleToolbar, _super);
    function ContextBundleToolbar(editCtx) {
        return _super.call(this, editCtx) || this;
        // note that the toolbar will not be filled here, as it will be filled somewhere else
    }
    ContextBundleToolbar.prototype.forButton = function (button) {
        // the ContextBundleButton is the same as toolbar, just with .button
        var clone = __assign({}, this);
        clone.button = button;
        return clone;
    };
    return ContextBundleToolbar;
}(__WEBPACK_IMPORTED_MODULE_0____["ContextBundleContent"]));



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return ContextBundleInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parts_context_app__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parts_context_ui__ = __webpack_require__(30);



var ContextBundleInstance = /** @class */ (function () {
    function ContextBundleInstance(editCtx) {
        this._isContext = true;
        // this will be about the current app, settings of the app, app - paths, etc.
        this.app = new __WEBPACK_IMPORTED_MODULE_1__parts_context_app__["ContextOfApp"](editCtx);
        // information related to the current DNN module, incl.instanceId, etc.
        this.instance = new __WEBPACK_IMPORTED_MODULE_0__parts__["ContextOfInstance"](editCtx);
        // things about the user
        this.user = new __WEBPACK_IMPORTED_MODULE_0__parts__["ContextOfUser"](editCtx);
        // this will be information related to the current page
        this.page = new __WEBPACK_IMPORTED_MODULE_0__parts__["ContextOfPage"](editCtx);
        // this will be everything about the current system, like system / api -paths etc.
        this.system = new __WEBPACK_IMPORTED_MODULE_0__parts__["ContextOfSystem"](editCtx);
        // this will be something about the current tenant(the dnn portal)
        this.tenant = new __WEBPACK_IMPORTED_MODULE_0__parts__["ContextOfTenant"](editCtx);
        // ensure that the UI will load the correct assets to enable editing
        this.ui = new __WEBPACK_IMPORTED_MODULE_2__parts_context_ui__["ContextOfUi"](editCtx);
    }
    ContextBundleInstance.is = function (thing) {
        var maybeButton = thing;
        return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
    };
    return ContextBundleInstance;
}());



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfApp", function() { return ContextOfApp; });
/**
 * this will be about the current app, settings of the app, app - paths, etc.
 */
var ContextOfApp = /** @class */ (function () {
    function ContextOfApp(editCtx) {
        // Initialize Content-Group App information
        if (editCtx.ContentGroup) {
            this.id = editCtx.ContentGroup.AppId; // or NgDialogParams.appId
            this.isContent = editCtx.ContentGroup.IsContent;
            this.resourcesId = editCtx.ContentGroup.AppResourcesId;
            this.settingsId = editCtx.ContentGroup.AppSettingsId;
            this.appPath = editCtx.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
            this.hasContent = editCtx.ContentGroup.HasContent;
            this.supportsAjax = editCtx.ContentGroup.SupportsAjax;
            this.zoneId = editCtx.ContentGroup.ZoneId; // or NgDialogParams.zoneId
        }
        // Initialize language information
        if (editCtx.Language) {
            this.currentLanguage = editCtx.Language.Current; // NgDialogParams.lang
            this.primaryLanguage = editCtx.Language.Primary; // NgDialogParams.langpri
            this.allLanguages = editCtx.Language.All; // or NgDialogParams.langs
        }
    }
    return ContextOfApp;
}());



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfUi", function() { return ContextOfUi; });
/**
 * ensure that the UI will load the correct assets to enable editing
 */
var ContextOfUi = /** @class */ (function () {
    function ContextOfUi(editCtx) {
        if (editCtx.Ui) {
            this.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
            if (editCtx.Ui.Form)
                this.form = editCtx.Ui.Form; // decide which dialog opens, eg ng8
        }
    }
    return ContextOfUi;
}());



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfUser", function() { return ContextOfUser; });
/**
 * things about the user
 * note that the properties are also used in url-params and ajax calls, so don't rename
 */
var ContextOfUser = /** @class */ (function () {
    function ContextOfUser(editCtx) {
        if (!editCtx || !editCtx.User)
            return;
        this.canDesign = editCtx.User.CanDesign;
        this.canDevelop = editCtx.User.CanDevelop;
    }
    ContextOfUser.fromContext = function (context) {
        var user = new ContextOfUser();
        user.canDesign = context.user.canDesign;
        user.canDevelop = context.user.canDevelop;
        return user;
    };
    return ContextOfUser;
}());



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateConstants", function() { return TemplateConstants; });
var TemplateConstants = {
    NameDefault: 'default',
    NameEmpty: 'empty',
    GroupDefault: 'default',
    GroupList: 'list',
    GroupEditAdvanced: 'edit-advanced',
    GroupView: 'view',
    GroupApp: 'app',
    GroupUnknown: 'unknown',
    ButtonSeparator: ',',
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildSteps", function() { return BuildSteps; });
var BuildSteps;
(function (BuildSteps) {
    BuildSteps["toolbar"] = "toolbar";
    BuildSteps["group"] = "group";
    BuildSteps["button"] = "button";
    BuildSteps["params"] = "params";
    BuildSteps["settings"] = "settings";
})(BuildSteps || (BuildSteps = {}));


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBlockEditor", function() { return ContentBlockEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_index__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var ContentBlockEditorSingleton = /** @class */ (function (_super) {
    __extends(ContentBlockEditorSingleton, _super);
    function ContentBlockEditorSingleton() {
        var _this = _super.call(this, 'Sys.CbEdit') || this;
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('system', 'cb-editor-api', _this.log);
        return _this;
    }
    /**
     * prepare the instance so content can be added
     * this ensure the content-group has been created, which is required to add content
     * @param {ContextComplete} context
     */
    ContentBlockEditorSingleton.prototype.prepareToAddContent = function (context, useModuleList) {
        var cl = this.log.call('prepareToAddContent');
        var isCreated = context.contentBlock.isCreated;
        if (isCreated || !useModuleList)
            return cl.return(Promise.resolve());
        // persist the template
        var promise = this.updateTemplate(context, context.contentBlock.templateId, true);
        return cl.return(promise, 'ok');
    };
    /**
     * Update the template and adjust UI accordingly.
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} forceCreate
     */
    ContentBlockEditorSingleton.prototype.updateTemplateFromDia = function (context, templateId) {
        var cl = this.log.call('updateTemplateFromDia', "..., " + templateId);
        var wasShowingPreview = __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].isDisabled(context.sxc);
        cl.add("wasShowingPreview: " + wasShowingPreview);
        var promise = this.updateTemplate(context, templateId, false)
            .then(function () {
            // only reload on ajax, not on app as that was already re-loaded on the preview
            // necessary to show the original template again
            if (wasShowingPreview)
                __WEBPACK_IMPORTED_MODULE_2__render__["renderer"].reloadAndReInitialize(context);
        });
        return cl.return(promise);
    };
    /**
     * Retrieve the preview from the web-api
     * @param {ContextComplete} context
     * @param {number} templateId
     * @returns {promise} promise with the html in the result
     */
    ContentBlockEditorSingleton.prototype.getPreviewWithTemplate = function (context, templateId) {
        var cl = this.log.call('getPreviewWithTemplate', "..., " + templateId);
        templateId = templateId || __WEBPACK_IMPORTED_MODULE_3__constants_index__["C"].ContentBlock.UseExistingTemplate; // fallback, meaning use saved ID
        var params = {
            templateId: templateId,
            lang: context.app.currentLanguage,
            cbisentity: context.contentBlock.isEntity,
            cbid: context.contentBlock.id,
            originalparameters: JSON.stringify(context.instance.parameters),
        };
        cl.data('params', params);
        var promise = new Promise(function (resolve, reject) {
            context.sxc.webApi.get({ url: 'view/module/rendertemplate', params: params, dataType: 'html' })
                .done(function (data, textStatus, jqXhr) {
                if (jqXhr.status === 204 || jqXhr.status === 200) {
                    resolve(data); // resolve the promise with the response text
                }
                else {
                    reject(Error(textStatus)); // reject with status text - should be a meaningful
                }
            }).fail(function (jqXhr, textStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        });
        return cl.return(promise);
    };
    /**
     * Update the template.
     */
    ContentBlockEditorSingleton.prototype.updateTemplate = function (context, templateId, forceCreate) {
        var cl = this.log.call('updateTemplate');
        var promise = this.saveTemplate(context, templateId, forceCreate)
            .then(function (data) {
            if (!data)
                return null;
            // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
            var newGuid = data.replace(/[\",\']/g, '');
            if (console)
                console.log("created content group {" + newGuid + "}");
            return context.contentBlock.contentGroupId = newGuid;
        }).catch(function () {
            // error handling
            return alert('error - result not ok, was not able to create ContentGroup');
        });
        return cl.return(promise);
    };
    /**
     * Save the template configuration for this instance
     * @param {ContextComplete} context
     * @param {number} templateId
     * @param {boolean} [forceCreateContentGroup]
     * @returns {promise}
     */
    ContentBlockEditorSingleton.prototype.saveTemplate = function (context, templateId, forceCreateContentGroup) {
        var cl = this.log.call('saveTemplate');
        var params = {
            templateId: templateId,
            forceCreateContentGroup: forceCreateContentGroup,
            newTemplateChooserState: false,
        };
        cl.data('params', params);
        var promise = new Promise(function (resolve, reject) {
            context.sxc.webApi.get({ url: 'view/module/savetemplateid', params: params })
                .done(function (data, textStatus, jqXhr) {
                // resolve or reject based on http-status: 200 & 204 = ok
                if (jqXhr.status === 204 || jqXhr.status === 200)
                    resolve(data);
                else
                    reject(Error(textStatus));
            }).fail(function (jqXhr, textStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        });
        return cl.return(promise);
    };
    return ContentBlockEditorSingleton;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
var ContentBlockEditor = new ContentBlockEditorSingleton();


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdLayout", function() { return CmdLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_edit__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quick_edit_context_for_lists__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commands__ = __webpack_require__(10);





var CmdLayout = 'layout';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_4__commands__["Commands"].add(CmdLayout, 'ChangeLayout', 'glasses', true, true, {
    inlineWindow: function (_) { return true; },
    code: function (context, event) {
        // Try to find the closest tag based on the click
        // if this fails, try to find it based on the sxc-instance
        var attrSel = '[' + __WEBPACK_IMPORTED_MODULE_2__quick_edit__["QeSelectors"].blocks.cb.context + ']';
        var listSpecs = $(event.target).closest(attrSel);
        if (listSpecs.length === 0)
            listSpecs = $(__WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getTag(context.sxc)).closest(attrSel);
        // Now check if we have apps-parameters to pass on
        if (listSpecs.length > 0) {
            var specs = __WEBPACK_IMPORTED_MODULE_3__quick_edit_context_for_lists__["ContextForLists"].getFromDom(listSpecs);
            context.button.command.params.apps = specs.apps;
        }
        return __WEBPACK_IMPORTED_MODULE_0____["CmsEngine"].openDialog(context, event);
    },
});


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialog", function() { return QuickDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(37);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var diagShowClass = 'dia-select';
/** dialog manager - the currently active dialog object */
var current = null;
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
var QuickDialogManagerSingleton = /** @class */ (function (_super) {
    __extends(QuickDialogManagerSingleton, _super);
    function QuickDialogManagerSingleton() {
        var _this = _super.call(this, 'Qdl.Managr') || this;
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('quick-dialog', 'manager', _this.log);
        _this.container = new __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"](_this);
        return _this;
    }
    /**
     * Determines if a.ny dialog is currently showing
     */
    QuickDialogManagerSingleton.prototype.isVisible = function () {
        return current != null;
    };
    /**
     * toggle visibility
     * @param {boolean} [show] true/false optional
     */
    QuickDialogManagerSingleton.prototype.setVisible = function (show) {
        var cl = this.log.call('setVisible');
        var cont = this.container.getOrCreate();
        // if (show === undefined)
        //  show = !cont.hasClass(diagShowClass);
        // show/hide visually
        cont.toggleClass(diagShowClass, show);
        this.rememberDialogState(this.container.getIFrame(cont), show);
        current = show ? this.container.getIFrame() : null;
        cl.done();
    };
    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextComplete} context object
     * @param {string} url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param {string} [dialogName] - optional name of dialog, to check if it's already open
     * @returns {Promise<boolean>} jquery object of the iframe
     */
    QuickDialogManagerSingleton.prototype.showOrToggleFromToolbar = function (context, url, isFullscreen, dialogName) {
        var cl = this.log.call('showOrToggleFromToolbar', "ctx, url: '" + url + "', isFullScreen:" + isFullscreen + ", name:'" + dialogName + "'");
        this.container.setSize(isFullscreen);
        var iFrame = this.container.getIFrame();
        // in case it's a toggle
        if (this.isVisible()) {
            cl.add('is already visible');
            // check if we're just toggling the current, or will show a new one afterwards
            var isForSame = dialogName && current
                && current.bridge.isConfiguredFor(context.sxc.cacheKey, dialogName);
            var togglePromise = isForSame ? this.promise : null;
            this.cancel(current.bridge);
            // just a hide this, return the old promise
            if (togglePromise)
                return cl.return(togglePromise, 'just toggle off');
        }
        var dialogUrl = this.setUrlToQuickDialog(url);
        iFrame.bridge.setup(context.sxc, dialogName);
        iFrame.setAttribute('src', dialogUrl);
        // if the window had already been loaded, re-init
        if (iFrame.contentWindow && iFrame.contentWindow.reboot)
            iFrame.contentWindow.reboot();
        // make sure it's visible'
        this.setVisible(true);
        return cl.return(this.promiseRestart(), 'restart');
    };
    QuickDialogManagerSingleton.prototype.cancel = function (bridge) {
        var callLog = this.log.call('cancel');
        this.setVisible(false);
        __WEBPACK_IMPORTED_MODULE_3__state__["cancelled"].set('true');
        this.resolvePromise(bridge.changed);
        callLog.done();
    };
    QuickDialogManagerSingleton.prototype.rememberDialogState = function (iframe, state) {
        var callLog = this.log.call('rememberDialogState');
        callLog.add("qDialog persistDia(..., " + state + ")");
        if (state) {
            var cbId = iframe.bridge
                .getContext()
                .contentBlock.id.toString();
            callLog.add("contentBlockId: " + cbId + ")");
            return callLog.return(__WEBPACK_IMPORTED_MODULE_3__state__["cbId"].set(cbId));
        }
        return callLog.return(__WEBPACK_IMPORTED_MODULE_3__state__["cbId"].remove(), 'remove');
    };
    QuickDialogManagerSingleton.prototype.promiseRestart = function () {
        var _this = this;
        this.promise = new Promise(function (resolve) { return (_this.resolvePromise = resolve); });
        return this.promise;
    };
    //#endregion
    /**
     * rewrite the url to fit the quick-dialog situation
     * optionally with a live-compiled version from ng-serve
     * @param {string} url - original url pointing to the default dialog
     * @returns {string} new url pointing to quick dialog
     */
    QuickDialogManagerSingleton.prototype.setUrlToQuickDialog = function (url) {
        var cl = this.log.call('setUrlToQuickDialog', url);
        // change default url-schema from the primary angular-app to the quick-dialog
        url = url
            .replace(__WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.ng1, __WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.quickDialog)
            .replace(__WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.ng8, __WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.quickDialog);
        url = this.changePathToLocalhostForDev(url);
        return cl.return(url);
    };
    /**
     * special debug-code when running on local ng-serve
     * this is only activated if the developer manually sets a value in the localStorage
     * @param url
     */
    QuickDialogManagerSingleton.prototype.changePathToLocalhostForDev = function (url) {
        var cl = this.log.call('changePathToLocalhostForDev', url);
        try {
            var devMode = localStorage.getItem('devMode');
            if (devMode && !!devMode)
                return url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
        }
        catch (e) {
            // ignore
        }
        return cl.return(url);
    };
    return QuickDialogManagerSingleton;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
var QuickDialog = new QuickDialogManagerSingleton();


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cbId", function() { return cbId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return cancelled; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__ = __webpack_require__(149);

var cbId = new __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__["SessionStateHandler"]('dia-cbid');
var cancelled = new __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__["SessionStateHandler"]('cancelled-dialog');


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cms", function() { return Cms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_bundles_context_bundle_instance__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var logId = 'Cms.Api';
var Cms = /** @class */ (function (_super) {
    __extends(Cms, _super);
    function Cms() {
        var _this = _super.call(this, logId, null) || this;
        /**
         * if true (default) will reset the log everytime something is done
         * if false, will preserve the log over multiple calls
         */
        // autoReset = true;
        _this.autoDump = __WEBPACK_IMPORTED_MODULE_1__constants__["C"].Debug.cms.autoDump;
        return _this;
    }
    /**
     * reset / clear the log
     */
    Cms.prototype.resetLog = function () {
        this.log = new __WEBPACK_IMPORTED_MODULE_4__logging__["Log"](logId, null, 'log was reset');
        __WEBPACK_IMPORTED_MODULE_4__logging__["Insights"].add('cms', 'run', this.log);
    };
    Cms.prototype.run = function (context, nameOrSettings, eventOrSettings, event) {
        var _this = this;
        var cl = this.log.call('run<T>');
        var realCtx = __WEBPACK_IMPORTED_MODULE_3__context_bundles_context_bundle_instance__["ContextBundleInstance"].is(context)
            ? context
            : __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__["ContextComplete"].findContext(context);
        var result = this.do(function () {
            return new __WEBPACK_IMPORTED_MODULE_0__commands___["CmsEngine"](_this.log)
                .detectParamsAndRun(realCtx, nameOrSettings, eventOrSettings, event);
        });
        return cl.return(result, 'ok');
    };
    /**
     * reset/clear the log if alwaysResetLog is true
     */
    Cms.prototype.do = function (innerCall) {
        var cl = this.log.call('do');
        this.resetLog();
        var result = innerCall();
        if (this.autoDump)
            this.log.dump();
        return cl.return(result);
    };
    return Cms;
}(__WEBPACK_IMPORTED_MODULE_4__logging__["HasLog"]));



/***/ }),
/* 39 */
/***/ (function(module, exports) {



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Command = /** @class */ (function () {
    function Command(name) {
        this.name = name;
    }
    Command.prototype.merge = function (icon, translateKey, uiOnly, partOfPage, more) {
        this.buttonDefaults = __assign({ icon: function (_) { return "icon-sxc-" + icon; }, title: function (_) { return "Toolbar." + translateKey; }, uiActionOnly: function (_) { return uiOnly; }, partOfPage: function (_) { return partOfPage; } }, more);
    };
    Command.build = function (name, translateKey, icon, uiOnly, partOfPage, more) {
        if (typeof (partOfPage) !== 'boolean')
            throw 'partOfPage in commands not provided, order will be wrong!';
        var commandDefinition = new Command(name);
        // Toolbar API v2
        // this.commandDefinition.name = name;
        commandDefinition.merge(icon, translateKey, uiOnly, partOfPage, more);
        return commandDefinition;
    };
    return Command;
}());



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierContentBlock", function() { return ModifierContentBlock; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_for_lists__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modifier_content_block_internal__ = __webpack_require__(85);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * extend the quick edit with the core commands
 */
var ModifierContentBlock = /** @class */ (function (_super) {
    __extends(ModifierContentBlock, _super);
    function ModifierContentBlock() {
        return _super.call(this, 'QE.CntBlk') || this;
    }
    ModifierContentBlock.prototype.getInstanceModifier = function (tag) {
        var sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(tag);
        return new __WEBPACK_IMPORTED_MODULE_3__modifier_content_block_internal__["ModifierContentBlockInstance"](this, sxc);
    };
    ModifierContentBlock.prototype.delete = function (clip) {
        return this.getInstanceModifier(clip.list).delete(clip.parent, clip.field, clip.index);
    };
    ModifierContentBlock.prototype.create = function (parent, field, index, appOrContent, list, newGuid) {
        return this.getInstanceModifier(list).create(parent, field, index, appOrContent, list, newGuid);
    };
    ModifierContentBlock.prototype.move = function (oldClip, newClip) {
        var from = oldClip.index;
        var to = newClip.index;
        this.getInstanceModifier(oldClip.list).move(newClip.parent, newClip.field, from, to);
    };
    ModifierContentBlock.onCbButtonClick = function () {
        var list = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeContentBlock.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector);
        var listItems = list.find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.selector);
        var actionConfig = __WEBPACK_IMPORTED_MODULE_2__context_for_lists__["ContextForLists"].getFromDom(list);
        var index = 0;
        var newGuid = actionConfig.guid || null;
        if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeContentBlock.hasClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.class))
            index = listItems.index(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeContentBlock[0]) + 1;
        // check if it's a cut/paste action
        var cbAction = $(this).data('action');
        if (cbAction)
            return __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].do(cbAction, list, index, __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id);
        var appOrContent = $(this).data('type');
        return __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].modCb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
    };
    return ModifierContentBlock;
}(__WEBPACK_IMPORTED_MODULE_0____["ModifierBase"]));



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagToolbar", function() { return TagToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(15);


/**
 * This is the modern toolbar which is attached to a tag from whic it hovers.
 * Internally the toolbar Dom-Elements are hidden at the bottom of the page.
 * This object is responsible for creating them,
 * and making sure that hover-events etc. cause the right toolbar to show up.
 */
var TagToolbar = /** @class */ (function () {
    function TagToolbar(hoverTag, context) {
        this.hoverTag = hoverTag;
        this.context = context;
        this.toolbarElement = null;
        this.initialized = false;
        // Ensure toolbar gets visible when hovering
        this.addMouseEvents(hoverTag);
    }
    /**
     * Attach Mouse-Enter and Mouse-Leave events to ensure show/hide of the toolbar
     */
    TagToolbar.prototype.addMouseEvents = function (hoverTag) {
        var _this = this;
        hoverTag.on('mouseenter', function () {
            _this.initializeIfNecessary();
            _this.show();
        });
        hoverTag.on('mouseleave', function (e) {
            _this.initializeIfNecessary();
            // if we hover the menu itself now, don't hide it
            if (!$.contains(_this.toolbarElement[0], e.relatedTarget) && _this.toolbarElement[0] !== e.relatedTarget)
                _this.hide();
        });
    };
    TagToolbar.prototype.initializeIfNecessary = function () {
        var _this = this;
        if (this.initialized)
            return;
        var nextFreeId = __WEBPACK_IMPORTED_MODULE_0____["TagToolbarManager"].getNextToolbarId();
        var toolbarId = this.context.instance.id + "-" + this.context.contentBlock.id + "-" + nextFreeId;
        // render toolbar and append tag to body
        this.toolbarElement = $(new __WEBPACK_IMPORTED_MODULE_0____["ToolbarRenderer"](this.context).render());
        this.toolbarElement.on('mouseleave', function (e) {
            // if we do not hover the tag now, hide it
            if (!$.contains(_this.hoverTag[0], e.relatedTarget) && _this.hoverTag[0] !== e.relatedTarget)
                _this.hide();
        });
        $('body').append(this.toolbarElement);
        this.toolbarElement.attr(__WEBPACK_IMPORTED_MODULE_0____["TagToolbarManager"].TagToolbarForAttr, toolbarId);
        this.hoverTag.attr(__WEBPACK_IMPORTED_MODULE_0____["TagToolbarManager"].TagToolbarAttr, toolbarId);
        this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });
        this.initialized = true;
    };
    TagToolbar.prototype.updatePosition = function () {
        var position = {
            top: 'auto',
            left: 'auto',
            right: 'auto',
            viewportOffset: this.hoverTag[0].getBoundingClientRect().top,
            bodyOffset: __WEBPACK_IMPORTED_MODULE_0____["TagToolbarManager"].getBodyScrollOffset(),
            tagScrollOffset: 0,
            tagOffset: this.hoverTag.offset(),
            tagWidth: this.hoverTag.outerWidth(),
            mousePos: __WEBPACK_IMPORTED_MODULE_0____["TagToolbarManager"].mousePosition,
            win: {
                scrollY: window.scrollY,
                width: $(window).width(),
            },
            padding: tagToolbarPadding,
        };
        // If we scrolled down, the toolbar might not be visible - calculate offset
        position.tagScrollOffset = Math.min(position.viewportOffset - position.bodyOffset.top, 0);
        // Update top coordinates
        if (position.tagScrollOffset === 0)
            position.top = position.tagOffset.top + tagToolbarPadding - position.bodyOffset.top;
        else
            position.top = position.mousePos.y + position.win.scrollY - position.bodyOffset.top - toolbarHeight / 2;
        // Update left / right coordinates
        // todo: try to change class to use attribute or something
        if (this.toolbarElement.hasClass('sc-tb-hover-right'))
            position.right = position.win.width - position.tagOffset.left - position.tagWidth + tagToolbarPaddingRight - position.bodyOffset.left;
        else
            position.left = position.tagOffset.left + tagToolbarPadding + position.bodyOffset.left;
        var cssPos = {
            top: position.top,
            left: position.left,
            right: position.right,
        };
        this.toolbarElement.css(cssPos);
    };
    /**
     * Hide the toolbar and detach scrolling-watcher
     */
    TagToolbar.prototype.hide = function () {
        var _this = this;
        $(window).off('scroll', function () { return _this.updatePosition(); });
        this.toolbarElement.css({ display: 'none' });
    };
    /**
     * Show the toolbar and attach scrolling watcher
     */
    TagToolbar.prototype.show = function () {
        var _this = this;
        this.toolbarElement.css({ display: 'block' });
        $(window).on('scroll', function () { return _this.updatePosition(); });
        this.updatePosition();
    };
    return TagToolbar;
}());

var tagToolbarPadding = 4;
var tagToolbarPaddingRight = 0;
var toolbarHeight = 20;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagToolbarManager", function() { return TagToolbarManager; });
/**
 * The global Tag Toolbar Manager is responsible for the new TagToolbars
 * These have certain shared aspects, like:
 * - a numbering scheme to keep them apart
 * - a mouse tracker to keep track of the position as the toolbar follows the scroll
 */
var TagToolbarManager = /** @class */ (function () {
    function TagToolbarManager() {
    }
    /** The next free ID to mark a TagToolbar */
    TagToolbarManager.getNextToolbarId = function () {
        return TagToolbarManager.lastMenuId++;
    };
    /**
     * Returns the body offset if positioning is relative or absolute
     */
    TagToolbarManager.getBodyScrollOffset = function () {
        var body = $('body');
        var bodyPos = body.css('position');
        if (bodyPos === 'relative' || bodyPos === 'absolute') {
            var offset = body.offset();
            return {
                top: offset.top,
                left: offset.left,
            };
        }
        return {
            top: 0,
            left: 0,
        };
    };
    /**
     * Remove orphan tag-toolbars from DOM
     * This can be necessary if the module was replaced by ajax,
     * leaving behind un-attached TagToolbars.
     */
    TagToolbarManager.CleanupOrphanedToolbars = function () {
        var tagToolbars = $("[" + TagToolbarManager.TagToolbarForAttr + "]");
        tagToolbars.each(function (i, e) {
            var id = $(e).attr(TagToolbarManager.TagToolbarForAttr);
            if (!$("[" + TagToolbarManager.TagToolbarAttr + "=" + id + "]").length) {
                $(e).remove();
            }
        });
    };
    /** Mark Dom-Notes with the ID which Tag-Toolbar they want on mouse-over */
    TagToolbarManager.TagToolbarAttr = 'data-tagtoolbar';
    /** Mark TagToolbar Html-Nodes with the ID of the Dom-Tag they belong to */
    TagToolbarManager.TagToolbarForAttr = 'data-tagtoolbar-for';
    /** The current mouseposition, always updated when the mouse changes */
    TagToolbarManager.mousePosition = {
        x: 0,
        y: 0,
    };
    TagToolbarManager.lastMenuId = 0;
    return TagToolbarManager;
}());

/**
 * Keep the mouse-position update for future use
 */
$(window).on('mousemove', function (e) {
    TagToolbarManager.mousePosition.x = e.clientX;
    TagToolbarManager.mousePosition.y = e.clientY;
});


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonSafe", function() { return ButtonSafe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plumbing__ = __webpack_require__(19);


/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 */
var ButtonSafe = /** @class */ (function () {
    function ButtonSafe(button, context) {
        var _this = this;
        this.button = button;
        this.context = context;
        this.action = function () { return _this.button.command; };
        this.classes = function () { return _this.button.classes || ''; };
        /** The dialog name - should default to the name */
        this.dialog = function () { return getVal(_this.button.dialog, _this.context, _this.button.command.name); };
        /** Determines if the button should be disabled */
        this.disabled = function () { return getVal(_this.button.disabled, _this.context, false); };
        /** Dynamicaly determine classes - must always be a function */
        this.dynamicClasses = function () { return getVal(_this.button.dynamicClasses, _this.context, ''); };
        /** Check if full-screen, always a function */
        this.fullScreen = function () { return getVal(_this.button.fullScreen, _this.context, false); };
        /** The icon to show in the button */
        this.icon = function () { return getVal(_this.button.icon, _this.context, ''); };
        /** Determine if it should use the inline window, always a function */
        this.inlineWindow = function () { return getVal(_this.button.inlineWindow, _this.context, false); };
        /** Check if we should open a new window, always an FN */
        this.newWindow = function () { return getVal(_this.button.newWindow, _this.context, false); };
        /** The parameters which are used to run the command */
        this.addParamsToLink = function () { return getVal(_this.button.addParamsToLink, _this.context, {}); };
        /** Determines if this button runs in the page - affecting publishing */
        this.partOfPage = function () { return getVal(_this.button.partOfPage, _this.context, false); };
        /** Method which determines if it should be shown or not */
        this.showCondition = function () { return getVal(_this.button.showCondition, _this.context, true); };
        /** The title of this button which will usually be i18n keys */
        this.title = function () { return getVal(_this.button.title, _this.context, 'unknown-title'); };
        /** this is just a UI interaction, won't create data so won't need pre-flight */
        this.uiActionOnly = function () { return getVal(_this.button.uiActionOnly, _this.context, true); };
    }
    return ButtonSafe;
}());

/** Evaluate a property or generator and return the property */
function getVal(propOrGen, ctx, fallback) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__plumbing__["isNothing"])(propOrGen))
        return fallback;
    var result = (__WEBPACK_IMPORTED_MODULE_0____["Button"].isPropGen(propOrGen) ? propOrGen(ctx) : propOrGen);
    return result === undefined ? fallback : result;
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPart", function() { return RenderPart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Base class for inner part renderers.
 * The goal is that we have the code in own objects, but that these can only be used
 * from the primary parent object of the type ToolbarRenderer
 *
 * @export
 * @class RenderPart
 */
var RenderPart = /** @class */ (function (_super) {
    __extends(RenderPart, _super);
    function RenderPart(parent, logName) {
        var _this = _super.call(this, logName, parent.log) || this;
        _this.parent = parent;
        return _this;
    }
    return RenderPart;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarInitConfig", function() { return ToolbarInitConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__ = __webpack_require__(14);


/**
 * The configuration / settings of a toolbar as loaded from the DOM
 */
var ToolbarInitConfig = /** @class */ (function () {
    function ToolbarInitConfig() {
    }
    /**
     * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
     * @param tag
     * @return a configuration object or null in case of an error
     */
    ToolbarInitConfig.loadFromTag = function (tag) {
        try {
            var newConfigFormat = __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__["HtmlTools"].tryGetAttrText(tag, __WEBPACK_IMPORTED_MODULE_0__constants__["C"].Toolbar.attr.full);
            if (newConfigFormat) {
                var result = JSON.parse(newConfigFormat);
                // check for new V10.27 format, which is just an array!
                if (Array.isArray(result))
                    return { toolbar: result };
                return result;
            }
            else {
                var at = __WEBPACK_IMPORTED_MODULE_0__constants__["C"].IDs.attr;
                var data = __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__["HtmlTools"].getFirstAttribute(tag, at.toolbar, at.toolbarData);
                var settings = __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__["HtmlTools"].getFirstAttribute(tag, at.settings, at.settingsData);
                return {
                    toolbar: JSON.parse(data),
                    settings: JSON.parse(settings),
                };
            }
        }
        catch (err) {
            console.error('error in settings JSON - probably invalid - make sure you quote properties like "name": ...', tag, err);
            return null;
        }
    };
    return ToolbarInitConfig;
}());



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfContentBlock", function() { return ContextOfContentBlock; });
/**
 * information related to the current contentBlock, incl
 */
var ContextOfContentBlock = /** @class */ (function () {
    function ContextOfContentBlock(editCtx) {
        // Initialize Content-Block values
        if (editCtx.ContentBlock) {
            this.id = editCtx.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
            this.isEntity = editCtx.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
            this.showTemplatePicker = editCtx.ContentBlock.ShowTemplatePicker;
            this.versioningRequirements = editCtx.ContentBlock.VersioningRequirements;
            this.parentFieldName = editCtx.ContentBlock.ParentFieldName;
            this.parentFieldSortOrder = editCtx.ContentBlock.ParentFieldSortOrder;
            this.partOfPage = editCtx.ContentBlock.PartOfPage; // NgDialogParams.partOfPage
        }
        // Initialize Content-Group Values
        if (editCtx.ContentGroup) {
            this.isCreated = editCtx.ContentGroup.IsCreated;
            this.isList = editCtx.ContentGroup.IsList; // ex: InstanceConfig.isList
            this.queryId = editCtx.ContentGroup.QueryId;
            this.templateId = editCtx.ContentGroup.TemplateId;
            this.contentTypeId = editCtx.ContentGroup.ContentTypeName;
            this.contentGroupId = editCtx.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
        }
    }
    return ContextOfContentBlock;
}());



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfInstance", function() { return ContextOfInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);

/**
 * information related to the current DNN module, incl.instanceId,
 */
var ContextOfInstance = /** @class */ (function () {
    function ContextOfInstance(editCtx) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.InstanceId;
            this.isEditable = editCtx.Environment.IsEditable;
            // sxc
            this.sxcVersion = editCtx.Environment.SxcVersion;
            this.parameters = editCtx.Environment.parameters;
            this.sxcRootUrl = editCtx.Environment.SxcRootUrl;
        }
        if (editCtx.ContentBlock) {
            this.allowPublish = editCtx.ContentBlock.VersioningRequirements === __WEBPACK_IMPORTED_MODULE_0__constants__["C"].IDs.publishAllowed;
        }
    }
    return ContextOfInstance;
}());



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfItem", function() { return ContextOfItem; });
/**
 * information about the current item
 * ATM empty, not sure if it serves a purpose...
 */
var ContextOfItem = /** @class */ (function () {
    // tslint:disable-next-line: no-empty
    function ContextOfItem(editCtx) {
    }
    return ContextOfItem;
}());



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfPage", function() { return ContextOfPage; });
/**
 * this will be information related to the current page
 */
var ContextOfPage = /** @class */ (function () {
    function ContextOfPage(editCtx) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.PageId;
            this.url = editCtx.Environment.PageUrl;
        }
    }
    return ContextOfPage;
}());



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfSystem", function() { return ContextOfSystem; });
/**
 * this will be everything about the current system, like system / api -paths etc.
 */
var ContextOfSystem = /** @class */ (function () {
    function ContextOfSystem(editCtx) {
        if (editCtx.error) {
            this.error = editCtx.error.type;
        }
    }
    return ContextOfSystem;
}());



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfTenant", function() { return ContextOfTenant; });
/**
 * this will be something about the current tenant(the dnn portal)
 */
var ContextOfTenant = /** @class */ (function () {
    function ContextOfTenant(editCtx) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.WebsiteId;
            this.url = editCtx.Environment.WebsiteUrl;
        }
    }
    return ContextOfTenant;
}());



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContent", function() { return ContextBundleContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(20);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ContextBundleContent = /** @class */ (function (_super) {
    __extends(ContextBundleContent, _super);
    function ContextBundleContent(editCtx) {
        var _this = _super.call(this, editCtx) || this;
        // information about the current item
        _this.item = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfItem"](editCtx);
        // information related to the current contentBlock
        _this.contentBlock = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfContentBlock"](editCtx);
        return _this;
    }
    return ContextBundleContent;
}(__WEBPACK_IMPORTED_MODULE_0____["ContextBundleInstance"]));



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoader", function() { return ToolbarConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// Enable when debugging toolbar creation - will dump all logs to the console
var liveDumpThis = false;
var ToolbarConfigLoader = /** @class */ (function (_super) {
    __extends(ToolbarConfigLoader, _super);
    /** Special constructor that can only be called from the ToolbarManager */
    function ToolbarConfigLoader(_owner) {
        var _this = 
        // important: always create a new log as it will be stored in insights
        _super.call(this, 'Tlb.TlbCnf') || this;
        _this.templates = __WEBPACK_IMPORTED_MODULE_2__templates__["ToolbarTemplateManager"];
        return _this;
    }
    ToolbarConfigLoader.prototype.setLoggingAndCreateHelpers = function (toolbarData) {
        // note: could be true, false or 'live'
        var debugLog = toolbarData && toolbarData.debug;
        if (debugLog === undefined && Array.isArray(toolbarData) && toolbarData.length)
            debugLog = toolbarData[0].debug;
        debugLog = debugLog || false;
        if (liveDumpThis || debugLog) {
            this.log.keepData = true;
            if (liveDumpThis || debugLog.toString() === 'live')
                this.log.liveDump = true;
            this.log.add("found debug=" + debugLog + ", will enable intense logging");
        }
        this.toolbarV09 = new __WEBPACK_IMPORTED_MODULE_0____["ToolbarConfigLoaderV09"](this);
        this.toolbarV10 = new __WEBPACK_IMPORTED_MODULE_0____["ToolbarConfigLoaderV10"](this);
        this.groups = new __WEBPACK_IMPORTED_MODULE_0____["ButtonGroupConfigLoader"](this);
        this.button = new __WEBPACK_IMPORTED_MODULE_0____["ButtonConfigLoader"](this);
        this.command = new __WEBPACK_IMPORTED_MODULE_0____["CommandConfigLoader"](this);
        this.templateEditor = new __WEBPACK_IMPORTED_MODULE_2__templates__["TemplateEditor"](this);
    };
    ToolbarConfigLoader.prototype.load = function (context, config) {
        var cl = this.log.call('load', '', 'expand start', { context: context, config: config });
        // cl.data('initial context', context);
        // cl.data('initial config', config);
        // if null/undefined, use empty object
        var raw = config.toolbar = config.toolbar || {};
        this.setLoggingAndCreateHelpers(raw);
        // check if it's a V10 tolbar
        if (Array.isArray(raw) && raw.length >= 0 && typeof raw[0] === 'string')
            return cl.return(this.toolbarV10.loadV10(context, config, raw), 'v10 done');
        // do standard V3 procedures
        return cl.return(this.toolbarV09.loadV9(context, config), 'V9 done');
    };
    ToolbarConfigLoader.prototype.buildTreeAndModifyAccordingToRules = function (toolbarContext, configWip) {
        var wrapLog = this.log.call('buildFullDefinition');
        var tlbConfig = this.groups.expandButtonGroups(configWip);
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        this.button.removeDisableButtons(toolbarContext, tlbConfig /*, instanceConfig */);
        return wrapLog.return(tlbConfig);
    };
    return ToolbarConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InPageButtonJson", function() { return InPageButtonJson; });
/**
 * Button Definition v1. from old API
 * it is publicly used out of inpage, so take a care to preserve its signature
 */
var InPageButtonJson = /** @class */ (function () {
    function InPageButtonJson() {
    }
    // check two common signatures - command and action
    InPageButtonJson.is = function (thing) {
        return thing.command !== undefined || thing.action !== undefined;
    };
    InPageButtonJson.isArray = function (thing) {
        return thing.length > 0 && InPageButtonJson.is(thing[0]);
    };
    InPageButtonJson.toButton = function (oldFormat) {
        var config = {};
        // simple value properties
        if (oldFormat.classes)
            config.classes = oldFormat.classes;
        if (oldFormat.dialog)
            config.dialog = oldFormat.dialog;
        if (oldFormat.disabled)
            config.disabled = oldFormat.disabled;
        if (oldFormat.icon)
            config.icon = oldFormat.icon;
        // Method Properties
        if (oldFormat.fullScreen)
            config.fullScreen = evalPropOrFun(oldFormat.fullScreen);
        if (oldFormat.icon)
            config.icon = evalPropOrFun(oldFormat.icon);
        if (oldFormat.inlineWindow)
            config.inlineWindow = evalPropOrFun(oldFormat.inlineWindow);
        if (oldFormat.newWindow)
            config.newWindow = evalPropOrFun(oldFormat.newWindow);
        if (oldFormat.partOfPage)
            config.partOfPage = evalPropOrFun(oldFormat.partOfPage);
        if (oldFormat.title)
            config.title = evalPropOrFun(oldFormat.title);
        // if (oldFormat.dynamicClasses) config.dynamicClasses = evalPropOrFun(oldFormat.dynamicClasses);
        // if (oldFormat.showCondition) config.showCondition = evalPropOrFun(oldFormat.showCondition);
        return config;
    };
    return InPageButtonJson;
}());

function evalPropOrFun(propOrFunction) {
    if (propOrFunction === undefined || propOrFunction === null)
        return false;
    if (typeof (propOrFunction) === 'function')
        return propOrFunction;
    return function () { return propOrFunction; };
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdNew", function() { return CmdNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdNewMode", function() { return CmdNewMode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdNew = 'new';
var CmdNewMode = 'new';
/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdNew, 'New', 'plus', false, true, {
    addParamsToLink: function (_) { return ({ mode: CmdNewMode }); },
    dialog: function (_) { return 'edit'; },
    showCondition: function (context) {
        // don't provide new if type unknown or on the header-item
        var result = (!!context.button.command.params.contentType ||
            !!(context.contentBlock.isList &&
                context.button.command.params.useModuleList &&
                context.button.command.params.sortOrder !== -1));
        return result;
    },
    code: function (context, event) {
        // todo - should refactor this to be a toolbarManager.contentBlock command
        context.button.command.params.sortOrder = context.button.command.params.sortOrder + 1;
        // O.bject.assign(context.button.action.params, {
        //     sortOrder: context.button.action.params.sortOrder + 1,
        // });
        return __WEBPACK_IMPORTED_MODULE_0____["CmsEngine"].openDialog(context, event);
    },
});


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$2sxcInPage", function() { return $2sxcInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window_in_page__ = __webpack_require__(9);

// ReSharper restore InconsistentNaming
var $2sxcInPage = __WEBPACK_IMPORTED_MODULE_0__window_in_page__["windowInPage"].$2sxc;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialogContainer", function() { return QuickDialogContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iDialogFrameElement__ = __webpack_require__(59);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var IDialogFrameElement = __WEBPACK_IMPORTED_MODULE_1__iDialogFrameElement__["IDialogFrameElement"];
/**
 * this is a dialog manager which is in charge of all quick-dialoges
 * it always has a reference to the latest dialog created by a.ny module instance
 */
var containerClass = 'inpage-frame-wrapper';
var iframeClass = 'inpage-frame';
var iframeTag = 'iframe';
var containerTemplate = "<div class=\"" + containerClass + "\"><div class=\"" + iframeClass + "\"></div></div>";
var resizeInterval = 200;
var QuickDialogContainer = /** @class */ (function (_super) {
    __extends(QuickDialogContainer, _super);
    function QuickDialogContainer(quickDialog) {
        var _this = _super.call(this, 'QDl.Contnr', quickDialog.log) || this;
        _this.isFullscreen = false;
        _this.resizeWatcher = null;
        return _this;
    }
    /**
     * get the current container
     * @returns {element} html element of the div
     */
    QuickDialogContainer.prototype.getOrCreate = function () {
        var container = $("." + containerClass);
        return container.length > 0 ? container : this.buildContainerAndIFrame();
    };
    /**
     * build the container in the dom w/iframe for re-use
     * @return {jquery} jquery dom-object
     */
    QuickDialogContainer.prototype.buildContainerAndIFrame = function () {
        var callLog = this.log.call('buildContainerAndIFrame');
        var container = $(containerTemplate);
        if ($('#personaBar-iframe').length > 0)
            container.addClass('persona-bar-visible');
        var newIFrame = document.createElement(iframeTag);
        var extendedIFrame = IDialogFrameElement.build(newIFrame, this);
        container.find("." + iframeClass).append(extendedIFrame);
        $('body').append(container);
        this.watchForResize(container);
        return callLog.return(container, 'ok');
    };
    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container as jQuery object
     * @returns {html} iframe object
     */
    QuickDialogContainer.prototype.getIFrame = function (container) {
        if (!container)
            container = this.getOrCreate();
        return container.find(iframeTag)[0];
    };
    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    QuickDialogContainer.prototype.setSize = function (fullScreen) {
        var cl = this.log.call('setSize');
        var container = this.getOrCreate();
        // set container height
        container.css('min-height', fullScreen ? '100%' : '225px');
        this.isFullscreen = fullScreen;
        cl.done();
    };
    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    QuickDialogContainer.prototype.watchForResize = function (container) {
        var _this = this;
        // only add a timer if not already running
        if (this.resizeWatcher)
            return;
        var callLog = this.log.call('watchForResize');
        // if (!resizeWatcher)
        this.resizeWatcher = window.setInterval(function () {
            try {
                var frm = _this.getIFrame(container);
                if (!frm) {
                    callLog.onlyAddIfNew('no iframe');
                    return;
                }
                var height = frm.contentDocument.body.offsetHeight;
                if (frm.previousHeight === height) {
                    callLog.onlyAddIfNew('no height change');
                    return;
                }
                frm.style.minHeight = container.css('min-height');
                frm.style.height = height + 'px';
                frm.previousHeight = height;
                if (_this.isFullscreen) {
                    frm.style.height = '100%';
                    frm.style.position = 'absolute';
                }
                callLog.onlyAddIfNew('changed to ' + height);
            }
            catch (e) {
                callLog.add('error', e);
            }
        }, resizeInterval);
        callLog.return(null, 'watcher added');
    };
    return QuickDialogContainer;
}(__WEBPACK_IMPORTED_MODULE_0__logging___["HasLog"]));

// export const QuickDialogContainer = new QuickDialogContainerSingleton();


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDialogFrameElement", function() { return IDialogFrameElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__ = __webpack_require__(60);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

//
// Note: NOT shared between this project and angular, because that object is a bit different
//
var IDialogFrameElement = /** @class */ (function (_super) {
    __extends(IDialogFrameElement, _super);
    function IDialogFrameElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IDialogFrameElement.build = function (iFrame, parent) {
        var callLog = parent.log.call('build');
        callLog.data('prototype', __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__["IFrameBridge"].prototype);
        var iFrameExtended = iFrame;
        iFrameExtended.bridge = new __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__["IFrameBridge"](parent);
        callLog.data('extensions', iFrameExtended.bridge);
        return callLog.return(iFrameExtended);
    };
    return IDialogFrameElement;
}(HTMLIFrameElement));



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrameBridge", function() { return IFrameBridge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contentBlock_content_block_editor__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_dialog__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quick_dialog_config__ = __webpack_require__(61);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var scrollTopOffset = 80;
var animationTime = 400;
/**
 *
 */
// ReSharper disable once InconsistentNaming
var IFrameBridge = /** @class */ (function (_super) {
    __extends(IFrameBridge, _super);
    function IFrameBridge(parent) {
        var _this = _super.call(this, 'QDl.IfBrig', parent.log) || this;
        _this.changed = false;
        return _this;
    }
    /**
     * get the sxc-object of this iframe
     */
    IFrameBridge.prototype.uncachedSxc = function () {
        if (!this.instanceSxc)
            throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return this.instanceSxc.recreate(true);
    };
    IFrameBridge.prototype.getContext = function () {
        var cl = this.log.call('getContext');
        return cl.return(__WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__["ContextComplete"].findContext(this.uncachedSxc()));
    };
    IFrameBridge.prototype.getAdditionalDashboardConfig = function () {
        var cl = this.log.call('getAdditionalDashboardConfig');
        return cl.return(__WEBPACK_IMPORTED_MODULE_6__quick_dialog_config__["QuickDialogConfig"].fromContext(this.getContext()));
    };
    IFrameBridge.prototype.hide = function () {
        __WEBPACK_IMPORTED_MODULE_5__quick_dialog__["QuickDialog"].setVisible(false);
    };
    IFrameBridge.prototype.run = function (verb) {
        this.uncachedSxc().manage.run(verb);
    };
    IFrameBridge.prototype.cancel = function () { __WEBPACK_IMPORTED_MODULE_5__quick_dialog__["QuickDialog"].cancel(this); };
    IFrameBridge.prototype.showMessage = function (message) {
        var cl = this.log.call('showMessage');
        __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__["renderer"].showMessage(this.getContext(), "<p class=\"no-live-preview-available\">" + message + "</p>");
        this.scrollToTarget(this.tagModule);
        cl.done();
    };
    IFrameBridge.prototype.reloadAndReInit = function () {
        var _this = this;
        this.changed = false;
        return __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__["renderer"].reloadAndReInitialize(this.getContext(), true, true)
            .then(function () { return _this.scrollToTarget(_this.tagModule); })
            .then(function () { return Promise.resolve(_this.getAdditionalDashboardConfig()); });
    };
    IFrameBridge.prototype.setTemplate = function (templateId, templateName, final) {
        var _this = this;
        var cl = this.log.call('setTemplate', "tid: " + templateId + ", tname: " + templateName + ", final: " + final);
        this.changed = true;
        var config = this.getAdditionalDashboardConfig();
        var context = this.getContext();
        var ajax = config.isContent || config.supportsAjax;
        // add msg on full-reload, as it takes longer
        // don't add this on ajax, as it will have side-effects because sometimes
        // in ajax the content won't be replaced
        if (!ajax)
            this.showMessage("refreshing <b>" + templateName + "</b>...");
        var reallySave = final || !ajax;
        var promise = reallySave
            ? __WEBPACK_IMPORTED_MODULE_0__contentBlock_content_block_editor__["ContentBlockEditor"].updateTemplateFromDia(context, templateId)
            : __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__["renderer"].ajaxLoad(context, templateId, true);
        if (final)
            promise = promise.then(function () { return __WEBPACK_IMPORTED_MODULE_5__quick_dialog__["QuickDialog"].setVisible(false); });
        promise = ajax
            ? promise.then(function () { return _this.scrollToTarget(_this.tagModule); })
            : promise.then(function () { return window.parent.location.reload(); });
        // return true if ajax, so upstream can update UIs
        return cl.return(promise.then(function () { return ajax; }));
    };
    /**
     * prepare the bridge with the info of the current instance
     */
    IFrameBridge.prototype.setup = function (sxc, dialogName) {
        var cl = this.log.call('setup');
        cl.data('rewire with sxc: ', sxc);
        this.changed = false;
        this.instanceSxc = sxc;
        this.tagModule = $($(__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxc)).parent().eq(0));
        this.sxcCacheKey = sxc.cacheKey;
        if (dialogName)
            this.dialogName = dialogName;
        cl.done();
    };
    /**
     * check if the dialog is showing for the current sxc-instance
     * @param {string} dialogName - name of dialog
     * @returns {boolean} true if it's currently showing for this sxc-instance
     */
    IFrameBridge.prototype.isConfiguredFor = function (instanceId, dialogName) {
        var cl = this.log.call('isConfiguredFor', "id:" + instanceId + ", dialog:" + dialogName);
        var result = this.sxcCacheKey === instanceId // the iframe is showing for the current sxc
            && this.dialogName === dialogName; // the view is the same as previously
        return cl.return(result);
    };
    IFrameBridge.prototype.scrollToTarget = function (target) {
        var cl = this.log.call('scrollToTarget');
        var specs = {
            scrollTop: target.offset().top - scrollTopOffset,
        };
        $('body').animate(specs, animationTime);
        cl.done();
    };
    return IFrameBridge;
}(__WEBPACK_IMPORTED_MODULE_4__logging__["HasLog"]));



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialogConfig", function() { return QuickDialogConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(20);

var QuickDialogConfig = /** @class */ (function () {
    function QuickDialogConfig() {
    }
    QuickDialogConfig.fromContext = function (context) {
        var config = new QuickDialogConfig();
        config.appId = context.app.id;
        config.isContent = context.app.isContent;
        config.isInnerContent = context.instance.id !== context.contentBlock.id; // if it differs, it's inner
        config.hasContent = context.app.hasContent;
        config.isList = context.contentBlock.isList;
        config.templateId = context.contentBlock.templateId;
        config.contentTypeId = context.contentBlock.contentTypeId;
        config.user = __WEBPACK_IMPORTED_MODULE_0__context__["ContextOfUser"].fromContext(context);
        config.supportsAjax = context.app.supportsAjax;
        config.debug = window.$2sxc.debug.load;
        return config;
    };
    return QuickDialogConfig;
}());



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TotalPopup; });
var TotalPopup = /** @class */ (function () {
    function TotalPopup() {
        this.frame = undefined;
        this.callback = undefined;
    }
    TotalPopup.prototype.open = function (url, callback) {
        // count parents to see how high the z-index needs to be
        var z = 10000010; // Needs at least 10000000 to be on top of the DNN9 bar
        var p = window;
        while (p !== window.top && z < 10000100) {
            z++;
            p = p.parent;
        }
        var wrapper = document.createElement('div');
        wrapper.setAttribute('style', ' top: 0;left: 0;width: 100%;height: 100%; position:fixed; z-index:' + z);
        document.body.appendChild(wrapper);
        var ifrm = document.createElement('iframe');
        ifrm.setAttribute('allowtransparency', 'true');
        ifrm.setAttribute('style', 'top: 0;left: 0;width: 100%;height: 100%;');
        ifrm.setAttribute('src', url);
        wrapper.appendChild(ifrm);
        document.body.className += ' sxc-popup-open';
        this.frame = ifrm;
        this.callback = callback;
    };
    TotalPopup.prototype.close = function () {
        if (this.frame) {
            document.body.className = document.body.className.replace('sxc-popup-open', '');
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlParamManager; });
var UrlParamManager = /** @class */ (function () {
    function UrlParamManager() {
    }
    UrlParamManager.prototype.get = function (name) {
        // warning: this method is duplicated in 2 places - keep them in sync.
        // locations are eav and 2sxc4ng
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var searchRx = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
        var results = searchRx.exec(location.search);
        var strResult;
        if (results === null) {
            var hashRx = new RegExp('[#&]' + name + '=([^&#]*)', 'i');
            results = hashRx.exec(location.hash);
        }
        // if nothing found, try normal URL because DNN places parameters in /key/value notation
        if (results === null) {
            // Otherwise try parts of the URL
            var matches = window.location.pathname.match(new RegExp('/' + name + '/([^/]+)', 'i'));
            // Check if we found anything, if we do find it, we must reverse the
            // results so we get the "last" one in case there are multiple hits
            if (matches && matches.length > 1)
                strResult = matches.reverse()[0];
        }
        else
            strResult = results[1];
        return strResult === null || strResult === undefined
            ? ''
            : decodeURIComponent(strResult.replace(/\+/g, ' '));
    };
    UrlParamManager.prototype.require = function (name) {
        var found = this.get(name);
        if (found === '') {
            var message = "Required parameter (" + name + ") missing from url - cannot continue";
            alert(message);
            throw message;
        }
        return found;
    };
    UrlParamManager.prototype.debug = function () {
        return this.get('debug') === 'true';
    };
    return UrlParamManager;
}());



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Environment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env_loader_meta__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
var Environment = /** @class */ (function (_super) {
    __extends(Environment, _super);
    function Environment() {
        var _this = _super.call(this, 'Environment', null, 'starting') || this;
        _this.ready = false;
        _this.source = '';
        _this.log.keepData = true; // always keep here for clarity
        __WEBPACK_IMPORTED_MODULE_2__logging__["c" /* Insights */].add('system', 'environment', _this.log);
        _this.metaLoader = new __WEBPACK_IMPORTED_MODULE_0__env_loader_meta__["a" /* EnvironmentMetaLoader */](_this);
        // check if a global variable was already set which we should use
        if (typeof _jsApi !== typeof undefined) {
            _this.log.add('found _jsApi, will use');
            _this.load(_jsApi, 'global variable _jsApi');
        }
        else {
            _this.log.add('will start initializing');
            _this.metaLoader.loadMetaFromHeader();
        }
        return _this;
    }
    /**
     * Load a new jsInfo - must be public, as it's used in iframes where jquery is missing
     * @param newJsInfo new info to load
     */
    Environment.prototype.load = function (newJsInfo, source) {
        var cl = this.log.call('load');
        this.header = newJsInfo;
        this.ready = true;
        this.source = source || 'external/unknown';
        cl.return(newJsInfo, 'loaded from ' + this.source);
    };
    Environment.prototype.api = function () {
        this.ensureReadyOrThrow();
        return this.header.api;
    };
    // TODO: DEPRECATE - only use the $2.http.apiRoot
    Environment.prototype.apiRoot = function (name) {
        console.error("don't use the env.apiRoot any more, use the http.apiRoot istead. Will be removed in 2sxc 10.27");
        return this.api().replace(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ApiExtensionPlaceholder */], name);
    };
    Environment.prototype.page = function () {
        this.ensureReadyOrThrow();
        return this.header.page;
    };
    Environment.prototype.rvt = function () {
        this.ensureReadyOrThrow();
        return this.header.rvt;
    };
    Environment.prototype.ensureReadyOrThrow = function () {
        if (this.ready)
            return;
        // try one last time - usually it should really be ready by now
        this.log.add('ensureReady - force last attempt to load MetaHeader');
        this.metaLoader.loadMetaFromHeader(true);
        // if still not ready, throw exception to console log
        if (this.ready)
            return;
        throw "Can't find apiRoot - something went wrong, pls contact 2sxc.org";
    };
    return Environment;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["b" /* HasLog */]));



/***/ }),
/* 65 */
/***/ (function(module, exports) {



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcHttp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SxcHttp = /** @class */ (function (_super) {
    __extends(SxcHttp, _super);
    function SxcHttp(env) {
        var _this = _super.call(this, 'Sxc.Http') || this;
        _this.env = env;
        return _this;
    }
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    SxcHttp.prototype.headers = function (id, cbid) {
        var cl = this.log.call('headers', id + ", " + cbid);
        var fHeaders = {}; // as any;
        if (id)
            fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].ModuleId] = id.toString();
        if (cbid)
            fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].ContentBlockId] = cbid.toString();
        fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].TabId] = this.env.page().toString();
        fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].Rvt] = this.env.rvt();
        return cl.return(fHeaders, "headers(id:" + id + ", cbid:" + cbid + ")");
    };
    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
    SxcHttp.prototype.apiRoot = function (endpointName) {
        var cl = this.log.call('apiRoot');
        var result = this.env.api().replace(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* ApiExtensionPlaceholder */], endpointName);
        return cl.return(result, "apiRoot('" + endpointName + "')");
    };
    /**
     * Get the URL for a specific web API endpoint
     * Will ignore urls which clearly already are the full url.
     * @param {string} url
     * @param {string} [endpointName]
     * @returns
     * @memberof SxcHttp
     */
    SxcHttp.prototype.apiUrl = function (url, endpointName) {
        var cl = this.log.call('apiUrl');
        this.log.add("apiUrl(url:'" + url + "', endpointName:'" + endpointName + "')");
        // if starts with http: or https: then ignore
        if (!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return cl.return(url);
        // if no endpoint specified, then also skip absolute and relative urls
        if (!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return cl.return(url);
        var baseUrl = this.apiRoot(endpointName || __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* ToSxcName */]);
        // ensure base ends with slash
        if (baseUrl[baseUrl.length - 1] != '/')
            baseUrl += '/';
        // ensure url doesn't start with slash
        if (url[0] == '/')
            url = url.slice(1);
        return cl.return(baseUrl + url);
    };
    return SxcHttp;
}(__WEBPACK_IMPORTED_MODULE_1____["HasLog"]));



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sxc_instance__ = __webpack_require__(180);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SxcInstance", function() { return __WEBPACK_IMPORTED_MODULE_0__sxc_instance__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__, "Debug")) __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__["Debug"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__, "SxcInstanceDataDeprecated")) __webpack_require__.d(__webpack_exports__, "SxcInstanceDataDeprecated", function() { return __WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__["SxcInstanceDataDeprecated"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_1__sxc_instance_manage__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sxc_instance_with_internals__ = __webpack_require__(71);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_2__sxc_instance_with_internals__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_api_sxc_web_api__ = __webpack_require__(68);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__web_api_ajax_promise__ = __webpack_require__(69);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__, "Debug")) __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__["Debug"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__, "SxcInstanceDataDeprecated")) __webpack_require__.d(__webpack_exports__, "SxcInstanceDataDeprecated", function() { return __WEBPACK_IMPORTED_MODULE_5__web_api_ajax_settings__["SxcInstanceDataDeprecated"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__deprecated_sxc_instance_data__ = __webpack_require__(182);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceDataDeprecated", function() { return __WEBPACK_IMPORTED_MODULE_6__deprecated_sxc_instance_data__["a"]; });









/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcWebApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_promise__ = __webpack_require__(69);

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
var SxcWebApi = /** @class */ (function () {
    function SxcWebApi(sxc) {
        this.sxc = sxc;
        this.env = sxc.root.env;
    }
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    SxcWebApi.prototype.get = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'GET');
    };
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    SxcWebApi.prototype.post = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'POST');
    };
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    SxcWebApi.prototype.delete = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'DELETE');
    };
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns {Promise} jQuery ajax promise object
     */
    SxcWebApi.prototype.put = function (settingsOrUrl, params, data, preventAutoFail) {
        return this.request(settingsOrUrl, params, data, preventAutoFail, 'PUT');
    };
    /**
     * Generic http request
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns {Promise} jQuery ajax promise object
     */
    SxcWebApi.prototype.request = function (settings, params, data, preventAutoFail, method) {
        // url parameter: auto convert a single value (instead of object of values) to an id=... parameter
        // tslint:disable-next-line:curly
        if (typeof params !== 'object' && typeof params !== 'undefined')
            params = { id: params };
        // if the first parameter is a string, resolve settings
        if (typeof settings === 'string') {
            var controllerAction = settings.split('/');
            var controllerName = controllerAction[0];
            var actionName = controllerAction[1];
            if (controllerName === '' || actionName === '')
                console.warn('Error: controller or action not defined. Will continue with likely errors.');
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
            method: method === null ? 'POST' : method,
            params: null,
            preventAutoFail: false,
        };
        // new 10.25
        var http = new __WEBPACK_IMPORTED_MODULE_0__ajax_promise__["a" /* AjaxPromise */](this, this.sxc);
        settings = $2sxc_jQSuperlight.extend({}, defaults, settings);
        var promise = http.makePromise(settings);
        return promise;
    };
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    SxcWebApi.prototype.headers = function () {
        return this.sxc.root.http.headers(this.sxc.id, this.sxc.cbid);
    };
    return SxcWebApi;
}());



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AjaxPromise; });
var AjaxPromise = /** @class */ (function () {
    function AjaxPromise(api, sxc) {
        this.api = api;
        this.sxc = sxc;
    }
    /**
     * Make a jQuery style promise request
     * @param {AjaxSettings} settings
     * @returns {JQueryPromise<any>}
     * @memberof AjaxPromise
     */
    AjaxPromise.prototype.makePromise = function (settings) {
        var headers = this.api.headers();
        var promise = $2sxc_jQSuperlight.ajax({
            async: true,
            dataType: settings.dataType || 'json',
            data: JSON.stringify(settings.data),
            contentType: 'application/json',
            type: settings.method,
            url: this.getActionUrl(settings),
            beforeSend: function (xhr) {
                for (var key in headers)
                    if (headers.hasOwnProperty(key))
                        xhr.setRequestHeader(key, headers[key]);
            },
        });
        if (!settings.preventAutoFail)
            promise.fail(this.sxc.showDetailedHttpError);
        return promise;
    };
    /**
     * Generate the correct WebApi url
     * @param settings the settings as they would be in jQuery
     */
    AjaxPromise.prototype.getActionUrl = function (settings) {
        var url = settings.url || 'app/auto/api/' + settings.controller + '/' + settings.action;
        // 2020-03-13 stop adding 2sxc endpoint-name, it's already happening in apiUrl so with this it happens 2x
        // var endpoint = settings.endpoint || ToSxcName;
        var base = this.sxc.root.http.apiUrl(url, settings.endpoint);
        // let base = (settings.url)
        //   ? this.sxc.root.http.apiUrl(settings.url) // this.sxc.resolveServiceUrl(settings.url)  // use url -> TODO: change this to use the new root.http.apiUrl
        //   : env.apiRoot('2sxc')               // use controller/action
        //     + 'app/auto/api/' + settings.controller + '/' + settings.action;
        // if(settings.endpoint)
        //     base = base.replace(env.apiRoot('2sxc'), 
        //         env.apiRoot(settings.endpoint));
        return base + (!settings.params ? '' : ('?' + $2sxc_jQSuperlight.param(settings.params)));
    };
    return AjaxPromise;
}());



/***/ }),
/* 70 */
/***/ (function(module, exports) {

/*
  This is the base class for the Manage object on 2sxc instances.
  It's typed here, so that API code is strongly typed, but it's incomplete.
*/


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstanceWithInternals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(67);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SxcInstanceWithInternals = /** @class */ (function (_super) {
    __extends(SxcInstanceWithInternals, _super);
    function SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc) {
        var _this = _super.call(this, id, cbid, $2sxc) || this;
        _this.id = id;
        _this.cbid = cbid;
        _this.cacheKey = cacheKey;
        _this.$2sxc = $2sxc;
        _this.source = null;
        _this.isLoaded = false;
        _this.lastRefresh = null;
        _this.data = new __WEBPACK_IMPORTED_MODULE_0____["SxcInstanceDataDeprecated"](_this);
        return _this;
    }
    SxcInstanceWithInternals.prototype.recreate = function (resetCache) {
        if (resetCache)
            delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid); // generate new
    };
    return SxcInstanceWithInternals;
}(__WEBPACK_IMPORTED_MODULE_0____["SxcInstance"]));



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRootPartsV2;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_sxc_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(13);




function getRootPartsV2() {
    var log = new __WEBPACK_IMPORTED_MODULE_2__logging__["d" /* Log */]('$2sxc', null, 'building');
    var env = new __WEBPACK_IMPORTED_MODULE_0__environment__["Environment"]();
    return {
        sysinfo: {
            version: __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* SxcVersion */],
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new __WEBPACK_IMPORTED_MODULE_1__http_sxc_http__["a" /* SxcHttp */](env),
        log: log,
    };
}


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__obj__ = __webpack_require__(190);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Obj", function() { return __WEBPACK_IMPORTED_MODULE_0__obj__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_value__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_value___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__type_value__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__type_value__) if(["Obj","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__type_value__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dictionary_value__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dictionary_value___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dictionary_value__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_2__dictionary_value__) if(["Obj","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_2__dictionary_value__[key]; }) }(__WEBPACK_IMPORT_KEY__));
//
// Plumbing contains some object manipulation helpers and similarly
// re-used bits of code
//





/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_logic__ = __webpack_require__(75);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharedLogic", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_logic__["SharedLogic"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add__ = __webpack_require__(76);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAdd", function() { return __WEBPACK_IMPORTED_MODULE_1__add__["CmdAdd"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_import__ = __webpack_require__(125);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppImport", function() { return __WEBPACK_IMPORTED_MODULE_2__app_import__["CmdAppImport"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_resources__ = __webpack_require__(126);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppResources", function() { return __WEBPACK_IMPORTED_MODULE_3__app_resources__["CmdAppResources"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_settings__ = __webpack_require__(127);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppSettings", function() { return __WEBPACK_IMPORTED_MODULE_4__app_settings__["CmdAppSettings"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_items__ = __webpack_require__(128);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentItems", function() { return __WEBPACK_IMPORTED_MODULE_5__content_items__["CmdContentItems"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_list_action_params__ = __webpack_require__(129);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContentListActionParams", function() { return __WEBPACK_IMPORTED_MODULE_6__content_list_action_params__["ContentListActionParams"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_list_actions__ = __webpack_require__(11);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return __WEBPACK_IMPORTED_MODULE_7__content_list_actions__["Actions"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__content_type__ = __webpack_require__(130);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentType", function() { return __WEBPACK_IMPORTED_MODULE_8__content_type__["CmdContentType"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__custom__ = __webpack_require__(131);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdCustom", function() { return __WEBPACK_IMPORTED_MODULE_9__custom__["CmdCustom"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__delete__ = __webpack_require__(132);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdDelete", function() { return __WEBPACK_IMPORTED_MODULE_10__delete__["CmdDelete"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__edit__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEdit", function() { return __WEBPACK_IMPORTED_MODULE_11__edit__["CmdEdit"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEditDialog", function() { return __WEBPACK_IMPORTED_MODULE_11__edit__["CmdEditDialog"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__instance_list__ = __webpack_require__(134);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdInstanceList", function() { return __WEBPACK_IMPORTED_MODULE_12__instance_list__["CmdInstanceList"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__item_history__ = __webpack_require__(135);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdItemHistory", function() { return __WEBPACK_IMPORTED_MODULE_13__item_history__["CmdItemHistory"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__layout__ = __webpack_require__(35);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdLayout", function() { return __WEBPACK_IMPORTED_MODULE_14__layout__["CmdLayout"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__metadata__ = __webpack_require__(136);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMetadata", function() { return __WEBPACK_IMPORTED_MODULE_15__metadata__["CmdMetadata"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__more__ = __webpack_require__(137);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMore", function() { return __WEBPACK_IMPORTED_MODULE_16__more__["CmdMore"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__movedown__ = __webpack_require__(138);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveDown", function() { return __WEBPACK_IMPORTED_MODULE_17__movedown__["CmdMoveDown"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__moveup__ = __webpack_require__(139);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveUp", function() { return __WEBPACK_IMPORTED_MODULE_18__moveup__["CmdMoveUp"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__new__ = __webpack_require__(56);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNew", function() { return __WEBPACK_IMPORTED_MODULE_19__new__["CmdNew"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNewMode", function() { return __WEBPACK_IMPORTED_MODULE_19__new__["CmdNewMode"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__publish__ = __webpack_require__(140);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdPublish", function() { return __WEBPACK_IMPORTED_MODULE_20__publish__["CmdPublish"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__remove__ = __webpack_require__(141);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdRemove", function() { return __WEBPACK_IMPORTED_MODULE_21__remove__["CmdRemove"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__replace__ = __webpack_require__(142);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdReplace", function() { return __WEBPACK_IMPORTED_MODULE_22__replace__["CmdReplace"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__template_develop__ = __webpack_require__(143);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateDevelop", function() { return __WEBPACK_IMPORTED_MODULE_23__template_develop__["CmdTemplateDevelop"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__template_query__ = __webpack_require__(144);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateQuery", function() { return __WEBPACK_IMPORTED_MODULE_24__template_query__["CmdTemplateQuery"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__template_settings__ = __webpack_require__(145);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateSettings", function() { return __WEBPACK_IMPORTED_MODULE_25__template_settings__["CmdTemplateSettings"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__zone__ = __webpack_require__(146);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdZone", function() { return __WEBPACK_IMPORTED_MODULE_26__zone__["CmdZone"]; });





























/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedLogic", function() { return SharedLogic; });
/**
 * TODO: place shared logic like for deciding if we show list buttons
 * here
 */
var SharedLogic = /** @class */ (function () {
    function SharedLogic() {
    }
    return SharedLogic;
}());



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAdd", function() { return CmdAdd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(11);


var CmdAdd = 'add';
/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAdd, 'AddDemo', 'plus-circled', false, true, {
    showCondition: function (context) {
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1);
    },
    code: function (context) {
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].addItem(context, context.button.command.params.sortOrder + 1);
    },
});


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return Attributes; });
// namespace Constants {
var Attributes = {
    InstanceId: 'data-cb-instance',
    Context: 'data-edit-context',
    ContentBlockId: 'data-cb-id',
};
// }


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBlock", function() { return ContentBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBlockIds", function() { return ContentBlockIds; });
/*
* This just holds some constants, but it looks like _LayoutElement is unused - but I think it should be!
*/
var ContentBlock = /** @class */ (function () {
    function ContentBlock() {
    }
    // constants
    ContentBlock.cViewWithoutContent = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
    ContentBlock.UseExistingTemplate = -1;
    return ContentBlock;
}());

/** ContentBlock constants  */
var ContentBlockIds = {
    classes: {
        name: 'sc-content-block',
    },
    selectors: {
        ofName: '.sc-content-block',
    },
};


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debug", function() { return Debug; });
var Debug = {
    cms: {
        autoDump: false,
        run: true,
    },
};


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogPaths", function() { return DialogPaths; });
var DialogPaths;
(function (DialogPaths) {
    DialogPaths["ng1"] = "dist/dnn/ui.html";
    DialogPaths["quickDialog"] = "dist/ng/ui.html";
    DialogPaths["ng8"] = "dist/ng-edit/ui.html";
})(DialogPaths || (DialogPaths = {}));


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDs", function() { return IDs; });
var IDs = {
    // classes
    cls: {
        scMenu: 'sc-menu',
    },
    attr: {
        toolbar: 'toolbar',
        toolbarData: 'data-toolbar',
        settings: 'settings',
        settingsData: 'data-settings',
    },
    publishAllowed: 'DraftOptional',
    sel: {
        scMenu: '.sc-menu',
    },
};


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConstants", function() { return ToolbarConstants; });
var ToolbarConstants = {
    attrToMarkInitalized: '2sxc-tagtoolbar',
    attr: {
        full: 'sxc-toolbar',
        hover: 'sxc-toolbar-hover',
        disable: 'data-disable-toolbar',
    },
    classes: {
        oldHover: 'sc-element',
    },
    selectors: {
        ofOldHover: '.sc-element',
    },
};


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return Selection; });
var Selection = /** @class */ (function () {
    function Selection() {
    }
    return Selection;
}());



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierBase", function() { return ModifierBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Base class for module / content-block editors
 */
var ModifierBase = /** @class */ (function (_super) {
    __extends(ModifierBase, _super);
    function ModifierBase(name) {
        return _super.call(this, name) || this;
    }
    return ModifierBase;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierContentBlockInstance", function() { return ModifierContentBlockInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_manager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__translate_2sxc_translate__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/** contains commands to create/move/delete a content-block in an inner-content */
var ModifierContentBlockInstance = /** @class */ (function (_super) {
    __extends(ModifierContentBlockInstance, _super);
    function ModifierContentBlockInstance(parent, sxcInstance) {
        var _this = _super.call(this, 'QE.MdCbIn', parent.log) || this;
        _this.sxcInstance = sxcInstance;
        return _this;
    }
    /**
     * create content block
     * @param parentId
     * @param fieldName
     * @param index
     * @param appName
     * @param container
     * @param newGuid
     */
    ModifierContentBlockInstance.prototype.create = function (parentId, fieldName, index, appName, container, newGuid) {
        // the wrapper, into which this will be placed and the list of pre-existing blocks
        if (container.length === 0) {
            alert('can\'t add content-block as we couldn\'t find the list');
            return Promise.resolve();
        }
        var cblockList = container.find('div.sc-content-block');
        if (index > cblockList.length)
            index = cblockList.length; // make sure index is never greater than the amount of items
        var params = {
            parentId: parentId,
            field: fieldName,
            sortOrder: index,
            app: appName,
            guid: newGuid,
        };
        var jqPromise = this.sxcInstance.webApi
            .get({ url: 'view/module/generatecontentblock', params: params })
            .then(function (result) {
            var newTag = $(result); // prepare tag for inserting
            // should I add it to a specific position...
            if (cblockList.length > 0 && index > 0)
                $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                    .after(newTag);
            else // ...or just at the beginning?
                container.prepend(newTag);
            // ReSharper disable once UnusedLocals
            var sxcNew = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(newTag);
            __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_manager__["ToolbarManager"].buildModule(newTag);
        });
        return Promise.resolve(jqPromise);
    };
    /**
     * move content block
     * @param parentId
     * @param field
     * @param indexFrom
     * @param indexTo
     */
    ModifierContentBlockInstance.prototype.move = function (parentId, field, indexFrom, indexTo) {
        var params = {
            parentId: parentId,
            field: field,
            indexFrom: indexFrom,
            indexTo: indexTo,
        };
        var jqPromise = this.sxcInstance.webApi
            .get({ url: 'view/module/moveiteminlist', params: params })
            .then(function () {
            console.log('done moving!');
            window.location.reload();
        });
        return Promise.resolve(jqPromise);
    };
    /**
     * delete a content-block inside a list of content-blocks
     * @param parentId
     * @param field
     * @param index
     */
    ModifierContentBlockInstance.prototype.delete = function (parentId, field, index) {
        if (!confirm(Object(__WEBPACK_IMPORTED_MODULE_3__translate_2sxc_translate__["translate"])('QuickInsertMenu.ConfirmDelete')))
            return null;
        var params = {
            parentId: parentId,
            field: field,
            index: index,
        };
        var jqPromise = this.sxcInstance.webApi
            .get({ url: 'view/module/RemoveItemInList', params: params })
            .then(function () {
            console.log('done deleting!');
            window.location.reload();
        });
        return Promise.resolve(jqPromise);
    };
    return ModifierContentBlockInstance;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderButton", function() { return RenderButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_part_base__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var RenderButton = /** @class */ (function (_super) {
    __extends(RenderButton, _super);
    function RenderButton(parent) {
        return _super.call(this, parent, 'Rnd.Button') || this;
    }
    RenderButton.prototype.render = function (ctx, groupIndex) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var cl = this.log.call('render', "contex: obj, group: " + groupIndex + ", btn: " + ctx.button.id + "/" + ((_a = ctx.button.command) === null || _a === void 0 ? void 0 : _a.name));
        var btn = new __WEBPACK_IMPORTED_MODULE_1__config__["ButtonSafe"](ctx.button, ctx);
        // check if we have rules and merge params into the button
        var rule = (_d = (_c = (_b = ctx.toolbar) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c._rules) === null || _d === void 0 ? void 0 : _d.find(ctx.button.id);
        if (rule)
            cl.data('rule found, will try to merge params', rule);
        var params = __WEBPACK_IMPORTED_MODULE_1__config__["ButtonCommand"].mergeAdditionalParams(btn.action(), rule === null || rule === void 0 ? void 0 : rule.params);
        var group = (_f = (_e = ctx.toolbar) === null || _e === void 0 ? void 0 : _e.groups) === null || _f === void 0 ? void 0 : _f[groupIndex];
        var groupName = group === null || group === void 0 ? void 0 : group.name;
        var btnLink = document.createElement('a');
        var disabled = btn.disabled();
        // put call as plain JavaScript to preserve even if DOM is serialized
        if (!disabled)
            btnLink.setAttribute('onclick', this.generateRunJs(ctx, params));
        // Add various classes
        var classes = (disabled ? ' disabled' : '')
            + (btn.action() ? " sc-" + btn.action().name : '')
            + (" in-group-" + groupIndex)
            + (groupName ? " in-group-" + groupName : '')
            + ' ' + (rule === null || rule === void 0 ? void 0 : rule.ui.class)
            + ' ' + btn.classes()
            + ' ' + btn.dynamicClasses();
        cl.add('classes: ' + classes);
        __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].addClasses(btnLink, classes);
        // set title for i18n
        var uiTitle = (_g = rule === null || rule === void 0 ? void 0 : rule.ui) === null || _g === void 0 ? void 0 : _g.title;
        if (uiTitle)
            btnLink.setAttribute('title', uiTitle);
        else {
            var title = btn.title();
            if (title)
                btnLink.setAttribute('data-i18n', "[title]" + title); // localization support
        }
        var divTag = document.createElement('div');
        divTag.appendChild(this.iconTag(btn, rule));
        btnLink.appendChild(divTag);
        // set color - new in 10.27
        var color = ((_h = rule === null || rule === void 0 ? void 0 : rule.ui) === null || _h === void 0 ? void 0 : _h.color) || ctx.toolbar.settings.color;
        if (color && typeof color === 'string') {
            cl.add('color: ' + color);
            var parts = color.split(',');
            if (parts[0])
                divTag.style.backgroundColor = correctColorCodes(parts[0]);
            if (parts[1])
                divTag.style.color = correctColorCodes(parts[1]);
        }
        return cl.return(btnLink);
    };
    RenderButton.prototype.generateRunJs = function (ctx, params) {
        return "$2sxc(" + ctx.instance.id + ", " + ctx.contentBlock.id + ").manage.run(" + JSON.stringify(params) + ", event);";
    };
    RenderButton.prototype.iconTag = function (btn, rule) {
        var _a;
        var symbol = document.createElement('i');
        var icon = ((_a = rule === null || rule === void 0 ? void 0 : rule.ui) === null || _a === void 0 ? void 0 : _a.icon) || btn.icon();
        __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].addClasses(symbol, icon);
        symbol.setAttribute('aria-hidden', 'true');
        return symbol;
    };
    return RenderButton;
}(__WEBPACK_IMPORTED_MODULE_2__render_part_base__["RenderPart"]));

// detect Hex-colors 6-digits or 8 in case transparent
var colorDetect = '^([A-Fa-f0-9]{6,8})$';
function correctColorCodes(color) {
    if (color && color.match(colorDetect))
        return '#' + color;
    return color;
}


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonCommand", function() { return ButtonCommand; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_commands__ = __webpack_require__(10);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ButtonCommand = /** @class */ (function () {
    // customCode: string;
    function ButtonCommand(name, contentType, params) {
        this.name = name;
        this.params = params;
        if (!params)
            this.params = {};
        if (contentType)
            this.params.contentType = contentType;
        this.command = __WEBPACK_IMPORTED_MODULE_0__commands_commands__["Commands"].get(name); // activate command for this
    }
    /** make static, as many ButtonCommand signatures are actually not objects */
    ButtonCommand.mergeAdditionalParams = function (command, additionalParams) {
        var params = {};
        if (command) {
            if (command.name)
                params.action = command.name;
            if (command.params)
                params = __assign(__assign(__assign({}, params), command.params), additionalParams);
        }
        command.params = params;
        return params;
    };
    return ButtonCommand;
}());



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plumbing__ = __webpack_require__(19);

/**
 * The real button configuration as it's used at runtime
 */
var Button = /** @class */ (function () {
    function Button(command, name) {
        var _a;
        /** classes which will be applied to this button */
        this.classes = '';
        /** Determine if it should use the inline window, always a function */
        this.inlineWindow = function () { return false; };
        this.command = command;
        // if the name is an identifier, split it
        var parts = Button.splitName(name);
        this.id = parts.id;
        // this.name = parts.name;
        // get defaults from action commandDefinition
        if ((_a = command === null || command === void 0 ? void 0 : command.command) === null || _a === void 0 ? void 0 : _a.buttonDefaults)
            __WEBPACK_IMPORTED_MODULE_0__plumbing__["Obj"].TypeSafeAssign(this, command.command.buttonDefaults);
    }
    Button.splitName = function (identifier) {
        var parts = identifier.split('=');
        return { id: parts[0], name: parts[1] || identifier };
    };
    /** Detect if this is a Button */
    Button.is = function (thing) {
        return thing.command !== undefined;
    };
    Button.isArray = function (thing) {
        return thing.length && Button.is(thing[0]);
    };
    Button.isPropGen = function (thing) {
        return typeof thing === 'function';
    };
    return Button;
}());



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isNothing"] = isNothing;
// These types here are alias-types used for conversions and casting
// We created aliases, so we can specifically see where/why we are doing this
function isNothing(thing) {
    return thing === undefined || thing === null;
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return ButtonGroup; });
var ButtonGroup = /** @class */ (function () {
    function ButtonGroup(buttons) {
        this.buttons = buttons;
        this.defaults = {};
        // adds these to the items
        this.buttons = buttons || [];
    }
    /** Detect if this is a ButtonGroup */
    ButtonGroup.is = function (thing) {
        return thing.buttons !== undefined;
    };
    /** Detect if this is a ButtonGroup */
    ButtonGroup.isArray = function (thing) {
        return thing.length && thing[0].buttons !== undefined;
    };
    return ButtonGroup;
}());



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 */
var Toolbar = /** @class */ (function () {
    function Toolbar() {
        /** The groups of buttons in this toolbar */
        this.groups = [];
        /** show more debug info */
        this.debug = false;
        this.identifier = Toolbar.createIdentifier();
    }
    Toolbar.createIdentifier = function () {
        return 'Toolbar' + Math.floor(Math.random() * 99999);
    };
    return Toolbar;
}());



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettings", function() { return ToolbarSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarWhenNoToolbarProvided", function() { return ToolbarWhenNoToolbarProvided; });
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/** contains toolbar behaviour settings like float, etc. */
var ToolbarSettings = /** @class */ (function () {
    function ToolbarSettings(defaults) {
        this.autoAddMore = null;
        this.hover = 'right';
        this.show = 'hover';
        // old term, keep for compatibility, but new is class
        this.classes = '';
        // New 10.27 term for the class for simplicity and consistency with button styling
        this.class = '';
        /**
         * New in 10.27
         * color configuration which applies to all buttons
         * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
         */
        this.color = '';
        if (defaults.autoAddMore)
            this.autoAddMore = defaults.autoAddMore;
        if (defaults.hover)
            this.hover = defaults.hover;
        if (defaults.show)
            this.show = defaults.show;
    }
    /**
     * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
     *
     * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
     * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
     * contain null-items we don't want passed on
     * @param toolbarSettings
     */
    ToolbarSettings.dropEmptyProperties = function (toolbarSettings) {
        var partialSettings = __assign({}, toolbarSettings);
        if (!partialSettings.autoAddMore)
            delete partialSettings.autoAddMore;
        if (!partialSettings.classes)
            delete partialSettings.classes;
        return partialSettings;
    };
    ToolbarSettings.getDefaults = function () { return new ToolbarSettings({ autoAddMore: 'end', hover: 'right', show: 'hover' }); };
    /** Setup for situations where an empty toolbar is needed, without any data or configuration */
    ToolbarSettings.getForEmpty = function () { return new ToolbarSettings({ autoAddMore: 'start', hover: 'left', show: 'hover' }); };
    return ToolbarSettings;
}());

// TODO: this is in the wrong place, shouldn't be in settings
var ToolbarWhenNoToolbarProvided = {
    toolbar: {},
    settings: ToolbarSettings.getForEmpty(),
};


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderButtonGroups", function() { return RenderButtonGroups; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_part_base__ = __webpack_require__(45);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var RenderButtonGroups = /** @class */ (function (_super) {
    __extends(RenderButtonGroups, _super);
    function RenderButtonGroups(parent) {
        return _super.call(this, parent, 'Rnd.Groups') || this;
    }
    RenderButtonGroups.prototype.generate = function (context) {
        var cl = this.log.call('generate');
        var tags = []; // temporary storage for detached HTML DOM objects
        var btnGroups = context.toolbar.groups;
        for (var i = 0; i < btnGroups.length; i++)
            tags = tags.concat(this.generateGroup(btnGroups[i], context, i));
        return cl.return(tags, "total tags: " + tags.length);
    };
    RenderButtonGroups.prototype.generateGroup = function (group, context, groupNumber) {
        var cl = this.log.call('generateGroup', "group #" + groupNumber);
        var tags = []; // temporary storage for detached HTML DOM objects
        var btns = group.buttons;
        for (var h = 0; h < btns.length; h++) {
            var btnContext = context.forButton(btns[h]);
            var tag = this.parent.button.render(btnContext, groupNumber);
            // add button to group of buttons
            var item = document.createElement('li');
            item.appendChild(tag);
            tags.push(item);
        }
        return cl.return(tags, "tags: " + tags.length);
    };
    return RenderButtonGroups;
}(__WEBPACK_IMPORTED_MODULE_0__render_part_base__["RenderPart"]));



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigFinderAndInitializer", function() { return ToolbarConfigFinderAndInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_toolbar_renderer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tag_toolbars_tag_toolbar__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__toolbar_init_config__ = __webpack_require__(46);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







// quick debug - set to false if not needed for production
var dbg = false;
var toolbarSelector = ".sc-menu[toolbar],.sc-menu[data-toolbar],[" + __WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.full + "]";
/**
 * This class is responsible for finding toolbar configurations in the doom
 * and then initializing them.
 */
var ToolbarConfigFinderAndInitializer = /** @class */ (function (_super) {
    __extends(ToolbarConfigFinderAndInitializer, _super);
    /**
     * Special constructor which only allows this builder to be instatiated from the TagManager
     * This is to simplify program control flow
     */
    function ToolbarConfigFinderAndInitializer(tlbManager) {
        var _this = _super.call(this, 'Tlb.Buildr', tlbManager.log) || this;
        _this.tlbManager = tlbManager;
        return _this;
    }
    /**
     * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
     * @param parentTag
     * @param optionalId
     */
    ToolbarConfigFinderAndInitializer.prototype.buildDnnModule = function (parentTag, optionalId) {
        var _this = this;
        var cl = this.log.call('buildDnnModule');
        parentTag = $(parentTag || '.DnnModule-' + optionalId);
        // if something says the toolbars are disabled, then skip
        if (parentTag.attr(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.disable))
            return cl.done('disabled');
        var toolbars = this.findChildTagsWithConfig(parentTag);
        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            toolbars = addDefaultToolbarConfigToTag(parentTag);
            if (toolbars == null)
                return cl.done('toolbars=null');
        }
        toolbars.each(function (i, e) { return _this.loadConfigAndInitialize(e); });
        cl.done();
    };
    /**
     * Build toolbar, but allow an html node as target
     * Will automatically find a wrapping sc-edit-context and all containing toolbars
     * @param node
     */
    ToolbarConfigFinderAndInitializer.prototype.build = function (node) {
        var _this = this;
        // go up the DOM to find the parent which has context-information
        // if we have no contextNode (a parent content block), we can
        // assume the node is outside of a 2sxc module so not interesting
        var contextNode = $(node).closest(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Cb.selectors.ofName)[0];
        if (contextNode == null)
            return;
        // check if the parent-node needs a toolbar
        if (node.is(toolbarSelector))
            this.loadConfigAndInitialize(node[0]);
        // activate all child-nodes with toolbars
        var toolbars = $(toolbarSelector, node);
        toolbars.each(function (i, e) { return _this.loadConfigAndInitialize(e); });
    };
    //////////////////////////////// Private Functions ////////////////////////////////////
    /**
     * find current toolbars inside this wrapper-tag
     */
    ToolbarConfigFinderAndInitializer.prototype.findChildTagsWithConfig = function (parentTag) {
        var allInner = $(toolbarSelector, parentTag);
        // return only those, which don't belong to a sub-item
        var onlyDirectDescendents = allInner
            .filter(function (i, e) {
            return $(e).closest(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Cb.selectors.ofName)[0] === parentTag[0];
        });
        if (dbg)
            console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
        return onlyDirectDescendents;
    };
    /**
     * Setup a toolbar for a specific tag/node by loading its self-contained configuration
     * and replacing / preparing the toolbar as needed.
     * @param node
     */
    ToolbarConfigFinderAndInitializer.prototype.loadConfigAndInitialize = function (node) {
        var cl = this.log.call('loadConfigAndInitialize');
        var tag = $(node);
        // Do not process tag if a toolbar has already been attached
        if (tag.data(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attrToMarkInitalized))
            return cl.done('already initialized');
        var config = __WEBPACK_IMPORTED_MODULE_6__toolbar_init_config__["ToolbarInitConfig"].loadFromTag(node);
        if (config != null) { // is null if load failed
            // catch errors, as this is very common - make sure the others are still rendered
            try {
                this.convertConfigToToolbars(tag, config);
            }
            catch (err2) {
                console.error('error creating toolbar - will skip this one', err2);
            }
        }
        cl.done();
    };
    /**
     * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
     * @param tag
     * @param config
     */
    ToolbarConfigFinderAndInitializer.prototype.convertConfigToToolbars = function (tag, config) {
        var cl = this.log.call('convertConfigToToolbars');
        cl.data('tag', tag);
        cl.data('config', config);
        var context = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextComplete"].findContext(tag);
        context.toolbar = this.tlbManager.loadConfig(context, config);
        // V2 where the full toolbar is included in one setting
        if (tag.attr(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.full)) {
            cl.add('V2 TagToolbar detected');
            tag.data(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attrToMarkInitalized, new __WEBPACK_IMPORTED_MODULE_5__tag_toolbars_tag_toolbar__["TagToolbar"](tag, context));
            this.addHoverAttributeToTag(tag);
            return cl.done();
        }
        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        var toolbar = new __WEBPACK_IMPORTED_MODULE_4__render_toolbar_renderer__["ToolbarRenderer"](context).generate();
        var hoverParent = tag.closest(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.selectors.ofOldHover);
        cl.data('parentTag', hoverParent);
        tag.replaceWith(toolbar);
        if (hoverParent.length > 0) {
            cl.add('V1 hover-toolbar and parents found - will add attribute');
            this.addHoverAttributeToTag(hoverParent);
        }
        cl.done();
    };
    /**
     * add hover-attribute to tag which is responsible for the menu to appear/disappear
     */
    ToolbarConfigFinderAndInitializer.prototype.addHoverAttributeToTag = function (jtag) {
        var cl = this.log.call('addHoverAttributeToTag');
        if (jtag.length <= 0)
            return cl.done('no tag found'); // skip in case nothing was given
        var tag = jtag[0];
        if (!tag.hasAttribute(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.hover)) {
            cl.add('will add attribute ' + __WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.hover);
            tag.setAttribute(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.hover, '');
        }
        cl.done();
    };
    return ToolbarConfigFinderAndInitializer;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["HasLog"]));

//////////////////////////////// Private Functions ////////////////////////////////////
/**
 * Create a default/fallback toolbar and return it
 */
function addDefaultToolbarConfigToTag(parentTag) {
    if (dbg)
        console.log("didn't find toolbar, so will auto-create", parentTag);
    var outsideCb = !parentTag.hasClass(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Cb.classes.name);
    var contentTag = outsideCb ? parentTag.find("div" + __WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Cb.selectors.ofName) : parentTag;
    // auto toolbar
    var ctx = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextComplete"].findContext(contentTag);
    if (ctx.ui.autoToolbar === false)
        return null;
    contentTag.attr(__WEBPACK_IMPORTED_MODULE_0__constants_index__["C"].Toolbar.attr.full, JSON.stringify(__WEBPACK_IMPORTED_MODULE_3__config__["ToolbarWhenNoToolbarProvided"]));
    return contentTag;
}


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundle_button__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextComplete", function() { return __WEBPACK_IMPORTED_MODULE_0__context_bundle_button__["ContextComplete"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundle_instance__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return __WEBPACK_IMPORTED_MODULE_1__context_bundle_instance__["ContextBundleInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundle_content__ = __webpack_require__(53);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContent", function() { return __WEBPACK_IMPORTED_MODULE_2__context_bundle_content__["ContextBundleContent"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_bundle_toolbar__ = __webpack_require__(27);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return __WEBPACK_IMPORTED_MODULE_3__context_bundle_toolbar__["ContextBundleToolbar"]; });






/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_app__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfApp", function() { return __WEBPACK_IMPORTED_MODULE_0__context_app__["ContextOfApp"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_content_block__ = __webpack_require__(47);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_1__context_content_block__["ContextOfContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_instance__ = __webpack_require__(48);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfInstance", function() { return __WEBPACK_IMPORTED_MODULE_2__context_instance__["ContextOfInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_item__ = __webpack_require__(49);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfItem", function() { return __WEBPACK_IMPORTED_MODULE_3__context_item__["ContextOfItem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__context_page__ = __webpack_require__(50);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfPage", function() { return __WEBPACK_IMPORTED_MODULE_4__context_page__["ContextOfPage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__context_system__ = __webpack_require__(51);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfSystem", function() { return __WEBPACK_IMPORTED_MODULE_5__context_system__["ContextOfSystem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__context_tenant__ = __webpack_require__(52);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfTenant", function() { return __WEBPACK_IMPORTED_MODULE_6__context_tenant__["ContextOfTenant"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__context_ui__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUi", function() { return __WEBPACK_IMPORTED_MODULE_7__context_ui__["ContextOfUi"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__context_user__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUser", function() { return __WEBPACK_IMPORTED_MODULE_8__context_user__["ContextOfUser"]; });











/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InPageCommandJson", function() { return InPageCommandJson; });
var InPageCommandJson = /** @class */ (function () {
    function InPageCommandJson() {
    }
    InPageCommandJson.hasActions = function (thing) {
        // check two common signatures - command and action
        return typeof thing.action === 'string';
    };
    InPageCommandJson.hasModify = function (thing) {
        // check two common signatures - command and action
        return !!thing.modify;
    };
    /** Important for object merging - because otherwise action will be preserved */
    InPageCommandJson.noAction = function (thing) {
        // some clean-up
        delete thing.action; // remove the action property
        return thing;
    };
    return InPageCommandJson;
}());



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InPageButtonGroupJson", function() { return InPageButtonGroupJson; });
var InPageButtonGroupJson = /** @class */ (function () {
    function InPageButtonGroupJson() {
    }
    return InPageButtonGroupJson;
}());



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonConfigLoader", function() { return ButtonConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_button_safe__ = __webpack_require__(44);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * This is a system to build button configurations
 */
var ButtonConfigLoader = /** @class */ (function (_super) {
    __extends(ButtonConfigLoader, _super);
    function ButtonConfigLoader(toolbar) {
        var _this = _super.call(this, 'Tlb.BtCfBl', toolbar.log) || this;
        _this.toolbar = toolbar;
        return _this;
    }
    /**
     * takes an object like "actionname" or { action: "actionname", ... }
     * and changes it to a { command: { action: "actionname" }, ... }
     */
    ButtonConfigLoader.prototype.normalize = function (original) {
        var cl = this.log.call('normalize');
        cl.data('initial', original);
        // prevent multiple inits
        var asBtnConfig = original;
        if (asBtnConfig._expanded || asBtnConfig.command)
            return cl.return(asBtnConfig, "already expanded, won't modify");
        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string')
            return cl.return(this.btnConfigStructure(original, {}), 'found name, use that');
        // if it's a command w/action, wrap into command + trim
        if (__WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].hasActions(original)) {
            cl.add('action found, will move down to .command', original);
            if (original.action)
                original.action = original.action.trim();
            return cl.return({
                command: original,
                _expanded: true,
            }, 'had actions, convert to commands');
        }
        throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
    };
    ButtonConfigLoader.prototype.btnConfigStructure = function (name, params) {
        var wrapLog = this.log.call('getFromName', name);
        return wrapLog.return({
            command: {
                action: name.trim(),
                params: params,
            },
            _expanded: true,
        }, "name \"" + name + "\" found, will re-map to .command.action");
    };
    /**
     * remove buttons which are not valid based on add condition
     * @param {ContextComplete} context
     * @param {Toolbar} full
     * @param {InstanceConfig} config
     * @memberof ButtonConfigurationBuilder
     */
    ButtonConfigLoader.prototype.removeDisableButtons = function (context, full) {
        var wrapLog = this.log.call('removeDisableButtons', "length of groups: " + full.groups.length);
        var btnGroups = full.groups;
        for (var g = 0; g < btnGroups.length; g++) {
            var btns = btnGroups[g].buttons;
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            // const config = InstanceConfig.fromContext(context);
            this.removeUnfitButtons(context, /* full,*/ btns /* config, */);
            wrapLog.add('will disable appropriate buttons');
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            // disableButtons(context, btns/*, config */);
            // remove the group, if no buttons left, or only "more"
            if (btns.length === 0 || (btns.length === 1 && btns[0].command.name === __WEBPACK_IMPORTED_MODULE_1__commands__["CmdMore"])) {
                wrapLog.add('found no more buttons except for the "more" - will remove that group');
                btnGroups.splice(g--, 1); // remove, and decrement counter
            }
        }
        wrapLog.return(null);
    };
    /**
     * enhance button-object with default icons, etc.
     * @param btn
     * @param group
     * @param fullToolbarConfig
     * @param actions
     */
    ButtonConfigLoader.prototype.addDefaultBtnSettings = function (btn, groupDefaults, tlbDefaults, actions) {
        var cl = this.log.call('addDefaultBtnSettings', '', "for " + function () { return btn.command.name; });
        for (var d = 0; d < btnProperties.length; d++)
            fallbackBtnSetting(btn, groupDefaults, tlbDefaults, actions, btnProperties[d]);
        cl.return(null);
    };
    ButtonConfigLoader.prototype.removeUnfitButtons = function (context, btns) {
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // config: InstanceConfig,
        var cl = this.log.call('removeUnfitButtons');
        var removals = '';
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            if (btn.command) {
                context.button = btn; // add to context for calls
                var rule = this.toolbar.toolbarV10.rules.find(btn.id || btn.command.name);
                var show = rule === null || rule === void 0 ? void 0 : rule.overrideShow();
                if (show === undefined) {
                    show = new __WEBPACK_IMPORTED_MODULE_3__config_button_safe__["ButtonSafe"](btn, context).showCondition();
                }
                if (show === false) {
                    removals += "#" + i + " \"" + btn.command.name + "\"; ";
                    btns.splice(i--, 1);
                }
                cl.add("btn '" + btn.command.name + "' show " + show);
            }
        }
        if (removals)
            cl.add("removed buttons: " + removals);
        cl.return(null);
    };
    return ButtonConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["HasLog"]));

var btnProperties = [
    'classes',
    'icon',
    'title',
    'dynamicClasses',
    'showCondition',
    'disabled',
];
/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn, groupDefaults, toolbarDefaults, actions, propName) {
    var target = btn;
    // skip it property is already set
    if (target[propName])
        return;
    if (groupDefaults && groupDefaults[propName])
        return target[propName] = groupDefaults[propName];
    // if the toolbar has defaults, try use that property
    if (toolbarDefaults && toolbarDefaults[propName])
        return target[propName] = toolbarDefaults[propName];
    // if there is an action, try to use that property name
    if (btn.command && btn.command.name) {
        var a = actions.get(btn.command.name);
        if (a && a.buttonDefaults) {
            var c = a.buttonDefaults;
            if (c[propName])
                return target[propName] = c[propName];
        }
    }
}


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandConfigLoader", function() { return CommandConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CommandConfigLoader = /** @class */ (function (_super) {
    __extends(CommandConfigLoader, _super);
    function CommandConfigLoader(toolbar) {
        var _this = _super.call(this, 'Tlb.CmdLdr', toolbar.log) || this;
        _this.toolbar = toolbar;
        return _this;
    }
    /**
     * entity support (compatibility for pre 2sxc v9.x)
     * does some clean-up work on a button-definition object
     * because the target item could be specified directly, or in a complex internal object called entity
     * @param actDef
     */
    CommandConfigLoader.prototype.updateToV9 = function (actDef) {
        // doesn't have the pre-V9 properties, so we're fine
        if (!actDef.entity || !actDef.entity._2sxcEditInformation)
            return actDef;
        var editInfo = actDef.entity._2sxcEditInformation;
        // move up sortOrder property and set useModuleList
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
        if (editInfo.sortOrder !== undefined)
            actDef.sortOrder = editInfo.sortOrder;
        // move up entityId and clean-up the old 'entity' property
        if (actDef.entity.EntityId !== undefined)
            actDef.entityId = actDef.entity.EntityId;
        delete actDef.entity;
        return actDef;
    };
    return CommandConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonGroupConfigLoader", function() { return ButtonGroupConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__templates_constants__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var ButtonGroupConfigLoader = /** @class */ (function (_super) {
    __extends(ButtonGroupConfigLoader, _super);
    function ButtonGroupConfigLoader(toolbar) {
        var _this = _super.call(this, 'Tlb.GrpCnf', toolbar.log) || this;
        _this.toolbar = toolbar;
        return _this;
    }
    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    ButtonGroupConfigLoader.prototype.expandButtonGroups = function (fullToolbar) {
        var cl = this.log.call('expandButtonGroups');
        // by now we should have a structure, let's check/fix the buttons
        cl.add("will expand groups - found " + fullToolbar.groups.length + " items");
        for (var g = 0; g < fullToolbar.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            var group = fullToolbar.groups[g];
            var groupDefaults = group.defaults;
            var btns = this.expandButtonList(group, fullToolbar.settings);
            var buttonConfigs = [];
            if (Array.isArray(btns)) {
                cl.add("will process " + btns.length + " buttons");
                for (var b = 0; b < btns.length; b++)
                    buttonConfigs.push(this.convertToButton(btns[b], fullToolbar.params, fullToolbar.defaults, groupDefaults));
            }
            else
                cl.add("no button array found, won't do a.nything");
            // Toolbar API v2 overwrite V1
            group.buttons = buttonConfigs;
        }
        var toolbar = fullToolbar;
        this.dropMoreIfOnlyOneGroup(toolbar);
        return cl.return(toolbar);
    };
    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    ButtonGroupConfigLoader.prototype.convertToButton = function (btn, sharedParams, sharedDefaults, 
    // fullToolbar: ToolbarWip,
    // group: ButtonGroupWip
    groupDefaults) {
        var btnCommand = btn.command;
        var identifier = btnCommand.action;
        var name = __WEBPACK_IMPORTED_MODULE_3__config__["Button"].splitName(identifier).name;
        if (!(__WEBPACK_IMPORTED_MODULE_1__commands__["Commands"].get(name))) {
            this.log.add("couldn't find action " + name + " - show warning");
            console.warn('warning: toolbar-button with unknown action-name:', name);
        }
        // first check if we already got params in the object - then we will use those, otherwise the main object
        var realParams = btnCommand.params
            || __WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].noAction(btnCommand);
        var contentType = realParams.contentType;
        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        btnCommand = this.toolbar.command.updateToV9(btnCommand);
        // parameters adapter from v1 to v2
        var params = __assign(__assign({}, realParams), sharedParams);
        // Toolbar API v2
        var command = new __WEBPACK_IMPORTED_MODULE_3__config__["ButtonCommand"](name, contentType, params);
        var newButtonConfig = new __WEBPACK_IMPORTED_MODULE_3__config__["Button"](command, identifier);
        // settings adapter from v1 to v2
        newButtonConfig = __assign(__assign({}, newButtonConfig), __WEBPACK_IMPORTED_MODULE_0____["InPageButtonJson"].toButton(btn));
        // ensure all buttons have either own settings, or the fallback
        this.toolbar.button.addDefaultBtnSettings(newButtonConfig, groupDefaults, sharedDefaults, __WEBPACK_IMPORTED_MODULE_1__commands__["Commands"]);
        return newButtonConfig;
    };
    /**
     * take a list of buttons (objects OR strings)
     * and convert to proper array of buttons with actions
     * on the in is a object with buttons, which are either:
     * - a string like "edit" or multi-value "layout,more"
     * - an array of such strings incl. optional complex objects which are
     */
    ButtonGroupConfigLoader.prototype.expandButtonList = function (root, settings) {
        var _this = this;
        var wrapLog = this.log.call('expandButtonList'); // new Log('Tlb.ExpBts', this.log, 'start');
        wrapLog.add('initial', root);
        var buttonsWip = root.buttons;
        var newButtons = [];
        // convert compact buttons (with multi-verb action objects) into own button-objects
        // important because an older syntax allowed {action: "new,edit", entityId: 17}
        if (Array.isArray(buttonsWip)) {
            wrapLog.add("detected array of btns (" + buttonsWip.length + "), will ensure it's an object");
            for (var b = 0; b < buttonsWip.length; b++) {
                var btn = buttonsWip[b];
                var actionNames = btn.action;
                wrapLog.add("will process actions: '" + actionNames + "' for ", btn);
                if (typeof actionNames === 'string' && actionNames.indexOf(',') > -1) {
                    wrapLog.add("actionNames has mult values: '" + actionNames + "'");
                    this.expandButtonAndAddToList(newButtons, btn, actionNames);
                }
                else {
                    wrapLog.add('actionNames has 1 value', btn);
                    newButtons.push(btn);
                }
            }
        }
        else if (typeof buttonsWip === 'string') {
            wrapLog.add("detected that it is a string \"" + buttonsWip + "\", will split by \",\" and ...");
            this.expandButtonAndAddToList(newButtons, {}, buttonsWip);
        }
        else {
            wrapLog.add('no special case detected, will use the buttons-object as is');
            newButtons = buttonsWip;
        }
        wrapLog.add("after check, found " + newButtons.length + " buttons", newButtons);
        // optionally add a more-button in each group
        this.addMoreButton(settings, newButtons);
        var result = newButtons.map(function (x) { return _this.toolbar.button.normalize(x); }); // ensure the internal def is also an array now
        return wrapLog.return(result, 'done');
    };
    ButtonGroupConfigLoader.prototype.expandButtonAndAddToList = function (list, btn, names) {
        var cl = this.log.call('expandButtonAndAddToList', "..., ..., '" + names + "'", "button def \"" + btn + " is string of mult names, will expand into array with action-properties\"");
        var actions = names.length ? names.split(__WEBPACK_IMPORTED_MODULE_4__templates_constants__["TemplateConstants"].ButtonSeparator) : [];
        var params = __assign({}, btn);
        delete params.action;
        for (var a = 0; a < actions.length; a++) {
            var commandPart = this.toolbar.button.btnConfigStructure(actions[a], params);
            cl.data('commandPart', commandPart);
            list.push(commandPart); // {...btn, ...commandPart });
        }
        cl.return(list);
    };
    /** Add the "more" button at the end or beginning */
    ButtonGroupConfigLoader.prototype.addMoreButton = function (settings, list) {
        var cl = this.log.call('addMoreButtons');
        var addMore = settings.autoAddMore;
        if (addMore) {
            var moreButton = this.toolbar.button.btnConfigStructure(__WEBPACK_IMPORTED_MODULE_1__commands__["CmdMore"], {});
            if ((addMore === 'end') || (addMore.toString() === 'right')) { // fallback for older v1 setting
                this.log.add('will add a more "..." button to end');
                list.push(moreButton);
            }
            else {
                this.log.add('will add a more "..." button to start');
                list.unshift(moreButton);
            }
        }
        else
            this.log.add('will not add more "..." button');
        cl.return(list);
    };
    /**
     * If there is only one group, then remove the More button.
     * Note that this has to happen almost at the end, because groups will be removed if empty
     */
    ButtonGroupConfigLoader.prototype.dropMoreIfOnlyOneGroup = function (toolbar) {
        var cl = this.log.call('dropMoreIfOnlyOneGroup');
        if (toolbar.groups.length !== 1)
            return cl.done('not just 1 group');
        cl.add('exactly one group found, will remove more');
        var buttons = toolbar.groups[0].buttons;
        var index = buttons.findIndex(function (b) { var _a; return ((_a = b.command) === null || _a === void 0 ? void 0 : _a.name) === __WEBPACK_IMPORTED_MODULE_1__commands__["CmdMore"]; });
        if (index === -1)
            return cl.done("no 'more' button found");
        buttons.splice(index, 1);
        cl.done('more removed');
    };
    return ButtonGroupConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["HasLog"]));



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoaderV09", function() { return ToolbarConfigLoaderV09; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var ToolbarConfigLoaderV09 = /** @class */ (function (_super) {
    __extends(ToolbarConfigLoaderV09, _super);
    function ToolbarConfigLoaderV09(toolbar) {
        var _this = _super.call(this, 'Tlb.TlbV09', toolbar.log) || this;
        _this.toolbar = toolbar;
        return _this;
    }
    ToolbarConfigLoaderV09.prototype.loadV9 = function (context, config) {
        var cl = this.log.call('loadV9');
        var toolbarSettings = config.settings;
        // Default to empty toolbar settings if we don't have a toolbar or settings
        // important: the checks look a bit strange, but there are cases where {} settings are handed in
        // and we can't count the keys because that would result in other checks
        if (Object.keys(config.toolbar).length > 0 && toolbarSettings === {}) {
            cl.add('no data or settings, will use default settings for empty');
            toolbarSettings = __WEBPACK_IMPORTED_MODULE_2__config__["ToolbarSettings"].getForEmpty();
        }
        // if it has an action or is an array, keep that. Otherwise get standard buttons
        var draftToolbar = this.getTemplateIfNoButtonsSpecified(config.toolbar);
        cl.data('after template check', draftToolbar);
        var toolbar = this.buildFullDefinition(context, draftToolbar, toolbarSettings);
        return cl.return(toolbar, 'ok');
    };
    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    ToolbarConfigLoaderV09.prototype.getTemplateIfNoButtonsSpecified = function (raw) {
        var cl = this.log.call('getTemplateIfNoButtonsSpecified');
        cl.add('initial', raw);
        if (__WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].hasActions(raw))
            return cl.return(raw, 'has actions, keep raw');
        if (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].hasGroups(raw))
            return cl.return(raw, 'has groups, keep raw');
        if (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplateGroup"].is(raw))
            return cl.return(raw, 'is group, keep raw');
        if (Array.isArray(raw))
            return cl.return(raw, 'is array, keep raw');
        // final: nothing defined, use template
        cl.add('no toolbar structure specified, will use standard toolbar template');
        var template = this.toolbar.templates.copy(__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplateDefault"].name);
        template.params = (Array.isArray(raw) && raw[0]) || raw; // attach parameters
        return cl.return(template, 'use template');
    };
    /**
     * take various common input format and convert it to a full toolbar-structure definition
     * can handle the following input formats (the param unstructuredConfig):
     * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
     * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
     * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
     * button (detected by "command"): { command: ""|[], icon: "..", ... }
     * just a command (detected by "action"): { entityId: 17, action: "edit" }
     * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
     */
    ToolbarConfigLoaderV09.prototype.buildFullDefinition = function (toolbarContext, unstructuredConfig, 
    // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
    // instanceConfig: InstanceConfig,
    toolbarSettings) {
        var cl = this.log.call('buildFullDefinition');
        var configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;
        if (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].is(unstructuredConfig) && unstructuredConfig.debug)
            console.log('toolbar: detailed debug on; start build full Def');
        var result = this.toolbar.buildTreeAndModifyAccordingToRules(toolbarContext, configWip);
        return cl.return(result);
    };
    //#region build initial toolbar object
    /**
     * this will take an input which could already be a tree, but it could also be a
     * button-definition, or just a string, and make sure that afterwards it's a tree with groups
     * the groups could still be in compact form, or already expanded, depending on the input
     * output is object with:
     * - groups containing buttons[], but buttons could still be very flat
     * - defaults, already officially formatted
     * - params, officially formatted
     * @param unstructuredConfig
     * @param toolbarSettings
     */
    ToolbarConfigLoaderV09.prototype.ensureDefinitionTree = function (unstructuredConfig, toolbarSettings) {
        var wrapLog = this.log.call('ensureDefinitionTree');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig)
            throw ("preparing toolbar, with nothing to work on: " + unstructuredConfig);
        var newToolbar = new __WEBPACK_IMPORTED_MODULE_2__config__["Toolbar"]();
        newToolbar.groups = this.findGroups(unstructuredConfig);
        var probablyTemplate = unstructuredConfig;
        newToolbar.params = probablyTemplate.params || {}; // these are the default command parameters
        newToolbar.settings = __assign(__assign(__assign({}, __WEBPACK_IMPORTED_MODULE_2__config__["ToolbarSettings"].getDefaults()), probablyTemplate.settings), __WEBPACK_IMPORTED_MODULE_2__config__["ToolbarSettings"].dropEmptyProperties(toolbarSettings));
        newToolbar.debug = probablyTemplate.debug || false; // show more debug info
        newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.
        return wrapLog.return(newToolbar);
    };
    ToolbarConfigLoaderV09.prototype.findGroups = function (unstructuredConfig) {
        var cl = this.log.call('findGroups');
        cl.data('initial', unstructuredConfig);
        // case 0: nothing in the config
        if (!unstructuredConfig || unstructuredConfig === {})
            return cl.return([], 'case 0: empty object, use []');
        var arrGroups = []; // Array<InPageButtonJson | ButtonGroup>;
        // ensure that the groups are all correct
        cl.add('will detect what initial structure was given');
        // Case 2: Array
        if (Array.isArray(unstructuredConfig)) {
            cl.add('Case 2: is array');
            if (unstructuredConfig.length === 0)
                return cl.return([], '2a: empty array');
            if (__WEBPACK_IMPORTED_MODULE_2__config__["Button"].isArray(unstructuredConfig))
                return cl.return([{ buttons: unstructuredConfig }], '2b: array of groups');
            if (__WEBPACK_IMPORTED_MODULE_0____["InPageButtonJson"].is(unstructuredConfig[0]))
                return cl.return([{ buttons: unstructuredConfig }], // Array<InPageButtonJson | ButtonGroup>;
                '2b: is list of buttons, return 1 group');
            console.warn('error detecting groups in this toolbar');
            return cl.return([], "2x: error, it's array but can't detect type, use []");
        }
        // Case 3: not an array
        cl.add('Case 3: not array');
        if (__WEBPACK_IMPORTED_MODULE_0____["InPageButtonJson"].is(unstructuredConfig)) {
            return cl.return([{ buttons: [unstructuredConfig] }], 'Case 3a: not array, but has action/buttons properties, will wrap config into array');
        }
        cl.add('Case 3: not array and no "action", will return it or blank');
        // we either have groups already, or we'll return blank
        if (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].hasGroups(unstructuredConfig))
            return cl.return(unstructuredConfig.groups, '4: found groups');
        // else
        //     return cl.return([], 'no groups, return []');
        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        // if (!arrGroups || !(arrGroups as any).length) {
        //     return cl.return([], 'not array or has no items, return empty array');
        // } else
        //     cl.add('its an object or array, use that');
        // if (ButtonGroup.isArray(arrGroups)) {
        //     return cl.return(arrGroups, 'detected buttons on first item, assume button-group, moving into .groups');
        // } else if (InPageButtonJson.isArray(arrGroups)) {
        //     return cl.return([{ buttons:  arrGroups } as InPageButtonGroupJson],
        //         'detected command or action on first item, assume buttons, move into .groups[buttons] ');
        // }
        cl.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrGroups);
        return cl.return([], 'warning');
    };
    return ToolbarConfigLoaderV09;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 103 */
/***/ (function(module, exports) {



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateEmpty", function() { return ToolbarTemplateEmpty; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
var ToolbarTemplateEmpty = {
    name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].NameEmpty,
    groups: [
        {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupDefault,
            buttons: '',
        },
    ],
    defaults: {},
    params: {},
    settings: {
        autoAddMore: 'end',
    },
    _isToolbarTemplate: true,
};


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateDefault", function() { return ToolbarTemplateDefault; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
var ToolbarTemplateDefault = {
    name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].NameDefault,
    groups: [
        {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupDefault,
            buttons: 'edit,new,metadata,publish,layout',
        }, {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupList,
            buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
        }, {
            // todo: rename - and in all templates
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupEditAdvanced,
            buttons: 'delete',
        }, {
            // todo: rename - and in all templates - probably 'view'
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupView,
            buttons: 'template-develop,template-settings,contentitems,template-query,contenttype',
            defaults: {
                classes: 'group-pro',
            },
        }, {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupApp,
            buttons: 'app,app-settings,app-resources,zone',
            defaults: {
                classes: 'group-pro',
            },
        },
    ],
    defaults: {},
    params: {},
    settings: {
        autoAddMore: 'end',
    },
    _isToolbarTemplate: true,
};


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateInListRight", function() { return ToolbarTemplateInListRight; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
var ToolbarTemplateInListRight = {
    name: 'listitem',
    groups: [
        {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupDefault,
            buttons: 'edit,new,publish',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupList,
            buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupEditAdvanced,
            buttons: 'delete',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupApp,
            buttons: 'contentitems,contenttype',
            defaults: {
                classes: 'group-inlist group-pro',
            },
        },
    ],
    defaults: {},
    params: {},
    settings: {
        autoAddMore: 'end',
    },
    _isToolbarTemplate: true,
};


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateManager", function() { return ToolbarTemplateManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plumbing__ = __webpack_require__(19);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * The template manager provides toolbar templates to the entire system.
 * It basically keeps a list of predefined templates, and returns the ones needed
 */
var ToolbarTemplateManagerSingleton = /** @class */ (function (_super) {
    __extends(ToolbarTemplateManagerSingleton, _super);
    function ToolbarTemplateManagerSingleton() {
        var _this = _super.call(this, 'Tlb.TmpMan', null, 'build') || this;
        _this.configTemplateList = [];
        /** hash - table of templates, to be used a list()['template - name'] */
        _this.list = {};
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('system', 'toolbar-template-manager', _this.log);
        _this.add(__WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateEmpty"]);
        _this.add(__WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateDefault"]);
        // CodeChange #2020-03-20#TemplateToolbarLeftUnused - if no side-effects, delete in June
        // this.add('left', ToolbarTemplateLeft);
        _this.add(__WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateInListRight"]);
        return _this;
    }
    /**
     * Deep copy toolbar template, so it can be modified without changing the next use
     */
    ToolbarTemplateManagerSingleton.prototype.copy = function (name) {
        return __WEBPACK_IMPORTED_MODULE_2__plumbing__["Obj"].DeepClone(this.findOrShowError(name));
    };
    ToolbarTemplateManagerSingleton.prototype.findOrShowError = function (name) {
        var found = this.list[name];
        if (found)
            return found;
        throw "try to find toolbar template '" + name + "' but not found";
    };
    /**
     * adds a template to the list, if it doesn't exist
     */
    ToolbarTemplateManagerSingleton.prototype.add = function (template) {
        this.list[template.name] = template;
    };
    return ToolbarTemplateManagerSingleton;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
var ToolbarTemplateManager = new ToolbarTemplateManagerSingleton();


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplate", function() { return ToolbarTemplate; });
/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 */
var ToolbarTemplate = /** @class */ (function () {
    function ToolbarTemplate() {
        this.groups = [];
        this.defaults = {};
        this.params = {};
        this.settings = {};
    }
    ToolbarTemplate.is = function (thing) {
        return thing._isToolbarTemplate;
    };
    ToolbarTemplate.hasGroups = function (thing) {
        return Array.isArray(thing.groups);
    };
    return ToolbarTemplate;
}());



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateGroup", function() { return ToolbarTemplateGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);

/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 */
var ToolbarTemplateGroup = /** @class */ (function () {
    function ToolbarTemplateGroup() {
        this.name = __WEBPACK_IMPORTED_MODULE_0____["TemplateConstants"].GroupUnknown;
        this.buttons = '';
        this.defaults = {};
    }
    ToolbarTemplateGroup.is = function (thing) {
        return thing.buttons !== undefined;
    };
    return ToolbarTemplateGroup;
}());



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateEditor", function() { return TemplateEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * This object is used to change the structure of a toolbar template.
 * It's only purpose is to assist in the new V10 format for quickly making toolbars.
 */
var TemplateEditor = /** @class */ (function (_super) {
    __extends(TemplateEditor, _super);
    function TemplateEditor(toolbar) {
        var _this = _super.call(this, 'Tlb.TplEdt', toolbar.log) || this;
        _this.toolbar = toolbar;
        _this.ensureGroups = function (template) { if (!template.groups)
            template.groups = []; };
        _this.findGroup = function (template, name) {
            return template.groups.find(function (t) { return t.name === name; });
        };
        return _this;
    }
    TemplateEditor.prototype.addButton = function (template, groupName, id, name, pos, fromStart) {
        var _a, _b;
        var cl = this.log.call('addButton', "..., " + groupName + ", " + name);
        if (!template)
            return cl.done('no template');
        var group = this.findGroupOrDefault(template, groupName);
        if (!group)
            group = this.addGroup(template, groupName, 1000, true); // create group at end
        var buttons = (_b = (_a = group.buttons) === null || _a === void 0 ? void 0 : _a.split(__WEBPACK_IMPORTED_MODULE_2__constants__["TemplateConstants"].ButtonSeparator)) !== null && _b !== void 0 ? _b : [];
        var buttonId = id === name ? name : id + "=" + name;
        var posStartEnd = this.correctPosStartEnd(buttons, pos, fromStart);
        var posInsert = fromStart ? this.findInsertPosition(group, posStartEnd) : posStartEnd;
        cl.add("pos: " + pos + ", startEnd: " + posStartEnd + ", insert:" + posInsert);
        buttons.splice(posInsert, 0, buttonId);
        group.buttons = buttons
            .filter(function (b) { return b.length; }) // drop empty items
            .join(__WEBPACK_IMPORTED_MODULE_2__constants__["TemplateConstants"].ButtonSeparator);
        cl.done();
    };
    TemplateEditor.prototype.findInsertPosition = function (group, pos) {
        group._insertCursor = group._insertCursor || 0;
        if (pos === 0)
            pos = group._insertCursor++;
        return pos;
    };
    TemplateEditor.prototype.correctPosStartEnd = function (target, pos, fromStart) {
        if (fromStart)
            return pos;
        pos = target.length - pos;
        return pos >= 0 ? pos : target.length;
    };
    TemplateEditor.prototype.addGroup = function (template, groupName, pos, fromStart) {
        var cl = this.log.call('addGroup', "..., " + groupName + ", " + pos);
        this.ensureGroups(template);
        var alreadyExists = this.findGroup(template, groupName);
        if (alreadyExists)
            return cl.return(alreadyExists, 'already exists');
        var newGroup = new __WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateGroup"]();
        newGroup.name = groupName;
        var posStartEnd = this.correctPosStartEnd(template.groups, pos, fromStart);
        var posInsert = fromStart ? this.findInsertPosition(template, posStartEnd) : posStartEnd;
        template.groups.splice(posInsert, 0, newGroup);
        return cl.return(newGroup, 'created');
    };
    TemplateEditor.prototype.removeGroup = function (template, groupName) {
        var group = this.findGroup(template, groupName);
        if (!group)
            return;
        var index = template.groups.indexOf(group);
        if (index < 0)
            return;
        template.groups.splice(index, 1);
    };
    TemplateEditor.prototype.findGroupOrDefault = function (template, name) {
        var cl = this.log.call('findGroup', name);
        this.ensureGroups(template);
        if (template.groups.length === 0)
            return cl.return(null, 'no groups');
        var found = this.findGroup(template, name);
        if (found)
            return cl.return(found, 'found');
        return cl.return(template.groups[0], 'not found, return first)');
    };
    return TemplateEditor;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoaderV10", function() { return ToolbarConfigLoaderV10; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rules__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var ToolbarConfigLoaderV10 = /** @class */ (function (_super) {
    __extends(ToolbarConfigLoaderV10, _super);
    function ToolbarConfigLoaderV10(toolbar) {
        var _this = _super.call(this, 'Tlb.TlbV10', toolbar.log, 'constructor') || this;
        _this.toolbar = toolbar;
        _this.rules = new __WEBPACK_IMPORTED_MODULE_2__rules__["RuleManager"](toolbar);
        return _this;
    }
    ToolbarConfigLoaderV10.prototype.loadV10 = function (context, config, raw) {
        var _this = this;
        var cl = this.log.call('loadV10');
        this.rules.load(raw);
        var template;
        // #1 prepare settings if no rule configured it
        var settingRule = this.rules.getSettings();
        var settingsDefaults = __WEBPACK_IMPORTED_MODULE_1__config__["ToolbarSettings"].getDefaults();
        var settings = (Object.keys((settingRule === null || settingRule === void 0 ? void 0 : settingRule.ui) || {}).length > 0)
            ? __assign(__assign({}, settingsDefaults), settingRule.ui)
            : settingsDefaults; // note: Settings Empty currently don't use the V10 mechanism yet
        // #2 load either the default toolbar or the one specified
        var toolbarRule = this.rules.getToolbar();
        var toolbarTemplateName = toolbarRule
            ? toolbarRule.name
            : __WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplateDefault"].name;
        template = this.toolbar.templates.copy(toolbarTemplateName);
        template.settings = settings;
        // #3 attach params
        var params = this.rules.getParams();
        if (params)
            template.params = params.params;
        // #4 Remove unwanted groups
        var removeGroups = this.rules.getRemoveGroups();
        removeGroups.forEach(function (rg) { return _this.toolbar.templateEditor.removeGroup(template, rg.name); });
        // Add additional buttons
        var add = this.rules.getAdd();
        add.forEach(function (a) {
            if (a.step === __WEBPACK_IMPORTED_MODULE_2__rules__["BuildSteps"].group)
                _this.toolbar.templateEditor.addGroup(template, a.name, a.pos, a.fromStart);
            else
                _this.toolbar.templateEditor.addButton(template, a.group, a.id, a.name, a.pos, a.fromStart);
        });
        var toolbar = this.toolbar.buildTreeAndModifyAccordingToRules(context, template);
        if (!toolbar.identifier)
            toolbar.identifier = __WEBPACK_IMPORTED_MODULE_1__config__["Toolbar"].createIdentifier();
        toolbar.settings._rules = this.rules;
        // process the rules one by one
        return cl.return(toolbar, 'ok');
    };
    return ToolbarConfigLoaderV10;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleConstants", function() { return RuleConstants; });
var RuleConstants = {
    Keys: {
        None: 'none',
    },
};


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operations", function() { return Operations; });
var Operations;
(function (Operations) {
    Operations["add"] = "+";
    Operations["remove"] = "-";
    Operations["system"] = "$";
    Operations["modify"] = "%";
    Operations["comment"] = "/";
})(Operations || (Operations = {}));


/***/ }),
/* 114 */
/***/ (function(module, exports) {



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleParamsHelper", function() { return RuleParamsHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);

var prefillPrefix = 'prefill:';
var filterPrefix = 'filter:';
// const metadataPrefix = 'for';
var RuleParamsHelper = /** @class */ (function () {
    function RuleParamsHelper() {
    }
    RuleParamsHelper.processParams = function (params, log) {
        var cl = log.call('processParams');
        var prefill = RuleParamsHelper.processSubMultiKeys(params, prefillPrefix, log);
        if (prefill)
            params.prefill = prefill;
        var filters = RuleParamsHelper.processSubMultiKeys(params, filterPrefix, log);
        if (filters)
            params.filters = filters;
        // catch a very common mistake in metadata
        if (params.metadata) {
            delete params.metadata;
            cl.add('params had additional metadata - invalid, will remove', null, __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        }
        // process metadata
        if (params.for)
            params.metadata = RuleParamsHelper.processMetadata(params, log);
        return cl.return(params);
    };
    RuleParamsHelper.processMetadata = function (params, log) {
        var cl = log.call('processMetadata');
        // get the for-target and if exists, delete from params
        var mdFor = params.for;
        if (!mdFor)
            return cl.return(undefined, 'no metadata');
        delete params.for;
        // just one part, use it as key
        if (mdFor.indexOf(',') === -1)
            return cl.return({ key: mdFor }, 'only has key');
        var parts = mdFor.split(',').map(function (p) { return p.trim(); });
        if (parts.length !== 3)
            return cl.return(undefined, "error: metadata-for parts count expected 3: " + parts.length, __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        // part 1 must be a number
        var targetType = +parts[0];
        if (isNaN(targetType))
            return cl.return(undefined, "error: first key part is not number - got " + targetType, __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        // part 2 must be a string with 'string', 'guid' or 'number'
        var keyType = parts[1];
        if (keyType !== 'string' && keyType !== 'guid' && keyType !== 'number')
            return cl.return(undefined, "error: key is not known type, should be string, guid or number, but got " + keyType, __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        // part 3 is the key
        var key = parts[2];
        if (key === null || key === undefined || key === '')
            return cl.return(undefined, "error: key strange value: '" + key + "'", __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        // todo: warn if no metadata or id!
        if (!params.contentType || params.entityId == null)
            return cl.return(undefined, 'error: contentType and entityId missing', __WEBPACK_IMPORTED_MODULE_0__logging__["LogEntryOptions"].error);
        return cl.return({
            key: key,
            targetType: targetType,
            keyType: keyType,
        });
    };
    /** Do special processing on all prefill:Field=Value rules */
    RuleParamsHelper.processSubMultiKeys = function (params, prefix, log) {
        var cl = log.call('processSubMultiKeys');
        // only load special prefills if we don't already have a prefill
        if (!params)
            return cl.return(undefined, 'no params');
        var keys = Object.keys(params).filter(function (k) { return k.indexOf(prefix) === 0; });
        if (!keys || keys.length === 0)
            return cl.return(undefined, "no speciall '" + prefix + "' keys");
        var prefixLen = prefix.length;
        var list = {};
        keys.forEach(function (k) {
            var value = params[k];
            // 2020-04-02 prefill is a bit flaky - this should fix the common issues
            // fix boolean true must be "true"
            if (value === true || value === false)
                value = value.toString();
            else {
                // try to detect list of guids
                if (prefix === prefillPrefix)
                    value = RuleParamsHelper.convertGuidListToArrayOrKeepOriginal(value);
            }
            list[k.substring(prefixLen)] = value;
            delete params[k];
        });
        return cl.return(list, 'got list of multi-keys');
    };
    RuleParamsHelper.convertGuidListToArrayOrKeepOriginal = function (value) {
        // must be string
        if (!value || typeof value !== 'string')
            return value;
        // must have a comma to become an array
        if (value.indexOf(',') === -1)
            return value;
        // shouldn't have any quotes
        if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0)
            return value;
        var probablyArray = value.split(',').map(function (g) { return g.trim(); });
        // guid check regex from https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
        var guidCount = probablyArray
            .filter(function (g) { return g.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) !== null; });
        // .filter((m) => m === true);
        if (guidCount && guidCount.length === probablyArray.length)
            return probablyArray;
        return value;
    };
    return RuleParamsHelper;
}());



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuildRule", function() { return BuildRule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__build_steps__ = __webpack_require__(33);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * Contains a rule how to add/modify a toolbar.
 */
var BuildRule = /** @class */ (function (_super) {
    __extends(BuildRule, _super);
    //#endregion
    function BuildRule(ruleString, parentLog) {
        var _this = _super.call(this, 'Tlb.BdRule', parentLog) || this;
        _this.ruleString = ruleString;
        /** Group name - when adding more buttons */
        _this.group = __WEBPACK_IMPORTED_MODULE_2__templates__["TemplateConstants"].NameDefault;
        /** position where something is added - the group or the button */
        _this.pos = 0;
        /**
         * if the position is from start or end.
         * Is calculated from pos +/-, but can also be -0 = end
         */
        _this.fromStart = true;
        //#endregion
        //#region command parts
        _this.params = {};
        _this.ui = {};
        /** ATM unused url-part after the hash - will probably be needed in future */
        _this.hash = {};
        if (!ruleString) {
            _this.log.add('rule is empty');
            return _this;
        }
        _this.load();
        return _this;
    }
    /** Tells if this rule will override the show settings  */
    BuildRule.prototype.overrideShow = function () {
        var _a;
        if (this.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].remove)
            return false;
        if (this.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].add)
            return true;
        if (this.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].modify && ((_a = this === null || this === void 0 ? void 0 : this.ui) === null || _a === void 0 ? void 0 : _a.show) !== undefined)
            return this.ui.show;
        return undefined;
    };
    BuildRule.prototype.load = function () {
        var cl = this.log.call('load', this.ruleString);
        var parts = splitUrlSections(this.ruleString);
        if (!parts.key)
            return cl.done("no key, won't load");
        this.loadHeader(parts.key);
        if (parts.params)
            this.loadParamsAndPrefill(parts.params);
        if (parts.button)
            this.loadHash(parts.button);
        return cl.done();
    };
    BuildRule.prototype.loadHeader = function (rule) {
        var _a, _b;
        var cl = this.log.call('loadHeader', rule);
        var parts = this.splitParamsArray(rule);
        var key = ((_a = parts === null || parts === void 0 ? void 0 : parts[0]) === null || _a === void 0 ? void 0 : _a[0]) || __WEBPACK_IMPORTED_MODULE_0____["RuleConstants"].Keys.None;
        // Pick up the operation from header, but if it's not a known operator, auto-detect
        var operator = key[0];
        var knownOperatorFound = Object.values(__WEBPACK_IMPORTED_MODULE_0____["Operations"]).includes(operator);
        if (!knownOperatorFound)
            operator = (key === __WEBPACK_IMPORTED_MODULE_3__build_steps__["BuildSteps"].params || key === __WEBPACK_IMPORTED_MODULE_3__build_steps__["BuildSteps"].settings || key === __WEBPACK_IMPORTED_MODULE_3__build_steps__["BuildSteps"].toolbar)
                ? __WEBPACK_IMPORTED_MODULE_0____["Operations"].system
                : __WEBPACK_IMPORTED_MODULE_0____["Operations"].add;
        this.operator = operator;
        cl.add("name part '" + key + "', firstChar '" + operator + "'");
        // remember the primary keyword because this determines what we're doing
        // but truncate the first char if it had an operator
        key = knownOperatorFound ? key.substring(1) : key;
        var knowStepFound = Object.values(__WEBPACK_IMPORTED_MODULE_3__build_steps__["BuildSteps"]).includes(key);
        this.step = knowStepFound ? key : __WEBPACK_IMPORTED_MODULE_3__build_steps__["BuildSteps"].button;
        // for system and %-change operations the id should be the name of the standard button
        // ...but if it's an add-operation, we must keep the IDs appart because various
        // properties are set at a much later time
        this.id = (this.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].add)
            ? 'rndId' + Math.floor(Math.random() * 99999)
            : key;
        // command name defaults to name, can be reset by load-headers
        // assumes key is something like "group=myGroup" or just "edit"
        this.name = ((_b = parts === null || parts === void 0 ? void 0 : parts[0]) === null || _b === void 0 ? void 0 : _b[1]) || key;
        if (parts.length > 1)
            this.loadHeaderParts(parts.slice(1));
        return cl.done();
    };
    BuildRule.prototype.loadHeaderParts = function (rest) {
        var cl = this.log.call('loadHeaderParts');
        if (!rest.length)
            return cl.done('nothing to load');
        var parts = this.dicToArray(rest);
        // #1 pick up id & name
        if (parts.id)
            this.id = parts.id;
        if (parts.name)
            this.name = parts.name;
        // #2 pick up group
        if (typeof parts.group === 'string') {
            this.group = parts.group;
            delete parts.group;
        }
        // #3 position can be number or -number to indicate from other side
        if (typeof parts.pos === 'string' && parts.pos.length > 0) {
            var pos = parts.pos;
            if (pos[0] === '-') {
                this.fromStart = false;
                pos = pos.substring(1);
            }
            if (pos.length)
                this.pos = parseInt(pos, 10);
            delete parts.pos;
        }
        // #4 icon is automatically kept
        // #5 show override
        if (typeof parts.show === 'string')
            parts.show = parts.show === 'true';
        this.ui = parts;
        return cl.return(this.ui, 'button rules');
    };
    BuildRule.prototype.loadParamsAndPrefill = function (rule) {
        var cl = this.log.call('loadParams', rule);
        this.params = this.splitParamsDic(rule);
        cl.data('params', this.params);
        this.params = __WEBPACK_IMPORTED_MODULE_0____["RuleParamsHelper"].processParams(this.params, this.log);
        return cl.done();
    };
    BuildRule.prototype.loadHash = function (rule) {
        var cl = this.log.call('loadButton', rule);
        this.hash = this.splitParamsDic(rule);
        cl.data('button', this.hash);
        return cl.done();
    };
    //#region string manipulation helpers
    BuildRule.prototype.dicToArray = function (original) {
        return original.reduce(function (map, obj) {
            map[obj[0]] = obj[1];
            return map;
        }, {});
    };
    BuildRule.prototype.splitParamsDic = function (original) {
        return this.dicToArray(this.splitParamsArray(original));
    };
    BuildRule.prototype.splitParamsArray = function (original) {
        if (!original)
            return [];
        var split1 = original.split('&');
        var split2 = split1.map(function (p) {
            var keyValues = p.split('=');
            var key = keyValues[0];
            var val = keyValues[1];
            // disabled, don't see a use case for this
            // check if the value had '=' - then re-join
            // if (keyValues.length > 1)
            //     val = keyValues.slice(1).join('=');
            // fix url encoding
            if ((val === null || val === void 0 ? void 0 : val.indexOf('%')) > -1)
                val = decodeURIComponent(val);
            // fix C# typed true/false or string representations
            if (val === 'True' || val === 'true')
                return [key, true]; // val = true;
            if (val === 'False' || val === 'false')
                return [key, false]; // val = false;
            // cast numbers to numbers
            val = isNaN(+val) ? val : Number(val);
            return [key, val];
        });
        return split2;
    };
    return BuildRule;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));

function splitUrlSections(str) {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
    var regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    var m = regex.exec(str);
    if (m && m !== null)
        return { key: m[1], params: m[4], button: m[6] };
    return undefined;
}


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleManager", function() { return RuleManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__build_steps__ = __webpack_require__(33);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var throwOnError = true;
var RuleManager = /** @class */ (function (_super) {
    __extends(RuleManager, _super);
    /** Basic constructor, must be called from a ToolbarConfigLoader */
    function RuleManager(parent) {
        var _this = _super.call(this, 'Tlb.RlMngr', parent.log, 'constructor') || this;
        /** List of rules which were picked up and will be applied */
        _this.rules = [];
        _this.tempId = Math.floor(Math.random() * 99999);
        _this.getSettings = function () { return _this.getSystemRule(__WEBPACK_IMPORTED_MODULE_2__build_steps__["BuildSteps"].settings); };
        _this.getParams = function () { return _this.getSystemRule(__WEBPACK_IMPORTED_MODULE_2__build_steps__["BuildSteps"].params); };
        _this.getToolbar = function () { return _this.getSystemRule(__WEBPACK_IMPORTED_MODULE_2__build_steps__["BuildSteps"].toolbar); };
        _this.getAdd = function () { return _this.filter(function (br) { return br.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].add; }); };
        _this.getRemoveGroups = function () { return _this.filter(function (br) { return br.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].remove && br.step === __WEBPACK_IMPORTED_MODULE_2__build_steps__["BuildSteps"].group; }); };
        _this.log.add('tempId:' + _this.tempId);
        return _this;
    }
    /** Load/initialize the rules which were found */
    RuleManager.prototype.load = function (rawList) {
        var _this = this;
        var cl = this.log.call('load', "" + function () { return rawList.length; });
        if (!Array.isArray(rawList))
            return cl.return([], 'raw is empty');
        rawList.forEach(function (raw) {
            if (typeof raw === 'string') {
                try {
                    _this.rules.push(new __WEBPACK_IMPORTED_MODULE_0____["BuildRule"](raw, _this.log));
                }
                catch (e) {
                    if (throwOnError)
                        throw e;
                    cl.add("error adding string-rule '" + raw + "'", e);
                }
            }
            else {
                console.error('tried to parse a toolbar rule and expected a string, but got something else');
            }
        });
        return cl.return(this.rules, 'final rules');
    };
    /** Find a single rule matching an ID */
    RuleManager.prototype.find = function (id) { return this.rules.find(function (r) { return r.id === id; }); };
    /** find all rules matching a criteria */
    RuleManager.prototype.filter = function (criteria) { return this.rules.filter(criteria); };
    /** Find a system rule (marked with '$') */
    RuleManager.prototype.getSystemRule = function (name) {
        return this.rules.find(function (r) { return r.operator === __WEBPACK_IMPORTED_MODULE_0____["Operations"].system && r.step === name; });
    };
    return RuleManager;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 118 */
/***/ (function(module, exports) {



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionCoordinates", function() { return PositionCoordinates; });
var PositionCoordinates = /** @class */ (function () {
    function PositionCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
    return PositionCoordinates;
}());



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierDnnModule", function() { return ModifierDnnModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ModifierDnnModule = /** @class */ (function (_super) {
    __extends(ModifierDnnModule, _super);
    function ModifierDnnModule() {
        var _this = _super.call(this, 'QE.DnnMod') || this;
        _this.modInternal = new __WEBPACK_IMPORTED_MODULE_0____["ModifierDnnModuleInternal"](_this);
        return _this;
    }
    ModifierDnnModule.prototype.delete = function (clip) {
        if (!confirm('are you sure?'))
            return;
        var modId = this.modInternal.getModuleId(clip.item.className);
        this.modInternal.delete(modId);
    };
    // todo: unsure if this is a good place for this bit of code...
    ModifierDnnModule.prototype.move = function (oldClip, newClip, from, to) {
        var modId = this.modInternal.getModuleId(oldClip.item.className);
        var pane = this.modInternal.getPaneName(newClip.list);
        this.modInternal.move(modId, pane, to);
    };
    ModifierDnnModule.prototype.showSendToPane = function () {
        var pane = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeModule.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
        // show the pane-options
        var pl = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.find('#paneList');
        if (!pl.is(':empty'))
            pl.empty();
        pl.append(this.modInternal.getMoveButtons(this.modInternal.getPaneName(pane)));
    };
    ModifierDnnModule.onModuleButtonClick = function () {
        var type = $(this).data('type');
        var dnnMod = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeModule;
        var pane = dnnMod.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
        var index = 0;
        if (dnnMod.hasClass('DnnModule'))
            index = pane.find('.DnnModule').index(dnnMod[0]) + 1;
        var cbAction = $(this).data('action');
        if (cbAction)
            return __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].do(cbAction, pane, index, __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.id); // copy/paste
        var modManage = __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].modDnn.modInternal;
        return modManage.create(modManage.getPaneName(pane), index, type);
    };
    return ModifierDnnModule;
}(__WEBPACK_IMPORTED_MODULE_0____["ModifierBase"]));



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifierDnnModuleInternal", function() { return ModifierDnnModuleInternal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/**
 * module specific stuff
 */
var ModifierDnnModuleInternal = /** @class */ (function (_super) {
    __extends(ModifierDnnModuleInternal, _super);
    function ModifierDnnModuleInternal(parent) {
        return _super.call(this, 'QE.ModMng', parent.log) || this;
    }
    /**
     * Delete a module
     */
    ModifierDnnModuleInternal.prototype.delete = function (modId) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        return sendDnnAjax(modId, '2sxc/dnn/module/delete', {
            url: $.dnnSF().getServiceRoot('2sxc') + 'dnn/module/delete',
            type: 'GET',
            data: {
                tabId: tabId,
                modId: modId,
            },
            // ReSharper disable once UnusedParameter
            success: function () { return window.location.reload(); },
        });
    };
    /**
     * Create a new module
     */
    ModifierDnnModuleInternal.prototype.create = function (paneName, index, type) {
        return sendDnnAjax(null, 'controlbar/GetPortalDesktopModules', {
            data: 'category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=',
            success: function (desktopModules) {
                var moduleToFind = type === 'Default' ? ' Content' : ' App';
                var module = null;
                // ReSharper disable once UnusedParameter
                desktopModules.forEach(function (e, i) {
                    if (e.ModuleName === moduleToFind)
                        module = e;
                });
                return (!module)
                    ? alert(moduleToFind + ' module not found.')
                    : createMod(paneName, index, module.ModuleID);
            },
        });
    };
    /**
     * Move a DNN Module
     */
    ModifierDnnModuleInternal.prototype.move = function (modId, pane, order) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        var dataVar = {
            TabId: tabId,
            ModuleId: modId,
            Pane: pane,
            ModuleOrder: (2 * order + 0),
        };
        sendDnnAjax(modId, 'ModuleService/MoveModule', {
            type: 'POST',
            data: dataVar,
            success: function () { return window.location.reload(); },
        });
        // fire window resize to reposition action menus
        $(window).resize();
    };
    ModifierDnnModuleInternal.prototype.getPaneName = function (pane) {
        return $(pane).attr('id').replace('dnn_', '');
    };
    /**
     * find the correct module id from a list of classes - used on the module-wrapper
     */
    ModifierDnnModuleInternal.prototype.getModuleId = function (classes) {
        var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? Number(result[1]) : null;
    };
    ModifierDnnModuleInternal.prototype.getMoveButtons = function (current) {
        var pns = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].cachedPanes;
        // generate list of panes as links
        var targets = $('<div>');
        for (var p = 0; p < pns.length; p++) {
            var pName = this.getPaneName(pns[p]);
            var selected = (current === pName) ? ' selected ' : '';
            if (selected === '')
                targets.append("<a data='" + pName + "'>" + pName + "</a>");
        }
        // attach click event...
        targets.find('a').click(function () {
            var link = $(this);
            var clip = __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].clipboard;
            var modId = this.getModuleId(clip.item.className);
            var newPane = link.attr('data');
            this.moveMod(modId, newPane, 0);
        });
        return targets;
    };
    return ModifierDnnModuleInternal;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));

// show an error when an xhr error occurs
function xhrError(xhr, optionalMessage) {
    alert(optionalMessage || 'Error while talking to server.');
    console.log(xhr);
}
// call an api on dnn
function sendDnnAjax(modId, serviceName, options) {
    var service = $.dnnSF(modId);
    return $.ajax(__assign({ type: 'GET', url: service.getServiceRoot('internalservices') + serviceName, beforeSend: service.setModuleHeaders, error: xhrError }, options));
}
// create / insert a new module
function createMod(paneName, position, modId) {
    var postData = {
        Module: modId,
        Page: '',
        Pane: paneName,
        Position: -1,
        Sort: position,
        Visibility: 0,
        AddExistingModule: false,
        CopyModule: false,
    };
    return sendDnnAjax(null, 'controlbar/AddModule', {
        type: 'POST',
        data: postData,
        success: function () { return window.location.reload(); },
    });
}


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Positioning", function() { return Positioning; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_for_lists__ = __webpack_require__(18);


/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    /**
     * Find the position of an element
     */
    Positioning.get = function (element) {
        var coords = {
            element: element,
            x: element.offset().left,
            w: element.width(),
            y: element.offset().top,
            // For content-block ITEMS, the menu must be visible at the end
            // For content-block-LISTS, the menu must be at top
            yh: element.offset().top + (element.is(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].eitherCbOrMod) ? element.height() : 0),
        };
        return coords;
    };
    /**
     * Prepare offset calculation based on body positioning
     */
    Positioning.getBodyPosition = function () {
        var bodyPos = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.css('position');
        return bodyPos === 'relative' || bodyPos === 'absolute'
            ? new __WEBPACK_IMPORTED_MODULE_0____["PositionCoordinates"](__WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.offset().left, __WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.offset().top)
            : new __WEBPACK_IMPORTED_MODULE_0____["PositionCoordinates"](0, 0);
    };
    Positioning.positionAndAlign = positionAndAlign;
    Positioning.refresh = refresh;
    return Positioning;
}());

/**
 * Refresh content block and modules elements
 */
function refreshDomObjects() {
    // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].bodyOffset = Positioning.getBodyPosition();
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].config.innerBlocks.enable) {
        // get all content-block lists which are empty, or which allow multiple child-items
        var lists = $(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector).filter(":not(." + __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.singleItem + "), :empty");
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].contentBlocks = lists
            .find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.selector)
            .add(lists);
    }
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].config.modules.enable)
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].modules = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].cachedPanes
            .find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.selector)
            .add(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].cachedPanes);
}
/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
var lastCall;
/**
 * position, align and show a menu linked to another item
 */
function positionAndAlign(element, coords) {
    return element.css({
        left: coords.x - __WEBPACK_IMPORTED_MODULE_0____["QuickE"].bodyOffset.x,
        top: coords.yh - __WEBPACK_IMPORTED_MODULE_0____["QuickE"].bodyOffset.y,
        width: coords.element.width(),
    }).show();
}
/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
function refresh(e) {
    var highlightClass = 'sc-cb-highlight-for-insert';
    var newDate = new Date();
    if ((!lastCall) || (newDate.getTime() - lastCall.getTime() > 1000)) {
        // console.log('refreshed contentblock and modules');
        lastCall = newDate;
        refreshDomObjects();
    }
    // find the closest content-blocks and modules
    var currentCoords = new __WEBPACK_IMPORTED_MODULE_0____["PositionCoordinates"](e.clientX, e.clientY);
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].config.innerBlocks.enable && __WEBPACK_IMPORTED_MODULE_0____["QuickE"].contentBlocks)
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb = findNearest(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].contentBlocks, currentCoords);
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].config.modules.enable && __WEBPACK_IMPORTED_MODULE_0____["QuickE"].modules)
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod = findNearest(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].modules, currentCoords);
    // hide the buttons for content-block or module, if they are not affected
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].modActions.toggleClass('sc-invisible', __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod === null);
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].cbActions.toggleClass('sc-invisible', __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb === null);
    var oldParent = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentNode;
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb !== null || __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod !== null) {
        var alignTo = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb || __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod;
        // find parent pane to highlight
        var parentPane = $(alignTo.element).closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
        var parentCbList = $(alignTo.element).closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector);
        var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];
        provideCorrectAddButtons(parentContainer);
        // put part of the pane-name into the button-labels
        if (parentPane.length > 0) {
            var paneName_1 = parentPane.attr('id') || '';
            if (paneName_1.length > 4)
                paneName_1 = paneName_1.substr(4);
            __WEBPACK_IMPORTED_MODULE_0____["QuickE"].modActions.filter('[titleTemplate]').each(function () {
                var t = $(this);
                t.attr('title', t.attr('titleTemplate').replace('{0}', paneName_1));
            });
        }
        positionAndAlign(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].main, alignTo);
        // Keep current block as current on menu
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeContentBlock = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb ? __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb.element : null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.activeModule = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod ? __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod.element : null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentNode = parentContainer;
        $(parentContainer).addClass(highlightClass);
    }
    else {
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentNode = null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.hide();
    }
    // if previously a parent-pane was highlighted, un-highlight it now
    if (oldParent && oldParent !== __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentNode)
        $(oldParent).removeClass(highlightClass);
}
function provideCorrectAddButtons(tag) {
    var listSettings = __WEBPACK_IMPORTED_MODULE_1__context_for_lists__["ContextForLists"].getFromDom(tag);
    var showContent = true;
    var showApps = true;
    if (listSettings.appList.length > 0) {
        showContent = listSettings.appList.indexOf('Content') > -1;
        // only show apps if the list is longer than 'Content' if it contains that
        showApps = listSettings.appList.length - (showContent ? 1 : 0) > 0;
    }
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].cbActions.toggleClass('hide-content', !showContent);
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].cbActions.toggleClass('hide-app', !showApps);
}
/**
 * Return the nearest element to the mouse cursor from elements (jQuery elements)
 * @param elements
 * @param position
 */
function findNearest(elements, position) {
    var maxDistance = 30; // Defines the maximal distance of the cursor when the menu is displayed
    var nearestItem = null;
    var nearestDistance = maxDistance;
    var posX = position.x + __WEBPACK_IMPORTED_MODULE_0____["QuickE"].win.scrollLeft();
    var posY = position.y + __WEBPACK_IMPORTED_MODULE_0____["QuickE"].win.scrollTop();
    // Find nearest element
    elements.each(function () {
        var e = Positioning.get($(this));
        // First check x coordinates - must be within container
        if (posX < e.x || posX > e.x + e.w)
            return;
        // Check if y coordinates are within boundaries
        var distance = Math.abs(posY - e.yh);
        if (distance < maxDistance && distance < nearestDistance) {
            nearestItem = e;
            nearestDistance = distance;
        }
    });
    return nearestItem;
}


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickEClipboard", function() { return QuickEClipboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_for_lists__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modifier_content_block__ = __webpack_require__(41);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * add a clipboard to the quick edit
 */
var QuickEClipboardSingleton = /** @class */ (function (_super) {
    __extends(QuickEClipboardSingleton, _super);
    function QuickEClipboardSingleton() {
        var _this = _super.call(this, 'Q-E.Clpbrd') || this;
        /**
         * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
         */
        _this.clipboard = new __WEBPACK_IMPORTED_MODULE_0____["Selection"]();
        _this.mods = {};
        __WEBPACK_IMPORTED_MODULE_1__logging__["Insights"].add('Q-E', 'clipboard', _this.log);
        _this.mods.cb = _this.modCb = new __WEBPACK_IMPORTED_MODULE_3__modifier_content_block__["ModifierContentBlock"]();
        _this.mods.mod = _this.modDnn = new __WEBPACK_IMPORTED_MODULE_0____["ModifierDnnModule"]();
        // initialize once the DOM is ready
        $(function () { return _this.initializeSecondaryButtons(); });
        return _this;
    }
    /**
     * bind clipboard actions to DOM buttons
     */
    QuickEClipboardSingleton.prototype.initializeSecondaryButtons = function () {
        var cl = this.log.call('initializeSecondaryButtons');
        var qem = this;
        $('a', __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected).click(function () {
            var action = $(this).data('action');
            switch (action) {
                case 'delete': return qem.mods[qem.clipboard.type].delete(qem.clipboard);
                case 'sendToPane': return qem.modDnn.showSendToPane();
                default: throw new Error("unexpected action: " + action);
            }
        });
        cl.done();
    };
    /**
     * perform copy and paste commands - needs the clipboard
     * @param cbAction
     * @param list
     * @param index
     * @param type
     */
    QuickEClipboardSingleton.prototype.do = function (cbAction, list, index, type) {
        var cl = this.log.call('do', cbAction + ", ..., " + index);
        var newClip = this.createSpecs(type, list, index);
        // action!
        switch (cbAction) {
            case 'select':
                this.mark(newClip);
                break;
            case 'paste':
                var from = this.clipboard.index;
                var to = newClip.index;
                // check that we only move block-to-block or module to module
                if (this.clipboard.type !== newClip.type)
                    return alert("can't move module-to-block; move only works from module-to-module or block-to-block");
                if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                    return this.clearUi(); // don't do a.nything
                // cb-numbering is a bit different, because the selector is at the bottom
                // only there we should also skip on +1;
                if (newClip.type === __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id && from + 1 === to)
                    return this.clearUi(); // don't do a.nything
                if (type === __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id) {
                    this.modCb.move(this.clipboard, newClip);
                    // const sxc = SxcEdit.get(list);
                    // sxc.manage._getCbManipulator().move(newClip.parent as number, newClip.field, from, to);
                }
                else
                    this.modDnn.move(this.clipboard, newClip, from, to); // sometimes missing oldClip.item
                this.clearUi();
                break;
            default:
        }
        return cl.return(null);
    };
    QuickEClipboardSingleton.prototype.mark = function (newData) {
        var cl = this.log.call('mark');
        cl.data('specs', newData);
        if (newData) {
            // if it was already selected with the same thing, then release it
            if (this.clipboard && this.clipboard.item === newData.item)
                return cl.return(this.clearUi());
            this.clipboard = newData;
        }
        this.removeSelectionMarker(); // clear previous markings
        // sometimes missing data.item
        if (!this.clipboard.item)
            return cl.done();
        var cb = $(this.clipboard.item);
        cb.addClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
        if (cb.prev().is('iframe'))
            cb.prev().addClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
        this.setSecondaryActionsState(true);
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.toggleOverlay(cb);
        cl.done();
    };
    /** Clear the UI so nothing is selected any more */
    QuickEClipboardSingleton.prototype.clearUi = function () {
        var cl = this.log.call('clearUi');
        this.removeSelectionMarker();
        this.clipboard = null;
        this.setSecondaryActionsState(false);
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.toggleOverlay(false);
        cl.done();
    };
    QuickEClipboardSingleton.prototype.removeSelectionMarker = function () {
        $("." + __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected).removeClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
    };
    QuickEClipboardSingleton.prototype.setSecondaryActionsState = function (state) {
        var cl = this.log.call('setSecondaryActionsState');
        var btns = $('a.sc-content-block-menu-btn');
        btns = btns.filter('.icon-sxc-paste');
        btns.toggleClass('sc-unavailable', !state);
        cl.done();
    };
    QuickEClipboardSingleton.prototype.createSpecs = function (type, list, index) {
        var cl = this.log.call('createSpecs', type + ", ..., " + index);
        var listItems = list.find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks[type].selector);
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        var currentItem = (index >= listItems.length)
            ? listItems[listItems.length - 1]
            : listItems[index];
        var editContext = __WEBPACK_IMPORTED_MODULE_2__context_for_lists__["ContextForLists"].getFromDom(list) || { parent: 'dnn', field: list.id };
        return cl.return({
            parent: editContext.parent,
            field: editContext.field,
            list: list,
            item: currentItem,
            index: index,
            type: type,
        });
    };
    return QuickEClipboardSingleton;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
var QuickEClipboard = new QuickEClipboardSingleton();


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QeSelectors", function() { return QeSelectors; });
/**
 * selectors used all over the in-page-editing, centralized to ensure consistency
 */
var contentBlockAndModuleSelectors = {
    cb: {
        id: 'cb',
        class: 'sc-content-block',
        selector: '.sc-content-block',
        listSelector: '.sc-content-block-list',
        context: 'data-list-context',
        singleItem: 'single-item',
    },
    mod: {
        id: 'mod',
        class: 'DnnModule',
        selector: '.DnnModule',
        // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
        listSelector: '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)',
        context: null,
    },
};
var QeSelectors = {
    blocks: contentBlockAndModuleSelectors,
    eitherCbOrMod: '.DnnModule, .sc-content-block',
    selected: 'sc-cb-is-selected',
};


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppImport", function() { return CmdAppImport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdAppImport = 'app-import';
/**
 * open the import dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAppImport, 'Dashboard', '', true, false, {});


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppResources", function() { return CmdAppResources; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(23);


var CmdAppResources = 'app-resources';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAppResources, 'AppResources', 'translate', true, false, {
    dialog: function (_) { return __WEBPACK_IMPORTED_MODULE_1__edit__["CmdEditDialog"]; },
    disabled: function (context) { return context.app.resourcesId === null; },
    title: function (context) { return "Toolbar.AppResources" + (context.app.resourcesId === null ? 'Disabled' : ''); },
    // only if resources exist or are 0 (to be created)...
    showCondition: function (context) { return !!context.user.canDesign && !context.app.isContent; },
    configureLinkGenerator: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.app.resourcesId }];
    },
    // if it doesn't have a query, make the button faded
    dynamicClasses: function (context) { return context.app.resourcesId !== null ? '' : 'empty'; },
});


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppSettings", function() { return CmdAppSettings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(23);


var CmdAppSettings = 'app-settings';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAppSettings, 'AppSettings', 'sliders', true, false, {
    dialog: function () { return __WEBPACK_IMPORTED_MODULE_1__edit__["CmdEditDialog"]; },
    disabled: function (context) { return context.app.settingsId === null; },
    title: function (context) {
        return "Toolbar.AppSettings" + (context.app.settingsId === null ? 'Disabled' : '');
    },
    // only if settings exist, or are 0 (to be created)
    showCondition: function (context) { return context.user.canDesign && !context.app.isContent; },
    configureLinkGenerator: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.app.settingsId }];
    },
    // if it doesn't have a settings, make it less strong
    dynamicClasses: function (context) { return context.app.settingsId !== null ? '' : 'empty'; },
});


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdContentItems", function() { return CmdContentItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdContentItems = 'contentitems';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdContentItems, 'ContentItems', 'table', true, false, {
    addParamsToLink: function (context) {
        var typeName = context.button.command.params.contentType
            || context.contentBlock.contentTypeId;
        return {
            // old name for the previous UI
            contentTypeName: typeName,
            // new name for the new UI
            contentType: typeName,
        };
    },
    // only show to admin-users and in cases where we know the content-type
    showCondition: function (context) {
        return !!context.user.canDesign &&
            (!!context.button.command.params.contentType ||
                !!context.contentBlock.contentTypeId);
    },
    configureLinkGenerator: function (context, linkGenerator) {
        // optionally override with custom type
        // 2020-03-26 2dm seems superflues, because it's already merged in the params
        // if (linkGenerator.context.button.action.params.contentType)
        //     linkGenerator.urlParams.contentTypeName =
        //         linkGenerator.context.button.action.params.contentType;
        if (context.button.command.params.filters) {
            var enc = JSON.stringify(context.button.command.params.filters);
            // special case - if it contains a "+" character, this won't survive
            // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
            // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
            if (enc.indexOf('+') > -1)
                enc = btoa(enc);
            linkGenerator.urlParams.filters = enc;
        }
    },
});


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentListActionParams", function() { return ContentListActionParams; });
/**
 * params for getAndReload WebAPI
 */
var ContentListActionParams = /** @class */ (function () {
    function ContentListActionParams() {
    }
    return ContentListActionParams;
}());



/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdContentType", function() { return CmdContentType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdContentType = 'contenttype';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdContentType, 'ContentType', 'fields', true, false, {
    addParamsToLink: function (context) { return ({
        // added in 10.27 to help with the new edit ui
        contentType: context.button.command.params.contentType
            || context.contentBlock.contentTypeId,
    }); },
    // only show to admin-users and in cases where we know the content-type
    showCondition: function (context) {
        return !!context.user.canDesign &&
            (!!context.button.command.params.contentType ||
                !!context.contentBlock.contentTypeId);
    },
});


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdCustom", function() { return CmdCustom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(10);

var CmdCustom = 'custom';
var ctxName = 'context';
var evtName = 'event';
var errNoCode = "Trying to run Custom-Code action, but no 'customCode' (v9) or 'call' (v10) found to run - see console for debug info.";
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0__commands__["Commands"].add(CmdCustom, 'Custom', 'bomb', true, false, {
    code: function (context, event) {
        return new Promise(function (resolve, reject) {
            var actPar = context.button.command.params;
            // the old V9 name
            var code = actPar.customCode;
            // also try the V10 edition
            if (!code) {
                code = actPar.call;
                if (typeof code === 'string' && code.indexOf(' ') === -1 && code.indexOf('(') === -1)
                    code += "(" + ctxName + ", " + evtName + ")";
            }
            if (!code) {
                console.warn(errNoCode, actPar);
                alert(errNoCode);
                resolve();
            }
            try {
                var fn = new Function(ctxName, evtName, code);
                resolve(fn(context, event));
            }
            catch (err) {
                console.error('error in custom button-code: ', actPar);
                reject(err);
            }
        });
    },
});


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdDelete", function() { return CmdDelete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_manipulation_item_commands__ = __webpack_require__(133);


var CmdDelete = 'delete';
/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdDelete, 'Delete', 'cancel', true, false, {
    // disabled: true,
    showCondition: function (context) {
        var p = context.button.command.params;
        // can never be used for a modulelist item, as it is always in use somewhere
        if (p.useModuleList)
            return false;
        // check if all data exists required for deleting
        // before 10.27, it was entityId, entityGuid and entityTitle
        // since 10.27, there will always be a guid (if it has an ID)
        // and enabling it requires an action-modifier "+delete",
        // so the automatic detection only applies
        // to the pre-10.27 custom toolbars case
        return (!!p.entityId && !!p.entityGuid && !!p.entityTitle);
    },
    code: function (context) {
        var p = context.button.command.params;
        var title = p.title || p.entityTitle; // prefer new title, and fallback to old for pre 10.27 configs
        return __WEBPACK_IMPORTED_MODULE_1__entity_manipulation_item_commands__["contentItems"].delete(context, p.entityId, p.entityGuid, title);
    },
});


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contentItems", function() { return contentItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__ = __webpack_require__(12);

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */
// #region contentItem Commands
var contentItems = {
    // delete command - try to really delete a content-item
    delete: function (context, itemId, itemGuid, itemTitle) {
        // first show main warning / get ok
        var ok = confirm(Object(__WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__["translate"])('Delete.Confirm')
            .replace('{id}', String(itemId))
            .replace('{title}', itemTitle));
        if (!ok) {
            return Promise.resolve();
        }
        /**
         * ZoneId and AppId are sent becase of rare, special case that is not default
         * (default is that 2sxc is finding ZoneId and AppId on server side from ModuleId)
         * when we need to delete entity from other app or zone, than current one.
         * TODO: send this params, only when is necesary (value change detection for ZoneId, AppId)
         */
        var params = {
            zoneId: context.app.zoneId,
            appId: context.app.id,
        };
        return new Promise(function (resolve, reject) {
            context.sxc.webApi.delete("app-content/any/" + itemGuid, params, null, true)
                .done(function (data, textStatus, jqXHR) {
                if (jqXHR.status === 204 || jqXHR.status === 200) {
                    // resolve the promise with the response text
                    resolve(data);
                }
                else {
                    // check if it's a permission config problem
                    var msgJs = Object(__WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__["translate"])('Delete.ErrCheckConsole');
                    if (jqXHR.status === 401)
                        alert(Object(__WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__["translate"])('Delete.ErrPermission') + msgJs);
                    if (jqXHR.status === 400)
                        alert(Object(__WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__["translate"])('Delete.ErrInUse') + msgJs);
                    // otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(textStatus));
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                reject(Error(errorThrown));
            });
        }).then(function (result) {
            location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    },
};


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdInstanceList", function() { return CmdInstanceList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdInstanceList = 'instance-list';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdInstanceList, 'Sort', 'list-numbered', false, true, {
    showCondition: function (context) {
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1);
    },
});


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdItemHistory", function() { return CmdItemHistory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdItemHistory = 'item-history';
/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdItemHistory, 'ItemHistory', 'clock', true, false, {
    inlineWindow: function (_) { return true; },
    fullScreen: function (_) { return true; },
});


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMetadata", function() { return CmdMetadata; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new__ = __webpack_require__(56);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var CmdMetadata = 'metadata';
var MetadataDefaultKeyType = 'string';
var MetadataDefaultTargetType = 10; // cms-item
/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdMetadata, 'Metadata', 'tag', false, false, {
    addParamsToLink: function (_) { return ({ mode: __WEBPACK_IMPORTED_MODULE_2__new__["CmdNewMode"] }); },
    dialog: function (_) { return __WEBPACK_IMPORTED_MODULE_1__edit__["CmdEditDialog"]; },
    // if it doesn't have data yet, make it less strong
    dynamicClasses: function (ctx) { return ctx.button.command.params.entityId ? '' : 'empty'; },
    // only add a metadata-button if it has metadata-infos
    showCondition: function (ctx) { return !!ctx.button.command.params.metadata; },
    configureLinkGenerator: function (_, linkGenerator) {
        var itm = {
            Title: 'EditFormTitle.Metadata',
            Metadata: __assign({ keyType: MetadataDefaultKeyType, targetType: MetadataDefaultTargetType }, linkGenerator.context.button.command.params.metadata),
        };
        linkGenerator.items[0] = __assign(__assign({}, linkGenerator.items[0]), itm);
    },
});


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMore", function() { return CmdMore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands__ = __webpack_require__(10);


var CmdMore = 'more';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_1__commands__["Commands"].add(CmdMore, 'MoreActions', 'options btn-mode', true, false, {
    code: function (context, event) {
        return new Promise(function (resolve, reject) {
            var btn2 = event.target;
            var fullMenu2 = btn2.closest('ul.sc-menu');
            var oldState2 = Number(fullMenu2.getAttribute('data-state') || 0);
            var max2 = Number(fullMenu2.getAttribute('group-count'));
            var newState2 = (oldState2 + 1) % max2;
            fullMenu2.classList.remove("group-" + oldState2);
            fullMenu2.classList.add("group-" + newState2);
            fullMenu2.setAttribute('data-state', String(newState2));
            event.preventDefault();
            function mouseenterHandler(e) {
                fullMenu2.style.opacity = '1';
            }
            function mouseleaveHandler(e) {
                if (e.screenX !== 0 && e.screenY !== 0) {
                    // hide toolbar on mouseleave
                    fullMenu2.style.opacity = '0';
                }
                else {
                    // this is fix for Chrome issue
                    // ensure to show toolbar because X=0 and Y=0
                    fullMenu2.style.opacity = '1';
                    console.warn('workaround for toolbar hide onmouseleave issue', e.screenX, e.screenY, e.target);
                }
            }
            // because of issue in Chrome we need to override CSS rules in edit.css for toolbar toggle on mouse hover
            var scElement = fullMenu2.closest('.' + __WEBPACK_IMPORTED_MODULE_0__constants__["C"].Toolbar.classes.oldHover);
            // add mouseenter and mouseleave events to parent sc-element if not already added
            if (scElement && fullMenu2.getAttribute('listener') !== 'true') {
                scElement.addEventListener('mouseenter', mouseenterHandler);
                scElement.addEventListener('mouseleave', mouseleaveHandler);
                fullMenu2.setAttribute('listener', 'true'); // flag that events are added
            }
            resolve();
        });
    },
});


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMoveDown", function() { return CmdMoveDown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(11);


var CmdMoveDown = 'movedown';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdMoveDown, 'MoveDown', 'move-down', false, true, {
    showCondition: function (context) {
        // TODO: do not display if is last item in list
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1);
    },
    code: function (context) {
        // TODO: make sure index is never greater than the amount of items
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].changeOrder(context, context.button.command.params.sortOrder, context.button.command.params.sortOrder + 1);
    },
});


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMoveUp", function() { return CmdMoveUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(11);


var CmdMoveUp = 'moveup';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0__commands__["Commands"].add(CmdMoveUp, 'MoveUp', 'move-up', false, true, {
    showCondition: function (context) {
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1 &&
            context.button.command.params.sortOrder !== 0);
    },
    code: function (context) {
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].changeOrder(context, context.button.command.params.sortOrder, Math.max(context.button.command.params.sortOrder - 1, 0));
    },
});


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdPublish", function() { return CmdPublish; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_list_actions__ = __webpack_require__(11);



var CmdPublish = 'publish';
/**
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdPublish, 'Unpublished', 'eye-off', false, false, {
    showCondition: function (context) {
        return context.button.command.params.isPublished === false;
    },
    disabled: function (context) {
        return !context.instance.allowPublish;
    },
    code: function (context, event) {
        return new Promise(function (resolve, reject) {
            if (context.button.command.params.isPublished) {
                alert(Object(__WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__["translate"])('Toolbar.AlreadyPublished'));
                return resolve();
            }
            // if we have an entity-id, publish based on that
            if (context.button.command.params.entityId) {
                return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].publishId(context, context.button.command.params.entityId);
            }
            var part = context.button.command.params.sortOrder === -1
                ? 'listcontent'
                : 'content';
            var index = context.button.command.params.sortOrder === -1
                ? 0
                : context.button.command.params.sortOrder;
            return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].publish(context, part, index);
        });
    },
});


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdRemove", function() { return CmdRemove; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_list_actions__ = __webpack_require__(11);



var CmdRemove = 'remove';
/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdRemove, 'Remove', 'minus-circled', false, true, {
    showCondition: function (context) {
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1);
    },
    code: function (context) {
        return new Promise(function (resolve, reject) {
            if (confirm(Object(__WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__["translate"])('Toolbar.ConfirmRemove'))) {
                return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].removeFromList(context, context.button.command.params.sortOrder);
            }
            return resolve();
        });
    },
});


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdReplace", function() { return CmdReplace; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdReplace = 'replace';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdReplace, 'Replace', 'replace', false, true, {
    showCondition: function (context) {
        return !!context.button.command.params.useModuleList;
    },
});


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateDevelop", function() { return CmdTemplateDevelop; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdTemplateDevelop = 'template-develop';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateDevelop, 'Develop', 'code', true, false, {
    newWindow: function (_) { return true; },
    dialog: function (_) { return 'develop'; },
    showCondition: function (context) { return !!context.user.canDesign; },
    configureLinkGenerator: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});


/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateQuery", function() { return CmdTemplateQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdTemplateQuery = 'template-query';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateQuery, 'QueryEdit', 'filter', true, false, {
    dialog: function (_) { return 'pipeline-designer'; },
    addParamsToLink: function (ctx) { return ({ pipelineId: ctx.contentBlock.queryId }); },
    newWindow: function (_) { return true; },
    disabled: function (ctx) { return ctx.app.settingsId === null || !ctx.contentBlock.queryId; },
    title: function (ctx) { return "Toolbar.QueryEdit" + (ctx.contentBlock.queryId === null ? 'Disabled' : ''); },
    showCondition: function (ctx) { return !!ctx.user.canDesign && !ctx.app.isContent; },
    // if it doesn't have a query, make it less strong
    dynamicClasses: function (ctx) { return ctx.contentBlock.queryId ? '' : 'empty'; },
});


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateSettings", function() { return CmdTemplateSettings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdTemplateSettings = 'template-settings';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateSettings, 'TemplateSettings', 'sliders', true, false, {
    dialog: function (_) { return 'edit'; },
    showCondition: function (ctx) { return !!ctx.user.canDesign && !ctx.app.isContent; },
    configureLinkGenerator: function (ctx, linkGen) {
        linkGen.items = [{ EntityId: ctx.contentBlock.templateId }];
    },
});


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdZone", function() { return CmdZone; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdZone = 'zone';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdZone, 'Zone', 'manage', true, false, {
    showCondition: function (context) {
        return !!context.user.canDesign;
    },
});


/***/ }),
/* 147 */
/***/ (function(module, exports) {

// 2020-03-18 - this was an old class that was often used where we now have
// CommandParams in use
// We'll leave it here for a while in case we realize we missed something
// export class Settings {
// //   code: a.ny;
// //   configureCommand: a.ny;
// //   items: a.ny; // string | string[];
// //   metadata: MetadataFor;
// //   prefill: {[key: string]: a.ny};
//   //
//   action: string;
// //   appId: number;
// //   attributeSetName: string;
// //   cbId: number;
// //   cbIsEntity: boolean;
// //   contentGroupId: number;
//   contentType: string;
// //   contentTypeId: string;
//   customCode: string;
//   dialog: string;
//   entityGuid: string;
//   entityId: number;
// //   entityTitle: string;
// //   filters: string;
// //   fullScreen: boolean;
//   hasContent: boolean;
//   inlineWindow: boolean;
//   isContent: boolean;
//   isList: boolean;
//   isPublished: boolean;
//   newWindow: boolean;
//   partOfPage: boolean;
//   sortOrder: number;
//   supportsAjax: boolean;
// //   templateChooserVisible: boolean;
// //   templateId: number;
//   useModuleList: boolean;
//   user: UserOfEditContext;
//   //
//   name: string;
// }


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsEngine", function() { return CmsEngine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contentBlock_content_block_editor__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contentBlock_render__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_sxc_controller_in_page__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quick_dialog_quick_dialog__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_config_loaders_config_formats_in_page_button__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__command_link_generator__ = __webpack_require__(150);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};











/**
 * The CMS engine is global, and needs the context to work.
 */
var CmsEngine = /** @class */ (function (_super) {
    __extends(CmsEngine, _super);
    function CmsEngine(parentLog) {
        return _super.call(this, 'Cmd.Exec', parentLog, 'start') || this;
    }
    CmsEngine.prototype.detectParamsAndRun = function (context, nameOrParams, eventOrParams, event) {
        var cl = this.log.call('detectParamsAndRun', arguments.length + " params");
        var cmdParams;
        var thirdParamIsEvent = !event && eventOrParams && typeof eventOrParams.altKey !== 'undefined';
        cl.add("might cycle parameters. third is event=" + thirdParamIsEvent);
        if (thirdParamIsEvent) {
            // no event param, but settings contains the event-object
            cl.add('cycling params; event missing & eventOrSettings seems to be an event; settings assumed empty');
            event = eventOrParams; // move it to the correct variable
            cmdParams = this.nameOrSettingsAdapter(nameOrParams);
        }
        else {
            cmdParams = __assign(__assign({}, (eventOrParams || {})), this.nameOrSettingsAdapter(nameOrParams));
        }
        // ensure we have the right event despite browser differences
        event = event || window.event;
        var result = this.run(context, cmdParams, event);
        return cl.return(result);
    };
    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    CmsEngine.prototype.run = function (context, nameOrParams, event) {
        var cl = this.log.call('run<T>');
        var cmdParams = this.nameOrSettingsAdapter(nameOrParams);
        cmdParams = this.expandParamsWithDefaults(cmdParams);
        var origEvent = event;
        var name = cmdParams.action;
        var contentType = cmdParams.contentType;
        cl.add("run command '" + name + "' for type " + contentType);
        // Toolbar API v2
        var command = new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["ButtonCommand"](name, contentType, cmdParams);
        var newButtonConfig = new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["Button"](command, command.name);
        // merge conf & settings, but settings has higher priority
        var button = __assign(__assign({}, newButtonConfig), __WEBPACK_IMPORTED_MODULE_8__toolbar_config_loaders_config_formats_in_page_button__["InPageButtonJson"].toButton(cmdParams));
        // attach to context for inner calls which might access it
        context.button = button;
        cl.data('button', context.button);
        // In case we don't have special code, use generic code
        var code = button.code;
        if (!code) {
            cl.add('button, no code - generating code to open standard dialog');
            code = function (contextParam, evt) { return CmsEngine.openDialog(contextParam, evt); };
        }
        if (new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["ButtonSafe"](button, context).uiActionOnly()) {
            cl.add('UI command, no pre-flight to ensure content-block');
            return cl.return(code(context, origEvent));
        }
        // if more than just a UI-action, then it needs to be sure the content-group is created first
        cl.add('command might change data, wrap in pre-flight to ensure content-block');
        var promise = __WEBPACK_IMPORTED_MODULE_2__contentBlock_content_block_editor__["ContentBlockEditor"]
            .prepareToAddContent(context, cmdParams.useModuleList)
            .then(function () { return code(context, origEvent); });
        return cl.return(promise);
    };
    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    CmsEngine.prototype.nameOrSettingsAdapter = function (nameOrSettings) {
        var cl = this.log.call('nameOrSettingsAdapter', "" + nameOrSettings);
        // check if nameOrString is name (string) or object (settings)
        var nameIsString = typeof nameOrSettings === 'string';
        cl.add("adapting settings; name string: " + nameIsString + "; name = " + nameOrSettings);
        var result = (nameIsString
            ? { action: nameOrSettings }
            : nameOrSettings);
        return cl.return(result);
    };
    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param params
     */
    CmsEngine.prototype.expandParamsWithDefaults = function (params) {
        var cl = this.log.call('expandParamsWithDefaults');
        var name = params.action;
        cl.add("will add defaults for " + name + " from buttonConfig");
        var defaults = __WEBPACK_IMPORTED_MODULE_0____["Commands"].get(name).buttonDefaults;
        cl.data('defaults to merge', defaults);
        // TODO: 2dm - suspicious cast
        // merge conf & settings, but...?
        return cl.return(__assign(__assign({}, defaults), params));
    };
    /**
     * open a new dialog of the angular-ui
     */
    CmsEngine.openDialog = function (context, event) {
        var log = new __WEBPACK_IMPORTED_MODULE_5__logging__["Log"]('Cms.OpnDlg');
        __WEBPACK_IMPORTED_MODULE_5__logging__["Insights"].add('cms', 'open-dialog', log);
        // the link contains everything to open a full dialog (lots of params added)
        var link = new __WEBPACK_IMPORTED_MODULE_9__command_link_generator__["CommandLinkGenerator"](context, log).getLink();
        var btn = new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["ButtonSafe"](context.button, context);
        var origEvent = event || window.event;
        return new Promise(function (resolvePromise) {
            // prepare promise for callback when the dialog closes
            // to reload the in-page view w/ajax or page reload
            var completePromise = function () {
                resolvePromise(context);
                __WEBPACK_IMPORTED_MODULE_3__contentBlock_render__["renderer"].reloadAndReInitialize(context);
            };
            // check if inline window (quick-dialog)
            if (btn.inlineWindow()) {
                // test if it should be full screen (value or resolve-function)
                __WEBPACK_IMPORTED_MODULE_6__quick_dialog_quick_dialog__["QuickDialog"]
                    .showOrToggleFromToolbar(context, link, btn.fullScreen(), btn.dialog())
                    .then(function (isChanged) { if (isChanged)
                    completePromise(); });
            }
            else {
                // else it's a normal pop-up dialog
                link = CmsEngine.convertUrlIfAltPressed(origEvent, link);
                var isNewWindow = btn.newWindow();
                // check if new-window
                if (isNewWindow || (origEvent && origEvent.shiftKey)) {
                    // resolve promise, as the window won't report when closed
                    resolvePromise(context);
                    window.open(link);
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_4__interfaces_sxc_controller_in_page__["$2sxcInPage"].totalPopup.open(link, completePromise);
                }
            }
        });
    };
    /** Switch to old NG9 dialog if the user pressed ALT */
    CmsEngine.convertUrlIfAltPressed = function (origEvent, link) {
        if (origEvent && origEvent.altKey) {
            var toOld = link.indexOf(__WEBPACK_IMPORTED_MODULE_1__constants__["C"].DialogPaths.ng8) > 0;
            link = link.replace(toOld ? __WEBPACK_IMPORTED_MODULE_1__constants__["C"].DialogPaths.ng8 : __WEBPACK_IMPORTED_MODULE_1__constants__["C"].DialogPaths.ng1, toOld ? __WEBPACK_IMPORTED_MODULE_1__constants__["C"].DialogPaths.ng1 : __WEBPACK_IMPORTED_MODULE_1__constants__["C"].DialogPaths.ng8);
        }
        return link;
    };
    return CmsEngine;
}(__WEBPACK_IMPORTED_MODULE_5__logging__["HasLog"]));



/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStateHandler", function() { return SessionStateHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This object helps persist / load / reset
 * a setting in the session-state
 */
var SessionStateHandler = /** @class */ (function (_super) {
    __extends(SessionStateHandler, _super);
    function SessionStateHandler(key) {
        var _this = _super.call(this, 'Ses.State') || this;
        _this.key = key;
        __WEBPACK_IMPORTED_MODULE_0__logging__["Insights"].add('system', 'session-state ' + key, _this.log);
        return _this;
    }
    SessionStateHandler.prototype.set = function (value) {
        this.log.add("state '" + this.key + "' set(" + value + ")");
        sessionStorage.setItem(this.key, value);
    };
    SessionStateHandler.prototype.remove = function () {
        this.log.add("state '" + this.key + "' remove()");
        sessionStorage.removeItem(this.key);
    };
    SessionStateHandler.prototype.get = function () {
        var result = getItemValue(this.key);
        this.log.add("state '" + this.key + "' get() = '" + result + "'");
        return result;
    };
    return SessionStateHandler;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));

function getItemValue(key) {
    var value = sessionStorage.getItem(key);
    return JSON.parse(value);
}


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandLinkGenerator", function() { return CommandLinkGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_ng_dialog_params__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__translate_2sxc_translate__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





/**
 * This is responsible for taking a context with command and everything
 * then building the link for opening the correct dialogs
 */
var CommandLinkGenerator = /** @class */ (function (_super) {
    __extends(CommandLinkGenerator, _super);
    function CommandLinkGenerator(context, parentLog) {
        var _this = _super.call(this, 'Cmd.LnkGen', parentLog) || this;
        _this.context = context;
        var cl = _this.log.call('constructor');
        var button = new __WEBPACK_IMPORTED_MODULE_3__toolbar_config__["ButtonSafe"](context.button, context);
        var command = button.action();
        // Initialize Items - use predefined or create empty array
        _this.items = command.params.items || [];
        cl.data('items', _this.items);
        // initialize params
        _this.urlParams = button.addParamsToLink();
        var dialog = button.dialog();
        // note: this corrects how the variable to name the dialog changed in the history of 2sxc from action to dialog
        _this.urlParams = __assign({ dialog: dialog || command.name }, _this.urlParams);
        cl.data('urlParmas', _this.urlParams);
        // initialize root url to dialog
        _this.rootUrl = _this.getDialogUrl(dialog);
        // get isDebug url Parameter
        _this.debugUrlParam = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';
        _this.buildItemsList(button);
        // if the command has own configuration stuff, do that now
        if (context.button.configureLinkGenerator)
            context.button.configureLinkGenerator(context, _this);
        cl.done();
        return _this;
    }
    /**
     * Generate items for editing/changing or simple item depending on the scenario.
     */
    CommandLinkGenerator.prototype.buildItemsList = function (button) {
        if (button.action().params.useModuleList)
            this.addContentGroupItems(true);
        else if (button.action().params.parent)
            this.addItemInList();
        else
            this.addItem();
    };
    /**
     * build the link, combining specific params with global ones and put all in the url
     */
    CommandLinkGenerator.prototype.getLink = function () {
        var context = this.context;
        var button = new __WEBPACK_IMPORTED_MODULE_3__toolbar_config__["ButtonSafe"](context.button, context);
        var params = button.action().params;
        var urlItems = this.urlParams;
        // steps for all actions: prefill, serialize, open-dialog
        // when doing new, there may be a prefill in the link to initialize the new item
        if (params.prefill)
            for (var i = 0; i < this.items.length; i++)
                this.items[i].Prefill = params.prefill;
        delete urlItems.prefill; // added 2020-03-11, seemed strange that it's not removed
        urlItems.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list
        // clone the params and adjust parts based on partOfPage settings...
        var partOfPage = button.partOfPage();
        var ngDialogParams = new __WEBPACK_IMPORTED_MODULE_2__manage_ng_dialog_params__["NgUrlValuesWithoutParams"](context, partOfPage);
        return this.rootUrl + "#" + $.param(ngDialogParams) + "&" + $.param(urlItems) + this.debugUrlParam;
    };
    /**
     * Determine the url to open a dialog, based on the settings which UI version to use
     */
    CommandLinkGenerator.prototype.getDialogUrl = function (dialogName) {
        var context = this.context;
        var path = (context.ui.form === 'ng8' && dialogName === 'edit')
            ? __WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.ng8
            : __WEBPACK_IMPORTED_MODULE_0__constants__["C"].DialogPaths.ng1 + "?sxcver=" + context.instance.sxcVersion;
        return context.instance.sxcRootUrl + "desktopmodules/tosic_sexycontent/" + path;
    };
    CommandLinkGenerator.prototype.addItem = function () {
        var item = {};
        var params = this.context.button.command.params;
        // two ways to name the content-type-name this, v 7.2+ and older
        var ct = params.contentType || params.attributeSetName;
        if (params.entityId)
            item.EntityId = params.entityId;
        if (ct)
            item.ContentTypeName = ct;
        // only add if there was stuff to add
        if (item.EntityId || item.ContentTypeName) {
            console.warn('used the simple item header - test if dialog still works!');
            // this.items.push(item);
            this.items.push(__assign(__assign({}, item), { Title: Object(__WEBPACK_IMPORTED_MODULE_4__translate_2sxc_translate__["translate"])(this.findTranslationKey(this.findPartName(true))) }));
        }
    };
    /**
     * this will tell the command to edit a item from the sorted list in the group,
     * optionally together with the presentation item
     */
    CommandLinkGenerator.prototype.addContentGroupItems = function (withPresentation) {
        var _this = this;
        var cl = this.log.call('addContentGroupItems', "" + withPresentation);
        var params = this.context.button.command.params;
        var isContentAndNotHeader = (params.sortOrder !== -1);
        var index = isContentAndNotHeader ? params.sortOrder : 0;
        var isAdd = this.context.button.command.name === 'new';
        var groupId = this.context.contentBlock.contentGroupId;
        var fields = [this.findPartName(true)];
        if (withPresentation)
            fields.push(this.findPartName(false));
        fields.map(function (f) { return _this.addContentGroupItem(groupId, index, f, isAdd); });
        // previous code before 10.27
        // this.addContentGroupItem(groupId, index, this.findPartName(true), isAdd);
        // if (withPresentation)
        //   this.addContentGroupItem(groupId, index, this.findPartName(false), isAdd);
        cl.done();
    };
    /**
     * this adds an item of the content-group, based on the group GUID and the sequence number
     */
    CommandLinkGenerator.prototype.addContentGroupItem = function (guid, index, part, isAdd) {
        var cl = this.log.call('addContentGroupItem', guid + ", " + index + ", " + part + ", " + isAdd);
        this.items.push({
            Group: {
                Guid: guid,
                Index: index,
                Part: part.toLocaleLowerCase(),
                Add: isAdd,
            },
            Title: Object(__WEBPACK_IMPORTED_MODULE_4__translate_2sxc_translate__["translate"])(this.findTranslationKey(part)),
        });
        cl.done();
    };
    /**
     * EXPERIMENTAL in 10.27, if a parent is specified, use that
     * this will tell the command to edit a item which also belongs to a list
     * this is relevant when adding new items
     */
    CommandLinkGenerator.prototype.addItemInList = function () {
        var _this = this;
        var params = this.context.button.command.params;
        var index = params.sortOrder;
        var isAdd = this.context.button.command.name === 'new';
        var groupId = params.parent;
        // New in 10.27 - if params has a field, use that
        if (params.fields)
            params.fields.split(',').map(function (f) { return _this.items.push({
                EntityId: params.entityId,
                Field: f,
                Parent: groupId,
                Add: isAdd,
                Index: index,
            }); });
    };
    /**
     * find the part name for both the API to give the right item (when using groups) and for i18n
     */
    CommandLinkGenerator.prototype.findPartName = function (content) {
        var isContentAndNotHeader = (this.context.button.command.params.sortOrder !== -1);
        return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
    };
    /**
     * find the correct i18n key for this part
     */
    CommandLinkGenerator.prototype.findTranslationKey = function (partName) {
        return "EditFormTitle." + partName;
    };
    return CommandLinkGenerator;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));



/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgUrlValuesWithoutParams", function() { return NgUrlValuesWithoutParams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_parts_context_user__ = __webpack_require__(31);

/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @export
 * @class NgUrlValuesWithoutParams
 */
var NgUrlValuesWithoutParams = /** @class */ (function () {
    function NgUrlValuesWithoutParams(context, partOfPage) {
        var _a, _b, _c;
        this.zoneId = context.app.zoneId;
        this.appId = context.app.id;
        this.tid = context.page.id;
        this.mid = context.instance.id;
        this.cbid = context.contentBlock.id;
        this.lang = context.app.currentLanguage;
        this.langpri = context.app.primaryLanguage;
        this.langs = JSON.stringify(context.app.allLanguages);
        this.portalroot = context.tenant.url;
        this.websiteroot = context.instance.sxcRootUrl;
        this.partOfPage = partOfPage; // context.contentBlock.partOfPage;
        if (partOfPage) {
            // 2020-03-11 2dm - this never seems to be set a.nywhere
            // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
            this.publishing = context.contentBlock.versioningRequirements;
        }
        // todo= probably move the user into the dashboard info
        this.user = __WEBPACK_IMPORTED_MODULE_0__context_parts_context_user__["ContextOfUser"].fromContext(context);
        this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
        if ((_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.button) === null || _a === void 0 ? void 0 : _a.command) === null || _b === void 0 ? void 0 : _b.params) === null || _c === void 0 ? void 0 : _c.apps)
            this.apps = context.button.command.params.apps;
        this.fa = !context.app.isContent;
        this.rvt = $.ServicesFramework(0).getAntiForgeryValue();
    }
    return NgUrlValuesWithoutParams;
}());



/***/ }),
/* 152 */
/***/ (function(module, exports) {



/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceEngine", function() { return SxcInstanceEngine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cms_Cms__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(8);


/**
 * This is an engine on the sxc object.
 * It provides a .run(...) for when the sxc is already known.
 */
var SxcInstanceEngine = /** @class */ (function () {
    function SxcInstanceEngine(sxc) {
        this.sxc = sxc;
    }
    SxcInstanceEngine.prototype.run = function (nameOrSettings, eventOrSettings, event) {
        var cntx = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextComplete"].findContext(this.sxc);
        return new __WEBPACK_IMPORTED_MODULE_0__cms_Cms__["Cms"]().run(cntx, nameOrSettings, eventOrSettings, event);
    };
    return SxcInstanceEngine;
}());



/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Manage", function() { return Manage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_manager__ = __webpack_require__(155);





/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
var Manage = /** @class */ (function () {
    function Manage() {
    }
    /**
     * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
     * all in-page toolbars etc.
     * if loaded, it's found under the $2sxc(module).manage
     * it has commands to
     * - getButton
     * - getToolbar
     * - run(...)
     * - isEditMode
     * @param sxc
     *
     * we must keep signature of initInstance for compatibility because it is used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
     */
    Manage.prototype.initInstance = function (sxc) {
        try {
            var myContext = __WEBPACK_IMPORTED_MODULE_1__context__["ContextComplete"].findContext(sxc);
            var editContext = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getEditContext(myContext.sxc);
            var userInfo = __WEBPACK_IMPORTED_MODULE_1__context__["ContextOfUser"].fromContext(myContext); // 2dm simplified getUserOfEditContext(context);
            var cmdEngine = new __WEBPACK_IMPORTED_MODULE_0__commands__["SxcInstanceEngine"](myContext.sxc);
            var editManager = new __WEBPACK_IMPORTED_MODULE_3__edit_manager__["EditManager"](myContext.sxc, editContext, userInfo, cmdEngine, myContext);
            sxc.manage = editManager;
            editManager.init();
            return editManager;
        }
        catch (e) {
            console.error('error in 2sxc - will log but not throw', e);
        }
    };
    return Manage;
}());



/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditManager", function() { return EditManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_render_toolbar_renderer__ = __webpack_require__(26);
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



/**
 * Instance specific edit manager
 */
var EditManager = /** @class */ (function () {
    function EditManager(sxc, editContext, userInfo, cmdEngine, context) {
        var _this = this;
        this.sxc = sxc;
        this.editContext = editContext;
        this.userInfo = userInfo;
        this.cmdEngine = cmdEngine;
        this.context = context;
        //#region Official, public properties and commands, which are stable for use from the outside
        /**
         * run a command - command used in toolbars and custom buttons
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.run = this.cmdEngine.run;
        //#endregion official, public properties - everything below this can change
        this._context = this.context;
        /**
         * internal method to find out if it's in edit-mode
         */
        this._isEditMode = function () { return _this.editContext.Environment.IsEditable; };
        /**
         * used for various dialogues
         */
        this._reloadWithAjax = this.context.app.supportsAjax;
        /** metadata necessary to know what/how to edit */
        this._editContext = this.editContext;
        /** used to handle the commands for this content-block */
        this._commands = this.cmdEngine;
        this._user = this.userInfo;
    }
    /**
     * Generate a button (an <a>-tag) for one specific toolbar-action.
     * @param {InPageButtonJson} actDef - settings, an object containing the spec for the expected button
     * @param {int} groupIndex - number what button-group it's in'
     * @returns {string} html of a button
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    EditManager.prototype.getButton = function (actDef, groupIndex) {
        this.context.button = __WEBPACK_IMPORTED_MODULE_1__toolbar__["ToolbarManager"].getLoader('getButton')
            .groups.convertToButton(actDef, {}, {}, {});
        var button = new __WEBPACK_IMPORTED_MODULE_2__toolbar_render_toolbar_renderer__["ToolbarRenderer"](this.context).button.render(this.context, groupIndex);
        return button.outerHTML;
    };
    /**
     * Builds the toolbar and returns it as HTML
     * @param {Object} tbConfig - general toolbar config
     * @param {ToolbarSettings} moreSettings - additional / override settings
     * @returns {string} html of the current toolbar
     *
     * it is publicly used in Razor scripts of inpage, so take a care to preserve function signature
     */
    EditManager.prototype.getToolbar = function (tbConfig, moreSettings) {
        // if toolbar is an array, use as-is, otherwise assume properties are params
        var toolbar = Array.isArray(tbConfig) ? tbConfig : __assign({}, tbConfig);
        tbConfig = { settings: __assign(__assign({}, tbConfig.settings), moreSettings), toolbar: toolbar };
        var toolbarConfig = __WEBPACK_IMPORTED_MODULE_1__toolbar__["ToolbarManager"].loadConfig(this.context, tbConfig);
        this.context.toolbar = toolbarConfig;
        return new __WEBPACK_IMPORTED_MODULE_2__toolbar_render_toolbar_renderer__["ToolbarRenderer"](this.context).render();
    };
    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    EditManager.prototype._updateContentGroupGuid = function (context, newGuid) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.ContentGroup.Guid = newGuid;
    };
    /**
     * init this object
     */
    EditManager.prototype.init = function () {
        var tag = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].getTag(this.sxc);
        // enhance UI in case there are known errors / issues
        var isErrorState = this.editContext && this.editContext.error && this.editContext.error.type;
        if (isErrorState)
            handleErrors(this.editContext.error.type, tag);
    };
    return EditManager;
}());

/**
 * private: show error when the app-data hasn't been installed yet for this imported-module
 */
function handleErrors(errType, cbTag) {
    var errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
    var msg = '';
    var toolbar = $("<ul class='sc-menu'></ul>");
    if (errType === 'DataIsMissing') {
        msg =
            'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
        toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
    }
    errWrapper.append(msg);
    errWrapper.append(toolbar);
    $(cbTag).append(errWrapper);
}


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["_translateInit"] = _translateInit;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_i18next_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_jquery_i18next_min__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_jquery_i18next_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__libs_jquery_i18next_min__);






var win18n = __WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__["windowInPage"];
win18n.i18next = __WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__;
win18n.i18nextXHRBackend = __WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__;
var initialized = false;
// ReSharper disable once InconsistentNaming
function _translateInit(manage) {
    if (initialized) {
        return;
    }
    var context = manage._context;
    if (!context) {
        initialized = true; // getScxInstance is calling _translate so that we can skip the loop...
        // trying to get context...
        var htmlElementOrId = $('div[data-cb-id]')[0];
        var sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(htmlElementOrId);
        initialized = false; // for real, it is not initialized...
        var editContext = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getEditContext(sxc);
        context = new __WEBPACK_IMPORTED_MODULE_0__context_bundles_context_bundle_button__["ContextComplete"](editContext);
        context.sxc = sxc;
    }
    win18n.i18next
        .use(__WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__)
        .init({
        lng: context.app.currentLanguage.substr(0, 2),
        fallbackLng: 'en',
        whitelist: ['en', 'de', 'fr', 'it', 'uk', 'nl'],
        preload: ['en'],
        backend: {
            loadPath: context.instance.sxcRootUrl + 'desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js',
        },
    }, function () {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        // ReSharper disable once TsResolvedFromInaccessibleModule
        __WEBPACK_IMPORTED_MODULE_5__libs_jquery_i18next_min__["init"](__WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('ul.sc-menu').localize(); // inline toolbars
        $('.sc-i18n').localize(); // quick-insert menus
    });
    initialized = true;
}


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18next",t):e.i18next=t()}(this,function(){"use strict";function e(e){return null==e?"":""+e}function t(e,t,n){e.forEach(function(e){t[e]&&(n[e]=t[e])})}function n(e,t,n){function o(e){return e&&e.indexOf("###")>-1?e.replace(/###/g,"."):e}for(var r="string"!=typeof t?[].concat(t):t.split(".");r.length>1;){if(!e)return{};var i=o(r.shift());!e[i]&&n&&(e[i]=new n),e=e[i]}return e?{obj:e,k:o(r.shift())}:{}}function o(e,t,o){var r=n(e,t,Object),i=r.obj,s=r.k;i[s]=o}function r(e,t,o,r){var i=n(e,t,Object),s=i.obj,a=i.k;s[a]=s[a]||[],r&&(s[a]=s[a].concat(o)),r||s[a].push(o)}function i(e,t){var o=n(e,t),r=o.obj,i=o.k;return r?r[i]:void 0}function s(e,t,n){for(var o in t)o in e?"string"==typeof e[o]||e[o]instanceof String||"string"==typeof t[o]||t[o]instanceof String?n&&(e[o]=t[o]):s(e[o],t[o],n):e[o]=t[o];return e}function a(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function l(e){return"string"==typeof e?e.replace(/[&<>"'\/]/g,function(e){return C[e]}):e}function u(e){return e.interpolation={unescapeSuffix:"HTML"},e.interpolation.prefix=e.interpolationPrefix||"__",e.interpolation.suffix=e.interpolationSuffix||"__",e.interpolation.escapeValue=e.escapeInterpolation||!1,e.interpolation.nestingPrefix=e.reusePrefix||"$t(",e.interpolation.nestingSuffix=e.reuseSuffix||")",e}function c(e){return e.resStore&&(e.resources=e.resStore),e.ns&&e.ns.defaultNs?(e.defaultNS=e.ns.defaultNs,e.ns=e.ns.namespaces):e.defaultNS=e.ns||"translation",e.fallbackToDefaultNS&&e.defaultNS&&(e.fallbackNS=e.defaultNS),e.saveMissing=e.sendMissing,e.saveMissingTo=e.sendMissingTo||"current",e.returnNull=!e.fallbackOnNull,e.returnEmptyString=!e.fallbackOnEmpty,e.returnObjects=e.returnObjectTrees,e.joinArrays="\n",e.returnedObjectHandler=e.objectTreeKeyHandler,e.parseMissingKeyHandler=e.parseMissingKey,e.appendNamespaceToMissingKey=!0,e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,"sprintf"===e.shortcutFunction&&(e.overloadTranslationOptionHandler=function(e){for(var t=[],n=1;n<e.length;n++)t.push(e[n]);return{postProcess:"sprintf",sprintf:t}}),e.whitelist=e.lngWhitelist,e.preload=e.preload,"current"===e.load&&(e.load="currentOnly"),"unspecific"===e.load&&(e.load="languageOnly"),e.backend=e.backend||{},e.backend.loadPath=e.resGetPath||"locales/__lng__/__ns__.json",e.backend.addPath=e.resPostPath||"locales/add/__lng__/__ns__",e.backend.allowMultiLoading=e.dynamicLoad,e.cache=e.cache||{},e.cache.prefix="res_",e.cache.expirationTime=6048e5,e.cache.enabled=!!e.useLocalStorage,e=u(e),e.defaultVariables&&(e.interpolation.defaultVariables=e.defaultVariables),e}function p(e){return e=u(e),e.joinArrays="\n",e}function f(e){return(e.interpolationPrefix||e.interpolationSuffix||e.escapeInterpolation)&&(e=u(e)),e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,e.returnObjects=e.returnObjectTrees,e}function h(e){e.lng=function(){return S.deprecate("i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup."),e.services.languageUtils.toResolveHierarchy(e.language)[0]},e.preload=function(t,n){S.deprecate("i18next.preload() can be replaced with i18next.loadLanguages()"),e.loadLanguages(t,n)},e.setLng=function(t,n,o){return S.deprecate("i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace."),"function"==typeof n&&(o=n,n={}),n||(n={}),n.fixLng===!0&&o?o(null,e.getFixedT(t)):void e.changeLanguage(t,o)},e.addPostProcessor=function(t,n){S.deprecate("i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })"),e.use({type:"postProcessor",name:t,process:n})}}function g(e){return e.charAt(0).toUpperCase()+e.slice(1)}function d(){var e={};return R.forEach(function(t){t.lngs.forEach(function(n){return e[n]={numbers:t.nr,plurals:P[t.fc]}})}),e}function v(e,t){for(var n=e.indexOf(t);-1!==n;)e.splice(n,1),n=e.indexOf(t)}function y(){return{debug:!1,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,whitelist:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",saveMissing:!1,saveMissingTo:"fallback",missingKeyHandler:!1,postProcess:!1,returnNull:!0,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:function(){},parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,overloadTranslationOptionHandler:function(e){return{defaultValue:e[1]}},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",defaultVariables:void 0}}}function b(e){return"string"==typeof e.ns&&(e.ns=[e.ns]),"string"==typeof e.fallbackLng&&(e.fallbackLng=[e.fallbackLng]),"string"==typeof e.fallbackNS&&(e.fallbackNS=[e.fallbackNS]),e.whitelist&&e.whitelist.indexOf("cimode")<0&&e.whitelist.push("cimode"),e}var m={};m["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},m.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},m["extends"]=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},m.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},m.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},m.slicedToArray=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(l){r=!0,i=l}finally{try{!o&&a["return"]&&a["return"]()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();var x={type:"logger",log:function(e){this._output("log",e)},warn:function(e){this._output("warn",e)},error:function(e){this._output("error",e)},_output:function(e,t){console&&console[e]&&console[e].apply(console,Array.prototype.slice.call(t))}},k=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.subs=[],this.init(t,n)}return e.prototype.init=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.prefix=t.prefix||"i18next:",this.logger=e||x,this.options=t,this.debug=t.debug!==!1},e.prototype.setDebug=function(e){this.debug=e,this.subs.forEach(function(t){t.setDebug(e)})},e.prototype.log=function(){this.forward(arguments,"log","",!0)},e.prototype.warn=function(){this.forward(arguments,"warn","",!0)},e.prototype.error=function(){this.forward(arguments,"error","")},e.prototype.deprecate=function(){this.forward(arguments,"warn","WARNING DEPRECATED: ",!0)},e.prototype.forward=function(e,t,n,o){o&&!this.debug||("string"==typeof e[0]&&(e[0]=n+this.prefix+" "+e[0]),this.logger[t](e))},e.prototype.create=function(t){var n=new e(this.logger,m["extends"]({prefix:this.prefix+":"+t+":"},this.options));return this.subs.push(n),n},e}(),S=new k,w=function(){function e(){m.classCallCheck(this,e),this.observers={}}return e.prototype.on=function(e,t){var n=this;e.split(" ").forEach(function(e){n.observers[e]=n.observers[e]||[],n.observers[e].push(t)})},e.prototype.off=function(e,t){var n=this;this.observers[e]&&this.observers[e].forEach(function(){if(t){var o=n.observers[e].indexOf(t);o>-1&&n.observers[e].splice(o,1)}else delete n.observers[e]})},e.prototype.emit=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;t>o;o++)n[o-1]=arguments[o];this.observers[e]&&this.observers[e].forEach(function(e){e.apply(void 0,n)}),this.observers["*"]&&this.observers["*"].forEach(function(t){var o;t.apply(t,(o=[e]).concat.apply(o,n))})},e}(),C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},L=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{ns:["translation"],defaultNS:"translation"}:arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.data=n,r.options=o,r}return m.inherits(t,e),t.prototype.addNamespaces=function(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)},t.prototype.removeNamespaces=function(e){var t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)},t.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],r=o.keySeparator||this.options.keySeparator;void 0===r&&(r=".");var s=[e,t];return n&&"string"!=typeof n&&(s=s.concat(n)),n&&"string"==typeof n&&(s=s.concat(r?n.split(r):n)),e.indexOf(".")>-1&&(s=e.split(".")),i(this.data,s)},t.prototype.addResource=function(e,t,n,r){var i=arguments.length<=4||void 0===arguments[4]?{silent:!1}:arguments[4],s=this.options.keySeparator;void 0===s&&(s=".");var a=[e,t];n&&(a=a.concat(s?n.split(s):n)),e.indexOf(".")>-1&&(a=e.split("."),r=t,t=a[1]),this.addNamespaces(t),o(this.data,a,r),i.silent||this.emit("added",e,t,n,r)},t.prototype.addResources=function(e,t,n){for(var o in n)"string"==typeof n[o]&&this.addResource(e,t,o,n[o],{silent:!0});this.emit("added",e,t,n)},t.prototype.addResourceBundle=function(e,t,n,r,a){var l=[e,t];e.indexOf(".")>-1&&(l=e.split("."),r=n,n=t,t=l[1]),this.addNamespaces(t);var u=i(this.data,l)||{};r?s(u,n,a):u=m["extends"]({},u,n),o(this.data,l,u),this.emit("added",e,t,n)},t.prototype.removeResourceBundle=function(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)},t.prototype.hasResourceBundle=function(e,t){return void 0!==this.getResource(e,t)},t.prototype.getResourceBundle=function(e,t){return t||(t=this.options.defaultNS),"v1"===this.options.compatibilityAPI?m["extends"]({},this.getResource(e,t)):this.getResource(e,t)},t.prototype.toJSON=function(){return this.data},t}(w),N={processors:{},addPostProcessor:function(e){this.processors[e.name]=e},handle:function(e,t,n,o,r){var i=this;return e.forEach(function(e){i.processors[e]&&(t=i.processors[e].process(t,n,o,r))}),t}},O=function(e){function n(o){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,n);var i=m.possibleConstructorReturn(this,e.call(this));return t(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector"],o,i),i.options=r,i.logger=S.create("translator"),i}return m.inherits(n,e),n.prototype.changeLanguage=function(e){e&&(this.language=e)},n.prototype.exists=function(e){var t=arguments.length<=1||void 0===arguments[1]?{interpolation:{}}:arguments[1];return"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0!==this.resolve(e,t)},n.prototype.extractFromKey=function(e,t){var n=t.nsSeparator||this.options.nsSeparator;void 0===n&&(n=":");var o=t.ns||this.options.defaultNS;if(n&&e.indexOf(n)>-1){var r=e.split(n);o=r[0],e=r[1]}return"string"==typeof o&&(o=[o]),{key:e,namespaces:o}},n.prototype.translate=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("object"!==("undefined"==typeof t?"undefined":m["typeof"](t))?t=this.options.overloadTranslationOptionHandler(arguments):"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0===e||null===e||""===e)return"";"number"==typeof e&&(e=String(e)),"string"==typeof e&&(e=[e]);var n=t.lng||this.language;if(n&&"cimode"===n.toLowerCase())return e[e.length-1];var o=t.keySeparator||this.options.keySeparator||".",r=this.extractFromKey(e[e.length-1],t),i=r.key,s=r.namespaces,a=s[s.length-1],l=this.resolve(e,t),u=Object.prototype.toString.apply(l),c=["[object Number]","[object Function]","[object RegExp]"],p=void 0!==t.joinArrays?t.joinArrays:this.options.joinArrays;if(l&&"string"!=typeof l&&c.indexOf(u)<0&&(!p||"[object Array]"!==u)){if(!t.returnObjects&&!this.options.returnObjects)return this.logger.warn("accessing an object - but returnObjects options is not enabled!"),this.options.returnedObjectHandler?this.options.returnedObjectHandler(i,l,t):"key '"+i+" ("+this.language+")' returned an object instead of string.";var h="[object Array]"===u?[]:{};for(var g in l)h[g]=this.translate(""+i+o+g,m["extends"]({joinArrays:!1,ns:s},t));l=h}else if(p&&"[object Array]"===u)l=l.join(p),l&&(l=this.extendTranslation(l,i,t));else{var d=!1,v=!1;if(!this.isValidLookup(l)&&t.defaultValue&&(d=!0,l=t.defaultValue),this.isValidLookup(l)||(v=!0,l=i),(v||d)&&(this.logger.log("missingKey",n,a,i,l),this.options.saveMissing)){var y=[];if("fallback"===this.options.saveMissingTo&&this.options.fallbackLng&&this.options.fallbackLng[0])for(var b=0;b<this.options.fallbackLng.length;b++)y.push(this.options.fallbackLng[b]);else"all"===this.options.saveMissingTo?y=this.languageUtils.toResolveHierarchy(t.lng||this.language):y.push(t.lng||this.language);this.options.missingKeyHandler?this.options.missingKeyHandler(y,a,i,l):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(y,a,i,l),this.emit("missingKey",y,a,i,l)}l=this.extendTranslation(l,i,t),v&&l===i&&this.options.appendNamespaceToMissingKey&&(l=a+":"+i),v&&this.options.parseMissingKeyHandler&&(l=this.options.parseMissingKeyHandler(l))}return l},n.prototype.extendTranslation=function(e,t,n){var o=this;n.interpolation&&this.interpolator.init(n);var r=n.replace&&"string"!=typeof n.replace?n.replace:n;this.options.interpolation.defaultVariables&&(r=m["extends"]({},this.options.interpolation.defaultVariables,r)),e=this.interpolator.interpolate(e,r),e=this.interpolator.nest(e,function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return o.translate.apply(o,t)},n),n.interpolation&&this.interpolator.reset();var i=n.postProcess||this.options.postProcess,s="string"==typeof i?[i]:i;return void 0!==e&&s&&s.length&&n.applyPostProcessor!==!1&&(e=N.handle(s,e,t,n,this)),e},n.prototype.resolve=function(e){var t=this,n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=void 0;return"string"==typeof e&&(e=[e]),e.forEach(function(e){if(!t.isValidLookup(o)){var r=t.extractFromKey(e,n),i=r.key,s=r.namespaces;t.options.fallbackNS&&(s=s.concat(t.options.fallbackNS));var a=void 0!==n.count&&"string"!=typeof n.count,l=void 0!==n.context&&"string"==typeof n.context&&""!==n.context,u=n.lngs?n.lngs:t.languageUtils.toResolveHierarchy(n.lng||t.language);s.forEach(function(e){t.isValidLookup(o)||u.forEach(function(r){if(!t.isValidLookup(o)){var s=i,u=[s],c=void 0;a&&(c=t.pluralResolver.getSuffix(r,n.count)),a&&l&&u.push(s+c),l&&u.push(s+=""+t.options.contextSeparator+n.context),a&&u.push(s+=c);for(var p=void 0;p=u.pop();)t.isValidLookup(o)||(o=t.getResource(r,e,p,n))}})})}}),o},n.prototype.isValidLookup=function(e){return!(void 0===e||!this.options.returnNull&&null===e||!this.options.returnEmptyString&&""===e)},n.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];return this.resourceStore.getResource(e,t,n,o)},n}(w),j=function(){function e(t){m.classCallCheck(this,e),this.options=t,this.whitelist=this.options.whitelist||!1,this.logger=S.create("languageUtils")}return e.prototype.getLanguagePartFromCode=function(e){if(e.indexOf("-")<0)return e;var t=["NB-NO","NN-NO","nb-NO","nn-NO","nb-no","nn-no"],n=e.split("-");return this.formatLanguageCode(t.indexOf(e)>-1?n[1].toLowerCase():n[0])},e.prototype.formatLanguageCode=function(e){if("string"==typeof e&&e.indexOf("-")>-1){var t=["hans","hant","latn","cyrl","cans","mong","arab"],n=e.split("-");return this.options.lowerCaseLng?n=n.map(function(e){return e.toLowerCase()}):2===n.length?(n[0]=n[0].toLowerCase(),n[1]=n[1].toUpperCase(),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase()))):3===n.length&&(n[0]=n[0].toLowerCase(),2===n[1].length&&(n[1]=n[1].toUpperCase()),"sgn"!==n[0]&&2===n[2].length&&(n[2]=n[2].toUpperCase()),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase())),t.indexOf(n[2].toLowerCase())>-1&&(n[2]=g(n[2].toLowerCase()))),n.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e},e.prototype.isWhitelisted=function(e){return"languageOnly"===this.options.load&&(e=this.getLanguagePartFromCode(e)),!this.whitelist||!this.whitelist.length||this.whitelist.indexOf(e)>-1},e.prototype.toResolveHierarchy=function(e,t){var n=this;t=t||this.options.fallbackLng||[],"string"==typeof t&&(t=[t]);var o=[],r=function(e){n.isWhitelisted(e)?o.push(e):n.logger.warn("rejecting non-whitelisted language code: "+e)};return"string"==typeof e&&e.indexOf("-")>-1?("languageOnly"!==this.options.load&&r(this.formatLanguageCode(e)),"currentOnly"!==this.options.load&&r(this.getLanguagePartFromCode(e))):"string"==typeof e&&r(this.formatLanguageCode(e)),t.forEach(function(e){o.indexOf(e)<0&&r(n.formatLanguageCode(e))}),o},e}(),R=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","tg","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","es_ar","et","eu","fi","fo","fur","fy","gl","gu","ha","he","hi","hu","hy","ia","it","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt","pt_br","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","id","ja","jbo","ka","kk","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21}],P={1:function(e){return Number(e>1)},2:function(e){return Number(1!=e)},3:function(e){return 0},4:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},5:function(e){return Number(0===e?0:1==e?1:2==e?2:e%100>=3&&10>=e%100?3:e%100>=11?4:5)},6:function(e){return Number(1==e?0:e>=2&&4>=e?1:2)},7:function(e){return Number(1==e?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},8:function(e){return Number(1==e?0:2==e?1:8!=e&&11!=e?2:3)},9:function(e){return Number(e>=2)},10:function(e){return Number(1==e?0:2==e?1:7>e?2:11>e?3:4)},11:function(e){return Number(1==e||11==e?0:2==e||12==e?1:e>2&&20>e?2:3)},12:function(e){return Number(e%10!=1||e%100==11)},13:function(e){return Number(0!==e)},14:function(e){return Number(1==e?0:2==e?1:3==e?2:3)},15:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(10>e%100||e%100>=20)?1:2)},16:function(e){return Number(e%10==1&&e%100!=11?0:0!==e?1:2)},17:function(e){return Number(1==e||e%10==1?0:1)},18:function(e){return Number(0==e?0:1==e?1:2)},19:function(e){return Number(1==e?0:0===e||e%100>1&&11>e%100?1:e%100>10&&20>e%100?2:3)},20:function(e){return Number(1==e?0:0===e||e%100>0&&20>e%100?1:2)},21:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)}},E=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.languageUtils=t,this.options=n,this.logger=S.create("pluralResolver"),this.rules=d()}return e.prototype.addRule=function(e,t){this.rules[e]=t},e.prototype.getRule=function(e){return this.rules[this.languageUtils.getLanguagePartFromCode(e)]},e.prototype.needsPlural=function(e){var t=this.getRule(e);return!(t&&t.numbers.length<=1)},e.prototype.getSuffix=function(e,t){var n=this.getRule(e);if(n){if(1===n.numbers.length)return"";var o=n.noAbs?n.plurals(t):n.plurals(Math.abs(t)),r=n.numbers[o];if(2===n.numbers.length&&1===n.numbers[0]&&(2===r?r="plural":1===r&&(r="")),"v1"===this.options.compatibilityJSON){if(1===r)return"";if("number"==typeof r)return"_plural_"+r.toString()}return this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}return this.logger.warn("no plural rule found for: "+e),""},e}(),_=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];m.classCallCheck(this,t),this.logger=S.create("interpolator"),this.init(e,!0)}return t.prototype.init=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];t&&(this.options=e),e.interpolation||(e.interpolation={escapeValue:!0});var n=e.interpolation;this.escapeValue=n.escapeValue,this.prefix=n.prefix?a(n.prefix):n.prefixEscaped||"{{",this.suffix=n.suffix?a(n.suffix):n.suffixEscaped||"}}",this.unescapePrefix=n.unescapeSuffix?"":n.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":n.unescapeSuffix||"",this.nestingPrefix=n.nestingPrefix?a(n.nestingPrefix):n.nestingPrefixEscaped||a("$t("),this.nestingSuffix=n.nestingSuffix?a(n.nestingSuffix):n.nestingSuffixEscaped||a(")");var o=this.prefix+"(.+?)"+this.suffix;this.regexp=new RegExp(o,"g");var r=this.prefix+this.unescapePrefix+"(.+?)"+this.unescapeSuffix+this.suffix;this.regexpUnescape=new RegExp(r,"g");var i=this.nestingPrefix+"(.+?)"+this.nestingSuffix;this.nestingRegexp=new RegExp(i,"g")},t.prototype.reset=function(){this.options&&this.init(this.options)},t.prototype.interpolate=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}for(var r=void 0,s=void 0;r=this.regexpUnescape.exec(t);){var a=i(n,r[1].trim());t=t.replace(r[0],a)}for(;r=this.regexp.exec(t);)s=i(n,r[1].trim()),"string"!=typeof s&&(s=e(s)),s||(this.logger.warn("missed to pass in variable "+r[1]+" for interpolating "+t),s=""),s=o(this.escapeValue?l(s):s),t=t.replace(r[0],s),this.regexp.lastIndex=0;return t},t.prototype.nest=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}function r(e){if(e.indexOf(",")<0)return e;var t=e.split(",");e=t.shift();var n=t.join(",");n=this.interpolate(n,u);try{u=JSON.parse(n)}catch(o){this.logger.error("failed parsing options string in nesting for key "+e,o)}return e}var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=void 0,a=void 0,u=JSON.parse(JSON.stringify(i));for(u.applyPostProcessor=!1;s=this.nestingRegexp.exec(t);)a=n(r.call(this,s[1].trim()),u),"string"!=typeof a&&(a=e(a)),a||(this.logger.warn("missed to pass in variable "+s[1]+" for interpolating "+t),a=""),a=o(this.escapeValue?l(a):a),t=t.replace(s[0],a),this.regexp.lastIndex=0;return t},t}(),T=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.backend=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("backendConnector"),s.state={},s.queue=[],s.backend&&s.backend.init&&s.backend.init(r,i.backend,i),s}return m.inherits(t,e),t.prototype.queueLoad=function(e,t,n){var o=this,r=[],i=[],s=[],a=[];return e.forEach(function(e){var n=!0;t.forEach(function(t){var s=e+"|"+t;o.store.hasResourceBundle(e,t)?o.state[s]=2:o.state[s]<0||(1===o.state[s]?i.indexOf(s)<0&&i.push(s):(o.state[s]=1,n=!1,i.indexOf(s)<0&&i.push(s),r.indexOf(s)<0&&r.push(s),a.indexOf(t)<0&&a.push(t)))}),n||s.push(e)}),(r.length||i.length)&&this.queue.push({pending:i,loaded:{},errors:[],callback:n}),{toLoad:r,pending:i,toLoadLanguages:s,toLoadNamespaces:a}},t.prototype.loaded=function(e,t,n){var o=this,i=e.split("|"),s=m.slicedToArray(i,2),a=s[0],l=s[1];t&&this.emit("failedLoading",a,l,t),n&&this.store.addResourceBundle(a,l,n),this.state[e]=t?-1:2,this.queue.forEach(function(n){r(n.loaded,[a],l),v(n.pending,e),t&&n.errors.push(t),0!==n.pending.length||n.done||(n.errors.length?n.callback(n.errors):n.callback(),o.emit("loaded",n.loaded),n.done=!0)}),this.queue=this.queue.filter(function(e){return!e.done})},t.prototype.read=function(e,t,n,o,r,i){var s=this;return o||(o=0),r||(r=250),e.length?void this.backend[n](e,t,function(a,l){return a&&l&&5>o?void setTimeout(function(){s.read.call(s,e,t,n,++o,2*r,i)},r):void i(a,l)}):i(null,{})},t.prototype.load=function(e,t,n){var o=this;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),n&&n();var r=m["extends"]({},this.backend.options,this.options.backend);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]);var s=this.queueLoad(e,t,n);return s.toLoad.length?void(r.allowMultiLoading&&this.backend.readMulti?this.read(s.toLoadLanguages,s.toLoadNamespaces,"readMulti",null,null,function(e,t){e&&o.logger.warn("loading namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading failed",e),!e&&t&&o.logger.log("loaded namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading",t),s.toLoad.forEach(function(n){var r=n.split("|"),s=m.slicedToArray(r,2),a=s[0],l=s[1],u=i(t,[a,l]);if(u)o.loaded(n,e,u);else{var c="loading namespace "+l+" for language "+a+" via multiloading failed";o.loaded(n,c),o.logger.error(c)}})}):!function(){var e=function(e){var t=this,n=e.split("|"),o=m.slicedToArray(n,2),r=o[0],i=o[1];this.read(r,i,"read",null,null,function(n,o){n&&t.logger.warn("loading namespace "+i+" for language "+r+" failed",n),!n&&o&&t.logger.log("loaded namespace "+i+" for language "+r,o),t.loaded(e,n,o)})};s.toLoad.forEach(function(t){e.call(o,t)})}()):void(s.pending.length||n())},t.prototype.saveMissing=function(e,t,n,o){this.backend&&this.backend.create&&this.backend.create(e,t,n,o),this.store.addResource(e[0],t,n,o)},t}(w),A=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.cache=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("cacheConnector"),s.cache&&s.cache.init&&s.cache.init(r,i.cache,i),s}return m.inherits(t,e),t.prototype.load=function(e,t,n){var o=this;if(!this.cache)return n&&n();var r=m["extends"]({},this.cache.options,this.options.cache);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]),r.enabled?this.cache.load(e,function(t,r){if(t&&o.logger.error("loading languages "+e.join(", ")+" from cache failed",t),r)for(var i in r)for(var s in r[i])if("i18nStamp"!==s){var a=r[i][s];a&&o.store.addResourceBundle(i,s,a)}n&&n()}):n&&n()},t.prototype.save=function(){this.cache&&this.options.cache&&this.options.cache.enabled&&this.cache.save(this.store.data)},t}(w),M=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.options=b(n),r.services={},r.logger=S,r.modules={},o&&!r.isInitialized&&r.init(n,o),r}return m.inherits(t,e),t.prototype.init=function(e,t){function n(e){return e?"function"==typeof e?new e:e:void 0}var o=this;if("function"==typeof e&&(t=e,e={}),e||(e={}),"v1"===e.compatibilityAPI?this.options=m["extends"]({},y(),b(c(e)),{}):"v1"===e.compatibilityJSON?this.options=m["extends"]({},y(),b(p(e)),{}):this.options=m["extends"]({},y(),this.options,b(e)),t||(t=function(){}),!this.options.isClone){this.modules.logger?S.init(n(this.modules.logger),this.options):S.init(null,this.options);var r=new j(this.options);this.store=new L(this.options.resources,this.options);var i=this.services;i.logger=S,i.resourceStore=this.store,i.resourceStore.on("added removed",function(e,t){i.cacheConnector.save()}),i.languageUtils=r,i.pluralResolver=new E(r,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON}),i.interpolator=new _(this.options),i.backendConnector=new T(n(this.modules.backend),i.resourceStore,i,this.options),i.backendConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),i.backendConnector.on("loaded",function(e){i.cacheConnector.save()}),i.cacheConnector=new A(n(this.modules.cache),i.resourceStore,i,this.options),i.cacheConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),this.modules.languageDetector&&(i.languageDetector=n(this.modules.languageDetector),i.languageDetector.init(i,this.options.detection,this.options)),this.translator=new O(this.services,this.options),this.translator.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))})}var s=["getResource","addResource","addResources","addResourceBundle","removeResourceBundle","hasResourceBundle","getResourceBundle"];s.forEach(function(e){o[e]=function(){return this.store[e].apply(this.store,arguments)}}),"v1"===this.options.compatibilityAPI&&h(this);var a=function(){o.changeLanguage(o.options.lng,function(e,n){o.emit("initialized",o.options),o.logger.log("initialized",o.options),t(e,n)})};return this.options.resources?a():setTimeout(a,10),this},t.prototype.loadResources=function(e){var t=this;if(e||(e=function(){}),this.options.resources)e(null);else{var n=function(){if(t.language&&"cimode"===t.language.toLowerCase())return{v:e()};var n=[],o=function(e){var o=t.services.languageUtils.toResolveHierarchy(e);o.forEach(function(e){n.indexOf(e)<0&&n.push(e)})};o(t.language),t.options.preload&&t.options.preload.forEach(function(e){o(e)}),t.services.cacheConnector.load(n,t.options.ns,function(){t.services.backendConnector.load(n,t.options.ns,e)})}();if("object"===("undefined"==typeof n?"undefined":m["typeof"](n)))return n.v}},t.prototype.use=function(e){return"backend"===e.type&&(this.modules.backend=e),"cache"===e.type&&(this.modules.cache=e),("logger"===e.type||e.log&&e.warn&&e.warn)&&(this.modules.logger=e),"languageDetector"===e.type&&(this.modules.languageDetector=e),"postProcessor"===e.type&&N.addPostProcessor(e),this},t.prototype.changeLanguage=function(e,t){var n=this,o=function(o){e&&(n.emit("languageChanged",e),n.logger.log("languageChanged",e)),t&&t(o,function(){for(var e=arguments.length,t=Array(e),o=0;e>o;o++)t[o]=arguments[o];return n.t.apply(n,t)})};!e&&this.services.languageDetector&&(e=this.services.languageDetector.detect()),e&&(this.language=e,this.languages=this.services.languageUtils.toResolveHierarchy(e),this.translator.changeLanguage(e),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage(e)),this.loadResources(function(e){o(e)})},t.prototype.getFixedT=function(e,t){var n=this,o=function r(e,t){return t=t||{},t.lng=t.lng||r.lng,t.ns=t.ns||r.ns,n.t(e,t)};return o.lng=e,o.ns=t,o},t.prototype.t=function(){return this.translator&&this.translator.translate.apply(this.translator,arguments)},t.prototype.exists=function(){return this.translator&&this.translator.exists.apply(this.translator,arguments)},t.prototype.setDefaultNamespace=function(e){this.options.defaultNS=e},t.prototype.loadNamespaces=function(e,t){var n=this;return this.options.ns?("string"==typeof e&&(e=[e]),e.forEach(function(e){n.options.ns.indexOf(e)<0&&n.options.ns.push(e)}),void this.loadResources(t)):t&&t()},t.prototype.loadLanguages=function(e,t){"string"==typeof e&&(e=[e]);var n=this.options.preload||[],o=e.filter(function(e){return n.indexOf(e)<0});return o.length?(this.options.preload=n.concat(o),
void this.loadResources(t)):t()},t.prototype.dir=function(e){e||(e=this.language);var t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam"];return t.indexOf(this.services.languageUtils.getLanguagePartFromCode(e))?"ltr":"rtl"},t.prototype.createInstance=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments[1];return new t(e,n)},t.prototype.cloneInstance=function(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1],r=new t(m["extends"]({},n,this.options,{isClone:!0}),o),i=["store","translator","services","language"];return i.forEach(function(t){r[t]=e[t]}),r},t}(w),H=new M;return H});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18nextXHRBackend",t):e.i18nextXHRBackend=t()}(this,function(){"use strict";function e(e){return a.call(r.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e}function t(e,t,n,i,a){if(i&&"object"===("undefined"==typeof i?"undefined":o["typeof"](i))){var r="",s=encodeURIComponent;for(var l in i)r+="&"+s(l)+"="+s(i[l]);i=r.slice(1)+(a?"":"&_t="+new Date)}try{var c=new(XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0");c.open(i?"POST":"GET",e,1),t.crossDomain||c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-type","application/x-www-form-urlencoded"),c.onreadystatechange=function(){c.readyState>3&&n&&n(c.responseText,c)},c.send(i)}catch(s){window.console&&console.log(s)}}function n(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"locales/add/{{lng}}/{{ns}}",allowMultiLoading:!1,parse:JSON.parse,crossDomain:!1,ajax:t}}var o={};o["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o.createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=[],a=i.forEach,r=i.slice,s=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o.classCallCheck(this,t),this.init(e,n),this.type="backend"}return o.createClass(t,[{key:"init",value:function(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.services=t,this.options=e(o,this.options||{},n())}},{key:"readMulti",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e.join("+"),ns:t.join("+")});this.loadUrl(o,n)}},{key:"read",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e,ns:t});this.loadUrl(o,n)}},{key:"loadUrl",value:function(e,t){var n=this;this.options.ajax(e,this.options,function(o,i){var a=i.status.toString();if(0===a.indexOf("5"))return t("failed loading "+e,!0);if(0===a.indexOf("4"))return t("failed loading "+e,!1);var r=void 0,s=void 0;try{r=n.options.parse(o)}catch(l){s="failed parsing "+e+" to json"}return s?t(s,!1):void t(null,r)})}},{key:"create",value:function(e,t,n,o){var i=this;"string"==typeof e&&(e=[e]);var a={};a[n]=o||"",e.forEach(function(e){var n=i.services.interpolator.interpolate(i.options.addPath,{lng:e,ns:t});i.options.ajax(n,i.options,function(e,t){},a)})}}]),t}();return s.type="backend",s});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("jqueryI18next",e):t.jqueryI18next=e()}(this,function(){"use strict";function t(t,a){function r(n,a,r){function i(t,n){return s.parseDefaultValueFromContent?e["extends"]({},t,{defaultValue:n}):t}if(0!==a.length){var o="text";if(0===a.indexOf("[")){var f=a.split("]");a=f[1],o=f[0].substr(1,f[0].length-1)}if(a.indexOf(";")===a.length-1&&(a=a.substr(0,a.length-2)),"html"===o)n.html(t.t(a,i(r,n.html())));else if("text"===o)n.text(t.t(a,i(r,n.text())));else if("prepend"===o)n.prepend(t.t(a,i(r,n.html())));else if("append"===o)n.append(t.t(a,i(r,n.html())));else if(0===o.indexOf("data-")){var l=o.substr("data-".length),d=t.t(a,i(r,n.data(l)));n.data(l,d),n.attr(o,d)}else n.attr(o,t.t(a,i(r,n.attr(o))))}}function i(t,n){var i=t.attr(s.selectorAttr);if(i||"undefined"==typeof i||i===!1||(i=t.text()||t.val()),i){var o=t,f=t.data(s.targetAttr);if(f&&(o=t.find(f)||t),n||s.useOptionsAttr!==!0||(n=t.data(s.optionsAttr)),n=n||{},i.indexOf(";")>=0){var l=i.split(";");a.each(l,function(t,e){""!==e&&r(o,e,n)})}else r(o,i,n);if(s.useOptionsAttr===!0){var d={};d=e["extends"]({clone:d},n),delete d.lng,t.data(s.optionsAttr,d)}}}function o(t){return this.each(function(){i(a(this),t);var e=a(this).find("["+s.selectorAttr+"]");e.each(function(){i(a(this),t)})})}var s=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];s=e["extends"]({},n,s),a[s.tName]=t.t.bind(t),a[s.i18nName]=t,a.fn[s.handleName]=o}var e={};e["extends"]=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};var n={tName:"t",i18nName:"i18n",handleName:"localize",selectorAttr:"data-i18n",targetAttr:"i18n-target",optionsAttr:"i18n-options",useOptionsAttr:!1,parseDefaultValueFromContent:!0},a={init:t};return a});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_bootstrap__ = __webpack_require__(161);

var bootstrapper = new __WEBPACK_IMPORTED_MODULE_0__bootstrap_bootstrap__["BootstrapInPage"]();
$(document).ready(function () {
    bootstrapper.initialize();
});


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BootstrapInPage", function() { return BootstrapInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_command_layout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_dialog__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quick_dialog_state__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_tag_toolbars_tag_toolbar_manager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_manager__ = __webpack_require__(25);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









/**
 * This contains everything necessary to bootstrap the edit mode.
 * It must be initialized and started at the end in the x-bootstrap code,
 * to ensure everything is already ready and loaded
 */
var BootstrapInPage = /** @class */ (function (_super) {
    __extends(BootstrapInPage, _super);
    function BootstrapInPage() {
        var _this = _super.call(this, 'Sys.Bootst', null, 'Building Bootstrapper') || this;
        _this.initializedInstances = [];
        _this.openedTemplatePickerOnce = false;
        _this.diagCancelStateOnStart = __WEBPACK_IMPORTED_MODULE_6__quick_dialog_state__["cancelled"].get();
        __WEBPACK_IMPORTED_MODULE_4__logging__["Insights"].add('system', 'bootstrap', _this.log);
        return _this;
    }
    BootstrapInPage.prototype.initialize = function () {
        var callLog = this.log.call('initialize');
        // reset cancelled state after one reload
        if (this.diagCancelStateOnStart)
            __WEBPACK_IMPORTED_MODULE_6__quick_dialog_state__["cancelled"].remove();
        // initialize all modules
        this.initAllInstances(true);
        // start observing the body for configured mutations
        this.watchDomChanges();
        callLog.return('done');
    };
    /**
     * Scan all instances and initialize them
     * @param isFirstRun should be true only on the very initial call
     */
    BootstrapInPage.prototype.initAllInstances = function (isFirstRun) {
        var _this = this;
        var callLog = this.log.call('initAllInstances');
        $('div[data-edit-context]').each(function (i, e) {
            _this.initInstance($(e), isFirstRun);
        });
        if (isFirstRun)
            this.tryShowTemplatePicker();
        callLog.return('initAllInstances done');
    };
    /**
     * create an observer instance and start observing
     */
    BootstrapInPage.prototype.watchDomChanges = function () {
        var _this = this;
        var callLog = this.log.call('watchDomChanges');
        var observer = new MutationObserver(function (m) {
            // Watch statistics how changes were processed
            __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__["windowInPage"].$2sxc.stats.watchDomChanges++;
            var processed = 0;
            // 2019-08-29 2rm added automatic initialization of toolbars (not only module nodes)
            m.forEach(function (v) {
                Array.prototype.forEach.call(v.addedNodes, function (n) {
                    var node = $(n);
                    // Ignore added menu nodes as this may cause performance issues
                    if (node.is('.sc-menu'))
                        return;
                    processed++;
                    // If the added node is a [data-edit-context], it is either a module or a content block which was replaced
                    // re-initialize the module
                    if (node.is('div[data-edit-context]'))
                        _this.initInstance(node, false);
                    // If the added node contains [data-edit-context] nodes, it is likely the DNN module drag manager which added
                    // the node. To prevent multiple initialization while dragging modules, we additionally check for the
                    // .active-module class which seems to be applied while dragging the module.
                    else if (node.is(':not(.active-module)') && node.has('div[data-edit-context]')) {
                        $('div[data-edit-context]', node).each(function (i, e) {
                            _this.initInstance($(e), false);
                        });
                    }
                    else
                        __WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_manager__["ToolbarManager"].build(node);
                });
            });
            // Clean up orphan tags if nodes have been added
            if (processed)
                __WEBPACK_IMPORTED_MODULE_7__toolbar_tag_toolbars_tag_toolbar_manager__["TagToolbarManager"].CleanupOrphanedToolbars();
        });
        observer.observe(document.body, {
            attributes: false,
            childList: true,
            subtree: true,
        });
        callLog.return('watchDomChanges done');
    };
    /**
     * Show the template picker if
     * - template picker has not yet been opened
     * - dialog has not been cancelled
     * - only one uninitialized module on page
     * @returns
     */
    BootstrapInPage.prototype.tryShowTemplatePicker = function () {
        var cl = this.log.call('tryShowTemplatePicker');
        var sxc;
        // first check if we should show one according to the state-settings
        var openDialogId = __WEBPACK_IMPORTED_MODULE_6__quick_dialog_state__["cbId"].get();
        if (openDialogId) {
            // must check if it's on this page, as it could be from another page
            var found = $("[data-cb-id=\"" + openDialogId + "\"]");
            if (found.length) {
                // since the CB-ID could also be an inner content (marked as a negative "-" number)
                // we must be sure that we use the right id a.nyhow
                if (openDialogId < 0) {
                    var instanceId = Number(found[0].attributes.getNamedItem(__WEBPACK_IMPORTED_MODULE_1__constants__["C"].Attributes.InstanceId).value);
                    sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(instanceId, openDialogId);
                }
                else
                    sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(openDialogId);
            }
        }
        if (!sxc) {
            var uninitializedModules = $('.sc-uninitialized');
            if (this.diagCancelStateOnStart || this.openedTemplatePickerOnce)
                return cl.return(false, 'cancelled');
            // already showing a dialog
            if (__WEBPACK_IMPORTED_MODULE_5__quick_dialog__["QuickDialog"].isVisible())
                return cl.return(false, 'should be invisible');
            // not exactly one uninitialized module
            if (uninitializedModules.length !== 1)
                return cl.return(false, 'has un-init modules');
            // show the template picker of this module
            var module = uninitializedModules.parent('div[data-edit-context]')[0];
            sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(module);
        }
        if (sxc) {
            sxc.manage.run(__WEBPACK_IMPORTED_MODULE_0__commands_command_layout__["CmdLayout"]);
            this.openedTemplatePickerOnce = true;
        }
        return cl.return(true, 'tryShowTemplatePicker() done');
    };
    BootstrapInPage.prototype.initInstance = function (module, isFirstRun) {
        var cl = this.log.call('initInstance', "module: obj, isFirstRun: " + isFirstRun + ") initialized: " + this.initializedInstances);
        // check if module is already in the list of initialized modules
        if (this.initializedInstances.find(function (m) { return m === module; }))
            return;
        // add to modules-list first, in case we run into recursions
        this.initializedInstances.push(module);
        var sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(module);
        // check if the sxc must be re-created. This is necessary when modules are dynamically changed
        // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
        if (!isFirstRun)
            sxc = sxc.recreate(true);
        // check if we must show the glasses
        // this must always run because it can be added ajax-style
        var wasEmpty = this.showGlassesButtonIfUninitialized(sxc);
        if (isFirstRun || !wasEmpty) {
            // use a logger for each iteration
            var log = new __WEBPACK_IMPORTED_MODULE_4__logging__["Log"]('Bts.Module');
            __WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_manager__["ToolbarManager"].buildModule(module);
        }
        cl.done();
    };
    BootstrapInPage.prototype.showGlassesButtonIfUninitialized = function (sxci) {
        var callLog = this.log.call('showGlassesButtonIfUninitialized');
        // already initialized
        if (this.isInitialized(sxci))
            return callLog.return(false, 'is initialized');
        // already has a glasses button
        var tag = $(__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxci));
        if (tag.find('.sc-uninitialized').length !== 0)
            return callLog.return(false, 'already has button');
        // note: title is added on mouseover, as the translation isn't ready at page-load
        var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">' +
            '<div class="icon-sxc-glasses"></div>' +
            '</div>');
        btn.on('click', function () { return sxci.manage.run(__WEBPACK_IMPORTED_MODULE_0__commands_command_layout__["CmdLayout"]); });
        tag.append(btn);
        return callLog.return(true, 'ok');
    };
    BootstrapInPage.prototype.isInitialized = function (sxci) {
        var cg = sxci &&
            sxci.manage &&
            sxci.manage._editContext &&
            sxci.manage._editContext.ContentGroup;
        return cg && cg.TemplateId !== 0;
    };
    return BootstrapInPage;
}(__WEBPACK_IMPORTED_MODULE_4__logging__["HasLog"]));



/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iDialogFrameElement__ = __webpack_require__(59);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IDialogFrameElement", function() { return __WEBPACK_IMPORTED_MODULE_0__iDialogFrameElement__["IDialogFrameElement"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iframe_bridge__ = __webpack_require__(60);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IFrameBridge", function() { return __WEBPACK_IMPORTED_MODULE_1__iframe_bridge__["IFrameBridge"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_dialog__ = __webpack_require__(36);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickDialog", function() { return __WEBPACK_IMPORTED_MODULE_2__quick_dialog__["QuickDialog"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quick_dialog_config__ = __webpack_require__(61);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickDialogConfig", function() { return __WEBPACK_IMPORTED_MODULE_3__quick_dialog_config__["QuickDialogConfig"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quick_dialog_container__ = __webpack_require__(58);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickDialogContainer", function() { return __WEBPACK_IMPORTED_MODULE_4__quick_dialog_container__["QuickDialogContainer"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state__ = __webpack_require__(37);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cbId", function() { return __WEBPACK_IMPORTED_MODULE_5__state__["cbId"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return __WEBPACK_IMPORTED_MODULE_5__state__["cancelled"]; });








/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEditContext", function() { return AttrJsonEditContext; });
var AttrJsonEditContext = /** @class */ (function () {
    function AttrJsonEditContext() {
    }
    return AttrJsonEditContext;
}());



/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentBlock", function() { return AttrJsonContentBlock; });
var AttrJsonContentBlock = /** @class */ (function () {
    function AttrJsonContentBlock() {
    }
    return AttrJsonContentBlock;
}());



/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentGroup", function() { return AttrJsonContentGroup; });
var AttrJsonContentGroup = /** @class */ (function () {
    function AttrJsonContentGroup() {
    }
    return AttrJsonContentGroup;
}());



/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEnvironment", function() { return AttrJsonEnvironment; });
var AttrJsonEnvironment = /** @class */ (function () {
    function AttrJsonEnvironment() {
    }
    return AttrJsonEnvironment;
}());



/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonError", function() { return AttrJsonError; });
var AttrJsonError = /** @class */ (function () {
    function AttrJsonError() {
    }
    return AttrJsonError;
}());



/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonLanguage", function() { return AttrJsonLanguage; });
var AttrJsonLanguage = /** @class */ (function () {
    function AttrJsonLanguage() {
    }
    return AttrJsonLanguage;
}());



/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEntity", function() { return AttrJsonEntity; });
var AttrJsonEntity = /** @class */ (function () {
    function AttrJsonEntity() {
    }
    return AttrJsonEntity;
}());



/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUi", function() { return AttrJsonUi; });
var AttrJsonUi = /** @class */ (function () {
    function AttrJsonUi() {
    }
    return AttrJsonUi;
}());



/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUser", function() { return AttrJsonUser; });
var AttrJsonUser = /** @class */ (function () {
    function AttrJsonUser() {
    }
    return AttrJsonUser;
}());



/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(173);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(161);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(150);
__webpack_require__(147);
__webpack_require__(40);
__webpack_require__(76);
__webpack_require__(125);
__webpack_require__(126);
__webpack_require__(127);
__webpack_require__(194);
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(11);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(23);
__webpack_require__(74);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(35);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(56);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(75);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(10);
__webpack_require__(148);
__webpack_require__(153);
__webpack_require__(1);
__webpack_require__(152);
__webpack_require__(77);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(2);
__webpack_require__(82);
__webpack_require__(34);
__webpack_require__(17);
__webpack_require__(8);
__webpack_require__(53);
__webpack_require__(28);
__webpack_require__(27);
__webpack_require__(95);
__webpack_require__(163);
__webpack_require__(195);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(20);
__webpack_require__(29);
__webpack_require__(47);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);
__webpack_require__(52);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(96);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(133);
__webpack_require__(14);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(57);
__webpack_require__(3);
__webpack_require__(204);
__webpack_require__(9);
__webpack_require__(0);
__webpack_require__(155);
__webpack_require__(205);
__webpack_require__(154);
__webpack_require__(151);
__webpack_require__(149);
__webpack_require__(19);
__webpack_require__(206);
__webpack_require__(89);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(162);
__webpack_require__(61);
__webpack_require__(58);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(18);
__webpack_require__(7);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(41);
__webpack_require__(121);
__webpack_require__(120);
__webpack_require__(119);
__webpack_require__(122);
__webpack_require__(207);
__webpack_require__(123);
__webpack_require__(24);
__webpack_require__(83);
__webpack_require__(124);
__webpack_require__(208);
__webpack_require__(99);
__webpack_require__(100);
__webpack_require__(98);
__webpack_require__(55);
__webpack_require__(97);
__webpack_require__(118);
__webpack_require__(101);
__webpack_require__(21);
__webpack_require__(102);
__webpack_require__(111);
__webpack_require__(54);
__webpack_require__(87);
__webpack_require__(90);
__webpack_require__(44);
__webpack_require__(88);
__webpack_require__(6);
__webpack_require__(92);
__webpack_require__(91);
__webpack_require__(15);
__webpack_require__(209);
__webpack_require__(94);
__webpack_require__(46);
__webpack_require__(86);
__webpack_require__(93);
__webpack_require__(45);
__webpack_require__(26);
__webpack_require__(33);
__webpack_require__(22);
__webpack_require__(113);
__webpack_require__(112);
__webpack_require__(117);
__webpack_require__(115);
__webpack_require__(114);
__webpack_require__(116);
__webpack_require__(43);
__webpack_require__(42);
__webpack_require__(32);
__webpack_require__(5);
__webpack_require__(103);
__webpack_require__(105);
__webpack_require__(110);
__webpack_require__(104);
__webpack_require__(106);
__webpack_require__(109);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(25);
__webpack_require__(156);
__webpack_require__(12);
module.exports = __webpack_require__(160);


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cms_Cms__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__manage_manage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_edit_quick_e__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__translate_2sxc_translateInit__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__translate_2sxc_translate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__x_bootstrap_x_bootstrap__ = __webpack_require__(160);









__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__["$2sxcInPage"].context = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextComplete"].findContext; // primary API to get the context
__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__["$2sxcInPage"]._translateInit = __WEBPACK_IMPORTED_MODULE_6__translate_2sxc_translateInit__["_translateInit"]; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__["$2sxcInPage"].translate = __WEBPACK_IMPORTED_MODULE_7__translate_2sxc_translate__["translate"]; // provide an official translate API for 2sxc
__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__["$2sxcInPage"]._manage = new __WEBPACK_IMPORTED_MODULE_4__manage_manage__["Manage"](); // _manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
__WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__["windowInPage"].$quickE = __WEBPACK_IMPORTED_MODULE_5__quick_edit_quick_e__["QuickE"];
$(function () { return __WEBPACK_IMPORTED_MODULE_5__quick_edit_quick_e__["QuickE"].start(); }); // run on-load
__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_controller_in_page__["$2sxcInPage"].cms = new __WEBPACK_IMPORTED_MODULE_0__cms_Cms__["Cms"]();


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogEntryOptions; });
var LogEntryOptions;
(function (LogEntryOptions) {
    LogEntryOptions["log"] = "log";
    LogEntryOptions["warn"] = "warn";
    LogEntryOptions["error"] = "error";
    LogEntryOptions["throw"] = "throw";
})(LogEntryOptions || (LogEntryOptions = {}));


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HasLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(4);

var HasLog = /** @class */ (function () {
    /**
     * initialize the logger
     * ideally it has a parent-logger to attach to
     * @param logName name to show in the logger
     * @param parentLog parent-logger to attach to
     * @param initialMessage optional start-message to log
     */
    function HasLog(logName, parentLog, initialMessage) {
        var _this = this;
        this.parentLog = parentLog;
        this.initLog = function (name, parentLog, initialMessage) { return _this.initLogInternal(name, parentLog, initialMessage); };
        this.initLogInternal(logName, parentLog, initialMessage);
    }
    HasLog.prototype.initLogInternal = function (name, parentLog, initialMessage) {
        if (this.log == null)
            // standard & most common case: just create log
            this.log = new __WEBPACK_IMPORTED_MODULE_0____["d" /* Log */](name, parentLog, initialMessage);
        else {
            // late-init case, where the log was already created - just reconfig keeping what was in it
            this.log.rename(name);
            this.log.linkLog(parentLog);
            if (initialMessage != null)
                this.log.add(initialMessage);
        }
    };
    return HasLog;
}());



/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Log; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(16);


var maxScopeLen = 3;
var maxNameLen = 6;
var liveDump = false;
var maxEntriesReached = 'Maximum amount of entries added to log, will stop adding more';
var Log = /** @class */ (function () {
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     */
    function Log(name, parent, initialMessage) {
        var _this = this;
        /**
         * all log-entries on this logger
         */
        this.entries = new Array();
        this.depth = 0;
        this.callDepths = [];
        /**
         * Maximum amount of entries to add - to prevent memory hoging
         */
        this.maxEntries = 1000;
        /* if we should live-dump, can be selectively activated */
        this.liveDump = liveDump;
        this._parentHasLiveDump = false;
        this.keepData = __WEBPACK_IMPORTED_MODULE_1____["Debug"].urlState; // C.Debug.urlState;
        this._parentHasKeepData = false;
        /**
         * Full identifier of this log-object, with full hierarchy
         */
        this.fullIdentifier = function () {
            return "" + (_this.parent ? _this.parent.fullIdentifier() : '') + _this.identifier();
        };
        /**
         * link this log to a parent
         * usually happens in constructor, but in rare cases
         * this must be called manually
         */
        this.linkLog = function (parent) {
            _this.parent = parent || _this.parent; // if new parent isn't defined, don't replace
            if (_this.parent) {
                _this._parentHasLiveDump = _this.parent.liveDump || _this.parent._parentHasLiveDump;
                _this._parentHasKeepData = _this.parent.keepData || _this.parent._parentHasKeepData;
            }
        };
        /**
         * scope of this logger - to easily see which ones
         * are about the same topic
         */
        this.scope = 'tdo';
        /**
         * name of this logger
         */
        this.name = 'unknwn';
        /**
         * Unique 2-character ID of this specific log object
         */
        this.id = function () { return _this.idCache || (_this.idCache = _this.randomString(2)); };
        /**
         * Unique identifier of this log object, with name and ID
         */
        this.identifier = function () { return "" + _this.scope + _this.name + "(" + _this.id() + ")"; };
        this.rename(name);
        this.linkLog(parent);
        this.startTime = new Date().getTime();
        if (initialMessage != null)
            this.add(initialMessage);
    }
    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     */
    Log.prototype.rename = function (name) {
        try {
            var dot = name.indexOf('.');
            this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + '.' : '';
            var rest = dot > 0 ? name.substr(dot + 1) : name;
            this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
            this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
        }
        catch (e) {
            /* ignore */
        }
    };
    /**
     * add a message to the log-list
     * @param message
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    Log.prototype.add = function (message, data) {
        // check if the log is already too big
        if (this.entries.length > this.maxEntries)
            return this._prepareMessage(message);
        // if we just reached the max, add special message
        if (this.entries.length === this.maxEntries)
            this._addEntry(this._prepareEntry(maxEntriesReached));
        var entry = this._prepareEntry(message, data);
        this._addEntry(entry);
        return entry.message;
    };
    Log.prototype.addData = function (message, data) {
        if (this.logData())
            this.add(message, data);
    };
    Log.prototype.logData = function () {
        return this.keepData || this._parentHasKeepData;
    };
    Log.prototype._prepareEntry = function (message, data) {
        var msg = this._prepareMessage(message);
        var time = new Date().getTime() - this.startTime;
        var entry = new __WEBPACK_IMPORTED_MODULE_0____["a" /* Entry */](this, msg, this.depth, time, data);
        return entry;
    };
    Log.prototype._prepareMessage = function (message) {
        if (message instanceof Function) {
            try {
                return (message());
            }
            catch (e) {
                return 'err: message undefined';
            }
        }
        return message.toString();
    };
    Log.prototype.call = function (name, callParams, message, data) {
        return new __WEBPACK_IMPORTED_MODULE_0____["e" /* LogCall */](this, name, callParams, message, data);
    };
    Log.prototype._callDepthAdd = function (name) {
        this.depth++;
        this.callDepths.push(name);
    };
    Log.prototype._callDepthRemove = function (name) {
        this.depth--;
        var last = this.callDepths.pop();
        if (last !== name) {
            console.warn("log: call depth reduced by '" + name + "' but last was '" + last + "'");
        }
    };
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     */
    Log.prototype.dump = function (one, separator) {
        if (one === void 0) { one = null; }
        if (separator === void 0) { separator = ' - '; }
        if (one)
            this.dumpOne(0, one, separator);
        else
            this.dumpList();
    };
    Log.prototype.dumpList = function (start, length) {
        var _this = this;
        if (start === void 0) { start = 0; }
        var index = start;
        this.entries
            .slice(start, length ? start + length : undefined)
            .forEach(function (e) { return _this.dumpOne(index++, e); });
    };
    Log.prototype.dumpOne = function (index, e, separator) {
        if (separator === void 0) { separator = ' - '; }
        var result = (e.result) ? ' =' + e.result : '';
        var line = ('0000' + index).slice(-4) + ' ' + e.source() + separator + '..'.repeat(e.depth) + e.message + result;
        if (e.data)
            console.log(line, e.data);
        else
            console.log(line);
    };
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     */
    Log.prototype._addEntry = function (entry) {
        if (this.liveDump)
            this.dump(entry);
        this.entries.push(entry);
        if (this.parent)
            this.parent._addEntry(entry);
    };
    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     */
    Log.prototype.randomString = function (stringLength) {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
        var randomstring = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    return Log;
}());



/***/ }),
/* 177 */
/***/ (function(module, exports) {



/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentMetaLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env_loader_dnn_sf__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var maxRetries = 10;
function logTest() {
    console.log('test');
    return true;
}
/**
 * This loads environment information from the meta-header tag.
 * Because of timing issues, it will try multiple times
 */
var EnvironmentMetaLoader = /** @class */ (function (_super) {
    __extends(EnvironmentMetaLoader, _super);
    function EnvironmentMetaLoader(env) {
        var _this = _super.call(this, 'Env.MetaLd', logTest ? env.log : env.log) || this;
        _this.env = env;
        _this.retries = 0;
        return _this;
    }
    EnvironmentMetaLoader.prototype.loadMetaFromHeader = function (forceFallback) {
        var _this = this;
        if (forceFallback === void 0) { forceFallback = false; }
        var cl = this.log.call('loadMetaFromHeader', "" + forceFallback);
        // avoid duplicate execution
        if (this.env.ready)
            return cl.done('loadMeta - ready');
        this.log.add('loadMetaFromHeader: start, retry:' + this.retries + ', force fallback: ' + forceFallback);
        var meta = this.getMeta(__WEBPACK_IMPORTED_MODULE_1__constants__["c" /* MetaHeaderJsApi */]);
        if (!meta) {
            this.retries++;
            if (forceFallback || this.retries >= maxRetries) {
                new __WEBPACK_IMPORTED_MODULE_0__env_loader_dnn_sf__["a" /* EnvironmentDnnSfLoader */](this.env).dnnSfFallback();
                return cl.done();
            }
            setTimeout(function () { _this.loadMetaFromHeader(); }, 1);
            return cl.done('will retry');
        }
        this.env.load(JSON.parse(meta), 'meta header');
        cl.done();
    };
    EnvironmentMetaLoader.prototype.getMeta = function (metaName) {
        var metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++)
            if (metas[i].getAttribute('name') === metaName)
                return metas[i].getAttribute('content');
        return '';
    };
    return EnvironmentMetaLoader;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["b" /* HasLog */]));



/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentDnnSfLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var helpAutoDetect = 'You must either include jQuery on the page or inject the jsApi parameters to prevent auto-detection.';
/**
 * This helps load environment information from DNN ServicesFramework - it's a fallback in case the other mechanisms fail
 */
var EnvironmentDnnSfLoader = /** @class */ (function (_super) {
    __extends(EnvironmentDnnSfLoader, _super);
    function EnvironmentDnnSfLoader(env) {
        var _this = _super.call(this, 'Env.DnnLdr', env.log) || this;
        _this.env = env;
        return _this;
    }
    /**
     * This will assume the new parameter injection failed and it will attempt to fallback
     * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
     * implementation
     */
    EnvironmentDnnSfLoader.prototype.dnnSfFallback = function () {
        var _this = this;
        var cl = this.log.call('dnnSfFallback');
        if (typeof $ === 'undefined') {
            // cl.done('error');
            throw "Can't load pageid, moduleid, etc. and $ is not available. \n " + helpAutoDetect;
        }
        // await page-ready to then initialize the stuff
        $(function () { return _this.dnnSfLoadWhenDocumentReady(); });
        cl.done('started dom-ready watcher');
    };
    EnvironmentDnnSfLoader.prototype.dnnSfLoadWhenDocumentReady = function () {
        var cl = this.log.call('dnnSfLoadWhenDocumentReady');
        var sf = $.ServicesFramework;
        if (typeof sf === 'undefined') {
            cl.done('error');
            throw "can't load pageid, moduleid etc. and DNN SF is not available. \n " + helpAutoDetect;
        }
        var dnnSf = sf(0);
        var sfJsInfo = {
            page: dnnSf.getTabId(),
            root: 'unknown',
            api: dnnSf.getServiceRoot('2sxc'),
            rvt: dnnSf.getAntiForgeryValue()
        };
        this.env.load(sfJsInfo, 'dnn SF');
        cl.done();
    };
    return EnvironmentDnnSfLoader;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["b" /* HasLog */]));



/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_api_sxc_web_api__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var serviceScopes = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];
/**
 * The typical sxc-instance object for a specific DNN module or content-block
 */
var SxcInstance = /** @class */ (function (_super) {
    __extends(SxcInstance, _super);
    function SxcInstance(
    /** the sxc-instance ID, which is usually the DNN Module Id */
    id, 
    /**
     * content-block ID, which is either the module ID, or the content-block definitiion entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid, 
    /** The environment information, important for http-calls */
    root) {
        var _this = _super.call(this, 'SxcInstance', null, 'Generating for ' + id + ':' + cbid) || this;
        _this.id = id;
        _this.cbid = cbid;
        _this.root = root;
        /**
         * The manage controller for edit/cms actions
         *
         * @type {*}
         * @memberof SxcInstance
         */
        _this.manage = null; // initialize correctly later on
        _this.webApi = new __WEBPACK_IMPORTED_MODULE_0__web_api_sxc_web_api__["a" /* SxcWebApi */](_this);
        // add manage property, but not within initializer, because inside the manage-initializer it may reference 2sxc again
        try { // sometimes the manage can't be built, like before installing
            if (root._manage)
                root._manage.initInstance(_this);
        }
        catch (e) {
            console.error('error in 2sxc - will only log but not throw', e);
        }
        // this only works when manage exists (not installing) and translator exists too
        if (root._translateInit && _this.manage)
            // ensure that we really have a manage context, otherwise we can't initialize i18n and it doesn't make sense
            if (_this.manage.context && _this.manage.context.app && _this.manage.context.app.currentLanguage)
                root._translateInit(_this.manage); // init translate, not really nice, but ok for now
        return _this;
    }
    /**
     * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
     * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
     * @deprecated use http.apiUrl instead
     * @param virtualPath
     * @returns mapped path
     */
    SxcInstance.prototype.resolveServiceUrl = function (virtualPath) {
        // console.warn('used resolveServiceUrl:' + virtualPath);
        var scope = virtualPath.split('/')[0].toLowerCase();
        // stop if it's not one of our special paths
        if (serviceScopes.indexOf(scope) === -1)
            return virtualPath;
        return this.root.http.apiRoot(__WEBPACK_IMPORTED_MODULE_1__constants__["e" /* ToSxcName */]) + scope + '/' + virtualPath.substring(virtualPath.indexOf('/') + 1);
    };
    // Show a nice error with more infos around 2sxc
    SxcInstance.prototype.showDetailedHttpError = function (result) {
        if (window.console)
            console.log(result);
        // check if the error was just because a language file couldn't be loaded - then don't show a message
        if (result.status === 404 &&
            result.config &&
            result.config.url &&
            result.config.url.indexOf('/dist/i18n/') > -1) {
            if (window.console)
                console.log('just fyi: failed to load language resource; will have to use default');
            return result;
        }
        // if it's an unspecified 0-error, it's probably not an error but a cancelled request,
        // (happens when closing popups containing angularJS)
        if (result.status === 0 || result.status === -1)
            return result;
        // let's try to show good messages in most cases
        var infoText = 'Had an error talking to the server (status ' + result.status + ').';
        var srvResp = result.responseText
            ? JSON.parse(result.responseText) // for jquery ajax errors
            : result.data; // for angular $http
        if (srvResp) {
            var msg = srvResp.Message;
            if (msg)
                infoText += '\nMessage: ' + msg;
            var msgDet = srvResp.MessageDetail || srvResp.ExceptionMessage;
            if (msgDet)
                infoText += '\nDetail: ' + msgDet;
            if (msgDet && msgDet.indexOf('No action was found') === 0)
                if (msgDet.indexOf('that matches the name') > 0)
                    infoText += '\n\nTip from 2sxc: you probably got the action-name wrong in your JS.';
                else if (msgDet.indexOf('that matches the request.') > 0)
                    infoText += '\n\nTip from 2sxc: Seems like the parameters are the wrong amount or type.';
            if (msg && msg.indexOf('Controller') === 0 && msg.indexOf('not found') > 0)
                infoText +=
                    // tslint:disable-next-line:max-line-length
                    "\n\nTip from 2sxc: you probably spelled the controller name wrong or forgot to remove the word 'controller' from the call in JS. To call a controller called 'DemoController' only use 'Demo'.";
        }
        // tslint:disable-next-line:max-line-length
        infoText += '\n\nif you are an advanced user you can learn more about what went wrong - discover how on 2sxc.org/help?tag=debug';
        alert(infoText);
        return result;
    };
    /**
     * checks if we're currently in edit mode
     * @returns {boolean}
     */
    SxcInstance.prototype.isEditMode = function () {
        return this.manage && this.manage._isEditMode();
    };
    return SxcInstance;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["b" /* HasLog */]));



/***/ }),
/* 181 */
/***/ (function(module, exports) {



/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstanceDataDeprecated; });
/**
 * This is a old 2sxc concept from 2sxc ca. V3
 * The idea was that each module could have it's own data and access it.
 * It would hide the internals of WebApis and just provide data.
 * This model isn't promoted or much in use any more, but included for compatibility
 */
var SxcInstanceDataDeprecated = /** @class */ (function () {
    function SxcInstanceDataDeprecated(controller) {
        this.controller = controller;
        this.source = undefined;
        // in-streams
        this["in"] = {};
        // will hold the default stream (["in"]["Default"].List
        this.List = [];
    }
    // source path defaulting to current page + optional params
    SxcInstanceDataDeprecated.prototype.sourceUrl = function (params) {
        var url = this.controller.root.http.apiUrl('app-sys/appcontent/GetContentBlockData');
        if (typeof params === 'string') // text like 'id=7'
            url += '&' + params;
        return url;
    };
    // load data via ajax
    SxcInstanceDataDeprecated.prototype.load = function (source) {
        var _this = this;
        // if source is already the data, set it
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
            source.preventAutoFail = true; // use our fail message
            this.source = source;
            return this.reload();
        }
    };
    SxcInstanceDataDeprecated.prototype.reload = function () {
        this.controller.webApi.get(this.source)
            .then(this.source.success, this.source.error);
        return this;
    };
    SxcInstanceDataDeprecated.prototype.on = function (events, callback) {
        return $2sxc_jQSuperlight(this).on('2scLoad', callback)[0]._triggerLoaded();
    };
    // ReSharper disable once InconsistentNaming
    SxcInstanceDataDeprecated.prototype._triggerLoaded = function () {
        return this.controller.isLoaded
            ? $2sxc_jQSuperlight(this).trigger('2scLoad', [this])[0]
            : this;
    };
    SxcInstanceDataDeprecated.prototype.one = function (events, callback) {
        if (!this.controller.isLoaded)
            return $2sxc_jQSuperlight(this).one('2scLoad', callback)[0];
        callback({}, this);
        return this;
    };
    return SxcInstanceDataDeprecated;
}());



/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debug; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(16);

var urlManager = new __WEBPACK_IMPORTED_MODULE_0____["UrlParamManager"]();
var urlDebugState = urlManager.get('debug') === 'true';
var Debug = /** @class */ (function () {
    function Debug() {
        this.load = urlDebugState;
        this.uncache = urlManager.get('sxcver');
    }
    Debug.urlState = urlDebugState;
    return Debug;
}());



/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_environment__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Environment", function() { return __WEBPACK_IMPORTED_MODULE_0__root_environment__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_info__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_info__);
/* unused harmony namespace reexport */




/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export buildSxcRoot */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_total_popup__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_url_param_manager__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stats__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sxc_instance_sxc_instance_with_internals__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sxc_root__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5____ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(13);








/**
 * returns a 2sxc-instance of the id or html-tag passed in
 * @param id
 * @param cbid
 * @returns {}
 */
function FindSxcInstance(id, cbid) {
    var $2sxc = window.$2sxc;
    $2sxc.log.add('FindSxcInstance(' + id + ',' + cbid);
    if (!$2sxc._controllers)
        throw new Error('$2sxc not initialized yet');
    // if it's a dom-element, use auto-find
    if (typeof id === 'object') {
        var idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }
    // if content-block is unknown, use id of module, and create an ID in the cache
    if (!cbid)
        cbid = id;
    var cacheKey = id + ':' + cbid;
    // either get the cached controller from previous calls, or create a new one
    if ($2sxc._controllers[cacheKey]) {
        $2sxc.log.add('Cache found for: ' + cacheKey);
        return $2sxc._controllers[cacheKey];
    }
    // not found, so also init the data-cache in case it's ever needed
    if (!$2sxc._data[cacheKey])
        $2sxc._data[cacheKey] = {};
    return ($2sxc._controllers[cacheKey]
        = new __WEBPACK_IMPORTED_MODULE_3__sxc_instance_sxc_instance_with_internals__["a" /* SxcInstanceWithInternals */](id, cbid, cacheKey, $2sxc));
}
/**
 * Build a SXC Controller for the page. Should only ever be executed once
 */
function buildSxcRoot() {
    var rootApiV2 = Object(__WEBPACK_IMPORTED_MODULE_4__sxc_root__["a" /* getRootPartsV2 */])();
    var urlManager = new __WEBPACK_IMPORTED_MODULE_1__tools_url_param_manager__["a" /* UrlParamManager */]();
    var debug = new __WEBPACK_IMPORTED_MODULE_5____["Debug"]();
    //  {
    //     load: (urlManager.get('debug') === 'true'),
    //     uncache: urlManager.get('sxcver'),
    // };
    var stats = new __WEBPACK_IMPORTED_MODULE_2__Stats__["a" /* Stats */]();
    var addOn = {
        _controllers: {},
        beta: {},
        _data: {},
        // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
        totalPopup: new __WEBPACK_IMPORTED_MODULE_0__tools_total_popup__["a" /* TotalPopup */](),
        urlParams: urlManager,
        // note: I would like to remove this from $2sxc, but it's currently
        // used both in the inpage-edit and in the dialogs
        // debug state which is needed in various places
        debug: debug,
        stats: stats,
        insights: function (partName, index, start, length) { return __WEBPACK_IMPORTED_MODULE_6__logging__["c" /* Insights */].show(partName, index, start, length); },
        _insights: __WEBPACK_IMPORTED_MODULE_6__logging__["c" /* Insights */],
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        parts: {
            getUrl: function (url, preventUnmin) {
                // let r = url;// (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
                if (debug.uncache && url.indexOf('sxcver') === -1)
                    return url + ((url.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return url;
            },
        },
        jq: function () { return $2sxc_jQSuperlight; },
    };
    var merged = addOn.jq().extend(FindSxcInstance, addOn, rootApiV2);
    merged.log.add('sxc controller built');
    console.log("$2sxc " + __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SxcVersion */] + " with insights-logging - see https://r.2sxc.org/insights");
    return merged; //FindSxcInstance as SxcRoot & SxcRootInternals;
}
function autoFind(domElement) {
    var containerTag = $2sxc_jQSuperlight(domElement).closest('.sc-content-block')[0];
    if (!containerTag)
        return null;
    var iid = containerTag.getAttribute('data-cb-instance');
    var cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid)
        return null;
    return [iid, cbid];
}


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stats; });
var Stats = /** @class */ (function () {
    function Stats() {
        this.watchDomChanges = 0;
    }
    return Stats;
}());



/***/ }),
/* 187 */
/***/ (function(module, exports) {



/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogCall; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(4);

var LogCall = /** @class */ (function () {
    function LogCall(log, name, callParams, message, data) {
        this.log = log;
        this.name = name;
        this.initialEntry = this.log._prepareEntry(name + '(' + (callParams || '') + ')');
        this.log._callDepthAdd(name);
        this.log._addEntry(this.initialEntry);
        if (typeof message === 'string')
            this.add(message);
        if (data)
            for (var key in data)
                this.data('initial:' + key, data[key]);
    }
    LogCall.prototype.add = function (message, data, behavior) {
        this.lastMessage = message;
        this.log.add(message, data);
        if (behavior)
            this.processExtraBehavior(behavior, message, data);
    };
    LogCall.prototype.onlyAddIfNew = function (message, behavior) {
        if (this.lastMessage !== message)
            this.add(message);
        if (behavior)
            this.processExtraBehavior(behavior, message, undefined);
    };
    /** Add data - but only if data logging is enabled */
    LogCall.prototype.data = function (message, data) {
        this.log.addData(message, data);
    };
    LogCall.prototype.done = function (message, behavior) {
        this.return(null, message || '👍', behavior);
    };
    LogCall.prototype.return = function (result, message, behavior) {
        message = message || '👍';
        this.initialEntry.result = message;
        this.log._callDepthRemove(this.name);
        // if we're in keep-data / debug mode, keep that
        this.initialEntry.data = result;
        // if we're in live-dump mode, then the entry was already dumped, show again
        if (this.log.liveDump || this.log._parentHasLiveDump)
            this.add(this.name + ' = ' + message, result);
        if (behavior)
            this.processExtraBehavior(behavior, message, result);
        return result;
    };
    /*
     * treat all extra output or errors
     * to allow setting a debug stop point when needed
     * then you can trace the stack-call to see where the error originated
     */
    LogCall.prototype.processExtraBehavior = function (behavior, message, data) {
        debugger;
        if (behavior === __WEBPACK_IMPORTED_MODULE_0____["f" /* LogEntryOptions */].log)
            console.log(message, data);
        if (behavior === __WEBPACK_IMPORTED_MODULE_0____["f" /* LogEntryOptions */].warn)
            console.warn(message, data);
        if (behavior === __WEBPACK_IMPORTED_MODULE_0____["f" /* LogEntryOptions */].error || behavior === __WEBPACK_IMPORTED_MODULE_0____["f" /* LogEntryOptions */].throw)
            console.error(message, data);
        if (behavior === __WEBPACK_IMPORTED_MODULE_0____["f" /* LogEntryOptions */].throw)
            throw message;
    };
    return LogCall;
}());



/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Entry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plumbing__ = __webpack_require__(73);

var Entry = /** @class */ (function () {
    function Entry(log, message, depth, 
    /** A timestamp for this entry to better see sequences of things happening */
    time, data) {
        var _this = this;
        this.log = log;
        this.message = message;
        this.depth = depth;
        this.time = time;
        this.source = function () { return _this.log.fullIdentifier(); };
        if (data) {
            if (data instanceof jQuery) {
                var jq = data;
                this.data = {
                    isJQuery: true,
                    original: jq,
                    html: jq.length && jq[0].outerHTML,
                };
            }
            else
                this.data = data;
        }
    }
    Object.defineProperty(Entry.prototype, "data", {
        /** Data which is logged - if data-logging is enabled */
        get: function () {
            return this._data;
        },
        set: function (data) {
            if (data === undefined)
                return;
            if (this.log.logData())
                this._data = __WEBPACK_IMPORTED_MODULE_0__plumbing__["Obj"].DeepClone(data, true);
        },
        enumerable: true,
        configurable: true
    });
    return Entry;
}());



/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Obj; });
/**
 * Object manipulator helpers
 */
var Obj = /** @class */ (function () {
    function Obj() {
    }
    /**
     * This is the same as Object.assign, but type-safe.
     * Use it as a replacetment for Object.Assign(this, ... ) in constructors
     */
    Obj.TypeSafeAssign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.reduce(function (result, current) {
            return Object.keys(current).reduce(function (target, key) {
                target[key] = current[key];
                return target;
            }, result);
        }, args[0]);
    };
    Obj.DeepClone = function (original, ignoreCircular) {
        if (ignoreCircular === void 0) { ignoreCircular = false; }
        if (original === undefined || original === null)
            return original;
        var str = ignoreCircular ? JSON.stringify(original, getCircularReplacer) : JSON.stringify(original);
        if (str === undefined || str === null)
            return original;
        return JSON.parse(str);
    };
    return Obj;
}());

var getCircularReplacer = function () {
    var seen = new WeakSet();
    return function (_, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};


/***/ }),
/* 191 */
/***/ (function(module, exports) {



/***/ }),
/* 192 */
/***/ (function(module, exports) {



/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Insights; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var msgIntro = 'This is the $2sxc JS Insights - see https://r.2sxc.org/insights \n'
    + 'Add ?debug=true to the url to log more data. \n'
    + 'Copy/paste code lines below to see details. \n'
    + '----------------------------------------------------------------------\n';
var InsightsSingleton = /** @class */ (function (_super) {
    __extends(InsightsSingleton, _super);
    function InsightsSingleton() {
        var _this = _super.call(this, 'Sys.Insght') || this;
        _this.history = {};
        _this.add('system', 'insights', _this.log);
        _this.log.add("this log is usually empty, as it's just a helper tool");
        return _this;
    }
    InsightsSingleton.prototype.add = function (setName, logName, log) {
        if (!(setName in this.history))
            this.history[setName] = new InsightsLogSet(setName);
        this.history[setName].logs.push({ key: logName, log: log });
    };
    InsightsSingleton.prototype.show = function (partName, index, start, length) {
        // if nothing specified, list what to do to see inner parts
        if (!partName) {
            var keys = Object.keys(this.history);
            console.log("" + msgIntro + keys.length + " insights-sections found: \n" + keys.map(function (p) { return "$2sxc.insights('" + p + "');"; }).join('\n'));
            return;
        }
        // partName found, check if it exists
        var part = this.history[partName];
        if (!part) {
            console.error("part '" + partName + "' not found");
            return;
        }
        // We have a partName, but no index - show list and how to get details
        if (index === undefined) {
            var count_1 = 0;
            var logNames = part.logs
                .map(function (s) { return "$2sxc.insights('" + partName + "', " + count_1++ + "); - will show for '" + s.key + "'"; })
                .join('\n');
            console.log("'" + partName + "' contains " + part.logs.length + " entries. Copy/paste the code to to see the logs: \n" + logNames);
            return;
        }
        // verify the entry exists
        var logSet = part.logs.length >= index && part.logs[index];
        if (!logSet) {
            console.error("index " + index + " not found in part '" + partName + "'");
            return;
        }
        if (!logSet.log) {
            console.error("found index " + index + " on part '" + partName + "' but it has no logs");
            return;
        }
        console.log("Will dump the log for " + partName + "[" + index + "] '" + logSet.key + "'");
        var autoLimit = false;
        if (start === undefined) {
            autoLimit = true;
            start = 0;
            length = 25;
        }
        logSet.log.dumpList(start || 0, length);
        if (autoLimit && logSet.log.entries.length > length)
            console.warn("Only showing " + length + " of " + logSet.log.entries.length + " logs. To show all, add start param '..., 0)' or start/length '..., 0, 100)'");
    };
    return InsightsSingleton;
}(__WEBPACK_IMPORTED_MODULE_0____["b" /* HasLog */]));
// tslint:disable-next-line: max-classes-per-file
var InsightsLogSet = /** @class */ (function () {
    function InsightsLogSet(name) {
        this.name = name;
        this.logs = [];
    }
    return InsightsLogSet;
}());
// ensure it's only created once
// this is important, because the inpage code also uses this class
// and would otherwise create the object separately
var singleton = window.$2sxc && window.$2sxc._insights // try to load existing
    || new InsightsSingleton(); // otherwise create new
var Insights = singleton;


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdApp", function() { return CmdApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(1);

var CmdApp = 'app';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdApp, 'App', 'settings', true, false, {
    showCondition: function (context) {
        return context.user.canDesign;
    },
});


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts_content_block__ = __webpack_require__(164);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_0__parts_content_block__["AttrJsonContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parts_content_group__ = __webpack_require__(165);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentGroup", function() { return __WEBPACK_IMPORTED_MODULE_1__parts_content_group__["AttrJsonContentGroup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_context_root__ = __webpack_require__(163);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEditContext", function() { return __WEBPACK_IMPORTED_MODULE_2__edit_context_root__["AttrJsonEditContext"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parts_environment__ = __webpack_require__(166);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEnvironment", function() { return __WEBPACK_IMPORTED_MODULE_3__parts_environment__["AttrJsonEnvironment"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parts_error__ = __webpack_require__(167);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonError", function() { return __WEBPACK_IMPORTED_MODULE_4__parts_error__["AttrJsonError"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parts_language__ = __webpack_require__(168);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonLanguage", function() { return __WEBPACK_IMPORTED_MODULE_5__parts_language__["AttrJsonLanguage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parts_parameters_entity__ = __webpack_require__(169);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEntity", function() { return __WEBPACK_IMPORTED_MODULE_6__parts_parameters_entity__["AttrJsonEntity"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parts_ui__ = __webpack_require__(170);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUi", function() { return __WEBPACK_IMPORTED_MODULE_7__parts_ui__["AttrJsonUi"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parts_user__ = __webpack_require__(171);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUser", function() { return __WEBPACK_IMPORTED_MODULE_8__parts_user__["AttrJsonUser"]; });











/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DnnActionMenu", function() { return DnnActionMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_command_layout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
var DnnActionMenu = /** @class */ (function (_super) {
    __extends(DnnActionMenu, _super);
    function DnnActionMenu(moduleId) {
        var _this = _super.call(this, 'Dnn.Menu', null, "modId: " + moduleId) || this;
        _this.changeLayoutOrContent = function () { _this.run(__WEBPACK_IMPORTED_MODULE_0__commands_command_layout__["CmdLayout"]); };
        _this.addItem = function () { _this.run('add', { useModuleList: true, sortOrder: 0 }); };
        _this.edit = function () { _this.run('edit', { useModuleList: true, sortOrder: 0 }); };
        _this.adminApp = function () { _this.run('app'); };
        _this.adminZone = function () { _this.run('zone'); };
        _this.develop = function () { _this.run('template-develop'); };
        __WEBPACK_IMPORTED_MODULE_3__logging__["Insights"].add('dnn-menu', "mod: " + moduleId, _this.log);
        _this.sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(moduleId);
        _this.run = _this.sxc.manage.run;
        return _this;
    }
    return DnnActionMenu;
}(__WEBPACK_IMPORTED_MODULE_3__logging__["HasLog"]));

__WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__["windowInPage"].$2sxcActionMenuMapper = function (moduleId) {
    return new DnnActionMenu(moduleId);
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The following script fixes a bug in DNN 08.00.04
// the bug tries to detect a module-ID based on classes in a tag,
// but uses a bad regex and captures the number 2 on all 2sxc-modules
// instead of the real id
// this patch changes the order of the className of 2sxc modules when
// they are accessed through '$.fn.attr'
// 'DnnModule-2sxc DnnModule-xxx' -> DNN thinks the mod id is 2 (false)
// 'DnnModule-xxx DnnModule-2sxc' -> DNN thinks the mod id is xxx (correct)
// documented here https://github.com/2sic/2sxc/issues/986
/**
 * Fix drag-drop functionality in dnn 08.00.04 - it has an incorrect regex
 */

(function () {
    var fn = $.fn.attr;
    $.fn.attr = function () {
        var val = fn.apply(this, arguments);
        if (arguments[0] !== 'class' || typeof val !== 'string' || val.search('DnnModule-2sxc ') === -1)
            return val;
        return val.replace('DnnModule-2sxc ', '') + ' DnnModule-2sxc';
    };
})();


/***/ }),
/* 198 */
/***/ (function(module, exports) {



/***/ }),
/* 199 */
/***/ (function(module, exports) {

//
// Note: this interface is copied/shared between this and angular quick-edit
//


/***/ }),
/* 200 */
/***/ (function(module, exports) {

//
// Note: this interface is copied/shared between this and angular quick-edit
//


/***/ }),
/* 201 */
/***/ (function(module, exports) {



/***/ }),
/* 202 */
/***/ (function(module, exports) {



/***/ }),
/* 203 */
/***/ (function(module, exports) {

// // https://stackoverflow.com/questions/38860161/using-typescript-and-object-assign-gives-me-an-error-property-assign-does-no
// interface ObjectConstructor {
//   assign(...objects: Object[]): Object;
// }


/***/ }),
/* 204 */
/***/ (function(module, exports) {

// //
// // Note: this interface is copied/shared between this and angular quick-edit
// //
// /**
//  * user information, basically so the UI knows user capabilities
//  */
// export interface UserAbilites {
//   canDesign: boolean;
//   canDevelop: boolean;
// }


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceConfig", function() { return InstanceConfig; });
/**
 * used to build instance config
 */
var InstanceConfig = /** @class */ (function () {
    function InstanceConfig() {
    }
    //constructor(editContext: DataEditContext) {
    //  const ce = editContext.Environment;
    //  const cg = editContext.ContentGroup;
    //  const cb = editContext.ContentBlock;
    //  this.portalId = ce.WebsiteId;
    //  this.tabId = ce.PageId;
    //  this.moduleId = ce.InstanceId;
    //  this.version = ce.SxcVersion;
    //  this.contentGroupId = cg.Guid;
    //  this.cbIsEntity = cb.IsEntity;
    //  this.cbId = cb.Id;
    //  this.appPath = cg.AppUrl;
    //  this.isList = cg.IsList;
    //}
    InstanceConfig.fromContext = function (contextOfButton) {
        var config = new InstanceConfig();
        config.portalId = contextOfButton.tenant.id;
        config.tabId = contextOfButton.page.id;
        config.moduleId = contextOfButton.instance.id;
        config.version = contextOfButton.instance.sxcVersion;
        config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
        config.cbIsEntity = contextOfButton.contentBlock.isEntity;
        config.cbId = contextOfButton.contentBlock.id;
        config.appPath = contextOfButton.app.appPath;
        config.isList = contextOfButton.contentBlock.isList;
        return config;
    };
    return InstanceConfig;
}());



/***/ }),
/* 206 */
/***/ (function(module, exports) {

// /**
//  * Object manipulator helpers
//  */
// export class Obj {
//     /**
//      * This is the same as Object.assign, but type-safe.
//      * Use it as a replacetment for Object.Assign(this, ... ) in constructors
//      */
//     static TypeSafeAssign <T, K extends keyof T>(...args: T[]) {
//         args.reduce( (result, current) =>
//             (Object.keys(current) as K[]).reduce((target, key) => {
//                 target[key] = current[key];
//                 return target;
//             }, result)
//         , args[0]);
//     }
//     static DeepClone<T>(original: T): T {
//         return JSON.parse(JSON.stringify(original)) as T;
//     }
// }


/***/ }),
/* 207 */
/***/ (function(module, exports) {



/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemUpgrader", function() { return SystemUpgrader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__ = __webpack_require__(9);
/*

    TODO: 2dm must verify this works, my change could have broken something
*/


var SystemUpgrader = /** @class */ (function () {
    function SystemUpgrader() {
    }
    // upgrade command - started when an error contains a link to start this
    SystemUpgrader.prototype.finishUpgrade = function (domElement) {
        var mc = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(domElement);
        mc.webApi.get('view/module/finishinstallation')
            .done(function () {
            alert('Upgrade ok, restarting the CMS and reloading...');
            location.reload();
        });
        alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
    };
    return SystemUpgrader;
}());

/** this enhances the $2sxc client controller with stuff only needed when logged in */
if (__WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].$2sxc && !__WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].$2sxc.system) {
    __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].$2sxc.system = new SystemUpgrader();
}


/***/ }),
/* 209 */
/***/ (function(module, exports) {

/*
 * take various common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
 * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
 * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
 * button (detected by "command"): { command: ""|[], icon: "..", ... }
 * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
*/
/*
* just a command (detected by "action"): { entityId: 17, action: "edit" }
*/


/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(2);

// prevent propagation of the click (if menu was clicked)
$(__WEBPACK_IMPORTED_MODULE_0__constants__["C"].IDs.sel.scMenu).click(function (e) { return e.stopPropagation(); });


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// tslint:disable-next-line: no-var-requires
var Shake = __webpack_require__(212);
// ReSharper disable once InconsistentNaming
// enable shake detection on all toolbars
$(function () {
    // this will add a css-class to auto-show all toolbars (or remove it again)
    function toggleAllToolbars() {
        $(document.body).toggleClass('sc-tb-show-all');
    }
    var shake = new Shake({ callback: toggleAllToolbars });
    // start shake-event monitoring, which will then generate a window-event
    shake.start();
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Author: Alex Gibson
 * https://github.com/alexgibson/shake.js
 * License: MIT license
 */

(function(global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return factory(global, global.document);
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));


/***/ })
/******/ ]);
//# sourceMappingURL=https://sources.2sxc.org/10.28.00/./inpage/inpage.js.map