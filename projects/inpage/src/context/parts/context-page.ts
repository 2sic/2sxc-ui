import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be information related to the current page
 */
export class ContextOfPage {
    id: number;
    url: string;

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.PageId;
            this.url = editCtx.Environment.PageUrl;
        }
    }
}
