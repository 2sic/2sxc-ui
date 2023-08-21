import { ToolbarConfigLoader, InPageCommandJson } from '.';
import { ToolbarInitConfig } from '..';
import { Debug } from '../../constants/debug';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { Toolbar, ToolbarSettings } from '../config';
import { BuildSteps, RuleManager } from '../rules';
import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateSublist } from '../templates';
import { ToolbarWip } from './config-formats/toolbar-wip';

const debug = Debug.parts.ToolbarConfigLoaderV10;

/**
 * @internal
 */
export class ToolbarConfigLoaderV10 extends HasLog {

  public rules: RuleManager;

  constructor(private configLoader: ToolbarConfigLoader) {
    super('Tlb.TlbV10', configLoader.log, 'constructor');
    this.rules = new RuleManager(configLoader);
  }


  public loadV10(context: ContextComplete, config: ToolbarInitConfig, raw: string[]): Toolbar {
    const cl = this.log.call('loadV10');

    this.rules.load(raw);

    // #1 prepare settings - get rules and mix with defaults
    // We should use the `ui` parameter, as it's UI rules, but because previously
    // it used the `params` - we must support both :(
    const settingRule = this.rules.getSettings();
    let settingsUiRule = settingRule?.ui as Partial<ToolbarSettings>;
    if (Object.keys(settingsUiRule || {}).length === 0)
      settingsUiRule = settingRule?.params as Partial<ToolbarSettings>;
    const settings = new ToolbarSettings(settingsUiRule);

    // #2 load either the default toolbar or the one specified
    const toolbarRule = this.rules.getToolbar();

    // #3 find params
    const params = this.rules.getParams();

    // If it's a sub-list toolbar, use the special template for it
    const isSublist = (config.toolbar as InPageCommandJson).fields || params?.params?.fields;
    const defToolbarname = isSublist ? ToolbarTemplateSublist.name : ToolbarTemplateDefault.name;
    const toolbarTemplateName = toolbarRule?.name ?? defToolbarname;
    let template = this.configLoader.templates.copy(toolbarTemplateName);
    template.settings = settings;
    if (params) template.params = params.params;

    // #4 Remove unwanted groups
    const removeGroups = this.rules.getRemoveGroups();
    removeGroups.forEach((rg) => this.configLoader.templateEditor.removeGroup(template, rg.name));

    // Add additional buttons 16.02
    this.rules.addDeveloperInfos(context);
    const addRules = this.rules.getAdd();
    this.configLoader.templateEditor.add(template, addRules);

    // Build the real toolbar structure
    const toolbar = this.configLoader.buildTreeAndModifyAccordingToRules(context, template as ToolbarWip);
    if (!toolbar.identifier) toolbar.identifier = Toolbar.createIdentifier();
    toolbar.settings._rules = this.rules;
    // process the rules one by one
    return cl.return(toolbar, 'ok');
  }
}
