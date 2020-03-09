import { ContextOfButton } from '../../context/context-of-button';
import { oldParametersAdapter } from '../adapters/old-parameters-adapter';
import { addClasses } from './render-helpers';

/**
 * generate the html for a button
 * @param sxc instance sxc
 * @param buttonConfig
 * @param groupIndex group-index in which the button is shown
 */
export function renderButton(context: ContextOfButton, groupIndex: number): HTMLElement {

  const buttonConfig = context.button;

  // retrieve configuration for this button
  const oldParamsAdapter: any = oldParametersAdapter(buttonConfig.action);

  let onclick: string = '';

  if (!buttonConfig.disabled) {
    onclick = `$2sxc(${context.instance.id}, ${context.contentBlock.id}).manage.run(${JSON.stringify(oldParamsAdapter)}, event);`;
    // onclick = `$2sxc(${context.instance.id}, ${context.contentBlock.id}).manage.run2($2sxc.context(this), ${JSON.stringify(oldParamsAdapter)}, event);`;
  }

  const button = document.createElement('a');

  if (buttonConfig.action) {
    button.classList.add(`sc-${buttonConfig.action.name}`);
  }

  button.classList.add(`group-${groupIndex}`);

  if (buttonConfig.disabled) {
    button.classList.add('disabled');
  }

  addClasses(button, buttonConfig.classes, ',');

  if (buttonConfig.dynamicClasses) {
    const dynamicClasses = buttonConfig.dynamicClasses(context);
    addClasses(button, dynamicClasses, ' ');
  }

  button.setAttribute('onclick', onclick); // serialize JavaScript because of ajax

  if (buttonConfig.title) {
    button.setAttribute('data-i18n', `[title]${buttonConfig.title(context)}`); // localization support
  }

  const box = document.createElement('div');

  const symbol = document.createElement('i');
  if (buttonConfig.icon) {
    addClasses(symbol, buttonConfig.icon(context), ' ');
  }

  symbol.setAttribute('aria-hidden', 'true');

  box.appendChild(symbol);

  button.appendChild(box);

  return button;
}
