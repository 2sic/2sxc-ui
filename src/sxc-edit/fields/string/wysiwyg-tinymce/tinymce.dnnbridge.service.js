angular.module("sxcFieldTemplates")
    /*@ngInject*/
    .factory("tinyMceDnnBridge", function (dnnBridgeSvc) {
        return {
            attach: attach
        };

        function attach(vm, $scope) {
            // open the dialog - note: strong dependency on the buttons, not perfect here
            vm.openDnnDialog = function (type) {
                dnnBridgeSvc.open(type, "", { Paths: null, FileFilter: null }, vm.processResultOfDnnBridge);
            };

            // the callback when something was selected
            vm.processResultOfDnnBridge = function (value, type) {
                $scope.$apply(function () {
                    if (!value) return;

                    var previouslySelected = vm.editor.selection.getContent();

                    // case page - must first convert id to real path
                    if (type === "page") {
                        var promise = dnnBridgeSvc.getUrlOfId(type + ":" + (value.id || value.FileId)); // id on page, FileId on file
                        return promise.then(function (result) {
                            vm.editor.insertContent("<a href=\"" + result.data + "\">" + (previouslySelected || value.name) + "</a>");
                        });
                    }

                    // not page - then I have a real path, use that
                    if (type === "file") {
                        var fileName = value.substr(value.lastIndexOf("/") + 1);
                        fileName = fileName.substr(0, fileName.lastIndexOf("."));
                        vm.editor.insertContent("<a href=\"" + value + "\">" + (previouslySelected || fileName) + "</a>");
                    } else if (type === "image") {
                        vm.editor.insertContent("<img src=\"" + value + "\">");
                    }

                });
            };

        }

    });