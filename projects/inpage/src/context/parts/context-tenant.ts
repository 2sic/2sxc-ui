import { AttrJsonEditContext } from '../html-attribute';

/**
 * this will be something about the current tenant(the dnn portal)
 */
export class ContextOfTenant {
    id: number;
    url: string;

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.WebsiteId;
            this.url = editCtx.Environment.WebsiteUrl;
        }
    }
    
}
