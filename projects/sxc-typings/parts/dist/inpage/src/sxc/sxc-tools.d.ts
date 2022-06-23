import { Sxc } from '../../../$2sxc/src';
import { AttrJsonEditContext } from '../context/html-attribute';
/**
 * @internal
 */
export declare class SxcTools {
    static get(module: number | HTMLElement, cbid?: number): Sxc;
    /**
     * get edit-context info of html element or sxc-object
     * @param {SxcEdit} sxc
     * @param {HTMLElement} htmlElement
     * @return {AttrJsonEditContext} edit context info
     */
    static getEditContext(sxc: Sxc, htmlElement?: HTMLElement): AttrJsonEditContext;
    /**
     * get the edit-context object (a json object) of the current tag/sxc-instance
     * @return {AttrJsonEditContext} edit-context object
     */
    static getEditContextOfTag(htmlTag: HTMLElement | undefined): AttrJsonEditContext;
    /**
     * get nearest html tag of the sxc instance with data-edit-context
     * @param htmlTag
     */
    static getContainerTag(htmlTag: HTMLElement): HTMLElement;
    /**
     * get a html tag of the sxc instance
     * @param {SxcEdit} sxci
     * @return {HTMLElement} - resulting html
     */
    static getTag(sxci: Sxc): HTMLElement;
}
