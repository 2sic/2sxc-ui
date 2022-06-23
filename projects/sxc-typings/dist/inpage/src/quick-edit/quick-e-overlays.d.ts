import { QuickEditConfigButtons } from '.';
/**
 * @internal
 */
export declare namespace QuickEditOverlay {
    interface Selection extends HTMLElement {
        toggleOverlay(target: boolean | HTMLElement, buttons?: QuickEditConfigButtons): void;
        target: HTMLElement;
    }
    interface Main extends HTMLElement {
        activeContentBlock: HTMLElement;
        activeModule: HTMLElement;
        _parentNode: HTMLElement;
    }
    function setButtonActivationClasses(buttons: QuickEditConfigButtons, linkTags: HTMLElement[]): void;
    function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string;
    const selectedOverlay: Selection;
}
