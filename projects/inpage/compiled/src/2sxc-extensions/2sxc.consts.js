"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = require("../interfaces/sxc-controller-in-page");
var window_in_page_1 = require("../interfaces/window-in-page");
if (window_in_page_1.windowInPage.$2sxc && !window_in_page_1.windowInPage.$2sxc.consts) {
    sxc_controller_in_page_1.$2sxcInPage.c = sxc_controller_in_page_1.$2sxcInPage.consts = {
        // classes
        cls: {
            scMenu: 'sc-menu',
        },
        // attributes
        attr: {
            toolbar: 'toolbar',
            toolbarData: 'data-toolbar',
            settings: 'settings',
            settingsData: 'data-settings',
        },
        publishAllowed: 'DraftOptional',
    };
    // selectors
    var sel_1 = sxc_controller_in_page_1.$2sxcInPage.c.sel = {};
    // ReSharper disable once UnusedParameter
    Object.keys(sxc_controller_in_page_1.$2sxcInPage.c.cls).forEach(function (key, index) {
        sel_1[key] = "." + sxc_controller_in_page_1.$2sxcInPage.c.cls[key];
    });
    /*
    ToDo: functional programming
    $2sxc.c.sel = Object.entries($2sxc.c.cls).reduce((res, current) => {
        res[entry[0]] = entry[1];
        return t;
    }, {});
    */
}
//# sourceMappingURL=2sxc.consts.js.map