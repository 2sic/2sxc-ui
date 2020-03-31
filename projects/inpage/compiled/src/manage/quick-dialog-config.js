"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_of_edit_context_1 = require("./user-of-edit-context");
var QuickDialogConfig = /** @class */ (function () {
    function QuickDialogConfig() {
    }
    //constructor(editContext: DataEditContext) {
    //  this.appId = editContext.ContentGroup.AppId;
    //  this.isContent = editContext.ContentGroup.IsContent;
    //  this.hasContent = editContext.ContentGroup.HasContent;
    //  this.isList = editContext.ContentGroup.IsList;
    //  this.templateId = editContext.ContentGroup.TemplateId;
    //  this.contentTypeId = editContext.ContentGroup.ContentTypeName;
    //  this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
    //  this.user = getUserOfEditContext(editContext);
    //  this.supportsAjax = editContext.ContentGroup.SupportsAjax;
    //}
    QuickDialogConfig.fromContext = function (context) {
        var config = new QuickDialogConfig();
        config.appId = context.app.id;
        config.isContent = context.app.isContent;
        config.hasContent = context.app.hasContent;
        config.isList = context.contentBlock.isList;
        config.templateId = context.contentBlock.templateId;
        config.contentTypeId = context.contentBlock.contentTypeId;
        config.templateChooserVisible = context.contentBlock.showTemplatePicker; // todo = maybe move to content-group
        config.user = user_of_edit_context_1.UserOfEditContext.fromContext(context);
        config.supportsAjax = context.app.supportsAjax;
        return config;
    };
    return QuickDialogConfig;
}());
exports.QuickDialogConfig = QuickDialogConfig;
//# sourceMappingURL=quick-dialog-config.js.map