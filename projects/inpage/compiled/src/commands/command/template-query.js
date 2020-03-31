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
var TemplateQuery = /** @class */ (function (_super) {
    __extends(TemplateQuery, _super);
    function TemplateQuery() {
        var _this = _super.call(this) || this;
        _this.makeDef('template-query', 'QueryEdit', 'filter', true, false, {
            dialog: function (context) { return 'pipeline-designer'; },
            params: function (context) {
                return { pipelineId: context.contentBlock.queryId };
            },
            newWindow: function (context) { return true; },
            disabled: function (context) {
                return context.app.settingsId === null;
            },
            title: function (context) { return "Toolbar.QueryEdit" + (context.contentBlock.queryId === null ? 'Disabled' : ''); },
            showCondition: function (context) {
                return (context.user.canDesign) && (!context.app.isContent);
            },
            dynamicClasses: function (context) {
                return context.contentBlock.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
            },
        });
        return _this;
    }
    return TemplateQuery;
}(command_base_1.CommandBase));
exports.TemplateQuery = TemplateQuery;
// ReSharper disable once UnusedLocals
var cmd = new TemplateQuery();
//# sourceMappingURL=template-query.js.map