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
 * open the import dialog
 *
 * import this module to commands.ts
 */
var AppImport = /** @class */ (function (_super) {
    __extends(AppImport, _super);
    function AppImport() {
        var _this = _super.call(this) || this;
        _this.makeDef('app-import', 'Dashboard', '', true, false, {});
        return _this;
    }
    return AppImport;
}(command_base_1.CommandBase));
exports.AppImport = AppImport;
// ReSharper disable once UnusedLocals
var cmd = new AppImport();
//# sourceMappingURL=app-import.js.map