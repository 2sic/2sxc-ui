"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../contentBlock/render");
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
var window_in_page_1 = require("../interfaces/window-in-page");
var command_link_to_ng_dialog_1 = require("./command-link-to-ng-dialog");
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
/**
 * open a new dialog of the angular-ui
 * @param settings
 * @param event
 * @param sxc
 * @param editContext
 */
function commandOpenNgDialog(context, event) {
    // the link contains everything to open a full dialog (lots of params added)
    var link = command_link_to_ng_dialog_1.commandLinkToNgDialog(context);
    var fullScreen = false;
    var origEvent = event || window_in_page_1.windowInPage.event;
    return new Promise(function (resolvePromise) {
        // prepare promise for callback when the dialog closes
        // to reload the in-page view w/ajax or page reload
        var resolveAndReInit = function () {
            resolvePromise(context);
            render_1.renderer.reloadAndReInitialize(context);
        };
        // check if inline window (quick-dialog)
        if (context.button.inlineWindow) {
            // test if it should be full screen (value or resolve-function)
            if (typeof (context.button.fullScreen) === 'function')
                fullScreen = context.button.fullScreen(context);
            var diagName = context.button.dialog(context).toString();
            quick_dialog_1.quickDialog.showOrToggleFromToolbar(context, link, fullScreen, diagName)
                .then(function (isChanged) { if (isChanged)
                resolveAndReInit(); });
            // else it's a normal pop-up dialog
        }
        else {
            // check if new-window
            if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
                resolvePromise(context);
                window_in_page_1.windowInPage.open(link);
            }
            else {
                sxc_controller_in_page_1.$2sxcInPage.totalPopup.open(link, resolveAndReInit);
            }
        }
    });
}
exports.commandOpenNgDialog = commandOpenNgDialog;
//# sourceMappingURL=command-open-ng-dialog.js.map