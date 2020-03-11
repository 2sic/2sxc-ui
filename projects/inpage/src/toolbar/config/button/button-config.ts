import { CommandExecution } from '../../../commands/execute/command-execution';
import { ContextOfButton } from '../../../context/parts/context-button';
import { ButtonCommand } from '../../button/button-command';
import { CommandCode } from '../../../commands/command-code';

export class ButtonConfig {
  name: string = '';
  action: ButtonCommand;
  classes: string = '';
  show: boolean = null; // maybe

  constructor(action?: ButtonCommand, partialConfig?: Partial<ButtonConfig>) {
    if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
      this.action = action;
      // get defaults from action commandDefinition
      Object.assign(this, action.commandDefinition.buttonConfig);
    }

    if (partialConfig) {
      Object.assign(this, partialConfig);
    }
  }

  code: CommandCode; // void;
  configureCommand: (context: ContextOfButton, cmd: CommandExecution) => void;
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
