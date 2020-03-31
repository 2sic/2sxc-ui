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
var context_of_content_block_1 = require("./context-of-content-block");
var ContextOfItem = /** @class */ (function (_super) {
    __extends(ContextOfItem, _super);
    function ContextOfItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextOfItem;
}(context_of_content_block_1.ContextOfContentBlock));
exports.ContextOfItem = ContextOfItem;
//# sourceMappingURL=context-of-item.js.map