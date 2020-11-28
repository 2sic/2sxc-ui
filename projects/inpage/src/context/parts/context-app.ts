import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be about the current app, settings of the app, app - paths, etc.
 */
export class ContextOfApp {
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

    constructor(editCtx: AttrJsonEditContext, sxc: SxcEdit) {
        // Initialize Content-Group App information
        if (editCtx.ContentGroup) {
            this.id = editCtx.ContentGroup.AppId;
            this.isContent = editCtx.ContentGroup.IsContent || true;
            this.resourcesId = editCtx.ContentGroup.AppResourcesId || null;
            this.settingsId = editCtx.ContentGroup.AppSettingsId || null;
            this.appPath = editCtx.ContentGroup.AppUrl; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
            this.hasContent = editCtx.ContentGroup.HasContent;
            this.supportsAjax = editCtx.ContentGroup.SupportsAjax || false;
            this.zoneId = editCtx.ContentGroup.ZoneId;
        }

        // if we have more context information, use this to provide possibly missing data
        if (sxc && sxc.ctx) {
            this.id = this.id || sxc.ctx.appId;
            this.zoneId = this.id || sxc.ctx.zoneId;
        }

        // Initialize language information
        if (editCtx.Language) {
            this.currentLanguage = editCtx.Language.Current;
            this.primaryLanguage = editCtx.Language.Primary;
            this.allLanguages = editCtx.Language.All;
        }
    }
}
