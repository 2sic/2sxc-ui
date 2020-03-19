import { ButtonGroupConfigLoader } from '.';
import { CommandConfigLoader } from '.';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { HasLog, Log } from '../../logging';
import { InstanceConfig } from '../../manage/instance-config';
import { Toolbar } from '../config/toolbar';
import { defaultToolbarSettings, settingsForEmptyToolbar, ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarVariationsForInitializing } from '../initialize/toolbar-init-config';
import { ToolbarTemplateManager } from '../templates/toolbar-template-manager';
import { ButtonConfigLoader } from './button-config-loader';

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

    expandToolbarConfig(context: ContextBundleButton, toolbarData: ToolbarVariationsForInitializing, toolbarSettings: ToolbarSettings, parentLog?: Log): Toolbar {
        const log = new Log('Tlb.ExpTop', this.log, 'expand start');

        if (toolbarData === ({} as ToolbarVariationsForInitializing) && toolbarSettings === ({} as ToolbarSettings)) {
          log.add('no data or settings found, will use default toolbar');
          toolbarSettings = settingsForEmptyToolbar;
        }

        // if it has an action or is an array, keep that. Otherwise get standard buttons
        toolbarData = toolbarData || {} as ToolbarVariationsForInitializing; // if null/undefined, use empty object

        let unstructuredConfig = toolbarData;
        if (!toolbarData.action && !toolbarData.groups && !toolbarData.buttons && !Array.isArray(toolbarData)) {
          log.add('no toolbar details found, will use standard toolbar template');
          const toolbarTemplate = ToolbarTemplateManager.Instance(log).get('default'); // use default toolbar template
          unstructuredConfig = JSON.parse(JSON.stringify(toolbarTemplate)); // deep copy toolbar template
          unstructuredConfig.params = ((toolbarData) && Array.isArray(toolbarData) && toolbarData[0]) || toolbarData; // these are the default command parameters
        }

        const instanceConfig = InstanceConfig.fromContext(context);

        // whatever we had, if more settings were provided, override with these...
        const config = this.buildFullDefinition(context, unstructuredConfig, instanceConfig, toolbarSettings);

        log.add('expand done');
        return config;
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
     * @param unstructuredConfig
     * @param allActions
     * @param instanceConfig
     * @param toolbarSettings
     */
    private buildFullDefinition(toolbarContext: ContextBundleButton, unstructuredConfig: ToolbarVariationsForInitializing, instanceConfig: InstanceConfig, toolbarSettings: ToolbarSettings) {
        const log = new Log('Tlb.BldFul', this.log, 'start');
        let fullConfig = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings);

        // ToDo: don't use console.log in production
        if (unstructuredConfig.debug) console.log('toolbar: detailed debug on; start build full Def');

        fullConfig = this.groups.expandButtonGroups(fullConfig, log);

        this.button.removeDisableButtons(toolbarContext, fullConfig, instanceConfig);

        if (fullConfig.debug) console.log('after remove: ', fullConfig);

        return fullConfig;
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
    private ensureDefinitionTree(unstructuredConfig: any, toolbarSettings: ToolbarSettings): Toolbar {
        const log = new Log('Tlb.DefTre', this.log, 'start');
        // original is null/undefined, just return empty set
        if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

        // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
        if (!Array.isArray(unstructuredConfig) && (unstructuredConfig.action || unstructuredConfig.buttons)) {
            log.add('found no array, but detected action/buttons properties, will wrap config into array');
            unstructuredConfig = [unstructuredConfig];
        }

        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        if (Array.isArray(unstructuredConfig) && unstructuredConfig.length) {
            log.add('detected array with length');
            if (unstructuredConfig[0].buttons) {
            log.add('detected buttons on first item, assume button-group, moving into .groups');
            (unstructuredConfig as any).groups = unstructuredConfig; // move "down"
            } else if (unstructuredConfig[0].command || unstructuredConfig[0].action) {
            log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
            unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
            } else {
            log.add('can\'t detect what this is - show warning');
            console.warn("toolbar tried to build toolbar but couldn't detect type of this:", unstructuredConfig);
            }
        } else
            log.add('not array or has no items');

        const toolbarConfig = new Toolbar();
        // toolbarConfig.groupConfig = new GroupConfig(original.groups as ButtonConfig[]);
        toolbarConfig.groups = unstructuredConfig.groups || []; // the groups of buttons
        toolbarConfig.params = unstructuredConfig.params || {}; // these are the default command parameters
        toolbarConfig.settings = Object.assign({}, defaultToolbarSettings, unstructuredConfig.settings, cleanDeprecatedSettings(toolbarSettings)) as ToolbarSettings;

        toolbarConfig.debug = unstructuredConfig.debug || false; // show more debug info
        toolbarConfig.defaults = unstructuredConfig.defaults || {}; // the button defaults like icon, etc.

        log.add('done');
        return toolbarConfig;
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
    const partialToolbaSettings = Object.assign({}, toolbarSettings) as ToolbarSettings;
    if (!partialToolbaSettings.autoAddMore) {
      delete partialToolbaSettings.autoAddMore;
    }
    if (!partialToolbaSettings.classes) {
      delete partialToolbaSettings.classes;
    }
    return partialToolbaSettings;
  }
