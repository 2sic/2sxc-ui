
namespace QuickEdit {

    export interface SelectionOverlay extends JQuery {
        toggleOverlay(target: boolean | JQuery): void;
        target: JQuery;
    }


    export interface MainOverlay extends JQuery {
        activeContentBlock: JQuery;
        activeModule: JQuery;
        parentNode: HTMLElement;
    }


    export interface QuickEConfiguration {
        enable: boolean;
        innerBlocks: {
            enable: boolean | string | null;
        };
        modules: {
            enable: boolean | string | null;
        };
        guid?: string;
    }
}
