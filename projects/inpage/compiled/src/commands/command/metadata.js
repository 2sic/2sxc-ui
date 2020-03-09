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
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
var Metadata = /** @class */ (function (_super) {
    __extends(Metadata, _super);
    function Metadata() {
        var _this = _super.call(this) || this;
        _this.makeDef('metadata', 'Metadata', 'tag', false, false, {
            params: function (context) {
                return { mode: 'new' };
            },
            dialog: function (context) { return 'edit'; },
            dynamicClasses: function (context) {
                // if it doesn't have data yet, make it less strong
                return context.button.action.params.entityId ? '' : 'empty';
                // return settings.items && settings.items[0].entityId ? "" : "empty";
            },
            showCondition: function (context) {
                return (!!context.button.action.params.metadata);
            },
            configureCommand: function (context, command) {
                var itm = {
                    Title: 'EditFormTitle.Metadata',
                    Metadata: Object.assign({ keyType: 'string', targetType: 10 }, command.context.button.action.params.metadata),
                };
                Object.assign(command.items[0], itm);
            },
        });
        return _this;
    }
    return Metadata;
}(command_base_1.CommandBase));
exports.Metadata = Metadata;
// ReSharper disable once UnusedLocals
var cmd = new Metadata();
//# sourceMappingURL=metadata.js.map