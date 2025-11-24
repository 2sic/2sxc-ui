import { Button, ButtonPropGen } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';

/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 * @internal
 */
export class ButtonSafe {

  constructor(private button: Button, private context: ContextComplete) {
  }

  btnCommand = () => this.button.command;

  classes = () => this.button.classes || '';

  /**
   * New v15.04 for `info`
   * @returns the color of the button, or undefined if not set
   */
  colorSafe = () => this.getVal(this.button.color, undefined);

  /** The dialog name - should default to the name */
  dialogSafe = () => this.getVal(this.button.dialog, this.button.command.name);

  /** Determines if the button should be disabled */
  disabledSafe = () => this.getVal(this.button.disabled, false);

  /** Dynamically determine classes - must always be a function */
  dynClassesSafe = () => this.getVal(this.button.dynamicClasses, '');

  /** Check if full-screen, always a function */
  fullScreenSafe = () => this.getVal(this.button.fullScreen, false);

  /** The icon to show in the button */
  iconSafe = () => this.getVal(this.button.icon, '');

  /** Determine if it should use the inline window, always a function */
  inlineWindowSafe = () => this.getVal(this.button.inlineWindow, false);

  /** Check if we should open a new window, always an FN */
  newWindowSafe = () => this.getVal(this.button.newWindow, false);

  /** The parameters which are used to run the command */
  parametersSafe = () => this.getVal(this.button.parameters, {});

  /** Determines if this button runs in the page - affecting publishing */
  partOfPageSafe = () => this.getVal(this.button.partOfPage, false);

  /** Method which determines if it should be shown or not */
  showConditionSafe = () => this.getVal(this.button.showCondition, true);

  tippySafe = (context: ContextComplete, tag: HTMLElement) => this.button.tippy?.(context, tag);

  /** The title of this button which will usually be i18n keys */
  titleSafe = () => this.getVal(this.button.title, 'unknown-title');

  /** this is just a UI interaction, won't create data so won't need pre-flight */
  uiActionOnlySafe = () => this.getVal(this.button.uiActionOnly, true);

  /** Don't add items-info to the link, new v18.03 */
  skipAutoAddItemsSafe = () => this.getVal(this.button.noItems, false);


  /** Evaluate a property or generator and return the property */
  getVal<T>(propOrGen: ButtonPropGen<T> | T, fallback: T): T {
    if (propOrGen == null)
      return fallback;
    const result = Button.isPropGen(propOrGen)
      ? propOrGen(this.context)
      : propOrGen;
    return result === undefined ? fallback : result;
  }
}


