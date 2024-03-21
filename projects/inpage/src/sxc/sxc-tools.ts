import { Sxc } from '../../../$2sxc/src/sxc/sxc';
import { C } from '../constants';
import { AttrJsonEditContext } from '../context/html-attribute';


/**
 * @internal
 */
export class SxcTools {
    static get(module: number | HTMLElement, cbid?: number): Sxc {
        // 2021-09-17 spm assume this function doesn't use jquery
        const sxc = window.$2sxc(module, cbid) as unknown as Sxc;
        return sxc;
    }

    /**
     * get edit-context info of html element or sxc-object
     */
    static getEditContext(sxc: Sxc, htmlElement?: HTMLElement): AttrJsonEditContext {
        const editContextTag: HTMLElement = (htmlElement)
            ? SxcTools.getContainerTag(htmlElement)
            : SxcTools.getTag(sxc);
        return SxcTools.getEditContextOfTag(editContextTag);
    }

    /**
     * get the edit-context object (a json object) of the current tag/sxc-instance
     * @returns edit-context object
     */
    static getEditContextOfTag(htmlTag: HTMLElement | undefined): AttrJsonEditContext {
        const attr = htmlTag?.getAttribute(C.AttrNames.Context);
        return JSON.parse(attr || '{ }') as AttrJsonEditContext;
    }


    /**
     * get nearest html tag of the sxc instance with data-edit-context
     */
    static getContainerTag(htmlTag: HTMLElement): HTMLElement {
        return htmlTag.closest<HTMLElement>(C.Sel.SxcDivs);
    }

    /**
     * get a html tag of the sxc instance
     * @returns resulting html
     */
    static getTag(sxci: Sxc): HTMLElement {
        return document.querySelector<HTMLElement>(`div[${C.AttrNames.ContentBlockId}='${sxci.cbid}']`);
    }

}
