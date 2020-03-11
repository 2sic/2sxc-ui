import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { CommandCode } from './command-code';
import { CommandExecution } from './execute/command-execution';
import { CommandParams } from './params';

/**
 * Command definition, for creation of commands
 */
export class Definition {
  /**
   * name of Action
   */
  name?: string;

  /**
   * custom code
   * @param context
   */
  code?: CommandCode; // <T>(context: ContextOfButton, event: MouseEvent): Promise<void | T>;

  /**
   * command
   * @param context
   * @param cmd
   */
  configureCommand?(context: ContextBundleButton, cmd: CommandExecution): void;

  /**
   * optional name of dialog, to check if it's already open
   * @param context
   */
  dialog?(context: ContextBundleButton): string;

  /**
   * button is disabled
   * @param context
   */
  disabled?(context: ContextBundleButton): boolean;

  /**
   * dynamic classes for button
   * @param context
   */
  dynamicClasses?(context: ContextBundleButton): string;

  /**
   * open dialog in full screen
   * @param context
   */
  fullScreen?(context: ContextBundleButton): boolean;

  /**
   * style of icon for button
   * @param context
   */
  icon?(context: ContextBundleButton): string;

  /**
   * inline window for dialog
   * @param context
   */
  inlineWindow?(context: ContextBundleButton): boolean;

  /**
   * open new window
   * @param context
   */
  newWindow?(context: ContextBundleButton): boolean;

  /**
   * button parameters
   * @param context
   */
  params?(context: ContextBundleButton): Partial<CommandParams>;

  /**
   * is part of page
   * @param context
   */
  partOfPage?(context: ContextBundleButton): boolean;

  /**
   * dynamic show button
   * @param context
   */
  showCondition?(context: ContextBundleButton): boolean;

  /**
   * title of button
   * @param context
   */
  title?(context: ContextBundleButton): string;

  /**
   * is Ui action only, like more button
   * @param context
   */
  uiActionOnly?(context: ContextBundleButton): boolean;
}
