(function () {
    // quick debug - set to false if not needed for production
    var dbg = false;

    // default / fallback settings for toolbars when nothings is specified
    var settingsForEmptyToolbar = {
        hover: 'left',
        autoAddMore: 'left'
    };

    Object.assign($2sxc._toolbarManager, {
        buildToolbars: buildToolbars,
        disable: disable,
        isDisabled: isDisabled
    });

    return;

    // generate an empty / fallback toolbar tag
    function generateFallbackToolbar() {
        var settingsString = JSON.stringify(settingsForEmptyToolbar);
        return $("<ul class='sc-menu' toolbar='' settings='" + settingsString + "'/>");
    }

    // find current toolbars inside this wrapper-tag
    function getToolbarTags(parentTag) {
        var allInner = $(".sc-menu[toolbar],.sc-menu[data-toolbar]", parentTag);

        // return only those, which don't belong to a sub-item
        var res = allInner.filter(function (i, e) {
            return $(e).closest(".sc-content-block")[0] === parentTag[0];
        });
        if (dbg) console.log("found toolbars for parent", parentTag, res);
        return res;
    }

    // create a process-toolbar command to generate toolbars inside a tag
    function buildToolbars(parentTag, optionalId) {
        parentTag = $(parentTag || ".DnnModule-" + optionalId);

        // if something says the toolbars are disabled, then skip
        if (parentTag.attr($2sxc._toolbarManager.cDisableAttrName)) return;

        // todo: change mechanism to not render toolbar, this uses a secret class name which the toolbar shouldn't know
        // don't add, if it is has un-initialized content
        // 2017-09-08 2dm disabled this, I believe the bootstrapping should never call this any more, if sc-uninitialized. if ok, then delete this in a few days
        //var disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;

        var toolbars = getToolbarTags(parentTag);

        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) { // && !disableAutoAdd) {
            if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

            var outsideCb = !parentTag.hasClass($2sxc.c.cls.scCb); // "sc-content-block");
            var contentTag = outsideCb ? parentTag.find("div.sc-content-block") : parentTag;
            contentTag.addClass($2sxc.c.cls.scElm); // "sc-element");

            contentTag.prepend(generateFallbackToolbar());
            toolbars = getToolbarTags(parentTag);
        }

        toolbars.each(function initToolbar() {
            var tag = $(this),
                data = null,
                toolbarConfig, toolbarSettings, at = $2sxc.c.attr;

            try {
                data = tag.attr(at.toolbar) || tag.attr(at.toolbarData) || "{}";
                toolbarConfig = JSON.parse(data);
                data = tag.attr(at.settings) || tag.attr(at.settingsData) || "{}";
                toolbarSettings = JSON.parse(data);
                if (toolbarConfig === {} && toolbarSettings === {})
                    toolbarSettings = settingsForEmptyToolbar;
            } catch (err) {
                console
                    .error("error in settings JSON - probably invalid - make sure you also quote your properties like \"name\": ...", data, err);
                return;
            }

            try {
                tag.replaceWith($2sxc(tag).manage.getToolbar(toolbarConfig, toolbarSettings));
            } catch (err2) {
                // note: errors happen a lot on custom toolbars, amke sure the others are still rendered
                console.error("error creating toolbar - will skip this one", err2);
            }
        });
    }
    
    function disable(tag) {
        tag = $(tag);
        tag.attr($2sxc._toolbarManager.cDisableAttrName, true);
    }

    function isDisabled(sxc) {
        var tag = $($2sxc._manage.getTag(sxc));
        return !!tag.attr($2sxc._toolbarManager.cDisableAttrName);
    }
})();