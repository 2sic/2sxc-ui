"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_create_1 = require("./command-create");
/**
 * create a dialog link
 * @param sxc
 * @param specialSettings
 */
function commandLinkToNgDialog(context) {
    var cmd = command_create_1.commandCreate(context);
    if (cmd.context.button.action.params.useModuleList) {
        cmd.addContentGroupItemSetsToEditList(true);
    }
    else {
        cmd.addSimpleItem();
    }
    ;
    // if the command has own configuration stuff, do that now
    if (cmd.context.button.configureCommand) {
        cmd.context.button.configureCommand(context, cmd);
    }
    return cmd.generateLink(context);
}
exports.commandLinkToNgDialog = commandLinkToNgDialog;
//# sourceMappingURL=command-link-to-ng-dialog.js.map