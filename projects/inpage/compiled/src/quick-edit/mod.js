"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mod_manage_1 = require("./mod-manage");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
var Mod = /** @class */ (function () {
    function Mod() {
    }
    Mod.prototype.delete = function (clip) {
        if (!confirm('are you sure?'))
            return;
        var modId = mod_manage_1.modManage.getModuleId(clip.item.className);
        mod_manage_1.modManage.delete(modId);
    };
    // todo: unsure if this is a good place for this bit of code...
    Mod.move = function (oldClip, newClip, from, to) {
        var modId = mod_manage_1.modManage.getModuleId(oldClip.item.className);
        var pane = mod_manage_1.modManage.getPaneName(newClip.list);
        mod_manage_1.modManage.move(modId, pane, to);
    };
    Mod.sendToPane = function () {
        var pane = quick_e_1.$quickE.main.actionsForModule.closest(selectors_instance_1.selectors.mod.listSelector);
        // show the pane-options
        var pl = quick_e_1.$quickE.selected.find('#paneList');
        // ReSharper disable once CssBrowserCompatibility
        if (!pl.is(':empty'))
            pl.empty();
        pl.append(mod_manage_1.modManage.getMoveButtons(mod_manage_1.modManage.getPaneName(pane)));
    };
    return Mod;
}());
exports.Mod = Mod;
//# sourceMappingURL=mod.js.map