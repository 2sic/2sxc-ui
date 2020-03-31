"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * get edit-context info of html element or sxc-object
 * @param {SxcInstanceWithInternals} sxc
 * @param {HTMLElement} htmlElement
 * @return {DataEditContext} edit context info
 */
function getEditContext(sxc, htmlElement) {
    var editContextTag;
    if (htmlElement) {
        editContextTag = getContainerTag(htmlElement);
    }
    else {
        editContextTag = getTag(sxc);
    }
    return getEditContextOfTag(editContextTag);
}
exports.getEditContext = getEditContext;
/**
 * get nearest html tag of the sxc instance with data-edit-context
 * @param htmlTag
 */
function getContainerTag(htmlTag) {
    return $(htmlTag).closest('div[data-edit-context]')[0];
}
exports.getContainerTag = getContainerTag;
/**
 * get a html tag of the sxc instance
 * @param {SxcInstanceWithInternals} sxci
 * @return {jquery} - resulting html
 */
function getTag(sxci) {
    return $("div[data-cb-id='" + sxci.cbid + "']")[0];
}
exports.getTag = getTag;
/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {DataEditContext} edit-context object
 */
function getEditContextOfTag(htmlTag) {
    var attr = htmlTag.getAttribute('data-edit-context');
    return JSON.parse(attr || '{ }');
}
exports.getEditContextOfTag = getEditContextOfTag;
//# sourceMappingURL=api.js.map