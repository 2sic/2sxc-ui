import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { ContextBundleOfPage } from './context-of-page';
import { ContextOfApp } from './instance-context/app-context';
import { ContextOfInstance } from './instance-context/instance-context';
import { UiContext } from './instance-context/ui-context';


export class ContextBundleOfInstance extends ContextBundleOfPage {
  sxc: SxcIntanceEditable; // instance of sxc object
  instance: ContextOfInstance; // information related to the current DNN module, incl.instanceId, etc.
  app: ContextOfApp; // this will be about the current app, settings of the app, app - paths, etc.
  ui: UiContext; // ensure that the UI will load the correct assets to enable editing
}

export function isContextOfInstance(thing: any): thing is ContextBundleOfInstance {
  const maybeButton = thing as ContextBundleOfInstance;
  return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
}

