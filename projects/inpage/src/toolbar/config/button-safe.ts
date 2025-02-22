import { Button, ButtonPropGen } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';

/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 * @internal
 */
export class ButtonSafe {

  constructor(private button: Button, private context: ContextComplete) { }

  action = () => this.button.command;

  classes = () => this.button.classes || '';

  /**
   * New v15.04 for `info`
   * @returns the color of the button, or undefined if not set
   */
  color = () => getVal(this.button.color, this.context, undefined);

  /** The dialog name - should default to the name */
  dialog = () => getVal(this.button.dialog, this.context, this.button.command.name);

  /** Determines if the button should be disabled */
  disabled = () => getVal(this.button.disabled, this.context, false);

  /** Dynamically determine classes - must always be a function */
  dynamicClasses = () => getVal(this.button.dynamicClasses, this.context, '');

  /** Check if full-screen, always a function */
  fullScreen = () => getVal(this.button.fullScreen, this.context, false);

  /** The icon to show in the button */
  icon = () => getVal(this.button.icon, this.context, '');

  /** Determine if it should use the inline window, always a function */
  inlineWindow = () => getVal(this.button.inlineWindow, this.context, false);

  /** Check if we should open a new window, always an FN */
  newWindow = () => getVal(this.button.newWindow, this.context, false);

  /** The parameters which are used to run the command */
  parameters = () => getVal(this.button.parameters, this.context, {});

  /** Determines if this button runs in the page - affecting publishing */
  partOfPage = () => getVal(this.button.partOfPage, this.context, false);

  /** Method which determines if it should be shown or not */
  showCondition = () => getVal(this.button.showCondition, this.context, true);

  tippy = (context: ContextComplete, tag: HTMLElement) => this.button.tippy?.(context, tag);

  /** The title of this button which will usually be i18n keys */
  title = () => getVal(this.button.title, this.context, 'unknown-title');

  /** this is just a UI interaction, won't create data so won't need pre-flight */
  uiActionOnly = () => getVal(this.button.uiActionOnly, this.context, true);

  /** Don't add items-info to the link, new v18.03 */
  noItems = () => getVal(this.button.noItems, this.context, false);
}


/** Evaluate a property or generator and return the property */
function getVal<T>(propOrGen: ButtonPropGen<T> | T, ctx: ContextComplete, fallback: T): T {
  if (propOrGen == null)
    return fallback;
  const result = Button.isPropGen(propOrGen)
    ? propOrGen(ctx)
    : propOrGen;
  return result === undefined ? fallback : result;
}
