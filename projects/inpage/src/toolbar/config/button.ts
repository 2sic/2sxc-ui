import { CommandWithParams } from '.';
import { AnyIdentifier, ItemUrlParameters } from '../../../../$2sxc/src/cms/item-identifiers';
import { CommandNames, CommandParams } from '../../commands';
import { CommandCode } from '../../commands/command-code';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Note } from './Note';

/**
 * This is the most common call signature on most ButtonConfig properties
 * @public
 */
export type ButtonPropGen<T> = (context: ContextComplete) => T;

type ButtonGenOrProp<T> = ButtonPropGen<T> | T;

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
  dialog?: ButtonGenOrProp<string>;

  /** Check if full-screen, always a function */
  fullScreen?: ButtonPropGen<boolean>;

  /** Determines if the button should be disabled */
  disabled?: ButtonGenOrProp<boolean>;

  /** Dynamically determine classes - must always be a function */
  dynamicClasses: ButtonPropGen<string>;

  /** The icon to show in the button */
  icon?: ButtonGenOrProp<string>;

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
  noItems?: ButtonGenOrProp<boolean>;
}

/**
 * The real button configuration as it's used at runtime.
 * It identifies the button by an ID, has the command to run, and
 * gets defaults from the command definition.
 * @internal
 */
export class ButtonConfiguration {
  /** The ID is important for tracking this button and applying modifiers */
  id: string;

  /** The underlying command which will be run */
  command: CommandWithParams;

  definition: Partial<ButtonDefinition>;

  constructor(command: CommandWithParams, name: string) {
    // super();
    this.command = command;
    // if the name is an identifier like "someId=add", split it; note: as of 2025-11 2dm is not sure when this would be used
    const parts = ButtonConfiguration.splitName(name);
    this.id = parts.id;

    this.definition = command.commandDef?.buttonDefaults || {};
  }

  static splitName(identifier: string): { id: string, name: CommandNames } {
    const parts = identifier.split('=');
    return { id: parts[0], name: (parts[1] || identifier) as CommandNames};
  }

  /** Detect if this is a Button */
  static is(thing: unknown): thing is ButtonConfiguration {
    return (thing as ButtonConfiguration).command !== undefined;
  }

  static isButtonArray(thing: unknown): thing is ButtonConfiguration[] {
    return (thing as ButtonConfiguration[]).length && ButtonConfiguration.is((thing as ButtonConfiguration[])[0]);
  }

  static isPropGen<T>(thing: ButtonGenOrProp<T>): thing is ButtonPropGen<T> {
    return typeof thing === 'function';
  }
}

