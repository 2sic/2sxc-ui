/* 
 * Field: String - Default
 */

angular.module('eavFieldTemplates')
    .config(function (formlyConfigProvider, defaultFieldWrappers) {

        formlyConfigProvider.setType({
            name: 'custom-json-editor',
            template: '<div>Warning: this is still work-in-progres, there is no json validation, use at own risk.' +
            '<textarea rows="{{options.templateOptions.settings.merged.RowCount}}" class="form-control material" ng-model="value.Value"></textarea>'
            + '</div>',
            wrapper: defaultFieldWrappers, 
          controller: 'FieldTemplate-CustomJson as vm'
        });

  }).controller('FieldTemplate-CustomJson', function ($scope) {

        // todo: later extend with json validation
        //var vm = this;
        //var validationRegexString = '.*';

        //var settings = $scope.options.templateOptions.settings;
        
        //// Do not use settings.merged here because there is an old (hidden field) that causes
        //// merged.ValidationRegExJavaScript to be always empty
        //if (settings.All && settings.All.ValidationRegExJavaScript)
        //    validationRegexString = settings.All.ValidationRegExJavaScript;
        
        //vm.regexPattern = new RegExp(validationRegexString, 'i');

        //console.log($scope.options.templateOptions);
    });