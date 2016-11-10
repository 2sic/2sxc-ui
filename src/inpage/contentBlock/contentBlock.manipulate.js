// contains commands to create/move/delete a contentBlock in a page

$2sxc._contentBlock.manipulator = function(sxc) {
    return {
        create: function(parentId, fieldName, index, appName, container, newGuid) {
            // the wrapper, into which this will be placed and the list of pre-existing blocks
            var listTag = container;
            if (listTag.length === 0) return alert("can't add content-block as we couldn't find the list");
            var cblockList = listTag.find("div.sc-content-block");
            if (index > cblockList.length)
                index = cblockList.length; // make sure index is never greater than the amount of items
            return sxc.webApi.get({
                url: "view/module/generatecontentblock",
                params: {
                    parentId: parentId,
                    field: fieldName,
                    sortOrder: index,
                    app: appName,
                    guid: newGuid
                }
            }).then(function(result) {
                var newTag = $(result); // prepare tag for inserting

                // should I add it to a specific position...
                if (cblockList.length > 0 && index > 0)
                    $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                        .after(newTag);
                else //...or just at the beginning?
                    listTag.prepend(newTag);


                var sxcNew = $2sxc(newTag);
                sxcNew.manage._toolbar._processToolbars(newTag);

            });
        },


        move: function(parentId, field, indexFrom, indexTo) {
            // todo: need sxc!
            return sxc.webApi.get({
                url: "view/module/moveiteminlist",
                params: {
                    parentId: parentId,
                    field: field,
                    indexFrom: indexFrom,
                    indexTo: indexTo
                }
            }).then(function() {
                console.log("done moving!");
                window.location.reload();
            });
        },

        // delete a content-block inside a list of content-blocks
        "delete": function(parentId, field, index) {
            if (confirm($2sxc.translate("QuickInsertMenu.ConfirmDelete")))
                return sxc.webApi.get({
                    url: "view/module/RemoveItemInList",
                    params: { parentId: parentId, field: field, index: index }
                }).then(function() {
                    console.log("done deleting!");
                    window.location.reload();
                });
            return null;
        }
    };
};