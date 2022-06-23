import { ModifierBase, ModifierDnnModule, Selection } from '.';
import { HasLog } from '../core';
import { ModifierContentBlock } from './modifier-content-block';
/**
 * add a clipboard to the quick edit
 * @internal
 */
export declare class QuickEClipboard extends HasLog {
    /** Singleton */
    static singleton(): QuickEClipboard;
    private static _singleton;
    /**
     * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
     */
    clipboard: Selection;
    mods: {
        [key: string]: ModifierBase;
    };
    modDnn: ModifierDnnModule;
    modCb: ModifierContentBlock;
    private constructor();
    /**
     * bind clipboard actions to DOM buttons
     */
    initializeSecondaryButtons(): void;
    /**
     * perform copy and paste commands - needs the clipboard
     * @param cbAction
     * @param list
     * @param domIndex
     * @param type
     */
    do(cbAction: string, list: HTMLElement, domIndex: number, type: string): void;
    private mark;
    /** Clear the UI so nothing is selected any more */
    private clearUi;
    private removeSelectionMarker;
    private setSecondaryActionsState;
    private createSpecs;
}
