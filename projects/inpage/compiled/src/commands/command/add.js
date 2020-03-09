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
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
var Add = /** @class */ (function (_super) {
    __extends(Add, _super);
    function Add() {
        var _this = _super.call(this) || this;
        _this.makeDef('add', 'AddDemo', 'plus-circled', false, true, {
            showCondition: function (context) {
                return (context.contentBlock.isList) && (context.button.action.params.useModuleList) && (context.button.action.params.sortOrder !== -1);
            },
            code: function (context) {
                return actions_1.addItem(context, context.button.action.params.sortOrder + 1);
            },
        });
        return _this;
    }
    return Add;
}(command_base_1.CommandBase));
exports.Add = Add;
// ReSharper disable once UnusedLocals
var cmd = new Add();
//# sourceMappingURL=add.js.map