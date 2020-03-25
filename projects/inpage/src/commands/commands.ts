import { HasLog, Insights } from '../logging';
import { Button } from '../toolbar/config';
import { Command } from './command';

/** Singleton Catalog of all commands */
class CommandsManagerSingleton extends HasLog {
  private commandList: Command[] = [];
  list: HashTable<Command> = {}; // hash - table of action definitions, to be used a list()["action - name"]

  constructor() {
      super('Cmd.Catlog');
      Insights.add('system', 'command-catalog', this.log);
  }

  get = (name: string) => this.list[name]; // a specific action definition

  add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean,
      more: Partial<Button>): Command {
      const cmd = this.addDef(Command.build(name, translateKey, icon, uiOnly, partOfPage, more));
      this.log.add(`add command '${name}'`, cmd);
      return cmd;
  }

  private addDef(def: Command): Command {
    if (!this.list[def.name]) {
      // add
      this.commandList.push(def);
      this.list[def.name] = def;
    } else if (this.list[def.name] !== def) {
      // update
      this.list[def.name] = def;
    }
    return def;
  }

}

// only create the catalog once, then use that everywhere
export const Commands = new CommandsManagerSingleton();
