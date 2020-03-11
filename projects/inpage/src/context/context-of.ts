import { ContextBundleBase } from './base-context/base-context';
import { ContextOfSystem } from './base-context/system-context';
import { ContextOfTenant } from './base-context/tenant-context';
import { ContextOfUser } from './base-context/user-context';

export class ContextOf extends ContextBundleBase {
  system: ContextOfSystem; // this will be everything about the current system, like system / api -paths etc.
  tenant: ContextOfTenant; // this will be something about the current tenant(the dnn portal)
  user: ContextOfUser; // things about the user
}
