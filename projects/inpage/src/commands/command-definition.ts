import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { ButtonConfig } from '../toolbar/config/button/button-config';
import { Definition } from './definition';

export class CommandDefinition {
  constructor(public name: string) {
  }

  buttonConfig: Partial<ButtonConfig>;

  protected merge(icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Definition>): void {
    //
    // stv: v1 code
    const partialButtonConfig = {
    icon: (context: ContextBundleButton) => `icon-sxc-${icon}`,
    title: (context: ContextBundleButton) => `Toolbar.${translateKey}`,
    uiActionOnly: (context: ContextBundleButton) => uiOnly,
    partOfPage: (context: ContextBundleButton) => partOfPage,
    } as Partial<ButtonConfig>;

    Object.assign(partialButtonConfig, more);

    this.buttonConfig = partialButtonConfig;
  }

  static build(name: string,
               translateKey: string,
               icon: string,
               uiOnly: boolean,
               partOfPage: boolean,
               more: Definition): CommandDefinition {

    if (typeof (partOfPage) !== 'boolean') {
      throw 'partOfPage in commands not provided, order will be wrong!';
    }

    const commandDefinition = new CommandDefinition(name);

    // Toolbar API v2
    // this.commandDefinition.name = name;
    commandDefinition.merge(icon, translateKey, uiOnly, partOfPage, more);

    return commandDefinition;
  }
}
