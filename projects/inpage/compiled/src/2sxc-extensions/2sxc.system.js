"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = require("../interfaces/window-in-page");
/** this enhances the $2sxc client controller with stuff only needed when logged in */
if (window_in_page_1.windowInPage.$2sxc && !window_in_page_1.windowInPage.$2sxc.system) {
    window_in_page_1.windowInPage.$2sxc.system = {
        finishUpgrade: finishUpgrade,
    };
}
// upgrade command - started when an error contains a link to start this
function finishUpgrade(domElement) {
    var mc = window_in_page_1.windowInPage.$2sxc(domElement);
    $.ajax({
        type: 'get',
        url: mc.resolveServiceUrl('view/module/finishinstallation'),
        beforeSend: $.ServicesFramework(mc.id).setModuleHeaders,
    }).success(function () {
        alert('Upgrade ok, restarting the CMS and reloading...');
        location.reload();
    });
    alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
}
//# sourceMappingURL=2sxc.system.js.map