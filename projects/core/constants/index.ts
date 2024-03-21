/**
 * Special version which is filled in during compile by the definePlugin
 * The real version comes from the main package.json file in this repo
 * The sub-projects also use this version
 */
declare const ROOTVERSION: string;

/** @internal */
export const ToSxcName = "2sxc";

/** @internal */
export const SxcVersion = ROOTVERSION;

/** @internal */
export const SxcApiUrlRoot = 'desktopmodules/2sxc/api/';

/** @internal */
export const HeaderNames = {
    // 2sxc specific header
    ContentBlockId: "ContentBlockId",

    // headers as defined by DNN
    ModuleId: "ModuleId",
    TabId: "TabId",

    // Header which should replace "TabId" in the long run
    PageId: "PageId",
};

/** @internal */
export const ApiUrlRoots = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];
/** @internal */
export const AppApiMarker = 'app';

// TODO: this should later lead to remapping of old url calls, but it's not in use yet
// note that these were always 'auto' so `app-content` would need to be come `app/auto/content`
/** @internal */
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
 * @internal
 */
export const NumberNotDefinedHuge = 274200000000;

// Moving to here because it's used in inpage and $2sxc

/**
 * Attribute Names used in the HTML
 */
export const Attributes = {
  InstanceId: 'data-cb-instance',
  Context: 'data-edit-context',
  ContentBlockId: 'data-cb-id',
};

export const C = {
  Attributes: Attributes,
  Sel: {
    SxcDivs: `div[${Attributes.Context}]`,
  },

}