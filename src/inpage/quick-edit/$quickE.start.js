$(function () {
    // todo: add features to not enable this at all

    $quickE.enable = function () {
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
        console.log('enabling quick Edit');
    };

    // run on-load
    $($quickE.enable);
});