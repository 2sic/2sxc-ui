import { Sxc } from '../../../$2sxc/src';
import { C } from '../constants';
import { SxcTools } from '../sxc/sxc-tools';

/**
 * @internal
 */
export class HtmlTools {

    static disable(tag: HTMLElement): void {
        tag.setAttribute(C.Toolbar.attr.disable, 'true');
    }

    static isDisabled(sxc: Sxc): boolean {
        const tag = SxcTools.getTag(sxc);
        return !!tag.getAttribute(C.Toolbar.attr.disable);
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

    /**
     * Add html classes to a DOM element
     */
    static addClasses(element: HTMLElement, classes: string) {
        if (!classes) return;
        if (classes.indexOf(','))
            classes = classes.replace(',', ' ');
        const classessArray = classes.split(' ');
        for (let c = 0; c < classessArray.length; c++)
            if (classessArray[c])
                element.classList.add(classessArray[c]);
    }
}
