"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = require("../interfaces/window-in-page");
var api_1 = require("../manage/api");
var sxc_1 = require("../x-bootstrap/sxc");
/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
var ActionMenuMapper = /** @class */ (function () {
    function ActionMenuMapper(moduleId) {
        var _this = this;
        this.changeLayoutOrContent = function () { _this.run('layout'); };
        this.addItem = function () { _this.run('add', { useModuleList: true, sortOrder: 0 }); };
        this.edit = function () {
            _this.run('edit', { useModuleList: true, sortOrder: 0 });
        };
        this.adminApp = function () { _this.run('app'); };
        this.adminZone = function () { _this.run('zone'); };
        this.develop = function () { _this.run('template-develop'); };
        this.sxc = sxc_1.getSxcInstance(moduleId);
        this.tag = api_1.getTag(this.sxc);
        this.run = this.sxc.manage.run;
    }
    return ActionMenuMapper;
}());
exports.ActionMenuMapper = ActionMenuMapper;
window_in_page_1.windowInPage.$2sxcActionMenuMapper = function (moduleId) {
    return new ActionMenuMapper(moduleId);
};
//# sourceMappingURL=dnn-inpage-edit.js.map