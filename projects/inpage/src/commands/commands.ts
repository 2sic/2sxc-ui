import { CommandDefinition } from './command-definition';
// import all commands here to stop optimizers from excluding code that was not called form other module
// import { Add } from './command/add';
// import { App } from './command/app';
// import { AppImport } from './command/app-import';
// import { AppResources } from './command/app-resources';
// import { AppSettings } from './command/app-settings';
// import { ContentItems } from './command/content-items';
// import { ContentType } from './command/content-type';
// import { Custom } from './command/custom';
// import { Delete } from './command/delete';
// import { Edit } from './command/edit';
// import { InstanceList } from './command/instance-list';
// import { ItemHistory } from './command/item-history';
// import { Layout } from './command/layout';
// import { Metadata } from './command/metadata';
// import { More } from './command/more';
// import { MoveDown } from './command/movedown';
// import { MoveUp } from './command/moveup';
// import { New } from './command/new';
// import { Publish } from './command/publish';
// import { Remove } from './command/remove';
// import { Replace } from './command/replace';
// import { TemplateDevelop } from './command/template-develop';
// import { TemplateQuery } from './command/template-query';
// import { TemplateSettings } from './command/template-settings';
// import { Zone } from './command/zone';
import { Definition } from './definition';

/** Singleton Catalog of all commands */
class CommandsCatalog {
  private commandList: CommandDefinition[] = [];
  list: HashTable<CommandDefinition> = {}; // hash - table of action definitions, to be used a list()["action - name"]
  get = (name: string) => this.list[name]; // a specific action definition

  add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean,
      more: Definition): CommandDefinition {
      return this.addDef(CommandDefinition.build(name, translateKey, icon, uiOnly, partOfPage, more));
  }

  addDef(def: CommandDefinition): CommandDefinition {
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
export const Commands = new CommandsCatalog(); // .getInstance();
