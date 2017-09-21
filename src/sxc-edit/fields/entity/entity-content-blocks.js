(function() {
    "use strict";

    angular.module("sxcFieldTemplates")
        .config(function (formlyConfigProvider, defaultFieldWrappers) {

            var wrappers = defaultFieldWrappers.slice(0); // copy the array
            wrappers.splice(defaultFieldWrappers.indexOf("eavLocalization"), 1); // remove the localization...

            formlyConfigProvider.setType({
                name: "entity-content-blocks",
                templateUrl: "fields/entity/entity-default.html",
                wrapper: wrappers, // ["eavLabel", "bootstrapHasError", "collapsible"],
                controller: "FieldTemplate-EntityContentBlockCtrl"
            });
        })
        /*@ngInject*/
        .controller("FieldTemplate-EntityContentBlockCtrl", function($controller, $scope, $http, $filter, $translate, $uibModal, appId, eavAdminDialogs, eavDefaultValueService) {
            $scope.to.settings.merged.EnableRemove = true;
            $scope.to.settings.merged.AllowMultiValue = true; // for correct UI showing "remove"
            $scope.to.settings.merged.EnableAddExisting = false; // disable manual select existing
            $scope.to.settings.merged.EnableCreate = false;         // disable manual create
            $scope.to.settings.merged.EnableEdit = false;
            $scope.to.settings.merged.EntityType = "ContentGroupReference";
            $scope.to.enableCollapseField = true;   // ui option to allow collapsing
            $scope.to.collapseField = true;   // ui option to allow collapsing


            // use "inherited" controller just like described in http://stackoverflow.com/questions/18461263/can-an-angularjs-controller-inherit-from-another-controller-in-the-same-module
            $controller("FieldTemplate-EntityCtrl", { $scope: $scope });

            // do something with the values...
            var vals = $scope.model[$scope.options.key].Values[0].Value;

            //addCSSRule("div", "background-color: pink");
        });

    function addCSSRule(selector, rules, index) {
        var sheet = document.styleSheets[0];
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }

})();