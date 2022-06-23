/**
 * @internal
 */
export declare class ContextForLists {
    parent: string | number;
    parentGuid: string;
    field: string;
    type?: string;
    guid?: string;
    apps?: string;
    max?: number;
    appList?: string[];
    static getFromDom(tag: HTMLElement): ContextForLists;
}
