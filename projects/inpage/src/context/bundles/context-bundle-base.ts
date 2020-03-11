import { ContextOfSystem } from '../parts/context-system';
import { ContextOfTenant } from '../parts/context-tenant';
import { ContextOfUser } from '../parts/context-user';


export class ContextBundleBase {
   system: ContextOfSystem; // this will be everything about the current system, like system / api -paths etc.
   tenant: ContextOfTenant; // this will be something about the current tenant(the dnn portal)
   user: ContextOfUser; // things about the user

  _isContext = true;
}

export function isContext(thing: any): thing is ContextBundleBase {
  const maybeButton = thing as ContextBundleBase;
  return maybeButton._isContext !== undefined;
}
