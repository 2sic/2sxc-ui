"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DialogPaths_1 = require("../settings/DialogPaths");
/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the "wrong" dialog
 * @returns {string} new url
 */
function rewriteUrl(url) {
    // change default url-schema from the primary angular-app to the quick-dialog
    url = url.replace(DialogPaths_1.DialogPaths.ng1, DialogPaths_1.DialogPaths.quickDialog)
        .replace(DialogPaths_1.DialogPaths.ng8, DialogPaths_1.DialogPaths.quickDialog);
    url = changePathToDevIfNecessary(url);
    return url;
}
exports.rewriteUrl = rewriteUrl;
/**
 * special debug-code when running on local ng-serve
 * this is only activated if the developer manually sets a value in the localStorage
 * @param url
 */
function changePathToDevIfNecessary(url) {
    try {
        var devMode = localStorage.getItem('devMode');
        if (devMode && ~~devMode) {
            return url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
        }
    }
    catch (e) {
        // ignore
    }
    return url;
}
//# sourceMappingURL=url-handler.js.map