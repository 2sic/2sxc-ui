import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be information related to the current page
 * @internal
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
        this.id = this.id ?? sxc?.ctx?.pageId ?? window.$2sxc.env.page() ?? -2742;
    }
}
