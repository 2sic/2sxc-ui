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
var ContentItems = /** @class */ (function (_super) {
    __extends(ContentItems, _super);
    function ContentItems() {
        var _this = _super.call(this) || this;
        _this.makeDef('contentitems', 'ContentItems', 'table', true, false, {
            params: function (context) {
                return { contentTypeName: context.contentBlock.contentTypeId };
            },
            showCondition: function (context) {
                return (context.user.canDesign) && ((!!context.button.action.params.contentType) || (!!context.contentBlock.contentTypeId));
            },
            configureCommand: function (context, command) {
                if (command.context.button.action.params.contentType) // optionally override with custom type
                    command.params.contentTypeName = command.context.button.action.params.contentType;
                // maybe: if item doesn't have a type, use that of template
                // else if (cmdSpecs.contentTypeId)
                //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
                if (context.button.action.params.filters) {
                    var enc = JSON.stringify(context.button.action.params.filters);
                    // special case - if it contains a "+" character, this won't survive
                    // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
                    // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
                    if (enc.indexOf('+') > -1)
                        enc = btoa(enc);
                    command.params.filters = enc;
                }
            },
        });
        return _this;
    }
    return ContentItems;
}(command_base_1.CommandBase));
exports.ContentItems = ContentItems;
// ReSharper disable once UnusedLocals
var cmd = new ContentItems();
//# sourceMappingURL=content-items.js.map