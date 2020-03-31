"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var positioning_1 = require("./positioning");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
function enable() {
    // build all toolbar html-elements
    quick_e_1.prepareToolbarInDom();
    // Cache the panes (because panes can't change dynamically)
    initPanes();
}
/**
 * start watching for mouse-move
 */
function watchMouse() {
    var refreshTimeout = null;
    $('body').on('mousemove', function (e) {
        if (refreshTimeout === null)
            refreshTimeout = window.setTimeout(function () {
                requestAnimationFrame(function () {
                    positioning_1.refresh(e);
                    refreshTimeout = null;
                });
            }, 20);
    });
}
function start() {
    try {
        config_1._readPageConfig();
        if (quick_e_1.$quickE.config.enable) {
            // initialize first body-offset
            quick_e_1.$quickE.bodyOffset = positioning_1.getBodyPosition();
            enable();
            toggleParts();
            watchMouse();
        }
    }
    catch (e) {
        console.error("couldn't start quick-edit", e);
    }
}
exports.start = start;
/**
 * cache the panes which can contain modules
 */
function initPanes() {
    quick_e_1.$quickE.cachedPanes = $(selectors_instance_1.selectors.mod.listSelector);
    quick_e_1.$quickE.cachedPanes.addClass('sc-cb-pane-glow');
}
/**
 * enable/disable module/content-blocks as configured
 */
function toggleParts() {
    //// content blocks actions
    // quickE.cbActions.toggle(quickE.config.innerBlocks.enable);
    //// module actions
    // quickE.modActions.hide(quickE.config.modules.enable);
}
/**
 * reset the quick-edit
 * for example after ajax-loading a content-block, which may cause changed configurations
 */
function reset() {
    config_1._readPageConfig();
    toggleParts();
}
exports.reset = reset;
//# sourceMappingURL=start.js.map