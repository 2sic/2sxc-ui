// this enhances the $2sxc client controller with stuff only needed when logged in
(function() {
    if ($2sxc) {

        //#region contentItem Commands - at the moment only finishUpgrade
        $2sxc.contentItems = {
            // delete command - try to really delete a content-item
            "delete": function (sxc, itemId, itemGuid, itemTitle) {
                // first show main warning / get ok
                // todo: i18n
                var ok = confirm("BETA!\n\n"
                    + "This will really delete item " + itemId
                    + (itemTitle ? " \"" + itemTitle + "\"" : "")
                    + ". "
                    + "\n\nThis cannot be undone. Are you sure?");
                if (!ok) return;

                sxc.webApi.delete("app-content/any/" + itemGuid, null, null, true)
                    .success(function () {
                        location.reload();
                    }).error(function (error) {
                        // todo: i18n
                        var msgJs = "\n\nPlease check javascript console for more information.";
                        // check if it's a permission config problem
                        console.log(error);
                        if (error.status === 401) {
                            // todo: i18n
                            alert("Can't delete - permissions missing. " + msgJs);
                        }
                        if (error.status === 400) {
                            // todo: i18n
                            alert("Can't delete - item is probably in use elsewhere. " + msgJs);
                        }
                    });
            }
        };
        //#endregion

    }
})();