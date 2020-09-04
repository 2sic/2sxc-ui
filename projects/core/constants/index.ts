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
    Rvt: "RequestVerificationToken"
};
