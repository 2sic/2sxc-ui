// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.

(function () {

    $2sxc._toolbarManager.standardButtons = function (canDesign, sharedParameters) {
        // create a deep-copy of the original object
        var btns = $.extend(true, {}, $2sxc._toolbarManager.toolbarTemplate);
        // btns.defaults = defaults;
        btns.parameters = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
        if (!canDesign)
            btns.groups.splice(2, 1); // remove this menu
        return btns;
    };

})();