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
var has_log_1 = require("../logging/has-log");
var build_toolbars_1 = require("./build-toolbars");
var render_button_1 = require("./item/render-button");
var render_toolbar_1 = require("./item/render-toolbar");
var toolbar_config_templates_1 = require("./toolbar/toolbar-config-templates");
/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
var ToolbarManager = /** @class */ (function (_super) {
    __extends(ToolbarManager, _super);
    function ToolbarManager(parentLog) {
        var _this = _super.call(this, 'Tlb.Mngr', parentLog, 'init') || this;
        _this.disable = build_toolbars_1.disable;
        _this.isDisabled = build_toolbars_1.isDisabled;
        // generate button html
        _this.generateButtonHtml = render_button_1.renderButton;
        _this.generateToolbarHtml = render_toolbar_1.renderToolbar;
        _this.toolbarTemplate = toolbar_config_templates_1.ToolbarConfigTemplates.Instance(_this.log).get('default');
        return _this;
    }
    ToolbarManager.prototype.buildToolbars = function (parentTag, optionalId) {
        build_toolbars_1.buildToolbars(this.log, parentTag, optionalId);
    };
    return ToolbarManager;
}(has_log_1.HasLog));
exports.ToolbarManager = ToolbarManager;
//2dm 2018-03-22 this seems to be unused
var sharedTbm = new ToolbarManager(null);
exports._toolbarManager = sharedTbm;
//# sourceMappingURL=toolbar-manager.js.map