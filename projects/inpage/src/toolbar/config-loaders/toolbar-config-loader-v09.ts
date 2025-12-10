import { InPageButtonGroupJson, InPageButtonJson, InPageCommandJson, ToolbarConfigLoader, ToolbarWip } from '.';
import { InPageToolbarConfigVariations, ToolbarInitConfig } from '..';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { ButtonConfiguration, Toolbar, ToolbarSettings } from '../config';
import { RuleManager } from '../rules';
import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateGroup, ToolbarTemplateSublist } from '../templates';


/**
 * @internal
 */
export class ToolbarConfigLoaderV09 extends HasLog {

  private rules: RuleManager;

  constructor(private configLoader: ToolbarConfigLoader) {
    super('Tlb.TlbV09', configLoader.log);
    this.rules = new RuleManager(configLoader);
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
    const draftToolbar = this.#getTemplateIfNoButtonsSpecified(context, config.toolbar as InPageToolbarConfigVariations);
    cl.data('after template check', draftToolbar);

    const toolbar = this.#buildFullDefinition(context, draftToolbar, toolbarSettings);
    return cl.return(toolbar, 'ok');
  }


  /**
   * If the raw data has specs for what buttons, use that
   * Otherwise load the button list from the template
   */
  #getTemplateIfNoButtonsSpecified(context: ContextComplete, raw: InPageToolbarConfigVariations): InPageToolbarConfigVariations {
    const cl = this.log.call('getTemplateIfNoButtonsSpecified');
    cl.add('initial', raw);

    if (InPageCommandJson.hasActions(raw))
      return cl.return(raw, 'has actions, keep raw');
    if (ToolbarTemplate.hasGroups(raw))
      return cl.return(raw, 'has groups, keep raw');
    if (ToolbarTemplateGroup.is(raw))
      return cl.return(raw, 'is group, keep raw');
    if (Array.isArray(raw))
      return cl.return(raw, 'is array, keep raw');

    // final: nothing defined, use template
    cl.add('no toolbar structure specified, will use standard toolbar template');
    // If it's a sub-list toolbar, use the special template for it
    const defToolbarname = (raw as InPageCommandJson).fields
      ? ToolbarTemplateSublist.name
      : ToolbarTemplateDefault.name;
    const template = this.configLoader.templates.copy(defToolbarname);
    template.params = (Array.isArray(raw) && raw[0]) || raw; // attach parameters

    // New 16.02 - add developer infos / buttons WIP
    this.rules.addDeveloperInfos(context);
    const addRules = this.rules.getAdd();
    this.configLoader.templateEditor.add(template, addRules);

    return cl.return(template, 'use template');
  }




  /**
   * take various common input format and convert it to a full toolbar-structure definition
   * can handle the following input formats (the param unstructuredConfig):
   * complete tree (detected by "groups): \{ groups: [ \{\}, \{\}], name: ..., defaults: \{...\} \}
   * group of buttons (detected by "buttons): \{ buttons: "..." | [], name: ..., ... \}
   * list of buttons (detected by IsArray with action): [ \{ action: "..." | []\}, \{ action: ""|[]\} ]
   * button (detected by "command"): \{ command: ""|[], icon: "..", ... \}
   * just a command (detected by "action"): \{ entityId: 17, action: "edit" \}
   * array of commands: [\{entityId: 17, action: "edit"\}, \{contentType: "blog", action: "new"\}]
   */
  #buildFullDefinition(
    toolbarContext: ContextComplete,
    unstructuredConfig: InPageToolbarConfigVariations,
    toolbarSettings: ToolbarSettings,
  ): Toolbar {
    const cl = this.log.call('buildFullDefinition');

    const configWip = this.ensureDefinitionTree(unstructuredConfig, toolbarSettings); // as unknown as Toolbar;

    if (ToolbarTemplate.is(unstructuredConfig) && unstructuredConfig.debug)
        console.log('toolbar: detailed debug on; start build full Def');

    const result = this.configLoader.buildTreeAndModifyAccordingToRules(toolbarContext, configWip);

    // New v16.02
    result.settings._rules = this.rules;

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
   */
  private ensureDefinitionTree(unstructuredConfig: InPageToolbarConfigVariations, toolbarSettings: ToolbarSettings): ToolbarWip {
    const l = this.log.call('ensureDefinitionTree');
    // original is null/undefined, just return empty set
    if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

    const newToolbar: ToolbarWip = new Toolbar();
    newToolbar.groups = this.#findGroups(unstructuredConfig);

    const probablyTemplate = unstructuredConfig as ToolbarTemplate;
    newToolbar.params = probablyTemplate.params || {}; // these are the default command parameters
    newToolbar.settings = { ...ToolbarSettings.getDefaults(), ...probablyTemplate.settings, ...ToolbarSettings.dropEmptyProperties(toolbarSettings)};

    newToolbar.debug = probablyTemplate.debug || false; // show more debug info
    newToolbar.defaults = probablyTemplate.defaults || {}; // the button defaults like icon, etc.

    return l.return(newToolbar);
  }


  #findGroups(unstructuredConfig: InPageToolbarConfigVariations): InPageButtonGroupJson[] {
    const l = this.log.call('findGroups');
    l.data('initial', unstructuredConfig);

    // case 0: nothing in the config
    if (!unstructuredConfig || (Object.getOwnPropertyNames(unstructuredConfig).length === 0))
      return l.return([], 'case 0: empty object, use []');

    const arrGroups: InPageButtonGroupJson[] = [];

    // ensure that the groups are all correct
    l.add('will detect what initial structure was given');

    // Case 2: Array
    if (Array.isArray(unstructuredConfig)) {
      l.add('Case 2: is array');
      if (unstructuredConfig.length === 0)
        return l.return([], '2a: empty array');
      if (ButtonConfiguration.isButtonArray(unstructuredConfig))
        return l.return([{ buttons: unstructuredConfig }], '2b: array of groups');
      if (InPageButtonJson.is(unstructuredConfig[0]))
        return l.return([{ buttons: unstructuredConfig as InPageButtonJson[]}],
          '2b: is list of buttons, return 1 group');
      console.warn('error detecting groups in this toolbar');
      return l.return([], "2x: error, it's array but can't detect type, use []");
    }

    // Case 3: not an array
    l.add('Case 3: not array');
    if (InPageButtonJson.is(unstructuredConfig)) {
      return l.return([ { buttons: [unstructuredConfig] }],
        'Case 3a: not array, but has action/buttons properties, will wrap config into array');
    }

    l.add('Case 3: not array and no "action", will return it or blank');
    // we either have groups already, or we'll return blank
    if (ToolbarTemplate.hasGroups(unstructuredConfig))
      return l.return(unstructuredConfig.groups, '4: found groups');

    l.add('can\'t detect what this is - show warning');
    console.warn("toolbar tried to build toolbar but couldn't detect type of this:", arrGroups);
    return l.return([], 'warning');
  }
}
