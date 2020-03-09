
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
    function FieldWysiwygTinyMceController($scope, languages, tinyMceHelpers, tinyMceToolbars, tinyMceConfig, tinyMceAdam, tinyMceDnnBridge, featuresSvc) {
        var vm = this;
        vm.enableContentBlocks = true;

        var settings = {
            enableContentBlocks : false
        };

        vm.adamModeConfig = {
            usePortalRoot: false
        };

        vm.activate = function () {

            enableContentBlocksIfPossible(settings);

            // initialize options and wire-up init-callback
            $scope.tinymceOptions = angular.extend(tinyMceConfig.getDefaultOptions(settings), {
                setup: tinyMceInitCallback
            });

            // add paste wysiwyg ability feature if enabled
            featuresSvc.enabled('1b13e0e6-a346-4454-a1e6-2fb18c047d20').then(
                function (enabled) {
                    if (enabled) {
                        $scope.tinymceOptions = angular.extend($scope.tinymceOptions, tinyMceConfig.getPasteWysiwygAbilityOption);
                    }
                }
            ).catch(function () {
                // failed
            }).then(function () {
                // always do this

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
            });
        };

        vm.activate();

        // callback event which tinyMce will execute when it's built the editor
        function tinyMceInitCallback(editor) {
            vm.editor = editor;
            if ($scope.tinymceOptions.language)
                tinyMceHelpers.addTranslations(editor, $scope.tinymceOptions.language);

            tinyMceToolbars.addButtons(vm);
            tinyMceAdam.addButtons(vm);

            enableContentBlocksIfPossible(editor);
        }

        function watchDisabled(ngscope) {
            // Monitor for changes on Disabled
            ngscope.$watch("to.disabled", function(newValue, oldValue) {
                if (newValue !== oldValue && vm.editor !== null) {
                    ngscope.tinymceOptions.readonly = newValue;
                    ngscope.$broadcast("$tinymce:refresh"); // Refresh tinymce instance to pick-up new readonly value
                }
            });
        }

        function enableContentBlocksIfPossible(settings) {
            // quit if there are no following fields
            if ($scope.fields.length === $scope.index + 1)
                return;

            var nextField = $scope.fields[$scope.index + 1];
            if (nextField.type === "entity-content-blocks")
                settings.enableContentBlocks = true;
        }
    }



})();


