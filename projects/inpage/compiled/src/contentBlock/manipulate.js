"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolbar_manager_1 = require("../toolbar/toolbar-manager");
var _2sxc_translate_1 = require("../translate/2sxc.translate");
var sxc_1 = require("../x-bootstrap/sxc");
/** contains commands to create/move/delete a contentBlock in a page */
var sxcInstance;
/**
 * create content block
 * @param parentId
 * @param fieldName
 * @param index
 * @param appName
 * @param container
 * @param newGuid
 */
function create(parentId, fieldName, index, appName, container, newGuid) {
    // the wrapper, into which this will be placed and the list of pre-existing blocks
    var listTag = container;
    if (listTag.length === 0)
        return alert('can\'t add content-block as we couldn\'t find the list');
    var cblockList = listTag.find('div.sc-content-block');
    if (index > cblockList.length)
        index = cblockList.length; // make sure index is never greater than the amount of items
    var params = {
        parentId: parentId,
        field: fieldName,
        sortOrder: index,
        app: appName,
        guid: newGuid,
    };
    return sxcInstance.webApi.get({ url: 'view/module/generatecontentblock', params: params })
        .then(function (result) {
        var newTag = $(result); // prepare tag for inserting
        // should I add it to a specific position...
        if (cblockList.length > 0 && index > 0)
            $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                .after(newTag);
        else // ...or just at the beginning?
            listTag.prepend(newTag);
        // ReSharper disable once UnusedLocals
        var sxcNew = sxc_1.getSxcInstance(newTag);
        toolbar_manager_1._toolbarManager.buildToolbars(newTag);
    });
}
/**
 * move content block
 * @param parentId
 * @param field
 * @param indexFrom
 * @param indexTo
 */
function move(parentId, field, indexFrom, indexTo) {
    var params = {
        parentId: parentId,
        field: field,
        indexFrom: indexFrom,
        indexTo: indexTo,
    };
    return sxcInstance.webApi.get({ url: 'view/module/moveiteminlist', params: params })
        .then(function () {
        console.log('done moving!');
        window.location.reload();
    });
}
/**
 * delete a content-block inside a list of content-blocks
 * @param parentId
 * @param field
 * @param index
 */
function remove(parentId, field, index) {
    if (!confirm(_2sxc_translate_1.translate('QuickInsertMenu.ConfirmDelete')))
        return null;
    var params = {
        parentId: parentId,
        field: field,
        index: index,
    };
    return sxcInstance.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
        .then(function () {
        console.log('done deleting!');
        window.location.reload();
    });
}
var Manipulator = /** @class */ (function () {
    function Manipulator() {
        this.create = create;
        this.move = move;
        this.delete = remove;
    }
    return Manipulator;
}());
exports.Manipulator = Manipulator;
function manipulator(sxc) {
    sxcInstance = sxc;
    return new Manipulator();
}
exports.manipulator = manipulator;
//# sourceMappingURL=manipulate.js.map