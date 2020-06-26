
declare const ROOTVERSION: string; // set by the definePlugin with string-replace

export const ToSxcName = "2sxc";

// export const SxcVersion = "11.03.00";
export const SxcVersion = ROOTVERSION;

export const SxcPath = 'desktopmodules/tosic_sexycontent/';

export const SxcApiUrlRoot = 'desktopmodules/2sxc/api/';

export const HeaderNames = {
    // 2sxc specific header
    ContentBlockId: "ContentBlockId",

    // headers as defined by DNN
    ModuleId: "ModuleId",
    TabId: "TabId",
    Rvt: "RequestVerificationToken"
};
