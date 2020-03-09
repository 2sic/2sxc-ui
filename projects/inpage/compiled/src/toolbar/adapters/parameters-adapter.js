"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parametersAdapter(oldParameters) {
    var newParams = oldParameters;
    // some clean-up
    delete newParams.action; // remove the action property
    return newParams;
}
exports.parametersAdapter = parametersAdapter;
//# sourceMappingURL=parameters-adapter.js.map