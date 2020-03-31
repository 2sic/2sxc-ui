"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var default_toolbar_template_1 = require("./templates/default-toolbar-template");
var left_toolbar_template_1 = require("./templates/left-toolbar-template");
var has_log_1 = require("../../logging/has-log");
var ToolbarConfigTemplates = /** @class */ (function (_super) {
    __extends(ToolbarConfigTemplates, _super);
    function ToolbarConfigTemplates(parentLog) {
        var _this = _super.call(this, 'Tlb.TmpMan', parentLog, "build") || this;
        _this.configTemplateList = [];
        _this.list = {}; // hash - table of templates, to be used a list()['template - name']
        _this.add('default', default_toolbar_template_1.defaultToolbarTemplate);
        _this.add('left', left_toolbar_template_1.leftToolbarTemplate);
        return _this;
    }
    ToolbarConfigTemplates.Instance = function (parentLog) {
        // check if an instance of the class is already created
        if (this.singleton == null) {
            // If not created create an instance of the class
            // store the instance in the variable
            this.singleton = new ToolbarConfigTemplates(parentLog);
        }
        // return the singleton object
        return this.singleton;
    };
    // a single template – usually 'default'
    ToolbarConfigTemplates.prototype.get = function (name) {
        return this.list[name];
    };
    // adds a config to the list, if it doesn't exist
    ToolbarConfigTemplates.prototype.add = function (name, template, force) {
        this.list[name] = template;
    };
    ToolbarConfigTemplates.singleton = null; // A variable which stores the singleton object. Initially, the variable acts like a placeholder
    return ToolbarConfigTemplates;
}(has_log_1.HasLog));
exports.ToolbarConfigTemplates = ToolbarConfigTemplates;
//# sourceMappingURL=toolbar-config-templates.js.map