"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_1 = require("../x-bootstrap/sxc");
/**
 * extend the quick edit with the core commands
 */
var Cb = /** @class */ (function () {
    function Cb() {
    }
    Cb.prototype.delete = function (clip) {
        var sxc = sxc_1.getSxcInstance(clip.list);
        return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
    };
    Cb.create = function (parent, field, index, appOrContent, list, newGuid) {
        var sxc = sxc_1.getSxcInstance(list);
        return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
    };
    return Cb;
}());
exports.Cb = Cb;
//# sourceMappingURL=cb.js.map