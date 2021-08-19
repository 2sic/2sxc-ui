/**
 * Special version which is filled in during compile by the definePlugin
 * The real version comes from the main package.json file in this repo
 * The sub-projects also use this version
 */
declare const ROOTVERSION: string;

export const ToSxcName = "2sxc";

export const SxcVersion = ROOTVERSION;

export const SxcApiUrlRoot = 'desktopmodules/2sxc/api/';

export const HeaderNames = {
    // 2sxc specific header
    ContentBlockId: "ContentBlockId",

    // headers as defined by DNN
    ModuleId: "ModuleId",
    TabId: "TabId",

    // Header which should replace "TabId" in the long run
    PageId: "PageId",
};

export const ApiUrlRoots = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];
export const AppApiMarker = 'app';

// TODO: this should later lead to remapping of old url calls, but it's not in use yet
// note that these were always 'auto' so `app-content` would need to be come `app/auto/content`
export const AppApiMap = {
    'app-api': 'app/[name]/api',
    'app-query': 'app/[name]/query',
    'app-content': 'app/[name]/content'
};

// These are Not-Defined-IDs.
// Because

/**
 * This is a marker for an ID which is not defined
 * This is for situations where a 0 or even a negative number
 * could be real numbers, so this number is so big, it should never be a real ID
 */
export const NumberNotDefinedHuge = 274200000000;
