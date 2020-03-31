(function() { // TN: this is a helper construct, research iife or read https://github.com/johnpapa/angularjs-styleguide#iife

  angular.module('AppSettingsApp',
      [
        'EavConfiguration', // 
        'EavServices',
        'SxcServices',
        'SxcTemplates', // inline templates
        'EavAdminUi', // dialog (modal) controller
      ])
    .controller('AppSettings', AppSettingsController);

  /*@ngInject*/
  function AppSettingsController(appSettings, appId, eavAdminDialogs, eavConfig) {
    var vm = this;
    var svc = appSettings(appId);
    vm.items = svc.liveList();

    vm.ready = function ready() {
      return vm.items.length > 0;
    };

    // Open a content-type configuration dialog for a type (for settings / resources) 
    vm.config = function openConf(staticName) {
      return svc.openConfig(staticName);
    };

    vm.edit = function edit(staticName) {
      return svc.edit(staticName);
    };

    vm.editPackage = svc.editPackage;

    vm.permissions = function permissions() {
      return eavAdminDialogs.openPermissions(appId, eavConfig.metadataOfApp, 'number', appId);
    };

  }

}());