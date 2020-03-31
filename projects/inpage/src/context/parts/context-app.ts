import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be about the current app, settings of the app, app - paths, etc.
 */
export class ContextOfApp {
    // ContentGroup
    isContent: boolean; // if it’s the main Content app or not
    settingsId: number;
    resourcesId: number;
    appPath: string;
    hasContent: boolean;
    supportsAjax: boolean;
    zoneId: number;
    id: number; // appId
    // languages
    currentLanguage: string;
    primaryLanguage: string;
    allLanguages: string[] | null;

    constructor(editCtx: AttrJsonEditContext) {
        // Initialize Content-Group App information
        if (editCtx.ContentGroup) {
            this.id = editCtx.ContentGroup.AppId; // or NgDialogParams.appId
            this.isContent = editCtx.ContentGroup.IsContent;
            this.resourcesId = editCtx.ContentGroup.AppResourcesId;
            this.settingsId = editCtx.ContentGroup.AppSettingsId;
            this.appPath = editCtx.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
            this.hasContent = editCtx.ContentGroup.HasContent;
            this.supportsAjax = editCtx.ContentGroup.SupportsAjax;
            this.zoneId = editCtx.ContentGroup.ZoneId; // or NgDialogParams.zoneId
        }

        // Initialize language information
        if (editCtx.Language) {
            this.currentLanguage = editCtx.Language.Current; // NgDialogParams.lang
            this.primaryLanguage = editCtx.Language.Primary; // NgDialogParams.langpri
            this.allLanguages = editCtx.Language.All; // or NgDialogParams.langs
        }
    }
}
