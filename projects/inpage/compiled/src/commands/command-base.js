"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expand_button_config_1 = require("../toolbar/button/expand-button-config");
var command_definition_1 = require("./command-definition");
var commands_1 = require("./commands");
var CommandBase = /** @class */ (function () {
    function CommandBase() {
        this.commandDefinition = new command_definition_1.CommandDefinition();
    }
    // quick helper so we can better debug the creation of definitions
    CommandBase.prototype.makeDef = function (name, translateKey, icon, uiOnly, partOfPage, more) {
        if (typeof (partOfPage) !== 'boolean') {
            throw 'partOfPage in commands not provided, order will be wrong!';
        }
        // Toolbar API v2
        this.commandDefinition.name = name;
        this.commandDefinition.buttonConfig = expand_button_config_1.getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more);
        this.registerInCatalog();
    };
    /** register new CommandDefinition with in Commands */
    CommandBase.prototype.registerInCatalog = function () {
        commands_1.Commands.getInstance().addDef(this.commandDefinition);
    };
    return CommandBase;
}());
exports.CommandBase = CommandBase;
//# sourceMappingURL=command-base.js.map