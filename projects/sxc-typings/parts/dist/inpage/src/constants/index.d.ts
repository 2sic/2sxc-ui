import { ContentBlock } from './content-block';
import { DialogPaths } from './dialog-paths';
/**
 * @internal
 */
export declare const C: {
    ContentBlock: typeof ContentBlock;
    DialogPaths: typeof DialogPaths;
    IDs: {
        cls: {
            scMenu: string;
        };
        attr: {
            toolbar: string;
            toolbarData: string;
            settings: string;
            settingsData: string;
        };
        publishAllowed: string;
        sel: {
            scMenu: string;
            tagScMenu: string;
        };
    };
    AttrNames: {
        InstanceId: string;
        Context: string;
        ContentBlockId: string;
    };
    ClsNames: {
        UnInitialized: string;
        UnAvailable: string;
    };
    Toolbar: {
        attrToMarkInitalized: string;
        attr: {
            full: string;
            hover: string;
            /**
             * Attribute Names used in the HTML
             */
            disable: string;
        };
        classes: {
            oldHover: string;
        };
        selectors: {
            ofOldHover: string;
        };
        eventNames: {
            onInit: string;
        };
    };
    Cb: {
        classes: {
            name: string;
        };
        selectors: {
            ofName: string;
        };
    };
    Debug: {
        cms: {
            autoDump: boolean;
            run: boolean;
        };
    };
    Sel: {
        SxcDivs: string;
    };
};
