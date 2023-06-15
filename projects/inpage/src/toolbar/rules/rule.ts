import { Operations as Operators, RuleConstants as RC, RuleParams, RuleParamsHelper } from '.';
import { prefixBase64, prefixJson64 } from '../../constants/rules';
import { HasLog, Log } from '../../core';
import { TypeValue } from '../../plumbing';
import { ToolbarButtonSettings, ToolbarSettings } from '../config';
import { TemplateConstants } from '../templates';
import { BuildSteps } from './build-steps';
import { ProcessedParams } from './rule-params-helper';

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

  /** ATM unused url-part after the hash - will probably be needed in future */
  // private hash: Dictionary<string> = {};

  //#endregion

  //#region New #CustomContext

  context: {
    appId?: number,
    zoneId?: number,
    complete?: boolean,
  } = {};
  //#endregion

  constructor(public ruleString: string, parentLog: Log) {
    super('Tlb.BdRule', parentLog);
    if (!ruleString) {
      this.log.add('rule is empty');
      return;
    }
    this.load();
  }

  public static Create({ name, ui, params, pos, log }: { name: string; ui: ToolbarButtonSettings & Partial<ToolbarSettings>; params: RuleParams, pos?: number, log: Log; }): BuildRule {
    var rule = new BuildRule('', log);
    rule.name = name;
    rule.ui = ui;
    rule.operator = Operators.add;
    rule.setIdBasedOnOperation(rule.name);
    rule.params = params;
    if (pos) rule.pos = pos;
    return rule;
  }

  /** Tells if this rule will override the show settings  */
  overrideShow(): boolean | undefined {
    if (this.operator === Operators.remove) return false;
    if (this.operator === Operators.add) return true;
    if (this.operator === Operators.addAuto) return undefined;
    if (this.operator === Operators.modify)
      return this.ui?.show; // can be true/false/undefined
    return undefined;
  }


  private load() {
    const cl = this.log.call('load', this.ruleString);
    const parts = splitUrlSections(this.ruleString);
    if (!parts.key) return cl.done("no key, won't load");

    this.loadHeader(parts.key);
    if (parts.params) {
      const processed = this.loadParamsAndPrefill(parts.params);
      this.params = processed.params;
      this.context = processed.context;
    }
    // ATM seems unused...? hash is already processed before in loadHeader
    // if (parts.ui) this.hash = this.loadDictionary(parts.ui);
    return cl.done();
  }



  private loadHeader(rule: string): void {
    const cl = this.log.call('loadHeader', rule);
    const parts = this.splitParamsArray(rule);
    let key = parts?.[0]?.[0] || RC.Keys.None;

    // Pick up the operation from header, but if it's not a known operator, auto-detect
    let operator = key[0];
    const knownOperatorFound = Object.values(Operators).includes(operator as Operators);
    if (!knownOperatorFound)
      operator = (key === BuildSteps.params || key === BuildSteps.settings || key === BuildSteps.toolbar)
        ? Operators.system
        : Operators.add;
    this.operator = operator as Operators;
    cl.add(`name part '${key}', firstChar '${operator}'`);
    // remember the primary keyword because this determines what we're doing
    // but truncate the first char if it had an operator
    key = knownOperatorFound ? key.substring(1) : key;

    const knowStepFound = Object.values(BuildSteps).includes(key as BuildSteps);
    this.step = knowStepFound ? key : BuildSteps.button;

    this.setIdBasedOnOperation(key);

    // command name defaults to name, can be reset by load-headers
    // assumes key is something like "group=myGroup" or just "edit"
    this.name = parts?.[0]?.[1] || key;
    if (parts.length > 1) this.leadHeaderAndUi(key, parts.slice(1));

    return cl.done();
  }

  public setIdBasedOnOperation(key: string) {
    // for system and %-change operations the id should be the name of the standard button
    // ...but if it's an add-operation, we must keep the IDs appart because various
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
  private leadHeaderAndUi(forKey: string, rest: string[][]) {
    const cl = this.log.call('loadHeaderParts');
    if (!rest.length) return cl.done('nothing to load');
    const parts = this.dicToArray(rest);
    // #1 pick up id & name
    if (parts.id) this.id = parts.id as string;
    if (parts.name) this.name = parts.name as string;
    // #2 pick up group
    if (typeof parts.group === 'string') {
      this.group = parts.group;
      delete parts.group;
    }
    // #3 position can be number or -number to indicate from other side
    // Note that JS preserves -0, which is kind of unique
    if (parts.pos != null)
    {
      this.pos = Number(parts.pos);
      // v15.09 2023-04-06 get rid of -0 (legacy) because it causes trouble with simple int in C# APIs
      if (Object.is(this.pos, -0)) this.pos = -1;
    }

    // #4 icon is automatically kept
    // #5 show override of buttons (on buttons, must convert to bool)
    if (forKey !== BuildSteps.settings && forKey !== BuildSteps.toolbar)
    if (typeof parts.show === 'string')
      (parts as Record<string, TypeValue>).show = parts.show === 'true';
    this.ui = parts;
    return cl.return(this.ui, 'button rules');
  }

  private loadParamsAndPrefill(rule: string): ProcessedParams {
    const cl = this.log.call('loadParams', rule);
    const parms = this.splitParamsDic(rule);
    cl.data('params', parms);
    const split = RuleParamsHelper.processParams(parms, this.log);
    return cl.return(split);
  }

  // private loadDictionary(original: string): Dictionary<string> {
  //     const cl = this.log.call('loadHash', original);
  //     const parts = this.splitParamsDic(original);
  //     cl.data('button', parts);
  //     return cl.return(parts);
  // }

  //#region string manipulation helpers

  private dicToArray(original: string[][]): Record<string, string> {
    return original.reduce((map, obj) => {
      map[obj[0]] = obj[1];
      return map;
    }, {} as Record<string, string>);
  }

  private splitParamsDic(original: string): Record<string, string> {
    return this.dicToArray(this.splitParamsArray(original));
  }

  private splitParamsArray(original: string): string[][] {
    if (!original) return [];
    const split1 = original.split('&');
    const split2 = split1.map((p) => {
      let i = p.indexOf('=');
      if (i < 0) i = p.length;
      const keyValues = [p.slice(0,i), p.slice(i+1)];
      // 2022-08-15 2dm before - would have lost cases where '=' occurs in the value a few times
      // const keyValues = p.split('=');
      const key = keyValues[0];
      let val: any = keyValues[1];
      // disabled, don't see a use case for this
      // check if the value had '=' - then re-join
      // if (keyValues.length > 1)
      //     val = keyValues.slice(1).join('=');

      // fix url encoding
      if (val?.indexOf('%') > -1) val = decodeURIComponent(val);
      // fix C# typed true/false or string representations
      if (val === 'True' || val === 'true') return [key, true];
      if (val === 'False' || val === 'false') return [key, false];

      // cast numbers to proper number objects
      if (!isNaN(+val)) return [key, Number(val)];

      // revert base64 encoding
      if (typeof(val) === 'string' && val.startsWith(prefixBase64)) {
        const afterPrefix = val.split(prefixBase64)[1];
        return [key, window.atob(afterPrefix)];
      }

      if (typeof(val) === 'string' && val.startsWith(prefixJson64)) {
        const afterPrefix = val.split(prefixJson64)[1];
        return [key, JSON.parse(window.atob(afterPrefix))];
      }

      return [key, val];
    });
    return split2;
  }


  //#endregion
}




function splitUrlSections(str: string): { key: string, params: string, button: string } | undefined {
  // dev link: https://regex101.com/r/vK4rV7/519
  // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

  const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
  // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
  const m = regex.exec(str);

  if (m && m !== null)
    return { key: m[1], params: m[4], button: m[6] };
  return undefined;
}

// #CustomContext
// /**
//  * Will take a UI definition and extract the context if available
//  * @param ui original value before split
//  * @returns 
//  */
// function splitUiParts(ui: string): [string, string] {
//   if (!ui) return [null, null];

//   // If it starts with ## then the original value only had the context
//   // In this case the first # of the three ### was already removed
//   if (ui.startsWith('##')) return [null, ui.substring(2)];

//   const parts = ui.split('###');
//   return [parts[0], parts.length > 1 ? parts[1] : null];
// }
