"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ReSharper disable once UnusedParameter
function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 1; i < arguments.length; i++)
        for (var key in arguments[i])
            if (arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}
exports.extend = extend;
//# sourceMappingURL=2sxc._lib.extend.js.map