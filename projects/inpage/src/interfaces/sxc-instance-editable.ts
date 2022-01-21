import { environment } from './../../../quick-dialog/src/environments/environment';
import { SxcInstanceWithInternals } from '../../../$2sxc/src';
import { AttrJsonEditContext } from '../context/html-attribute';
import { EditManager } from '../manage/edit-manager';
import { TypeTbD } from '../plumbing';


export class SxcEdit extends SxcInstanceWithInternals {
    manage: EditManager;

    static is(thing: TypeTbD): thing is SxcEdit {
        return (thing as SxcEdit).showDetailedHttpError !== undefined;
    }

    static get(module: number | HTMLElement, cbid?: number): SxcEdit {
        // 2021-09-17 spm assume this function doesn't use jquery
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
        return SxcEdit.getEditContextOfTag(editContextTag);
    }

    /**
     * get the edit-context object (a json object) of the current tag/sxc-instance
     * @return {AttrJsonEditContext} edit-context object
     */
    static getEditContextOfTag(htmlTag: HTMLElement): AttrJsonEditContext {
        const attr = htmlTag?.getAttribute('data-edit-context');
        return JSON.parse(attr || '{ }') as AttrJsonEditContext;
    }


    /**
     * get nearest html tag of the sxc instance with data-edit-context
     * @param htmlTag
     */
    static getContainerTag(htmlTag: HTMLElement): HTMLElement {
        return htmlTag.closest<HTMLElement>('div[data-edit-context]');
    }

    /**
     * get a html tag of the sxc instance
     * @param {SxcEdit} sxci
     * @return {HTMLElement} - resulting html
     */
    static getTag(sxci: SxcEdit): HTMLElement {
        return document.querySelector<HTMLElement>(`div[data-cb-id='${sxci.cbid}']`);
    }

    static getBlockIds(id: number): string {
      var blocks = new Array<string>();
      var elements = document.querySelectorAll<HTMLElement>(`div[data-cb-instance='${id}']`);
      elements.forEach(element => {
        var cts = this.getEditContextOfTag(element);
        blocks.push(this.getBlockId(cts));
      });
      return blocks.join(',');
    }

    static getBlockId(ctx: AttrJsonEditContext): string {
      return `${ctx.Environment.InstanceId}:${ctx.contentBlockReference.id}`;
      // return `${ctx.contentBlock.AppId}:${ctx.contentBlock.ContentTypeName}`;
    }
}
