﻿
(function() {
    "use strict";

    angular.module("sxcFieldTemplates")
        .config(function (formlyConfigProvider, defaultFieldWrappersNoFloat) {

            formlyConfigProvider.setType({
                name: "hyperlink-library",
                templateUrl: "fields/hyperlink/hyperlink-library.html",
                // todo: check if we could use the defaultFieldWrappers instead
                wrapper: defaultFieldWrappersNoFloat,// ["eavLabel", "bootstrapHasError", "eavLocalization", "collapsible"],
                controller: "FieldTemplate-Library as vm"
            });

        })
        /*@ngInject*/
        .controller("FieldTemplate-Library", function ($uibModal, $scope, $http, sxc, adamSvc, debugState) {

            var vm = this;
            vm.debug = debugState;
            vm.modalInstance = null;
            vm.testLink = "";

            vm.adamModeConfig = {
                usePortalRoot: false,
                isLibrary: true
            };

            //#region new adam: callbacks only
            vm.registerAdam = function(adam) {
                vm.adam = adam;
            };
            //vm.setValue = function(url) {
            //    $scope.value.Value = url;
            //};
            $scope.afterUpload = function(fileItem) {};

            vm.toggleAdam = function toggle() {
                vm.adam.toggle();
            };

            //#endregion


        });


})();