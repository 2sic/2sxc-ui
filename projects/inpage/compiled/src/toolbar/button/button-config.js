"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonConfig = /** @class */ (function () {
    function ButtonConfig(action, partialConfig) {
        this.name = '';
        this.classes = '';
        this.show = null; // maybe
        this.dynamicDisabled = function () { return false; }; // maybe
        if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
            this.action = action;
            // get defaults from action commandDefinition
            Object.assign(this, action.commandDefinition.buttonConfig);
        }
        if (partialConfig) {
            Object.assign(this, partialConfig);
        }
    }
    return ButtonConfig;
}());
exports.ButtonConfig = ButtonConfig;
//# sourceMappingURL=button-config.js.map