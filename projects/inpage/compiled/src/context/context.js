"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
var api_1 = require("../manage/api");
var sxc_1 = require("../x-bootstrap/sxc");
var system_context_1 = require("./base-context/system-context");
var tenant_context_1 = require("./base-context/tenant-context");
var user_context_1 = require("./base-context/user-context");
var content_block_context_1 = require("./content-block-context/content-block-context");
var context_of_button_1 = require("./context-of-button");
var app_context_1 = require("./instance-context/app-context");
var instance_context_1 = require("./instance-context/instance-context");
var item_context_1 = require("./item-context/item-context");
var page_context_1 = require("./page-context/page-context");
var is_1 = require("../plumbing/is");
var ui_context_1 = require("./instance-context/ui-context");
/**
 * Primary API to get the context (context is cached)
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
function context(tagOrSxc, cbid) {
    var sxc;
    var containerTag = null;
    if (is_1.isSxcInstance(tagOrSxc)) { // it is SxcInstance
        sxc = tagOrSxc;
    }
    else if (typeof tagOrSxc === 'number') { // it is number
        sxc = sxc_1.getSxcInstance(tagOrSxc, cbid);
    }
    else { // it is HTMLElement
        sxc = sxc_1.getSxcInstance(tagOrSxc);
        containerTag = api_1.getContainerTag(tagOrSxc);
    }
    ;
    var contextOfButton = getContextInstance(sxc, containerTag);
    contextOfButton.sxc = sxc;
    return contextOfButton;
}
exports.context = context;
/**
 * Create copy of context, so it can be modified before use
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
function contextCopy(htmlElementOrId, cbid) {
    var contextOfButton = context(htmlElementOrId, cbid);
    // set sxc to null because of cyclic reference, so we can serialize it
    contextOfButton.sxc = null;
    // make a copy
    var copyOfContext = JSON.parse(JSON.stringify(contextOfButton));
    // bring sxc back to context
    contextOfButton.sxc = sxc_1.getSxcInstance(htmlElementOrId);
    return copyOfContext;
}
exports.contextCopy = contextCopy;
/**
 * Create new context
 * @param sxc
 * @param htmlElement
 */
function getContextInstance(sxc, htmlElement) {
    var editContext = api_1.getEditContext(sxc, htmlElement);
    return createContextFromEditContext(editContext);
}
exports.getContextInstance = getContextInstance;
/**
 * create part of context object (it is not cached)
 * @param editContext
 */
function createContextFromEditContext(editContext) {
    var contextOfButton = new context_of_button_1.ContextOfButton();
    // *** ContextOf ***
    // this will be everything about the current system, like system / api -paths etc.
    contextOfButton.system = new system_context_1.SystemContext();
    if (editContext.error) {
        contextOfButton.system.error = editContext.error.type;
    }
    // empty
    // this will be something about the current tenant(the dnn portal)
    contextOfButton.tenant = new tenant_context_1.TenantContext();
    if (editContext.Environment) {
        contextOfButton.tenant.id = editContext.Environment.WebsiteId; // InstanceConfig.portalId
        contextOfButton.tenant.url = editContext.Environment.WebsiteUrl; // NgDialogParams.portalroot
    }
    // things about the user
    contextOfButton.user = new user_context_1.UserContext();
    if (editContext.User) {
        contextOfButton.user.canDesign = editContext.User.CanDesign;
        contextOfButton.user.canDevelop = editContext.User.CanDevelop;
    }
    // *** ContextOfPage ***
    // this will be information related to the current page
    contextOfButton.page = new page_context_1.PageContext();
    if (editContext.Environment) {
        contextOfButton.page.id = editContext.Environment.PageId; // InstanceConfig.tabId, NgDialogParams.tid
        contextOfButton.page.url = editContext.Environment.PageUrl;
    }
    // *** ContextOfInstance ***
    // information related to the current DNN module, incl.instanceId, etc.
    contextOfButton.instance = new instance_context_1.InstanceContext();
    if (editContext.Environment) {
        contextOfButton.instance.id = editContext.Environment.InstanceId; // InstanceConfig.moduleId, NgDialogParams.mid
        contextOfButton.instance.isEditable = editContext.Environment.IsEditable;
        // sxc
        contextOfButton.instance.sxcVersion = editContext.Environment.SxcVersion;
        contextOfButton.instance.parameters = editContext.Environment.parameters;
        contextOfButton.instance.sxcRootUrl = editContext.Environment.SxcRootUrl; // NgDialogParams.websiteroot
    }
    if (editContext.ContentBlock) {
        contextOfButton.instance.allowPublish = editContext.ContentBlock.VersioningRequirements === sxc_controller_in_page_1.$2sxcInPage.c.publishAllowed; // NgDialogParams.publishing
    }
    // this will be about the current app, settings of the app, app - paths, etc.
    contextOfButton.app = new app_context_1.AppContext();
    if (editContext.ContentGroup) {
        contextOfButton.app.id = editContext.ContentGroup.AppId; // or NgDialogParams.appId
        contextOfButton.app.isContent = editContext.ContentGroup.IsContent;
        contextOfButton.app.resourcesId = editContext.ContentGroup.AppResourcesId;
        contextOfButton.app.settingsId = editContext.ContentGroup.AppSettingsId;
        contextOfButton.app.appPath = editContext.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
        contextOfButton.app.hasContent = editContext.ContentGroup.HasContent;
        contextOfButton.app.supportsAjax = editContext.ContentGroup.SupportsAjax;
        contextOfButton.app.zoneId = editContext.ContentGroup.ZoneId; // or NgDialogParams.zoneId
    }
    if (editContext.Language) {
        // languages
        contextOfButton.app.currentLanguage = editContext.Language.Current; // NgDialogParams.lang
        contextOfButton.app.primaryLanguage = editContext.Language.Primary; // NgDialogParams.langpri
        contextOfButton.app.allLanguages = editContext.Language.All; // or NgDialogParams.langs
    }
    // ensure that the UI will load the correct assets to enable editing
    contextOfButton.ui = new ui_context_1.UiContext();
    if (editContext.Ui) {
        contextOfButton.ui.autoToolbar = editContext.Ui.AutoToolbar; // toolbar auto-show
        if (editContext.Ui.Form)
            contextOfButton.ui.form = editContext.Ui.Form; // decide which dialog opens, eg ng8
    }
    // *** ContextOfContentBlock ***
    // information related to the current contentBlock
    contextOfButton.contentBlock = new content_block_context_1.ContentBlockContext();
    if (editContext.ContentBlock) {
        contextOfButton.contentBlock.id = editContext.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
        contextOfButton.contentBlock.isEntity = editContext.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
        contextOfButton.contentBlock.showTemplatePicker = editContext.ContentBlock.ShowTemplatePicker;
        contextOfButton.contentBlock.versioningRequirements = editContext.ContentBlock.VersioningRequirements;
        contextOfButton.contentBlock.parentFieldName = editContext.ContentBlock.ParentFieldName;
        contextOfButton.contentBlock.parentFieldSortOrder = editContext.ContentBlock.ParentFieldSortOrder;
        contextOfButton.contentBlock.partOfPage = editContext.ContentBlock.PartOfPage; // NgDialogParams.partOfPage
    }
    if (editContext.ContentGroup) {
        contextOfButton.contentBlock.isCreated = editContext.ContentGroup.IsCreated;
        contextOfButton.contentBlock.isList = editContext.ContentGroup.IsList; // ex: InstanceConfig.isList
        contextOfButton.contentBlock.queryId = editContext.ContentGroup.QueryId;
        contextOfButton.contentBlock.templateId = editContext.ContentGroup.TemplateId;
        contextOfButton.contentBlock.contentTypeId = editContext.ContentGroup.ContentTypeName;
        contextOfButton.contentBlock.contentGroupId = editContext.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
    }
    // *** ContextOfItem ***
    // information about the current item
    contextOfButton.item = new item_context_1.ItemContext();
    // empty
    // *** ContextOfToolbar ***
    // fill externally
    // *** ContextOfButton ***
    // fill externally
    return contextOfButton;
}
exports.createContextFromEditContext = createContextFromEditContext;
//# sourceMappingURL=context.js.map