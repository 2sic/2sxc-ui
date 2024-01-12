import { Sxc } from "../../../../$2sxc/src";
import { AttrJsonEditContext } from "../html-attribute";

export class ContentAppUnifiedInCtxAndAttr {
  /**
   * App name for showing in the layout infos - new v17
   */
  appName: string;
}

/**
 * this will be about the current app, settings of the app, app - paths, etc.
 * @internal
 */
export class ContextOfApp extends ContentAppUnifiedInCtxAndAttr {
  // ContentGroup
  /**
   * IsContent is used for 2 things
   * 1. Determine if certain buttons should be enabled in the toolbar
   * 2. To forward to the quick-dialog, which changes behavior based on this
   * Should default to true, because that's the more basic/restricted mode
   */
  isContent: boolean = true;
  settingsId: number = null;
  resourcesId: number = null;
  appPath: string;
  hasContent: boolean;
  supportsAjax: boolean = false;
  zoneId: number;
  id: number; // appId
  // languages
  currentLanguage: string;
  primaryLanguage: string;
  allLanguages: string[] | null;

  constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    super();
    // Initialize Content-Group App information
    if (editCtx.contentBlock) {
      const cb = editCtx.contentBlock;
      this.id = cb.AppId;
      this.isContent = cb.IsContent ?? true;
      this.resourcesId = cb.AppResourcesId ?? null;
      this.settingsId = cb.AppSettingsId ?? null;
      this.appPath = cb.AppUrl; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
      this.hasContent = cb.HasContent;
      this.supportsAjax = cb.SupportsAjax ?? false;
      this.zoneId = cb.ZoneId;

      // new for layout stats v17
       this.appName = cb.appName;
    }

    // if we have more context information, use this to provide possibly missing data
    if (sxc && sxc.ctx) {
      this.id = this.id ?? sxc.ctx.appId;
      this.zoneId = this.id ?? sxc.ctx.zoneId;
    }

    // Initialize language information
    if (editCtx.Language) {
      this.currentLanguage = editCtx.Language.Current;
      this.primaryLanguage = editCtx.Language.Primary;
      this.allLanguages = editCtx.Language.All;
    }
  }
}
