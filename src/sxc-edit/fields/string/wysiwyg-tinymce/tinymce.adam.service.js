angular.module("sxcFieldTemplates")
    /*@ngInject*/
    .factory("tinyMceAdam", function () {
        return {
            attachAdam: attachAdam,
            addButtons: addAdamButtons
        };

        function attachAdam(vm, $scope) {
            vm.registerAdam = function (adam) {
                vm.adam = adam;
            };

            vm.setValue = function (fileItem, modeImage) {
                if (modeImage === undefined)        // if not supplied, use the setting in the adam
                    modeImage = vm.adamModeImage;
                vm.editor.insertContent(modeImage
                    ? "<img src=\"" + fileItem.fullPath + "\">"
                    : "<a href=\"" + fileItem.fullPath + "\">" + fileItem.Name.substr(0, fileItem.Name.lastIndexOf(".")) + "</a>");
            };

            // this is the event called by dropzone as something is dropped
            $scope.afterUpload = function (fileItem) {
                vm.setValue(fileItem, fileItem.Type === "image");
            };

            vm.toggleAdam = function toggle(imagesOnly) {
                vm.adamModeImage = imagesOnly;
                vm.adam.toggle({ showImagesOnly: imagesOnly });
                $scope.$apply();
            };
        }

        function addAdamButtons(vm) {
            var e = vm.editor;
            // group with adam-link, dnn-link
            e.addButton("linkfiles", {
                type: "splitbutton",
                icon: " eav-icon-file-pdf",
                title: "Link.AdamFile.Tooltip",
                onclick: function () {
                    vm.toggleAdam(false);
                },
                menu: [
                    {
                        text: "Link.AdamFile",
                        tooltip: "Link.AdamFile.Tooltip",
                        icon: " eav-icon-file-pdf",
                        onclick: function () {
                            vm.toggleAdam(false);
                        }
                    }, {
                        text: "Link.DnnFile",
                        tooltip: "Link.DnnFile.Tooltip",
                        icon: " eav-icon-file",
                        onclick: function () {
                            vm.openDnnDialog("documentmanager");
                        }
                    }
                ]
            });


            // group with images (adam) - only in PRO mode
            e.addButton("images", {
                type: "splitbutton",
                text: "",
                icon: "image",
                onclick: function () {
                    vm.toggleAdam(true);
                },
                menu: [
                    {
                        text: "Image.AdamImage",
                        tooltip: "Image.AdamImage.Tooltip",
                        icon: "image",
                        onclick: function () { vm.toggleAdam(true); }
                    }, {
                        text: "Image.DnnImage",
                        tooltip: "Image.DnnImage.Tooltip",
                        icon: "image",
                        onclick: function () { vm.openDnnDialog("imagemanager"); }
                    }, {
                        text: "Insert\/edit image", // i18n tinyMce standard
                        icon: "image",
                        onclick: function () { e.execCommand("mceImage"); }

                    },
                    // note: all these use i18n from tinyMce standard
                    { icon: "alignleft", tooltip: "Align left", onclick: function () { e.execCommand("JustifyLeft"); } },
                    { icon: "aligncenter", tooltip: "Align center", onclick: function () { e.execCommand("JustifyCenter"); } },
                    { icon: "alignright", tooltip: "Align right", onclick: function () { e.execCommand("JustifyRight"); } }
                ]
            });

        }
    });