import { ContextOfButton } from '../../context/context-of-button';
import { Log } from '../../logging/log';
import { InstanceConfig } from '../../manage/instance-config';
import { oldToolbarSettingsAddapter } from '../adapters/old-toolbar-settings-adapter';
import { customize, removeDisableButtons } from '../button/expand-button-config';
import { expandButtonGroups } from '../button/expand-group-config';
import { ToolbarConfig } from './toolbar-config';
import { ToolbarConfigTemplates } from './toolbar-config-templates';
import { defaultToolbarSettings, settingsForEmptyToolbar, ToolbarSettings } from './toolbar-settings';

export function expandToolbarConfig(context: ContextOfButton, toolbarData: any, toolbarSettings: ToolbarSettings, parentLog?: Log): ToolbarConfig {
  const log = new Log('Tlb.ExpTop', parentLog, 'expand start');

  if (toolbarData === {} && toolbarSettings === ({} as ToolbarSettings)) {
    log.add('no data or settings found, will use default toolbar');
    toolbarSettings = settingsForEmptyToolbar;
  }

  // if it has an action or is an array, keep that. Otherwise get standard buttons
  toolbarData = toolbarData || {}; // if null/undefined, use empty object

  let unstructuredConfig = toolbarData;
  if (!toolbarData.action && !toolbarData.groups && !toolbarData.buttons && !Array.isArray(toolbarData)) {
    log.add('no toolbar details found, will use standard toolbar template');
    const toolbarTemplate = ToolbarConfigTemplates.Instance(log).get('default'); // use default toolbar template
    unstructuredConfig = JSON.parse(JSON.stringify(toolbarTemplate)); // deep copy toolbar template
    unstructuredConfig.params = ((toolbarData) && Array.isArray(toolbarData) && toolbarData[0]) || toolbarData; // these are the default command parameters
  }

  const instanceConfig = InstanceConfig.fromContext(context);

  // whatever we had, if more settings were provided, override with these...
  const config = buildFullDefinition(context, unstructuredConfig, instanceConfig, toolbarSettings, log);

  log.add('expand done');
  return config;
}

/**
 * take any common input format and convert it to a full toolbar-structure definition
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
function buildFullDefinition(toolbarContext: ContextOfButton, unstructuredConfig: any, instanceConfig: InstanceConfig, toolbarSettings: ToolbarSettings, parentLog: Log) {
  const log = new Log('Tlb.BldFul', parentLog, 'start');
  const fullConfig = ensureDefinitionTree(unstructuredConfig, toolbarSettings, log);

  // ToDo: don't use console.log in production
  if (unstructuredConfig.debug) console.log('toolbar: detailed debug on; start build full Def');

  expandButtonGroups(fullConfig, log);

  removeDisableButtons(toolbarContext, fullConfig, instanceConfig, log);

  if (fullConfig.debug) console.log('after remove: ', fullConfig);

  customize(fullConfig);

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
function ensureDefinitionTree(unstructuredConfig: any, toolbarSettings: ToolbarSettings, parentLog: Log): ToolbarConfig {
  const log = new Log('Tlb.DefTre', parentLog, 'start');
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

  const toolbarConfig = new ToolbarConfig();
  // toolbarConfig.groupConfig = new GroupConfig(original.groups as ButtonConfig[]);
  toolbarConfig.groups = unstructuredConfig.groups || []; // the groups of buttons
  toolbarConfig.params = unstructuredConfig.params || {}; // these are the default command parameters
  toolbarConfig.settings = Object.assign({}, defaultToolbarSettings, unstructuredConfig.settings, oldToolbarSettingsAddapter(toolbarSettings)) as ToolbarSettings;

  // todo: old props, remove
  toolbarConfig.name = unstructuredConfig.name || 'toolbar'; // name, no real use
  toolbarConfig.debug = unstructuredConfig.debug || false; // show more debug info
  toolbarConfig.defaults = unstructuredConfig.defaults || {}; // the button defaults like icon, etc.

  log.add('done');
  return toolbarConfig;
}
//#endregion initial toolbar object
