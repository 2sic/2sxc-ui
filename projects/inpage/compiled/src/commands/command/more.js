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
var Constants = require("../../constants");
/**
 * import this module to commands.ts
 */
var More = /** @class */ (function (_super) {
    __extends(More, _super);
    function More() {
        var _this = _super.call(this) || this;
        _this.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
            code: function (context, event) {
                return new Promise(function (resolve, reject) {
                    var btn2 = event.target;
                    var fullMenu2 = btn2.closest('ul.sc-menu');
                    var oldState2 = Number(fullMenu2.getAttribute('data-state') || 0);
                    var max2 = Number(fullMenu2.getAttribute('group-count'));
                    var newState2 = (oldState2 + 1) % max2;
                    fullMenu2.classList.remove("group-" + oldState2);
                    fullMenu2.classList.add("group-" + newState2);
                    fullMenu2.setAttribute('data-state', String(newState2));
                    event.preventDefault();
                    function mouseenterHandler(e) {
                        fullMenu2.style.opacity = '1';
                    }
                    function mouseleaveHandler(e) {
                        if (e.screenX != 0 && e.screenY != 0) {
                            // hide toolbar on mouseleave
                            fullMenu2.style.opacity = '0';
                        }
                        else {
                            // this is fix for Chrome issue
                            // ensure to show toolbar because X=0 and Y=0
                            fullMenu2.style.opacity = '1';
                            console.warn('workaround for toolbar hide onmouseleave issue', e.screenX, e.screenY, e.target);
                        }
                    }
                    // because of issue in Chrome we need to override CSS rules in edit.css for toolbar toggle on mouse hover
                    var scElement = fullMenu2.closest('.' + Constants.toolbar.classes.oldHover);
                    // add mouseenter and mouseleave events to parent sc-element if not already added
                    if (scElement && fullMenu2.getAttribute('listener') !== 'true') {
                        scElement.addEventListener('mouseenter', mouseenterHandler);
                        scElement.addEventListener('mouseleave', mouseleaveHandler);
                        fullMenu2.setAttribute('listener', 'true'); // flag that events are added
                    }
                    resolve();
                });
            },
        });
        return _this;
    }
    return More;
}(command_base_1.CommandBase));
exports.More = More;
// ReSharper disable once UnusedLocals
var cmd = new More();
//# sourceMappingURL=more.js.map