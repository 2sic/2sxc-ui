(function () { 

    angular.module("ReplaceContentApp", [
            "SxcServices",
            "EavAdminUi"         // dialog (modal) controller
        ])
        .controller("ReplaceDialog", ReplaceContentController);

    /*@ngInject*/
    function ReplaceContentController(appId, item, contentGroupSvc, eavAdminDialogs, $uibModalInstance, $filter) {
        var vm = this;
        vm.options = [];
        vm.item = {
            id: item.EntityId,
            guid: item.Group.Guid,
            part: item.Group.Part,
            index: item.Group.Index
        };
        vm.typeName = "";

        var svc = contentGroupSvc(appId);

        vm.reload = function() {
            return svc.getItems(vm.item).then(function(result) {
                vm.options = result.data.Items;
                vm.item.id = result.data.SelectedId;
                vm.typeName = result.data.ContentTypeName;
            });
        };
        vm.reload();

        vm.ok = function ok() {
            svc.saveItem(vm.item).then(vm.close);
        };
        
        vm.close = function () { $uibModalInstance.dismiss("cancel"); };

        vm.convertToInt = function (id) {
            return parseInt(id);
        };

        vm.copySelected = function copySelected() {
            var selectedId = vm.item.id;
            var items = [
                {
                    ContentTypeName: vm.typeName,
                    DuplicateEntity: vm.item.id
                }
            ];
            eavAdminDialogs.openEditItems(items, vm.reloadAfterCopy);
            // todo: on re-load a select would be nice
        };

        vm.reloadAfterCopy = function reloadAfterCopy(result) {
            var copy = result.data;
            vm.reload().then(function() {
                vm.item.id = copy[Object.keys(copy)[0]]; // get id of first item
            });
        };
    }

} ());