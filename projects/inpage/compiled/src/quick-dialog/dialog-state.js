"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sessionstoragehelper = require("../manage/session-storage-helper");
var SessionStorageHelper = Sessionstoragehelper.SessionStorageHelper;
var SessionStateHandler = /** @class */ (function () {
    function SessionStateHandler(key) {
        this.key = key;
    }
    SessionStateHandler.prototype.set = function (value) { sessionStorage.setItem(this.key, value); };
    ;
    SessionStateHandler.prototype.remove = function () { sessionStorage.removeItem(this.key); };
    SessionStateHandler.prototype.get = function () { return SessionStorageHelper.getItemValue(this.key); };
    return SessionStateHandler;
}());
/**
 * This object helps persist / load / reset
 * the info which content-block should be shown in the quick-edit
 * */
exports.quickEditState = new SessionStateHandler('dia-cbid');
exports.quickEditCancelled = new SessionStateHandler('cancelled-dialog');
//  {
//  persist: (id: string) => sessionStorage.setItem(dialogContentBlockId, id),
//  remove: () => sessionStorage.removeItem(dialogContentBlockId),
//  get: (): number => SessionStorageHelper.getItemValue<number>(dialogContentBlockId)
//}
//# sourceMappingURL=dialog-state.js.map