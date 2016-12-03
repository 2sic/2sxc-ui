// this enhances the $2sxc client controller with stuff only needed when logged in
(function() {
    if ($2sxc) {

    	// debug state which is needed in various places
    	$2sxc.debug = {
    		load: ($2sxc.urlParams.get("debug") === "true"),
    		uncache: $2sxc.urlParams.get("sxcver")
    	};


    	// mini-helpers to manage 2sxc parts, a bit like a dependency loader which will optimize to load min/max depending on debug state
    	$2sxc.parts = {
    		getUrl: function improveUrl(url, preventUnmin) {
    			var r = (preventUnmin || !$2sxc.debug.load) ? url : url.replace(".min", ""); // use min or not
    			if ($2sxc.debug.uncache && r.indexOf("sxcver") === -1)
    				r = r + ((r.indexOf("?") === -1) ? "?" : "&") + "sxcver=" + $2sxc.debug.uncache;
    			return r;
    		}
    	};

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