import { ButtonConfiguration, ButtonPropGenOrValue, ButtonPropGen } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ButtonDefinition } from './button-definition';

/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 * @internal
 */
export class ButtonWithContext {

  constructor(private button: ButtonConfiguration, private context: ContextComplete) {
  }

  btnCommand = () => this.button.command;

  getClasses = () => this.button.overrides?.classes || this.button.definition.classes || '';

  /**
   * New v15.04 for `info`
   * @returns the color of the button, or undefined if not set
   */
  // getColor = () => getVal(this.context, this.definition.color, undefined);
  getColor = () => this.#getBestValue(def => def.color, undefined);

  /** The dialog name - should default to the name */
  getDialog = () => this.#getBestValue(def => def.dialog, this.button.command.name);

  /** Determines if the button should be disabled */
  getDisabled = () => this.#getBestValue(def => def.disabled, false);

  /** Dynamically determine classes - must always be a function */
  getDynClasses = () => this.#getBestValue(def => def.dynamicClasses, '');

  /** Check if full-screen, always a function */
  getFullScreen = () => this.#getBestValue(def => def.fullScreen, false);

  /** The icon to show in the button */
  getIcon = () => this.#getBestValue(def => def.icon, '');

  /** Determine if it should use the inline window, always a function */
  getInlineWindow = () => this.#getBestValue(def => def.inlineWindow, false);

  /** Check if we should open a new window, always an FN */
  getNewWindow = () => this.#getBestValue(def => def.newWindow, false);

  /** The parameters which are used to run the command */
  getParameters = () => this.#getBestValue(def => def.parameters, {});

  /** Determines if this button runs in the page - affecting publishing */
  getPartOfPage = () => this.#getBestValue(def => def.partOfPage, false);

  /** Method which determines if it should be shown or not */
  getShowCondition = () => this.#getBestValue(def => def.showCondition, true);

  getTippy = (context: ContextComplete, tag: HTMLElement) => this.button.definition.tippy?.(context, tag);

  /** The title of this button which will usually be i18n keys */
  getTitle = () => this.#getBestValue(def => def.title, 'unknown-title');

  /** this is just a UI interaction, won't create data so won't need pre-flight */
  getUiActionOnly = () => this.#getBestValue(def => def.uiActionOnly, true);

  /** Don't add items-info to the link, new v18.03 */
  getSkipAutoAddItems = () => this.#getBestValue(def => def.noItems, false);

  #getBestValue<T>(select: (x: Partial<ButtonDefinition>) => ButtonPropGenOrValue<T>, fallback: T): T {
    if (this.button.overrides) {
      const propOrGenerator = select(this.button.overrides);
      if (propOrGenerator !== undefined)
        return getVal(this.context, propOrGenerator, fallback);
    }
    return getVal(this.context, select(this.button.definition), fallback);
  }
}



/** Evaluate a property or generator and return the property */
function getVal<T>(context: ContextComplete, propOrGen: ButtonPropGen<T> | T, fallback: T): T {
  if (propOrGen == null)
    return fallback;
  const result = isPropGen(propOrGen)
    ? propOrGen(context)
    : propOrGen;
  return result === undefined ? fallback : result;
}

function isPropGen<T>(thing: ButtonPropGenOrValue<T>): thing is ButtonPropGen<T> {
  return typeof thing === 'function';
}