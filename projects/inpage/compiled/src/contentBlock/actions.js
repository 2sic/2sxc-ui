"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./render");
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * internal helper, to do something and reload the content block
 * @param {ContextOfButton} context
 * @param {string} url
 * @param {ActionParams} params
 * @returns {any}
 */
function getAndReload(context, url, params) {
    return new Promise(function (resolve, reject) {
        context.sxc.webApi.get({
            url: url,
            params: params,
        }).done(function (data, textStatus, jqXHR) {
            if (jqXHR.status === 204 || jqXHR.status === 200) {
                // resolve the promise with the response text
                resolve(data);
            }
            else {
                // otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(textStatus));
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(Error(errorThrown));
        });
        ;
    }).then(function () { render_1.renderer.reloadAndReInitialize(context); });
}
/**
 * remove an item from a list, then reload
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
function removeFromList(context, sortOrder) {
    return getAndReload(context, 'view/module/removefromlist', {
        sortOrder: sortOrder
    });
}
exports.removeFromList = removeFromList;
/**
 * change the order of an item in a list, then reload
 * @param {ContextOfButton} context
 * @param {number} initOrder
 * @param {number} newOrder
 * @returns {any}
 */
function changeOrder(context, initOrder, newOrder) {
    return getAndReload(context, 'view/module/changeorder', {
        sortOrder: initOrder,
        destinationSortOrder: newOrder
    });
}
exports.changeOrder = changeOrder;
/**
 * add an item to the list at this position
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
function addItem(context, sortOrder) {
    return getAndReload(context, 'view/module/additem', {
        sortOrder: sortOrder
    });
}
exports.addItem = addItem;
/**
 * set a content-item in this block to published, then reload
 * @param {ContextOfButton} context
 * @param {string} part
 * @param {number} sortOrder
 * @returns {any}
 */
function publish(context, part, sortOrder) {
    return getAndReload(context, 'view/module/publish', {
        part: part,
        sortOrder: sortOrder
    });
}
exports.publish = publish;
/**
 * publish an item using it's ID
 * @param {ContextOfButton} context
 * @param {number} entityId
 * @returns {any}
 */
function publishId(context, entityId) {
    return getAndReload(context, 'view/module/publish', {
        id: entityId
    });
}
exports.publishId = publishId;
//# sourceMappingURL=actions.js.map