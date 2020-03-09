"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Iframebridge = require("./iframe-bridge");
var ContainerSize = require("./container-size");
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
var containerClass = 'inpage-frame-wrapper';
var iframeClass = 'inpage-frame';
var iframeTag = 'iframe';
var containerTemplate = "<div class=\"" + containerClass + "\"><div class=\"" + iframeClass + "\"></div></div>";
/**
 * get the current container
 * @returns {element} html element of the div
 */
function getOrCreate() {
    var container = $("." + containerClass);
    return container.length > 0 ? container : buildContainerAndIFrame();
}
exports.getOrCreate = getOrCreate;
/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
function getIFrame(container) {
    if (!container)
        container = getOrCreate();
    return container.find(iframeTag)[0];
}
exports.getIFrame = getIFrame;
/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame() {
    var container = $(containerTemplate);
    var newIFrame = document.createElement(iframeTag);
    var extendedIFrame = Iframebridge.build(newIFrame);
    container.find("." + iframeClass).append(extendedIFrame);
    $('body').append(container);
    ContainerSize.watchForResize(container);
    return container;
}
//# sourceMappingURL=container.js.map