import { DataEditContext } from '../data-edit-context/data-edit-context';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { getEditContext, getContainerTag } from '../manage/api';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { SystemContext } from './base-context/system-context';
import { TenantContext } from './base-context/tenant-context';
import { UserContext } from './base-context/user-context';
import { ContentBlockContext } from './content-block-context/content-block-context';
import { ContextOfButton } from './context-of-button';
import { AppContext } from './instance-context/app-context';
import { InstanceContext } from './instance-context/instance-context';
import { ItemContext } from './item-context/item-context';
import { PageContext } from './page-context/page-context';
import { isSxcInstance } from '../plumbing/is';
import { UiContext } from './instance-context/ui-context';

/**
 * Primary API to get the context (context is cached)
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
export function context(tagOrSxc: SxcInstanceWithInternals | HTMLElement | JQuery<HTMLElement>| number, cbid?: number): ContextOfButton {
  let sxc: SxcInstanceWithInternals;
  let containerTag: any = null;

  if (isSxcInstance(tagOrSxc)) { // it is SxcInstance
    sxc = tagOrSxc;
  } else if (typeof tagOrSxc === 'number') { // it is number
    sxc = getSxcInstance(tagOrSxc, cbid);
  } else { // it is HTMLElement
    sxc = getSxcInstance(tagOrSxc);
    containerTag = getContainerTag(tagOrSxc);
  };

  const contextOfButton = getContextInstance(sxc, containerTag);
  contextOfButton.sxc = sxc;
  return contextOfButton;
}

/**
 * Create copy of context, so it can be modified before use
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
export function contextCopy(htmlElementOrId: HTMLElement | number, cbid?: number): ContextOfButton {
  const contextOfButton = context(htmlElementOrId, cbid);
  // set sxc to null because of cyclic reference, so we can serialize it
  contextOfButton.sxc = null;
  // make a copy
  const copyOfContext = JSON.parse(JSON.stringify(contextOfButton));
  // bring sxc back to context
  contextOfButton.sxc = getSxcInstance(htmlElementOrId);
  return copyOfContext;
}

/**
 * Create new context
 * @param sxc
 * @param htmlElement
 */
export function getContextInstance(sxc: SxcInstanceWithInternals, htmlElement?: HTMLElement): ContextOfButton {
  const editContext = getEditContext(sxc, htmlElement);
  return createContextFromEditContext(editContext);
}

/**
 * create part of context object (it is not cached)
 * @param editCtx
 */
export function createContextFromEditContext(editCtx: DataEditContext) {
  const btnCtx = new ContextOfButton();

  // *** ContextOf ***
  // this will be everything about the current system, like system / api -paths etc.
  btnCtx.system = new SystemContext();
  if (editCtx.error) {
    btnCtx.system.error = editCtx.error.type;
  }
  // empty

  // this will be something about the current tenant(the dnn portal)
  btnCtx.tenant = new TenantContext();
  if (editCtx.Environment) {
    btnCtx.tenant.id = editCtx.Environment.WebsiteId; // InstanceConfig.portalId
    btnCtx.tenant.url = editCtx.Environment.WebsiteUrl; // NgDialogParams.portalroot
  }

  // things about the user
  btnCtx.user = new UserContext();
  if (editCtx.User) {
    btnCtx.user.canDesign = editCtx.User.CanDesign;
    btnCtx.user.canDevelop = editCtx.User.CanDevelop;
  }

  // *** ContextOfPage ***
  // this will be information related to the current page
  btnCtx.page = new PageContext();
  if (editCtx.Environment) {
    btnCtx.page.id = editCtx.Environment.PageId; // InstanceConfig.tabId, NgDialogParams.tid
    btnCtx.page.url = editCtx.Environment.PageUrl;
  }

  // *** ContextOfInstance ***
  // information related to the current DNN module, incl.instanceId, etc.
  btnCtx.instance = new InstanceContext();
  if (editCtx.Environment) {
    btnCtx.instance.id = editCtx.Environment.InstanceId; // InstanceConfig.moduleId, NgDialogParams.mid
    btnCtx.instance.isEditable = editCtx.Environment.IsEditable;
    // sxc
    btnCtx.instance.sxcVersion = editCtx.Environment.SxcVersion;
    btnCtx.instance.parameters = editCtx.Environment.parameters;
    btnCtx.instance.sxcRootUrl = editCtx.Environment.SxcRootUrl;// NgDialogParams.websiteroot
  }
  if (editCtx.ContentBlock) {
    btnCtx.instance.allowPublish = editCtx.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed;// NgDialogParams.publishing
  }

  // this will be about the current app, settings of the app, app - paths, etc.
  btnCtx.app = new AppContext();
  if (editCtx.ContentGroup) {
    btnCtx.app.id = editCtx.ContentGroup.AppId; // or NgDialogParams.appId
    btnCtx.app.isContent = editCtx.ContentGroup.IsContent;
    btnCtx.app.resourcesId = editCtx.ContentGroup.AppResourcesId;
    btnCtx.app.settingsId = editCtx.ContentGroup.AppSettingsId;
    btnCtx.app.appPath = editCtx.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    btnCtx.app.hasContent = editCtx.ContentGroup.HasContent;
    btnCtx.app.supportsAjax = editCtx.ContentGroup.SupportsAjax;
    btnCtx.app.zoneId = editCtx.ContentGroup.ZoneId; // or NgDialogParams.zoneId
  }
  if (editCtx.Language) {
    // languages
    btnCtx.app.currentLanguage = editCtx.Language.Current; // NgDialogParams.lang
    btnCtx.app.primaryLanguage = editCtx.Language.Primary; // NgDialogParams.langpri
    btnCtx.app.allLanguages = editCtx.Language.All; // or NgDialogParams.langs
  }

  // ensure that the UI will load the correct assets to enable editing
  btnCtx.ui = new UiContext();
  if (editCtx.Ui) {
    btnCtx.ui.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
    if (editCtx.Ui.Form) btnCtx.ui.form = editCtx.Ui.Form; // decide which dialog opens, eg ng8
  }

  // *** ContextOfContentBlock ***
  // information related to the current contentBlock
  btnCtx.contentBlock = new ContentBlockContext();
  if (editCtx.ContentBlock) {
    btnCtx.contentBlock.id = editCtx.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
    btnCtx.contentBlock.isEntity = editCtx.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
    btnCtx.contentBlock.showTemplatePicker = editCtx.ContentBlock.ShowTemplatePicker;
    btnCtx.contentBlock.versioningRequirements = editCtx.ContentBlock.VersioningRequirements;
    btnCtx.contentBlock.parentFieldName = editCtx.ContentBlock.ParentFieldName;
    btnCtx.contentBlock.parentFieldSortOrder = editCtx.ContentBlock.ParentFieldSortOrder;
    btnCtx.contentBlock.partOfPage = editCtx.ContentBlock.PartOfPage;// NgDialogParams.partOfPage
  }
  if (editCtx.ContentGroup) {
    btnCtx.contentBlock.isCreated = editCtx.ContentGroup.IsCreated;
    btnCtx.contentBlock.isList = editCtx.ContentGroup.IsList; // ex: InstanceConfig.isList
    btnCtx.contentBlock.queryId = editCtx.ContentGroup.QueryId;
    btnCtx.contentBlock.templateId = editCtx.ContentGroup.TemplateId;
    btnCtx.contentBlock.contentTypeId = editCtx.ContentGroup.ContentTypeName;
    btnCtx.contentBlock.contentGroupId = editCtx.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
  }

  // *** ContextOfItem ***
  // information about the current item
  btnCtx.item = new ItemContext();
  // empty

  // *** ContextOfToolbar ***
  // fill externally

  // *** ContextOfButton ***
  // fill externally

  return btnCtx;
}

