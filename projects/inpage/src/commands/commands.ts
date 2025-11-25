import { HasLog, Insights } from '../core';
import { ButtonDefinition } from '../toolbar/config/button-definition';
import { CommandDefinition } from './command';

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

  public static add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): CommandDefinition {
    return this.singleton().add(name, translateKey, icon, uiOnly, partOfPage, more);
  }

  public static addCommand(command: CommandDefinition): void {
    return this.singleton().addCommand(command);
  }

  #all: CommandDefinition[] = [];
  list: Record<string, CommandDefinition> = {}; // hash - table of action definitions, to be used a list()["action - name"]

  private constructor() {
    super('Cmd.Catlog');
    Insights.add('system', 'command-catalog', this.log);
  }

  get = (name: string) => this.list[name]; // a specific action definition

  add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): CommandDefinition {
    const cmd = this.#add(CommandDefinition.build(name, translateKey, icon, uiOnly, partOfPage, more));
    this.log.add(`add command '${name}'`, cmd);
    return cmd;
  }

  addCommand(command: CommandDefinition): void {
    const cmd = this.#add(command);
    this.log.add(`add command '${cmd.name}'`, cmd);
  }


  #add(def: CommandDefinition): CommandDefinition {
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
