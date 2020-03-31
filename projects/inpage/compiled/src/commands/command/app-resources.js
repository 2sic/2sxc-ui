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
var AppResources = /** @class */ (function (_super) {
    __extends(AppResources, _super);
    function AppResources() {
        var _this = _super.call(this) || this;
        _this.makeDef('app-resources', 'AppResources', 'language', true, false, {
            dialog: function (context) { return 'edit'; },
            disabled: function (context) {
                return context.app.resourcesId === null;
            },
            title: function (context) { return "Toolbar.AppResources" + (context.app.resourcesId === null ? 'Disabled' : ''); },
            showCondition: function (context) {
                return (context.user.canDesign) && (!context.app.isContent); // only if resources exist or are 0 (to be created)...
            },
            configureCommand: function (context, command) {
                command.items = [{ EntityId: context.app.resourcesId }];
            },
            dynamicClasses: function (context) {
                return context.app.resourcesId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
            },
        });
        return _this;
    }
    return AppResources;
}(command_base_1.CommandBase));
exports.AppResources = AppResources;
// ReSharper disable once UnusedLocals
var cmd = new AppResources();
//# sourceMappingURL=app-resources.js.map