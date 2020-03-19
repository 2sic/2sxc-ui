import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';
import { defaultToolbarTemplate } from './template-default';
import { leftToolbarTemplate } from './template-left';
import { ToolbarTemplate } from './toolbar-template-toolbar';

/**
 * The template manager provides toolbar templates to the entire system.
 * It basically keeps a list of predefined templates, and returns the ones needed
 */
export class ToolbarTemplateManager extends HasLog {
  configTemplateList: ToolbarTemplate[] = [];

  /** hash - table of templates, to be used a list()['template - name'] */
  list: HashTable<ToolbarTemplate> = {};

  private constructor(parentLog: Log) {
    super('Tlb.TmpMan', parentLog, 'build');
    this.add('default', defaultToolbarTemplate);
    this.add('left', leftToolbarTemplate);
  }

  public static Instance(parentLog: Log): ToolbarTemplateManager {
    // check if an instance of the class is already created
    if (this.singleton == null) {
      // If not created create an instance of the class
      // store the instance in the variable
      this.singleton = new ToolbarTemplateManager(parentLog);
    }
    // return the singleton object
    return this.singleton;
  }
  private static singleton: ToolbarTemplateManager = null; // A variable which stores the singleton object. Initially, the variable acts like a placeholder

  /**
   * a single template – usually 'default'
   */
  get(name: string): ToolbarTemplate {
    return this.list[name];
  }

  /**
   * adds a template to the list, if it doesn't exist
   */
  add(name: string, template: ToolbarTemplate, force?: boolean) {
    this.list[name] = template;
  }
}
