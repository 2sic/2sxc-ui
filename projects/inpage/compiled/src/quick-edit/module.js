"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipboard_1 = require("./clipboard");
var mod_manage_1 = require("./mod-manage");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
/**
 * module specific stuff
 */
function onModuleButtonClick() {
    var type = $(this).data('type');
    var dnnMod = quick_e_1.$quickE.main.actionsForModule;
    var pane = dnnMod.closest(selectors_instance_1.selectors.mod.listSelector);
    var index = 0;
    if (dnnMod.hasClass('DnnModule'))
        index = pane.find('.DnnModule').index(dnnMod[0]) + 1;
    var cbAction = $(this).data('action');
    if (cbAction) {
        return clipboard_1.copyPasteInPage(cbAction, pane, index, selectors_instance_1.selectors.mod.id); // copy/paste
    }
    return mod_manage_1.modManage.create(mod_manage_1.modManage.getPaneName(pane), index, type);
}
/**
 * bind module actions click
 */
quick_e_1.$quickE.modActions.click(onModuleButtonClick);
//# sourceMappingURL=module.js.map