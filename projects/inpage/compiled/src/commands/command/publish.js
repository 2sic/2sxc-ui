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
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 */
var Publish = /** @class */ (function (_super) {
    __extends(Publish, _super);
    function Publish() {
        var _this = _super.call(this) || this;
        _this.makeDef('publish', 'Unpublished', 'eye-off', false, false, {
            showCondition: function (context) {
                return (context.button.action.params.isPublished === false);
            },
            disabled: function (context) {
                return !context.instance.allowPublish;
            },
            code: function (context, event) {
                return new Promise(function (resolve, reject) {
                    if (context.button.action.params.isPublished) {
                        alert(_2sxc_translate_1.translate('Toolbar.AlreadyPublished'));
                        return resolve();
                    }
                    // if we have an entity-id, publish based on that
                    if (context.button.action.params.entityId) {
                        return actions_1.publishId(context, context.button.action.params.entityId);
                    }
                    var part = context.button.action.params.sortOrder === -1 ? 'listcontent' : 'content';
                    var index = context.button.action.params.sortOrder === -1 ? 0 : context.button.action.params.sortOrder;
                    return actions_1.publish(context, part, index);
                });
            },
        });
        return _this;
    }
    return Publish;
}(command_base_1.CommandBase));
exports.Publish = Publish;
// ReSharper disable once UnusedLocals
var cmd = new Publish();
//# sourceMappingURL=publish.js.map