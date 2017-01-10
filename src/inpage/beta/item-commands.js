// this enhances the $2sxc client controller with stuff only needed when logged in
(function() {
    if ($2sxc) {

        //#region contentItem Commands - at the moment only finishUpgrade
        $2sxc.contentItems = {
            // delete command - try to really delete a content-item
            "delete": function (sxc, itemId) {
                // first show main warning / get ok
                // todo: i18n
                var ok = confirm("This will really delete item " + itemId + ". This cannot be undone. Are you sure?");
                if (!ok) return;
                console.log('would delete now, but not implemented');
                
                

                sxc.webApi.delete("app-content/beta/" + itemId, null, null, true)
                    .success(function () {
                        alert("ok!");
                        location.reload();
                    }).error(function (error) {
                        // check if it's a permission config problem
                        console.log(error);
                        if (error.status === 401) {
                            // todo: i18n
                            alert("permission missing, check information ...");
                        }
                        if (error.status === 400) {
                            // todo: i18n
                            alert("delete failed - item is probably in use, see ...");
                        }
                    });
            }
        };
        //#endregion

    }
})();