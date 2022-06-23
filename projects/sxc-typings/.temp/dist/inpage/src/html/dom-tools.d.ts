import { Sxc } from '../../../$2sxc/src';
/**
 * @internal
 */
export declare class HtmlTools {
    static disable(tag: HTMLElement): void;
    static isDisabled(sxc: Sxc): boolean;
    /**
     * Find the text of one or more attributes in fallback order, till we found one
     */
    static getFirstAttribute(toolbar: HTMLElement, name1: string, name2: string): string;
    /**
     * Get text-content of an attribute (or return null)
     */
    static tryGetAttrText(tag: HTMLElement, name: string): string;
    /**
     * Add html classes to a DOM element
     */
    static addClasses(element: HTMLElement, classes: string): void;
}
