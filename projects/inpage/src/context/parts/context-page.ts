import { $2sxcInPage } from '../../interfaces/sxc-controller-in-page';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be information related to the current page
 */
export class ContextOfPage {
    id: number;
    // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    // url: string;

    constructor(editCtx: AttrJsonEditContext, sxc: SxcEdit) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.PageId;
            // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
            // this.url = editCtx.Environment.PageUrl;
        }

        // catch cases where it wasn't provided
        if (!this.id) this.id = sxc?.ctx?.pageId || $2sxcInPage.env.page();
    }
}
