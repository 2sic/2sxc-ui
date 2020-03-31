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
var item_commands_1 = require("../../entity-manipulation/item-commands");
var command_base_1 = require("../command-base");
/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 *
 * import this module to commands.ts
 */
var Delete = /** @class */ (function (_super) {
    __extends(Delete, _super);
    function Delete() {
        var _this = _super.call(this) || this;
        _this.makeDef('delete', 'Delete', 'cancel', true, false, {
            // disabled: true,
            showCondition: function (context) {
                // can never be used for a modulelist item, as it is always in use somewhere
                if (context.button.action.params.useModuleList) {
                    return false;
                }
                // check if all data exists required for deleting
                return ((!!context.button.action.params.entityId)
                    && (!!context.button.action.params.entityGuid)
                    && (!!context.button.action.params.entityTitle));
            },
            code: function (context) {
                return item_commands_1.contentItems.delete(context, context.button.action.params.entityId, context.button.action.params.entityGuid, context.button.action.params.entityTitle);
            },
        });
        return _this;
    }
    return Delete;
}(command_base_1.CommandBase));
exports.Delete = Delete;
// ReSharper disable once UnusedLocals
var cmd = new Delete();
//# sourceMappingURL=delete.js.map