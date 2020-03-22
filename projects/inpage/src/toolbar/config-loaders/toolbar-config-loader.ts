import { ButtonGroupConfigLoader, CommandConfigLoader, InPageCommandJson, ToolbarWip } from '.';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { HasLog, Log } from '../../logging';
import { InstanceConfig } from '../../manage/instance-config';
import { ButtonGroup, Toolbar, ButtonModifier } from '../config';
import { ToolbarSettingsDefaults, ToolbarSettingsForEmpty, ToolbarSettings } from '../config';
import { InPageToolbarConfigVariations } from '../initialize/toolbar-init-config';
import { ToolbarTemplateManager } from '../templates/toolbar-template-manager';
import { ToolbarTemplate } from '../templates/toolbar-template-toolbar';
import { ToolbarTemplateButtonGroup } from '../templates/toolbar-templaten-button-group';
import { ButtonConfigLoader } from './button-config-loader';
import { InPageButtonJson } from './in-page-button';
import { InPageButtonGroupJson } from './in-page-button-group';
import { ButtonGroupsWip } from './toolbar-wip';

export class ToolbarConfigLoader extends HasLog {

    public groups: ButtonGroupConfigLoader;
    public button: ButtonConfigLoader;
    public command: CommandConfigLoader;

    constructor(parentLog: Log) {
        super('Tlb.TlbCnf', parentLog);
        this.groups = new ButtonGroupConfigLoader(this);
        this.button = new ButtonConfigLoader(this);
        this.command = new CommandConfigLoader(this);
    }

    expandToolbarConfig(context: ContextBundleButton, toolbarData: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): Toolbar {
        const log = new Log('Tlb.ExpTop', this.log, 'expand start');

        // if null/undefined, use empty object
        toolbarData = toolbarData || {};

        // Default to empty toolbar settings if we don't have a toolbar or settings
        if (Object.keys(toolbarData).length + Object.keys(toolbarSettings || {}).length === 0) {
            log.add('no data or settings, will use default settings for empty');
            toolbarSettings = ToolbarSettingsForEmpty;
        }

        // if it has an action or is an array, keep that. Otherwise get standard buttons
        toolbarData = this.useButtonsFromConfigOrLoadTemplate(toolbarData, log);

        const instanceConfig = InstanceConfig.fromContext(context);

        // whatever we had, if more settings were provided, override with these...
        const config = this.buildFullDefinition(context, toolbarData, instanceConfig, toolbarSettings);

        log.add('expand done');
        return config;
    }

    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    private useButtonsFromConfigOrLoadTemplate(raw: InPageToolbarConfigVariations, log: Log) {
        let hasActions = false;
        let buttonModifiers = '';
        // if we have an actions node,
        // check if it's just a modifier (with +/-) or a standalone list
        if (InPageCommandJson.hasActions(raw)) {
            hasActions = true;
            const actions = raw.action;
            const firstChar = (actions.length) ? actions[0] : ' ';
            if (firstChar === '+' || firstChar === '-'){
                buttonModifiers = actions;
                hasActions = false;
            }
        }

        if (hasActions || ToolbarTemplate.is(raw)
            || ToolbarTemplateButtonGroup.is(raw) || Array.isArray(raw))
                return raw;
        log.add('no toolbar structure specified, will use standard toolbar template');
        // TODO: PASS MODIFIERS TO THE COPY!
        const template = ToolbarTemplateManager.Instance(log).copy('default');
        template.params = (raw && Array.isArray(raw) && raw[0]) || raw; // attach parameters
        if (buttonModifiers) template.settings.buttonModifiers
            = buttonModifiers.split(',').map((btnMod) => new ButtonModifier(btnMod));
        return template;
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
    private buildFullDefinition(toolbarContext: ContextBundleButton, unstructuredConfig: InPageToolbarConfigVariations, instanceConfig: InstanceConfig, toolbarSettings: ToolbarSettings): Toolbar {
        const log = new Log('Tlb.BldFul', this.log, 'start');

        const configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;

        // ToDo: don't use console.log in production
        if (ToolbarTemplate.is(unstructuredConfig) && unstructuredConfig.debug)
            console.log('toolbar: detailed debug on; start build full Def');

        const tlbConfig = this.groups.expandButtonGroups(configWip, log);

        this.button.removeDisableButtons(toolbarContext, tlbConfig, instanceConfig);

        if (configWip.debug) console.log('after remove: ', configWip);

        return tlbConfig;
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
        const log = new Log('Tlb.DefTre', this.log, 'start');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

        const newToolbar: ToolbarWip = new Toolbar();
        newToolbar.groups = this.findGroups(unstructuredConfig);

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

        log.add('done');
        return newToolbar;
    }

    private findGroups(unstructuredConfig: InPageToolbarConfigVariations): ButtonGroupsWip {

        let arrBtnsOrGroups: Array<InPageButtonJson | ButtonGroup>;

        const log = new Log('Tlb.GrpArr', this.log, 'start');

        // ensure that the groups are all correct
        if (Array.isArray(unstructuredConfig))
            arrBtnsOrGroups = unstructuredConfig as Array<InPageButtonJson | ButtonGroup>;
        else if (!Array.isArray(unstructuredConfig) && InPageButtonJson.is(unstructuredConfig)) {
            log.add('found no array, but detected action/buttons properties, will wrap config into array');
            arrBtnsOrGroups = [unstructuredConfig];
        } else
            // we either have groups already, or we'll return blank
            return (ToolbarTemplate.is(unstructuredConfig))
                ? unstructuredConfig.groups
                : [];

        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        if (!arrBtnsOrGroups || !arrBtnsOrGroups.length) {
            log.add('not array or has no items');
            return [];
        }

        log.add('detected array with length');
        if (ButtonGroup.isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].buttons) {
            log.add('detected buttons on first item, assume button-group, moving into .groups');
            return arrBtnsOrGroups;
        } else if (InPageButtonJson.isArray(arrBtnsOrGroups)) { // unstructuredConfig[0].action) {
            log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
            return [{ buttons:  arrBtnsOrGroups } as InPageButtonGroupJson];
            // unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        }

        log.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrBtnsOrGroups);
        return [];
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
    const partialToolbaSettings = {...toolbarSettings}; // O.bject.assign({}, toolbarSettings) as ToolbarSettings;
    if (!partialToolbaSettings.autoAddMore) {
      delete partialToolbaSettings.autoAddMore;
    }
    if (!partialToolbaSettings.classes) {
      delete partialToolbaSettings.classes;
    }
    return partialToolbaSettings;
  }
