import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be information related to the current page
 * @internal
 */
export interface ContextOfPage {
    id: number;
    // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    // url: string;

    // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    //     if (editCtx.Environment) {
    //         this.id = editCtx.Environment.PageId;
    //         // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    //         // this.url = editCtx.Environment.PageUrl;
    //     }

    //     // catch cases where it wasn't provided
    //     this.id = this.id ?? sxc?.ctx?.pageId ?? window.$2sxc.env.page() ?? -2742;
    // }
}

export function createContextOfPage(editCtx: AttrJsonEditContext, sxc: Sxc): ContextOfPage {
    return {
        id: editCtx.Environment?.PageId ?? sxc?.ctx?.pageId ?? window.$2sxc.env.page() ?? -2742,
        // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
        // url: editCtx.Environment?.PageUrl,
    } satisfies ContextOfPage;
}
