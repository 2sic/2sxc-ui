import { ModifierBase, Selection } from '.';
import { ModifierContentBlockInstance } from './modifier-content-block-internal';
/**
 * extend the quick edit with the core commands
 * @internal
 */
export declare class ModifierContentBlock extends ModifierBase {
    constructor();
    getInstanceModifier(tag: HTMLElement): ModifierContentBlockInstance;
    delete(clip: Selection): Promise<void>;
    create(parent: number, field: string, listIndex: number, appOrContent: string, list: HTMLElement, newGuid: string): Promise<void>;
    move(oldClip: Selection, newClip: Selection): void;
    isRealMove(oldClip: Selection, newClip: Selection): boolean;
    /**
     * find the real index of this block in the list - may not match the DOM index
     */
    findClipListIndex(clip: Selection): number;
    /**
     * find the real index of a block tag as it may not match the DOM index
     */
    findListIndex(tag: HTMLElement, fallback: number): number;
    /**
     * The button click handler. Must be static, as it will be attached to the buttons
     * So the 'this' is not a ContentBlockModifier, but the html-tag which was clicked
     */
    static onCbButtonClick(): void | Promise<void>;
}
