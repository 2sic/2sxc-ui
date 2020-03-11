import { CommandCode } from '../../../commands/command-code';
import { CommandExecution } from '../../../commands/execute/command-execution';
import { ContextBundleButton } from '../../../context/bundles/context-bundle-button';
import { DictionaryValue } from '../../../plumbing/TypeTbD';
import { ButtonCommand } from '../../button/button-command';

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
  configureCommand: (context: ContextBundleButton, cmd: CommandExecution) => void;
  dialog: (context: ContextBundleButton) => string;
  disabled: (context: ContextBundleButton) => boolean;
  dynamicClasses: (context: ContextBundleButton) => string;
  dynamicDisabled: (() => boolean) = () => false; // maybe
  fullScreen: (context: ContextBundleButton) => boolean;
  icon: (context: ContextBundleButton) => string;
  inlineWindow: (context: ContextBundleButton) => boolean;
  newWindow: (context: ContextBundleButton) => boolean;
  params: (context: ContextBundleButton) => DictionaryValue;
  partOfPage: (context: ContextBundleButton) => boolean;
  showCondition: (context: ContextBundleButton) => boolean;
  title: (context: ContextBundleButton) => string;
  uiActionOnly: (context: ContextBundleButton) => boolean;
}
