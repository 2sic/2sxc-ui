"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GroupConfig = /** @class */ (function () {
    function GroupConfig(buttons) {
        this.buttons = []; // array of buttons
        this.defaults = []; // v1
        // adds these to the items
        this.buttons = buttons;
    }
    GroupConfig.fromNameAndParams = function (name, params) {
        var groupConfig = new GroupConfig([]);
        // builds buttons from name and params, then adds
        return groupConfig;
    };
    return GroupConfig;
}());
exports.GroupConfig = GroupConfig;
//# sourceMappingURL=group-config.js.map