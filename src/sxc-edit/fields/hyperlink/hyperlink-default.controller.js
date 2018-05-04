
(function() {
    'use strict';

    angular.module('sxcFieldTemplates')
        .config(function (formlyConfigProvider, fieldWrappersWithPreview) {

            formlyConfigProvider.setType({
                name: 'hyperlink-default',
                templateUrl: 'fields/hyperlink/hyperlink-default.html',
                wrapper: fieldWrappersWithPreview,
                controller: 'FieldTemplate-HyperlinkCtrl as vm'
            });
        })
        /*@ngInject*/
        .controller('FieldTemplate-HyperlinkCtrl', function ($uibModal, $scope, $http, appId, sxc, adamSvc, debugState, dnnBridgeSvc, fileType) {

            var vm = this;
            vm.debug = debugState;
            vm.testLink = '';

            vm.isImage = function () { return fileType.isImage(vm.testLink); };
            vm.thumbnailUrl = function thumbnailUrl(size, quote) {
                var result = vm.testLink;
                if (size === 1)
                    result = result + '?w=64&h=64&mode=crop';
                if (size === 2)
                    result = result + '?w=500&h=400&mode=max';
                var qt = quote ? '"' : '';
                return qt + result + qt;
            };

            vm.icon = function () { return fileType.getIconClass(vm.testLink); };
            vm.tooltipUrl = function (str) { return str.replace(/\//g, '/&#8203;'); };
            vm.adamModeConfig = {
                usePortalRoot: false
            };

            function ensureDefaultConfig() {
                var merged = $scope.to.settings.merged;
                if (merged.ShowAdam === undefined || merged.ShowAdam === null) merged.ShowAdam = true;
                if (merged.Buttons === undefined || merged.Buttons === null) merged.Buttons = 'adam,more';
            }

            // test to get correct infos
            console.log('debug from hyperlink', $scope);

            ensureDefaultConfig();

            // Update test-link if necessary - both when typing or if link was set by dialogs
            $scope.$watch('value.Value', function(newValue, oldValue) {
                if (!newValue)
                    return;

                // handle short-ID links like file:17
                var promise = dnnBridgeSvc.getUrlOfId(newValue,
                    $scope.to.header.ContentTypeName, $scope.to.header.Guid, $scope.options.key);

                if(promise)
                    promise.then(function (result) {
                        if (result.data)
                            vm.testLink = result.data;
                    });
                else 
                    vm.testLink = newValue;
            });

            //#region dnn-page picker dialog

            // the callback when something was selected
            vm.processResultOfPagePicker = function (value) {
                $scope.$apply(function() {
                    // Convert to page:xyz format (if it wasn't cancelled)
                    if (value)
                        $scope.value.Value = 'page:' + value.id;
                });
            };

            // open the dialog
            vm.openPageDialog = function () {
                dnnBridgeSvc.open(
                    $scope.value.Value,
                    {
                        Paths: $scope.to.settings.merged ? $scope.to.settings.merged.Paths : '',
                        FileFilter: $scope.to.settings.merged ? $scope.to.settings.merged.FileFilter : ''
                    },
                    vm.processResultOfPagePicker);
            };
            //#endregion dnn page picker

          //#region new adam: callbacks only
          vm.registerAdam = function(adam) {
              vm.adam = adam;
          };

          vm.setValue = function (fileItem) {
            // depending on settings, use the id or not
            if ($scope.to.settings.merged.ServerResourceMapping &&
              $scope.to.settings.merged.ServerResourceMapping === 'url')
              $scope.value.Value = fileItem.fullPath // this is the one coming from the adam-browser
                || fileItem.Path; // or the server request
            else
              $scope.value.Value = 'file:' + fileItem.Id;
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