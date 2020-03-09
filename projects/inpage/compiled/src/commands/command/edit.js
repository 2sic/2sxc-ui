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
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
var Edit = /** @class */ (function (_super) {
    __extends(Edit, _super);
    function Edit() {
        var _this = _super.call(this) || this;
        _this.makeDef('edit', 'Edit', 'pencil', false, true, {
            params: function (context) {
                return { mode: 'edit' };
            },
            showCondition: function (context) {
                return (!!context.button.action.params.entityId) || (context.button.action.params.useModuleList); // need ID or a "slot", otherwise edit won't work
            },
        });
        return _this;
    }
    return Edit;
}(command_base_1.CommandBase));
exports.Edit = Edit;
// ReSharper disable once UnusedLocals
var cmd = new Edit();
//# sourceMappingURL=edit.js.map