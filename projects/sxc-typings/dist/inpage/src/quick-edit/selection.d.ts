/**
 * @internal
 */
export declare class Selection {
    /** The parent is either "dnn" or a module information */
    parent: string | number;
    parentGuid: string;
    /** The field inside the parent used for this content */
    field: string;
    list: HTMLElement;
    item: HTMLElement;
    index: number;
    type: 'mod' | 'cb';
}
