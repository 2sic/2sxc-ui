
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
    function FieldWysiwygTinyMceController($scope, dnnBridgeSvc, languages, $translate, tinyMceHelpers, tinyMceToolbars, tinyMceConfig, tinyMceAdam) {
        var vm = this;
        vm.activate = function () {
            $scope.tinymceOptions = angular.extend(tinyMceConfig.getDefaultOptions(), {
                setup: function(editor) {
                    vm.editor = editor;
                    if ($scope.tinymceOptions.language)
                        tinyMceHelpers.addTranslations(editor, $scope.tinymceOptions.language);
                    tinyMceToolbars.addButtons(vm);

                    tinyMceAdam.addButtons(vm);
                }
            });

            // check if it's an additionally translated language and load the translations
            var lang2 = /* "de" */ languages.currentLanguage.substr(0, 2);
            if (tinyMceConfig.languages.indexOf(lang2) >= 0)
                angular.extend($scope.tinymceOptions, {
                    language: lang2,
                    language_url: "../i18n/lib/tinymce/" + lang2 + ".js"
                });

        };

        tinyMceAdam.attachAdam(vm, $scope);

        // todo: sometime put in own service
        //#region new adam: callbacks only
        //vm.registerAdam = function (adam) {
        //    vm.adam = adam;
        //};


        //vm.setValue = function (fileItem, modeImage) {
        //    if (modeImage === undefined)        // if not supplied, use the setting in the adam
        //        modeImage = vm.adamModeImage; 
        //    vm.editor.insertContent(modeImage
        //        ? "<img src=\"" + fileItem.fullPath + "\">"
        //        : "<a href=\"" + fileItem.fullPath + "\">" + fileItem.Name.substr(0, fileItem.Name.lastIndexOf(".")) + "</a>");
        //};

        //// this is the event called by dropzone as something is dropped
        //$scope.afterUpload = function(fileItem) {   
        //    vm.setValue(fileItem, fileItem.Type === "image");
        //};

        //vm.toggleAdam = function toggle(imagesOnly) {
        //    vm.adamModeImage = imagesOnly;
        //    vm.adam.toggle({showImagesOnly: imagesOnly});
        //    $scope.$apply();
        //};

        //#endregion

        //#region DNN stuff

        // open the dialog - note: strong dependency on the buttons, not perfect here
        vm.openDnnDialog = function (type) {
            dnnBridgeSvc.open(type, "", { Paths: null, FileFilter: null }, vm.processResultOfDnnBridge);
        };

        // the callback when something was selected
        vm.processResultOfDnnBridge = function (value, type) {
            $scope.$apply(function() {
                if (!value) return;

                var previouslySelected = vm.editor.selection.getContent();

                // case page - must first convert id to real path
                if (type === "page") {
                    var promise = dnnBridgeSvc.getUrlOfId(type + ":" + (value.id || value.FileId)); // id on page, FileId on file
                    return promise.then(function(result) {
                        vm.editor.insertContent("<a href=\"" + result.data + "\">" + (previouslySelected || value.name) + "</a>");
                    });
                }

                // not page - then I have a real path, use that
                if (type === "file") {
                    var fileName = value.substr(value.lastIndexOf("/") + 1);
                    fileName = fileName.substr(0, fileName.lastIndexOf("."));
                    vm.editor.insertContent("<a href=\"" + value + "\">" + (previouslySelected || fileName) + "</a>");
                } else if (type === "image") {
                    vm.editor.insertContent("<img src=\"" + value + "\">");
                }


            });
        };

        //#endregion

        vm.activate();

        $scope.$watch("to.disabled", function (newValue, oldValue) {
            if (newValue !== oldValue && vm.editor !== null) {
                $scope.tinymceOptions.readonly = newValue;
                $scope.$broadcast('$tinymce:refresh'); // Refresh tinymce instance to pick-up new readonly value
            }
        });
    }



})();


