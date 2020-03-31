(function () {

    angular.module("ImportExport")
        .controller("ImportApp", ImportAppController)
    ;

    /*@ngInject*/
    function ImportAppController(ImportAppService, eavAdminDialogs, eavConfig, $uibModalInstance, $translate) {
        var vm = this;

        vm.IsImporting = false;

        vm.ImportFile = {};
        vm.ImportName = '';
        vm.ImportResult = {};

        vm.importApp = importApp;

        vm.close = close;

        function importApp() {
            vm.IsImporting = true;
            return ImportAppService.importApp(vm.ImportFile, vm.ImportName).then(function (result) {
                vm.ImportResult = result.data;
                vm.IsImporting = false;
                // The app could not be installed because the app-folder already exists. Install app in different folder?
                if (vm.ImportResult && vm.ImportResult.Messages && vm.ImportResult.Messages[0] && vm.ImportResult.Messages[0].MessageType === 0) {
                    vm.ImportName = prompt(vm.ImportResult.Messages[0].Text + ' Would you like to install it using another folder name?');
                    if (vm.ImportName) {
                        return importApp();
                    }
                }
                return result;
            }).catch(function (error) {
                vm.IsImporting = false;
            });
        }

        function close() {
            $uibModalInstance.dismiss("cancel");
        }
    }
}());