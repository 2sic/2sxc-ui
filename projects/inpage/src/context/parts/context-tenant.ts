import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be something about the current tenant(the dnn portal)
 * @internal
 */
export class ContextOfTenant {
    // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    // id: number;
    // url: string;

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.Environment) {
            // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
            // this.id = editCtx.Environment.WebsiteId;
            // this.url = editCtx.Environment.WebsiteUrl;
        }
    }
}
