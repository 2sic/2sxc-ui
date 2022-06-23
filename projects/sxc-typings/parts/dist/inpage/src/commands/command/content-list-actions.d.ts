import { ContextComplete } from '../../context/bundles/context-bundle-button';
/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @class ActionsCatalog
 * @internal
 */
declare class ContentListActions {
    /**
     * add an item to the list at this position
     * @param {ContextComplete} context
     * @param {number} index
     */
    addItem<T>(context: ContextComplete, index: number): Promise<void | T>;
    /**
     * remove an item from a list, then reload
     * @param {ContextComplete} context
     * @param {number} sortOrder
     */
    removeFromList(context: ContextComplete): Promise<void>;
    /**
     * change the order of an item in a list, then reload
     * @param {ContextComplete} context
     * @param {number} index
     * @param {number} toIndex
     */
    changeOrder(context: ContextComplete, index: number, toIndex: number): Promise<void>;
    /**
     * set a content-item in this block to published, then reload
     * @param {ContextComplete} context
     * @param {string} part
     * @param {number} index
     */
    publish(context: ContextComplete, part: string, index: number): Promise<void>;
    /**
     * publish an item using it's ID
     * @param {ContextComplete} context
     * @param {number} entityId
     */
    publishId(context: ContextComplete, entityId: number): Promise<void>;
}
/**
 * @internal
 */
export declare const Actions: ContentListActions;
export {};
