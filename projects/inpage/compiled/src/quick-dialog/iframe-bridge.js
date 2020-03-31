"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../contentBlock/render");
var templates_1 = require("../contentBlock/templates");
var context_1 = require("../context/context");
var api_1 = require("../manage/api");
var quick_dialog_1 = require("./quick-dialog");
var quick_dialog_config_1 = require("./quick-dialog-config");
var scrollTopOffset = 80;
var animationTime = 400;
function build(iFrame) {
    console.log('prot: ', IFrameBridge.prototype);
    var iFrameExtended = iFrame;
    iFrameExtended.bridge = new IFrameBridge();
    console.log('extensions: ', iFrameExtended.bridge);
    return iFrameExtended;
}
exports.build = build;
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
     * @returns {Object<any>} refreshed sxc-object
     */
    IFrameBridge.prototype.uncachedSxc = function () {
        if (!this.instanceSxc)
            throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return this.instanceSxc.recreate();
    };
    IFrameBridge.prototype.getContext = function () { return context_1.context(this.uncachedSxc()); };
    IFrameBridge.prototype.getAdditionalDashboardConfig = function () { return quick_dialog_config_1.QuickDialogConfig.fromContext(this.getContext()); };
    IFrameBridge.prototype.hide = function () { quick_dialog_1.quickDialog.setVisible(false); };
    IFrameBridge.prototype.run = function (verb) { this.uncachedSxc().manage.run(verb); };
    IFrameBridge.prototype.cancel = function () { quick_dialog_1.quickDialog.cancel(this); };
    ;
    IFrameBridge.prototype.showMessage = function (message) {
        render_1.renderer.showMessage(this.getContext(), "<p class=\"no-live-preview-available\">" + message + "</p>");
        scrollToTarget(this.tagModule);
    };
    IFrameBridge.prototype.reloadAndReInit = function () {
        var _this = this;
        this.changed = false;
        return render_1.renderer.reloadAndReInitialize(this.getContext(), true, true)
            .then(function () { return scrollToTarget(_this.tagModule); })
            .then(function () { return Promise.resolve(_this.getAdditionalDashboardConfig()); });
    };
    IFrameBridge.prototype.setTemplate = function (templateId, templateName, final) {
        var _this = this;
        this.changed = true;
        var config = this.getAdditionalDashboardConfig(), context = this.getContext();
        var ajax = config.isContent || config.supportsAjax;
        // add msg on full-reload, as it takes longer
        // don't add this on ajax, as it will have side-effects because sometimes
        // in ajax the content won't be replaced
        if (!ajax)
            this.showMessage("refreshing <b>" + templateName + "</b>...");
        var reallySave = final || !ajax;
        var promise = reallySave
            ? templates_1.updateTemplateFromDia(context, templateId)
            : render_1.renderer.ajaxLoad(context, templateId, true);
        if (final)
            promise = promise
                .then(function () { return quick_dialog_1.quickDialog.setVisible(false); });
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
        this.tagModule = $($(api_1.getTag(sxc)).parent().eq(0));
        this.sxcCacheKey = sxc.cacheKey;
        if (dialogName)
            this.dialogName = dialogName;
    };
    ;
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
exports.IFrameBridge = IFrameBridge;
function scrollToTarget(target) {
    var specs = {
        scrollTop: target.offset().top - scrollTopOffset
    };
    $('body').animate(specs, animationTime);
}
;
//# sourceMappingURL=iframe-bridge.js.map