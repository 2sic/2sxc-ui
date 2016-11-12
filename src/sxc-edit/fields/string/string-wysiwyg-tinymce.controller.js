
(function () {
	"use strict";

    // Register in Angular Formly
    angular.module("sxcFieldTemplates")
        .config(function (formlyConfigProvider, defaultFieldWrappers) {
            formlyConfigProvider.setType({
                name: "string-wysiwyg-tinymce",
                templateUrl: "fields/string/string-wysiwyg-tinymce.html",
                wrapper: defaultFieldWrappers, 
                controller: "FieldWysiwygTinyMce as vm"
            });
        })

        .controller("FieldWysiwygTinyMce", FieldWysiwygTinyMceController);

    /*@ngInject*/
    function FieldWysiwygTinyMceController($scope, languages, tinyMceHelpers, tinyMceToolbars, tinyMceConfig, tinyMceAdam, tinyMceDnnBridge) {
        var vm = this;

        vm.activate = function () {
            // initialize options and wire-up init-callback
            $scope.tinymceOptions = angular.extend(tinyMceConfig.getDefaultOptions(), {
                setup: tinyMceInitCallback
            });

            // add ADAM definition, so that the callback will be able to link up to this
            tinyMceAdam.attachAdam(vm, $scope);

            // add DNN Bridge, needed for webforms dnn-dialogs
            tinyMceDnnBridge.attach(vm, $scope);

            // check if it's an additionally translated language and load the translations
            var lang2 = /* "de" */ languages.currentLanguage.substr(0, 2);
            if (tinyMceConfig.languages.indexOf(lang2) >= 0)
                angular.extend($scope.tinymceOptions, {
                    language: lang2,
                    language_url: "../i18n/lib/tinymce/" + lang2 + ".js"
                });

            watchDisabled($scope);
        };

        // callback event which tinyMce will execute when it's built the editor
        function tinyMceInitCallback(editor) {
            vm.editor = editor;
            if ($scope.tinymceOptions.language)
                tinyMceHelpers.addTranslations(editor, $scope.tinymceOptions.language);

            tinyMceToolbars.addButtons(vm);
            tinyMceAdam.addButtons(vm);
        }

        function watchDisabled(ngscope) {
            // Monitor for changes on Disabled
            ngscope.$watch("to.disabled", function(newValue, oldValue) {
                if (newValue !== oldValue && vm.editor !== null) {
                    ngscope.tinymceOptions.readonly = newValue;
                    ngscope.$broadcast('$tinymce:refresh'); // Refresh tinymce instance to pick-up new readonly value
                }
            });
        }


        vm.activate();
    }



})();


