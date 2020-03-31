"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
var HasLog = /** @class */ (function () {
    /**
     * initialize the logger
     * ideally it has a parent-logger to attach to
     * @param logName name to show in the logger
     * @param parentLog parent-logger to attach to
     * @param initialMessage optional start-message to log
     */
    function HasLog(logName, parentLog, initialMessage) {
        var _this = this;
        this.parentLog = parentLog;
        this.initLog = function (name, parentLog, initialMessage) { return _this.initLogInternal(name, parentLog, initialMessage); };
        this.logId = 'unknwn';
        this.linkLog = function (parentLog) { return _this.log.linkLog(parentLog); };
        this.initLogInternal(logName, parentLog, initialMessage);
    }
    HasLog.prototype.initLogInternal = function (name, parentLog, initialMessage) {
        if (this.log == null)
            // standard & most common case: just create log
            this.log = new log_1.Log(name, parentLog, initialMessage);
        else {
            // late-init case, where the log was already created - just reconfig keeping what was in it
            this.log.rename(name);
            this.linkLog(parentLog);
            if (initialMessage != null)
                this.log.add(initialMessage);
        }
    };
    return HasLog;
}());
exports.HasLog = HasLog;
//# sourceMappingURL=has-log.js.map