import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Params } from './params';

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
  code?(context: ContextOfButton, event: any): Promise<any>;

  /**
   * command
   * @param context
   * @param cmd
   */
  configureCommand?(context: ContextOfButton, cmd: Command): void;

  /**
   * optional name of dialog, to check if it's already open
   * @param context
   */
  dialog?(context: ContextOfButton): string;

  /**
   * button is disabled
   * @param context
   */
  disabled?(context: ContextOfButton): boolean;

  /**
   * dynamic classes for button
   * @param context
   */
  dynamicClasses?(context: ContextOfButton): string;

  /**
   * open dialog in full screen
   * @param context
   */
  fullScreen?(context: ContextOfButton): boolean;

  /**
   * style of icon for button
   * @param context
   */
  icon?(context: ContextOfButton): string;

  /**
   * inline window for dialog
   * @param context
   */
  inlineWindow?(context: ContextOfButton): boolean;

  /**
   * open new window
   * @param context
   */
  newWindow?(context: ContextOfButton): boolean;

  /**
   * button parameters
   * @param context
   */
  params?(context: ContextOfButton): Params;

  /**
   * is part of page
   * @param context
   */
  partOfPage?(context: ContextOfButton): boolean;

  /**
   * dynamic show button
   * @param context
   */
  showCondition?(context: ContextOfButton): boolean;

  /**
   * title of button
   * @param context
   */
  title?(context: ContextOfButton): string;

  /**
   * is Ui action only, like more button
   * @param context
   */
  uiActionOnly?(context: ContextOfButton): boolean;
}
