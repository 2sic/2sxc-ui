import { ContextComplete } from '../../context';
/**
 * Shared logic like for deciding if we show list buttons
 * here
 * @internal
 */
export declare class SharedLogic {
    static isPartOfBlockList(context: ContextComplete): boolean;
    /**
     * This will tell us, if the item is being referenced (like in a list)
     * It's similar to isBlockList, but will return true even if it's
     * a non-list (single item only)
     */
    static isBlockReference(context: ContextComplete): boolean;
    static isFieldList(context: ContextComplete): boolean;
    static isList(context: ContextComplete): boolean;
    static isReferencedItem(context: ContextComplete): boolean;
}
