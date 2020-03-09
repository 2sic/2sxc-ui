"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../../commands/commands");
var parameters_adapter_1 = require("../adapters/parameters-adapter");
var settings_adapter_1 = require("../adapters/settings-adapter");
var button_action_1 = require("./button-action");
var button_config_1 = require("./button-config");
var expand_button_config_1 = require("./expand-button-config");
var log_1 = require("../../logging/log");
var flatten_action_definition_1 = require("../adapters/flatten-action-definition");
/**
 * this will traverse a groups-tree and expand each group
 * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
 * @param fullToolbarConfig
 */
function expandButtonGroups(fullToolbarConfig, parentLog) {
    var log = new log_1.Log('Tlb.ExpGrp', parentLog, 'start');
    var actions = commands_1.Commands.getInstance();
    // by now we should have a structure, let's check/fix the buttons
    log.add("will expand groups - found " + fullToolbarConfig.groups.length + " items");
    for (var g = 0; g < fullToolbarConfig.groups.length; g++) {
        // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
        expandButtonList(fullToolbarConfig.groups[g], fullToolbarConfig.settings, log);
        // fix all the buttons
        var btns = fullToolbarConfig.groups[g].buttons;
        var buttonConfigs = [];
        if (Array.isArray(btns)) {
            log.add("will process " + btns.length + " buttons");
            for (var b = 0; b < btns.length; b++) {
                var btn = btns[b];
                if (!(actions.get(btn.command.action))) {
                    log.add("couldn't find action " + btn.command.action + " - show warning");
                    console.warn('warning: toolbar-button with unknown action-name:', btn.command.action);
                }
                var name_1 = btn.command.action;
                var contentType = btn.command.contentType;
                // if the button belongs to a content-item, move the specs up to the item into the settings-object
                flatten_action_definition_1.flattenActionDefinition(btn.command);
                // parameters adapter from v1 to v2
                var params = parameters_adapter_1.parametersAdapter(btn.command);
                Object.assign(params, fullToolbarConfig.params);
                // Toolbar API v2
                var newButtonAction = new button_action_1.ButtonAction(name_1, contentType, params);
                newButtonAction.commandDefinition = actions.get(name_1);
                var newButtonConfig = new button_config_1.ButtonConfig(newButtonAction);
                newButtonConfig.name = name_1;
                // settings adapter from v1 to v2
                var settings = settings_adapter_1.settingsAdapter(btn);
                Object.assign(newButtonConfig, settings);
                expand_button_config_1.addDefaultBtnSettings(newButtonConfig, fullToolbarConfig.groups[g], fullToolbarConfig, actions, log); // ensure all buttons have either own settings, or the fallback
                buttonConfigs.push(newButtonConfig);
            }
        }
        else
            log.add("no button array found, won't do anything");
        // Toolbar API v2 overwrite V1
        fullToolbarConfig.groups[g].buttons = buttonConfigs;
    }
}
exports.expandButtonGroups = expandButtonGroups;
/**
 * take a list of buttons (objects OR strings)
 * and convert to proper array of buttons with actions
 * on the in is a object with buttons, which are either:
 * - a string like "edit" or multi-value "layout,more"
 * - an array of such strings incl. optional complex objects which are
 * @param root
 * @param settings
 */
function expandButtonList(root, settings, parentLog) {
    var log = new log_1.Log('Tlb.ExpBts', parentLog, 'start');
    // let root = grp; // the root object which has all params of the command
    var btns = [];
    var sharedProperties = null;
    // convert compact buttons (with multi-verb action objects) into own button-objects
    // important because an older syntax allowed {action: "new,edit", entityId: 17}
    if (Array.isArray(root.buttons)) {
        log.add("detected array of btns (" + root.buttons.length + "), will ensure it's an object");
        for (var b = 0; b < root.buttons.length; b++) {
            var btn = root.buttons[b];
            var actionString = btn.action;
            if (typeof actionString === 'string' && actionString.indexOf(',') > -1) {
                log.add("button def \"" + btn + " is string of many names, will expand into array with action-properties\"");
                var acts = actionString.split(',');
                for (var a = 0; a < acts.length; a++) {
                    btns.push($.extend(true, {}, btn, { action: acts[a] }));
                }
            }
            else {
                btns.push(btn);
            }
        }
    }
    else if (typeof root.buttons === 'string') {
        log.add("detected that it is a string \"" + root.buttons + "\", will split by \",\" and ...");
        btns = root.buttons.split(',');
        sharedProperties = Object.assign({}, root); // inherit all fields used in the button
        delete sharedProperties.buttons; // this one's not needed
        delete sharedProperties.name; // this one's not needed
        delete sharedProperties.action; //
    }
    else {
        log.add("no special case detected, will use the buttons-object as is");
        btns = root.buttons;
    }
    log.add("after check, found " + btns.length + " buttons");
    // optionally add a more-button in each group
    if (settings.autoAddMore) {
        if ((settings.autoAddMore === 'end')
            || (settings.autoAddMore.toString() === 'right') // fallback for older v1 setting
        ) {
            log.add('will add a more "..." button to end');
            btns.push('more');
        }
        else {
            log.add('will add a more "..." button to start');
            btns.unshift('more');
        }
    }
    else {
        log.add('will not add more "..." button');
    }
    // add each button - check if it's already an object or just the string
    for (var v = 0; v < btns.length; v++) {
        btns[v] = expand_button_config_1.expandButtonConfig(btns[v], sharedProperties, log);
        // todo: refactor this out, not needed any more as they are all together now
        // btns[v].group = root;// grp;    // attach group reference, needed for fallback etc.
    }
    root.buttons = btns; // ensure the internal def is also an array now
    log.add('done');
}
//# sourceMappingURL=expand-group-config.js.map