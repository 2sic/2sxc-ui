"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entry = /** @class */ (function () {
    function Entry(log, message) {
        var _this = this;
        this.log = log;
        this.message = message;
        this.source = function () { return _this.log.fullIdentifier(); };
    }
    return Entry;
}());
exports.Entry = Entry;
//# sourceMappingURL=entry.js.map