import { ModifierContentBlock } from '.';
import { Sxc } from '../../../$2sxc/src';
import { HasLog } from '../core';
/**
 * contains commands to create/move/delete a content-block in an inner-content
 * @internal
 */
export declare class ModifierContentBlockInstance extends HasLog {
    private sxcInstance;
    constructor(parent: ModifierContentBlock, sxcInstance: Sxc);
    /**
     * create content block
     * @param parentId
     * @param fieldName
     * @param index
     * @param appName
     * @param container
     * @param newGuid
     */
    create(parentId: number, fieldName: string, index: number, appName: string, container: HTMLElement, newGuid: string): Promise<void>;
    /**
     * move content block
     * @param parentId
     * @param field
     * @param indexFrom
     * @param indexTo
     */
    move(parent: string, field: string, indexFrom: number, indexTo: number): Promise<void>;
    /**
     * delete a content-block inside a list of content-blocks
     * @param parent
     * @param field
     * @param index
     */
    delete(parent: string, field: string, index: number): Promise<void>;
}
