"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cb_1 = require("./cb");
var clipboard_1 = require("./clipboard");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
    var list = quick_e_1.$quickE.main.actionsForCb.closest(selectors_instance_1.selectors.cb.listSelector);
    var listItems = list.find(selectors_instance_1.selectors.cb.selector);
    var actionConfig = JSON.parse(list.attr(selectors_instance_1.selectors.cb.context));
    var index = 0;
    var newGuid = actionConfig.guid || null;
    if (quick_e_1.$quickE.main.actionsForCb.hasClass(selectors_instance_1.selectors.cb.class))
        index = listItems.index(quick_e_1.$quickE.main.actionsForCb[0]) + 1;
    // check cut/paste
    var cbAction = $(this).data('action');
    if (cbAction) {
        // this is a cut/paste action
        return clipboard_1.copyPasteInPage(cbAction, list, index, selectors_instance_1.selectors.cb.id);
    }
    else {
        var appOrContent = $(this).data('type');
        return cb_1.Cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
    }
}
quick_e_1.$quickE.cbActions.click(onCbButtonClick);
//# sourceMappingURL=content-block.js.map