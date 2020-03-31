"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../../logging/log");
// takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
// ReSharper disable once UnusedParameter
function expandButtonConfig(original, sharedProps, parentLog) {
    var log = new log_1.Log('Tlb.ExpBtn', parentLog, 'start');
    // prevent multiple inits
    if (original._expanded || original.command) {
        log.add("already expanded, won't modify");
        return original;
    }
    ;
    // if just a name, turn into a command
    if (typeof original === 'string') {
        log.add("name \"" + original + "\" found, will re-map to .command.action");
        original = { command: { action: original.trim() } };
    }
    ;
    // if it's a command w/action, wrap into command + trim
    if (typeof original.action === 'string') {
        log.add("action found, will move down to .command");
        original.action = original.action.trim();
        original = { command: original };
    }
    // some clean-up
    delete original.action; // remove the action property
    original._expanded = true;
    log.add('done');
    return original;
}
exports.expandButtonConfig = expandButtonConfig;
function getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more) {
    // 
    // stv: v1 code
    var partialButtonConfig = {
        icon: function (context) { return "icon-sxc-" + icon; },
        title: function (context) { return "Toolbar." + translateKey; },
        uiActionOnly: function (context) { return uiOnly; },
        partOfPage: function (context) { return partOfPage; },
    };
    Object.assign(partialButtonConfig, more);
    return partialButtonConfig;
}
exports.getButtonConfigDefaultsV1 = getButtonConfigDefaultsV1;
// remove buttons which are not valid based on add condition
function removeDisableButtons(context, full, config, parentLog) {
    var log = new log_1.Log("Tlb.RmvDsb', parentLog, 'start remove disabled buttons for " + full.groups.length + " groups");
    var btnGroups = full.groups;
    for (var g = 0; g < btnGroups.length; g++) {
        var btns = btnGroups[g].buttons;
        removeUnfitButtons(context, btns, config, log);
        log.add('will disable appropriate buttons');
        disableButtons(context, btns, config);
        // remove the group, if no buttons left, or only "more"
        // if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === 'more'))
        if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === 'more')) {
            log.add("found no more buttons except for the \"more\" - will remove that too");
            btnGroups.splice(g--, 1);
        } // remove, and decrement counter
    }
}
exports.removeDisableButtons = removeDisableButtons;
function removeUnfitButtons(context, btns, config, log) {
    var removals = '';
    for (var i = 0; i < btns.length; i++) {
        // let add = btns[i].showCondition;
        // if (add !== undefined)
        //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
        // if (!evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
        context.button = btns[i];
        if (btns[i].action && !evalPropOrFunction(btns[i].showCondition, context, config, true)) {
            removals += "#" + i + " \"" + btns[i].action.name + "\"; ";
            btns.splice(i--, 1);
        }
    }
    if (removals)
        log.add("removed buttons: " + removals);
}
function disableButtons(context, btns, config) {
    for (var i = 0; i < btns.length; i++) {
        // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
        context.button = btns[i];
        if (btns[i].action) {
            btns[i].disabled = evalPropOrFunction(btns[i].disabled, context, config, false);
        }
        else {
            btns[i].disabled = (function (context) { return false; });
        }
    }
}
function evalPropOrFunction(propOrFunction, context, config, fallback) {
    if (propOrFunction === undefined || propOrFunction === null) {
        return fallback;
    }
    if (typeof (propOrFunction) === 'function') {
        return propOrFunction(context, config);
    }
    else {
        return propOrFunction;
    }
}
/**
 * enhance button-object with default icons, etc.
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 */
function addDefaultBtnSettings(btn, group, fullToolbarConfig, actions, log) {
    // log.add(`adding default btn settings for ${btn.action.name}`);
    log.add("adding default btn settings for " + function () { return btn.action.name; });
    for (var d = 0; d < btnProperties.length; d++) {
        fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
    }
}
exports.addDefaultBtnSettings = addDefaultBtnSettings;
var btnProperties = [
    'classes',
    'icon',
    'title',
    'dynamicClasses',
    'showCondition',
    'disabled'
];
var prvProperties = [
    'defaults',
    'params',
    'name'
];
/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn, group, fullToolbarConfig, actions, propName) {
    if (btn[propName]) {
        // if already defined, use the already defined property
        btn[propName] = btn[propName];
    }
    else if (group.defaults &&
        group.defaults[propName]) {
        // if the group has defaults, try use that property
        btn[propName] = group.defaults[propName];
    }
    else if (fullToolbarConfig &&
        fullToolbarConfig.defaults &&
        fullToolbarConfig.defaults[propName]) {
        // if the toolbar has defaults, try use that property
        btn[propName] = fullToolbarConfig.defaults[propName];
    }
    else if (btn.action &&
        btn.action.name &&
        actions.get(btn.action.name) &&
        actions.get(btn.action.name).buttonConfig &&
        actions.get(btn.action.name).buttonConfig[propName]) {
        // if there is an action, try to use that property name
        btn[propName] = actions.get(btn.action.name).buttonConfig[propName];
    }
}
// ReSharper disable once UnusedParameter
function customize(toolbar) {
    // if (!toolbar.settings) return;
    // let set = toolbar.settings;
    // if (set.autoAddMore) {
    //    console.log("auto-more");
    //    let grps = toolbar.groups;
    //    for (let g = 0; g < grps.length; g++) {
    //        let btns = grps[g];
    //        for (let i = 0; i < btns.length; i++) {
    //        }
    //    }
    // }
}
exports.customize = customize;
//# sourceMappingURL=expand-button-config.js.map