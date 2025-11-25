import { ButtonConfiguration, ButtonPropGen } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ButtonDefinition } from './button-definition';

/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 * @internal
 */
export class ButtonSafe {

  private btnDef: Partial<ButtonDefinition>;

  constructor(private button: ButtonConfiguration, private context: ContextComplete) {
    this.btnDef = button.definition || {};
  }

  btnCommand = () => this.button.command;

  classes = () => this.btnDef.classes || '';

  /**
   * New v15.04 for `info`
   * @returns the color of the button, or undefined if not set
   */
  colorSafe = () => this.getVal(this.btnDef.color, undefined);

  /** The dialog name - should default to the name */
  dialogSafe = () => this.getVal(this.btnDef.dialog, this.button.command.name);

  /** Determines if the button should be disabled */
  disabledSafe = () => this.getVal(this.btnDef.disabled, false);

  /** Dynamically determine classes - must always be a function */
  dynClassesSafe = () => this.getVal(this.btnDef.dynamicClasses, '');

  /** Check if full-screen, always a function */
  fullScreenSafe = () => this.getVal(this.btnDef.fullScreen, false);

  /** The icon to show in the button */
  iconSafe = () => this.getVal(this.btnDef.icon, '');

  /** Determine if it should use the inline window, always a function */
  inlineWindowSafe = () => this.getVal(this.btnDef.inlineWindow, false);

  /** Check if we should open a new window, always an FN */
  newWindowSafe = () => this.getVal(this.btnDef.newWindow, false);

  /** The parameters which are used to run the command */
  parametersSafe = () => this.getVal(this.btnDef.parameters, {});

  /** Determines if this button runs in the page - affecting publishing */
  partOfPageSafe = () => this.getVal(this.btnDef.partOfPage, false);

  /** Method which determines if it should be shown or not */
  showConditionSafe = () => this.getVal(this.btnDef.showCondition, true);

  tippySafe = (context: ContextComplete, tag: HTMLElement) => this.btnDef.tippy?.(context, tag);

  /** The title of this button which will usually be i18n keys */
  titleSafe = () => this.getVal(this.btnDef.title, 'unknown-title');

  /** this is just a UI interaction, won't create data so won't need pre-flight */
  uiActionOnlySafe = () => this.getVal(this.btnDef.uiActionOnly, true);

  /** Don't add items-info to the link, new v18.03 */
  skipAutoAddItemsSafe = () => this.getVal(this.btnDef.noItems, false);


  /** Evaluate a property or generator and return the property */
  getVal<T>(propOrGen: ButtonPropGen<T> | T, fallback: T): T {
    if (propOrGen == null)
      return fallback;
    const result = ButtonConfiguration.isPropGen(propOrGen)
      ? propOrGen(this.context)
      : propOrGen;
    return result === undefined ? fallback : result;
  }
}


