import { ContextOfPage } from './context-of-page';
import { AppContext } from './instance-context/app-context';
import { InstanceContext } from './instance-context/instance-context';
import { UiContext } from './instance-context/ui-context';


export class ContextOfInstance extends ContextOfPage {
  sxc: SxcInstanceWithInternals; // instance of sxc object
  instance: InstanceContext; // information related to the current DNN module, incl.instanceId, etc.
  app: AppContext; // this will be about the current app, settings of the app, app - paths, etc.
  ui: UiContext; // ensure that the UI will load the correct assets to enable editing
}

export function isContextOfInstance(thing: any): thing is ContextOfInstance {
  const maybeButton = thing as ContextOfInstance;
  return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
}

