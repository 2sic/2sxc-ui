import { Command } from '../../commands/command';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  name: string = '';
  action: ButtonAction;
  classes: string = '';
  show: boolean = null; // maybe

  constructor(action?: ButtonAction, partialConfig?: Partial<ButtonConfig>) {
    if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
      this.action = action;
      // get defaults from action commandDefinition
      Object.assign(this, action.commandDefinition.buttonConfig);
    }

    if (partialConfig) {
      Object.assign(this, partialConfig);
    }
  }

  code: (context: ContextOfButton, event: any) =>  Promise<any>; // void;
  configureCommand: (context: ContextOfButton, cmd: Command) => void;
  dialog: (context: ContextOfButton) => string;
  disabled: (context: ContextOfButton) => boolean;
  dynamicClasses: (context: ContextOfButton) => string;
  dynamicDisabled: (() => boolean) = () => false; // maybe
  fullScreen: (context: ContextOfButton) => boolean;
  icon: (context: ContextOfButton) => string;
  inlineWindow: (context: ContextOfButton) => boolean;
  newWindow: (context: ContextOfButton) => boolean;
  params: (context: ContextOfButton) => any;
  partOfPage: (context: ContextOfButton) => boolean;
  showCondition: (context: ContextOfButton) => boolean;
  title: (context: ContextOfButton) => string;
  uiActionOnly: (context: ContextOfButton) => boolean;

  [propName: string]: any;
}
