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
var TemplateSettings = /** @class */ (function (_super) {
    __extends(TemplateSettings, _super);
    function TemplateSettings() {
        var _this = _super.call(this) || this;
        _this.makeDef('template-settings', 'TemplateSettings', 'sliders', true, false, {
            dialog: function (context) { return 'edit'; },
            showCondition: function (context) {
                return (context.user.canDesign) && (!context.app.isContent);
            },
            configureCommand: function (context, command) {
                command.items = [{ EntityId: context.contentBlock.templateId }];
            },
        });
        return _this;
    }
    return TemplateSettings;
}(command_base_1.CommandBase));
exports.TemplateSettings = TemplateSettings;
// ReSharper disable once UnusedLocals
var cmd = new TemplateSettings();
//# sourceMappingURL=template-settings.js.map