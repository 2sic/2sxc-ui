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
var MoveUp = /** @class */ (function (_super) {
    __extends(MoveUp, _super);
    function MoveUp() {
        var _this = _super.call(this) || this;
        _this.makeDef('moveup', 'MoveUp', 'move-up', false, true, {
            showCondition: function (context) {
                return (context.contentBlock.isList) &&
                    (context.button.action.params.useModuleList) &&
                    (context.button.action.params.sortOrder !== -1) &&
                    (context.button.action.params.sortOrder !== 0);
            },
            code: function (context) {
                return actions_1.changeOrder(context, context.button.action.params.sortOrder, Math.max(context.button.action.params.sortOrder - 1, 0));
            },
        });
        return _this;
    }
    return MoveUp;
}(command_base_1.CommandBase));
exports.MoveUp = MoveUp;
// ReSharper disable once UnusedLocals
var cmd = new MoveUp();
//# sourceMappingURL=moveup.js.map