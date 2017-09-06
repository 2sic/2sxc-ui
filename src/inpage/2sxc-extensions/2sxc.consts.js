// this enhances the $2sxc client controller with stuff only needed when logged in
(function () {
    if (!window.$2sxc || window.$2sxc.consts) return false;
    $2sxc.c = $2sxc.consts = {
        // classes
        cls: {
            scMenu: "sc-menu",
            scCb: "sc-content-block",
            scElm: "sc-element"
        },
        
        // attribs
        attr: {
            toolbar: "toolbar",
            toolbarData: "data-toolbar",
            settings: "settings",
            settingsData: "data-settings"
        },

        publishAllowed: "DraftOptional"

    };

    // selectors
    var sel = $2sxc.c.sel = {};
    Object.keys($2sxc.c.cls).forEach(function (key, index) {
        sel[key] = "." + $2sxc.c.cls[key];
    });

    /*
    ToDo: functional programming
    $2sxc.c.sel = Object.entries($2sxc.c.cls).reduce((res, current) => {
        res[entry[0]] = entry[1];
        return t;
    }, {});
    */
})();