import { ToolbarConfigLoader, InPageCommandJson } from '.';
import { ToolbarInitConfig } from '..';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { Toolbar, ToolbarSettings } from '../config';
import { BuildSteps, RuleManager } from '../rules';
import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateSublist } from '../templates';
import { ToolbarWip } from './config-formats/toolbar-wip';

/**
 * @internal
 */
export class ToolbarConfigLoaderV10 extends HasLog {

    public rules: RuleManager;

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.TlbV10', toolbar.log, 'constructor');
        this.rules = new RuleManager(toolbar);
    }


    public loadV10(context: ContextComplete, config: ToolbarInitConfig, raw: string[]): Toolbar {
        const cl = this.log.call('loadV10');

        this.rules.load(raw);

        let template: ToolbarTemplate;
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
        const toolbarTemplateName = toolbarRule
            ? toolbarRule.name
            : defToolbarname;
        template = this.toolbar.templates.copy(toolbarTemplateName);
        template.settings = settings;
        if (params) template.params = params.params;

        // #4 Remove unwanted groups
        const removeGroups = this.rules.getRemoveGroups();
        removeGroups.forEach((rg) => this.toolbar.templateEditor.removeGroup(template, rg.name));

        // Add additional buttons
        const add = this.rules.getAdd();
        add.forEach((a) => {
            if (a.step === BuildSteps.group) this.toolbar.templateEditor.addGroup(template, a.name, a.pos);
            else this.toolbar.templateEditor.addButton(template, a.group, a.id, a.name, a.pos);
        });

        const toolbar = this.toolbar.buildTreeAndModifyAccordingToRules(context, template as ToolbarWip);
        if (!toolbar.identifier) toolbar.identifier = Toolbar.createIdentifier();
        toolbar.settings._rules = this.rules;
        // process the rules one by one
        return cl.return(toolbar, 'ok');
    }
}
