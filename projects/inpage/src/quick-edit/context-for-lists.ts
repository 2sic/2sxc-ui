import { QeSelectors } from '.';

export class ContextForLists {
    parent: string | number;
    field: string;
    type?: string;
    guid?: string;
    apps?: string;
    max?: number;

    static getFromDom(tag: JQuery | HTMLElement): ContextForLists {
        return JSON.parse($(tag).attr(QeSelectors.blocks.cb.context) || null) as ContextForLists;
    }
}
