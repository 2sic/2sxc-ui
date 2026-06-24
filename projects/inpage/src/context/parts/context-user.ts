import { AttrJsonEditContext, AttrJsonUser } from "../html-attribute";

/**
 * @internal
 */
export interface ContextOfUser extends AttrJsonUser {
  // constructor(editCtx?: AttrJsonEditContext) {
  //   super();
  //   if (!editCtx || !editCtx.User) return;
  //   this.CanDevelop = editCtx.User.CanDevelop;
  //   this.CanAdmin = editCtx.User.CanAdmin;
  //   this.canSwitchEdition = editCtx.User.canSwitchEdition;
  // }
}

export function createContextOfUser(editCtx?: AttrJsonEditContext): ContextOfUser {
  const user = editCtx?.User;
  return {
    CanDevelop: user?.CanDevelop ?? false,
    CanAdmin: user?.CanAdmin ?? false,
    canSwitchEdition: user?.canSwitchEdition ?? false,
  } satisfies ContextOfUser;
}