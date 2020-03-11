import * as Constants from '../constants';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { getTag } from '../manage/api';

export class HtmlTools {

    static disable(tag: HTMLElement | JQuery): void {
        const jtag = $(tag);
        jtag.attr(Constants.toolbar.attr.disable, 'true');
    }

    static isDisabled(sxc: SxcIntanceEditable): boolean {
        const tag = $(getTag(sxc));
        return !!tag.attr(Constants.toolbar.attr.disable);
    }

    /**
     * Find the text of one or more attributes in fallback order, till we found one
     */
    static getFirstAttribute(toolbar: HTMLElement, name1: string, name2: string): string {
        return HtmlTools.tryGetAttrText(toolbar, name1) || HtmlTools.tryGetAttrText(toolbar, name2) || '{}';
    }

    /**
     * Get text-content of an attribute (or return null)
     */
    static tryGetAttrText(tag: HTMLElement, name: string): string {
        const item1 = tag.attributes.getNamedItem(name);
        return item1 && item1.textContent;
    }
}
