(function () {
    var tbManager = $2sxc._toolbarManager;
    $2sxc._toolbarManager.generateToolbarHtml = generateToolbarHtml;
    return;

    function generateToolbarHtml(sxc, tbConfig, moreSettings) {
        // if it has an action or is an array, keep that. Otherwise get standard buttons
        tbConfig = tbConfig || {}; // if null/undefined, use empty object
        var btnList = tbConfig;
        if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
            btnList = tbManager.standardButtons(sxc.manage._user.canDesign /* editContext.User.CanDesign */ , tbConfig);

        // whatever we had, if more settings were provided, override with these...
        var tlbDef = tbManager.buttonHelpers.buildFullDefinition(btnList, sxc.manage._commands.commands, sxc.manage._instanceConfig /* tb.config */ , moreSettings);
        var btnGroups = tlbDef.groups;
        var behaviourClasses = " sc-tb-hover-" + tlbDef.settings.hover + " sc-tb-show-" + tlbDef.settings.show;

        // todo: these settings assume it's not in an array...
        var tbClasses = "sc-menu group-0 " + behaviourClasses + " " +
            ((tbConfig.sortOrder === -1) ? " listContent" : "") +
            (tlbDef.settings.classes ? " " + tlbDef.settings.classes : "");
        var toolbar = $("<ul />", {
            'class': tbClasses,
            'onclick': "var e = arguments[0] || window.event; e.stopPropagation();"
        });

        for (var i = 0; i < btnGroups.length; i++) {
            var btns = btnGroups[i].buttons;
            for (var h = 0; h < btns.length; h++)
                toolbar.append($("<li />").append($(tbManager.generateButtonHtml(sxc, btns[h], i))));
        }

        toolbar.attr("group-count", btnGroups.length);
        return toolbar[0].outerHTML;
    }
})();