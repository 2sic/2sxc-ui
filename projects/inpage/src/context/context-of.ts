import { BaseContext } from './base-context/base-context';
import { SystemContext } from './base-context/system-context';
import { TenantContext } from './base-context/tenant-context';
import { UserContext } from './base-context/user-context';

export class ContextOf extends BaseContext {
  system: SystemContext; // this will be everything about the current system, like system / api -paths etc.
  tenant: TenantContext; // this will be something about the current tenant(the dnn portal)
  user: UserContext; // things about the user
}
