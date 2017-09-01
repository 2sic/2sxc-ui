// contains commands to create/move/delete a contentBlock in a page

$2sxc._contentBlock.manipulator = function (sxc) {
    return {
        create: create,
        move: move,
        delete: remove
    };

    function create(parentId, fieldName, index, appName, container, newGuid) {
        // the wrapper, into which this will be placed and the list of pre-existing blocks
        var listTag = container;
        if (listTag.length === 0) return alert('can\'t add content-block as we couldn\'t find the list');
        var cblockList = listTag.find('div.sc-content-block');
        if (index > cblockList.length) index = cblockList.length; // make sure index is never greater than the amount of items

        var params = {
            parentId: parentId,
            field: fieldName,
            sortOrder: index,
            app: appName,
            guid: newGuid,
        };
        return sxc.webApi.get({ url: 'view/module/generatecontentblock', params: params })
            .then(function (result) {
                var newTag = $(result); // prepare tag for inserting

                // should I add it to a specific position...
                if (cblockList.length > 0 && index > 0)
                    $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                        .after(newTag);
                else //...or just at the beginning?
                    listTag.prepend(newTag);

                var sxcNew = $2sxc(newTag);
                $2sxc._toolbarManager.buildToolbars(newTag);
            });
    }

    function move(parentId, field, indexFrom, indexTo) {
        var params = {
            parentId: parentId,
            field: field,
            indexFrom: indexFrom,
            indexTo: indexTo,
        };

        // todo: need sxc!
        return sxc.webApi.get({ url: 'view/module/moveiteminlist', params: params })
            .then(function () {
                console.log("done moving!");
                window.location.reload();
            });
    }

    // delete a content-block inside a list of content-blocks
    function remove(parentId, field, index) {
        if (!confirm($2sxc.translate('QuickInsertMenu.ConfirmDelete'))) return null;
        var params = {
            parentId: parentId,
            field: field,
            index: index,
        };
        return sxc.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
            .then(function () {
                console.log('done deleting!');
                window.location.reload();
            });
    }
};