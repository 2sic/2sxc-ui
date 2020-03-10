import { ContextOfButton } from '../context/context-of-button';
import { ButtonConfig } from '../toolbar/button/button-config';
import { Definition } from './definition';

export class CommandDefinition {
  constructor(public name: string) {
  }

  buttonConfig: Partial<ButtonConfig>;

  protected setConfig(icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Definition>): void {
    //
    // stv: v1 code
    const partialButtonConfig = {
    icon: (context: ContextOfButton) => `icon-sxc-${icon}`,
    title: (context: ContextOfButton) => `Toolbar.${translateKey}`,
    uiActionOnly: (context: ContextOfButton) => uiOnly,
    partOfPage: (context: ContextOfButton) => partOfPage,
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
    commandDefinition.setConfig(icon, translateKey, uiOnly, partOfPage, more);

    return commandDefinition;
  }
}
