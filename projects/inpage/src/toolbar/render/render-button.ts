import { CommandParams } from '../../commands/command-params';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { ButtonCommand } from '../config/button-command';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';


export class RenderButton extends RenderPart {
  constructor(parent: ToolbarRenderer) { super(parent); }

  render(context: ContextBundleButton, groupIndex: number): HTMLElement {

    const buttonConfig = context.button;

    // retrieve configuration for this button
    const commandParams = ButtonCommand.normalize(buttonConfig.action);

    let onclick: string = '';

    const disabled = typeof(buttonConfig.disabled) === 'function'
      ? buttonConfig.disabled(context)
      : buttonConfig.disabled as boolean;

    if (!disabled) {
      onclick = `$2sxc(${context.instance.id}, ${context.contentBlock.id}).manage.run(${JSON.stringify(commandParams)}, event);`;
    }

    const button = document.createElement('a');

    if (buttonConfig.action) button.classList.add(`sc-${buttonConfig.action.name}`);

    button.classList.add(`group-${groupIndex}`);

    if (disabled) button.classList.add('disabled');

    this.parent.addClasses(button, buttonConfig.classes, ',');

    if (buttonConfig.dynamicClasses) {
      const dynamicClasses = buttonConfig.dynamicClasses(context);
      this.parent.addClasses(button, dynamicClasses, ' ');
    }

    button.setAttribute('onclick', onclick); // serialize JavaScript because of ajax

    if (buttonConfig.title)
      button.setAttribute('data-i18n', `[title]${buttonConfig.title(context)}`); // localization support

    const box = document.createElement('div');

    const symbol = document.createElement('i');
    if (buttonConfig.icon)
      this.parent.addClasses(symbol, buttonConfig.icon(context), ' ');

    symbol.setAttribute('aria-hidden', 'true');

    box.appendChild(symbol);

    button.appendChild(box);

    return button;
  }
}



function oldParametersAdapter(action: ButtonCommand): Partial<CommandParams> {

    const params: Partial<CommandParams> = {};

    if (action) {
      if (action.name) params.action = action.name;
      if (action.params) Object.assign(params, action.params);
    }

    return params;
  }
