import { Button } from '../toolbar/config';
import { Command } from './command';

/** Singleton Catalog of all commands */
class CommandsCatalog {
  private commandList: Command[] = [];
  list: HashTable<Command> = {}; // hash - table of action definitions, to be used a list()["action - name"]
  get = (name: string) => this.list[name]; // a specific action definition

  add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean,
      more: Partial<Button>): Command {
      return this.addDef(Command.build(name, translateKey, icon, uiOnly, partOfPage, more));
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
export const Commands = new CommandsCatalog();
