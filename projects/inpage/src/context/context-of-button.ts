import { ButtonConfig } from '../toolbar/button/button-config';
import { ContextOfToolbar } from './context-of-toolbar';

export class ContextOfButton extends ContextOfToolbar {
  button: ButtonConfig;
}




export function isContextOfButton(thing: any): thing is ContextOfButton {
  const maybeButton = thing as ContextOfButton;
  return maybeButton.button !== undefined && maybeButton.tenant !== undefined;
}

