import { TypeTbD } from '../../plumbing';
import { ButtonConfig } from '../../toolbar/config/button/button-config';
import { ContextOfToolbar } from './context-toolbar';

export class ContextOfButton extends ContextOfToolbar {
  button: ButtonConfig;
}


export function isContextOfButton(thing: TypeTbD): thing is ContextOfButton {
  const maybeButton = thing as ContextOfButton;
  return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}

