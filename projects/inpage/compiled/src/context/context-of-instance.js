"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var context_of_page_1 = require("./context-of-page");
var ContextOfInstance = /** @class */ (function (_super) {
    __extends(ContextOfInstance, _super);
    function ContextOfInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextOfInstance;
}(context_of_page_1.ContextOfPage));
exports.ContextOfInstance = ContextOfInstance;
function isContextOfInstance(thing) {
    var maybeButton = thing;
    return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
}
exports.isContextOfInstance = isContextOfInstance;
//# sourceMappingURL=context-of-instance.js.map