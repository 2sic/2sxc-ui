"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = require("../interfaces/window-in-page");
var DialogPaths_1 = require("../settings/DialogPaths");
var command_1 = require("./command");
/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
function commandCreate(context) {
    var ngDialogUrl = context.instance.sxcRootUrl +
        'desktopmodules/tosic_sexycontent/' +
        ((context.ui.form === 'ng8' && context.button.dialog(context) === 'edit') ? DialogPaths_1.DialogPaths.ng5 : DialogPaths_1.DialogPaths.ng1) +
        '?sxcver=' + context.instance.sxcVersion;
    var isDebug = window_in_page_1.windowInPage.$2sxc.urlParams.get('debug') ? '&debug=true' : '';
    var cmd = new command_1.Command(context, ngDialogUrl, isDebug);
    return cmd;
}
exports.commandCreate = commandCreate;
//# sourceMappingURL=command-create.js.map