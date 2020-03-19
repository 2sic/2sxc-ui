import { TypeTbD } from '../../plumbing';
import { Button } from '../../toolbar/config/button';
import { ContextBundleToolbar } from './context-bundle-toolbar';

export class ContextBundleButton extends ContextBundleToolbar {
  button: Button;
}


export function isContextOfButton(thing: TypeTbD): thing is ContextBundleButton {
  const maybeButton = thing as ContextBundleButton;
  return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}

