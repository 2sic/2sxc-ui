"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../logging/log");
var instance_config_1 = require("../../manage/instance-config");
var old_toolbar_settings_adapter_1 = require("../adapters/old-toolbar-settings-adapter");
var expand_button_config_1 = require("../button/expand-button-config");
var expand_group_config_1 = require("../button/expand-group-config");
var toolbar_config_1 = require("./toolbar-config");
var toolbar_settings_1 = require("./toolbar-settings");
var toolbar_config_templates_1 = require("./toolbar-config-templates");
function expandToolbarConfig(context, toolbarData, toolbarSettings, parentLog) {
    var log = new log_1.Log('Tlb.ExpTop', parentLog, 'expand start');
    if (toolbarData === {} && toolbarSettings === {}) {
        log.add('no data or settings found, will use default toolbar');
        toolbarSettings = toolbar_settings_1.settingsForEmptyToolbar;
    }
    // if it has an action or is an array, keep that. Otherwise get standard buttons
    toolbarData = toolbarData || {}; // if null/undefined, use empty object
    var unstructuredConfig = toolbarData;
    if (!toolbarData.action && !toolbarData.groups && !toolbarData.buttons && !Array.isArray(toolbarData)) {
        log.add('no toolbar details found, will use standard toolbar template');
        var toolbarTemplate = toolbar_config_templates_1.ToolbarConfigTemplates.Instance(log).get('default'); // use default toolbar template
        unstructuredConfig = JSON.parse(JSON.stringify(toolbarTemplate)); // deep copy toolbar template
        unstructuredConfig.params = ((toolbarData) && Array.isArray(toolbarData) && toolbarData[0]) || toolbarData; // these are the default command parameters
    }
    var instanceConfig = instance_config_1.InstanceConfig.fromContext(context);
    // whatever we had, if more settings were provided, override with these...
    var config = buildFullDefinition(context, unstructuredConfig, instanceConfig, toolbarSettings, log);
    log.add('expand done');
    return config;
}
exports.expandToolbarConfig = expandToolbarConfig;
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
function buildFullDefinition(toolbarContext, unstructuredConfig, instanceConfig, toolbarSettings, parentLog) {
    var log = new log_1.Log('Tlb.BldFul', parentLog, 'start');
    var fullConfig = ensureDefinitionTree(unstructuredConfig, toolbarSettings, log);
    // ToDo: don't use console.log in production
    if (unstructuredConfig.debug)
        console.log('toolbar: detailed debug on; start build full Def');
    expand_group_config_1.expandButtonGroups(fullConfig, log);
    expand_button_config_1.removeDisableButtons(toolbarContext, fullConfig, instanceConfig, log);
    if (fullConfig.debug)
        console.log('after remove: ', fullConfig);
    expand_button_config_1.customize(fullConfig);
    return fullConfig;
}
;
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
function ensureDefinitionTree(unstructuredConfig, toolbarSettings, parentLog) {
    var log = new log_1.Log("Tlb.DefTre", parentLog, "start");
    // original is null/undefined, just return empty set
    if (!unstructuredConfig)
        throw ("preparing toolbar, with nothing to work on: " + unstructuredConfig);
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
            unstructuredConfig.groups = unstructuredConfig; // move "down"
        }
        else if (unstructuredConfig[0].command || unstructuredConfig[0].action) {
            log.add('detected command or action on first item, assume buttons, move into .groups[buttons] ');
            unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
        }
        else {
            log.add('can\'t detect what this is - show warning');
            console.warn("toolbar tried to build toolbar but couldn't detect type of this:", unstructuredConfig);
        }
    }
    else
        log.add('not array or has no items');
    var toolbarConfig = new toolbar_config_1.ToolbarConfig();
    // toolbarConfig.groupConfig = new GroupConfig(original.groups as ButtonConfig[]);
    toolbarConfig.groups = unstructuredConfig.groups || []; // the groups of buttons
    toolbarConfig.params = unstructuredConfig.params || {}; // these are the default command parameters
    toolbarConfig.settings = Object.assign({}, toolbar_settings_1.defaultToolbarSettings, unstructuredConfig.settings, old_toolbar_settings_adapter_1.oldToolbarSettingsAddapter(toolbarSettings));
    // todo: old props, remove
    toolbarConfig.name = unstructuredConfig.name || 'toolbar'; // name, no real use
    toolbarConfig.debug = unstructuredConfig.debug || false; // show more debug info
    toolbarConfig.defaults = unstructuredConfig.defaults || {}; // the button defaults like icon, etc.
    log.add('done');
    return toolbarConfig;
}
;
//#endregion initial toolbar object
//# sourceMappingURL=toolbar-expand-config.js.map