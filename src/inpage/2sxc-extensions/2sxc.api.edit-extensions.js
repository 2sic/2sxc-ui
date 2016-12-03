// this enhances the $2sxc client controller with stuff only needed when logged in
(function() {
    if ($2sxc) {

        //#region System Commands - at the moment only finishUpgrade
        $2sxc.system = {
            // upgrade command - started when an error contains a link to start this
            finishUpgrade: function(domElement) {
                var mc = $2sxc(domElement);
                $.ajax({
                    type: "get",
                    url: mc.resolveServiceUrl("view/module/finishinstallation"),
                    beforeSend: $.ServicesFramework(mc.id).setModuleHeaders
                }).success(function() {
                    alert("Upgrade ok, restarting the CMS and reloading...");
                    location.reload();
                });
                alert("starting upgrade. This could take a few minutes. You'll see an 'ok' when it's done. Please wait...");
            }
        };
        //#endregion

    }
})();