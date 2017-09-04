// this enhances the $2sxc client controller with stuff only needed when logged in
(function () {
    if (!window.$2sxc || window.$2sxc.system) return;

    $2sxc.system = {
        finishUpgrade: finishUpgrade
    };

    // upgrade command - started when an error contains a link to start this
    function finishUpgrade(domElement) {
        var mc = $2sxc(domElement);
        $.ajax({
            type: "get",
            url: mc.resolveServiceUrl("view/module/finishinstallation"),
            beforeSend: $.ServicesFramework(mc.id).setModuleHeaders
        }).success(function () {
            alert("Upgrade ok, restarting the CMS and reloading...");
            location.reload();
        });
        alert("starting upgrade. This could take a few minutes. You'll see an 'ok' when it's done. Please wait...");
    }
})();