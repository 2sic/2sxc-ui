import { ContextComplete } from '..';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * things about the user
 * note that the properties are also used in url-params and ajax calls, so don't rename
 */
export class ContextOfUser {
    canDesign: boolean;
    canDevelop: boolean;

    constructor(editCtx?: AttrJsonEditContext) {
        if (!editCtx || !editCtx.User) return;
        this.canDesign = editCtx.User.CanDesign;
        this.canDevelop = editCtx.User.CanDevelop;
    }

    static fromContext(context: ContextComplete): ContextOfUser {
        const user = new ContextOfUser();
        user.canDesign = context.user.canDesign;
        user.canDevelop = context.user.canDevelop;
        return user;
    }
}
