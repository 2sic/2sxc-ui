import { CommandDefinition } from './command-definition';
import { Commands as Commands } from './commands';
import { Definition } from './definition';

export abstract class CommandBase {

  // quick helper so we can better debug the creation of definitions
  protected makeDef(name: string,
                    translateKey: string,
                    icon: string,
                    uiOnly: boolean,
                    partOfPage: boolean,
                    more: Definition): CommandDefinition {

    const commandDefinition = CommandDefinition.build(name, translateKey, icon, uiOnly, partOfPage, more);

    Commands.addDef(commandDefinition);
    return commandDefinition;
  }
}
