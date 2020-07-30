angular.module("sxcFieldTemplates")
    /*@ngInject*/
    .factory("tinyMceDnnBridge", function (dnnBridgeSvc) {
        return {
            attach: attach
        };

        function attach(vm, $scope) {

            // the callback when something was selected
            vm.processResultOfDnnBridge = function (value) {
                $scope.$apply(function () {
                    if (!value) return;

                    var previouslySelected = vm.editor.selection.getContent();
                    
                    var promise = dnnBridgeSvc.getUrlOfId("page:" + (value.id || value.FileId)); // id on page, FileId on file
                    return promise.then(function (result) {
                        vm.editor.insertContent("<a href=\"" + result.data + "\">" + (previouslySelected || value.name) + "</a>");
                    });

                });
            };

            // open the dialog - note: strong dependency on the buttons, not perfect here
            vm.openDnnDialog = function (type) {
                dnnBridgeSvc.open("", { Paths: null, FileFilter: null }, vm.processResultOfDnnBridge);
            };

        }

    });