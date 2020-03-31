"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuickEditState = require("./state");
var Container = require("./container");
var ContainerSize = require("./container-size");
var UrlHandler = require("./url-handler");
var DebugConfig_1 = require("../DebugConfig");
var dbg = DebugConfig_1.DebugConfig.qDialog;
var diagShowClass = 'dia-select';
/** dialog manager - the currently active dialog object */
var current = null;
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
var QuickDialogManager = /** @class */ (function () {
    function QuickDialogManager() {
    }
    /**
     * Determines if any dialog is currently showing
     */
    QuickDialogManager.prototype.isVisible = function () {
        return current != null;
    };
    ;
    /**
     * toggle visibility
     * @param {boolean} [show] true/false optional
     */
    QuickDialogManager.prototype.setVisible = function (show) {
        var cont = Container.getOrCreate();
        //if (show === undefined)
        //  show = !cont.hasClass(diagShowClass);
        // show/hide visually
        cont.toggleClass(diagShowClass, show);
        this.rememberDialogState(Container.getIFrame(cont), show);
        current = show ? Container.getIFrame() : null;
    };
    /**
     * show / reset the current iframe to use new url and callback
     * @param {ContextOfButton} context object
     * @param {string} url - url to show
     * @param {function()} closeCallback - callback event
     * @param {boolean} isFullscreen - if it should open full screen
     * @param {string} [dialogName] - optional name of dialog, to check if it's already open
     * @returns {any} jquery object of the iframe
     */
    QuickDialogManager.prototype.showOrToggleFromToolbar = function (context, url, isFullscreen, dialogName) {
        ContainerSize.setSize(isFullscreen);
        var iFrame = Container.getIFrame();
        // in case it's a toggle
        if (this.isVisible()) {
            // check if we're just toggling the current, or will show a new one afterwards
            var currentPromise = dialogName && current && current.bridge.isConfiguredFor(context.sxc.cacheKey, dialogName)
                ? this.promise
                : null;
            this.cancel(current.bridge);
            // just a hide this, return the old promise
            if (currentPromise)
                return currentPromise;
        }
        var dialogUrl = UrlHandler.rewriteUrl(url);
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
        QuickEditState.cancelled.set('true');
        this.resolvePromise(bridge.changed);
    };
    QuickDialogManager.prototype.rememberDialogState = function (iframe, state) {
        if (dbg.showHide)
            console.log("qDialog persistDia(..., " + state + ")");
        if (state) {
            var cbId = iframe.bridge.getContext().contentBlock.id.toString();
            if (dbg.showHide)
                console.log("contentBlockId: " + cbId + ")");
            return QuickEditState.cbId.set(cbId);
        }
        else
            return QuickEditState.cbId.remove();
    };
    QuickDialogManager.prototype.promiseRestart = function () {
        var _this = this;
        this.promise = new Promise(function (resolve) { return _this.resolvePromise = resolve; });
        return this.promise;
    };
    return QuickDialogManager;
}());
exports.quickDialog = new QuickDialogManager();
//# sourceMappingURL=quick-dialog.js.map