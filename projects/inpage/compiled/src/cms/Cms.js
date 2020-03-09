"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("../commands/engine");
var has_log_1 = require("../logging/has-log");
var log_1 = require("../logging/log");
var context_1 = require("../context/context");
var context_of_instance_1 = require("../context/context-of-instance");
var DebugConfig_1 = require("../DebugConfig");
var logId = 'Cms.Api';
var Cms = /** @class */ (function (_super) {
    __extends(Cms, _super);
    function Cms() {
        var _this = _super.call(this, logId, null) || this;
        /**
         * if true (default) will reset the log everytime something is done
         * if false, will preserve the log over multiple calls
         */
        _this.autoReset = true;
        _this.autoDump = DebugConfig_1.DebugConfig.cms.autoDump;
        return _this;
    }
    /**
     * reset / clear the log
     */
    Cms.prototype.resetLog = function () {
        this.log = new log_1.Log(logId, null, 'log was reset');
    };
    ;
    Cms.prototype.run = function (context, nameOrSettings, eventOrSettings, event) {
        var _this = this;
        var realContext = (context_of_instance_1.isContextOfInstance(context))
            ? context
            : context_1.context(context);
        return this.do(function () { return new engine_1.Engine(_this.log)
            .detectParamsAndRun(realContext, nameOrSettings, eventOrSettings, event); });
    };
    /**
     * reset/clear the log if alwaysResetLog is true
     */
    Cms.prototype.do = function (innerCall) {
        if (this.autoReset)
            this.resetLog();
        //console.log('before');
        var result = innerCall();
        //console.log('after');
        if (this.autoDump)
            console.log(this.log.dump());
        return result;
    };
    return Cms;
}(has_log_1.HasLog));
exports.Cms = Cms;
//# sourceMappingURL=Cms.js.map