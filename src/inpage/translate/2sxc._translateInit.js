﻿// initialize the translation system; ensure toolbars etc. are translated
(function () {
    var initialized = false;

    $2sxc._translateInit = function (manage) {
        if (initialized) return;
        window.i18next
            .use(window.i18nextXHRBackend)
            .init({
                lng: manage._editContext.Language.Current.substr(0,2), // "en",
                fallbackLng: "en",
                whitelist: ["en", "de", "fr", "it", "uk", "nl"],
                preload: ["en"],
                backend: {
                    loadPath: manage._editContext.Environment.SxcRootUrl + "desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js"
                }
            }, function (err, t) {
                // for options see
                // https://github.com/i18next/jquery-i18next#initialize-the-plugin
                jqueryI18next.init(i18next, $);
                // start localizing, details:
                // https://github.com/i18next/jquery-i18next#usage-of-selector-function
                $("ul.sc-menu").localize(); // inline toolbars
                $(".sc-i18n").localize();   // quick-insert menus
            });
        initialized = true;
    };
})();
