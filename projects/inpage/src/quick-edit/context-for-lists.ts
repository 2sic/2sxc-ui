import { QeSelectors } from '.';
import { $jq } from '../interfaces/sxc-controller-in-page';

export class ContextForLists {
    parent: string | number;

    // new in 11.06 - all list-operations now use the parentGuid for inner-content
    parentGuid: string;

    field: string;
    type?: string;
    guid?: string;
    apps?: string;
    max?: number;

    appList?: string[];

    static getFromDom(tag: JQuery | HTMLElement): ContextForLists {
        const result: ContextForLists = JSON.parse($jq(tag).attr(QeSelectors.blocks.cb.context) || null) || {};
        result.appList = []; // empty by default
        if (result != null && typeof(result.apps) === 'string' && result.apps.length > 1)
            result.appList = result.apps
                .split(',')
                .map((s) => s.trim())   // trim
                .filter((s) => !!s);    // drop empty ones
        return result;
    }
}
