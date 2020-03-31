"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_engine_1 = require("../commands/instance-engine");
var manipulate_1 = require("../contentBlock/manipulate");
var context_1 = require("../context/context");
var render_button_1 = require("../toolbar/item/render-button");
var render_toolbar_1 = require("../toolbar/item/render-toolbar");
var toolbar_expand_config_1 = require("../toolbar/toolbar/toolbar-expand-config");
var api_1 = require("./api");
var user_of_edit_context_1 = require("./user-of-edit-context");
var button_config_adapter_1 = require("../toolbar/adapters/button-config-adapter");
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
exports.initInstance = initInstance;
// ReSharper disable once InconsistentNaming
function _initInstance(sxc) {
    var myContext = context_1.context(sxc);
    var editContext = api_1.getEditContext(myContext.sxc);
    var userInfo = user_of_edit_context_1.UserOfEditContext.fromContext(myContext); // 2dm simplified getUserOfEditContext(context);
    var cmdEngine = new instance_engine_1.InstanceEngine(myContext.sxc);
    var editManager = new EditManager(myContext.sxc, editContext, userInfo, cmdEngine, myContext);
    sxc.manage = editManager;
    editManager.init();
    return editManager;
}
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
        /**
         * Generate a button (an <a>-tag) for one specific toolbar-action.
         * @param {Object<any>} actDef - settings, an object containing the spec for the expected button
         * @param {int} groupIndex - number what button-group it's in'
         * @returns {string} html of a button
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.getButton = function (actDef, groupIndex) {
            //const tag: any = getTag(this.sxc);
            //const myContext = context(tag);
            var newButtonConfig = button_config_adapter_1.buttonConfigAdapter(_this.context, actDef, groupIndex);
            _this.context.button = newButtonConfig;
            var button = render_button_1.renderButton(_this.context, groupIndex);
            return button.outerHTML;
        };
        /**
         * Builds the toolbar and returns it as HTML
         * @param {Object<any>} tbConfig - general toolbar config
         * @param {Object<any>} moreSettings - additional / override settings
         * @returns {string} html of the current toolbar
         *
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.getToolbar = function (tbConfig, moreSettings) {
            //const tag: any = getTag(this.sxc);
            //const myContext = context(tag);
            var toolbarConfig = toolbar_expand_config_1.expandToolbarConfig(_this.context, tbConfig, moreSettings);
            _this.context.toolbar = toolbarConfig;
            return render_toolbar_1.renderToolbar(_this.context);
        };
        //#endregion official, public properties - everything below this can change at any time
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
        // #region 2dm disabled / todo q2stv
        // todo q2stv - I think we don't need this any more
        // 
        //_dialogParameters = buildNgDialogParams(this.context);
        // 2dm disabled
        // todo q2stv - I think we don't need this any more
        /**
          * used to configure buttons / toolbars
          */
        //_instanceConfig = buildInstanceConfig(this.context);
        // 2dm disabled
        // todo q2stv - I think we don't need this any more
        /**
         * used for in-page dialogues
         */
        //_quickDialogConfig = buildQuickDialogConfig(this.context);
        //#endregion
        /** metadata necessary to know what/how to edit */
        this._editContext = this.editContext;
        /** used to handle the commands for this content-block */
        this._commands = this.cmdEngine;
        this._user = this.userInfo;
        this._getCbManipulator = function () { return manipulate_1.manipulator(_this.sxc); };
        // ReSharper restore InconsistentNaming
        /**
         * init this object
         */
        this.init = function () {
            var tag = api_1.getTag(_this.sxc);
            // enhance UI in case there are known errors / issues
            var isErrorState = _this.editContext && _this.editContext.error && _this.editContext.error.type;
            if (isErrorState)
                handleErrors(_this.editContext.error.type, tag);
        };
    }
    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    EditManager.prototype._updateContentGroupGuid = function (context, newGuid) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.ContentGroup.Guid = newGuid;
        // 2dm disabled, doesn't seem used - 
        // todo q2stv - question, pls confirm
        //this._instanceConfig = InstanceConfig.fromContext(context);// 2dm simplified buildInstanceConfig(context);
    };
    return EditManager;
}());
exports.EditManager = EditManager;
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
//# sourceMappingURL=create.js.map