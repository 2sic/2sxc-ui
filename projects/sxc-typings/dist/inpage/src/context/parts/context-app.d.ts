import { Sxc } from '../../../../$2sxc/src';
import { AttrJsonEditContext } from '../html-attribute';
/**
 * this will be about the current app, settings of the app, app - paths, etc.
 * @internal
 */
export declare class ContextOfApp {
    /**
     * IsContent is used for 2 things
     * 1. Determine if certain buttons should be enabled in the toolbar
     * 2. To forward to the quick-dialog, which changes behavior based on this
     * Should default to true, because that's the more basic/restricted mode
     */
    isContent: boolean;
    settingsId: number;
    resourcesId: number;
    appPath: string;
    hasContent: boolean;
    supportsAjax: boolean;
    zoneId: number;
    id: number;
    currentLanguage: string;
    primaryLanguage: string;
    allLanguages: string[] | null;
    constructor(editCtx: AttrJsonEditContext, sxc: Sxc);
}
