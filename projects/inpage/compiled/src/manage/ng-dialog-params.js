"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_of_edit_context_1 = require("./user-of-edit-context");
var NgDialogParams = /** @class */ (function () {
    function NgDialogParams() {
    }
    //constructor(sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
    //  this.zoneId = editContext.ContentGroup.ZoneId;
    //  this.appId = editContext.ContentGroup.AppId;
    //  this.tid = editContext.Environment.PageId;
    //  this.mid = editContext.Environment.InstanceId;
    //  this.cbid = sxc.cbid;
    //  this.lang = editContext.Language.Current;
    //  this.langpri = editContext.Language.Primary;
    //  this.langs = JSON.stringify(editContext.Language.All);
    //  this.portalroot = editContext.Environment.WebsiteUrl;
    //  this.websiteroot = editContext.Environment.SxcRootUrl;
    //  this.partOfPage = editContext.ContentBlock.PartOfPage;
    //  // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
    //  this.publishing = editContext.ContentBlock.VersioningRequirements;
    //  // todo= probably move the user into the dashboard info
    //  this.user = getUserOfEditContext(editContext);
    //  this.approot = editContext.ContentGroup.AppUrl || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    //}
    NgDialogParams.fromContext = function (context) {
        var params = new NgDialogParams();
        params.zoneId = context.app.zoneId;
        params.appId = context.app.id;
        params.tid = context.page.id;
        params.mid = context.instance.id;
        params.cbid = context.contentBlock.id;
        params.lang = context.app.currentLanguage;
        params.langpri = context.app.primaryLanguage;
        params.langs = JSON.stringify(context.app.allLanguages);
        params.portalroot = context.tenant.url;
        params.websiteroot = context.instance.sxcRootUrl;
        params.partOfPage = context.contentBlock.partOfPage;
        // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
        params.publishing = context.contentBlock.versioningRequirements;
        // todo= probably move the user into the dashboard info
        params.user = user_of_edit_context_1.UserOfEditContext.fromContext(context);
        params.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
        params.fa = !context.app.isContent;
        return params;
    };
    return NgDialogParams;
}());
exports.NgDialogParams = NgDialogParams;
//# sourceMappingURL=ng-dialog-params.js.map