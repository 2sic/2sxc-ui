import { InPageButtonGroupJson, InPageButtonJson, InPageCommandJson, ToolbarConfigLoader, ToolbarWip } from '.';
import { InPageToolbarConfigVariations, ToolbarInitConfig } from '..';
import { ContextComplete } from '../../context';
import { HasLog } from '../../logging';
import { Button, Toolbar, ToolbarSettings } from '../config';
import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateGroup } from '../templates';


export class ToolbarConfigLoaderV09 extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.TlbV09', toolbar.log);
    }



    public loadV9(context: ContextComplete, config: ToolbarInitConfig): Toolbar {
        const cl = this.log.call('loadV9');
        let toolbarSettings = config.settings;

        // Default to empty toolbar settings if we don't have a toolbar or settings
        // important: the checks look a bit strange, but there are cases where {} settings are handed in
        // and we can't count the keys because that would result in other checks
        if (Object.keys(config.toolbar).length > 0 && toolbarSettings === ({} as ToolbarSettings)) {
            cl.add('no data or settings, will use default settings for empty');
            toolbarSettings = ToolbarSettings.getForEmpty();
        }

        // if it has an action or is an array, keep that. Otherwise get standard buttons
        const draftToolbar = this.getTemplateIfNoButtonsSpecified(config.toolbar as InPageToolbarConfigVariations);
        cl.data('after template check', draftToolbar);

        const toolbar = this.buildFullDefinition(context, draftToolbar, toolbarSettings);
        return cl.return(toolbar, 'ok');
    }


    /**
     * If the raw data has specs for what buttons, use that
     * Otherwise load the button list from the template
     */
    public getTemplateIfNoButtonsSpecified(raw: InPageToolbarConfigVariations): InPageToolbarConfigVariations {
        const cl = this.log.call('getTemplateIfNoButtonsSpecified');
        cl.add('initial', raw);

        if (InPageCommandJson.hasActions(raw)) return cl.return(raw, 'has actions, keep raw');
        if (ToolbarTemplate.hasGroups(raw)) return cl.return(raw, 'has groups, keep raw');
        if (ToolbarTemplateGroup.is(raw)) return cl.return(raw, 'is group, keep raw');
        if (Array.isArray(raw)) return cl.return(raw, 'is array, keep raw');

        // final: nothing defined, use template
        cl.add('no toolbar structure specified, will use standard toolbar template');
        const template = this.toolbar.templates.copy(ToolbarTemplateDefault.name);
        template.params = (Array.isArray(raw) && raw[0]) || raw; // attach parameters
        return cl.return(template, 'use template');
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
    public buildFullDefinition(
        toolbarContext: ContextComplete,
        unstructuredConfig: InPageToolbarConfigVariations,
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // instanceConfig: InstanceConfig,
        toolbarSettings: ToolbarSettings,
    ): Toolbar {
    const cl = this.log.call('buildFullDefinition');

    const configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;

    if (ToolbarTemplate.is(unstructuredConfig) && unstructuredConfig.debug)
        console.log('toolbar: detailed debug on; start build full Def');

    const result = this.toolbar.buildTreeAndModifyAccordingToRules(toolbarContext, configWip);
    return cl.return(result);
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
        newToolbar.settings = { ...ToolbarSettings.getDefaults(), ...probablyTemplate.settings, ...ToolbarSettings.dropEmptyProperties(toolbarSettings)};

        newToolbar.debug = probablyTemplate.debug || false; // show more debug info
        newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.

        return wrapLog.return(newToolbar);
    }



    private findGroups(unstructuredConfig: InPageToolbarConfigVariations): InPageButtonGroupJson[] { // ButtonGroupsWip {
        const cl = this.log.call('findGroups');
        cl.data('initial', unstructuredConfig);

        // case 0: nothing in the config
        if (!unstructuredConfig || unstructuredConfig === {})
            return cl.return([], 'case 0: empty object, use []');

        const arrGroups: InPageButtonGroupJson[] = []; // Array<InPageButtonJson | ButtonGroup>;

        // ensure that the groups are all correct
        cl.add('will detect what initial structure was given');

        // Case 2: Array
        if (Array.isArray(unstructuredConfig)) {
            cl.add('Case 2: is array');
            if (unstructuredConfig.length === 0)
                return cl.return([], '2a: empty array');
            if (Button.isArray(unstructuredConfig))
                return cl.return([{ buttons: unstructuredConfig }], '2b: array of groups');
            if (InPageButtonJson.is(unstructuredConfig[0]))
                return cl.return([{ buttons: unstructuredConfig as InPageButtonJson[]}], // Array<InPageButtonJson | ButtonGroup>;
                    '2b: is list of buttons, return 1 group');
            console.warn('error detecting groups in this toolbar');
            return cl.return([], "2x: error, it's array but can't detect type, use []");
        }

        // Case 3: not an array
        cl.add('Case 3: not array');
        if (InPageButtonJson.is(unstructuredConfig)) {
            return cl.return([ { buttons: [unstructuredConfig] }], 
                'Case 3a: not array, but has action/buttons properties, will wrap config into array');
        }

        cl.add('Case 3: not array and no "action", will return it or blank');
        // we either have groups already, or we'll return blank
        if (ToolbarTemplate.hasGroups(unstructuredConfig))
            return cl.return(unstructuredConfig.groups, '4: found groups');
        // else
        //     return cl.return([], 'no groups, return []');

        // ensure that arrays of actions or buttons are re-mapped to the right structure node
        // if (!arrGroups || !(arrGroups as any).length) {
        //     return cl.return([], 'not array or has no items, return empty array');
        // } else
        //     cl.add('its an object or array, use that');

        // if (ButtonGroup.isArray(arrGroups)) {
        //     return cl.return(arrGroups, 'detected buttons on first item, assume button-group, moving into .groups');
        // } else if (InPageButtonJson.isArray(arrGroups)) {
        //     return cl.return([{ buttons:  arrGroups } as InPageButtonGroupJson],
        //         'detected command or action on first item, assume buttons, move into .groups[buttons] ');
        // }

        cl.add('can\'t detect what this is - show warning');
        console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrGroups);
        return cl.return([], 'warning');
    }
}
