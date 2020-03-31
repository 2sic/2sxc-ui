"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * local storage helper to get typed values from it
 */
var LocalStorageHelper = /** @class */ (function () {
    function LocalStorageHelper() {
    }
    LocalStorageHelper.getItemValueString = function (key) {
        var value = localStorage.getItem(key);
        return value;
    };
    LocalStorageHelper.getItemValue = function (key) {
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    };
    return LocalStorageHelper;
}());
exports.LocalStorageHelper = LocalStorageHelper;
//# sourceMappingURL=local-storage-helper.js.map