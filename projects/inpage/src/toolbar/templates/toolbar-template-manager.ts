import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateInListRight } from '.';
import { HasLog, Log } from '../../logging';
import { Obj } from '../../plumbing';

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
    this.add(/*'default',*/ ToolbarTemplateDefault);
    // CodeChange #2020-03-20#TemplateToolbarLeftUnused - if no side-effects, delete in June
    // this.add('left', ToolbarTemplateLeft);
    this.add(/*'listitem',*/ ToolbarTemplateInListRight);
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
   * Deep copy toolbar template, so it can be modified without changing the next use
   */
  copy(name: string): ToolbarTemplate {
      return Obj.DeepClone(this.list[name]); // JSON.parse(JSON.stringify(this.list[name]));
  }

  /**
   * adds a template to the list, if it doesn't exist
   */
  private add(/*name: string,*/ template: ToolbarTemplate /*, force?: boolean */) {
    this.list[template.name] = template;
  }
}
