"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_1 = require("../x-bootstrap/sxc");
var cmds_strategy_factory_1 = require("./cmds-strategy-factory");
var mod_1 = require("./mod");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
/** add a clipboard to the quick edit */
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
            var from = exports.data.index;
            var to = newClip.index;
            // check that we only move block-to-block or module to module
            if (exports.data.type !== newClip.type)
                return alert("can't move module-to-block; move only works from module-to-module or block-to-block");
            if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                return clear(); // don't do anything
            // cb-numbering is a bit different, because the selector is at the bottom
            // only there we should also skip on +1;
            if (newClip.type === selectors_instance_1.selectors.cb.id && from + 1 === to)
                return clear(); // don't do anything
            if (type === selectors_instance_1.selectors.cb.id) {
                var sxc = sxc_1.getSxcInstance(list);
                sxc.manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
            }
            else {
                // sometimes missing oldClip.item
                // if (clipboard.data.item)
                mod_1.Mod.move(exports.data, newClip, from, to);
            }
            clear();
            break;
        default:
    }
    return null;
}
exports.copyPasteInPage = copyPasteInPage;
/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
exports.data = {};
function mark(newData) {
    if (newData) {
        // if it was already selected with the same thing, then release it
        if (exports.data && exports.data.item === newData.item)
            return clear();
        exports.data = newData;
    }
    $("." + selectors_instance_1.selectors.selected).removeClass(selectors_instance_1.selectors.selected); // clear previous markings
    // sometimes missing data.item
    if (!exports.data.item) {
        return;
    }
    var cb = $(exports.data.item);
    cb.addClass(selectors_instance_1.selectors.selected);
    if (cb.prev().is('iframe'))
        cb.prev().addClass(selectors_instance_1.selectors.selected);
    setSecondaryActionsState(true);
    quick_e_1.$quickE.selected.toggle(cb, exports.data.type);
}
exports.mark = mark;
function clear() {
    $("." + selectors_instance_1.selectors.selected).removeClass(selectors_instance_1.selectors.selected);
    exports.data = null;
    setSecondaryActionsState(false);
    quick_e_1.$quickE.selected.toggle(false);
}
exports.clear = clear;
function createSpecs(type, list, index) {
    var listItems = list.find(selectors_instance_1.selectors[type].selector);
    var currentItem;
    if (index >= listItems.length) {
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        currentItem = listItems[listItems.length - 1];
    }
    else {
        currentItem = listItems[index];
    }
    var editContext = JSON.parse(list.attr(selectors_instance_1.selectors.cb.context) || null) || { parent: 'dnn', field: list.id };
    return {
        parent: editContext.parent,
        field: editContext.field,
        list: list,
        item: currentItem,
        index: index,
        type: type,
    };
}
exports.createSpecs = createSpecs;
function setSecondaryActionsState(state) {
    var btns = $('a.sc-content-block-menu-btn');
    btns = btns.filter('.icon-sxc-paste');
    btns.toggleClass('sc-unavailable', !state);
}
var cmdsStrategyFactory = new cmds_strategy_factory_1.CmdsStrategyFactory();
/**
 * bind clipboard actions
 */
$('a', quick_e_1.$quickE.selected).click(function () {
    var action = $(this).data('action');
    var clip = exports.data;
    switch (action) {
        case 'delete':
            return cmdsStrategyFactory.delete(clip);
        case 'sendToPane':
            return mod_1.Mod.sendToPane();
        default:
            throw new Error("unexpected action: " + action);
    }
});
//# sourceMappingURL=clipboard.js.map