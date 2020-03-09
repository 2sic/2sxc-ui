"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseContext = /** @class */ (function () {
    function BaseContext() {
        // tbd
        // ReSharper disable once InconsistentNaming
        this._isContext = true;
    }
    return BaseContext;
}());
exports.BaseContext = BaseContext;
function isContext(thing) {
    var maybeButton = thing;
    return maybeButton._isContext !== undefined;
}
exports.isContext = isContext;
//# sourceMappingURL=base-context.js.map