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
var context_of_toolbar_1 = require("./context-of-toolbar");
var ContextOfButton = /** @class */ (function (_super) {
    __extends(ContextOfButton, _super);
    function ContextOfButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextOfButton;
}(context_of_toolbar_1.ContextOfToolbar));
exports.ContextOfButton = ContextOfButton;
function isContextOfButton(thing) {
    var maybeButton = thing;
    return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}
exports.isContextOfButton = isContextOfButton;
//# sourceMappingURL=context-of-button.js.map