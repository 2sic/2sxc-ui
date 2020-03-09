angular.module("sxcFieldTemplates")
    /*@ngInject*/
    .factory("tinyMceHelpers", function ($translate, tinyMceConfig) {
        var svc = {
            addTranslations: initLangResources
        };

        // Initialize the tinymce resources which we translate ourselves
        function initLangResources(editor, language) {
            var primaryLan = tinyMceConfig.defaultLanguage;
            var keys = [], mceTranslations = {}, prefix = "Extension.TinyMce.", pLen = prefix.length;

            // find all relevant keys by querying the primary language
            var all = $translate.getTranslationTable(primaryLan);
            // ReSharper disable once MissingHasOwnPropertyInForeach
            for (var key in all)
                if (key.indexOf(prefix) === 0)
                    keys.push(key);

            var translations = $translate.instant(keys);

            for (var k = 0; k < keys.length; k++)
                mceTranslations[keys[k].substring(pLen)] = translations[keys[k]];
            tinymce.addI18n(language, mceTranslations);
        }
        return svc;
    });