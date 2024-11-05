import { HasLog, Insights } from '../core';
import { Button } from '../toolbar/config';
import { Command } from './command';

/**
 * Singleton Catalog of all commands
 * @internal
 */
export class Commands extends HasLog {

  /** Singleton */
  public static singleton(): Commands {
    return this.#singleton ?? (this.#singleton = new Commands());
  }
  static #singleton: Commands;

  public static add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): Command {
    return this.singleton().add(name, translateKey, icon, uiOnly, partOfPage, more);
  }

  public static addCommand(command: Command): void {
    return this.singleton().addCommand(command);
  }

  #all: Command[] = [];
  list: Record<string, Command> = {}; // hash - table of action definitions, to be used a list()["action - name"]

  private constructor() {
    super('Cmd.Catlog');
    Insights.add('system', 'command-catalog', this.log);
  }

  get = (name: string) => this.list[name]; // a specific action definition

  add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): Command {
    const cmd = this.#add(Command.build(name, translateKey, icon, uiOnly, partOfPage, more));
    this.log.add(`add command '${name}'`, cmd);
    return cmd;
  }

  addCommand(command: Command): void {
    const cmd = this.#add(command);
    this.log.add(`add command '${cmd.name}'`, cmd);
  }


  #add(def: Command): Command {
    if (!this.list[def.name]) {
      // add
      this.#all.push(def);
      this.list[def.name] = def;
    } else if (this.list[def.name] !== def) {
      // update
      this.list[def.name] = def;
    }
    return def;
  }

}
