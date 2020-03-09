"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function oldParametersAdapter(action) {
    var params = {};
    if (action) {
        if (action.name) {
            params.action = action.name;
        }
        if (action.params) {
            Object.assign(params, action.params);
        }
    }
    return params;
}
exports.oldParametersAdapter = oldParametersAdapter;
//# sourceMappingURL=old-parameters-adapter.js.map