import { Operations as OP, BuildRule } from '.';
import { CommandNames } from '../../commands';
import { Debug } from '../../constants/debug';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { ToolbarConfigLoader } from '../config-loaders';
import { Note } from '../config/Note';
import { BuildSteps } from './build-steps';
import { addStandardObsoleteButtons } from './rules-obsolete-code';

const debug = Debug.parts.RuleManager;

const throwOnError = true;
const devInfoButtonsIndex = 20;

/**
 * @internal
 */
export class RuleManager extends HasLog {
  /** List of rules which were picked up and will be applied */
  rules: BuildRule[] = [];

  ruleManagerId = Math.floor(Math.random() * 99999);

  /** Basic constructor, must be called from a ToolbarConfigLoader */
  constructor(parent: ToolbarConfigLoader) {
    super('Tlb.RlMngr', parent.log, 'constructor');
    this.log.add('tempId:' + this.ruleManagerId);
  }

  /** Load/initialize the rules which were found */
  load(rawList: string[]): BuildRule[] {
    const cl = this.log.call('load', `${() => rawList.length}`);
    if (!Array.isArray(rawList))
        return cl.return([], 'raw is empty');

    rawList.forEach((raw) => {
      if (typeof raw !== 'string') {
        console.error('tried to parse a toolbar rule and expected a string, but got something else');
        return;
      }

      try {
        this.rules.push(new BuildRule(raw, this.log));
      } catch (e) {
        if (throwOnError) throw e;
        cl.add(`error adding string-rule '${raw}'`, e);
      }
    });

    return cl.return(this.rules, 'final rules');
  }

  /**
   * Find out if there are any problems on this block, and add buttons to see them to the toolbar
   * @param context 
   * @returns 
   */
  addDeveloperInfos(context: ContextComplete) {
    // Skip if already added
    if (this.debugAdded) return;

    // Skip if no problems reported
    const hasErr = !!context.system.error;
    if (hasErr) {
      const note = new Note({
        // type: 'error',
        note: '<strong>Server Insights Logs</strong> can help <br> you debug server errors.',
        asHtml: true,
      });
      // note.note = '<strong>Server Insights Logs</strong> can help <br> you debug server errors.';
      // note.allowHtml = true;
      this.rules.push(BuildRule.Create({ name: CommandNames.insights, ui: { note, color: 'red' }, pos: 10, log: this.log }));
    }

    // Get any other problems and stop if none found
    let problems = context.system.problems;
    if (!(problems?.length > 0)) return;

    // If any of the problems report 'obsolete'
    // add a special button and then skip those problems
    const [remaining, newRules] = addStandardObsoleteButtons(this.log, problems, context.app.id);
    problems = remaining;
    newRules.forEach(r => this.rules.push(r));

    // Add warning/info buttons provided by the context - new v16.02
    if (debug) console.log('2dm - has problems', problems);

    // create rules to add the buttons for all remaining problems
    const rules = problems.map((p, i) => {
      const note = new Note({
        type: p.severity,
        note: p.message?.replace('\n', '<br>'),
        asHtml: true,
        interactive: true,
      });
      // note.note = p.message?.replace('\n', '<br>');
      if (p.link)
        note.links = [{ url: p.link, label: 'see docs', primary: true }];
      // note.type = p.severity;
      // note.allowHtml = true;
      // note.interactive = true;
      return BuildRule.Create({ name: CommandNames.info, ui: { note }, params: { link: p.link }, pos: devInfoButtonsIndex + i, log: this.log });
    });
    if (debug) console.log('2dm - rules', rules);
    rules.forEach(r => this.rules.push(r));
  }
  private debugAdded = false;

  /** Find a single rule matching an ID */
  find(id: string): BuildRule | undefined { return this.rules.find((r) => r.id === id); }

  /** find all rules matching a criteria */
  filter(criteria: (x: BuildRule) => boolean): BuildRule[] { return this.rules.filter(criteria); }


  /**
   * The settings are usually retrieved on settings,
   * but you can also put them behind the toolbar.
   * But mixing both won't work ATM by design.
   */
  getSettings() {
    const all = this.getSystemRuleS(BuildSteps.settings) || [];
    // Params must be merged BEFORE adding the main toolbar rule
    // because actually settings shouldn't have params, but historically it was used
    // But toolbar-rule params are never for the settings
    // Because this params-mistake was only made when only 1 settings was allowed
    // We will only use one setting
    const params = Object.assign({}, ...all.slice(0, 1).map((a) => a?.params));

    const tlbPart = this.getToolbar();
    if (tlbPart) all.unshift(tlbPart); // add to start, so it's the lowest priority
    const ui = Object.assign({}, ...all.map((a) => a?.ui));

    return { ui, params };
  }
  // before v14.07.05 it was this:
  // remove Q4 2022 if everything is ok
  // getSettingsOld = () => this.getSystemRule(BuildSteps.settings) || this.getToolbar();

  /**
   * The params for the command - if not found, will use the toolbar params.
   * But it's either or, mixing won't work by design ATM.
   */
  getParams = () => this.getSystemRule(BuildSteps.params) || this.getToolbar();

  getToolbar = () => this.getSystemRule(BuildSteps.toolbar);
  getAdd = () => this.filter((br) => br.operator === OP.add || br.operator === OP.addAuto);
  getRemoveGroups = () => this.filter((br) => br.operator === OP.remove && br.step === BuildSteps.group);

  /** Find a system rule (marked with '$') */
  private getSystemRule(name: BuildSteps): BuildRule | undefined {
    return this.rules.find((r) => r.operator === OP.system && r.step === name);
  }

  /** Find a system rule (marked with '$') */
  private getSystemRuleS(name: BuildSteps): BuildRule[] | undefined {
    return this.rules.filter((r) => r.operator === OP.system && r.step === name);
  }

}
