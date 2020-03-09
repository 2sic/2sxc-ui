import { ContextOfButton } from '../context/context-of-button';
import { IUserOfEditContext } from '../interfaces/iuser-of-edit-context';


export class UserOfEditContext implements IUserOfEditContext {
  canDesign: boolean;
  canDevelop: boolean;

  static fromContext(context: ContextOfButton): UserOfEditContext {
    const user = new UserOfEditContext();
    user.canDesign = context.user.canDesign;
    user.canDevelop = context.user.canDevelop;
    return user;
  }
}
