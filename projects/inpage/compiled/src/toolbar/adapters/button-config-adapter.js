"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../../commands/commands");
var button_action_1 = require("../button/button-action");
var button_config_1 = require("../button/button-config");
var expand_button_config_1 = require("../button/expand-button-config");
var mod_config_1 = require("../button/mod-config");
var flatten_action_definition_1 = require("./flatten-action-definition");
var parameters_adapter_1 = require("./parameters-adapter");
function buttonConfigAdapter(context, actDef, groupIndex) {
    var partialButtonConfig = {};
    if (actDef.code) {
        partialButtonConfig.code = function (context) {
            var modConfig = new mod_config_1.ModConfig();
            // todo: stv find this data
            // modConfig.target = '';
            // modConfig.isList = false;
            return actDef.code(context.button.action.params, modConfig);
        };
    }
    if (actDef.icon) {
        partialButtonConfig.icon = function (context) {
            return "icon-sxc-" + actDef.icon;
        };
    }
    if (actDef.classes) {
        partialButtonConfig.classes = actDef.classes;
    }
    if (actDef.dialog) {
        partialButtonConfig.dialog = function (context) {
            return actDef.dialog;
        };
    }
    if (actDef.disabled) {
        partialButtonConfig.disabled = function (context) {
            return actDef.disabled;
        };
    }
    if (actDef.dynamicClasses) {
        partialButtonConfig.dynamicClasses = function (context) {
            return actDef.dynamicClasses(context.button.action.params);
        };
    }
    if (actDef.fullScreen) {
        partialButtonConfig.fullScreen = function (context) {
            return actDef.fullScreen;
        };
    }
    if (actDef.inlineWindow) {
        partialButtonConfig.inlineWindow = function (context) {
            return actDef.inlineWindow;
        };
    }
    if (actDef.name) {
        partialButtonConfig.name = actDef.name;
    }
    if (actDef.newWindow) {
        partialButtonConfig.newWindow = function (context) {
            return actDef.newWindow;
        };
    }
    if (actDef.params) {
        // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
        // we need parameter adapter to do this...
        Object.assign(partialButtonConfig.params, actDef.params);
    }
    if (actDef.partOfPage) {
        partialButtonConfig.partOfPage = function (context) {
            return actDef.partOfPage;
        };
    }
    if (actDef.showCondition) {
        partialButtonConfig.showCondition = function (context) {
            var modConfig = new mod_config_1.ModConfig();
            // todo: stv find this data
            // modConfig.target = '';
            // modConfig.isList = false;
            return actDef.showCondition(context.button.action.params, modConfig);
        };
    }
    if (actDef.title) {
        partialButtonConfig.title = function (context) {
            return "Toolbar." + actDef.title;
        };
    }
    if (actDef.uiActionOnly) {
        partialButtonConfig.uiActionOnly = function (context) {
            return actDef.uiActionOnly;
        };
    }
    actDef = (expand_button_config_1.expandButtonConfig(actDef, [], null));
    var name = actDef.command.action;
    var contentType = actDef.command.contentType;
    // if the button belongs to a content-item, move the specs up to the item into the settings-object
    flatten_action_definition_1.flattenActionDefinition(actDef.command);
    // parameters adapter from v1 to v2
    var params = parameters_adapter_1.parametersAdapter(actDef.command);
    // Toolbar API v2
    var actions = commands_1.Commands.getInstance();
    var newButtonAction = new button_action_1.ButtonAction(name, contentType, params);
    newButtonAction.commandDefinition = actions.get(name);
    var newButtonConfig = new button_config_1.ButtonConfig(newButtonAction);
    newButtonConfig.name = name;
    return newButtonConfig;
}
exports.buttonConfigAdapter = buttonConfigAdapter;
//# sourceMappingURL=button-config-adapter.js.map