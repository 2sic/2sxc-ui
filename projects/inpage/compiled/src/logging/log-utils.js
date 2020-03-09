"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
/**
 * logDump - to write whole log to console if is enabled
 */
var LogUtils = /** @class */ (function () {
    function LogUtils() {
    }
    /**
     * Dump log to console, when debug logging is enabled by url query string parameters
     * @param log
     */
    LogUtils.logDump = function (log) {
        // 'jslog' is additional query string url parameter, to enable log dump (debug=true is required)
        // in the future would support more variations like jslog = toolbar etc.
        var jsLogUrlParam = sxc_controller_in_page_1.$2sxcInPage.urlParams.get('jslog');
        //if ($2sxc.debug.load) {
        //  console.log(log.dump());
        //}
        if (jsLogUrlParam) {
            console.log(log.dump());
        }
    };
    return LogUtils;
}());
exports.LogUtils = LogUtils;
//# sourceMappingURL=log-utils.js.map