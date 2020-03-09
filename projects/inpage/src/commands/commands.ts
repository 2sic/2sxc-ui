import { CommandDefinition } from './command-definition';
//import { instanceEngine } from './instance-engine';

// import all commands here to stop optimizers from excluding code that was not called form other module
import { Add } from './command/add';
import { App } from './command/app';
import { AppImport } from './command/app-import';
import { AppResources } from './command/app-resources';
import { AppSettings } from './command/app-settings';
import { ContentItems } from './command/content-items';
import { ContentType } from './command/content-type';
import { Custom } from './command/custom';
import { Delete } from './command/delete';
import { Edit } from './command/edit';
import { InstanceList } from './command/instance-list';
import { ItemHistory } from './command/item-history';
import { Layout } from './command/layout';
import { Metadata } from './command/metadata';
import { More } from './command/more';
import { MoveDown } from './command/movedown';
import { MoveUp } from './command/moveup';
import { New } from './command/new';
import { Publish } from './command/publish';
import { Remove } from './command/remove';
import { Replace } from './command/replace';
import { TemplateDevelop } from './command/template-develop';
import { TemplateQuery } from './command/template-query';
import { TemplateSettings } from './command/template-settings';
import { Zone } from './command/zone';

export class Commands {

  private static instance: Commands;

  commandList: CommandDefinition[] = [];
  list: HashTable<CommandDefinition> = {}; // hash - table of action definitions, to be used a list()["action - name"]
  get = (name: string) => this.list[name]; // a specific action definition

  private constructor() { }

  static getInstance() {
    if (!Commands.instance) {
      Commands.instance = new Commands();
    }
    return Commands.instance;
  }

  public addDef = (def: CommandDefinition): void => {
    if (!this.list[def.name]) {
      // add
      this.commandList.push(def);
      this.list[def.name] = def;
    } else if (this.list[def.name] !== def) {
      // update
      this.list[def.name] = def;
    }
  }

  // 2dm disabled, unclear what this would be for
  // todo q2stv - do we need this?
  //instanceEngine = instanceEngine;

}
