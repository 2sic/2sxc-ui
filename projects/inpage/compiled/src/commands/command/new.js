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
var command_open_ng_dialog_1 = require("../command-open-ng-dialog");
/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
var New = /** @class */ (function (_super) {
    __extends(New, _super);
    function New() {
        var _this = _super.call(this) || this;
        _this.makeDef('new', 'New', 'plus', false, true, {
            params: function (context) {
                return { mode: 'new' };
            },
            dialog: function (context) { return 'edit'; },
            showCondition: function (context) {
                return (!!context.button.action.params.contentType) ||
                    ((context.contentBlock.isList) && (context.button.action.params.useModuleList) && (context.button.action.params.sortOrder !== -1)); // don't provide new on the header-item
            },
            code: function (context, event) {
                // todo - should refactor this to be a toolbarManager.contentBlock command
                Object.assign(context.button.action.params, { sortOrder: context.button.action.params.sortOrder + 1 });
                return command_open_ng_dialog_1.commandOpenNgDialog(context, event);
            },
        });
        return _this;
    }
    return New;
}(command_base_1.CommandBase));
exports.New = New;
// ReSharper disable once UnusedLocals
var cmd = new New();
//# sourceMappingURL=new.js.map