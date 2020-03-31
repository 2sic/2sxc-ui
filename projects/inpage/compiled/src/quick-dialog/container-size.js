"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container = require("./container");
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
var isFullscreen = false;
/**
 * set container css for size
 * @param {boolean} fullScreen
 */
function setSize(fullScreen) {
    var container = Container.getOrCreate();
    // set container height
    container.css('min-height', fullScreen ? '100%' : '225px');
    isFullscreen = fullScreen;
}
exports.setSize = setSize;
var resizeInterval = 200;
var resizeWatcher = null;
/**
 * create watcher which monitors the iframe size and adjusts the container as needed
 */
function watchForResize(container) {
    if (!resizeWatcher) // only add a timer if not already running
        resizeWatcher = window.setInterval(function () {
            try {
                var frm = Container.getIFrame(container);
                if (!frm)
                    return;
                var height = frm.contentDocument.body.offsetHeight;
                if (frm.previousHeight === height)
                    return;
                frm.style.minHeight = container.css('min-height');
                frm.style.height = height + 'px';
                frm.previousHeight = height;
                if (isFullscreen) {
                    frm.style.height = '100%';
                    frm.style.position = 'absolute';
                }
            }
            catch (e) {
                // ignore
            }
        }, resizeInterval);
}
exports.watchForResize = watchForResize;
//# sourceMappingURL=container-size.js.map