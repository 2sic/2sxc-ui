import { SxcInstanceWithInternals } from '../../../$2sxc/src';
import { Cms } from '../cms/Cms';
import { ensureRunParamsInstanceOrError, RunParams } from '../commands/engine/run-params';
import { C } from '../constants';
import { AttrJsonEditContext } from '../context/html-attribute';
import { EditManager } from '../manage/edit-manager';


export class SxcEdit extends SxcInstanceWithInternals {
    manage: EditManager;

    /// TODO: CONTINUE HERE, TRY TO GET THE RUN TO USE THE CURRENT 2SXC
    run<T>(runParams: RunParams): Promise<void | T> {
        ensureRunParamsInstanceOrError(runParams);
        return new Cms().run({ ...runParams, context: this });
    }

    static is(thing: unknown): thing is SxcEdit {
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
    static getEditContextOfTag(htmlTag: HTMLElement | undefined): AttrJsonEditContext {
        const attr = htmlTag?.getAttribute(C.AttrNames.Context);
        return JSON.parse(attr || '{ }') as AttrJsonEditContext;
    }


    /**
     * get nearest html tag of the sxc instance with data-edit-context
     * @param htmlTag
     */
    static getContainerTag(htmlTag: HTMLElement): HTMLElement {
        return htmlTag.closest<HTMLElement>(C.Sel.SxcDivs);
    }

    /**
     * get a html tag of the sxc instance
     * @param {SxcEdit} sxci
     * @return {HTMLElement} - resulting html
     */
    static getTag(sxci: SxcEdit): HTMLElement {
        return document.querySelector<HTMLElement>(`div[${C.AttrNames.ContentBlockId}='${sxci.cbid}']`);
    }

}
