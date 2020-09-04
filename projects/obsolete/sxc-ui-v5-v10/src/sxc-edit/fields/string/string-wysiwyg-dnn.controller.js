﻿
(function () {
	"use strict";

	/* This app registers all field templates for 2sxc in the angularjs sxcFieldTemplates app */

	angular.module("sxcFieldTemplates")

    .config(function (formlyConfigProvider) {

        // for now identical with -adv, but later will change
		formlyConfigProvider.setType({
			name: "string-wysiwyg-dnn",
			templateUrl: "fields/string/string-wysiwyg-dnn.html",
		    // todo: check if we could use the defaultFieldWrappers instead
			wrapper: ["eavLabel", "bootstrapHasError", "eavLocalization", "collapsible"],
			controller: "FieldTemplate-WysiwygCtrl as vm"
		});

        
	})


    /*@ngInject*/
	.controller("FieldTemplate-WysiwygCtrl", function ($scope) {

		var vm = this;

		// Everything the WebForms bridge (iFrame) should have access to
		vm.bridge = {
		    initialValue: "",
            initialReadOnly: false,
		    onChanged: function (newValue) {
				$scope.$apply(function () {
					$scope.value.Value = newValue;
				});
			},
			setValue: function (value) { vm.bridge.initialValue = value; },
			setReadOnly: function(readOnly) { vm.bridge.initialReadOnly = readOnly; }
		};

		$scope.$watch("value.Value", function (newValue, oldValue) {
			if (newValue !== oldValue)
				vm.bridge.setValue(newValue);
		});

		$scope.$watch("to.disabled", function (newValue, oldValue) {
			if (newValue !== oldValue)
				vm.bridge.setReadOnly(newValue);
		});

	});


})();