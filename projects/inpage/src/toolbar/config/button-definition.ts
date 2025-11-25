import { AnyIdentifier, ItemUrlParameters } from '../../../../$2sxc/src';
import { CommandCode, CommandParams } from '../../commands';
import { ContextComplete } from '../../context';
import { ButtonPropGenOrValue, ButtonPropGen } from './button';
import { Note } from './Note';

/**
 * A button definition contains all the possible properties which can be defined
 * for a button. These are then used to create command structures for potential buttons.
 * @public
 */

export class ButtonDefinition {

  /** classes which will be applied to this button */
  classes: string = '';

  /** Configure the link generator before it creates the link */
  // configureLinkGenerator: (context: ContextComplete, linkGenerator: CommandLinkGenerator) => void;
  /** Replacement for configureLinkGenerator - v20.09 */
  customItems: (ctx: ContextComplete, items: AnyIdentifier[]) => AnyIdentifier[];

  tweakGeneratedUrlParameters?: (context: ContextComplete, itemUrlParameters: ItemUrlParameters) => ItemUrlParameters;

  /** The dialog name */
  dialog?: ButtonPropGenOrValue<string>;

  /** Check if full-screen, always a function */
  fullScreen?: ButtonPropGen<boolean>;

  /** Determines if the button should be disabled */
  disabled?: ButtonPropGenOrValue<boolean>;

  /** Dynamically determine classes - must always be a function */
  dynamicClasses: ButtonPropGen<string>;

  /** The icon to show in the button */
  icon?: ButtonPropGenOrValue<string>;

  /** Determine if it should use the inline window, always a function */
  inlineWindow?: ButtonPropGen<boolean> = () => false;

  /** Check if we should open a new window, always an FN */
  newWindow?: ButtonPropGen<boolean>;

  /** Method which determines if it should be shown or not */
  showCondition?: ButtonPropGen<boolean>;

  /** The title of this button which will usually be i18n keys */
  title?: ButtonPropGen<string>;

  /** Determines if this button runs in the page - affecting publishing */
  partOfPage?: ButtonPropGen<boolean>;

  /** The code to run for this button - if empty, will default to open a dialog */
  code?: CommandCode;

  /**
   * The color which could be supplied per button - new for `info`
   * New v15.04
   */
  color: ButtonPropGen<string | undefined>;

  /**
   * The tippy which could be supplied per button - new for `info`
   * v15.04
   */
  tippy: (context: ContextComplete, tag: HTMLElement) => void;

  /**
   * Additional! parameters which are used to RUN the command.
   * So it's not used when preparing a toolbar button, but only when executing
   *
   * Important: used to be called 'addParamsToLink' up to v18.03
   */
  parameters?: ButtonPropGen<CommandParams>;

  /** this is just a UI interaction, won't create data so won't need pre-flight */
  uiActionOnly: ButtonPropGen<boolean>;

  /**
   * Ability to specify notes which will be shown in the toolbar
   * @internal
   */
  notes?: ButtonPropGen<Note[]>;

  /**
   * Specify that this button should not include items in the command
   * New 18.03
   * @internal
   */
  noItems?: ButtonPropGenOrValue<boolean>;
}
