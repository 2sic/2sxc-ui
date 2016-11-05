﻿
// Toolbar bootstrapping (initialize all toolbars after loading page)
$(document).ready(function () {
    // Prevent propagation of the click (if menu was clicked)
    $(".sc-menu").click(function (e) {
        e.stopPropagation();
    });

    var modules = $("div[data-edit-context]");

    if (console) console.log("found " + modules.length + " content blocks");

    // Ensure the _processToolbar is called after the next event cycle to make sure that the Angular app (template selector) is loaded first
    window.setTimeout(function () {
        modules.each(function () {
            // 2016-10-09 2dm disabled try, as it only makes debugging harder...
            // not sure if we really need it
            //try {
            var ctl = $2sxc(this);
            if(ctl.manage)
                ctl.manage._toolbar._processToolbars(this);
            //} catch (e) { // Make sure that if one app breaks, others continue to work
            //    if (console && console.error) console.error(e);
            //}
        });
    }, 0);

});
