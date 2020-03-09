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
var command_base_1 = require("../command-base");
/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
var ItemHistory = /** @class */ (function (_super) {
    __extends(ItemHistory, _super);
    function ItemHistory() {
        var _this = _super.call(this) || this;
        _this.makeDef('item-history', 'ItemHistory', 'clock', true, false, {
            inlineWindow: function (context) { return true; },
            fullScreen: function (context) { return true; },
        });
        return _this;
    }
    return ItemHistory;
}(command_base_1.CommandBase));
exports.ItemHistory = ItemHistory;
// ReSharper disable once UnusedLocals
var cmd = new ItemHistory();
//# sourceMappingURL=item-history.js.map