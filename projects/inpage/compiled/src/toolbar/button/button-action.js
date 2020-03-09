"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonAction = /** @class */ (function () {
    function ButtonAction(name, contentType, params) {
        this.name = name;
        this.params = params;
        if (!params) {
            this.params = {};
        }
        if (contentType) {
            Object.assign(this.params, { contentType: contentType });
        }
    }
    return ButtonAction;
}());
exports.ButtonAction = ButtonAction;
//# sourceMappingURL=button-action.js.map