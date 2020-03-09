"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.SessionStorageHelper = SessionStorageHelper;
//# sourceMappingURL=session-storage-helper.js.map