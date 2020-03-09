"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var Cms_1 = require("../cms/Cms");
var InstanceEngine = /** @class */ (function () {
    function InstanceEngine(sxc) {
        this.sxc = sxc;
    }
    InstanceEngine.prototype.run = function (nameOrSettings, eventOrSettings, event) {
        var cntx = context_1.context(this.sxc);
        return new Cms_1.Cms().run(cntx, nameOrSettings, eventOrSettings, event);
    };
    return InstanceEngine;
}());
exports.InstanceEngine = InstanceEngine;
//# sourceMappingURL=instance-engine.js.map