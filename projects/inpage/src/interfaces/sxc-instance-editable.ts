import { SxcInstanceWithInternals } from '../../../$2sxc/src';
import { AttrJsonEditContext } from '../context/html-attribute';
import { EditManager } from '../manage/edit-manager';
import { TypeTbD } from '../plumbing';


export class SxcEdit extends SxcInstanceWithInternals {
    manage: EditManager;

    static is(thing: TypeTbD): thing is SxcEdit {
        return (thing as SxcEdit).showDetailedHttpError !== undefined;
    }

    static get(module: number | HTMLElement | JQuery, cbid?: number): SxcEdit {
        const sxc = window.$2sxc(module, cbid) as unknown as SxcEdit;
        return sxc;
    }




    /**
     * get edit-context info of html element or sxc-object
     * @param {SxcEdit} sxc
     * @param {HTMLElement} htmlElement
     * @return {AttrJsonEditContext} edit context info
     */
    static getEditContext(sxc: SxcEdit, htmlElement?: HTMLElement): AttrJsonEditContext {
        let editContextTag: HTMLElement;
        if (htmlElement) {
            editContextTag = SxcEdit.getContainerTag(htmlElement);
        } else {
            editContextTag = SxcEdit.getTag(sxc);
        }
        return getEditContextOfTag(editContextTag);
    }

    /**
     * get nearest html tag of the sxc instance with data-edit-context
     * @param htmlTag
     */
    static getContainerTag(htmlTag: HTMLElement): HTMLElement {
        return $(htmlTag).closest('div[data-edit-context]')[0];
    }

    /**
     * get a html tag of the sxc instance
     * @param {SxcEdit} sxci
     * @return {jquery} - resulting html
     */
    static getTag(sxci: SxcEdit): HTMLElement {
        return $(`div[data-cb-id='${sxci.cbid}']`)[0];
    }

}



/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @return {AttrJsonEditContext} edit-context object
 */
function getEditContextOfTag(htmlTag: HTMLElement): AttrJsonEditContext {
  const attr = htmlTag.getAttribute('data-edit-context');
  return JSON.parse(attr || '{ }') as AttrJsonEditContext;
}
