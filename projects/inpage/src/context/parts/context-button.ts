import { ButtonConfig } from '../../toolbar/config/button/button-config';
import { ContextOfToolbar } from './context-toolbar';

export class ContextOfButton extends ContextOfToolbar {
  button: ButtonConfig;
}




export function isContextOfButton(thing: any): thing is ContextOfButton {
  const maybeButton = thing as ContextOfButton;
  return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}

