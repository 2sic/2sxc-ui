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
var command_base_1 = require("../command-base");
/**
 * import this module to commands.ts
 */
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom() {
        var _this = _super.call(this) || this;
        _this.makeDef('custom', 'Custom', 'bomb', true, false, {
            code: function (context, event) {
                return new Promise(function (resolve, reject) {
                    console.log('custom action with code - BETA feature, may change');
                    if (!context.button.action.params.customCode) {
                        console.warn('custom code action, but no onclick found to run', context.button.action.params);
                        resolve();
                    }
                    try {
                        var fn = new Function('context', 'event', context.button.action.params.customCode); // jshint ignore:line
                        resolve(fn(context, event));
                    }
                    catch (err) {
                        console.error('error in custom button-code: ', context.button.action.params);
                        reject(err);
                    }
                });
            },
        });
        return _this;
    }
    return Custom;
}(command_base_1.CommandBase));
exports.Custom = Custom;
// ReSharper disable once UnusedLocals
var cmd = new Custom();
//# sourceMappingURL=custom.js.map