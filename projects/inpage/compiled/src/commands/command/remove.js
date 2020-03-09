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
var _2sxc_translate_1 = require("../../translate/2sxc.translate");
var command_base_1 = require("../command-base");
/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
var Remove = /** @class */ (function (_super) {
    __extends(Remove, _super);
    function Remove() {
        var _this = _super.call(this) || this;
        _this.makeDef('remove', 'Remove', 'minus-circled', false, true, {
            showCondition: function (context) {
                return (context.contentBlock.isList) &&
                    (context.button.action.params.useModuleList) &&
                    (context.button.action.params.sortOrder !== -1);
            },
            code: function (context) {
                return new Promise(function (resolve, reject) {
                    if (confirm(_2sxc_translate_1.translate('Toolbar.ConfirmRemove'))) {
                        return actions_1.removeFromList(context, context.button.action.params.sortOrder);
                    }
                    return resolve();
                });
            },
        });
        return _this;
    }
    return Remove;
}(command_base_1.CommandBase));
exports.Remove = Remove;
// ReSharper disable once UnusedLocals
var cmd = new Remove();
//# sourceMappingURL=remove.js.map