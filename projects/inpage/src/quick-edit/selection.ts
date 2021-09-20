export class Selection {
    /** The parent is either "dnn" or a module information */
    parent: string | number;

    // new in 11.06 - inner content now always uses guid
    parentGuid: string;

    /** The field inside the parent used for this content */
    field: string;

    list: HTMLElement;
    item: HTMLElement;
    index: number;
    type: 'mod' | 'cb';
}
