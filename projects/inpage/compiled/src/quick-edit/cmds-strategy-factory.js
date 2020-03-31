"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cb_1 = require("./cb");
var mod_1 = require("./mod");
var CmdsStrategyFactory = /** @class */ (function () {
    function CmdsStrategyFactory() {
        this.cmds = {};
        this.cmds.cb = new cb_1.Cb();
        this.cmds.mod = new mod_1.Mod();
    }
    CmdsStrategyFactory.prototype.getCmds = function (cliptype) {
        return this.cmds[cliptype];
    };
    CmdsStrategyFactory.prototype.delete = function (clip) {
        return this.cmds[clip.type].delete(clip);
    };
    return CmdsStrategyFactory;
}());
exports.CmdsStrategyFactory = CmdsStrategyFactory;
//# sourceMappingURL=cmds-strategy-factory.js.map