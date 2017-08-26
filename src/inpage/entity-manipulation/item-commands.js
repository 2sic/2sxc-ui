// this enhances the $2sxc client controller with stuff only needed when logged in
(function() {
    if (window.$2sxc) {
        
        //#region contentItem Commands
        $2sxc.contentItems = {
            // delete command - try to really delete a content-item
            "delete": function (sxc, itemId, itemGuid, itemTitle) {
                // first show main warning / get ok
                var ok = confirm($2sxc.translate("Delete.Confirm")
                    .replace("{id}", itemId)
                    .replace("{title}", itemTitle));
                if (!ok) return;

                sxc.webApi.delete("app-content/any/" + itemGuid, null, null, true)
                    .success(function () {
                        location.reload();
                    }).error(function (error) {
                        var msgJs = $2sxc.translate("Delete.ErrCheckConsole");
                        console.log(error);

                        // check if it's a permission config problem
                        if (error.status === 401) alert($2sxc.translate("Delete.ErrPermission") + msgJs);
                        if (error.status === 400) alert($2sxc.translate("Delete.ErrInUse") + msgJs);
                    });
            }
        };
        //#endregion

    }
})();