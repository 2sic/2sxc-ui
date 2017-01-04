$(function () {
    $quickE.enable = function () {
        // build all toolbar html-elements
        $quickE.prepareToolbarInDom();

        // Cache the panes (because panes can't change dynamically)
        $quickE.initPanes();
    };

    // start watching for mouse-move
    $quickE.watchMouse = function() {
        var refreshTimeout = null;
        $("body").on("mousemove", function (e) {
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
            if ($quickE.config.enable) {
                // initialize first body-offset
                $quickE.bodyOffset = $quickE.getBodyPosition();

                $quickE.enable();

                $quickE.toggleParts();

                $quickE.watchMouse();
            }
        } catch (e) {
            console.error("couldn't start quick-edit", e);
        }
    };

    // cache the panes which can contain modules
    $quickE.initPanes = function () {
        $quickE.cachedPanes = $($quickE.selectors.mod.listSelector);
        $quickE.cachedPanes.addClass("sc-cb-pane-glow");
    };

    // enable/disable module/content-blocks as configured
    $quickE.toggleParts = function () {
        //// content blocks actions
        //$quickE.cbActions.toggle($quickE.config.innerBlocks.enable);

        //// module actions
        //$quickE.modActions.hide($quickE.config.modules.enable);
    };

    // reset the quick-edit
    // for example after ajax-loading a content-block, which may cause changed configurations
    $quickE.reset = function() {
        $quickE._readPageConfig();
        $quickE.toggleParts();
    };

    // run on-load
    $($quickE.start);
});