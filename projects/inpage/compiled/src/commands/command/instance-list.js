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
var InstanceList = /** @class */ (function (_super) {
    __extends(InstanceList, _super);
    function InstanceList() {
        var _this = _super.call(this) || this;
        _this.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
            showCondition: function (context) {
                return (context.contentBlock.isList)
                    && (context.button.action.params.useModuleList)
                    && (context.button.action.params.sortOrder !== -1);
            },
        });
        return _this;
    }
    return InstanceList;
}(command_base_1.CommandBase));
exports.InstanceList = InstanceList;
// ReSharper disable once UnusedLocals
var cmd = new InstanceList();
//# sourceMappingURL=instance-list.js.map