import { TypeTbD } from '../../plumbing';
import { ButtonConfig } from '../../toolbar/config/button/button-config';
import { ContextBundleToolbar } from './context-bundle-toolbar';

export class ContextBundleButton extends ContextBundleToolbar {
  button: ButtonConfig;
}


export function isContextOfButton(thing: TypeTbD): thing is ContextBundleButton {
  const maybeButton = thing as ContextBundleButton;
  return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}

