import { SxcIntanceEditable } from '../../interfaces/sxc-instance-editable';
import { TypeTbD } from '../../plumbing';
import { ContextOfApp } from '../parts/context-app';
import { ContextOfInstance } from '../parts/context-instance';
import { ContextOfUi } from '../parts/context-ui';
import { ContextBundlePage } from './context-bundle-page';


export class ContextBundleInstance extends ContextBundlePage {
  sxc: SxcIntanceEditable; // instance of sxc object
  instance: ContextOfInstance; // information related to the current DNN module, incl.instanceId, etc.
  app: ContextOfApp; // this will be about the current app, settings of the app, app - paths, etc.
  ui: ContextOfUi; // ensure that the UI will load the correct assets to enable editing
}

export function isContextOfInstance(thing: TypeTbD): thing is ContextBundleInstance {
  const maybeButton = thing as ContextBundleInstance;
  return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
}

