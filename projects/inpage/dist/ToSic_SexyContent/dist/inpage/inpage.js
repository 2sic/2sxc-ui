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
/******/ 	return __webpack_require__(__webpack_require__.s = 161);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_code__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_code___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__command_code__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__command_code__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__command_code__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__command__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return __WEBPACK_IMPORTED_MODULE_1__command__["Command"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__command_params__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__command_params___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__command_params__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_2__command_params__) if(["Command","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_2__command_params__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Commands", function() { return __WEBPACK_IMPORTED_MODULE_3__commands__["Commands"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_cms_engine__ = __webpack_require__(53);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmsEngine", function() { return __WEBPACK_IMPORTED_MODULE_4__engine_cms_engine__["CmsEngine"]; });
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__command_code__) if(["Command","Commands","CmsEngine","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__command_code__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_for__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__metadata_for___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__metadata_for__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_5__metadata_for__) if(["Command","Commands","CmsEngine","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_5__metadata_for__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_sxc_instance_engine__ = __webpack_require__(104);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceEngine", function() { return __WEBPACK_IMPORTED_MODULE_6__engine_sxc_instance_engine__["SxcInstanceEngine"]; });










/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SxcEdit", function() { return SxcEdit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2sxc_src__ = __webpack_require__(54);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__specs__ = __webpack_require__(68);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Specs", function() { return __WEBPACK_IMPORTED_MODULE_0__specs__["Specs"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qe_content_block__ = __webpack_require__(69);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QeContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_1__qe_content_block__["QeContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cmds_strategy_factory__ = __webpack_require__(40);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdsStrategyFactory", function() { return __WEBPACK_IMPORTED_MODULE_2__cmds_strategy_factory__["CmdsStrategyFactory"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__position_coordinates__ = __webpack_require__(70);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PositionCoordinates", function() { return __WEBPACK_IMPORTED_MODULE_3__position_coordinates__["PositionCoordinates"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__delete__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__delete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__delete__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__delete__) if(["Specs","QeContentBlock","CmdsStrategyFactory","PositionCoordinates","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_4__delete__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__qe_module__ = __webpack_require__(72);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QeModule", function() { return __WEBPACK_IMPORTED_MODULE_5__qe_module__["QeModule"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__qe_module_manage__ = __webpack_require__(73);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QeModuleManager", function() { return __WEBPACK_IMPORTED_MODULE_6__qe_module_manage__["QeModuleManager"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "modManage", function() { return __WEBPACK_IMPORTED_MODULE_6__qe_module_manage__["modManage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__positioning__ = __webpack_require__(74);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Positioning", function() { return __WEBPACK_IMPORTED_MODULE_7__positioning__["Positioning"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__quick_e__ = __webpack_require__(24);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickE", function() { return __WEBPACK_IMPORTED_MODULE_8__quick_e__["QuickE"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__quick_e_clipboard__ = __webpack_require__(75);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QuickEClipboard", function() { return __WEBPACK_IMPORTED_MODULE_9__quick_e_clipboard__["QuickEClipboard"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__selectors_instance__ = __webpack_require__(76);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QeSelectors", function() { return __WEBPACK_IMPORTED_MODULE_10__selectors_instance__["QeSelectors"]; });
// must come first because we're still relying on build order













/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleButton", function() { return ContextBundleButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_2sxc_consts__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_bundle_toolbar__ = __webpack_require__(28);
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




var ContextBundleButton = /** @class */ (function (_super) {
    __extends(ContextBundleButton, _super);
    function ContextBundleButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Primary API to get the context (context is cached)
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    ContextBundleButton.findContext = function (tagOrSxc, cbid) {
        var sxc;
        var containerTag = null;
        if (__WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].is(tagOrSxc)) { // it is SxcInstance
            sxc = tagOrSxc;
        }
        else if (typeof tagOrSxc === 'number') { // it is number
            sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(tagOrSxc, cbid);
        }
        else { // it is HTMLElement
            sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(tagOrSxc);
            containerTag = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getContainerTag(tagOrSxc);
        }
        var contextOfButton = ContextBundleButton.getContextInstance(sxc, containerTag);
        contextOfButton.sxc = sxc;
        return contextOfButton;
    };
    /**
     * Create copy of context, so it can be modified before use
     * @param htmlElement or Id (moduleId)
     * @param cbid
     */
    ContextBundleButton.contextCopy = function (htmlElementOrId, cbid) {
        var contextOfButton = ContextBundleButton.findContext(htmlElementOrId, cbid);
        // set sxc to null because of cyclic reference, so we can serialize it
        contextOfButton.sxc = null;
        // make a copy
        var copyOfContext = JSON.parse(JSON.stringify(contextOfButton));
        // bring sxc back to context
        contextOfButton.sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(htmlElementOrId);
        return copyOfContext;
    };
    /**
     * Create new context
     * @param sxc
     * @param htmlElement
     */
    ContextBundleButton.getContextInstance = function (sxc, htmlElement) {
        var editContext = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getEditContext(sxc, htmlElement);
        return ContextBundleButton.createContextFromEditContext(editContext);
    };
    /**
     * create part of context object (it is not cached)
     * @param editCtx
     */
    ContextBundleButton.createContextFromEditContext = function (editCtx) {
        var btnCtx = new ContextBundleButton();
        // *** ContextOf ***
        // this will be everything about the current system, like system / api -paths etc.
        btnCtx.system = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfSystem"]();
        if (editCtx.error) {
            btnCtx.system.error = editCtx.error.type;
        }
        // empty
        // this will be something about the current tenant(the dnn portal)
        btnCtx.tenant = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfTenant"]();
        if (editCtx.Environment) {
            btnCtx.tenant.id = editCtx.Environment.WebsiteId; // InstanceConfig.portalId
            btnCtx.tenant.url = editCtx.Environment.WebsiteUrl; // NgDialogParams.portalroot
        }
        // things about the user
        btnCtx.user = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfUser"]();
        if (editCtx.User) {
            btnCtx.user.canDesign = editCtx.User.CanDesign;
            btnCtx.user.canDevelop = editCtx.User.CanDevelop;
        }
        // *** ContextOfPage ***
        // this will be information related to the current page
        btnCtx.page = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfPage"]();
        if (editCtx.Environment) {
            btnCtx.page.id = editCtx.Environment.PageId; // InstanceConfig.tabId, NgDialogParams.tid
            btnCtx.page.url = editCtx.Environment.PageUrl;
        }
        // *** ContextOfInstance ***
        // information related to the current DNN module, incl.instanceId, etc.
        btnCtx.instance = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfInstance"]();
        if (editCtx.Environment) {
            btnCtx.instance.id = editCtx.Environment.InstanceId; // InstanceConfig.moduleId, NgDialogParams.mid
            btnCtx.instance.isEditable = editCtx.Environment.IsEditable;
            // sxc
            btnCtx.instance.sxcVersion = editCtx.Environment.SxcVersion;
            btnCtx.instance.parameters = editCtx.Environment.parameters;
            btnCtx.instance.sxcRootUrl = editCtx.Environment.SxcRootUrl; // NgDialogParams.websiteroot
        }
        if (editCtx.ContentBlock) {
            btnCtx.instance.allowPublish = editCtx.ContentBlock.VersioningRequirements === __WEBPACK_IMPORTED_MODULE_2__settings_2sxc_consts__["IDs"].publishAllowed; // NgDialogParams.publishing
        }
        // this will be about the current app, settings of the app, app - paths, etc.
        btnCtx.app = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfApp"]();
        if (editCtx.ContentGroup) {
            btnCtx.app.id = editCtx.ContentGroup.AppId; // or NgDialogParams.appId
            btnCtx.app.isContent = editCtx.ContentGroup.IsContent;
            btnCtx.app.resourcesId = editCtx.ContentGroup.AppResourcesId;
            btnCtx.app.settingsId = editCtx.ContentGroup.AppSettingsId;
            btnCtx.app.appPath = editCtx.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
            btnCtx.app.hasContent = editCtx.ContentGroup.HasContent;
            btnCtx.app.supportsAjax = editCtx.ContentGroup.SupportsAjax;
            btnCtx.app.zoneId = editCtx.ContentGroup.ZoneId; // or NgDialogParams.zoneId
        }
        if (editCtx.Language) {
            // languages
            btnCtx.app.currentLanguage = editCtx.Language.Current; // NgDialogParams.lang
            btnCtx.app.primaryLanguage = editCtx.Language.Primary; // NgDialogParams.langpri
            btnCtx.app.allLanguages = editCtx.Language.All; // or NgDialogParams.langs
        }
        // ensure that the UI will load the correct assets to enable editing
        btnCtx.ui = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfUi"]();
        if (editCtx.Ui) {
            btnCtx.ui.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
            if (editCtx.Ui.Form)
                btnCtx.ui.form = editCtx.Ui.Form; // decide which dialog opens, eg ng8
        }
        // *** ContextOfContentBlock ***
        // information related to the current contentBlock
        btnCtx.contentBlock = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfContentBlock"]();
        if (editCtx.ContentBlock) {
            btnCtx.contentBlock.id = editCtx.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
            btnCtx.contentBlock.isEntity = editCtx.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
            btnCtx.contentBlock.showTemplatePicker = editCtx.ContentBlock.ShowTemplatePicker;
            btnCtx.contentBlock.versioningRequirements = editCtx.ContentBlock.VersioningRequirements;
            btnCtx.contentBlock.parentFieldName = editCtx.ContentBlock.ParentFieldName;
            btnCtx.contentBlock.parentFieldSortOrder = editCtx.ContentBlock.ParentFieldSortOrder;
            btnCtx.contentBlock.partOfPage = editCtx.ContentBlock.PartOfPage; // NgDialogParams.partOfPage
        }
        if (editCtx.ContentGroup) {
            btnCtx.contentBlock.isCreated = editCtx.ContentGroup.IsCreated;
            btnCtx.contentBlock.isList = editCtx.ContentGroup.IsList; // ex: InstanceConfig.isList
            btnCtx.contentBlock.queryId = editCtx.ContentGroup.QueryId;
            btnCtx.contentBlock.templateId = editCtx.ContentGroup.TemplateId;
            btnCtx.contentBlock.contentTypeId = editCtx.ContentGroup.ContentTypeName;
            btnCtx.contentBlock.contentGroupId = editCtx.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
        }
        // *** ContextOfItem ***
        // information about the current item
        btnCtx.item = new __WEBPACK_IMPORTED_MODULE_0____["ContextOfItem"]();
        // empty
        // *** ContextOfToolbar ***
        // fill externally
        // *** ContextOfButton ***
        // fill externally
        return btnCtx;
    };
    return ContextBundleButton;
}(__WEBPACK_IMPORTED_MODULE_3__context_bundle_toolbar__["ContextBundleToolbar"]));



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Commands", function() { return Commands; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command__ = __webpack_require__(9);

/** Singleton Catalog of all commands */
var CommandsCatalog = /** @class */ (function () {
    function CommandsCatalog() {
        var _this = this;
        this.commandList = [];
        this.list = {}; // hash - table of action definitions, to be used a list()["action - name"]
        this.get = function (name) { return _this.list[name]; }; // a specific action definition
    }
    CommandsCatalog.prototype.add = function (name, translateKey, icon, uiOnly, partOfPage, more) {
        return this.addDef(__WEBPACK_IMPORTED_MODULE_0__command__["Command"].build(name, translateKey, icon, uiOnly, partOfPage, more));
    };
    CommandsCatalog.prototype.addDef = function (def) {
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
    return CommandsCatalog;
}());
// only create the catalog once, then use that everywhere
var Commands = new CommandsCatalog();


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowInPage", function() { return windowInPage; });
// ReSharper restore InconsistentNaming
var windowInPage = window;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_command__ = __webpack_require__(43);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonCommand", function() { return __WEBPACK_IMPORTED_MODULE_0__button_command__["ButtonCommand"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button__ = __webpack_require__(94);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return __WEBPACK_IMPORTED_MODULE_1__button__["Button"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_group__ = __webpack_require__(97);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return __WEBPACK_IMPORTED_MODULE_2__button_group__["ButtonGroup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar__ = __webpack_require__(98);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return __WEBPACK_IMPORTED_MODULE_3__toolbar__["Toolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar_settings__ = __webpack_require__(99);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettings", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar_settings__["ToolbarSettings"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettingsDefaults", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar_settings__["ToolbarSettingsDefaults"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettingsForEmpty", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar_settings__["ToolbarSettingsForEmpty"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarEmpty", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar_settings__["ToolbarEmpty"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__button_modifier__ = __webpack_require__(100);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonModifier", function() { return __WEBPACK_IMPORTED_MODULE_5__button_modifier__["ButtonModifier"]; });








/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
function translate(key) {
    return ($.t && $.t(key)) || key;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__has_log__ = __webpack_require__(11);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_0__has_log__["HasLog"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ihas_log__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ihas_log___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ihas_log__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__ihas_log__) if(["HasLog","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__ihas_log__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log__ = __webpack_require__(16);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return __WEBPACK_IMPORTED_MODULE_2__log__["Log"]; });





/***/ }),
/* 9 */
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
        //
        // stv: v1 code
        var partialButtonConfig = __assign({ icon: function (context) { return "icon-sxc-" + icon; }, title: function (context) { return "Toolbar." + translateKey; }, uiActionOnly: function (context) { return uiOnly; }, partOfPage: function (context) { return partOfPage; } }, more);
        // O.bject.assign(partialButtonConfig, more);
        this.buttonConfig = partialButtonConfig;
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toolbar", function() { return toolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return cb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return Attributes; });
/** Toolbar constants */
var toolbar = {
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
/** ContentBlock constants  */
var cb = {
    classes: {
        name: 'sc-content-block',
    },
    selectors: {
        ofName: '.sc-content-block',
    },
};
var Attributes = {
    InstanceId: 'data-cb-instance',
    Context: 'data-edit-context',
    ContentBlockId: 'data-cb-id',
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HasLog", function() { return HasLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log__ = __webpack_require__(16);

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
        this.logId = 'unknwn';
        this.linkLog = function (parentLog) { return _this.log.linkLog(parentLog); };
        this.initLogInternal(logName, parentLog, initialMessage);
    }
    HasLog.prototype.initLogInternal = function (name, parentLog, initialMessage) {
        if (this.log == null)
            // standard & most common case: just create log
            this.log = new __WEBPACK_IMPORTED_MODULE_0__log__["Log"](name, parentLog, initialMessage);
        else {
            // late-init case, where the log was already created - just reconfig keeping what was in it
            this.log.rename(name);
            this.linkLog(parentLog);
            if (initialMessage != null)
                this.log.add(initialMessage);
        }
    };
    return HasLog;
}());



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return Actions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contentBlock_render__ = __webpack_require__(13);

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @class ActionsCatalog
 */
var ContentListActions = /** @class */ (function () {
    function ContentListActions() {
    }
    /**
     * add an item to the list at this position
     * @param {ContextBundleButton} context
     * @param {number} sortOrder
     */
    ContentListActions.prototype.addItem = function (context, sortOrder) {
        return getAndReload(context, 'view/module/additem', { sortOrder: sortOrder });
    };
    /**
     * remove an item from a list, then reload
     * @param {ContextBundleButton} context
     * @param {number} sortOrder
     */
    ContentListActions.prototype.removeFromList = function (context, sortOrder) {
        return getAndReload(context, 'view/module/removefromlist', { sortOrder: sortOrder });
    };
    /**
     * change the order of an item in a list, then reload
     * @param {ContextBundleButton} context
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
     * @param {ContextBundleButton} context
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
     * @param {ContextBundleButton} context
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
 * @param {ContextBundleButton} context
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderer", function() { return renderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_block_editor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_content_block__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_edit_quick_e__ = __webpack_require__(24);






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
     * @param {ContextBundleButton} context
     * @param {string} newContent
     * @returns {} nothing
     */
    Renderer.prototype.showMessage = function (context, newContent) {
        $(__WEBPACK_IMPORTED_MODULE_4__interfaces_sxc_instance_editable__["SxcEdit"].getTag(context.sxc)).html(newContent);
    };
    /**
     * this one assumes a replace / change has already happened, but now must be finalized...
     * @param {ContextBundleButton} context
     * @param {boolean} forceAjax
     * @param {boolean} preview
     */
    Renderer.prototype.reloadAndReInitialize = function (context, forceAjax, preview) {
        // if ajax is not supported, we must reload the whole page
        if (!forceAjax && !context.app.supportsAjax) {
            __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].location.reload();
            return Promise.resolve();
        }
        return this.ajaxLoad(context, __WEBPACK_IMPORTED_MODULE_3__main_content_block__["MainContentBlock"].cUseExistingTemplate, preview)
            .then(function (result) {
            // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
            if (__WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
                try {
                    __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__["windowInPage"].dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
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
     * @param {ContextBundleButton} context
     * @param {number} alternateTemplateId
     * @param {boolean} justPreview
     */
    Renderer.prototype.ajaxLoad = function (context, alternateTemplateId, justPreview) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2__content_block_editor__["ContentBlockEditor"].getPreviewWithTemplate(context, alternateTemplateId)
            .then(function (result) {
            _this.replaceContentBlock(context, result, justPreview);
        })
            .then(function () {
            __WEBPACK_IMPORTED_MODULE_5__quick_edit_quick_e__["QuickE"].reset();
        }); // reset quick-edit, because the config could have changed
    };
    /**
     * ajax update/replace the content of the content-block
     * optionally also initialize the toolbar (if not just preview)
     * @param {ContextBundleButton} context
     * @param {string} newContent
     * @param {boolean} justPreview
     */
    Renderer.prototype.replaceContentBlock = function (context, newContent, justPreview) {
        try {
            var newDom = $(newContent);
            // Must disable toolbar before we attach to DOM
            if (justPreview)
                __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].disable(newDom);
            $(__WEBPACK_IMPORTED_MODULE_4__interfaces_sxc_instance_editable__["SxcEdit"].getTag(context.sxc)).replaceWith(newDom);
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ToSxcName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SxcVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiExtensionPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MetaHeaderJsApi; });
var ToSxcName = "2sxc";
var SxcVersion = "10.25.01";
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextForLists", function() { return ContextForLists; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);

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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entry__ = __webpack_require__(77);

var maxScopeLen = 3;
var maxNameLen = 6;
var liveDump = true;
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
    Log.prototype.add = function (message) {
        var messageText;
        if (message instanceof Function) {
            try {
                messageText = (message()).toString();
                message = null; // maybe it is unnecessary, but added to be safe as possible that arrow function parameter will be garbage collected
            }
            catch (e) {
                messageText = 'undefined';
            }
        }
        else {
            messageText = message.toString();
        }
        var entry = new __WEBPACK_IMPORTED_MODULE_0__entry__["Entry"](this, messageText);
        this.addEntry(entry);
        if (liveDump)
            console.log(this.dump(undefined, undefined, undefined, entry));
        return messageText;
    };
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     */
    Log.prototype.dump = function (separator, start, end, one) {
        if (separator === void 0) { separator = ' - '; }
        if (start === void 0) { start = ''; }
        if (end === void 0) { end = ''; }
        if (one === void 0) { one = null; }
        var lg = start;
        var dumpOne = function (e) { return lg += e.source() + separator + e.message + '\n'; };
        if (one)
            dumpOne(one);
        else
            this.entries.forEach(dumpOne);
        lg += end;
        return lg;
    };
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     */
    Log.prototype.addEntry = function (entry) {
        this.entries.push(entry);
        if (this.parent)
            this.parent.addEntry(entry);
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugConfig", function() { return DebugConfig; });
// ReSharper disable once InconsistentNaming
var DebugConfig = {
    cms: {
        autoDump: false,
        run: true,
    },
    qDialog: {
        showHide: true,
    },
    bootstrap: {
        initInstance: true,
    },
    state: {
        change: true,
        get: false,
    },
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return ContextBundleInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundle_page__ = __webpack_require__(30);
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

var ContextBundleInstance = /** @class */ (function (_super) {
    __extends(ContextBundleInstance, _super);
    function ContextBundleInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextBundleInstance.is = function (thing) {
        var maybeButton = thing;
        return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
    };
    return ContextBundleInstance;
}(__WEBPACK_IMPORTED_MODULE_0__context_bundle_page__["ContextBundlePage"]));



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolbar_manager__ = __webpack_require__(34);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarManager", function() { return __WEBPACK_IMPORTED_MODULE_0__toolbar_manager__["ToolbarManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_toolbars_tag_toolbar__ = __webpack_require__(45);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagToolbar", function() { return __WEBPACK_IMPORTED_MODULE_1__tag_toolbars_tag_toolbar__["TagToolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag_toolbars_tag_toolbar_manager__ = __webpack_require__(46);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagToolbarManager", function() { return __WEBPACK_IMPORTED_MODULE_2__tag_toolbars_tag_toolbar_manager__["TagToolbarManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render_toolbar_renderer__ = __webpack_require__(35);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarRenderer", function() { return __WEBPACK_IMPORTED_MODULE_3__render_toolbar_renderer__["ToolbarRenderer"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initialize_toolbar_init_config__ = __webpack_require__(48);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarInitConfig", function() { return __WEBPACK_IMPORTED_MODULE_4__initialize_toolbar_init_config__["ToolbarInitConfig"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__initialize_toolbar_finder_and_initializer__ = __webpack_require__(110);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigFinderAndInitializer", function() { return __WEBPACK_IMPORTED_MODULE_5__initialize_toolbar_finder_and_initializer__["ToolbarConfigFinderAndInitializer"]; });








/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_page_button__ = __webpack_require__(49);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InPageButtonJson", function() { return __WEBPACK_IMPORTED_MODULE_0__in_page_button__["InPageButtonJson"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__in_page_command__ = __webpack_require__(111);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InPageCommandJson", function() { return __WEBPACK_IMPORTED_MODULE_1__in_page_command__["InPageCommandJson"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_config_loader__ = __webpack_require__(50);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_2__button_config_loader__["ButtonConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__command_config_loader__ = __webpack_require__(113);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CommandConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_3__command_config_loader__["CommandConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__group_config_loader__ = __webpack_require__(114);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ButtonGroupConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_4__group_config_loader__["ButtonGroupConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toolbar_config_loader__ = __webpack_require__(115);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoader", function() { return __WEBPACK_IMPORTED_MODULE_5__toolbar_config_loader__["ToolbarConfigLoader"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__toolbar_wip__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__toolbar_wip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__toolbar_wip__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_6__toolbar_wip__) if(["InPageButtonJson","InPageCommandJson","ButtonConfigLoader","CommandConfigLoader","ButtonGroupConfigLoader","ToolbarConfigLoader","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_6__toolbar_wip__[key]; }) }(__WEBPACK_IMPORT_KEY__));









/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_default__ = __webpack_require__(116);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateDefault", function() { return __WEBPACK_IMPORTED_MODULE_0__template_default__["ToolbarTemplateDefault"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_listitem__ = __webpack_require__(117);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateInListRight", function() { return __WEBPACK_IMPORTED_MODULE_1__template_listitem__["ToolbarTemplateInListRight"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_template_manager__ = __webpack_require__(118);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateManager", function() { return __WEBPACK_IMPORTED_MODULE_2__toolbar_template_manager__["ToolbarTemplateManager"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar_template_toolbar__ = __webpack_require__(119);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplate", function() { return __WEBPACK_IMPORTED_MODULE_3__toolbar_template_toolbar__["ToolbarTemplate"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar_templaten_button_group__ = __webpack_require__(120);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateButtonGroup", function() { return __WEBPACK_IMPORTED_MODULE_4__toolbar_templaten_button_group__["ToolbarTemplateButtonGroup"]; });







/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTools", function() { return HtmlTools; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);


var HtmlTools = /** @class */ (function () {
    function HtmlTools() {
    }
    HtmlTools.disable = function (tag) {
        var jtag = $(tag);
        jtag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.disable, 'true');
    };
    HtmlTools.isDisabled = function (sxc) {
        var tag = $(__WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxc));
        return !!tag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.disable);
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
    return HtmlTools;
}());



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBlockEditor", function() { return ContentBlockEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(13);


var ContentBlockEditor = /** @class */ (function () {
    function ContentBlockEditor() {
    }
    ContentBlockEditor.prepareToAddContent = prepareToAddContent;
    ContentBlockEditor.updateTemplateFromDia = updateTemplateFromDia;
    ContentBlockEditor.getPreviewWithTemplate = getPreviewWithTemplate;
    return ContentBlockEditor;
}());

/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {ContextBundleButton} context
 */
function prepareToAddContent(context, useModuleList) {
    var isCreated = context.contentBlock.isCreated;
    if (isCreated || !useModuleList)
        return Promise.resolve();
    // return persistTemplate(sxc, null);
    // let manage = sxc.manage;
    // let contentGroup = manage._editContext.ContentGroup;
    // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
    // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;
    var templateId = context.contentBlock.templateId;
    // template has not changed
    // if (groupExistsAndTemplateUnchanged) return $.when(null);
    // persist the template
    return updateTemplate(context, templateId, true);
}
/**
 * Update the template and adjust UI accordingly.
 * @param {ContextBundleButton} context
 * @param {number} templateId
 * @param {boolean} forceCreate
 */
function updateTemplateFromDia(context, templateId) {
    var wasShowingPreview = __WEBPACK_IMPORTED_MODULE_0__html_dom_tools__["HtmlTools"].isDisabled(context.sxc);
    return updateTemplate(context, templateId, false)
        .then(function () {
        // only reload on ajax, not on app as that was already re-loaded on the preview
        // necessary to show the original template again
        if (wasShowingPreview)
            __WEBPACK_IMPORTED_MODULE_1__render__["renderer"].reloadAndReInitialize(context);
    });
}
/**
 * Update the template.
 */
function updateTemplate(context, templateId, forceCreate) {
    return saveTemplate(context, templateId, forceCreate).then(function (data) {
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
}
/**
 * Save the template configuration for this instance
 * @param {ContextBundleButton} context
 * @param {number} templateId
 * @param {boolean} [forceCreateContentGroup]
 * @returns {promise}
 */
function saveTemplate(context, templateId, forceCreateContentGroup) {
    var params = {
        templateId: templateId,
        forceCreateContentGroup: forceCreateContentGroup,
        newTemplateChooserState: false,
    };
    return new Promise(function (resolve, reject) {
        context.sxc.webApi.get({
            url: 'view/module/savetemplateid',
            params: params,
        }).done(function (data, textStatus, jqXhr) {
            // resolve or reject based on http-status: 200 & 204 = ok
            if (jqXhr.status === 204 || jqXhr.status === 200)
                resolve(data);
            else
                reject(Error(textStatus));
        }).fail(function (jqXhr, textStatus, errorThrown) {
            reject(Error(errorThrown));
        });
    });
}
/**
 * Retrieve the preview from the web-api
 * @param {ContextBundleButton} context
 * @param {number} templateId
 * @returns {promise} promise with the html in the result
 */
function getPreviewWithTemplate(context, templateId) {
    templateId = templateId || -1; // fallback, meaning use saved ID
    var params = {
        templateId: templateId,
        lang: context.app.currentLanguage,
        cbisentity: context.contentBlock.isEntity,
        cbid: context.contentBlock.id,
        originalparameters: JSON.stringify(context.instance.parameters),
    };
    return new Promise(function (resolve, reject) {
        context.sxc.webApi.get({
            url: 'view/module/rendertemplate',
            params: params,
            dataType: 'html',
        }).done(function (data, textStatus, jqXhr) {
            if (jqXhr.status === 204 || jqXhr.status === 200) {
                // resolve the promise with the response text
                resolve(data);
            }
            else {
                // otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(textStatus));
            }
        }).fail(function (jqXhr, textStatus, errorThrown) {
            reject(Error(errorThrown));
        });
    });
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickE", function() { return QuickE; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);
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
        var coords = __WEBPACK_IMPORTED_MODULE_0____["Positioning"].getCoordinates(target);
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
        this.modActions.click(__WEBPACK_IMPORTED_MODULE_0____["QeModule"].onModuleButtonClick);
        this.cbActions.click(__WEBPACK_IMPORTED_MODULE_0____["QeContentBlock"].onCbButtonClick);
    }
    QuickESingleton.prototype.prepareToolbarInDom = function () {
        this.body.append(this.main).append(this.selected);
        this.main.append(this.cbActions).append(this.modActions);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$2sxcInPage", function() { return $2sxcInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window_in_page__ = __webpack_require__(5);

// ReSharper restore InconsistentNaming
var $2sxcInPage = __WEBPACK_IMPORTED_MODULE_0__window_in_page__["windowInPage"].$2sxc;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialogManager", function() { return QuickDialogManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quickDialog", function() { return quickDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DebugConfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(42);




var dbg = __WEBPACK_IMPORTED_MODULE_0__DebugConfig__["DebugConfig"].qDialog;
var diagShowClass = 'dia-select';
/** dialog manager - the currently active dialog object */
var current = null;
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
var QuickDialogManager = /** @class */ (function () {
    function QuickDialogManager() {
    }
    /**
     * Determines if a.ny dialog is currently showing
     */
    QuickDialogManager.prototype.isVisible = function () {
        return current != null;
    };
    /**
     * toggle visibility
     * @param {boolean} [show] true/false optional
     */
    QuickDialogManager.prototype.setVisible = function (show) {
        var cont = __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"].getOrCreate();
        // if (show === undefined)
        //  show = !cont.hasClass(diagShowClass);
        // show/hide visually
        cont.toggleClass(diagShowClass, show);
        this.rememberDialogState(__WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"].getIFrame(cont), show);
        current = show ? __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"].getIFrame() : null;
    };
    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextBundleButton} context object
     * @param {string} url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param {string} [dialogName] - optional name of dialog, to check if it's already open
     * @returns {Promise<boolean>} jquery object of the iframe
     */
    QuickDialogManager.prototype.showOrToggleFromToolbar = function (context, url, isFullscreen, dialogName) {
        __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"].setSize(isFullscreen);
        var iFrame = __WEBPACK_IMPORTED_MODULE_2__quick_dialog_container__["QuickDialogContainer"].getIFrame();
        // in case it's a toggle
        if (this.isVisible()) {
            // check if we're just toggling the current, or will show a new one afterwards
            var currentPromise = dialogName &&
                current &&
                current.bridge.isConfiguredFor(context.sxc.cacheKey, dialogName)
                ? this.promise
                : null;
            this.cancel(current.bridge);
            // just a hide this, return the old promise
            if (currentPromise)
                return currentPromise;
        }
        var dialogUrl = setUrlToQuickDialog(url);
        iFrame.bridge.setup(context.sxc, dialogName);
        iFrame.setAttribute('src', dialogUrl);
        // if the window had already been loaded, re-init
        if (iFrame.contentWindow && iFrame.contentWindow.reboot)
            iFrame.contentWindow.reboot();
        // make sure it's visible'
        this.setVisible(true);
        return this.promiseRestart();
    };
    QuickDialogManager.prototype.cancel = function (bridge) {
        this.setVisible(false);
        __WEBPACK_IMPORTED_MODULE_3__state__["cancelled"].set('true');
        this.resolvePromise(bridge.changed);
    };
    QuickDialogManager.prototype.rememberDialogState = function (iframe, state) {
        if (dbg.showHide)
            console.log("qDialog persistDia(..., " + state + ")");
        if (state) {
            var cbId = iframe.bridge
                .getContext()
                .contentBlock.id.toString();
            if (dbg.showHide)
                console.log("contentBlockId: " + cbId + ")");
            return __WEBPACK_IMPORTED_MODULE_3__state__["cbId"].set(cbId);
        }
        else
            return __WEBPACK_IMPORTED_MODULE_3__state__["cbId"].remove();
    };
    QuickDialogManager.prototype.promiseRestart = function () {
        var _this = this;
        this.promise = new Promise(function (resolve) { return (_this.resolvePromise = resolve); });
        return this.promise;
    };
    return QuickDialogManager;
}());

var quickDialog = new QuickDialogManager();
/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the default dialog
 * @returns {string} new url pointing to quick dialog
 */
function setUrlToQuickDialog(url) {
    // change default url-schema from the primary angular-app to the quick-dialog
    url = url.replace(__WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].ng1, __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].quickDialog)
        .replace(__WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].ng8, __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].quickDialog);
    url = changePathToLocalhostForDev(url);
    return url;
}
/**
 * special debug-code when running on local ng-serve
 * this is only activated if the developer manually sets a value in the localStorage
 * @param url
 */
function changePathToLocalhostForDev(url) {
    try {
        var devMode = localStorage.getItem('devMode');
        if (devMode && !!devMode) {
            return url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
        }
    }
    catch (e) {
        // ignore
    }
    return url;
}


/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return ContextBundleToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(89);
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
    function ContextBundleToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextBundleToolbar.prototype.forButton = function (button) {
        // the ContextBundleButton is the same as toolbar, just with .button
        var clone = __assign({}, this); // O.bject.assign({}, this) as ContextBundleButton;
        clone.button = button;
        return clone;
    };
    return ContextBundleToolbar;
}(__WEBPACK_IMPORTED_MODULE_0____["ContextBundleItem"]));



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContentBlock", function() { return ContextBundleContentBlock; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundle_instance__ = __webpack_require__(18);
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

var ContextBundleContentBlock = /** @class */ (function (_super) {
    __extends(ContextBundleContentBlock, _super);
    function ContextBundleContentBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextBundleContentBlock;
}(__WEBPACK_IMPORTED_MODULE_0__context_bundle_instance__["ContextBundleInstance"]));



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundlePage", function() { return ContextBundlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundle_base__ = __webpack_require__(31);
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

var ContextBundlePage = /** @class */ (function (_super) {
    __extends(ContextBundlePage, _super);
    function ContextBundlePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextBundlePage;
}(__WEBPACK_IMPORTED_MODULE_0__context_bundle_base__["ContextBundleBase"]));



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleBase", function() { return ContextBundleBase; });
var ContextBundleBase = /** @class */ (function () {
    function ContextBundleBase() {
        this._isContext = true;
    }
    return ContextBundleBase;
}());



/***/ }),
/* 32 */
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
// if (window.$2sxc && !window.$2sxc.consts) {
//   $2sxc.c = $2sxc.consts = new Constants();
// }


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOfEditContext", function() { return UserOfEditContext; });
var UserOfEditContext = /** @class */ (function () {
    function UserOfEditContext() {
    }
    UserOfEditContext.fromContext = function (context) {
        var user = new UserOfEditContext();
        user.canDesign = context.user.canDesign;
        user.canDevelop = context.user.canDevelop;
        return user;
    };
    return UserOfEditContext;
}());



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarManager", function() { return ToolbarManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(8);
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
    function ToolbarManagerGlobal(parentLog) {
        var _this = _super.call(this, 'Tlb.Mngr', parentLog, 'init') || this;
        // generate button html
        _this.generateButtonHtml = function (context, groupIndex) {
            new __WEBPACK_IMPORTED_MODULE_0____["ToolbarRenderer"](context).button.render(context, groupIndex);
        };
        _this.generateToolbarHtml = function (context) {
            return new __WEBPACK_IMPORTED_MODULE_0____["ToolbarRenderer"](context).render();
        };
        _this.toolbarFinder = new __WEBPACK_IMPORTED_MODULE_0____["ToolbarConfigFinderAndInitializer"](_this);
        return _this;
    }
    ToolbarManagerGlobal.prototype.buildModule = function (parentTag, optionalId) {
        this.toolbarFinder.buildDnnModule(parentTag, optionalId);
    };
    ToolbarManagerGlobal.prototype.build = function (node) {
        this.toolbarFinder.build(node);
    };
    return ToolbarManagerGlobal;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));
// 2dm 2018-03-22 this seems to be unused
// const sharedTbm = new ToolbarManager(null);
var ToolbarManager = new ToolbarManagerGlobal(null);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarRenderer", function() { return ToolbarRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_button__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_groups__ = __webpack_require__(109);


var ToolbarRenderer = /** @class */ (function () {
    function ToolbarRenderer(context) {
        this.context = context;
        this.groups = new __WEBPACK_IMPORTED_MODULE_1__render_groups__["RenderButtonGroups"](this);
        this.button = new __WEBPACK_IMPORTED_MODULE_0__render_button__["RenderButton"](this);
    }
    ToolbarRenderer.prototype.render = function () {
        // render groups of buttons
        var context = this.context;
        var groups = this.groups.render(context);
        // render toolbar
        var toolbar = document.createElement('ul');
        toolbar.classList.add('sc-menu');
        toolbar.classList.add('group-0'); // IE11 fix, add each class separately
        // add behaviour classes
        toolbar.classList.add("sc-tb-hover-" + context.toolbar.settings.hover);
        toolbar.classList.add("sc-tb-show-" + context.toolbar.settings.show);
        if (context.toolbar.params.sortOrder === -1)
            toolbar.classList.add('listContent');
        this.addClasses(toolbar, context.toolbar.settings.classes, ' ');
        // add button groups to toolbar
        toolbar.setAttribute('group-count', context.toolbar.groups.length.toString());
        for (var g = 0; g < groups.length; g++)
            toolbar.appendChild(groups[g]);
        return toolbar.outerHTML;
    };
    /**
     * Add html classes to a DOM element
     */
    ToolbarRenderer.prototype.addClasses = function (element, classes, spliter) {
        if (!classes)
            return;
        var classessArray = classes.split(spliter);
        for (var c = 0; c < classessArray.length; c++)
            if (classessArray[c])
                element.classList.add(classessArray[c]);
    };
    return ToolbarRenderer;
}());



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdLayout", function() { return CmdLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quick_edit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quick_edit_context_for_lists__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commands__ = __webpack_require__(4);





var CmdLayout = 'layout';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_4__commands__["Commands"].add(CmdLayout, 'ChangeLayout', 'glasses', true, true, {
    inlineWindow: function (context) { return true; },
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
            context.button.action.params.apps = specs.apps;
        }
        return __WEBPACK_IMPORTED_MODULE_0____["CmsEngine"].openDialog(context, event);
    },
});


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cms", function() { return Cms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_instance__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DebugConfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging_has_log__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logging_log__ = __webpack_require__(16);
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
        _this.autoReset = true;
        _this.autoDump = __WEBPACK_IMPORTED_MODULE_3__DebugConfig__["DebugConfig"].cms.autoDump;
        return _this;
    }
    /**
     * reset / clear the log
     */
    Cms.prototype.resetLog = function () {
        this.log = new __WEBPACK_IMPORTED_MODULE_5__logging_log__["Log"](logId, null, 'log was reset');
    };
    Cms.prototype.run = function (context, nameOrSettings, eventOrSettings, event) {
        var _this = this;
        var realContext = __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_instance__["ContextBundleInstance"].is(context)
            ? context
            : __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(context);
        return this.do(function () {
            return new __WEBPACK_IMPORTED_MODULE_0__commands___["CmsEngine"](_this.log).detectParamsAndRun(realContext, nameOrSettings, eventOrSettings, event);
        });
    };
    /**
     * reset/clear the log if alwaysResetLog is true
     */
    Cms.prototype.do = function (innerCall) {
        if (this.autoReset)
            this.resetLog();
        var result = innerCall();
        if (this.autoDump)
            console.log(this.log.dump());
        return result;
    };
    return Cms;
}(__WEBPACK_IMPORTED_MODULE_4__logging_has_log__["HasLog"]));



/***/ }),
/* 38 */
/***/ (function(module, exports) {



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Log; });
var maxEntriesReached = 'Maximum amount of entries added to log, will stop adding more';
var Log = /** @class */ (function () {
    function Log(name, message) {
        this.text = "";
        this.entries = [];
        this.maxEntries = 100;
        this.name = name;
        this.start = new Date().getTime();
        if (message)
            this.add(message);
    }
    Log.prototype.add = function (message, data) {
        // silently return if past the max
        if (this.entries.length > this.maxEntries)
            return;
        // if we just reached the max, add last message
        else if (this.entries.length == this.maxEntries)
            this._add(maxEntriesReached);
        // standard: just add this
        else
            this._add(message, data);
    };
    Log.prototype.return = function (result, message) {
        this.add(message || 'return', result);
        return result;
    };
    Log.prototype._add = function (message, data) {
        this.text += message + '\n';
        this.entries.push({
            time: new Date().getTime() - this.start,
            message: message,
            data: data
        });
    };
    return Log;
}());



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdsStrategyFactory", function() { return CmdsStrategyFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);

var CmdsStrategyFactory = /** @class */ (function () {
    function CmdsStrategyFactory() {
        this.cmds = {
            cb: new __WEBPACK_IMPORTED_MODULE_0____["QeContentBlock"](),
            mod: new __WEBPACK_IMPORTED_MODULE_0____["QeModule"](),
        };
    }
    CmdsStrategyFactory.prototype.delete = function (clip) {
        return this.cmds[clip.type].delete(clip);
    };
    return CmdsStrategyFactory;
}());



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextBundleItem", function() { return ContextBundleItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bendle_content_block__ = __webpack_require__(29);
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

var ContextBundleItem = /** @class */ (function (_super) {
    __extends(ContextBundleItem, _super);
    function ContextBundleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextBundleItem;
}(__WEBPACK_IMPORTED_MODULE_0__context_bendle_content_block__["ContextBundleContentBlock"]));



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cbId", function() { return cbId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelled", function() { return cancelled; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__ = __webpack_require__(93);

var cbId = new __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__["SessionStateHandler"]('dia-cbid');
var cancelled = new __WEBPACK_IMPORTED_MODULE_0__manage_session_state_handler__["SessionStateHandler"]('cancelled-dialog');


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonCommand", function() { return ButtonCommand; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_commands__ = __webpack_require__(4);
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
    function ButtonCommand(name, contentType, params) {
        this.name = name;
        this.params = params;
        if (!params)
            this.params = {};
        if (contentType)
            this.params.contentType = contentType;
        // activate command for this
        this.commandDefinition = __WEBPACK_IMPORTED_MODULE_0__commands_commands__["Commands"].get(name);
    }
    ButtonCommand.normalize = function (action) {
        var params = {};
        if (action) {
            if (action.name)
                params.action = action.name;
            if (action.params)
                params = __assign(__assign({}, params), action.params); // O.bject.assign(params, action.params);
        }
        return params;
    };
    return ButtonCommand;
}());



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["TypeSafeAssign"] = TypeSafeAssign;
/**
 * This is the same as Object.assign, but type-safe.
 * Use it as a replacetment for Object.Assign(this, ... ) in constructors
 */
function TypeSafeAssign() {
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
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagToolbar", function() { return TagToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(19);


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
/* 46 */
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPart", function() { return RenderPart; });
/**
 * Base class for inner part renderers.
 * The goal is that we have the code in own objects, but that these can only be used
 * from the primary parent object of the type ToolbarRenderer
 *
 * @export
 * @class RenderPart
 */
var RenderPart = /** @class */ (function () {
    function RenderPart(parent) {
        this.parent = parent;
    }
    return RenderPart;
}());



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarInitConfig", function() { return ToolbarInitConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_2sxc_consts__ = __webpack_require__(32);



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
            var newConfigFormat = __WEBPACK_IMPORTED_MODULE_1__html_dom_tools__["HtmlTools"].tryGetAttrText(tag, __WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.full);
            if (newConfigFormat) {
                return JSON.parse(newConfigFormat);
            }
            else {
                var at = __WEBPACK_IMPORTED_MODULE_2__settings_2sxc_consts__["IDs"].attr;
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
/* 49 */
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
    return InPageButtonJson;
}());



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonConfigLoader", function() { return ButtonConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commands_command_more__ = __webpack_require__(141);
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
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonGroupConfigLoader - but very differently
     *          I'm not sure why though.
     */
    ButtonConfigLoader.prototype.convertToButton = function (jsonBtn) {
        var btn = {};
        if (jsonBtn.code)
            btn.code = function (c) { return jsonBtn.code(c.button.action.params); };
        if (jsonBtn.icon)
            btn.icon = function () { return "icon-sxc-" + jsonBtn.icon; };
        if (jsonBtn.classes)
            btn.classes = jsonBtn.classes;
        if (jsonBtn.dialog)
            btn.dialog = function () { return jsonBtn.dialog; };
        if (jsonBtn.disabled)
            btn.disabled = function () { return jsonBtn.disabled; };
        if (jsonBtn.dynamicClasses)
            btn.dynamicClasses = function (c) { return jsonBtn.dynamicClasses(c.button.action.params); };
        if (jsonBtn.fullScreen)
            btn.fullScreen = function () { return jsonBtn.fullScreen; };
        if (jsonBtn.inlineWindow)
            btn.inlineWindow = function () { return jsonBtn.inlineWindow; };
        if (jsonBtn.name)
            btn.name = jsonBtn.name;
        if (jsonBtn.newWindow)
            btn.newWindow = function () { return jsonBtn.newWindow; };
        // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
        // we need parameter adapter to do this...
        if (jsonBtn.params)
            btn.params = function () { return jsonBtn.params; };
        if (jsonBtn.partOfPage)
            btn.partOfPage = function () { return jsonBtn.partOfPage; };
        if (jsonBtn.showCondition)
            btn.showCondition = function (c) { return jsonBtn.showCondition(c.button.action.params); };
        if (jsonBtn.title)
            btn.title = function () { return "Toolbar." + jsonBtn.title; };
        if (jsonBtn.uiActionOnly)
            btn.uiActionOnly = function () { return jsonBtn.uiActionOnly; };
        jsonBtn = this.normalize(jsonBtn);
        var name = jsonBtn.command.action;
        var contentType = jsonBtn.command.contentType;
        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        this.toolbar.command.normalizeCommandJson(jsonBtn.command);
        // parameters adapter from v1 to v2
        var params = this.toolbar.command.removeActionProperty(jsonBtn.command);
        // Toolbar API v2
        var newButtonAction = new __WEBPACK_IMPORTED_MODULE_2__config__["ButtonCommand"](name, contentType, params);
        return new __WEBPACK_IMPORTED_MODULE_2__config__["Button"](newButtonAction, name);
    };
    /**
     * takes an object like "actionname" or { action: "actionname", ... }
     * and changes it to a { command: { action: "actionname" }, ... }
     */
    ButtonConfigLoader.prototype.normalize = function (original) {
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.ExpBtn', this.log, 'start');
        // prevent multiple inits
        var asBtnConfig = original;
        if (asBtnConfig._expanded || asBtnConfig.command) {
            log.add("already expanded, won't modify");
            return asBtnConfig;
        }
        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string')
            return this.getFromName(original);
        // {
        //     log.add(`name "${original}" found, will re-map to .command.action`);
        //     return {
        //         command: { action: original.trim() },
        //         _expanded: true,
        //     };
        // }
        // if it's a command w/action, wrap into command + trim
        if (__WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].hasActions(asBtnConfig)) {
            log.add('action found, will move down to .command');
            return {
                command: { action: original.action.trim() },
                _expanded: true,
            };
        }
        throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
    };
    ButtonConfigLoader.prototype.getFromName = function (name) {
        this.log.add("name \"" + name + "\" found, will re-map to .command.action");
        return {
            command: { action: name.trim() },
            _expanded: true,
        };
    };
    /**
     * remove buttons which are not valid based on add condition
     * @param {ContextBundleButton} context
     * @param {Toolbar} full
     * @param {InstanceConfig} config
     * @memberof ButtonConfigurationBuilder
     */
    ButtonConfigLoader.prototype.removeDisableButtons = function (context, full) {
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.RmvDsb', this.log, "start remove disabled buttons for " + full.groups.length + " groups");
        var btnGroups = full.groups;
        for (var g = 0; g < btnGroups.length; g++) {
            var btns = btnGroups[g].buttons;
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            removeUnfitButtons(context, btns, /* config, */ log);
            log.add('will disable appropriate buttons');
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            disableButtons(context, btns /*, config */);
            // remove the group, if no buttons left, or only "more"
            if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === __WEBPACK_IMPORTED_MODULE_3__commands_command_more__["CmdMore"])) {
                log.add('found no more buttons except for the "more" - will remove that group');
                btnGroups.splice(g--, 1); // remove, and decrement counter
            }
        }
    };
    /**
     * enhance button-object with default icons, etc.
     * @param btn
     * @param group
     * @param fullToolbarConfig
     * @param actions
     */
    ButtonConfigLoader.prototype.addDefaultBtnSettings = function (btn, group, fullToolbarConfig, actions) {
        this.log.add("adding default btn settings for " + function () { return btn.action.name; });
        for (var d = 0; d < btnProperties.length; d++) {
            fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
        }
    };
    return ButtonConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));

function removeUnfitButtons(context, btns, 
// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
// config: InstanceConfig,
log) {
    var removals = '';
    for (var i = 0; i < btns.length; i++) {
        context.button = btns[i];
        if (btns[i].action && !evalPropOrFunction(btns[i].showCondition, context, /* config, */ true)) {
            removals += "#" + i + " \"" + btns[i].action.name + "\"; ";
            btns.splice(i--, 1);
        }
    }
    if (removals)
        log.add("removed buttons: " + removals);
}
// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused
function disableButtons(context, btns) {
    for (var i = 0; i < btns.length; i++) {
        // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
        context.button = btns[i];
        if (btns[i].action) {
            btns[i].disabled = evalPropOrFunction(btns[i].disabled, context, /* config, */ function () { return false; });
        }
        else {
            btns[i].disabled = (function () { return false; });
        }
    }
}
function evalPropOrFunction(propOrFunction, context, 
// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
// config: InstanceConfig,
fallback) {
    if (propOrFunction === undefined || propOrFunction === null) {
        return fallback;
    }
    if (typeof (propOrFunction) === 'function') {
        return propOrFunction(context /*, config */);
    }
    else {
        return propOrFunction;
    }
}
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
function fallbackBtnSetting(btn, group, fullToolbarConfig, actions, propName) {
    var untypedButton = btn;
    if (untypedButton[propName])
        return;
    // if the group has defaults, try use that property
    if (group.defaults && group.defaults[propName])
        return untypedButton[propName] = group.defaults[propName];
    // if the toolbar has defaults, try use that property
    var conf = fullToolbarConfig;
    if (conf && conf.defaults && conf.defaults[propName])
        return untypedButton[propName] = conf.defaults[propName];
    // if there is an action, try to use that property name
    if (btn.action && btn.action.name) {
        var a = actions.get(btn.action.name);
        if (a && a.buttonConfig) {
            var c = a.buttonConfig;
            if (c[propName])
                return untypedButton[propName] = c[propName];
        }
    }
}


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdEdit", function() { return CmdEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdEditDialog", function() { return CmdEditDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdEdit = 'edit';
var CmdEditDialog = 'edit';
/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdEdit, 'Edit', 'pencil', false, true, {
    params: function (context) {
        return { mode: 'edit' };
    },
    showCondition: function (context) {
        return (!!context.button.action.params.entityId ||
            context.button.action.params.useModuleList); // need ID or a "slot", otherwise edit won't work
    },
});


/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsEngine", function() { return CmsEngine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contentBlock_content_block_editor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contentBlock_render__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_dialog_quick_dialog__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__command_link_generator__ = __webpack_require__(101);
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
        return _super.call(this, 'Cmd.Exec', parentLog) || this;
    }
    CmsEngine.prototype.detectParamsAndRun = function (context, nameOrParams, eventOrParams, event) {
        this.log.add("detecting params and running - has " + arguments.length + " params");
        var cmdParams;
        var thirdParamIsEvent = !event && eventOrParams && typeof eventOrParams.altKey !== 'undefined';
        this.log.add("might cycle parameters. third is event=" + thirdParamIsEvent);
        if (thirdParamIsEvent) {
            // no event param, but settings contains the event-object
            this.log.add('cycling params; event missing & eventOrSettings seems to be an event; settings assumed empty');
            event = eventOrParams; // move it to the correct variable
            cmdParams = this.nameOrSettingsAdapter(nameOrParams);
        }
        else {
            cmdParams = __assign(__assign({}, (eventOrParams || {})), this.nameOrSettingsAdapter(nameOrParams));
        }
        // ensure we have the right event despite browser differences
        event = event || window.event;
        return this.run(context, cmdParams, event);
    };
    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    CmsEngine.prototype.run = function (context, nameOrParams, event) {
        var cmdParams = this.nameOrSettingsAdapter(nameOrParams);
        cmdParams = this.expandSettingsWithDefaults(cmdParams);
        var origEvent = event;
        var name = cmdParams.action;
        var contentType = cmdParams.contentType;
        this.log.add("run command " + name + " for type " + contentType);
        // Toolbar API v2
        var newButtonAction = new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["ButtonCommand"](name, contentType, cmdParams);
        var newButtonConfig = new __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["Button"](newButtonAction, name);
        // merge conf & settings, but settings has higher priority
        var button = (context.button = __assign(__assign(__assign({}, newButtonConfig), newButtonAction.commandDefinition.buttonConfig), __WEBPACK_IMPORTED_MODULE_7__toolbar_config__["Button"].normalize(cmdParams)));
        // todo: stv, fix this in case that is function
        if (!button.dialog) {
            this.log.add('button.dialog method missing, old implementation with action-name');
            button.dialog = function () { return name; };
        }
        // todo: stv, fix this in case that is function
        if (!button.code) {
            this.log.add('simple button without code - generating code to open standard dialog');
            button.code = function (contextParam, evt) { return CmsEngine.openDialog(contextParam, evt); };
        }
        if (button.uiActionOnly(context)) {
            this.log.add('UI command, will not run pre-flight to ensure content-block - running code');
            return button.code(context, origEvent);
        }
        // if more than just a UI-action, then it needs to be sure the content-group is created first
        this.log.add('command might change data, wrap in pre-flight to ensure content-block');
        return __WEBPACK_IMPORTED_MODULE_1__contentBlock_content_block_editor__["ContentBlockEditor"].prepareToAddContent(context, cmdParams.useModuleList).then(function () {
            return context.button.code(context, origEvent);
        });
    };
    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    CmsEngine.prototype.nameOrSettingsAdapter = function (nameOrSettings) {
        // check if nameOrString is name (string) or object (settings)
        var nameIsString = typeof nameOrSettings === 'string';
        this.log.add("adapting settings; name string: " + nameIsString + "; name = " + nameOrSettings);
        return (nameIsString
            ? { action: nameOrSettings }
            : nameOrSettings);
    };
    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param settings
     */
    CmsEngine.prototype.expandSettingsWithDefaults = function (settings) {
        var name = settings.action;
        this.log.add("will add defaults for " + name + " from buttonConfig");
        var conf = __WEBPACK_IMPORTED_MODULE_0____["Commands"].get(name).buttonConfig;
        // TODO: 2dm - suspicious cast
        var full = __assign(__assign({}, conf), settings); // merge conf & settings, but
        // const full = O.bject.assign({}, conf, settings) as CommandParams; // merge conf & settings, but settings has higher priority
        return full;
    };
    /**
     * open a new dialog of the angular-ui
     */
    CmsEngine.openDialog = function (context, event) {
        // the link contains everything to open a full dialog (lots of params added)
        var link = new __WEBPACK_IMPORTED_MODULE_8__command_link_generator__["CommandLinkGenerator"](context).getLink(); // commandLinkToNgDialog(context);
        var fullScreen = false;
        var origEvent = event || window.event;
        return new Promise(function (resolvePromise) {
            // prepare promise for callback when the dialog closes
            // to reload the in-page view w/ajax or page reload
            var resolveAndReInit = function () {
                // very special thing: the signature always expects a Promise<T> so we're recasting
                resolvePromise(context);
                __WEBPACK_IMPORTED_MODULE_2__contentBlock_render__["renderer"].reloadAndReInitialize(context);
            };
            // check if inline window (quick-dialog)
            if (context.button.inlineWindow) {
                // test if it should be full screen (value or resolve-function)
                if (typeof context.button.fullScreen === 'function')
                    fullScreen = context.button.fullScreen(context);
                var diagName = context.button.dialog(context).toString();
                __WEBPACK_IMPORTED_MODULE_5__quick_dialog_quick_dialog__["quickDialog"]
                    .showOrToggleFromToolbar(context, link, fullScreen, diagName)
                    .then(function (isChanged) {
                    if (isChanged)
                        resolveAndReInit();
                });
                // else it's a normal pop-up dialog
            }
            else {
                // check if alt-key pressed, to open the old/new dialog instead
                if (origEvent && origEvent.altKey) {
                    var toOld = link.indexOf(__WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__["DialogPaths"].ng8) > 0;
                    link = link.replace(toOld ? __WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__["DialogPaths"].ng8 : __WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__["DialogPaths"].ng1, toOld ? __WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__["DialogPaths"].ng1 : __WEBPACK_IMPORTED_MODULE_6__settings_DialogPaths__["DialogPaths"].ng8);
                }
                // check if new-window
                if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
                    // very special thing: the signature always expects a Promise<T> so we're recasting
                    resolvePromise(context);
                    window.open(link);
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"].totalPopup.open(link, resolveAndReInit);
                }
            }
        });
    };
    return CmsEngine;
}(__WEBPACK_IMPORTED_MODULE_4__logging__["HasLog"]));



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_AjaxPromise__ = __webpack_require__(55);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__, "HasLog")) __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__["HasLog"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_1__ajax_AjaxSettings__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_index__ = __webpack_require__(56);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "HasLog", function() { return __WEBPACK_IMPORTED_MODULE_2__logging_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environment_Environment__ = __webpack_require__(58);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_JsInfo__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_JsInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__environment_JsInfo__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__environment_JsInfo__, "SxcInstanceWithInternals")) __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_4__environment_JsInfo__["SxcInstanceWithInternals"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__http_SxcHttp__ = __webpack_require__(59);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__instance_SxcInstance__ = __webpack_require__(60);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__instance_SxcInstanceDataDeprecated__ = __webpack_require__(62);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__instance_SxcInstanceWithInternals__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceWithInternals", function() { return __WEBPACK_IMPORTED_MODULE_8__instance_SxcInstanceWithInternals__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__instance_SxcWebApi__ = __webpack_require__(61);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SxcRoot_SxcRoot__ = __webpack_require__(64);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SxcRoot_SxcRootBuilder__ = __webpack_require__(168);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SxcRoot_SxcRootInternals__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SxcRoot_SxcRootInternals___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__SxcRoot_SxcRootInternals__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tools_TotalPopup__ = __webpack_require__(65);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__tools_UrlParamManager__ = __webpack_require__(66);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tools_Window__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tools_Window___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__tools_Window__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__edit_interfaces_sxc_root_manage__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__edit_interfaces_sxc_root_manage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__edit_interfaces_sxc_root_manage__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__edit_interfaces_sxc_instance_manage__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__edit_interfaces_sxc_instance_manage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__edit_interfaces_sxc_instance_manage__);
/* unused harmony namespace reexport */
/*
    This is just a type-index entry point.
    The purpose is that other 2sxc projects in this repo can access all the types
    in this project from here, without having to know the exact code files
*/


// must be pretty early, because most objects rely on this
// and ATM having this on top changes the load order
// this is a side-effect-problem from not clearly using modules



// export * from './environment/envDnnSfLoader';
// export * from './environment/envMetaLoader';















/***/ }),
/* 55 */
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HasLog__ = __webpack_require__(57);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__HasLog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Log__ = __webpack_require__(39);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LogEntry__ = __webpack_require__(164);
/* unused harmony namespace reexport */





/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HasLog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Log__ = __webpack_require__(39);

var HasLog = /** @class */ (function () {
    function HasLog(name, message) {
        this.log = new __WEBPACK_IMPORTED_MODULE_0__Log__["a" /* Log */](name, message);
    }
    return HasLog;
}());



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Environment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__envMetaLoader__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_index__ = __webpack_require__(56);
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
        var _this = _super.call(this, 'Environment', 'starting') || this;
        _this.ready = false;
        _this.source = '';
        // this.log = new Log();
        _this.metaLoader = new __WEBPACK_IMPORTED_MODULE_0__envMetaLoader__["a" /* EnvironmentMetaLoader */](_this);
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
        this.header = newJsInfo;
        this.ready = true;
        this.source = source || 'external/unknown';
        this.log.add('loaded from ' + this.source);
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
}(__WEBPACK_IMPORTED_MODULE_2__logging_index__["a" /* HasLog */]));



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcHttp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(54);
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
        var _this = _super.call(this, "Sxc.Http") || this;
        _this.env = env;
        return _this;
    }
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    SxcHttp.prototype.headers = function (id, cbid) {
        var fHeaders = {}; // as any;
        if (id)
            fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].ModuleId] = id.toString();
        if (cbid)
            fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].ContentBlockId] = cbid.toString();
        fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].TabId] = this.env.page().toString();
        fHeaders[__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* HeaderNames */].Rvt] = this.env.rvt();
        return this.log.return(fHeaders, "headers(id:" + id + ", cbid:" + cbid + ")");
    };
    /**
     * Get the API-Root path for a specific extension/endpoint
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
     */
    SxcHttp.prototype.apiRoot = function (endpointName) {
        var result = this.env.api().replace(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* ApiExtensionPlaceholder */], endpointName);
        return this.log.return(result, "apiRoot('" + endpointName + "')");
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
        this.log.add("apiUrl(url:'" + url + "', endpointName:'" + endpointName + "')");
        // if starts with http: or https: then ignore
        if (!url || url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('//') == 0)
            return this.log.return(url);
        // if no endpoint specified, then also skip absolute and relative urls
        if (!endpointName && (url.indexOf('/') == 0 || url.indexOf('.') == 0))
            return this.log.return(url);
        var baseUrl = this.apiRoot(endpointName || __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* ToSxcName */]);
        // ensure base ends with slash
        if (baseUrl[baseUrl.length - 1] != '/')
            baseUrl += '/';
        // ensure url doesn't start with slash
        if (url[0] == '/')
            url = url.slice(1);
        return this.log.return(baseUrl + url);
    };
    return SxcHttp;
}(__WEBPACK_IMPORTED_MODULE_1__index__["HasLog"]));



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SxcWebApi__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_HasLog__ = __webpack_require__(57);
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
    /** content-block ID, which is either the module ID, or the content-block definitiion entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it */
    cbid, 
    /** The environment information, important for http-calls */
    root) {
        var _this = _super.call(this, 'SxcInstance', 'Generating for ' + id + ':' + cbid) || this;
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
        _this.webApi = new __WEBPACK_IMPORTED_MODULE_0__SxcWebApi__["a" /* SxcWebApi */](_this);
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
}(__WEBPACK_IMPORTED_MODULE_2__logging_HasLog__["a" /* HasLog */]));



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcWebApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_AjaxPromise__ = __webpack_require__(55);

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
        var http = new __WEBPACK_IMPORTED_MODULE_0__ajax_AjaxPromise__["a" /* AjaxPromise */](this, this.sxc);
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
/* 62 */
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SxcInstanceWithInternals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SxcInstanceDataDeprecated__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SxcInstance__ = __webpack_require__(60);
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
        _this.data = new __WEBPACK_IMPORTED_MODULE_0__SxcInstanceDataDeprecated__["a" /* SxcInstanceDataDeprecated */](_this);
        return _this;
    }
    SxcInstanceWithInternals.prototype.recreate = function (resetCache) {
        if (resetCache)
            delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid); // generate new
    };
    return SxcInstanceWithInternals;
}(__WEBPACK_IMPORTED_MODULE_1__SxcInstance__["a" /* SxcInstance */]));



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRootPartsV2;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_Environment__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_SxcHttp__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_Log__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(14);




function getRootPartsV2() {
    var log = new __WEBPACK_IMPORTED_MODULE_2__logging_Log__["a" /* Log */]('$2sxc', 'building');
    var env = new __WEBPACK_IMPORTED_MODULE_0__environment_Environment__["a" /* Environment */]();
    return {
        sysinfo: {
            version: __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* SxcVersion */],
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new __WEBPACK_IMPORTED_MODULE_1__http_SxcHttp__["a" /* SxcHttp */](env),
        log: log,
    };
}


/***/ }),
/* 65 */
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
/* 66 */
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
    return UrlParamManager;
}());



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainContentBlock", function() { return MainContentBlock; });
/*
 * This just holds some constants, but it looks like _LayoutElement is unused - but I think it should be!
 */
var MainContentBlock = /** @class */ (function () {
    function MainContentBlock() {
    }
    // constants
    MainContentBlock.cViewWithoutContent = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
    MainContentBlock.cUseExistingTemplate = -1;
    return MainContentBlock;
}());



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Specs", function() { return Specs; });
var Specs = /** @class */ (function () {
    function Specs() {
    }
    return Specs;
}());



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QeContentBlock", function() { return QeContentBlock; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_for_lists__ = __webpack_require__(15);



/**
 * extend the quick edit with the core commands
 */
var QeContentBlock = /** @class */ (function () {
    function QeContentBlock() {
    }
    QeContentBlock.prototype.delete = function (clip) {
        var sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(clip.list);
        return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
    };
    QeContentBlock.create = function (parent, field, index, appOrContent, list, newGuid) {
        var sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(list);
        return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
    };
    QeContentBlock.onCbButtonClick = function () {
        var list = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForCb.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector);
        var listItems = list.find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.selector);
        var actionConfig = __WEBPACK_IMPORTED_MODULE_2__context_for_lists__["ContextForLists"].getFromDom(list); // JSON.parse(list.attr(QeSelectors.blocks.cb.context)) as ContextForLists;
        var index = 0;
        var newGuid = actionConfig.guid || null;
        if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForCb.hasClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.class))
            index = listItems.index(__WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForCb[0]) + 1;
        // check cut/paste
        var cbAction = $(this).data('action');
        if (cbAction) {
            // this is a cut/paste action
            return __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].do(cbAction, list, index, __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id);
        }
        else {
            var appOrContent = $(this).data('type');
            return QeContentBlock.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
        }
    };
    return QeContentBlock;
}());



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionCoordinates", function() { return PositionCoordinates; });
var PositionCoordinates = /** @class */ (function () {
    function PositionCoordinates(x, y, w, yh, element) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.yh = yh;
        this.element = element;
    }
    return PositionCoordinates;
}());



/***/ }),
/* 71 */
/***/ (function(module, exports) {



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QeModule", function() { return QeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);

var QeModule = /** @class */ (function () {
    function QeModule() {
    }
    QeModule.prototype.delete = function (clip) {
        if (!confirm('are you sure?'))
            return;
        var modId = __WEBPACK_IMPORTED_MODULE_0____["modManage"].getModuleId(clip.item.className);
        __WEBPACK_IMPORTED_MODULE_0____["modManage"].delete(modId);
    };
    // todo: unsure if this is a good place for this bit of code...
    QeModule.move = function (oldClip, newClip, from, to) {
        var modId = __WEBPACK_IMPORTED_MODULE_0____["modManage"].getModuleId(oldClip.item.className);
        var pane = __WEBPACK_IMPORTED_MODULE_0____["modManage"].getPaneName(newClip.list);
        __WEBPACK_IMPORTED_MODULE_0____["modManage"].move(modId, pane, to);
    };
    QeModule.sendToPane = function () {
        var pane = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForModule.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
        // show the pane-options
        var pl = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.find('#paneList');
        // ReSharper disable once CssBrowserCompatibility
        if (!pl.is(':empty'))
            pl.empty();
        pl.append(__WEBPACK_IMPORTED_MODULE_0____["modManage"].getMoveButtons(__WEBPACK_IMPORTED_MODULE_0____["modManage"].getPaneName(pane)));
    };
    QeModule.onModuleButtonClick = function () {
        var type = $(this).data('type');
        var dnnMod = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForModule;
        var pane = dnnMod.closest(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.listSelector);
        var index = 0;
        if (dnnMod.hasClass('DnnModule'))
            index = pane.find('.DnnModule').index(dnnMod[0]) + 1;
        var cbAction = $(this).data('action');
        if (cbAction)
            return __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].do(cbAction, pane, index, __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.mod.id); // copy/paste
        return __WEBPACK_IMPORTED_MODULE_0____["modManage"].create(__WEBPACK_IMPORTED_MODULE_0____["modManage"].getPaneName(pane), index, type);
    };
    return QeModule;
}());



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QeModuleManager", function() { return QeModuleManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modManage", function() { return modManage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);
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
var QeModuleManager = /** @class */ (function () {
    function QeModuleManager() {
    }
    /**
     * Delete a module
     */
    QeModuleManager.prototype.delete = function (modId) {
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
    QeModuleManager.prototype.create = function (paneName, index, type) {
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
    QeModuleManager.prototype.move = function (modId, pane, order) {
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
    QeModuleManager.prototype.getPaneName = function (pane) {
        return $(pane).attr('id').replace('dnn_', '');
    };
    /**
     * find the correct module id from a list of classes - used on the module-wrapper
     */
    QeModuleManager.prototype.getModuleId = function (classes) {
        var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? Number(result[1]) : null;
    };
    QeModuleManager.prototype.getMoveButtons = function (current) {
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
        // ReSharper disable once UnusedParameter
        targets.find('a').click(function () {
            var link = $(this);
            var clip = __WEBPACK_IMPORTED_MODULE_0____["QuickEClipboard"].get(); // contents;
            var modId = this.getModuleId(clip.item.className);
            var newPane = link.attr('data');
            this.moveMod(modId, newPane, 0);
        });
        return targets;
    };
    return QeModuleManager;
}());

var modManage = new QeModuleManager();
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
        // ReSharper disable once UnusedParameter
        success: function () { return window.location.reload(); },
    });
}


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Positioning", function() { return Positioning; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_for_lists__ = __webpack_require__(15);


/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    Positioning.getBodyPosition = getBodyPosition;
    Positioning.positionAndAlign = positionAndAlign;
    Positioning.refresh = refresh;
    Positioning.getCoordinates = getCoordinates;
    return Positioning;
}());

/**
 * Prepare offset calculation based on body positioning
 * @returns Point
 */
function getBodyPosition() {
    var bodyPos = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.css('position');
    return bodyPos === 'relative' || bodyPos === 'absolute'
        ? new __WEBPACK_IMPORTED_MODULE_0____["PositionCoordinates"](__WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.offset().left, __WEBPACK_IMPORTED_MODULE_0____["QuickE"].body.offset().top)
        : new __WEBPACK_IMPORTED_MODULE_0____["PositionCoordinates"](0, 0);
}
/**
 * Refresh content block and modules elements
 */
function refreshDomObjects() {
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].bodyOffset =
        getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
    //// Cache the panes (because panes can't change dynamically)
    // if (!quickE.cachedPanes)
    //    quickE.cachedPanes = $(selectors.mod.listSelector);
    if (__WEBPACK_IMPORTED_MODULE_0____["QuickE"].config.innerBlocks.enable) {
        // get all content-block lists which are empty, or which allow multiple child-items
        var lists = $(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.listSelector).filter(":not(." + __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.singleItem + "), :empty");
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].contentBlocks = lists // $(selectors.cb.listSelector)
            .find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.selector)
            .add(lists); // selectors.cb.listSelector);
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
// namespace refreshDomObjects {
var lastCall;
// }
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
    var oldParent = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentContainer;
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
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForCb = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb ? __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestCb.element : null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.actionsForModule = __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod ? __WEBPACK_IMPORTED_MODULE_0____["QuickE"].nearestMod.element : null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentContainer = parentContainer;
        $(parentContainer).addClass(highlightClass);
    }
    else {
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentContainer = null;
        __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.hide();
    }
    // if previously a parent-pane was highlighted, un-highlight it now
    if (oldParent && oldParent !== __WEBPACK_IMPORTED_MODULE_0____["QuickE"].main.parentContainer)
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
        var e = getCoordinates($(this));
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
function getCoordinates(element) {
    // sometimes element.length === 0 and element.offset() = undefined
    // console.log("element.offset():", element.offset());
    // console.log("element.length:", element.length);
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
}


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickEClipboard", function() { return QuickEClipboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cmds_strategy_factory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_for_lists__ = __webpack_require__(15);




/** add a clipboard to the quick edit */
var QuickEClipboardSingleton = /** @class */ (function () {
    function QuickEClipboardSingleton() {
        var _this = this;
        this.do = copyPasteInPage;
        // initialize once the DOM is ready
        $(function () { return _this.initialize(); });
    }
    QuickEClipboardSingleton.prototype.get = function () { return contents; };
    /**
     * bind clipboard actions
     */
    QuickEClipboardSingleton.prototype.initialize = function () {
        $('a', __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected).click(function () {
            var action = $(this).data('action');
            var clip = contents;
            switch (action) {
                case 'delete':
                    return cmdsStrategyFactory.delete(clip);
                case 'sendToPane':
                    return __WEBPACK_IMPORTED_MODULE_0____["QeModule"].sendToPane();
                default:
                    throw new Error("unexpected action: " + action);
            }
        });
    };
    return QuickEClipboardSingleton;
}());
var QuickEClipboard = new QuickEClipboardSingleton();
/**
 * perform copy and paste commands - needs the clipboard
 * @param cbAction
 * @param list
 * @param index
 * @param type
 */
function copyPasteInPage(cbAction, list, index, type) {
    var newClip = createSpecs(type, list, index);
    // action!
    switch (cbAction) {
        case 'select':
            mark(newClip);
            break;
        case 'paste':
            var from = contents.index;
            var to = newClip.index;
            // check that we only move block-to-block or module to module
            if (contents.type !== newClip.type)
                return alert("can't move module-to-block; move only works from module-to-module or block-to-block");
            if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                return clear(); // don't do a.nything
            // cb-numbering is a bit different, because the selector is at the bottom
            // only there we should also skip on +1;
            if (newClip.type === __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id && from + 1 === to)
                return clear(); // don't do a.nything
            if (type === __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks.cb.id) {
                var sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(list);
                sxc.manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
            }
            else
                __WEBPACK_IMPORTED_MODULE_0____["QeModule"].move(contents, newClip, from, to); // sometimes missing oldClip.item
            clear();
            break;
        default:
    }
    return null;
}
/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
var contents = new __WEBPACK_IMPORTED_MODULE_0____["Specs"]();
function mark(newData) {
    if (newData) {
        // if it was already selected with the same thing, then release it
        if (contents && contents.item === newData.item)
            return clear();
        contents = newData;
    }
    $("." + __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected).removeClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected); // clear previous markings
    // sometimes missing data.item
    if (!contents.item) {
        return;
    }
    var cb = $(contents.item);
    cb.addClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
    if (cb.prev().is('iframe'))
        cb.prev().addClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
    setSecondaryActionsState(true);
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.toggleOverlay(cb);
}
function clear() {
    $("." + __WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected).removeClass(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].selected);
    contents = null;
    setSecondaryActionsState(false);
    __WEBPACK_IMPORTED_MODULE_0____["QuickE"].selected.toggleOverlay(false);
}
function createSpecs(type, list, index) {
    var listItems = list.find(__WEBPACK_IMPORTED_MODULE_0____["QeSelectors"].blocks[type].selector);
    var currentItem;
    if (index >= listItems.length) {
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        currentItem = listItems[listItems.length - 1];
    }
    else {
        currentItem = listItems[index];
    }
    var editContext = __WEBPACK_IMPORTED_MODULE_3__context_for_lists__["ContextForLists"].getFromDom(list) // (JSON.parse(list.attr(QeSelectors.blocks.cb.context) || null) as ContextForLists
        || { parent: 'dnn', field: list.id };
    return {
        parent: editContext.parent,
        field: editContext.field,
        list: list,
        item: currentItem,
        index: index,
        type: type,
    };
}
function setSecondaryActionsState(state) {
    var btns = $('a.sc-content-block-menu-btn');
    btns = btns.filter('.icon-sxc-paste');
    btns.toggleClass('sc-unavailable', !state);
}
var cmdsStrategyFactory = new __WEBPACK_IMPORTED_MODULE_2__cmds_strategy_factory__["CmdsStrategyFactory"]();
// /**
//  * bind clipboard actions
//  */
// $('a', QuickE.selected).click(function() {
//   const action: string = $(this).data('action');
//   const clip = contents;
//   switch (action) {
//     case 'delete':
//       return cmdsStrategyFactory.delete(clip);
//     case 'sendToPane':
//       return QeModule.sendToPane();
//     default:
//       throw new Error(`unexpected action: ${action}`);
//   }
// });


/***/ }),
/* 76 */
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
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entry", function() { return Entry; });
var Entry = /** @class */ (function () {
    function Entry(log, message) {
        var _this = this;
        this.log = log;
        this.message = message;
        this.source = function () { return _this.log.fullIdentifier(); };
    }
    return Entry;
}());



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialogContainer", function() { return QuickDialogContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iDialogFrameElement__ = __webpack_require__(79);

var IDialogFrameElement = __WEBPACK_IMPORTED_MODULE_0__iDialogFrameElement__["IDialogFrameElement"];
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
var containerClass = 'inpage-frame-wrapper';
var iframeClass = 'inpage-frame';
var iframeTag = 'iframe';
var containerTemplate = "<div class=\"" + containerClass + "\"><div class=\"" + iframeClass + "\"></div></div>";
var QuickDialogContainer = /** @class */ (function () {
    function QuickDialogContainer() {
    }
    /**
     * get the current container
     * @returns {element} html element of the div
     */
    QuickDialogContainer.getOrCreate = function () {
        var container = $("." + containerClass);
        return container.length > 0 ? container : buildContainerAndIFrame();
    };
    /**
     * find the iframe which hosts the dialog
     * @param {html} [container] - html-container as jQuery object
     * @returns {html} iframe object
     */
    QuickDialogContainer.getIFrame = function (container) {
        if (!container)
            container = QuickDialogContainer.getOrCreate();
        return container.find(iframeTag)[0];
    };
    /**
     * set container css for size
     * @param {boolean} fullScreen
     */
    QuickDialogContainer.setSize = function (fullScreen) {
        var container = QuickDialogContainer.getOrCreate();
        // set container height
        container.css('min-height', fullScreen ? '100%' : '225px');
        isFullscreen = fullScreen;
    };
    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     */
    QuickDialogContainer.watchForResize = function (container) {
        if (!resizeWatcher) // only add a timer if not already running
            resizeWatcher = window.setInterval(function () {
                try {
                    var frm = QuickDialogContainer.getIFrame(container);
                    if (!frm)
                        return;
                    var height = frm.contentDocument.body.offsetHeight;
                    if (frm.previousHeight === height)
                        return;
                    frm.style.minHeight = container.css('min-height');
                    frm.style.height = height + 'px';
                    frm.previousHeight = height;
                    if (isFullscreen) {
                        frm.style.height = '100%';
                        frm.style.position = 'absolute';
                    }
                }
                catch (e) {
                    // ignore
                }
            }, resizeInterval);
    };
    return QuickDialogContainer;
}());

/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame() {
    var container = $(containerTemplate);
    if ($('#personaBar-iframe').length > 0)
        container.addClass('persona-bar-visible');
    var newIFrame = document.createElement(iframeTag);
    var extendedIFrame = IDialogFrameElement.build(newIFrame);
    container.find("." + iframeClass).append(extendedIFrame);
    $('body').append(container);
    QuickDialogContainer.watchForResize(container);
    return container;
}
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by a.ny module instance
 */
var isFullscreen = false;
var resizeInterval = 200;
var resizeWatcher = null;


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDialogFrameElement", function() { return IDialogFrameElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__ = __webpack_require__(80);
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
    IDialogFrameElement.build = function (iFrame) {
        console.log('prot: ', __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__["IFrameBridge"].prototype);
        var iFrameExtended = iFrame;
        iFrameExtended.bridge = new __WEBPACK_IMPORTED_MODULE_0__iframe_bridge__["IFrameBridge"]();
        console.log('extensions: ', iFrameExtended.bridge);
        return iFrameExtended;
    };
    return IDialogFrameElement;
}(HTMLIFrameElement));



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrameBridge", function() { return IFrameBridge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contentBlock_content_block_editor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quick_dialog__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__quick_dialog_config__ = __webpack_require__(92);






var scrollTopOffset = 80;
var animationTime = 400;
/**
 *
 */
// ReSharper disable once InconsistentNaming
var IFrameBridge = /** @class */ (function () {
    function IFrameBridge() {
        this.changed = false;
    }
    /**
     * get the sxc-object of this iframe
     */
    IFrameBridge.prototype.uncachedSxc = function () {
        if (!this.instanceSxc)
            throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return this.instanceSxc.recreate(true);
    };
    IFrameBridge.prototype.getContext = function () { return __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(this.uncachedSxc()); };
    IFrameBridge.prototype.getAdditionalDashboardConfig = function () { return __WEBPACK_IMPORTED_MODULE_5__quick_dialog_config__["QuickDialogConfig"].fromContext(this.getContext()); };
    IFrameBridge.prototype.hide = function () { __WEBPACK_IMPORTED_MODULE_4__quick_dialog__["quickDialog"].setVisible(false); };
    IFrameBridge.prototype.run = function (verb) { this.uncachedSxc().manage.run(verb); };
    IFrameBridge.prototype.cancel = function () { __WEBPACK_IMPORTED_MODULE_4__quick_dialog__["quickDialog"].cancel(this); };
    IFrameBridge.prototype.showMessage = function (message) {
        __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__["renderer"].showMessage(this.getContext(), "<p class=\"no-live-preview-available\">" + message + "</p>");
        scrollToTarget(this.tagModule);
    };
    IFrameBridge.prototype.reloadAndReInit = function () {
        var _this = this;
        this.changed = false;
        return __WEBPACK_IMPORTED_MODULE_1__contentBlock_render__["renderer"].reloadAndReInitialize(this.getContext(), true, true)
            .then(function () { return scrollToTarget(_this.tagModule); })
            .then(function () { return Promise.resolve(_this.getAdditionalDashboardConfig()); });
    };
    IFrameBridge.prototype.setTemplate = function (templateId, templateName, final) {
        var _this = this;
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
            promise = promise
                .then(function () { return __WEBPACK_IMPORTED_MODULE_4__quick_dialog__["quickDialog"].setVisible(false); });
        promise = ajax
            ? promise.then(function () { return scrollToTarget(_this.tagModule); })
            : promise.then(function () { return window.parent.location.reload(); });
        // return true if ajax, so upstream can update UIs
        return promise.then(function () { return ajax; });
    };
    /**
     * prepare the bridge with the info of the current instance
     */
    IFrameBridge.prototype.setup = function (sxc, dialogName) {
        console.log('rewire with sxc: ', sxc);
        this.changed = false;
        this.instanceSxc = sxc;
        this.tagModule = $($(__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxc)).parent().eq(0));
        this.sxcCacheKey = sxc.cacheKey;
        if (dialogName)
            this.dialogName = dialogName;
    };
    /**
     * check if the dialog is showing for the current sxc-instance
     * @param {string} dialogName - name of dialog
     * @returns {boolean} true if it's currently showing for this sxc-instance
     */
    IFrameBridge.prototype.isConfiguredFor = function (instanceId, dialogName) {
        return this.sxcCacheKey === instanceId // the iframe is showing for the current sxc
            && this.dialogName === dialogName; // the view is the same as previously
    };
    return IFrameBridge;
}());

function scrollToTarget(target) {
    var specs = {
        scrollTop: target.offset().top - scrollTopOffset,
    };
    $('body').animate(specs, animationTime);
}


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts_context_app__ = __webpack_require__(82);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfApp", function() { return __WEBPACK_IMPORTED_MODULE_0__parts_context_app__["ContextOfApp"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleButton", function() { return __WEBPACK_IMPORTED_MODULE_1__bundles_context_bundle_button__["ContextBundleButton"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parts_context_content_block__ = __webpack_require__(83);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_2__parts_context_content_block__["ContextOfContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parts_context_instance__ = __webpack_require__(84);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfInstance", function() { return __WEBPACK_IMPORTED_MODULE_3__parts_context_instance__["ContextOfInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parts_context_item__ = __webpack_require__(85);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfItem", function() { return __WEBPACK_IMPORTED_MODULE_4__parts_context_item__["ContextOfItem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parts_context_page__ = __webpack_require__(86);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfPage", function() { return __WEBPACK_IMPORTED_MODULE_5__parts_context_page__["ContextOfPage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parts_context_system__ = __webpack_require__(87);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfSystem", function() { return __WEBPACK_IMPORTED_MODULE_6__parts_context_system__["ContextOfSystem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parts_context_tenant__ = __webpack_require__(88);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfTenant", function() { return __WEBPACK_IMPORTED_MODULE_7__parts_context_tenant__["ContextOfTenant"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bundles_context_bundle_toolbar__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return __WEBPACK_IMPORTED_MODULE_8__bundles_context_bundle_toolbar__["ContextBundleToolbar"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__parts_context_ui__ = __webpack_require__(90);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUi", function() { return __WEBPACK_IMPORTED_MODULE_9__parts_context_ui__["ContextOfUi"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__parts_context_user__ = __webpack_require__(91);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextOfUser", function() { return __WEBPACK_IMPORTED_MODULE_10__parts_context_user__["ContextOfUser"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__bundles_context_bendle_content_block__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_11__bundles_context_bendle_content_block__["ContextBundleContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bundles_context_bundle_base__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleBase", function() { return __WEBPACK_IMPORTED_MODULE_12__bundles_context_bundle_base__["ContextBundleBase"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__bundles_context_bundle_instance__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return __WEBPACK_IMPORTED_MODULE_13__bundles_context_bundle_instance__["ContextBundleInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__bundles_context_bundle_item__ = __webpack_require__(41);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleItem", function() { return __WEBPACK_IMPORTED_MODULE_14__bundles_context_bundle_item__["ContextBundleItem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__bundles_context_bundle_page__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundlePage", function() { return __WEBPACK_IMPORTED_MODULE_15__bundles_context_bundle_page__["ContextBundlePage"]; });


















/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfApp", function() { return ContextOfApp; });
/**
 * this will be about the current app, settings of the app, app - paths, etc.
 */
var ContextOfApp = /** @class */ (function () {
    function ContextOfApp() {
    }
    return ContextOfApp;
}());



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfContentBlock", function() { return ContextOfContentBlock; });
/**
 * information related to the current contentBlock, incl
 */
var ContextOfContentBlock = /** @class */ (function () {
    function ContextOfContentBlock() {
    }
    return ContextOfContentBlock;
}());



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfInstance", function() { return ContextOfInstance; });
/**
 * information related to the current DNN module, incl.instanceId,
 */
var ContextOfInstance = /** @class */ (function () {
    function ContextOfInstance() {
    }
    return ContextOfInstance;
}());



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfItem", function() { return ContextOfItem; });
/**
 * information about the current item
 */
var ContextOfItem = /** @class */ (function () {
    function ContextOfItem() {
    }
    return ContextOfItem;
}());



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfPage", function() { return ContextOfPage; });
/**
 * this will be information related to the current page
 */
var ContextOfPage = /** @class */ (function () {
    function ContextOfPage() {
    }
    return ContextOfPage;
}());



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfSystem", function() { return ContextOfSystem; });
/**
 * this will be everything about the current system, like system / api -paths etc.
 */
var ContextOfSystem = /** @class */ (function () {
    function ContextOfSystem() {
    }
    return ContextOfSystem;
}());



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfTenant", function() { return ContextOfTenant; });
/**
 * this will be something about the current tenant(the dnn portal)
 */
var ContextOfTenant = /** @class */ (function () {
    function ContextOfTenant() {
    }
    return ContextOfTenant;
}());



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bendle_content_block__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_0__context_bendle_content_block__["ContextBundleContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundle_base__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleBase", function() { return __WEBPACK_IMPORTED_MODULE_1__context_bundle_base__["ContextBundleBase"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundle_button__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleButton", function() { return __WEBPACK_IMPORTED_MODULE_2__context_bundle_button__["ContextBundleButton"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__context_bundle_instance__ = __webpack_require__(18);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleInstance", function() { return __WEBPACK_IMPORTED_MODULE_3__context_bundle_instance__["ContextBundleInstance"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__context_bundle_item__ = __webpack_require__(41);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleItem", function() { return __WEBPACK_IMPORTED_MODULE_4__context_bundle_item__["ContextBundleItem"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__context_bundle_page__ = __webpack_require__(30);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundlePage", function() { return __WEBPACK_IMPORTED_MODULE_5__context_bundle_page__["ContextBundlePage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__context_bundle_toolbar__ = __webpack_require__(28);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContextBundleToolbar", function() { return __WEBPACK_IMPORTED_MODULE_6__context_bundle_toolbar__["ContextBundleToolbar"]; });









/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfUi", function() { return ContextOfUi; });
/**
 * ensure that the UI will load the correct assets to enable editing
 */
var ContextOfUi = /** @class */ (function () {
    function ContextOfUi() {
    }
    return ContextOfUi;
}());



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextOfUser", function() { return ContextOfUser; });
/**
 * things about the user
 */
var ContextOfUser = /** @class */ (function () {
    function ContextOfUser() {
    }
    return ContextOfUser;
}());



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickDialogConfig", function() { return QuickDialogConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_user_of_edit_context__ = __webpack_require__(33);

var QuickDialogConfig = /** @class */ (function () {
    function QuickDialogConfig() {
    }
    // constructor(editContext: DataEditContext) {
    //  this.appId = editContext.ContentGroup.AppId;
    //  this.isContent = editContext.ContentGroup.IsContent;
    //  this.hasContent = editContext.ContentGroup.HasContent;
    //  this.isList = editContext.ContentGroup.IsList;
    //  this.templateId = editContext.ContentGroup.TemplateId;
    //  this.contentTypeId = editContext.ContentGroup.ContentTypeName;
    //  this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
    //  this.user = getUserOfEditContext(editContext);
    //  this.supportsAjax = editContext.ContentGroup.SupportsAjax;
    // }
    QuickDialogConfig.fromContext = function (context) {
        var config = new QuickDialogConfig();
        config.appId = context.app.id;
        config.isContent = context.app.isContent;
        config.isInnerContent = context.instance.id !== context.contentBlock.id; // if it differs, it's inner
        config.hasContent = context.app.hasContent;
        config.isList = context.contentBlock.isList;
        config.templateId = context.contentBlock.templateId;
        config.contentTypeId = context.contentBlock.contentTypeId;
        config.user = __WEBPACK_IMPORTED_MODULE_0__manage_user_of_edit_context__["UserOfEditContext"].fromContext(context);
        config.supportsAjax = context.app.supportsAjax;
        config.debug = window.$2sxc.debug.load;
        return config;
    };
    return QuickDialogConfig;
}());



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStateHandler", function() { return SessionStateHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DebugConfig__ = __webpack_require__(17);

/**
 * This object helps persist / load / reset
 * a setting in the session-state
 */
var SessionStateHandler = /** @class */ (function () {
    function SessionStateHandler(key) {
        this.key = key;
    }
    SessionStateHandler.prototype.set = function (value) {
        if (__WEBPACK_IMPORTED_MODULE_0__DebugConfig__["DebugConfig"].state.change)
            console.log("state '" + this.key + "' set(" + value + ")");
        sessionStorage.setItem(this.key, value);
    };
    SessionStateHandler.prototype.remove = function () {
        if (__WEBPACK_IMPORTED_MODULE_0__DebugConfig__["DebugConfig"].state.change)
            console.log("state '" + this.key + "' remove()");
        sessionStorage.removeItem(this.key);
    };
    SessionStateHandler.prototype.get = function () {
        var result = SessionStorageHelper.getItemValue(this.key);
        if (__WEBPACK_IMPORTED_MODULE_0__DebugConfig__["DebugConfig"].state.get)
            console.log("state '" + this.key + "' get() = '" + result + "'");
        return result;
    };
    return SessionStateHandler;
}());

/**
 * session storage helper to get typed values from it
 */
var SessionStorageHelper = /** @class */ (function () {
    function SessionStorageHelper() {
    }
    SessionStorageHelper.getItemValueString = function (key) {
        var value = sessionStorage.getItem(key);
        return value;
    };
    SessionStorageHelper.getItemValue = function (key) {
        var value = sessionStorage.getItem(key);
        return JSON.parse(value);
    };
    return SessionStorageHelper;
}());


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plumbing__ = __webpack_require__(95);

/**
 * The real button configuration as it's used at runtime
 */
var Button = /** @class */ (function () {
    function Button(action, name /*, partialConfig?: Partial<Button> */) {
        this.name = name;
        this.classes = '';
        this.show = null; // maybe
        this.dynamicDisabled = function () { return false; };
        if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
            this.action = action;
            // get defaults from action commandDefinition
            Object(__WEBPACK_IMPORTED_MODULE_0__plumbing__["TypeSafeAssign"])(this, action.commandDefinition.buttonConfig);
        }
        // if (partialConfig) TypeSafeAssign(this, partialConfig);
    }
    Button.normalize = function (oldFormat) {
        var config = {};
        if (oldFormat.classes)
            config.classes = oldFormat.classes;
        if (oldFormat.dialog)
            config.dialog = evalPropOrFun(oldFormat.dialog);
        if (oldFormat.disabled)
            config.disabled = evalPropOrFun(oldFormat.disabled);
        if (oldFormat.dynamicClasses)
            config.dynamicClasses = evalPropOrFun(oldFormat.dynamicClasses);
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
        if (oldFormat.showCondition)
            config.showCondition = evalPropOrFun(oldFormat.showCondition);
        if (oldFormat.title)
            config.title = evalPropOrFun(oldFormat.title);
        return config;
    };
    /** Detect if this is a Button */
    Button.is = function (thing) {
        return thing.action !== undefined;
    };
    Button.isArray = function (thing) {
        return thing.length && Button.is(thing[0]);
    };
    return Button;
}());

function evalPropOrFun(propOrFunction) {
    if (propOrFunction === undefined || propOrFunction === null)
        return false;
    if (typeof (propOrFunction) === 'function')
        return propOrFunction;
    return function () { return propOrFunction; };
}


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TypeTbD__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TypeTbD___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TypeTbD__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__TypeTbD__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__TypeTbD__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_safe_assign__ = __webpack_require__(44);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeSafeAssign", function() { return __WEBPACK_IMPORTED_MODULE_1__type_safe_assign__["TypeSafeAssign"]; });




/***/ }),
/* 96 */
/***/ (function(module, exports) {

// These types here are alias-types used for conversions and casting
// We created aliases, so we can specifically see where/why we are doing this


/***/ }),
/* 97 */
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
/* 98 */
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
    }
    return Toolbar;
}());



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettings", function() { return ToolbarSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettingsDefaults", function() { return ToolbarSettingsDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarSettingsForEmpty", function() { return ToolbarSettingsForEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarEmpty", function() { return ToolbarEmpty; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plumbing_type_safe_assign__ = __webpack_require__(44);

/** contains toolbar behaviour settings like float, etc. */
var ToolbarSettings = /** @class */ (function () {
    function ToolbarSettings(toolbarSettings) {
        this.autoAddMore = null; //  [true: used to be right/start]
        this.hover = 'right';
        this.show = 'hover';
        this.classes = '';
        /**
         * Experimental 10.27 - modifiers for the buttons
         * Should never be set from the page, but the toolbar initializer will set this
         */
        this._btnModifiers = [];
        if (toolbarSettings)
            Object(__WEBPACK_IMPORTED_MODULE_0__plumbing_type_safe_assign__["TypeSafeAssign"])(this, toolbarSettings);
    }
    ToolbarSettings.evalModifier = function (name, settings) {
        name = name.toLocaleLowerCase();
        var set = settings._btnModifiers.find(function (bf) { return bf.name === name; });
        return (set) ? set.operation : null;
    };
    return ToolbarSettings;
}());

// ToDo: refactor to avoid side-effects
var ToolbarSettingsDefaults = new ToolbarSettings({
    autoAddMore: null,
    hover: 'right',
    show: 'hover',
});
/** default / fallback settings for toolbars when nothings is specified */
var ToolbarSettingsForEmpty = new ToolbarSettings({
    autoAddMore: 'start',
    hover: 'left',
    show: 'hover',
});
// TODO: this is in the wrong place, shouldn't be in settings
var ToolbarEmpty = {
    toolbar: {},
    settings: ToolbarSettingsForEmpty,
};


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonModifier", function() { return ButtonModifier; });
// tslint:disable-next-line: max-classes-per-file
var ButtonModifier = /** @class */ (function () {
    function ButtonModifier(code) {
        this.operation = null;
        if (!code || !code.length)
            return;
        if (code[0] === '+')
            this.operation = '+';
        if (code[0] === '-')
            this.operation = '-';
        if (this.operation)
            this.name = code.substring(1).toLocaleLowerCase();
    }
    return ButtonModifier;
}());



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandLinkGenerator", function() { return CommandLinkGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manage_ng_dialog_params__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__translate_2sxc_translate__ = __webpack_require__(7);
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
var CommandLinkGenerator = /** @class */ (function () {
    function CommandLinkGenerator(context) {
        this.context = context;
        // Initialize Items
        this.items = context.button.action.params.items || []; // use predefined or create empty array
        // initialize params
        // todo: stv, clean this
        this.urlParams = this.evalPropOrFunction(context.button.params, context, {});
        var dialog = this.evalPropOrFunction(context.button.dialog, context, '');
        // note: this corrects how the variable to name the dialog changed in the history of 2sxc from action to dialog
        this.urlParams = __assign({ dialog: dialog || context.button.action.name }, this.urlParams);
        // this.params = O.bject.assign({ dialog: dialog || context.button.action.name }, params);
        // initialize root url to dialog
        this.rootUrl = this.getDialogUrl();
        // get isDebug url Parameter
        this.debugUrlParam = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';
        // activate items for list or simple item depending on the scenario
        if (context.button.action.params.useModuleList)
            this.addContentGroupItems(true);
        if (context.button.action.params.parent)
            this.addItemInList();
        else
            this.addItem();
        // if the command has own configuration stuff, do that now
        if (context.button.configureCommand)
            context.button.configureCommand(context, this);
    }
    /**
     * build the link, combining specific params with global ones and put all in the url
     */
    CommandLinkGenerator.prototype.getLink = function () {
        var context = this.context;
        var params = context.button.action.params;
        var urlItems = this.urlParams;
        // steps for all actions: prefill, serialize, open-dialog
        // when doing new, there may be a prefill in the link to initialize the new item
        if (params.prefill)
            for (var i = 0; i < this.items.length; i++)
                this.items[i].Prefill = params.prefill;
        delete urlItems.prefill; // added 2020-03-11, seemed strange that it's not removed
        urlItems.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list
        // clone the params and adjust parts based on partOfPage settings...
        var partOfPage = context.button.partOfPage(context);
        var ngDialogParams = new __WEBPACK_IMPORTED_MODULE_0__manage_ng_dialog_params__["NgUrlValuesWithoutParams"](context, partOfPage); // 2dm simplified buildNgDialogParams
        return this.rootUrl + "#" + $.param(ngDialogParams) + "&" + $.param(urlItems) + this.debugUrlParam;
    };
    /**
     * Determine the url to open a dialog, based on the settings which UI version to use
     */
    CommandLinkGenerator.prototype.getDialogUrl = function () {
        var context = this.context;
        return context.instance.sxcRootUrl + "desktopmodules/tosic_sexycontent/" + ((context.ui.form === 'ng8'
            && context.button.dialog(context) === 'edit')
            ? __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].ng8
            : __WEBPACK_IMPORTED_MODULE_1__settings_DialogPaths__["DialogPaths"].ng1) + "?sxcver=" + context.instance.sxcVersion;
    };
    CommandLinkGenerator.prototype.evalPropOrFunction = function (propOrFunction, context, fallback) {
        return (propOrFunction === undefined || propOrFunction === null)
            ? fallback
            : (typeof (propOrFunction) === 'function' ? propOrFunction(context) : propOrFunction);
    };
    CommandLinkGenerator.prototype.addItem = function () {
        var item = {};
        var params = this.context.button.action.params;
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
            this.items.push(__assign(__assign({}, item), { Title: Object(__WEBPACK_IMPORTED_MODULE_2__translate_2sxc_translate__["translate"])(this.findTranslationKey(this.findPartName(true))) }));
        }
    };
    /**
     * this will tell the command to edit a item from the sorted list in the group,
     * optionally together with the presentation item
     */
    CommandLinkGenerator.prototype.addContentGroupItems = function (withPresentation) {
        var _this = this;
        var params = this.context.button.action.params;
        var isContentAndNotHeader = (params.sortOrder !== -1);
        var index = isContentAndNotHeader ? params.sortOrder : 0;
        var isAdd = this.context.button.action.name === 'new';
        var groupId = this.context.contentBlock.contentGroupId;
        var fields = [this.findPartName(true)];
        if (withPresentation)
            fields.push(this.findPartName(false));
        fields.map(function (f) { return _this.addContentGroupItem(groupId, index, f, isAdd); });
        // previous code before 10.27
        // this.addContentGroupItem(groupId, index, this.findPartName(true), isAdd);
        // if (withPresentation)
        //   this.addContentGroupItem(groupId, index, this.findPartName(false), isAdd);
    };
    /**
     * this adds an item of the content-group, based on the group GUID and the sequence number
     */
    CommandLinkGenerator.prototype.addContentGroupItem = function (guid, index, part, isAdd) {
        this.items.push({
            Group: {
                Guid: guid,
                Index: index,
                Part: part.toLocaleLowerCase(),
                Add: isAdd,
            },
            Title: Object(__WEBPACK_IMPORTED_MODULE_2__translate_2sxc_translate__["translate"])(this.findTranslationKey(part)),
        });
    };
    /**
     * EXPERIMENTAL in 10.27, if a parent is specified, use that
     * this will tell the command to edit a item which also belongs to a list
     * this is relevant when adding new items
     */
    CommandLinkGenerator.prototype.addItemInList = function () {
        var _this = this;
        var params = this.context.button.action.params;
        var index = params.sortOrder;
        var isAdd = this.context.button.action.name === 'new';
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
        var isContentAndNotHeader = (this.context.button.action.params.sortOrder !== -1);
        return (isContentAndNotHeader ? '' : 'List') + (content ? 'Content' : 'Presentation');
    };
    /**
     * find the correct i18n key for this part
     */
    CommandLinkGenerator.prototype.findTranslationKey = function (partName) {
        return "EditFormTitle." + partName;
    };
    return CommandLinkGenerator;
}());



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgUrlValuesWithoutParams", function() { return NgUrlValuesWithoutParams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_of_edit_context__ = __webpack_require__(33);

/**
 * This is for building/serializing the main url params when opening a dialog.
 * It does not contain the "params" / "items" part
 * @export
 * @class NgUrlValuesWithoutParams
 */
var NgUrlValuesWithoutParams = /** @class */ (function () {
    function NgUrlValuesWithoutParams(context, partOfPage) {
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
        this.user = __WEBPACK_IMPORTED_MODULE_0__user_of_edit_context__["UserOfEditContext"].fromContext(context);
        this.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
        if (context && context.button && context.button.action && context.button.action.params && context.button.action.params.apps)
            this.apps = context.button.action.params.apps;
        this.fa = !context.app.isContent;
        this.rvt = $.ServicesFramework(0).getAntiForgeryValue();
    }
    return NgUrlValuesWithoutParams;
}());



/***/ }),
/* 103 */
/***/ (function(module, exports) {



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SxcInstanceEngine", function() { return SxcInstanceEngine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cms_Cms__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(3);


/**
 * This is an engine on the sxc object.
 * It provides a .run(...) for when the sxc is already known.
 */
var SxcInstanceEngine = /** @class */ (function () {
    function SxcInstanceEngine(sxc) {
        this.sxc = sxc;
    }
    SxcInstanceEngine.prototype.run = function (nameOrSettings, eventOrSettings, event) {
        var cntx = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(this.sxc);
        return new __WEBPACK_IMPORTED_MODULE_0__cms_Cms__["Cms"]().run(cntx, nameOrSettings, eventOrSettings, event);
    };
    return SxcInstanceEngine;
}());



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Manage", function() { return Manage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_manager__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_of_edit_context__ = __webpack_require__(33);





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
        this.initInstance = initInstance;
    }
    return Manage;
}());

// export const _manage = new Manage(); // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
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
function initInstance(sxc) {
    try {
        _initInstance(sxc);
    }
    catch (e) {
        console.error('error in 2sxc - will log but not throw', e);
    }
}
// ReSharper disable once InconsistentNaming
function _initInstance(sxc) {
    var myContext = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(sxc);
    var editContext = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getEditContext(myContext.sxc);
    var userInfo = __WEBPACK_IMPORTED_MODULE_4__user_of_edit_context__["UserOfEditContext"].fromContext(myContext); // 2dm simplified getUserOfEditContext(context);
    var cmdEngine = new __WEBPACK_IMPORTED_MODULE_0__commands__["SxcInstanceEngine"](myContext.sxc);
    var editManager = new __WEBPACK_IMPORTED_MODULE_3__edit_manager__["EditManager"](myContext.sxc, editContext, userInfo, cmdEngine, myContext);
    sxc.manage = editManager;
    editManager.init();
    return editManager;
}


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditManager", function() { return EditManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contentBlock_dnn_module_editor__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_config_loaders__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar_render_toolbar_renderer__ = __webpack_require__(35);




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
        // ReSharper disable InconsistentNaming
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
        this._getCbManipulator = function () { return new __WEBPACK_IMPORTED_MODULE_0__contentBlock_dnn_module_editor__["DnnModuleEditor"](_this.sxc); }; // manipulator(this.sxc);
        // ReSharper restore InconsistentNaming
        /**
         * init this object
         */
        this.init = function () {
            var tag = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getTag(_this.sxc);
            // enhance UI in case there are known errors / issues
            var isErrorState = _this.editContext && _this.editContext.error && _this.editContext.error.type;
            if (isErrorState)
                handleErrors(_this.editContext.error.type, tag);
        };
    }
    /**
     * Generate a button (an <a>-tag) for one specific toolbar-action.
     * @param {InPageButtonJson} actDef - settings, an object containing the spec for the expected button
     * @param {int} groupIndex - number what button-group it's in'
     * @returns {string} html of a button
     * it is publicly used out of inpage, so take a care to preserve function signature
     */
    EditManager.prototype.getButton = function (actDef, groupIndex) {
        this.context.button = new __WEBPACK_IMPORTED_MODULE_2__toolbar_config_loaders__["ButtonConfigLoader"](null).convertToButton(actDef);
        var button = new __WEBPACK_IMPORTED_MODULE_3__toolbar_render_toolbar_renderer__["ToolbarRenderer"](this.context).button.render(this.context, groupIndex);
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
        var toolbarConfig = new __WEBPACK_IMPORTED_MODULE_2__toolbar_config_loaders__["ToolbarConfigLoader"](null).expandToolbarConfig(this.context, tbConfig, moreSettings);
        this.context.toolbar = toolbarConfig;
        return new __WEBPACK_IMPORTED_MODULE_3__toolbar_render_toolbar_renderer__["ToolbarRenderer"](this.context).render(); // renderToolbar(this.context);
    };
    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    EditManager.prototype._updateContentGroupGuid = function (context, newGuid) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.ContentGroup.Guid = newGuid;
        // 2dm disabled, doesn't seem used -
        // todo q2stv - question, pls confirm
        // this._instanceConfig = InstanceConfig.fromContext(context);// 2dm simplified buildInstanceConfig(context);
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
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DnnModuleEditor", function() { return DnnModuleEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_manager__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__translate_2sxc_translate__ = __webpack_require__(7);



/** contains commands to create/move/delete a module in a page */
var DnnModuleEditor = /** @class */ (function () {
    function DnnModuleEditor(sxcInstance) {
        this.sxcInstance = sxcInstance;
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
    DnnModuleEditor.prototype.create = function (parentId, fieldName, index, appName, container, newGuid) {
        // the wrapper, into which this will be placed and the list of pre-existing blocks
        var listTag = container;
        if (listTag.length === 0) {
            alert('can\'t add content-block as we couldn\'t find the list');
            return Promise.resolve();
        }
        var cblockList = listTag.find('div.sc-content-block');
        if (index > cblockList.length)
            index = cblockList.length; // make sure index is never greater than the amount of items
        var params = {
            parentId: parentId,
            field: fieldName,
            sortOrder: index,
            app: appName,
            guid: newGuid,
        };
        var jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/generatecontentblock', params: params })
            .then(function (result) {
            var newTag = $(result); // prepare tag for inserting
            // should I add it to a specific position...
            if (cblockList.length > 0 && index > 0)
                $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                    .after(newTag);
            else // ...or just at the beginning?
                listTag.prepend(newTag);
            // ReSharper disable once UnusedLocals
            var sxcNew = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__["SxcEdit"].get(newTag);
            __WEBPACK_IMPORTED_MODULE_1__toolbar_toolbar_manager__["ToolbarManager"].buildModule(newTag);
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
    DnnModuleEditor.prototype.move = function (parentId, field, indexFrom, indexTo) {
        var params = {
            parentId: parentId,
            field: field,
            indexFrom: indexFrom,
            indexTo: indexTo,
        };
        var jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/moveiteminlist', params: params })
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
    DnnModuleEditor.prototype.delete = function (parentId, field, index) {
        if (!confirm(Object(__WEBPACK_IMPORTED_MODULE_2__translate_2sxc_translate__["translate"])('QuickInsertMenu.ConfirmDelete')))
            return null;
        var params = {
            parentId: parentId,
            field: field,
            index: index,
        };
        var jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
            .then(function () {
            console.log('done deleting!');
            window.location.reload();
        });
        return Promise.resolve(jqPromise);
    };
    return DnnModuleEditor;
}());



/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderButton", function() { return RenderButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_button_command__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_part_base__ = __webpack_require__(47);
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
        return _super.call(this, parent) || this;
    }
    RenderButton.prototype.render = function (context, groupIndex) {
        var buttonConfig = context.button;
        // retrieve configuration for this button
        var commandParams = __WEBPACK_IMPORTED_MODULE_0__config_button_command__["ButtonCommand"].normalize(buttonConfig.action);
        var onclick = '';
        var disabled = typeof (buttonConfig.disabled) === 'function'
            ? buttonConfig.disabled(context)
            : buttonConfig.disabled;
        if (!disabled) {
            onclick = "$2sxc(" + context.instance.id + ", " + context.contentBlock.id + ").manage.run(" + JSON.stringify(commandParams) + ", event);";
        }
        var button = document.createElement('a');
        if (buttonConfig.action)
            button.classList.add("sc-" + buttonConfig.action.name);
        button.classList.add("group-" + groupIndex);
        if (disabled)
            button.classList.add('disabled');
        this.parent.addClasses(button, buttonConfig.classes, ',');
        if (buttonConfig.dynamicClasses) {
            var dynamicClasses = buttonConfig.dynamicClasses(context);
            this.parent.addClasses(button, dynamicClasses, ' ');
        }
        button.setAttribute('onclick', onclick); // serialize JavaScript because of ajax
        if (buttonConfig.title)
            button.setAttribute('data-i18n', "[title]" + buttonConfig.title(context)); // localization support
        var box = document.createElement('div');
        var symbol = document.createElement('i');
        if (buttonConfig.icon)
            this.parent.addClasses(symbol, buttonConfig.icon(context), ' ');
        symbol.setAttribute('aria-hidden', 'true');
        box.appendChild(symbol);
        button.appendChild(box);
        return button;
    };
    return RenderButton;
}(__WEBPACK_IMPORTED_MODULE_1__render_part_base__["RenderPart"]));



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderButtonGroups", function() { return RenderButtonGroups; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render_part_base__ = __webpack_require__(47);
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
        return _super.call(this, parent) || this;
    }
    RenderButtonGroups.prototype.render = function (context) {
        var groupsBuffer = []; // temporary storage for detached HTML DOM objects
        var btnGroups = context.toolbar.groups;
        for (var i = 0; i < btnGroups.length; i++) {
            var btns = btnGroups[i].buttons;
            for (var h = 0; h < btns.length; h++) {
                var btnContext = context.forButton(btns[h]);
                // create one button
                var button = this.parent.button.render(btnContext, i);
                // add button to group of buttons
                var item = document.createElement('li');
                item.appendChild(button);
                groupsBuffer.push(item);
            }
        }
        return groupsBuffer;
    };
    return RenderButtonGroups;
}(__WEBPACK_IMPORTED_MODULE_0__render_part_base__["RenderPart"]));



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigFinderAndInitializer", function() { return ToolbarConfigFinderAndInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging_has_log__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_loaders__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__render_toolbar_renderer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tag_toolbars_tag_toolbar__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toolbar_init_config__ = __webpack_require__(48);
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
var toolbarSelector = ".sc-menu[toolbar],.sc-menu[data-toolbar],[" + __WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.full + "]";
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
    function ToolbarConfigFinderAndInitializer(parent) {
        return _super.call(this, 'Tlb.Buildr', parent.log) || this;
    }
    /**
     * Generate toolbars inside a MODULE tag (usually a div with class sc-edit-context)
     * @param parentTag
     * @param optionalId
     */
    ToolbarConfigFinderAndInitializer.prototype.buildDnnModule = function (parentTag, optionalId) {
        var _this = this;
        parentTag = $(parentTag || '.DnnModule-' + optionalId);
        // if something says the toolbars are disabled, then skip
        if (parentTag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.disable))
            return;
        var toolbars = this.findChildTagsWithConfig(parentTag);
        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            toolbars = addDefaultToolbarConfigToTag(parentTag);
            if (toolbars == null)
                return;
        }
        toolbars.each(function (i, e) { return _this.loadConfigAndInitialize(e); });
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
        var contextNode = $(node).closest(__WEBPACK_IMPORTED_MODULE_0__constants__["cb"].selectors.ofName)[0];
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
            return $(e).closest(__WEBPACK_IMPORTED_MODULE_0__constants__["cb"].selectors.ofName)[0] === parentTag[0];
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
        var tag = $(node);
        // Do not process tag if a toolbar has already been attached
        if (tag.data(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attrToMarkInitalized))
            return;
        var config = __WEBPACK_IMPORTED_MODULE_7__toolbar_init_config__["ToolbarInitConfig"].loadFromTag(node);
        if (config != null) { // is null if load failed
            // catch errors, as this is very common - make sure the others are still rendered
            try {
                this.convertConfigToToolbars(tag, config);
            }
            catch (err2) {
                console.error('error creating toolbar - will skip this one', err2);
            }
        }
    };
    /**
     * Take a configuration and convert into a toolbar-menu; also attach the hover-attribute
     * @param tag
     * @param config
     */
    ToolbarConfigFinderAndInitializer.prototype.convertConfigToToolbars = function (tag, config) {
        var context = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(tag);
        context.toolbar = new __WEBPACK_IMPORTED_MODULE_4__config_loaders__["ToolbarConfigLoader"](this.log).expandToolbarConfig(context, config.toolbar, config.settings);
        // V2 where the full toolbar is included in one setting
        if (tag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.full)) {
            tag.data(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attrToMarkInitalized, new __WEBPACK_IMPORTED_MODULE_6__tag_toolbars_tag_toolbar__["TagToolbar"](tag, context));
            addHoverAttributeToTag(tag);
            return;
        }
        // default case, tag is the old <ul> tag, so find the sc-element parent before replacing
        var toolbar = new __WEBPACK_IMPORTED_MODULE_5__render_toolbar_renderer__["ToolbarRenderer"](context).render();
        var scElementParent = tag.closest(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].selectors.ofOldHover);
        tag.replaceWith(toolbar);
        if (scElementParent.length > 0)
            addHoverAttributeToTag(scElementParent);
    };
    return ToolbarConfigFinderAndInitializer;
}(__WEBPACK_IMPORTED_MODULE_2__logging_has_log__["HasLog"]));

//////////////////////////////// Private Functions ////////////////////////////////////
/**
 * add hover-attribute to tag which is responsible for the menu to appear/disappear
 */
function addHoverAttributeToTag(jtag) {
    if (jtag.length <= 0)
        return; // skip in case nothing was given
    var tag = jtag[0];
    if (!tag.hasAttribute(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.hover))
        tag.setAttribute(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.hover, '');
}
/**
 * Create a default/fallback toolbar and return it
 */
function addDefaultToolbarConfigToTag(parentTag) {
    if (dbg)
        console.log("didn't find toolbar, so will auto-create", parentTag);
    var outsideCb = !parentTag.hasClass(__WEBPACK_IMPORTED_MODULE_0__constants__["cb"].classes.name);
    var contentTag = outsideCb ? parentTag.find("div" + __WEBPACK_IMPORTED_MODULE_0__constants__["cb"].selectors.ofName) : parentTag;
    // auto toolbar
    var ctx = __WEBPACK_IMPORTED_MODULE_1__context_bundles_context_bundle_button__["ContextBundleButton"].findContext(contentTag);
    if (ctx.ui.autoToolbar === false)
        return null;
    contentTag.attr(__WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].attr.full, JSON.stringify(__WEBPACK_IMPORTED_MODULE_3__config__["ToolbarEmpty"]));
    return contentTag;
}


/***/ }),
/* 111 */
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
    return InPageCommandJson;
}());



/***/ }),
/* 112 */
/***/ (function(module, exports) {



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandConfigLoader", function() { return CommandConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(8);
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
     * entity support (vertical compatibility for pre 2sxc v9.x)
     * does some clean-up work on a button-definition object
     * because the target item could be specified directly, or in a complex internal object called entity
     * @param actDef
     */
    CommandConfigLoader.prototype.normalizeCommandJson = function (actDef) {
        if (!actDef.entity || !actDef.entity._2sxcEditInformation) {
            return actDef;
        }
        var editInfo = actDef.entity._2sxcEditInformation;
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
        if (actDef.entity.EntityId !== undefined)
            actDef.entityId = actDef.entity.EntityId;
        if (editInfo.sortOrder !== undefined)
            actDef.sortOrder = editInfo.sortOrder;
        delete actDef.entity; // clean up edit-info
        return actDef;
    };
    CommandConfigLoader.prototype.removeActionProperty = function (oldParameters) {
        //   const newParams = oldParameters;
        // some clean-up
        delete oldParameters.action; // remove the action property
        return oldParameters;
    };
    return CommandConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_0__logging__["HasLog"]));



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonGroupConfigLoader", function() { return ButtonGroupConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_command_more__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logging__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
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
    ButtonGroupConfigLoader.prototype.expandButtonGroups = function (fullToolbar, parentLog) {
        var log = new __WEBPACK_IMPORTED_MODULE_2__logging__["Log"]('Tlb.ExpGrp', parentLog, 'start');
        // by now we should have a structure, let's check/fix the buttons
        log.add("will expand groups - found " + fullToolbar.groups.length + " items");
        for (var g = 0; g < fullToolbar.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            var group = fullToolbar.groups[g];
            var btns = this.expandButtonList(group, fullToolbar.settings);
            var buttonConfigs = [];
            if (Array.isArray(btns)) {
                log.add("will process " + btns.length + " buttons");
                for (var b = 0; b < btns.length; b++)
                    buttonConfigs.push(this.convertToButton(btns[b], fullToolbar, group));
            }
            else
                log.add("no button array found, won't do a.nything");
            // Toolbar API v2 overwrite V1
            group.buttons = buttonConfigs;
        }
        return fullToolbar;
    };
    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    ButtonGroupConfigLoader.prototype.convertToButton = function (btn, fullToolbar, group) {
        var btnCommand = btn.command;
        if (!(__WEBPACK_IMPORTED_MODULE_0__commands__["Commands"].get(btnCommand.action))) {
            this.log.add("couldn't find action " + btnCommand.action + " - show warning");
            console.warn('warning: toolbar-button with unknown action-name:', btnCommand.action);
        }
        var name = btnCommand.action;
        var contentType = btnCommand.contentType;
        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        this.toolbar.command.normalizeCommandJson(btnCommand);
        // parameters adapter from v1 to v2
        var params = __assign(__assign({}, this.toolbar.command.removeActionProperty(btnCommand)), fullToolbar.params);
        // Toolbar API v2
        var newButtonAction = new __WEBPACK_IMPORTED_MODULE_3__config__["ButtonCommand"](name, contentType, params);
        var newButtonConfig = new __WEBPACK_IMPORTED_MODULE_3__config__["Button"](newButtonAction, name);
        // settings adapter from v1 to v2
        newButtonConfig = __assign(__assign({}, newButtonConfig), __WEBPACK_IMPORTED_MODULE_3__config__["Button"].normalize(btn));
        // ensure all buttons have either own settings, or the fallback
        this.toolbar.button.addDefaultBtnSettings(newButtonConfig, group, fullToolbar, __WEBPACK_IMPORTED_MODULE_0__commands__["Commands"]);
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
        var log = new __WEBPACK_IMPORTED_MODULE_2__logging__["Log"]('Tlb.ExpBts', this.log, 'start');
        var buttonsWip = root.buttons;
        var newButtons = [];
        // convert compact buttons (with multi-verb action objects) into own button-objects
        // important because an older syntax allowed {action: "new,edit", entityId: 17}
        if (Array.isArray(buttonsWip)) {
            log.add("detected array of btns (" + buttonsWip.length + "), will ensure it's an object");
            for (var b = 0; b < buttonsWip.length; b++) {
                var btn = buttonsWip[b];
                var actionNames = btn.action;
                if (typeof actionNames === 'string' && actionNames.indexOf(',') > -1) {
                    this.expandButtonAndAddToList(newButtons, btn, actionNames);
                }
                else {
                    newButtons.push(btn);
                }
            }
        }
        else if (typeof buttonsWip === 'string') {
            log.add("detected that it is a string \"" + buttonsWip + "\", will split by \",\" and ...");
            this.expandButtonAndAddToList(newButtons, {}, buttonsWip);
        }
        else {
            log.add('no special case detected, will use the buttons-object as is');
            newButtons = buttonsWip;
        }
        log.add("after check, found " + newButtons.length + " buttons");
        // optionally add a more-button in each group
        this.addMoreButton(settings, newButtons);
        var result = newButtons.map(function (x) { return _this.toolbar.button.normalize(x); }); // ensure the internal def is also an array now
        log.add('done');
        return result;
    };
    ButtonGroupConfigLoader.prototype.expandButtonAndAddToList = function (list, btn, names) {
        this.log.add("button def \"" + btn + " is string of ma.ny names, will expand into array with action-properties\"");
        var actions = names.split(',');
        for (var a = 0; a < actions.length; a++)
            list.push(__assign(__assign({}, btn), this.toolbar.button.getFromName(actions[a])));
    };
    /** Add the "more" button at the end or beginning */
    ButtonGroupConfigLoader.prototype.addMoreButton = function (settings, list) {
        var addMore = settings.autoAddMore;
        if (addMore) {
            var moreButton = this.toolbar.button.getFromName(__WEBPACK_IMPORTED_MODULE_1__commands_command_more__["CmdMore"]);
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
    };
    return ButtonGroupConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_2__logging__["HasLog"]));



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarConfigLoader", function() { return ToolbarConfigLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__button_config_loader__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__in_page_button__ = __webpack_require__(49);
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









var debugRawEnabled = true;
var ToolbarConfigLoader = /** @class */ (function (_super) {
    __extends(ToolbarConfigLoader, _super);
    function ToolbarConfigLoader(parentLog) {
        var _this = _super.call(this, 'Tlb.TlbCnf', parentLog) || this;
        _this.groups = new __WEBPACK_IMPORTED_MODULE_0____["ButtonGroupConfigLoader"](_this);
        _this.button = new __WEBPACK_IMPORTED_MODULE_4__button_config_loader__["ButtonConfigLoader"](_this);
        _this.command = new __WEBPACK_IMPORTED_MODULE_0____["CommandConfigLoader"](_this);
        return _this;
    }
    /** Debug-dump an object - for development */
    ToolbarConfigLoader.prototype.dump = function (location, raw) {
        if (debugRawEnabled)
            console.log('Dump ' + location, raw);
    };
    ToolbarConfigLoader.prototype.expandToolbarConfig = function (context, toolbarData, toolbarSettings) {
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.ExpTop', this.log, 'expand start');
        // if null/undefined, use empty object
        toolbarData = toolbarData || {};
        // Default to empty toolbar settings if we don't have a toolbar or settings
        if (Object.keys(toolbarData).length + Object.keys(toolbarSettings || {}).length === 0) {
            log.add('no data or settings, will use default settings for empty');
            toolbarSettings = __WEBPACK_IMPORTED_MODULE_2__config__["ToolbarSettingsForEmpty"];
        }
        // if it has an action or is an array, keep that. Otherwise get standard buttons
        toolbarData = this.getTemplateIfNoButtonsSpecified(toolbarData, log);
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // const instanceConfig = InstanceConfig.fromContext(context);
        // whatever we had, if more settings were provided, override with these...
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        var config = this.buildFullDefinition(context, toolbarData, /* instanceConfig, */ toolbarSettings);
        this.dump('expandToolbarConfig', config);
        log.add('expand done');
        return config;
    };
    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    ToolbarConfigLoader.prototype.getTemplateIfNoButtonsSpecified = function (raw, log) {
        log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.GetTpl', log);
        this.dump('getTemplateIfNoButtonsSpecified', raw);
        var modifiers = this.extractModifiers(raw, log);
        if (__WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].hasActions(raw) || __WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].is(raw)
            || __WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplateButtonGroup"].is(raw) || Array.isArray(raw))
            return raw;
        log.add('no toolbar structure specified, will use standard toolbar template');
        var template = __WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplateManager"].Instance(log).copy('default');
        template.params = (raw && Array.isArray(raw) && raw[0]) || raw; // attach parameters
        template.settings._btnModifiers = modifiers;
        this.dump('getTemplateIfNoButtonsSpecified', template);
        return template;
    };
    /**
     * Extract action params with +edit or -delete
     */
    ToolbarConfigLoader.prototype.extractModifiers = function (raw, log) {
        var buttonModifiers = null;
        // if we have an actions node,
        // check if it's just a modifier (with +/-) or a standalone list
        if (!__WEBPACK_IMPORTED_MODULE_0____["InPageCommandJson"].hasActions(raw))
            return [];
        log.add("found actions: " + raw.action);
        var firstChar = (raw.action.length) ? raw.action[0] : ' ';
        if (!(firstChar === '+' || firstChar === '-'))
            return [];
        log.add('actions have +/-, assume they are only modifiers - extract and reset');
        buttonModifiers = raw.action.split(',').map(function (btnMod) { return new __WEBPACK_IMPORTED_MODULE_2__config__["ButtonModifier"](btnMod); });
        delete raw.action; // clean up to prevent side-effects
        return buttonModifiers;
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
    ToolbarConfigLoader.prototype.buildFullDefinition = function (toolbarContext, unstructuredConfig, 
    // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
    // instanceConfig: InstanceConfig,
    toolbarSettings) {
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.BldFul', this.log, 'start');
        var configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;
        this.dump('buildFullDefinition', configWip);
        // ToDo: don't use console.log in production
        if (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].is(unstructuredConfig) && unstructuredConfig.debug)
            console.log('toolbar: detailed debug on; start build full Def');
        var tlbConfig = this.groups.expandButtonGroups(configWip, log);
        this.dump('buildFullDefinition', tlbConfig);
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        this.button.removeDisableButtons(toolbarContext, tlbConfig /*, instanceConfig */);
        this.dump('buildFullDefinition', tlbConfig);
        if (configWip.debug)
            console.log('after remove: ', configWip);
        return tlbConfig;
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
    ToolbarConfigLoader.prototype.ensureDefinitionTree = function (unstructuredConfig, toolbarSettings) {
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.DefTre', this.log, 'start');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig)
            throw ("preparing toolbar, with nothing to work on: " + unstructuredConfig);
        var newToolbar = new __WEBPACK_IMPORTED_MODULE_2__config__["Toolbar"]();
        newToolbar.groups = this.findGroups(unstructuredConfig);
        // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
        // if (!Array.isArray(unstructuredConfig) && (unstructuredConfig.action || unstructuredConfig.buttons)) {
        //     log.add('found no array, but detected action/buttons properties, will wrap config into array');
        //     unstructuredConfig = [unstructuredConfig];
        // }
        // // ensure that arrays of actions or buttons are re-mapped to the right structure node
        // if (Array.isArray(unstructuredConfig) && unstructuredConfig.length) {
        //     log.add('detected array with length');
        //     if (unstructuredConfig[0].buttons) {
        //         log.add('detected buttons on first item, assume button-group, moving into .groups');
        //         (unstructuredConfig as a.ny).groups = unstructuredConfig; // move "down"
        //     } else if (unstructuredConfig[0].command || unstructuredConfig[0].action) {
        //         log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
        //         unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        //     } else {
        //     log.add('can\'t detect what this is - show warning');
        //     console.warn("toolbar tried to build toolbar but couldn't detect type of this:", unstructuredConfig);
        //     }
        // } else
        //     log.add('not array or has no items');
        // newToolbar.groups = unstructuredConfig.groups || []; // the groups of buttons
        var probablyTemplate = unstructuredConfig;
        newToolbar.params = probablyTemplate.params || {}; // these are the default command parameters
        newToolbar.settings = __assign(__assign(__assign({}, __WEBPACK_IMPORTED_MODULE_2__config__["ToolbarSettingsDefaults"]), probablyTemplate.settings), cleanDeprecatedSettings(toolbarSettings));
        // toolbarConfig.settings = O.bject.assign({}, defaultToolbarSettings, unstructuredConfig.settings, cleanDeprecatedSettings(toolbarSettings)) as ToolbarSettings;
        newToolbar.debug = probablyTemplate.debug || false; // show more debug info
        newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.
        log.add('done');
        return newToolbar;
    };
    ToolbarConfigLoader.prototype.findGroups = function (unstructuredConfig) {
        var arrBtnsOrGroups;
        var log = new __WEBPACK_IMPORTED_MODULE_1__logging__["Log"]('Tlb.GrpArr', this.log, 'start');
        // ensure that the groups are all correct
        if (Array.isArray(unstructuredConfig))
            arrBtnsOrGroups = unstructuredConfig;
        else if (!Array.isArray(unstructuredConfig) && __WEBPACK_IMPORTED_MODULE_5__in_page_button__["InPageButtonJson"].is(unstructuredConfig)) {
            log.add('found no array, but detected action/buttons properties, will wrap config into array');
            arrBtnsOrGroups = [unstructuredConfig];
        }
        else
            // we either have groups already, or we'll return blank
            return (__WEBPACK_IMPORTED_MODULE_3__templates__["ToolbarTemplate"].is(unstructuredConfig))
                ? unstructuredConfig.groups
                : [];
        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        if (!arrBtnsOrGroups || !arrBtnsOrGroups.length) {
            log.add('not array or has no items');
            return [];
        }
        log.add('detected array with length');
        if (__WEBPACK_IMPORTED_MODULE_2__config__["ButtonGroup"].isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].buttons) {
            log.add('detected buttons on first item, assume button-group, moving into .groups');
            return arrBtnsOrGroups;
        }
        else if (__WEBPACK_IMPORTED_MODULE_5__in_page_button__["InPageButtonJson"].isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].action) {
            log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
            return [{ buttons: arrBtnsOrGroups }];
            // unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        }
        log.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrBtnsOrGroups);
        return [];
    };
    return ToolbarConfigLoader;
}(__WEBPACK_IMPORTED_MODULE_1__logging__["HasLog"]));

/**
 * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
 *
 * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
 * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
 * contain stuff we don't want passed on
 * @param toolbarSettings
 */
function cleanDeprecatedSettings(toolbarSettings) {
    var partialSettings = __assign({}, toolbarSettings);
    if (!partialSettings.autoAddMore)
        delete partialSettings.autoAddMore;
    if (!partialSettings.classes)
        delete partialSettings.classes;
    return partialSettings;
}


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateDefault", function() { return ToolbarTemplateDefault; });
// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
var ToolbarTemplateDefault = {
    name: 'default',
    groups: [
        {
            name: 'default',
            buttons: 'edit,new,metadata,publish,layout',
        }, {
            name: 'list',
            buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
        }, {
            name: 'data',
            buttons: 'delete',
        }, {
            name: 'instance',
            buttons: 'template-develop,template-settings,contentitems,template-query,contenttype',
            defaults: {
                classes: 'group-pro',
            },
        }, {
            name: 'app',
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
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateInListRight", function() { return ToolbarTemplateInListRight; });
// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
var ToolbarTemplateInListRight = {
    name: 'listitem',
    groups: [
        {
            name: 'default',
            buttons: 'edit,new,publish',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: 'list',
            buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: 'data',
            buttons: 'delete',
            defaults: {
                classes: 'group-inlist',
            },
        }, {
            name: 'instance',
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
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateManager", function() { return ToolbarTemplateManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logging_has_log__ = __webpack_require__(11);
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
var ToolbarTemplateManager = /** @class */ (function (_super) {
    __extends(ToolbarTemplateManager, _super);
    function ToolbarTemplateManager(parentLog) {
        var _this = _super.call(this, 'Tlb.TmpMan', parentLog, 'build') || this;
        _this.configTemplateList = [];
        /** hash - table of templates, to be used a list()['template - name'] */
        _this.list = {};
        _this.add(/*'default',*/ __WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateDefault"]);
        // CodeChange #2020-03-20#TemplateToolbarLeftUnused - if no side-effects, delete in June
        // this.add('left', ToolbarTemplateLeft);
        _this.add(/*'listitem',*/ __WEBPACK_IMPORTED_MODULE_0____["ToolbarTemplateInListRight"]);
        return _this;
    }
    ToolbarTemplateManager.Instance = function (parentLog) {
        // check if an instance of the class is already created
        if (this.singleton == null) {
            // If not created create an instance of the class
            // store the instance in the variable
            this.singleton = new ToolbarTemplateManager(parentLog);
        }
        // return the singleton object
        return this.singleton;
    };
    /**
     * Deep copy toolbar template, so it can be modified without changing the next use
     */
    ToolbarTemplateManager.prototype.copy = function (name) {
        return JSON.parse(JSON.stringify(this.list[name]));
    };
    /**
     * adds a template to the list, if it doesn't exist
     */
    ToolbarTemplateManager.prototype.add = function (/*name: string,*/ template /*, force?: boolean */) {
        this.list[template.name] = template;
    };
    ToolbarTemplateManager.singleton = null; // A variable which stores the singleton object. Initially, the variable acts like a placeholder
    return ToolbarTemplateManager;
}(__WEBPACK_IMPORTED_MODULE_1__logging_has_log__["HasLog"]));



/***/ }),
/* 119 */
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
    return ToolbarTemplate;
}());



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarTemplateButtonGroup", function() { return ToolbarTemplateButtonGroup; });
/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 */
var ToolbarTemplateButtonGroup = /** @class */ (function () {
    function ToolbarTemplateButtonGroup() {
        this.defaults = {};
    }
    ToolbarTemplateButtonGroup.is = function (thing) {
        return thing.buttons !== undefined;
    };
    return ToolbarTemplateButtonGroup;
}());



/***/ }),
/* 121 */
/***/ (function(module, exports) {



/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["_translateInit"] = _translateInit;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_i18next_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_i18next_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__libs_i18nextXHRBackend_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libs_jquery_i18next_min__ = __webpack_require__(125);
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
        context = __WEBPACK_IMPORTED_MODULE_0__context_bundles_context_bundle_button__["ContextBundleButton"].createContextFromEditContext(editContext);
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18next",t):e.i18next=t()}(this,function(){"use strict";function e(e){return null==e?"":""+e}function t(e,t,n){e.forEach(function(e){t[e]&&(n[e]=t[e])})}function n(e,t,n){function o(e){return e&&e.indexOf("###")>-1?e.replace(/###/g,"."):e}for(var r="string"!=typeof t?[].concat(t):t.split(".");r.length>1;){if(!e)return{};var i=o(r.shift());!e[i]&&n&&(e[i]=new n),e=e[i]}return e?{obj:e,k:o(r.shift())}:{}}function o(e,t,o){var r=n(e,t,Object),i=r.obj,s=r.k;i[s]=o}function r(e,t,o,r){var i=n(e,t,Object),s=i.obj,a=i.k;s[a]=s[a]||[],r&&(s[a]=s[a].concat(o)),r||s[a].push(o)}function i(e,t){var o=n(e,t),r=o.obj,i=o.k;return r?r[i]:void 0}function s(e,t,n){for(var o in t)o in e?"string"==typeof e[o]||e[o]instanceof String||"string"==typeof t[o]||t[o]instanceof String?n&&(e[o]=t[o]):s(e[o],t[o],n):e[o]=t[o];return e}function a(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function l(e){return"string"==typeof e?e.replace(/[&<>"'\/]/g,function(e){return C[e]}):e}function u(e){return e.interpolation={unescapeSuffix:"HTML"},e.interpolation.prefix=e.interpolationPrefix||"__",e.interpolation.suffix=e.interpolationSuffix||"__",e.interpolation.escapeValue=e.escapeInterpolation||!1,e.interpolation.nestingPrefix=e.reusePrefix||"$t(",e.interpolation.nestingSuffix=e.reuseSuffix||")",e}function c(e){return e.resStore&&(e.resources=e.resStore),e.ns&&e.ns.defaultNs?(e.defaultNS=e.ns.defaultNs,e.ns=e.ns.namespaces):e.defaultNS=e.ns||"translation",e.fallbackToDefaultNS&&e.defaultNS&&(e.fallbackNS=e.defaultNS),e.saveMissing=e.sendMissing,e.saveMissingTo=e.sendMissingTo||"current",e.returnNull=!e.fallbackOnNull,e.returnEmptyString=!e.fallbackOnEmpty,e.returnObjects=e.returnObjectTrees,e.joinArrays="\n",e.returnedObjectHandler=e.objectTreeKeyHandler,e.parseMissingKeyHandler=e.parseMissingKey,e.appendNamespaceToMissingKey=!0,e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,"sprintf"===e.shortcutFunction&&(e.overloadTranslationOptionHandler=function(e){for(var t=[],n=1;n<e.length;n++)t.push(e[n]);return{postProcess:"sprintf",sprintf:t}}),e.whitelist=e.lngWhitelist,e.preload=e.preload,"current"===e.load&&(e.load="currentOnly"),"unspecific"===e.load&&(e.load="languageOnly"),e.backend=e.backend||{},e.backend.loadPath=e.resGetPath||"locales/__lng__/__ns__.json",e.backend.addPath=e.resPostPath||"locales/add/__lng__/__ns__",e.backend.allowMultiLoading=e.dynamicLoad,e.cache=e.cache||{},e.cache.prefix="res_",e.cache.expirationTime=6048e5,e.cache.enabled=!!e.useLocalStorage,e=u(e),e.defaultVariables&&(e.interpolation.defaultVariables=e.defaultVariables),e}function p(e){return e=u(e),e.joinArrays="\n",e}function f(e){return(e.interpolationPrefix||e.interpolationSuffix||e.escapeInterpolation)&&(e=u(e)),e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,e.returnObjects=e.returnObjectTrees,e}function h(e){e.lng=function(){return S.deprecate("i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup."),e.services.languageUtils.toResolveHierarchy(e.language)[0]},e.preload=function(t,n){S.deprecate("i18next.preload() can be replaced with i18next.loadLanguages()"),e.loadLanguages(t,n)},e.setLng=function(t,n,o){return S.deprecate("i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace."),"function"==typeof n&&(o=n,n={}),n||(n={}),n.fixLng===!0&&o?o(null,e.getFixedT(t)):void e.changeLanguage(t,o)},e.addPostProcessor=function(t,n){S.deprecate("i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })"),e.use({type:"postProcessor",name:t,process:n})}}function g(e){return e.charAt(0).toUpperCase()+e.slice(1)}function d(){var e={};return R.forEach(function(t){t.lngs.forEach(function(n){return e[n]={numbers:t.nr,plurals:P[t.fc]}})}),e}function v(e,t){for(var n=e.indexOf(t);-1!==n;)e.splice(n,1),n=e.indexOf(t)}function y(){return{debug:!1,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,whitelist:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",saveMissing:!1,saveMissingTo:"fallback",missingKeyHandler:!1,postProcess:!1,returnNull:!0,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:function(){},parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,overloadTranslationOptionHandler:function(e){return{defaultValue:e[1]}},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",defaultVariables:void 0}}}function b(e){return"string"==typeof e.ns&&(e.ns=[e.ns]),"string"==typeof e.fallbackLng&&(e.fallbackLng=[e.fallbackLng]),"string"==typeof e.fallbackNS&&(e.fallbackNS=[e.fallbackNS]),e.whitelist&&e.whitelist.indexOf("cimode")<0&&e.whitelist.push("cimode"),e}var m={};m["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},m.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},m["extends"]=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},m.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},m.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},m.slicedToArray=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(l){r=!0,i=l}finally{try{!o&&a["return"]&&a["return"]()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();var x={type:"logger",log:function(e){this._output("log",e)},warn:function(e){this._output("warn",e)},error:function(e){this._output("error",e)},_output:function(e,t){console&&console[e]&&console[e].apply(console,Array.prototype.slice.call(t))}},k=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.subs=[],this.init(t,n)}return e.prototype.init=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.prefix=t.prefix||"i18next:",this.logger=e||x,this.options=t,this.debug=t.debug!==!1},e.prototype.setDebug=function(e){this.debug=e,this.subs.forEach(function(t){t.setDebug(e)})},e.prototype.log=function(){this.forward(arguments,"log","",!0)},e.prototype.warn=function(){this.forward(arguments,"warn","",!0)},e.prototype.error=function(){this.forward(arguments,"error","")},e.prototype.deprecate=function(){this.forward(arguments,"warn","WARNING DEPRECATED: ",!0)},e.prototype.forward=function(e,t,n,o){o&&!this.debug||("string"==typeof e[0]&&(e[0]=n+this.prefix+" "+e[0]),this.logger[t](e))},e.prototype.create=function(t){var n=new e(this.logger,m["extends"]({prefix:this.prefix+":"+t+":"},this.options));return this.subs.push(n),n},e}(),S=new k,w=function(){function e(){m.classCallCheck(this,e),this.observers={}}return e.prototype.on=function(e,t){var n=this;e.split(" ").forEach(function(e){n.observers[e]=n.observers[e]||[],n.observers[e].push(t)})},e.prototype.off=function(e,t){var n=this;this.observers[e]&&this.observers[e].forEach(function(){if(t){var o=n.observers[e].indexOf(t);o>-1&&n.observers[e].splice(o,1)}else delete n.observers[e]})},e.prototype.emit=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;t>o;o++)n[o-1]=arguments[o];this.observers[e]&&this.observers[e].forEach(function(e){e.apply(void 0,n)}),this.observers["*"]&&this.observers["*"].forEach(function(t){var o;t.apply(t,(o=[e]).concat.apply(o,n))})},e}(),C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},L=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{ns:["translation"],defaultNS:"translation"}:arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.data=n,r.options=o,r}return m.inherits(t,e),t.prototype.addNamespaces=function(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)},t.prototype.removeNamespaces=function(e){var t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)},t.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],r=o.keySeparator||this.options.keySeparator;void 0===r&&(r=".");var s=[e,t];return n&&"string"!=typeof n&&(s=s.concat(n)),n&&"string"==typeof n&&(s=s.concat(r?n.split(r):n)),e.indexOf(".")>-1&&(s=e.split(".")),i(this.data,s)},t.prototype.addResource=function(e,t,n,r){var i=arguments.length<=4||void 0===arguments[4]?{silent:!1}:arguments[4],s=this.options.keySeparator;void 0===s&&(s=".");var a=[e,t];n&&(a=a.concat(s?n.split(s):n)),e.indexOf(".")>-1&&(a=e.split("."),r=t,t=a[1]),this.addNamespaces(t),o(this.data,a,r),i.silent||this.emit("added",e,t,n,r)},t.prototype.addResources=function(e,t,n){for(var o in n)"string"==typeof n[o]&&this.addResource(e,t,o,n[o],{silent:!0});this.emit("added",e,t,n)},t.prototype.addResourceBundle=function(e,t,n,r,a){var l=[e,t];e.indexOf(".")>-1&&(l=e.split("."),r=n,n=t,t=l[1]),this.addNamespaces(t);var u=i(this.data,l)||{};r?s(u,n,a):u=m["extends"]({},u,n),o(this.data,l,u),this.emit("added",e,t,n)},t.prototype.removeResourceBundle=function(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)},t.prototype.hasResourceBundle=function(e,t){return void 0!==this.getResource(e,t)},t.prototype.getResourceBundle=function(e,t){return t||(t=this.options.defaultNS),"v1"===this.options.compatibilityAPI?m["extends"]({},this.getResource(e,t)):this.getResource(e,t)},t.prototype.toJSON=function(){return this.data},t}(w),N={processors:{},addPostProcessor:function(e){this.processors[e.name]=e},handle:function(e,t,n,o,r){var i=this;return e.forEach(function(e){i.processors[e]&&(t=i.processors[e].process(t,n,o,r))}),t}},O=function(e){function n(o){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,n);var i=m.possibleConstructorReturn(this,e.call(this));return t(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector"],o,i),i.options=r,i.logger=S.create("translator"),i}return m.inherits(n,e),n.prototype.changeLanguage=function(e){e&&(this.language=e)},n.prototype.exists=function(e){var t=arguments.length<=1||void 0===arguments[1]?{interpolation:{}}:arguments[1];return"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0!==this.resolve(e,t)},n.prototype.extractFromKey=function(e,t){var n=t.nsSeparator||this.options.nsSeparator;void 0===n&&(n=":");var o=t.ns||this.options.defaultNS;if(n&&e.indexOf(n)>-1){var r=e.split(n);o=r[0],e=r[1]}return"string"==typeof o&&(o=[o]),{key:e,namespaces:o}},n.prototype.translate=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("object"!==("undefined"==typeof t?"undefined":m["typeof"](t))?t=this.options.overloadTranslationOptionHandler(arguments):"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0===e||null===e||""===e)return"";"number"==typeof e&&(e=String(e)),"string"==typeof e&&(e=[e]);var n=t.lng||this.language;if(n&&"cimode"===n.toLowerCase())return e[e.length-1];var o=t.keySeparator||this.options.keySeparator||".",r=this.extractFromKey(e[e.length-1],t),i=r.key,s=r.namespaces,a=s[s.length-1],l=this.resolve(e,t),u=Object.prototype.toString.apply(l),c=["[object Number]","[object Function]","[object RegExp]"],p=void 0!==t.joinArrays?t.joinArrays:this.options.joinArrays;if(l&&"string"!=typeof l&&c.indexOf(u)<0&&(!p||"[object Array]"!==u)){if(!t.returnObjects&&!this.options.returnObjects)return this.logger.warn("accessing an object - but returnObjects options is not enabled!"),this.options.returnedObjectHandler?this.options.returnedObjectHandler(i,l,t):"key '"+i+" ("+this.language+")' returned an object instead of string.";var h="[object Array]"===u?[]:{};for(var g in l)h[g]=this.translate(""+i+o+g,m["extends"]({joinArrays:!1,ns:s},t));l=h}else if(p&&"[object Array]"===u)l=l.join(p),l&&(l=this.extendTranslation(l,i,t));else{var d=!1,v=!1;if(!this.isValidLookup(l)&&t.defaultValue&&(d=!0,l=t.defaultValue),this.isValidLookup(l)||(v=!0,l=i),(v||d)&&(this.logger.log("missingKey",n,a,i,l),this.options.saveMissing)){var y=[];if("fallback"===this.options.saveMissingTo&&this.options.fallbackLng&&this.options.fallbackLng[0])for(var b=0;b<this.options.fallbackLng.length;b++)y.push(this.options.fallbackLng[b]);else"all"===this.options.saveMissingTo?y=this.languageUtils.toResolveHierarchy(t.lng||this.language):y.push(t.lng||this.language);this.options.missingKeyHandler?this.options.missingKeyHandler(y,a,i,l):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(y,a,i,l),this.emit("missingKey",y,a,i,l)}l=this.extendTranslation(l,i,t),v&&l===i&&this.options.appendNamespaceToMissingKey&&(l=a+":"+i),v&&this.options.parseMissingKeyHandler&&(l=this.options.parseMissingKeyHandler(l))}return l},n.prototype.extendTranslation=function(e,t,n){var o=this;n.interpolation&&this.interpolator.init(n);var r=n.replace&&"string"!=typeof n.replace?n.replace:n;this.options.interpolation.defaultVariables&&(r=m["extends"]({},this.options.interpolation.defaultVariables,r)),e=this.interpolator.interpolate(e,r),e=this.interpolator.nest(e,function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return o.translate.apply(o,t)},n),n.interpolation&&this.interpolator.reset();var i=n.postProcess||this.options.postProcess,s="string"==typeof i?[i]:i;return void 0!==e&&s&&s.length&&n.applyPostProcessor!==!1&&(e=N.handle(s,e,t,n,this)),e},n.prototype.resolve=function(e){var t=this,n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=void 0;return"string"==typeof e&&(e=[e]),e.forEach(function(e){if(!t.isValidLookup(o)){var r=t.extractFromKey(e,n),i=r.key,s=r.namespaces;t.options.fallbackNS&&(s=s.concat(t.options.fallbackNS));var a=void 0!==n.count&&"string"!=typeof n.count,l=void 0!==n.context&&"string"==typeof n.context&&""!==n.context,u=n.lngs?n.lngs:t.languageUtils.toResolveHierarchy(n.lng||t.language);s.forEach(function(e){t.isValidLookup(o)||u.forEach(function(r){if(!t.isValidLookup(o)){var s=i,u=[s],c=void 0;a&&(c=t.pluralResolver.getSuffix(r,n.count)),a&&l&&u.push(s+c),l&&u.push(s+=""+t.options.contextSeparator+n.context),a&&u.push(s+=c);for(var p=void 0;p=u.pop();)t.isValidLookup(o)||(o=t.getResource(r,e,p,n))}})})}}),o},n.prototype.isValidLookup=function(e){return!(void 0===e||!this.options.returnNull&&null===e||!this.options.returnEmptyString&&""===e)},n.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];return this.resourceStore.getResource(e,t,n,o)},n}(w),j=function(){function e(t){m.classCallCheck(this,e),this.options=t,this.whitelist=this.options.whitelist||!1,this.logger=S.create("languageUtils")}return e.prototype.getLanguagePartFromCode=function(e){if(e.indexOf("-")<0)return e;var t=["NB-NO","NN-NO","nb-NO","nn-NO","nb-no","nn-no"],n=e.split("-");return this.formatLanguageCode(t.indexOf(e)>-1?n[1].toLowerCase():n[0])},e.prototype.formatLanguageCode=function(e){if("string"==typeof e&&e.indexOf("-")>-1){var t=["hans","hant","latn","cyrl","cans","mong","arab"],n=e.split("-");return this.options.lowerCaseLng?n=n.map(function(e){return e.toLowerCase()}):2===n.length?(n[0]=n[0].toLowerCase(),n[1]=n[1].toUpperCase(),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase()))):3===n.length&&(n[0]=n[0].toLowerCase(),2===n[1].length&&(n[1]=n[1].toUpperCase()),"sgn"!==n[0]&&2===n[2].length&&(n[2]=n[2].toUpperCase()),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase())),t.indexOf(n[2].toLowerCase())>-1&&(n[2]=g(n[2].toLowerCase()))),n.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e},e.prototype.isWhitelisted=function(e){return"languageOnly"===this.options.load&&(e=this.getLanguagePartFromCode(e)),!this.whitelist||!this.whitelist.length||this.whitelist.indexOf(e)>-1},e.prototype.toResolveHierarchy=function(e,t){var n=this;t=t||this.options.fallbackLng||[],"string"==typeof t&&(t=[t]);var o=[],r=function(e){n.isWhitelisted(e)?o.push(e):n.logger.warn("rejecting non-whitelisted language code: "+e)};return"string"==typeof e&&e.indexOf("-")>-1?("languageOnly"!==this.options.load&&r(this.formatLanguageCode(e)),"currentOnly"!==this.options.load&&r(this.getLanguagePartFromCode(e))):"string"==typeof e&&r(this.formatLanguageCode(e)),t.forEach(function(e){o.indexOf(e)<0&&r(n.formatLanguageCode(e))}),o},e}(),R=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","tg","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","es_ar","et","eu","fi","fo","fur","fy","gl","gu","ha","he","hi","hu","hy","ia","it","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt","pt_br","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","id","ja","jbo","ka","kk","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21}],P={1:function(e){return Number(e>1)},2:function(e){return Number(1!=e)},3:function(e){return 0},4:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},5:function(e){return Number(0===e?0:1==e?1:2==e?2:e%100>=3&&10>=e%100?3:e%100>=11?4:5)},6:function(e){return Number(1==e?0:e>=2&&4>=e?1:2)},7:function(e){return Number(1==e?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},8:function(e){return Number(1==e?0:2==e?1:8!=e&&11!=e?2:3)},9:function(e){return Number(e>=2)},10:function(e){return Number(1==e?0:2==e?1:7>e?2:11>e?3:4)},11:function(e){return Number(1==e||11==e?0:2==e||12==e?1:e>2&&20>e?2:3)},12:function(e){return Number(e%10!=1||e%100==11)},13:function(e){return Number(0!==e)},14:function(e){return Number(1==e?0:2==e?1:3==e?2:3)},15:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(10>e%100||e%100>=20)?1:2)},16:function(e){return Number(e%10==1&&e%100!=11?0:0!==e?1:2)},17:function(e){return Number(1==e||e%10==1?0:1)},18:function(e){return Number(0==e?0:1==e?1:2)},19:function(e){return Number(1==e?0:0===e||e%100>1&&11>e%100?1:e%100>10&&20>e%100?2:3)},20:function(e){return Number(1==e?0:0===e||e%100>0&&20>e%100?1:2)},21:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)}},E=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.languageUtils=t,this.options=n,this.logger=S.create("pluralResolver"),this.rules=d()}return e.prototype.addRule=function(e,t){this.rules[e]=t},e.prototype.getRule=function(e){return this.rules[this.languageUtils.getLanguagePartFromCode(e)]},e.prototype.needsPlural=function(e){var t=this.getRule(e);return!(t&&t.numbers.length<=1)},e.prototype.getSuffix=function(e,t){var n=this.getRule(e);if(n){if(1===n.numbers.length)return"";var o=n.noAbs?n.plurals(t):n.plurals(Math.abs(t)),r=n.numbers[o];if(2===n.numbers.length&&1===n.numbers[0]&&(2===r?r="plural":1===r&&(r="")),"v1"===this.options.compatibilityJSON){if(1===r)return"";if("number"==typeof r)return"_plural_"+r.toString()}return this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}return this.logger.warn("no plural rule found for: "+e),""},e}(),_=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];m.classCallCheck(this,t),this.logger=S.create("interpolator"),this.init(e,!0)}return t.prototype.init=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];t&&(this.options=e),e.interpolation||(e.interpolation={escapeValue:!0});var n=e.interpolation;this.escapeValue=n.escapeValue,this.prefix=n.prefix?a(n.prefix):n.prefixEscaped||"{{",this.suffix=n.suffix?a(n.suffix):n.suffixEscaped||"}}",this.unescapePrefix=n.unescapeSuffix?"":n.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":n.unescapeSuffix||"",this.nestingPrefix=n.nestingPrefix?a(n.nestingPrefix):n.nestingPrefixEscaped||a("$t("),this.nestingSuffix=n.nestingSuffix?a(n.nestingSuffix):n.nestingSuffixEscaped||a(")");var o=this.prefix+"(.+?)"+this.suffix;this.regexp=new RegExp(o,"g");var r=this.prefix+this.unescapePrefix+"(.+?)"+this.unescapeSuffix+this.suffix;this.regexpUnescape=new RegExp(r,"g");var i=this.nestingPrefix+"(.+?)"+this.nestingSuffix;this.nestingRegexp=new RegExp(i,"g")},t.prototype.reset=function(){this.options&&this.init(this.options)},t.prototype.interpolate=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}for(var r=void 0,s=void 0;r=this.regexpUnescape.exec(t);){var a=i(n,r[1].trim());t=t.replace(r[0],a)}for(;r=this.regexp.exec(t);)s=i(n,r[1].trim()),"string"!=typeof s&&(s=e(s)),s||(this.logger.warn("missed to pass in variable "+r[1]+" for interpolating "+t),s=""),s=o(this.escapeValue?l(s):s),t=t.replace(r[0],s),this.regexp.lastIndex=0;return t},t.prototype.nest=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}function r(e){if(e.indexOf(",")<0)return e;var t=e.split(",");e=t.shift();var n=t.join(",");n=this.interpolate(n,u);try{u=JSON.parse(n)}catch(o){this.logger.error("failed parsing options string in nesting for key "+e,o)}return e}var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=void 0,a=void 0,u=JSON.parse(JSON.stringify(i));for(u.applyPostProcessor=!1;s=this.nestingRegexp.exec(t);)a=n(r.call(this,s[1].trim()),u),"string"!=typeof a&&(a=e(a)),a||(this.logger.warn("missed to pass in variable "+s[1]+" for interpolating "+t),a=""),a=o(this.escapeValue?l(a):a),t=t.replace(s[0],a),this.regexp.lastIndex=0;return t},t}(),T=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.backend=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("backendConnector"),s.state={},s.queue=[],s.backend&&s.backend.init&&s.backend.init(r,i.backend,i),s}return m.inherits(t,e),t.prototype.queueLoad=function(e,t,n){var o=this,r=[],i=[],s=[],a=[];return e.forEach(function(e){var n=!0;t.forEach(function(t){var s=e+"|"+t;o.store.hasResourceBundle(e,t)?o.state[s]=2:o.state[s]<0||(1===o.state[s]?i.indexOf(s)<0&&i.push(s):(o.state[s]=1,n=!1,i.indexOf(s)<0&&i.push(s),r.indexOf(s)<0&&r.push(s),a.indexOf(t)<0&&a.push(t)))}),n||s.push(e)}),(r.length||i.length)&&this.queue.push({pending:i,loaded:{},errors:[],callback:n}),{toLoad:r,pending:i,toLoadLanguages:s,toLoadNamespaces:a}},t.prototype.loaded=function(e,t,n){var o=this,i=e.split("|"),s=m.slicedToArray(i,2),a=s[0],l=s[1];t&&this.emit("failedLoading",a,l,t),n&&this.store.addResourceBundle(a,l,n),this.state[e]=t?-1:2,this.queue.forEach(function(n){r(n.loaded,[a],l),v(n.pending,e),t&&n.errors.push(t),0!==n.pending.length||n.done||(n.errors.length?n.callback(n.errors):n.callback(),o.emit("loaded",n.loaded),n.done=!0)}),this.queue=this.queue.filter(function(e){return!e.done})},t.prototype.read=function(e,t,n,o,r,i){var s=this;return o||(o=0),r||(r=250),e.length?void this.backend[n](e,t,function(a,l){return a&&l&&5>o?void setTimeout(function(){s.read.call(s,e,t,n,++o,2*r,i)},r):void i(a,l)}):i(null,{})},t.prototype.load=function(e,t,n){var o=this;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),n&&n();var r=m["extends"]({},this.backend.options,this.options.backend);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]);var s=this.queueLoad(e,t,n);return s.toLoad.length?void(r.allowMultiLoading&&this.backend.readMulti?this.read(s.toLoadLanguages,s.toLoadNamespaces,"readMulti",null,null,function(e,t){e&&o.logger.warn("loading namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading failed",e),!e&&t&&o.logger.log("loaded namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading",t),s.toLoad.forEach(function(n){var r=n.split("|"),s=m.slicedToArray(r,2),a=s[0],l=s[1],u=i(t,[a,l]);if(u)o.loaded(n,e,u);else{var c="loading namespace "+l+" for language "+a+" via multiloading failed";o.loaded(n,c),o.logger.error(c)}})}):!function(){var e=function(e){var t=this,n=e.split("|"),o=m.slicedToArray(n,2),r=o[0],i=o[1];this.read(r,i,"read",null,null,function(n,o){n&&t.logger.warn("loading namespace "+i+" for language "+r+" failed",n),!n&&o&&t.logger.log("loaded namespace "+i+" for language "+r,o),t.loaded(e,n,o)})};s.toLoad.forEach(function(t){e.call(o,t)})}()):void(s.pending.length||n())},t.prototype.saveMissing=function(e,t,n,o){this.backend&&this.backend.create&&this.backend.create(e,t,n,o),this.store.addResource(e[0],t,n,o)},t}(w),A=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.cache=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("cacheConnector"),s.cache&&s.cache.init&&s.cache.init(r,i.cache,i),s}return m.inherits(t,e),t.prototype.load=function(e,t,n){var o=this;if(!this.cache)return n&&n();var r=m["extends"]({},this.cache.options,this.options.cache);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]),r.enabled?this.cache.load(e,function(t,r){if(t&&o.logger.error("loading languages "+e.join(", ")+" from cache failed",t),r)for(var i in r)for(var s in r[i])if("i18nStamp"!==s){var a=r[i][s];a&&o.store.addResourceBundle(i,s,a)}n&&n()}):n&&n()},t.prototype.save=function(){this.cache&&this.options.cache&&this.options.cache.enabled&&this.cache.save(this.store.data)},t}(w),M=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.options=b(n),r.services={},r.logger=S,r.modules={},o&&!r.isInitialized&&r.init(n,o),r}return m.inherits(t,e),t.prototype.init=function(e,t){function n(e){return e?"function"==typeof e?new e:e:void 0}var o=this;if("function"==typeof e&&(t=e,e={}),e||(e={}),"v1"===e.compatibilityAPI?this.options=m["extends"]({},y(),b(c(e)),{}):"v1"===e.compatibilityJSON?this.options=m["extends"]({},y(),b(p(e)),{}):this.options=m["extends"]({},y(),this.options,b(e)),t||(t=function(){}),!this.options.isClone){this.modules.logger?S.init(n(this.modules.logger),this.options):S.init(null,this.options);var r=new j(this.options);this.store=new L(this.options.resources,this.options);var i=this.services;i.logger=S,i.resourceStore=this.store,i.resourceStore.on("added removed",function(e,t){i.cacheConnector.save()}),i.languageUtils=r,i.pluralResolver=new E(r,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON}),i.interpolator=new _(this.options),i.backendConnector=new T(n(this.modules.backend),i.resourceStore,i,this.options),i.backendConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),i.backendConnector.on("loaded",function(e){i.cacheConnector.save()}),i.cacheConnector=new A(n(this.modules.cache),i.resourceStore,i,this.options),i.cacheConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),this.modules.languageDetector&&(i.languageDetector=n(this.modules.languageDetector),i.languageDetector.init(i,this.options.detection,this.options)),this.translator=new O(this.services,this.options),this.translator.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))})}var s=["getResource","addResource","addResources","addResourceBundle","removeResourceBundle","hasResourceBundle","getResourceBundle"];s.forEach(function(e){o[e]=function(){return this.store[e].apply(this.store,arguments)}}),"v1"===this.options.compatibilityAPI&&h(this);var a=function(){o.changeLanguage(o.options.lng,function(e,n){o.emit("initialized",o.options),o.logger.log("initialized",o.options),t(e,n)})};return this.options.resources?a():setTimeout(a,10),this},t.prototype.loadResources=function(e){var t=this;if(e||(e=function(){}),this.options.resources)e(null);else{var n=function(){if(t.language&&"cimode"===t.language.toLowerCase())return{v:e()};var n=[],o=function(e){var o=t.services.languageUtils.toResolveHierarchy(e);o.forEach(function(e){n.indexOf(e)<0&&n.push(e)})};o(t.language),t.options.preload&&t.options.preload.forEach(function(e){o(e)}),t.services.cacheConnector.load(n,t.options.ns,function(){t.services.backendConnector.load(n,t.options.ns,e)})}();if("object"===("undefined"==typeof n?"undefined":m["typeof"](n)))return n.v}},t.prototype.use=function(e){return"backend"===e.type&&(this.modules.backend=e),"cache"===e.type&&(this.modules.cache=e),("logger"===e.type||e.log&&e.warn&&e.warn)&&(this.modules.logger=e),"languageDetector"===e.type&&(this.modules.languageDetector=e),"postProcessor"===e.type&&N.addPostProcessor(e),this},t.prototype.changeLanguage=function(e,t){var n=this,o=function(o){e&&(n.emit("languageChanged",e),n.logger.log("languageChanged",e)),t&&t(o,function(){for(var e=arguments.length,t=Array(e),o=0;e>o;o++)t[o]=arguments[o];return n.t.apply(n,t)})};!e&&this.services.languageDetector&&(e=this.services.languageDetector.detect()),e&&(this.language=e,this.languages=this.services.languageUtils.toResolveHierarchy(e),this.translator.changeLanguage(e),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage(e)),this.loadResources(function(e){o(e)})},t.prototype.getFixedT=function(e,t){var n=this,o=function r(e,t){return t=t||{},t.lng=t.lng||r.lng,t.ns=t.ns||r.ns,n.t(e,t)};return o.lng=e,o.ns=t,o},t.prototype.t=function(){return this.translator&&this.translator.translate.apply(this.translator,arguments)},t.prototype.exists=function(){return this.translator&&this.translator.exists.apply(this.translator,arguments)},t.prototype.setDefaultNamespace=function(e){this.options.defaultNS=e},t.prototype.loadNamespaces=function(e,t){var n=this;return this.options.ns?("string"==typeof e&&(e=[e]),e.forEach(function(e){n.options.ns.indexOf(e)<0&&n.options.ns.push(e)}),void this.loadResources(t)):t&&t()},t.prototype.loadLanguages=function(e,t){"string"==typeof e&&(e=[e]);var n=this.options.preload||[],o=e.filter(function(e){return n.indexOf(e)<0});return o.length?(this.options.preload=n.concat(o),
void this.loadResources(t)):t()},t.prototype.dir=function(e){e||(e=this.language);var t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam"];return t.indexOf(this.services.languageUtils.getLanguagePartFromCode(e))?"ltr":"rtl"},t.prototype.createInstance=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments[1];return new t(e,n)},t.prototype.cloneInstance=function(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1],r=new t(m["extends"]({},n,this.options,{isClone:!0}),o),i=["store","translator","services","language"];return i.forEach(function(t){r[t]=e[t]}),r},t}(w),H=new M;return H});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18nextXHRBackend",t):e.i18nextXHRBackend=t()}(this,function(){"use strict";function e(e){return a.call(r.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e}function t(e,t,n,i,a){if(i&&"object"===("undefined"==typeof i?"undefined":o["typeof"](i))){var r="",s=encodeURIComponent;for(var l in i)r+="&"+s(l)+"="+s(i[l]);i=r.slice(1)+(a?"":"&_t="+new Date)}try{var c=new(XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0");c.open(i?"POST":"GET",e,1),t.crossDomain||c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-type","application/x-www-form-urlencoded"),c.onreadystatechange=function(){c.readyState>3&&n&&n(c.responseText,c)},c.send(i)}catch(s){window.console&&console.log(s)}}function n(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"locales/add/{{lng}}/{{ns}}",allowMultiLoading:!1,parse:JSON.parse,crossDomain:!1,ajax:t}}var o={};o["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o.createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=[],a=i.forEach,r=i.slice,s=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o.classCallCheck(this,t),this.init(e,n),this.type="backend"}return o.createClass(t,[{key:"init",value:function(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.services=t,this.options=e(o,this.options||{},n())}},{key:"readMulti",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e.join("+"),ns:t.join("+")});this.loadUrl(o,n)}},{key:"read",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e,ns:t});this.loadUrl(o,n)}},{key:"loadUrl",value:function(e,t){var n=this;this.options.ajax(e,this.options,function(o,i){var a=i.status.toString();if(0===a.indexOf("5"))return t("failed loading "+e,!0);if(0===a.indexOf("4"))return t("failed loading "+e,!1);var r=void 0,s=void 0;try{r=n.options.parse(o)}catch(l){s="failed parsing "+e+" to json"}return s?t(s,!1):void t(null,r)})}},{key:"create",value:function(e,t,n,o){var i=this;"string"==typeof e&&(e=[e]);var a={};a[n]=o||"",e.forEach(function(e){var n=i.services.interpolator.interpolate(i.options.addPath,{lng:e,ns:t});i.options.ajax(n,i.options,function(e,t){},a)})}}]),t}();return s.type="backend",s});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("jqueryI18next",e):t.jqueryI18next=e()}(this,function(){"use strict";function t(t,a){function r(n,a,r){function i(t,n){return s.parseDefaultValueFromContent?e["extends"]({},t,{defaultValue:n}):t}if(0!==a.length){var o="text";if(0===a.indexOf("[")){var f=a.split("]");a=f[1],o=f[0].substr(1,f[0].length-1)}if(a.indexOf(";")===a.length-1&&(a=a.substr(0,a.length-2)),"html"===o)n.html(t.t(a,i(r,n.html())));else if("text"===o)n.text(t.t(a,i(r,n.text())));else if("prepend"===o)n.prepend(t.t(a,i(r,n.html())));else if("append"===o)n.append(t.t(a,i(r,n.html())));else if(0===o.indexOf("data-")){var l=o.substr("data-".length),d=t.t(a,i(r,n.data(l)));n.data(l,d),n.attr(o,d)}else n.attr(o,t.t(a,i(r,n.attr(o))))}}function i(t,n){var i=t.attr(s.selectorAttr);if(i||"undefined"==typeof i||i===!1||(i=t.text()||t.val()),i){var o=t,f=t.data(s.targetAttr);if(f&&(o=t.find(f)||t),n||s.useOptionsAttr!==!0||(n=t.data(s.optionsAttr)),n=n||{},i.indexOf(";")>=0){var l=i.split(";");a.each(l,function(t,e){""!==e&&r(o,e,n)})}else r(o,i,n);if(s.useOptionsAttr===!0){var d={};d=e["extends"]({clone:d},n),delete d.lng,t.data(s.optionsAttr,d)}}}function o(t){return this.each(function(){i(a(this),t);var e=a(this).find("["+s.selectorAttr+"]");e.each(function(){i(a(this),t)})})}var s=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];s=e["extends"]({},n,s),a[s.tName]=t.t.bind(t),a[s.i18nName]=t,a.fn[s.handleName]=o}var e={};e["extends"]=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};var n={tName:"t",i18nName:"i18n",handleName:"localize",selectorAttr:"data-i18n",targetAttr:"i18n-target",optionsAttr:"i18n-options",useOptionsAttr:!1,parseDefaultValueFromContent:!0},a={init:t};return a});

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DebugConfig__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_window_in_page__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logging_log__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logging_log_utils__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quick_dialog_quick_dialog__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__quick_dialog_state__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_tag_toolbars_tag_toolbar_manager__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__toolbar_toolbar_manager__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__commands_command_layout__ = __webpack_require__(36);











/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
var initializedInstances = [];
var openedTemplatePickerOnce = false;
var diagCancelStateOnStart = __WEBPACK_IMPORTED_MODULE_7__quick_dialog_state__["cancelled"].get();
$(document).ready(function () {
    // reset cancelled state after one reload
    if (diagCancelStateOnStart)
        __WEBPACK_IMPORTED_MODULE_7__quick_dialog_state__["cancelled"].remove();
    // initialize all modules
    initAllInstances(true);
    // start observing the body for configured mutations
    watchDomChanges();
});
/**
 * Scan all instances and initialize them
 * @param isFirstRun should be true only on the very initial call
 */
function initAllInstances(isFirstRun) {
    $('div[data-edit-context]').each(function () {
        initInstance(this, isFirstRun);
    });
    if (isFirstRun)
        tryShowTemplatePicker();
}
/**
 * create an observer instance and start observing
 */
function watchDomChanges() {
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
                    initInstance(node, false);
                // If the added node contains [data-edit-context] nodes, it is likely the DNN module drag manager which added
                // the node. To prevent multiple initialization while dragging modules, we additionally check for the
                // .active-module class which seems to be applied while dragging the module.
                else if (node.is(':not(.active-module)') &&
                    node.has('div[data-edit-context]')) {
                    $('div[data-edit-context]', node).each(function () {
                        initInstance(this, false);
                    });
                }
                else
                    __WEBPACK_IMPORTED_MODULE_9__toolbar_toolbar_manager__["ToolbarManager"].build(node);
            });
        });
        // Clean up orphan tags if nodes have been added
        if (processed)
            __WEBPACK_IMPORTED_MODULE_8__toolbar_tag_toolbars_tag_toolbar_manager__["TagToolbarManager"].CleanupOrphanedToolbars();
    });
    observer.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: true,
    });
}
/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker() {
    var sxc;
    // first check if we should show one according to the state-settings
    var openDialogId = __WEBPACK_IMPORTED_MODULE_7__quick_dialog_state__["cbId"].get();
    if (openDialogId) {
        // must check if it's on this page, as it could be from another page
        var found = $("[data-cb-id=\"" + openDialogId + "\"]");
        if (found.length) {
            // since the CB-ID could also be an inner content (marked as a negative "-" number)
            // we must be sure that we use the right id a.nyhow
            if (openDialogId < 0) {
                var instanceId = Number(found[0].attributes.getNamedItem(__WEBPACK_IMPORTED_MODULE_0__constants__["Attributes"].InstanceId).value);
                sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(instanceId, openDialogId);
            }
            else {
                sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(openDialogId);
            }
        }
    }
    if (!sxc) {
        var uninitializedModules = $('.sc-uninitialized');
        if (diagCancelStateOnStart || openedTemplatePickerOnce)
            return false;
        // already showing a dialog
        if (__WEBPACK_IMPORTED_MODULE_6__quick_dialog_quick_dialog__["quickDialog"].isVisible())
            return false;
        // not exactly one uninitialized module
        if (uninitializedModules.length !== 1)
            return false;
        // show the template picker of this module
        var module = uninitializedModules.parent('div[data-edit-context]')[0];
        sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(module);
    }
    if (sxc) {
        sxc.manage.run(__WEBPACK_IMPORTED_MODULE_10__commands_command_layout__["CmdLayout"]);
        openedTemplatePickerOnce = true;
    }
    return true;
}
function initInstance(module, isFirstRun) {
    // console.log("initInstance called with ", module, isFirstRun);
    // console.log("Initialized instances are ", initializedInstances);
    // check if module is already in the list of initialized modules
    if (initializedInstances.find(function (m) { return m === module; }))
        return;
    // add to modules-list first, in case we run into recursions
    initializedInstances.push(module);
    var sxc = __WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].get(module);
    // check if the sxc must be re-created. This is necessary when modules are dynamically changed
    // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
    if (!isFirstRun)
        sxc = sxc.recreate(true);
    // check if we must show the glasses
    // this must always run because it can be added ajax-style
    var wasEmpty = showGlassesButtonIfUninitialized(sxc);
    if (isFirstRun || !wasEmpty) {
        // use a logger for each iteration
        var log = new __WEBPACK_IMPORTED_MODULE_4__logging_log__["Log"]('Bts.Module');
        __WEBPACK_IMPORTED_MODULE_9__toolbar_toolbar_manager__["ToolbarManager"].buildModule(module);
        if (__WEBPACK_IMPORTED_MODULE_1__DebugConfig__["DebugConfig"].bootstrap.initInstance)
            __WEBPACK_IMPORTED_MODULE_5__logging_log_utils__["LogUtils"].logDump(log);
    }
}
function showGlassesButtonIfUninitialized(sxci) {
    // already initialized
    if (isInitialized(sxci))
        return false;
    // already has a glasses button
    var tag = $(__WEBPACK_IMPORTED_MODULE_2__interfaces_sxc_instance_editable__["SxcEdit"].getTag(sxci));
    if (tag.find('.sc-uninitialized').length !== 0)
        return false;
    // note: title is added on mouseover, as the translation isn't ready at page-load
    var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">' +
        '<div class="icon-sxc-glasses"></div>' +
        '</div>');
    btn.on('click', function () { return sxci.manage.run(__WEBPACK_IMPORTED_MODULE_10__commands_command_layout__["CmdLayout"]); });
    tag.append(btn);
    return true;
}
function isInitialized(sxci) {
    var cg = sxci &&
        sxci.manage &&
        sxci.manage._editContext &&
        sxci.manage._editContext.ContentGroup;
    return cg && cg.TemplateId !== 0;
}


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogUtils", function() { return LogUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_controller_in_page__ = __webpack_require__(25);

/**
 * logDump - to write whole log to console if is enabled
 */
var LogUtils = /** @class */ (function () {
    function LogUtils() {
    }
    /**
     * Dump log to console, when debug logging is enabled by url query string parameters
     * @param log
     */
    LogUtils.logDump = function (log) {
        // 'jslog' is additional query string url parameter, to enable log dump (debug=true is required)
        // in the future would support more variations like jslog = toolbar etc.
        var jsLogUrlParam = __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_controller_in_page__["$2sxcInPage"].urlParams.get('jslog');
        //if ($2sxc.debug.load) {
        //  console.log(log.dump());
        //}
        if (jsLogUrlParam) {
            console.log(log.dump());
        }
    };
    return LogUtils;
}());



/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAdd", function() { return CmdAdd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(12);


var CmdAdd = 'add';
/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAdd, 'AddDemo', 'plus-circled', false, true, {
    showCondition: function (context) {
        return context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1;
    },
    code: function (context) {
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].addItem(context, context.button.action.params.sortOrder + 1);
    },
});


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppImport", function() { return CmdAppImport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdAppImport = 'app-import';
/**
 * open the import dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAppImport, 'Dashboard', '', true, false, {});


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppResources", function() { return CmdAppResources; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(51);


var CmdAppResources = 'app-resources';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdAppResources, 'AppResources', 'translate', true, false, {
    dialog: function (context) { return __WEBPACK_IMPORTED_MODULE_1__edit__["CmdEditDialog"]; },
    disabled: function (context) { return context.app.resourcesId === null; },
    title: function (context) { return "Toolbar.AppResources" + (context.app.resourcesId === null ? 'Disabled' : ''); },
    // only if resources exist or are 0 (to be created)...
    showCondition: function (context) { return context.user.canDesign && !context.app.isContent; },
    configureCommand: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.app.resourcesId }];
    },
    // if it doesn't have a query, make the button faded
    dynamicClasses: function (context) { return context.app.resourcesId !== null ? '' : 'empty'; },
});


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdAppSettings", function() { return CmdAppSettings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(51);


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
    configureCommand: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.app.settingsId }];
    },
    // if it doesn't have a settings, make it less strong
    dynamicClasses: function (context) { return context.app.settingsId !== null ? '' : 'empty'; },
});


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdContentItems", function() { return CmdContentItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdContentItems = 'contentitems';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdContentItems, 'ContentItems', 'table', true, false, {
    params: function (context) { return ({ contentTypeName: context.contentBlock.contentTypeId }); },
    showCondition: function (context) {
        return (context.user.canDesign &&
            (!!context.button.action.params.contentType ||
                !!context.contentBlock.contentTypeId));
    },
    configureCommand: function (context, linkGenerator) {
        if (linkGenerator.context.button.action.params.contentType)
            // optionally override with custom type
            linkGenerator.urlParams.contentTypeName =
                linkGenerator.context.button.action.params.contentType;
        // maybe: if item doesn't have a type, use that of template
        // else if (cmdSpecs.contentTypeId)
        //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
        if (context.button.action.params.filters) {
            var enc = JSON.stringify(context.button.action.params.filters);
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
/* 133 */
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
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdContentType", function() { return CmdContentType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdContentType = 'contenttype';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdContentType, 'ContentType', 'fields', true, false, {
    showCondition: function (context) {
        return context.user.canDesign;
    },
});


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdCustom", function() { return CmdCustom; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(4);

var CmdCustom = 'custom';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0__commands__["Commands"].add(CmdCustom, 'Custom', 'bomb', true, false, {
    code: function (context, event) {
        return new Promise(function (resolve, reject) {
            console.log('custom action with code - BETA feature, may change');
            if (!context.button.action.params.customCode) {
                console.warn('custom code action, but no onclick found to run', context.button.action.params);
                resolve();
            }
            try {
                var fn = new Function('context', 'event', context.button.action.params.customCode); // jshint ignore:line
                resolve(fn(context, event));
            }
            catch (err) {
                console.error('error in custom button-code: ', context.button.action.params);
                reject(err);
            }
        });
    },
});


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdDelete", function() { return CmdDelete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_manipulation_item_commands__ = __webpack_require__(137);


var CmdDelete = 'delete';
/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdDelete, 'Delete', 'cancel', true, false, {
    // disabled: true,
    showCondition: function (context) {
        // can never be used for a modulelist item, as it is always in use somewhere
        if (context.button.action.params.useModuleList) {
            return false;
        }
        // check if all data exists required for deleting
        return (!!context.button.action.params.entityId &&
            !!context.button.action.params.entityGuid &&
            !!context.button.action.params.entityTitle);
    },
    code: function (context) {
        return __WEBPACK_IMPORTED_MODULE_1__entity_manipulation_item_commands__["contentItems"].delete(context, context.button.action.params.entityId, context.button.action.params.entityGuid, context.button.action.params.entityTitle);
    },
});


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contentItems", function() { return contentItems; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translate_2sxc_translate__ = __webpack_require__(7);

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
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdInstanceList", function() { return CmdInstanceList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdInstanceList = 'instance-list';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdInstanceList, 'Sort', 'list-numbered', false, true, {
    showCondition: function (context) {
        return (context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1);
    },
});


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdItemHistory", function() { return CmdItemHistory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdItemHistory = 'item-history';
/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdItemHistory, 'ItemHistory', 'clock', true, false, {
    inlineWindow: function (context) { return true; },
    fullScreen: function (context) { return true; },
});


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMetadata", function() { return CmdMetadata; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new__ = __webpack_require__(144);
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
/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdMetadata, 'Metadata', 'tag', false, false, {
    params: function (context) { return ({ mode: __WEBPACK_IMPORTED_MODULE_2__new__["CmdNewMode"] }); },
    dialog: function (context) { return __WEBPACK_IMPORTED_MODULE_1__edit__["CmdEditDialog"]; },
    // if it doesn't have data yet, make it less strong
    dynamicClasses: function (context) { return context.button.action.params.entityId ? '' : 'empty'; },
    // only add a metadata-button if it has metadata-infos
    showCondition: function (context) { return !!context.button.action.params.metadata; },
    configureCommand: function (context, linkGenerator) {
        var itm = {
            Title: 'EditFormTitle.Metadata',
            Metadata: __assign({ keyType: 'string', targetType: 10 }, linkGenerator.context.button.action.params.metadata),
        };
        linkGenerator.items[0] = __assign(__assign({}, linkGenerator.items[0]), itm);
        // O.bject.assign(command.items[0], itm);
    },
});


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMore", function() { return CmdMore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands__ = __webpack_require__(4);


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
            var scElement = fullMenu2.closest('.' + __WEBPACK_IMPORTED_MODULE_0__constants__["toolbar"].classes.oldHover);
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
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMoveDown", function() { return CmdMoveDown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(12);


var CmdMoveDown = 'movedown';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdMoveDown, 'MoveDown', 'move-down', false, true, {
    showCondition: function (context) {
        // TODO: do not display if is last item in list
        return (context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1);
    },
    code: function (context) {
        // TODO: make sure index is never greater than the amount of items
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].changeOrder(context, context.button.action.params.sortOrder, context.button.action.params.sortOrder + 1);
    },
});


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdMoveUp", function() { return CmdMoveUp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_list_actions__ = __webpack_require__(12);


var CmdMoveUp = 'moveup';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0__commands__["Commands"].add(CmdMoveUp, 'MoveUp', 'move-up', false, true, {
    showCondition: function (context) {
        return (context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1 &&
            context.button.action.params.sortOrder !== 0);
    },
    code: function (context) {
        return __WEBPACK_IMPORTED_MODULE_1__content_list_actions__["Actions"].changeOrder(context, context.button.action.params.sortOrder, Math.max(context.button.action.params.sortOrder - 1, 0));
    },
});


/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdNew", function() { return CmdNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdNewMode", function() { return CmdNewMode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

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
    params: function (context) { return ({ mode: CmdNewMode }); },
    dialog: function (context) { return 'edit'; },
    showCondition: function (context) {
        return (!!context.button.action.params.contentType ||
            (context.contentBlock.isList &&
                context.button.action.params.useModuleList &&
                context.button.action.params.sortOrder !== -1)); // don't provide new on the header-item
    },
    code: function (context, event) {
        // todo - should refactor this to be a toolbarManager.contentBlock command
        context.button.action.params.sortOrder = context.button.action.params.sortOrder + 1;
        // O.bject.assign(context.button.action.params, {
        //     sortOrder: context.button.action.params.sortOrder + 1,
        // });
        return __WEBPACK_IMPORTED_MODULE_0____["CmsEngine"].openDialog(context, event);
    },
});


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdPublish", function() { return CmdPublish; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_list_actions__ = __webpack_require__(12);



var CmdPublish = 'publish';
/**
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdPublish, 'Unpublished', 'eye-off', false, false, {
    showCondition: function (context) {
        return context.button.action.params.isPublished === false;
    },
    disabled: function (context) {
        console.log('disabled:', context.instance);
        return !context.instance.allowPublish;
    },
    code: function (context, event) {
        return new Promise(function (resolve, reject) {
            if (context.button.action.params.isPublished) {
                alert(Object(__WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__["translate"])('Toolbar.AlreadyPublished'));
                return resolve();
            }
            // if we have an entity-id, publish based on that
            if (context.button.action.params.entityId) {
                return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].publishId(context, context.button.action.params.entityId);
            }
            var part = context.button.action.params.sortOrder === -1
                ? 'listcontent'
                : 'content';
            var index = context.button.action.params.sortOrder === -1
                ? 0
                : context.button.action.params.sortOrder;
            return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].publish(context, part, index);
        });
    },
});


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdRemove", function() { return CmdRemove; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_list_actions__ = __webpack_require__(12);



var CmdRemove = 'remove';
/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdRemove, 'Remove', 'minus-circled', false, true, {
    showCondition: function (context) {
        return (context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1);
    },
    code: function (context) {
        return new Promise(function (resolve, reject) {
            if (confirm(Object(__WEBPACK_IMPORTED_MODULE_1__translate_2sxc_translate__["translate"])('Toolbar.ConfirmRemove'))) {
                return __WEBPACK_IMPORTED_MODULE_2__content_list_actions__["Actions"].removeFromList(context, context.button.action.params.sortOrder);
            }
            return resolve();
        });
    },
});


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdReplace", function() { return CmdReplace; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdReplace = 'replace';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdReplace, 'Replace', 'replace', false, true, {
    showCondition: function (context) {
        return context.button.action.params.useModuleList;
    },
});


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateDevelop", function() { return CmdTemplateDevelop; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdTemplateDevelop = 'template-develop';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateDevelop, 'Develop', 'code', true, false, {
    newWindow: function (context) { return true; },
    dialog: function (context) { return 'develop'; },
    showCondition: function (context) { return context.user.canDesign; },
    configureCommand: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});


/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateQuery", function() { return CmdTemplateQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdTemplateQuery = 'template-query';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateQuery, 'QueryEdit', 'filter', true, false, {
    dialog: function (context) { return 'pipeline-designer'; },
    params: function (context) {
        return { pipelineId: context.contentBlock.queryId };
    },
    newWindow: function (context) { return true; },
    disabled: function (context) {
        return context.app.settingsId === null;
    },
    title: function (context) {
        return "Toolbar.QueryEdit" + (context.contentBlock.queryId === null ? 'Disabled' : '');
    },
    showCondition: function (context) {
        return context.user.canDesign && !context.app.isContent;
    },
    dynamicClasses: function (context) {
        return context.contentBlock.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
    },
});


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateSettings", function() { return CmdTemplateSettings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdTemplateSettings = 'template-settings';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdTemplateSettings, 'TemplateSettings', 'sliders', true, false, {
    dialog: function (context) { return 'edit'; },
    showCondition: function (context) { return context.user.canDesign && !context.app.isContent; },
    configureCommand: function (context, linkGenerator) {
        linkGenerator.items = [{ EntityId: context.contentBlock.templateId }];
    },
});


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdZone", function() { return CmdZone; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

var CmdZone = 'zone';
/**
 * import this module to commands.ts
 */
__WEBPACK_IMPORTED_MODULE_0____["Commands"].add(CmdZone, 'Zone', 'manage', true, false, {
    showCondition: function (context) {
        return context.user.canDesign;
    },
});


/***/ }),
/* 152 */
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
/* 153 */
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
/* 154 */
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
/* 155 */
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
/* 156 */
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
/* 157 */
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
/* 158 */
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
/* 159 */
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
/* 160 */
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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
__webpack_require__(123);
__webpack_require__(124);
__webpack_require__(125);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(101);
__webpack_require__(52);
__webpack_require__(9);
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(174);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(12);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(51);
__webpack_require__(175);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(36);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(4);
__webpack_require__(53);
__webpack_require__(104);
__webpack_require__(0);
__webpack_require__(103);
__webpack_require__(10);
__webpack_require__(23);
__webpack_require__(107);
__webpack_require__(67);
__webpack_require__(13);
__webpack_require__(29);
__webpack_require__(31);
__webpack_require__(3);
__webpack_require__(18);
__webpack_require__(41);
__webpack_require__(30);
__webpack_require__(28);
__webpack_require__(89);
__webpack_require__(152);
__webpack_require__(176);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(88);
__webpack_require__(90);
__webpack_require__(91);
__webpack_require__(17);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(137);
__webpack_require__(22);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(25);
__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(77);
__webpack_require__(11);
__webpack_require__(112);
__webpack_require__(8);
__webpack_require__(127);
__webpack_require__(16);
__webpack_require__(106);
__webpack_require__(187);
__webpack_require__(105);
__webpack_require__(102);
__webpack_require__(93);
__webpack_require__(33);
__webpack_require__(95);
__webpack_require__(44);
__webpack_require__(96);
__webpack_require__(79);
__webpack_require__(80);
__webpack_require__(92);
__webpack_require__(78);
__webpack_require__(26);
__webpack_require__(42);
__webpack_require__(40);
__webpack_require__(15);
__webpack_require__(71);
__webpack_require__(2);
__webpack_require__(70);
__webpack_require__(74);
__webpack_require__(69);
__webpack_require__(73);
__webpack_require__(72);
__webpack_require__(75);
__webpack_require__(24);
__webpack_require__(76);
__webpack_require__(68);
__webpack_require__(32);
__webpack_require__(27);
__webpack_require__(188);
__webpack_require__(50);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(189);
__webpack_require__(49);
__webpack_require__(190);
__webpack_require__(111);
__webpack_require__(20);
__webpack_require__(115);
__webpack_require__(121);
__webpack_require__(43);
__webpack_require__(97);
__webpack_require__(100);
__webpack_require__(94);
__webpack_require__(6);
__webpack_require__(99);
__webpack_require__(98);
__webpack_require__(19);
__webpack_require__(191);
__webpack_require__(110);
__webpack_require__(48);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(47);
__webpack_require__(35);
__webpack_require__(46);
__webpack_require__(45);
__webpack_require__(21);
__webpack_require__(116);
__webpack_require__(192);
__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(119);
__webpack_require__(120);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(34);
__webpack_require__(122);
__webpack_require__(7);
module.exports = __webpack_require__(126);


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cms_Cms__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_commands__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_window_in_page__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manage_manage__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quick_edit_quick_e__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__translate_2sxc_translateInit__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__translate_2sxc_translate__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__x_bootstrap_module_bootstrapper__ = __webpack_require__(126);










__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"].context = __WEBPACK_IMPORTED_MODULE_2__context_bundles_context_bundle_button__["ContextBundleButton"].findContext; // primary API to get the context
__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"]._translateInit = __WEBPACK_IMPORTED_MODULE_7__translate_2sxc_translateInit__["_translateInit"]; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"].translate = __WEBPACK_IMPORTED_MODULE_8__translate_2sxc_translate__["translate"]; // provide an official translate API for 2sxc
__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"]._commands = __WEBPACK_IMPORTED_MODULE_1__commands_commands__["Commands"];
__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"]._manage = new __WEBPACK_IMPORTED_MODULE_5__manage_manage__["Manage"](); // _manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
__WEBPACK_IMPORTED_MODULE_4__interfaces_window_in_page__["windowInPage"].$quickE = __WEBPACK_IMPORTED_MODULE_6__quick_edit_quick_e__["QuickE"];
$(function () { return __WEBPACK_IMPORTED_MODULE_6__quick_edit_quick_e__["QuickE"].start(); }); // run on-load
__WEBPACK_IMPORTED_MODULE_3__interfaces_sxc_controller_in_page__["$2sxcInPage"].cms = new __WEBPACK_IMPORTED_MODULE_0__cms_Cms__["Cms"]();


/***/ }),
/* 163 */
/***/ (function(module, exports) {



/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LogEntry */
var LogEntry = /** @class */ (function () {
    function LogEntry() {
    }
    return LogEntry;
}());



/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentMetaLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__envDnnSfLoader__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(14);


var maxRetries = 10;
/**
 * This loads environment information from the meta-header tag.
 * Because of timing issues, it will try multiple times
 */
var EnvironmentMetaLoader = /** @class */ (function () {
    function EnvironmentMetaLoader(env) {
        this.env = env;
        this.retries = 0;
        this.log = env.log;
    }
    EnvironmentMetaLoader.prototype.loadMetaFromHeader = function (forceFallback) {
        var _this = this;
        if (forceFallback === void 0) { forceFallback = false; }
        // avoid duplicate execution
        if (this.env.ready) {
            this.log.add('loadMeta - ready - no further loading');
            return;
        }
        this.log.add('loadMetaFromHeader: start, retry:' + this.retries + ', force fallback: ' + forceFallback);
        var meta = this.getMeta(__WEBPACK_IMPORTED_MODULE_1__constants__["c" /* MetaHeaderJsApi */]);
        if (!meta) {
            this.retries++;
            if (forceFallback || this.retries >= maxRetries)
                new __WEBPACK_IMPORTED_MODULE_0__envDnnSfLoader__["a" /* EnvironmentDnnSfLoader */](this.env).dnnSfFallback();
            else {
                setTimeout(function () { _this.loadMetaFromHeader(); }, 1);
            }
            return;
        }
        this.env.load(JSON.parse(meta), 'meta header');
    };
    EnvironmentMetaLoader.prototype.getMeta = function (metaName) {
        var metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++)
            if (metas[i].getAttribute('name') === metaName)
                return metas[i].getAttribute('content');
        return '';
    };
    return EnvironmentMetaLoader;
}());



/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnvironmentDnnSfLoader; });
var helpAutoDetect = 'You must either include jQuery on the page or inject the jsApi parameters to prevent auto-detection.';
/**
 * This helps load environment information from DNN ServicesFramework - it's a fallback in case the other mechanisms fail
 */
var EnvironmentDnnSfLoader = /** @class */ (function () {
    function EnvironmentDnnSfLoader(env) {
        this.env = env;
    }
    /**
     * This will assume the new parameter injection failed and it will attempt to fallback
     * it's for backward compatibility, in case something is using $2sxc and doesn't provide the new
     * implementation
     */
    EnvironmentDnnSfLoader.prototype.dnnSfFallback = function () {
        var _this = this;
        this.env.log.add('dnnSfFallback start');
        if (typeof $ === 'undefined')
            throw "Can't load pageid, moduleid, etc. and $ is not available. \n " + helpAutoDetect;
        // await page-ready to then initialize the stuff
        $(function () { return _this.dnnSfLoadWhenDocumentReady(); });
    };
    EnvironmentDnnSfLoader.prototype.dnnSfLoadWhenDocumentReady = function () {
        this.env.log.add('dnnSfLoadWhenDocumentReady start');
        var sf = $.ServicesFramework;
        if (typeof sf === 'undefined')
            throw "can't load pageid, moduleid etc. and DNN SF is not available. \n " + helpAutoDetect;
        var dnnSf = sf(0);
        var sfJsInfo = {
            page: dnnSf.getTabId(),
            root: 'unknown',
            api: dnnSf.getServiceRoot('2sxc'),
            rvt: dnnSf.getAntiForgeryValue()
        };
        this.env.load(sfJsInfo, 'dnn SF');
    };
    return EnvironmentDnnSfLoader;
}());



/***/ }),
/* 167 */
/***/ (function(module, exports) {



/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export buildSxcRoot */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_TotalPopup__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_UrlParamManager__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Stats__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instance_SxcInstanceWithInternals__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SxcRoot__ = __webpack_require__(64);





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
        = new __WEBPACK_IMPORTED_MODULE_3__instance_SxcInstanceWithInternals__["a" /* SxcInstanceWithInternals */](id, cbid, cacheKey, $2sxc));
}
/**
 * Build a SXC Controller for the page. Should only ever be executed once
 */
function buildSxcRoot() {
    var rootApiV2 = Object(__WEBPACK_IMPORTED_MODULE_4__SxcRoot__["a" /* getRootPartsV2 */])();
    var urlManager = new __WEBPACK_IMPORTED_MODULE_1__tools_UrlParamManager__["a" /* UrlParamManager */]();
    var debug = {
        load: (urlManager.get('debug') === 'true'),
        uncache: urlManager.get('sxcver'),
    };
    var stats = new __WEBPACK_IMPORTED_MODULE_2__Stats__["a" /* Stats */]();
    var addOn = {
        _controllers: {},
        beta: {},
        _data: {},
        // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
        totalPopup: new __WEBPACK_IMPORTED_MODULE_0__tools_TotalPopup__["a" /* TotalPopup */](),
        urlParams: urlManager,
        // note: I would like to remove this from $2sxc, but it's currently
        // used both in the inpage-edit and in the dialogs
        // debug state which is needed in various places
        debug: debug,
        stats: stats,
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        parts: {
            getUrl: function (url, preventUnmin) {
                var r = (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
                if (debug.uncache && r.indexOf('sxcver') === -1)
                    r = r + ((r.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return r;
            },
        },
        jq: function () { return $2sxc_jQSuperlight; },
    };
    var merged = addOn.jq().extend(FindSxcInstance, addOn, rootApiV2);
    merged.log.add('sxc controller built');
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
/* 169 */
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
/* 170 */
/***/ (function(module, exports) {



/***/ }),
/* 171 */
/***/ (function(module, exports) {



/***/ }),
/* 172 */
/***/ (function(module, exports) {



/***/ }),
/* 173 */
/***/ (function(module, exports) {

/*
  This is the base class for the Manage object on 2sxc instances.
  It's typed here, so that API code is strongly typed, but it's incomplete.
*/


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmdApp", function() { return CmdApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);

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
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add__ = __webpack_require__(128);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAdd", function() { return __WEBPACK_IMPORTED_MODULE_0__add__["CmdAdd"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_import__ = __webpack_require__(129);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppImport", function() { return __WEBPACK_IMPORTED_MODULE_1__app_import__["CmdAppImport"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_resources__ = __webpack_require__(130);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppResources", function() { return __WEBPACK_IMPORTED_MODULE_2__app_resources__["CmdAppResources"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_settings__ = __webpack_require__(131);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdAppSettings", function() { return __WEBPACK_IMPORTED_MODULE_3__app_settings__["CmdAppSettings"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_items__ = __webpack_require__(132);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentItems", function() { return __WEBPACK_IMPORTED_MODULE_4__content_items__["CmdContentItems"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_list_action_params__ = __webpack_require__(133);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContentListActionParams", function() { return __WEBPACK_IMPORTED_MODULE_5__content_list_action_params__["ContentListActionParams"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_list_actions__ = __webpack_require__(12);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return __WEBPACK_IMPORTED_MODULE_6__content_list_actions__["Actions"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_type__ = __webpack_require__(134);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdContentType", function() { return __WEBPACK_IMPORTED_MODULE_7__content_type__["CmdContentType"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__custom__ = __webpack_require__(135);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdCustom", function() { return __WEBPACK_IMPORTED_MODULE_8__custom__["CmdCustom"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__delete__ = __webpack_require__(136);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdDelete", function() { return __WEBPACK_IMPORTED_MODULE_9__delete__["CmdDelete"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__edit__ = __webpack_require__(51);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEdit", function() { return __WEBPACK_IMPORTED_MODULE_10__edit__["CmdEdit"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdEditDialog", function() { return __WEBPACK_IMPORTED_MODULE_10__edit__["CmdEditDialog"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__instance_list__ = __webpack_require__(138);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdInstanceList", function() { return __WEBPACK_IMPORTED_MODULE_11__instance_list__["CmdInstanceList"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__item_history__ = __webpack_require__(139);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdItemHistory", function() { return __WEBPACK_IMPORTED_MODULE_12__item_history__["CmdItemHistory"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__layout__ = __webpack_require__(36);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdLayout", function() { return __WEBPACK_IMPORTED_MODULE_13__layout__["CmdLayout"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__metadata__ = __webpack_require__(140);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMetadata", function() { return __WEBPACK_IMPORTED_MODULE_14__metadata__["CmdMetadata"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__more__ = __webpack_require__(141);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMore", function() { return __WEBPACK_IMPORTED_MODULE_15__more__["CmdMore"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__movedown__ = __webpack_require__(142);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveDown", function() { return __WEBPACK_IMPORTED_MODULE_16__movedown__["CmdMoveDown"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__moveup__ = __webpack_require__(143);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdMoveUp", function() { return __WEBPACK_IMPORTED_MODULE_17__moveup__["CmdMoveUp"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__new__ = __webpack_require__(144);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNew", function() { return __WEBPACK_IMPORTED_MODULE_18__new__["CmdNew"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdNewMode", function() { return __WEBPACK_IMPORTED_MODULE_18__new__["CmdNewMode"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__publish__ = __webpack_require__(145);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdPublish", function() { return __WEBPACK_IMPORTED_MODULE_19__publish__["CmdPublish"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__remove__ = __webpack_require__(146);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdRemove", function() { return __WEBPACK_IMPORTED_MODULE_20__remove__["CmdRemove"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__replace__ = __webpack_require__(147);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdReplace", function() { return __WEBPACK_IMPORTED_MODULE_21__replace__["CmdReplace"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__template_develop__ = __webpack_require__(148);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateDevelop", function() { return __WEBPACK_IMPORTED_MODULE_22__template_develop__["CmdTemplateDevelop"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__template_query__ = __webpack_require__(149);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateQuery", function() { return __WEBPACK_IMPORTED_MODULE_23__template_query__["CmdTemplateQuery"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__template_settings__ = __webpack_require__(150);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdTemplateSettings", function() { return __WEBPACK_IMPORTED_MODULE_24__template_settings__["CmdTemplateSettings"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__zone__ = __webpack_require__(151);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CmdZone", function() { return __WEBPACK_IMPORTED_MODULE_25__zone__["CmdZone"]; });




























/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts_content_block__ = __webpack_require__(153);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentBlock", function() { return __WEBPACK_IMPORTED_MODULE_0__parts_content_block__["AttrJsonContentBlock"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parts_content_group__ = __webpack_require__(154);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonContentGroup", function() { return __WEBPACK_IMPORTED_MODULE_1__parts_content_group__["AttrJsonContentGroup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_context_root__ = __webpack_require__(152);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEditContext", function() { return __WEBPACK_IMPORTED_MODULE_2__edit_context_root__["AttrJsonEditContext"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parts_environment__ = __webpack_require__(155);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEnvironment", function() { return __WEBPACK_IMPORTED_MODULE_3__parts_environment__["AttrJsonEnvironment"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parts_error__ = __webpack_require__(156);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonError", function() { return __WEBPACK_IMPORTED_MODULE_4__parts_error__["AttrJsonError"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parts_language__ = __webpack_require__(157);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonLanguage", function() { return __WEBPACK_IMPORTED_MODULE_5__parts_language__["AttrJsonLanguage"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parts_parameters_entity__ = __webpack_require__(158);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonEntity", function() { return __WEBPACK_IMPORTED_MODULE_6__parts_parameters_entity__["AttrJsonEntity"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parts_ui__ = __webpack_require__(159);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUi", function() { return __WEBPACK_IMPORTED_MODULE_7__parts_ui__["AttrJsonUi"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parts_user__ = __webpack_require__(160);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AttrJsonUser", function() { return __WEBPACK_IMPORTED_MODULE_8__parts_user__["AttrJsonUser"]; });











/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionMenuMapper", function() { return ActionMenuMapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_command_layout__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__ = __webpack_require__(5);



/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
var ActionMenuMapper = /** @class */ (function () {
    function ActionMenuMapper(moduleId) {
        var _this = this;
        this.changeLayoutOrContent = function () { _this.run(__WEBPACK_IMPORTED_MODULE_0__commands_command_layout__["CmdLayout"]); };
        this.addItem = function () { _this.run('add', { useModuleList: true, sortOrder: 0 }); };
        this.edit = function () { _this.run('edit', { useModuleList: true, sortOrder: 0 }); };
        this.adminApp = function () { _this.run('app'); };
        this.adminZone = function () { _this.run('zone'); };
        this.develop = function () { _this.run('template-develop'); };
        this.sxc = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].get(moduleId);
        this.tag = __WEBPACK_IMPORTED_MODULE_1__interfaces_sxc_instance_editable__["SxcEdit"].getTag(this.sxc);
        this.run = this.sxc.manage.run;
    }
    return ActionMenuMapper;
}());

__WEBPACK_IMPORTED_MODULE_2__interfaces_window_in_page__["windowInPage"].$2sxcActionMenuMapper = function (moduleId) {
    return new ActionMenuMapper(moduleId);
};


/***/ }),
/* 178 */
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
/* 179 */
/***/ (function(module, exports) {

// // https://stackoverflow.com/questions/31455805/find-object-in-array-using-typescript
// interface Array<T> {
//   find(predicate: (search: T) => boolean): T;
// }


/***/ }),
/* 180 */
/***/ (function(module, exports) {



/***/ }),
/* 181 */
/***/ (function(module, exports) {

//
// Note: this interface is copied/shared between this and angular quick-edit
//


/***/ }),
/* 182 */
/***/ (function(module, exports) {

//
// Note: this interface is copied/shared between this and angular quick-edit
//


/***/ }),
/* 183 */
/***/ (function(module, exports) {



/***/ }),
/* 184 */
/***/ (function(module, exports) {

//
// Note: this interface is copied/shared between this and angular quick-edit
//


/***/ }),
/* 185 */
/***/ (function(module, exports) {



/***/ }),
/* 186 */
/***/ (function(module, exports) {

// // https://stackoverflow.com/questions/38860161/using-typescript-and-object-assign-gives-me-an-error-property-assign-does-no
// interface ObjectConstructor {
//   assign(...objects: Object[]): Object;
// }


/***/ }),
/* 187 */
/***/ (function(module, exports) {

// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused
// import { ContextBundleButton } from '../context/bundles/context-bundle-button';
// /**
//  * used to build instance config
//  */
// // TODO: 2dm I don't think this is every in use any more - it was used to
// // call showConfig and disabled, but I believe those signatures don't even expect this!
// export class InstanceConfig {
//   portalId: number;
//   tabId: number;
//   moduleId: number;
//   version: string;
//   contentGroupId: string;
//   cbIsEntity: boolean;
//   cbId: number;
//   appPath: string;
//   isList: boolean;
//   static fromContext(contextOfButton: ContextBundleButton): InstanceConfig {
//     const config = new InstanceConfig();
//     config.portalId = contextOfButton.tenant.id;
//     config.tabId = contextOfButton.page.id;
//     config.moduleId = contextOfButton.instance.id;
//     config.version = contextOfButton.instance.sxcVersion;
//     config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
//     config.cbIsEntity = contextOfButton.contentBlock.isEntity;
//     config.cbId = contextOfButton.contentBlock.id;
//     config.appPath = contextOfButton.app.appPath;
//     config.isList = contextOfButton.contentBlock.isList;
//     return config;
//   }
// }


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemUpgrader", function() { return SystemUpgrader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interfaces_sxc_instance_editable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_window_in_page__ = __webpack_require__(5);
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
    //    {
    //     finishUpgrade: finishUpgrade,
    //   };
}


/***/ }),
/* 189 */
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
/* 190 */
/***/ (function(module, exports) {

// export class InPageCodeJson_ProbablyUnused {
//   target: string;
//   isList: boolean;
// }


/***/ }),
/* 191 */
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
/* 192 */
/***/ (function(module, exports) {

// CodeChange #2020-03-20#TemplateToolbarLeftUnused - if no side-effects, delete in June
// import { ToolbarTemplate } from './toolbar-template-toolbar';
//
// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
// export const ToolbarTemplateLeft: ToolbarTemplate = {
//   groups: [
//     {
//       name: 'default',
//       buttons: 'edit,new,metadata,publish,layout',
//     }, {
//       name: 'list',
//       buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
//     }, {
//       name: 'data',
//       buttons: 'delete',
//     }, {
//       name: 'instance',
//       buttons: 'template-develop,template-settings,contentitems,template-query,contenttype',
//       defaults: {
//         classes: 'group-pro',
//       },
//     }, {
//       name: 'app',
//       buttons: 'app,app-settings,app-resources,zone',
//       defaults: {
//         classes: 'group-pro',
//       },
//     },
//   ],
//   defaults: {},
//   params: {},
//   settings: {
//     autoAddMore: 'start',
//     // these are defaults, don't set again
//     // hover: "right",
//   },
//   _isToolbarTemplate: true,
// };


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_2sxc_consts__ = __webpack_require__(32);

// prevent propagation of the click (if menu was clicked)
$(__WEBPACK_IMPORTED_MODULE_0__settings_2sxc_consts__["IDs"].sel.scMenu).click(function (e) { return e.stopPropagation(); });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// tslint:disable-next-line: no-var-requires
var Shake = __webpack_require__(195);
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
/* 195 */
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
//# sourceMappingURL=inpage.js.map