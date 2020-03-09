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
var actions_1 = require("../../contentBlock/actions");
var command_base_1 = require("../command-base");
/**
 * import this module to commands.ts
 */
var MoveDown = /** @class */ (function (_super) {
    __extends(MoveDown, _super);
    function MoveDown() {
        var _this = _super.call(this) || this;
        _this.makeDef('movedown', 'MoveDown', 'move-down', false, true, {
            showCondition: function (context) {
                // TODO: do not display if is last item in list
                return (context.contentBlock.isList)
                    && (context.button.action.params.useModuleList)
                    && (context.button.action.params.sortOrder !== -1);
            },
            code: function (context) {
                // TODO: make sure index is never greater than the amount of items
                return actions_1.changeOrder(context, context.button.action.params.sortOrder, context.button.action.params.sortOrder + 1);
            },
        });
        return _this;
    }
    return MoveDown;
}(command_base_1.CommandBase));
exports.MoveDown = MoveDown;
// ReSharper disable once UnusedLocals
var cmd = new MoveDown();
//# sourceMappingURL=movedown.js.map