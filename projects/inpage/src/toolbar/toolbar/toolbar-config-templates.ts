import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';
import { defaultToolbarTemplate } from './templates/default-toolbar-template';
import { leftToolbarTemplate } from './templates/left-toolbar-template';
import { ToolbarConfigTemplate } from './toolbar-config-template';

export class ToolbarConfigTemplates extends HasLog {
  private static singleton: ToolbarConfigTemplates = null; // A variable which stores the singleton object. Initially, the variable acts like a placeholder
  configTemplateList: ToolbarConfigTemplate[] = [];
  list: HashTable<ToolbarConfigTemplate> = {}; // hash - table of templates, to be used a list()['template - name']
  private constructor(parentLog: Log) {
    super('Tlb.TmpMan', parentLog, 'build');
    this.add('default', defaultToolbarTemplate);
    this.add('left', leftToolbarTemplate);
  }

  public static Instance(parentLog: Log): ToolbarConfigTemplates {
    // check if an instance of the class is already created
    if (this.singleton == null) {
      // If not created create an instance of the class
      // store the instance in the variable
      this.singleton = new ToolbarConfigTemplates(parentLog);
    }
    // return the singleton object
    return this.singleton;
  }

  // a single template – usually 'default'
  get(name: string): ToolbarConfigTemplate {
    return this.list[name];
  }

  // adds a config to the list, if it doesn't exist
  add(name: string, template: ToolbarConfigTemplate, force?: boolean) {
    this.list[name] = template;
  }
}
