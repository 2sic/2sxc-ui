"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DebugConfig_1 = require("../DebugConfig");
/**
 * This object helps persist / load / reset
 * a setting in the session-state
 * */
var SessionStateHandler = /** @class */ (function () {
    function SessionStateHandler(key) {
        this.key = key;
    }
    SessionStateHandler.prototype.set = function (value) {
        if (DebugConfig_1.DebugConfig.state.change)
            console.log("state '" + this.key + "' set(" + value + ")");
        sessionStorage.setItem(this.key, value);
    };
    ;
    SessionStateHandler.prototype.remove = function () {
        if (DebugConfig_1.DebugConfig.state.change)
            console.log("state '" + this.key + "' remove()");
        sessionStorage.removeItem(this.key);
    };
    SessionStateHandler.prototype.get = function () {
        var result = SessionStorageHelper.getItemValue(this.key);
        if (DebugConfig_1.DebugConfig.state.get)
            console.log("state '" + this.key + "' get() = '" + result + "'");
        return result;
    };
    return SessionStateHandler;
}());
exports.SessionStateHandler = SessionStateHandler;
/**
 * session storage helper to get typed values from it
 */
var SessionStorageHelper = /** @class */ (function () {
    function SessionStorageHelper() {
    }
    SessionStorageHelper.getItemValueString = function (key) {
        var value = sessionStorage.getItem(key);
        return value;
    };
    SessionStorageHelper.getItemValue = function (key) {
        var value = sessionStorage.getItem(key);
        return JSON.parse(value);
    };
    return SessionStorageHelper;
}());
//# sourceMappingURL=session-state-handler.js.map