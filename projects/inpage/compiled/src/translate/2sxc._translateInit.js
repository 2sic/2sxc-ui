"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18next = require("./libs/i18next.min");
var i18nextXHRBackend = require("./libs/i18nextXHRBackend.min");
var jqueryI18next = require("./libs/jquery-i18next.min");
var context_1 = require("../context/context");
var window_in_page_1 = require("../interfaces/window-in-page");
var api_1 = require("../manage/api");
var sxc_1 = require("../x-bootstrap/sxc");
/**
 * initialize the translation system; ensure toolbars etc. are translated
 */
window_in_page_1.windowInPage.i18next = i18next;
window_in_page_1.windowInPage.i18nextXHRBackend = i18nextXHRBackend;
var initialized = false;
// ReSharper disable once InconsistentNaming
function _translateInit(manage) {
    if (initialized) {
        return;
    }
    var context = manage._context;
    if (!context) {
        initialized = true; // getScxInstance is calling _translate so that we can skip the loop...
        // trying to get context...
        var htmlElementOrId = $('div[data-cb-id]')[0];
        var sxc = sxc_1.getSxcInstance(htmlElementOrId);
        initialized = false; // for real, it is not initialized...
        var editContext = api_1.getEditContext(sxc);
        context = context_1.createContextFromEditContext(editContext);
        context.sxc = sxc;
    }
    //console.log('stv: compare #1',
    //  manage._editContext.Language.Current.substr(0, 2),
    //  context.app.currentLanguage.substr(0, 2));
    //console.log('stv: compare #2',
    //  manage._editContext.Environment.SxcRootUrl,
    //  context.instance.sxcRootUrl);
    window_in_page_1.windowInPage.i18next
        .use(i18nextXHRBackend)
        .init({
        lng: context.app.currentLanguage.substr(0, 2),
        fallbackLng: 'en',
        whitelist: ['en', 'de', 'fr', 'it', 'uk', 'nl'],
        preload: ['en'],
        backend: {
            loadPath: context.instance.sxcRootUrl + 'desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js',
        },
    }, function (err, t) {
        // ReSharper restore UnusedParameter
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        // ReSharper disable once TsResolvedFromInaccessibleModule
        jqueryI18next.init(i18next, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('ul.sc-menu').localize(); // inline toolbars
        $('.sc-i18n').localize(); // quick-insert menus
    });
    initialized = true;
}
exports._translateInit = _translateInit;
//# sourceMappingURL=2sxc._translateInit.js.map