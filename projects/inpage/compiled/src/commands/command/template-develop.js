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
 * import this module to commands.ts
 */
var TemplateDevelop = /** @class */ (function (_super) {
    __extends(TemplateDevelop, _super);
    function TemplateDevelop() {
        var _this = _super.call(this) || this;
        _this.makeDef('template-develop', 'Develop', 'code', true, false, {
            newWindow: function (context) { return true; },
            dialog: function (context) { return 'develop'; },
            showCondition: function (context) {
                return (context.user.canDesign);
            },
            configureCommand: function (context, command) {
                command.items = [{ EntityId: context.contentBlock.templateId }];
            },
        });
        return _this;
    }
    return TemplateDevelop;
}(command_base_1.CommandBase));
exports.TemplateDevelop = TemplateDevelop;
// ReSharper disable once UnusedLocals
var cmd = new TemplateDevelop();
//# sourceMappingURL=template-develop.js.map