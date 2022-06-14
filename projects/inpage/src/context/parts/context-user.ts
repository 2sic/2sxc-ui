import { ContextComplete } from '..';
import { AttrJsonEditContext, AttrJsonUser } from '../html-attribute';

/**
 * things about the user
 * ~~note that the properties are also used in url-params and ajax calls, so don't rename~~
 * 2022-02-23 2dm - renamed to upper case now, assume it shouldn't have a side effect because
 * it shouldn't be used in ajax calls, since the dialogs get the settings from the backend
 * @internal
 */
export class ContextOfUser extends AttrJsonUser {

    constructor(editCtx?: AttrJsonEditContext) {
        super();
        if (!editCtx || !editCtx.User) return;
        this.CanDevelop = editCtx.User.CanDevelop;
        this.CanAdmin = editCtx.User.CanAdmin;
    }

    static fromContext(context: ContextComplete): ContextOfUser {
        const user = new ContextOfUser();
        user.CanDevelop = context.user.CanDevelop;
        user.CanAdmin = context.user.CanAdmin;
        return user;
    }
}
