import { ButtonGroupConfigLoader, CommandConfigLoader, InPageCommandJson, ToolbarWip } from '.';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { HasLog, Log } from '../../logging';
import { ButtonGroup, ButtonModifier, Toolbar } from '../config';
import { ToolbarSettings, ToolbarSettingsDefaults, ToolbarSettingsForEmpty } from '../config';
import { InPageToolbarConfigVariations } from '../initialize/toolbar-init-config';
import { ToolbarTemplateManager } from '../templates';
import { ToolbarTemplate } from '../templates';
import { ToolbarTemplateButtonGroup } from '../templates';
import { ToolbarTemplateDefault } from '../templates/template-default';
import { ButtonConfigLoader } from './button-config-loader';
import { InPageButtonJson } from './in-page-button';
import { InPageButtonGroupJson } from './in-page-button-group';
import { ButtonGroupsWip } from './toolbar-wip';

const debugRawEnabled = true;
const liveDumpThis = true;

export class ToolbarConfigLoader extends HasLog {

    public groups: ButtonGroupConfigLoader;
    public button: ButtonConfigLoader;
    public command: CommandConfigLoader;

    constructor(parentLog: Log) {
        super('Tlb.TlbCnf', parentLog);
        if (liveDumpThis) this.log.liveDump = true;
        this.groups = new ButtonGroupConfigLoader(this);
        this.button = new ButtonConfigLoader(this);
        this.command = new CommandConfigLoader(this);
    }

    /** Debug-dump an object - for development */
    dump(location: string, raw: unknown) {
        if (debugRawEnabled) console.log('Dump ' + location, raw);
    }

    expandToolbarConfig(context: ContextBundleButton, toolbarData: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): Toolbar {
        const wrapLog = this.log.call('expandToolbarConfig', '', 'expand start'); // new Log('Tlb.ExpTop', this.log, 'expand start');

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
        this.dump('expandToolbarConfig', config);
        return wrapLog.return(config, 'expand done');
    }

    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    private getTemplateIfNoButtonsSpecified(raw: InPageToolbarConfigVariations) {
        const wrapLog = this.log.call('getTemplateIfNoButtonsSpecified'); // new Log('Tlb.GetTpl', wrapLog);
        this.dump('getTemplateIfNoButtonsSpecified', raw);
        const modifiers: ButtonModifier[] = this.extractModifiers(raw);

        if (InPageCommandJson.hasActions(raw) || ToolbarTemplate.is(raw)
            || ToolbarTemplateButtonGroup.is(raw) || Array.isArray(raw))
                return wrapLog.return(raw, 'keep raw');

        wrapLog.add('no toolbar structure specified, will use standard toolbar template');
        const template = ToolbarTemplateManager.Instance(this.log).copy(ToolbarTemplateDefault.name);
        template.params = (raw && Array.isArray(raw) && raw[0]) || raw; // attach parameters
        template.settings._btnModifiers = modifiers;
        this.dump('getTemplateIfNoButtonsSpecified', template);
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
        toolbarContext: ContextBundleButton,
        unstructuredConfig: InPageToolbarConfigVariations,
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // instanceConfig: InstanceConfig,
        toolbarSettings: ToolbarSettings,
        ): Toolbar {
        const wrapLog = this.log.call('buildFullDefinition'); // new Log('Tlb.BldFul', this.log, 'start');

        const configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;
        this.dump('buildFullDefinition', configWip);

        // ToDo: don't use console.log in production
        if (ToolbarTemplate.is(unstructuredConfig) && unstructuredConfig.debug)
            console.log('toolbar: detailed debug on; start build full Def');

        const tlbConfig = this.groups.expandButtonGroups(configWip, this.log);
        this.dump('buildFullDefinition', tlbConfig);

        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        this.button.removeDisableButtons(toolbarContext, tlbConfig/*, instanceConfig */);
        this.dump('buildFullDefinition', tlbConfig);
        if (configWip.debug) console.log('after remove: ', configWip);

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
        const wrapLog = this.log.call('ensureDefinitionTree'); // new Log('Tlb.DefTre', this.log, 'start');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

        const newToolbar: ToolbarWip = new Toolbar();
        newToolbar.groups = this.findGroups(unstructuredConfig);
        this.dump('ensureDefinitionTree', newToolbar);

        // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
        // if (!Array.isArray(unstructuredConfig) && (unstructuredConfig.action || unstructuredConfig.buttons)) {
        //     log.add('found no array, but detected action/buttons properties, will wrap config into array');
        //     unstructuredConfig = [unstructuredConfig];
        // }
        // // ensure that arrays of actions or buttons are re-mapped to the right structure node
        // if (Array.isArray(unstructuredConfig) && unstructuredConfig.length) {
        //     log.add('detected array with length');
        //     if (unstructuredConfig[0].buttons) {
        //         log.add('detected buttons on first item, assume button-group, moving into .groups');
        //         (unstructuredConfig as a.ny).groups = unstructuredConfig; // move "down"
        //     } else if (unstructuredConfig[0].command || unstructuredConfig[0].action) {
        //         log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
        //         unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        //     } else {
        //     log.add('can\'t detect what this is - show warning');
        //     console.warn("toolbar tried to build toolbar but couldn't detect type of this:", unstructuredConfig);
        //     }
        // } else
        //     log.add('not array or has no items');
        // newToolbar.groups = unstructuredConfig.groups || []; // the groups of buttons

        const probablyTemplate = unstructuredConfig as ToolbarTemplate;
        newToolbar.params = probablyTemplate.params || {}; // these are the default command parameters
        newToolbar.settings = { ...ToolbarSettingsDefaults, ...probablyTemplate.settings, ...cleanDeprecatedSettings(toolbarSettings)};
        // toolbarConfig.settings = O.bject.assign({}, defaultToolbarSettings, unstructuredConfig.settings, cleanDeprecatedSettings(toolbarSettings)) as ToolbarSettings;

        newToolbar.debug = probablyTemplate.debug || false; // show more debug info
        newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.

        return wrapLog.return(newToolbar);
    }

    private findGroups(unstructuredConfig: InPageToolbarConfigVariations): ButtonGroupsWip {

        let arrBtnsOrGroups: Array<InPageButtonJson | ButtonGroup>;

        const wrapLog = this.log.call('findGroups'); // new Log('Tlb.GrpArr', this.log, 'start');

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
                return (ToolbarTemplate.is(unstructuredConfig))
                    ? unstructuredConfig.groups
                    : [];
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
