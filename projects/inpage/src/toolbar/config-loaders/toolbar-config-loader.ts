import { ButtonGroupConfigLoader, CommandConfigLoader, InPageCommandJson, ToolbarWip } from '.';
import { InPageButtonGroupJson, InPageButtonJson } from '.';
import { ButtonGroupsWip } from '.';
import { ToolbarManager } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Entry, HasLog } from '../../logging';
import { ButtonGroup, Toolbar } from '../config';
import { ToolbarSettings, ToolbarSettingsDefaults, ToolbarSettingsForEmpty } from '../config';
import { InPageToolbarConfigVariations, ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { RuleConstants, RuleManager } from '../rules';
import { TemplateEditor, ToolbarTemplate, ToolbarTemplateManager } from '../templates';
import { ToolbarTemplateGroup } from '../templates';
import { ToolbarTemplateDefault } from '../templates/template-default';
import { ButtonConfigLoader } from './button-config-loader';

// Enable when debugging toolbar creation - will dump all logs to the console
const liveDumpThis = false;

export class ToolbarConfigLoader extends HasLog {

    public groups: ButtonGroupConfigLoader;
    public button: ButtonConfigLoader;
    public command: CommandConfigLoader;
    public rules: RuleManager;
    public templates = ToolbarTemplateManager;
    public templateEditor: TemplateEditor;

    public logs: Array<{ key: string, entries: Entry[]}>;

    /** Special constructor that can only be called from the ToolbarManager */
    constructor(_owner: typeof ToolbarManager) {
        // important: always create a new log as it will be stored in insights
        super('Tlb.TlbCnf');
    }

    private setLoggingAndCreateHelpers(toolbarData: InPageToolbarConfigVariations): void {
        // note: could be true, false or 'live'
        let debugLog = toolbarData && (toolbarData as ToolbarTemplate).debug;
        if (debugLog === undefined && Array.isArray(toolbarData) && toolbarData.length)
            debugLog = (toolbarData[0] as ToolbarTemplate).debug;

        debugLog = debugLog || false;

        if (liveDumpThis || debugLog) {
            this.log.keepData = true;
            if (liveDumpThis || debugLog.toString() === 'live')
                this.log.liveDump = true;
            this.log.add(`found debug=${debugLog}, will enable intense logging`);
        }
        this.groups = new ButtonGroupConfigLoader(this);
        this.button = new ButtonConfigLoader(this);
        this.command = new CommandConfigLoader(this);
        this.rules = new RuleManager(this);
        this.templateEditor = new TemplateEditor(this);
    }

    load(context: ContextComplete, config: ToolbarInitConfig): Toolbar {
        const cl = this.log.call('load', '', 'expand start');
        // if null/undefined, use empty object
        const raw = config.toolbar = config.toolbar || {};
        this.setLoggingAndCreateHelpers(raw);

        // check if it's a V10 tolbar
        if (Array.isArray(raw) && raw.length >= 0 && typeof raw[0] === 'string')
            return cl.return(this.loadV10(context, config, raw), 'v10');

        // do standard V3 procedures
        return cl.return(this.loadV9(context, config), 'expand done');
    }

    private loadV10(context: ContextComplete, config: ToolbarInitConfig, raw: string[]): Toolbar {
        const cl = this.log.call('loadV10');
        this.rules.load(raw);

        let template: ToolbarTemplate;
        // todo: prepare settings if no rule configured it
        const settingRule = this.rules.getSettings();
        const settings: ToolbarSettings = (Object.keys(settingRule?.params || {}).length > 0)
            ? settingRule.params as unknown as ToolbarSettings
            : ToolbarSettingsForEmpty;

        // todo: special case if first rule is clear
        if (false) {
            // todo
        } else {
            template = this.templates.copy(ToolbarTemplateDefault.name);
        }

        // Add additional buttons
        const add = this.rules.getAdd();
        add.forEach((a) => {
            // console.log('add rule', a);
            if (a.id === RuleConstants.Keys.Group) this.templateEditor.addGroup(template, a.name, a.pos, a.fromStart);
            else this.templateEditor.addButton(template, a.group, a.name, a.pos, a.fromStart);
        });

        const toolbar = this.buildFullDefinition(context, template, settings);
        toolbar.settings._rules = this.rules;

        // process the rules one by one
        return cl.return(toolbar, 'ok');
    }

    private loadV9(context: ContextComplete, config: ToolbarInitConfig): Toolbar {
        const cl = this.log.call('loadV9');
        let toolbarSettings = config.settings;

        // Default to empty toolbar settings if we don't have a toolbar or settings
        if (Object.keys(config.toolbar).length + Object.keys(toolbarSettings || {}).length === 0) {
            cl.add('no data or settings, will use default settings for empty');
            toolbarSettings = ToolbarSettingsForEmpty;
        }

        // if it has an action or is an array, keep that. Otherwise get standard buttons
        const draftToolbar = this.getTemplateIfNoButtonsSpecified(config.toolbar);
        cl.data('after template check', draftToolbar);

        const toolbar = this.buildFullDefinition(context, draftToolbar, toolbarSettings);
        return cl.return(toolbar, 'ok');
    }

    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    private getTemplateIfNoButtonsSpecified(raw: InPageToolbarConfigVariations): InPageToolbarConfigVariations {
        const wrapLog = this.log.call('getTemplateIfNoButtonsSpecified');
        wrapLog.add('before', raw);
        // const modifiers: ButtonModifier[] = this.extractModifiers(raw);

        if (InPageCommandJson.hasActions(raw)
            || ToolbarTemplate.hasGroups(raw)
            || ToolbarTemplateGroup.is(raw)
            || Array.isArray(raw))
                return wrapLog.return(raw, 'keep raw');

        wrapLog.add('no toolbar structure specified, will use standard toolbar template');
        const template = this.templates.copy(ToolbarTemplateDefault.name);
        template.params = (Array.isArray(raw) && raw[0]) || raw; // attach parameters
        // template.settings._rules = modifiers;
        return wrapLog.return(template, 'use template');
    }

    /**
     * take various common input format and convert it to a full toolbar-structure definition
     * can handle the following input formats (the param unstructuredConfig):
     * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
     * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
     * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
     * button (detected by "command"): { command: ""|[], icon: "..", ... }
     * just a command (detected by "action"): { entityId: 17, action: "edit" }
     * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
     */
    private buildFullDefinition(
            toolbarContext: ContextComplete,
            unstructuredConfig: InPageToolbarConfigVariations,
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            // instanceConfig: InstanceConfig,
            toolbarSettings: ToolbarSettings,
        ): Toolbar {
        const wrapLog = this.log.call('buildFullDefinition');

        const configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;

        // ToDo: don't use console.log in production
        if (ToolbarTemplate.is(unstructuredConfig) && unstructuredConfig.debug)
            console.log('toolbar: detailed debug on; start build full Def');

        const tlbConfig = this.groups.expandButtonGroups(configWip);

        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        this.button.removeDisableButtons(toolbarContext, tlbConfig/*, instanceConfig */);

        return wrapLog.return(tlbConfig);
    }


    //#region build initial toolbar object
    /**
     * this will take an input which could already be a tree, but it could also be a
     * button-definition, or just a string, and make sure that afterwards it's a tree with groups
     * the groups could still be in compact form, or already expanded, depending on the input
     * output is object with:
     * - groups containing buttons[], but buttons could still be very flat
     * - defaults, already officially formatted
     * - params, officially formatted
     * @param unstructuredConfig
     * @param toolbarSettings
     */
    private ensureDefinitionTree(unstructuredConfig: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): ToolbarWip {
        const wrapLog = this.log.call('ensureDefinitionTree');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

        const newToolbar: ToolbarWip = new Toolbar();
        newToolbar.groups = this.findGroups(unstructuredConfig);

        const probablyTemplate = unstructuredConfig as ToolbarTemplate;
        newToolbar.params = probablyTemplate.params || {}; // these are the default command parameters
        newToolbar.settings = { ...ToolbarSettingsDefaults, ...probablyTemplate.settings, ...ToolbarSettings.dropEmptyProperties(toolbarSettings)};

        newToolbar.debug = probablyTemplate.debug || false; // show more debug info
        newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.

        return wrapLog.return(newToolbar);
    }

    private findGroups(unstructuredConfig: InPageToolbarConfigVariations): ButtonGroupsWip {
        const wrapLog = this.log.call('findGroups');

        let arrBtnsOrGroups: Array<InPageButtonJson | ButtonGroup>;


        // ensure that the groups are all correct
        if (Array.isArray(unstructuredConfig)) {
            wrapLog.add('Case 1: is array, use that');
            arrBtnsOrGroups = unstructuredConfig as Array<InPageButtonJson | ButtonGroup>;
        } else {
            if (InPageButtonJson.is(unstructuredConfig)) {
                wrapLog.add('Case 2a: not array, but has action/buttons properties, will wrap config into array');
                arrBtnsOrGroups = [unstructuredConfig];
            } else {
                wrapLog.add('Case 2b: not array, no action, will return it or blank');
                // we either have groups already, or we'll return blank
                return (ToolbarTemplate.hasGroups(unstructuredConfig))
                    ? wrapLog.return(unstructuredConfig.groups, 'found groups')
                    : wrapLog.return([], 'no groups = []');
            }
        }

        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        if (!arrBtnsOrGroups || !arrBtnsOrGroups.length) {
            return wrapLog.return([], 'not array or has no items, return empty array');
        } else
            wrapLog.add('its an object or array, use that');

        if (ButtonGroup.isArray(arrBtnsOrGroups)) {
            return wrapLog.return(arrBtnsOrGroups, 'detected buttons on first item, assume button-group, moving into .groups');
        } else if (InPageButtonJson.isArray(arrBtnsOrGroups)) {
            return wrapLog.return([{ buttons:  arrBtnsOrGroups } as InPageButtonGroupJson],
                'detected command or action on first item, assume buttons, move into .groups[buttons] ');
        }

        wrapLog.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrBtnsOrGroups);
        return wrapLog.return([], 'warning');
    }

  //#endregion initial toolbar object

}
