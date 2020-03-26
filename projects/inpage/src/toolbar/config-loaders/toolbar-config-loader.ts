import { ButtonGroupConfigLoader, CommandConfigLoader, InPageCommandJson, ToolbarWip } from '.';
import { InPageButtonGroupJson, InPageButtonJson } from '.';
import { ButtonGroupsWip } from '.';
import { ToolbarManager } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Entry, HasLog } from '../../logging';
import { ButtonGroup, ButtonModifier, Toolbar } from '../config';
import { ToolbarSettings, ToolbarSettingsDefaults, ToolbarSettingsForEmpty } from '../config';
import { InPageToolbarConfigVariations } from '../initialize/toolbar-init-config';
import { ToolbarTemplateManager } from '../templates';
import { ToolbarTemplate } from '../templates';
import { ToolbarTemplateButtonGroup } from '../templates';
import { ToolbarTemplateDefault } from '../templates/template-default';
import { ButtonConfigLoader } from './button-config-loader';

// Enable when debugging toolbar creation - will dump all logs to the console
const liveDumpThis = false;

export class ToolbarConfigLoader extends HasLog {

    public groups: ButtonGroupConfigLoader;
    public button: ButtonConfigLoader;
    public command: CommandConfigLoader;

    public logs: Array<{ key: string, entries: Entry[]}>;

    /** Special constructor that can only be called from the ToolbarManager */
    constructor(_owner: typeof ToolbarManager) {
        // important: always create a new log
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
    }

    load(context: ContextComplete, toolbarData: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): Toolbar {
        const wrapLog = this.log.call('expandToolbarConfig', '', 'expand start');
        this.setLoggingAndCreateHelpers(toolbarData);

        // if null/undefined, use empty object
        toolbarData = toolbarData || {};

        // Default to empty toolbar settings if we don't have a toolbar or settings
        if (Object.keys(toolbarData).length + Object.keys(toolbarSettings || {}).length === 0) {
            wrapLog.add('no data or settings, will use default settings for empty');
            toolbarSettings = ToolbarSettingsForEmpty;
        }

        // if it has an action or is an array, keep that. Otherwise get standard buttons
        toolbarData = this.getTemplateIfNoButtonsSpecified(toolbarData);

        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // const instanceConfig = InstanceConfig.fromContext(context);

        // whatever we had, if more settings were provided, override with these...
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        const config = this.buildFullDefinition(context, toolbarData, /* instanceConfig, */ toolbarSettings);
        return wrapLog.return(config, 'expand done');
    }

    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    private getTemplateIfNoButtonsSpecified(raw: InPageToolbarConfigVariations) {
        const wrapLog = this.log.call('getTemplateIfNoButtonsSpecified');
        wrapLog.add('before', raw);
        const modifiers: ButtonModifier[] = this.extractModifiers(raw);

        if (InPageCommandJson.hasActions(raw)
            || ToolbarTemplate.hasGroups(raw)
            || ToolbarTemplateButtonGroup.is(raw)
            || Array.isArray(raw))
                return wrapLog.return(raw, 'keep raw');

        wrapLog.add('no toolbar structure specified, will use standard toolbar template');
        const template = ToolbarTemplateManager.Instance(this.log).copy(ToolbarTemplateDefault.name);
        template.params = (raw && Array.isArray(raw) && raw[0]) || raw; // attach parameters
        template.settings._btnModifiers = modifiers;
        return wrapLog.return(template, 'use template');
    }

    /**
     * Extract action params with +edit or -delete
     */
    private extractModifiers(raw: InPageToolbarConfigVariations): ButtonModifier[] {
        const wrapLog = this.log.call('extractModifiers');
        let buttonModifiers: ButtonModifier[] = null;
        // if we have an actions node,
        // check if it's just a modifier (with +/-) or a standalone list
        if (!InPageCommandJson.hasActions(raw)) return wrapLog.return([], 'no actions/modifiers');
        wrapLog.add(`found actions: ${raw.action}`);

        const firstChar = (raw.action.length) ? raw.action[0] : ' ';
        if (!(firstChar === '+' || firstChar === '-')) return wrapLog.return([], 'actions but not modifiers');

        wrapLog.add('actions have +/-, assume they are only modifiers - extract and reset');
        buttonModifiers = raw.action.split(',').map((btnMod) => new ButtonModifier(btnMod));
        delete raw.action; // clean up to prevent side-effects
        return wrapLog.return(buttonModifiers, 'had modifiers');
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
        newToolbar.settings = { ...ToolbarSettingsDefaults, ...probablyTemplate.settings, ...cleanDeprecatedSettings(toolbarSettings)};
        // toolbarConfig.settings = O.bject.assign({}, defaultToolbarSettings, unstructuredConfig.settings, cleanDeprecatedSettings(toolbarSettings)) as ToolbarSettings;

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

        if (ButtonGroup.isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].buttons) {
            return wrapLog.return(arrBtnsOrGroups, 'detected buttons on first item, assume button-group, moving into .groups');
        } else if (InPageButtonJson.isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].action) {
            return wrapLog.return([{ buttons:  arrBtnsOrGroups } as InPageButtonGroupJson],
                'detected command or action on first item, assume buttons, move into .groups[buttons] ');
            // unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        }

        wrapLog.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrBtnsOrGroups);
        return wrapLog.return([], 'warning');
    }

  //#endregion initial toolbar object

}




/**
 * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
 *
 * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
 * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
 * contain stuff we don't want passed on
 * @param toolbarSettings
 */
function cleanDeprecatedSettings(toolbarSettings: ToolbarSettings): ToolbarSettings {
    const partialSettings = {...toolbarSettings};
    if (!partialSettings.autoAddMore) delete partialSettings.autoAddMore;
    if (!partialSettings.classes) delete partialSettings.classes;
    return partialSettings;
  }
