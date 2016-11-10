$(function () {
    $quickE.enable = function () {
        $quickE.prepareToolbarInDom();

        // start watching for mouse-move
        var refreshTimeout = null;
        $("body").on("mousemove", function(e) {
            if (refreshTimeout === null)
                refreshTimeout = window.setTimeout(function() {
                    requestAnimationFrame(function() {
                        $quickE.refresh(e);
                        refreshTimeout = null;
                    });
                }, 20);
        });
    };

    $quickE.start = function() {
        try {
            $quickE._readPageConfig();
            if ($quickE.config.enable)
                $quickE.enable();
        } catch (e) {
            console.error("couldn't start quick-edit", e);
        }
    };

    // run on-load
    $($quickE.start);
});