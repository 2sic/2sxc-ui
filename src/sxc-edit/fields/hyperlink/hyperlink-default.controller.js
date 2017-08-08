﻿
(function() {
    "use strict";

    angular.module("sxcFieldTemplates")
        .config(function (formlyConfigProvider, fieldWrappersWithPreview) {

            formlyConfigProvider.setType({
                name: "hyperlink-default",
                templateUrl: "fields/hyperlink/hyperlink-default.html",
                wrapper: fieldWrappersWithPreview,
                controller: "FieldTemplate-HyperlinkCtrl as vm"
            });
        })
        /*@ngInject*/
        .controller("FieldTemplate-HyperlinkCtrl", function ($uibModal, $scope, $http, sxc, adamSvc, debugState, dnnBridgeSvc, fileType) {

            var vm = this;
            vm.debug = debugState;
            vm.testLink = "";

            vm.isImage = function () { return fileType.isImage(vm.testLink); };
            vm.thumbnailUrl = function thumbnailUrl(size, quote) {
                var result = vm.testLink;
                if (size === 1)
                    result = result + "?w=64&h=64&mode=crop";
                if (size === 2)
                    result = result + "?w=500&h=400&mode=max";
                var qt = quote ? "\"" : "";
                return qt + result + qt;
            };

            vm.icon = function () { return fileType.getIconClass(vm.testLink); };
            vm.tooltipUrl = function (str) { return str.replace(/\//g, "/&#8203;"); };
            vm.adamModeConfig = {
                usePortalRoot: false
            };

            function ensureDefaultConfig() {
                var merged = $scope.to.settings.merged;
                if (merged.ShowAdam === undefined || merged.ShowAdam === null) merged.ShowAdam = true;
                if (merged.Buttons === undefined || merged.Buttons === null) merged.Buttons = "adam,more";
            }

            ensureDefaultConfig();

            // Update test-link if necessary - both when typing or if link was set by dialogs
            $scope.$watch("value.Value", function(newValue, oldValue) {
                if (!newValue)
                    return;

                // handle short-ID links like file:17
                var promise = dnnBridgeSvc.getUrlOfId(newValue);
                if(promise)
                    promise.then(function (result) {
                        if (result.data) 
                            vm.testLink = result.data;
                    });
                else 
                    vm.testLink = newValue;
            });

            //#region dnn-bridge dialogs

            // the callback when something was selected
            vm.processResultOfDnnBridge = function(value, type) {
                $scope.$apply(function() {
                    if (!value) return;
                    
                    // Convert file path to file ID if type file is specified
                    if (type === "page") {
                        $scope.value.Value = "page:" + value.id;
                    }
                    if (type === "file" || type === "image") {
                        dnnBridgeSvc.convertPathToId(value, type)
                            .then(function (result) {
                                $scope.value.Value = (result.data)
                                    ? "file:" + result.data.FileId // default case, found number for this
                                    : value; // this happens when it couldn't be resolved, for example on a secure file ticket
                            });
                    }
                });
            };

            // open the dialog
            vm.openDialog = function (type) {
                dnnBridgeSvc.open(
                    type,
                    $scope.value.Value,
                    {
                        Paths: $scope.to.settings.merged ? $scope.to.settings.merged.Paths : "",
                        FileFilter: $scope.to.settings.merged ? $scope.to.settings.merged.FileFilter : ""
                    },
                    vm.processResultOfDnnBridge);
            };

            //#region new adam: callbacks only
            vm.registerAdam = function(adam) {
                vm.adam = adam;
            };
            vm.setValue = function(fileItem) {
                $scope.value.Value = "File:" + fileItem.Id;
            };

            $scope.afterUpload = vm.setValue;   // binding for dropzone

            vm.toggleAdam = function toggle(usePortalRoot, imagesOnly) {
                
                vm.adam.toggle({
                    showImagesOnly: imagesOnly,
                    usePortalRoot: usePortalRoot
                });
            };

            //#endregion


        });


})();