import { getButtonConfigDefaultsV1 } from '../toolbar/button/expand-button-config';
import { CommandDefinition } from './command-definition';
import { Commands } from './commands';
import { Definition } from './definition';

export abstract class CommandBase {

  commandDefinition = new CommandDefinition();

  // quick helper so we can better debug the creation of definitions
  protected makeDef(name: string,
                    translateKey: string,
                    icon: string,
                    uiOnly: boolean,
                    partOfPage: boolean,
                    more: Definition): void {
    if (typeof (partOfPage) !== 'boolean') {
      throw 'partOfPage in commands not provided, order will be wrong!';
    }

    // Toolbar API v2
    this.commandDefinition.name = name;
    this.commandDefinition.buttonConfig = getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more);

    this.registerInCatalog();
  }

  /** register new CommandDefinition with in Commands */
  protected registerInCatalog() {
    Commands.getInstance().addDef(this.commandDefinition);
  }
}
