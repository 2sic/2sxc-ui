import { Operations as Operators, RuleConstants as RC, RuleParams, RuleParamsHelper } from '.';
import { HasLog, Log } from '../../core';
import { TypeValue } from '../../plumbing';
import { ToolbarButtonSettings, ToolbarSettings } from '../config';
import { TemplateConstants } from '../templates';
import { BuildSteps } from './build-steps';
import { ProcessedParams } from './rule-params-helper';
import { RuleLoadTools } from './rule-load-tools';

/**
 * Contains a rule how to add/modify a toolbar.
 * @internal
 */
export class BuildRule extends HasLog {
  //#region Rule parts
  /** The ID for this rule - often the same as the name */
  id: string;

  /** Name of the thing being added - often a command name or can be the group name */
  name: string;


  /** The build command to run */
  step: BuildSteps | string;

  /** what this rule should do */
  operator: Operators;


  /** Group name - when adding more buttons */
  group: string = TemplateConstants.NameDefault;

  /**
   * position where something is added - the group or the button
   * Note that JS preserves -0
   */
  pos: number = 0;

  //#endregion

  //#region command parts

  params?: RuleParams = {};

  /**
   * Button Rules - determines what a button should do / not do
   * Note: can also be Partial<ToolbarSettings>
   */
  ui: ToolbarButtonSettings & Partial<ToolbarSettings> = {};

  //#endregion

  //#region New #CustomContext

  context: {
    appId?: number,
    zoneId?: number,
    complete?: boolean,
  } = {};

  //#endregion

  /** WIP v20 new? */
  settings?: Record<string, unknown>;

  constructor(public ruleString: string, parentLog: Log) {
    super('Tlb.BdRule', parentLog);
    if (!ruleString) {
      this.log.add('rule is empty');
      return;
    }
    this.load(ruleString);
  }

  public static Create({ name, ui, params, pos, log }: {
      name: string;
      ui?: ToolbarButtonSettings & Partial<ToolbarSettings>,
      params?: RuleParams,
      pos?: number,
      log: Log,
  }): BuildRule {
    var rule = new BuildRule('', log);
    rule.name = name;
    rule.ui = ui ?? {};
    rule.operator = Operators.add;
    rule.setIdBasedOnOperation(rule.name);
    rule.params = params ?? {};
    if (pos)
      rule.pos = pos;
    return rule;
  }

  /** Tells if this rule will override the show settings  */
  overrideShow(): boolean | null {
    if (this.operator === Operators.remove) return false;
    if (this.operator === Operators.add) return true;
    if (this.operator === Operators.addAuto) return null;
    if (this.operator === Operators.modify)
      return this.ui?.show; // can be true/false/undefined
    return null;
  }


  private load(ruleString: string) {
    const cl = this.log.call('load', ruleString);
    const parts = RuleLoadTools.splitUrlSections(ruleString);
    if (!parts.key)
      return cl.done("no key, won't load");

    this.loadHeader(parts.key);
    if (parts.params) {
      const processed = this.loadParamsAndPrefill(parts.params);
      this.params = processed.params;
      this.context = processed.context;
      this.settings = processed.settings;
    }
    // ATM seems unused...? hash is already processed before in loadHeader
    // if (parts.ui) this.hash = this.loadDictionary(parts.ui);
    return cl.done();
  }



  private loadHeader(rule: string): void {
    const l = this.log.call('loadHeader', rule);
    const parts = RuleLoadTools.splitParamsArray(rule);
    let key = parts?.[0]?.[0] || RC.Keys.None;

    // Pick up the operation from header, but if it's not a known operator, auto-detect
    let operator = key[0];
    const knownOperatorFound = Object.values(Operators).includes(operator as Operators);
    if (!knownOperatorFound)
      operator = (key === BuildSteps.params || key === BuildSteps.settings || key === BuildSteps.toolbar)
        ? Operators.system
        : Operators.add;
    this.operator = operator as Operators;
    l.add(`name part '${key}', firstChar '${operator}'`);
    // remember the primary keyword because this determines what we're doing
    // but truncate the first char if it had an operator
    key = knownOperatorFound ? key.substring(1) : key;

    const knowStepFound = Object.values(BuildSteps).includes(key as BuildSteps);
    this.step = knowStepFound
      ? key
      : BuildSteps.button;

    this.setIdBasedOnOperation(key);

    // command name defaults to name, can be reset by load-headers
    // assumes key is something like "group=myGroup" or just "edit"
    this.name = parts?.[0]?.[1] || key;
    if (parts.length > 1)
      this.loadHeaderAndUi(key, parts.slice(1));

    return l.done();
  }

  private setIdBasedOnOperation(key: string) {
    // for system and %-change operations the id should be the name of the standard button
    // ...but if it's an add-operation, we must keep the IDs apart because various
    // properties are set at a much later time
    this.id = (this.operator === Operators.add || this.operator === Operators.addAuto)
      ? 'rndId' + Math.floor(Math.random() * 99999)
      : key;
  }

  /**
   * Load the header
   * @param forKey the key being loaded, to handle special case settings/toolbar
   * @param rest the parameters to process
   */
  private loadHeaderAndUi(forKey: string, rest: string[][]) {
    const l = this.log.call('loadHeaderParts');
    if (!rest.length)
      return l.done('nothing to load');
    const parts = RuleLoadTools.dicToArray(rest);
    // #1 pick up id & name
    if (parts.id)
      this.id = parts.id as string;
    if (parts.name)
      this.name = parts.name as string;
    // #2 pick up group
    if (typeof parts.group === 'string') {
      this.group = parts.group;
      delete parts.group;
    }
    // #3 position can be number or -number to indicate from other side
    // Note that JS preserves -0, which is kind of unique
    if (parts.pos != null)
    {
      let pos = Number(parts.pos);
      // v15.09 2023-04-06 get rid of -0 (legacy) because it causes trouble with simple int in C# APIs
      this.pos = Object.is(pos, -0)
        ? -1
        : pos;
    }

    // #4 icon is automatically kept
    // #5 show override of buttons (on buttons, must convert to bool)

    // #6 Set show if this rule is specific to this button, and not a general settings/toolbar rule
    // This ensures that an explicit show takes precedence later on
    if (forKey !== BuildSteps.settings && forKey !== BuildSteps.toolbar)
      if (typeof parts.show === 'string')
        (parts as Record<string, TypeValue>).show = parts.show === 'true';
    this.ui = parts;
    return l.return(this.ui, 'button rules');
  }

  private loadParamsAndPrefill(rule: string): ProcessedParams {
    const l = this.log.call('loadParams', rule);
    const params = RuleLoadTools.splitParamsDic(rule);
    l.data('params', params);
    const split = RuleParamsHelper.processParams(params, this.log);
    return l.return(split);
  }

}