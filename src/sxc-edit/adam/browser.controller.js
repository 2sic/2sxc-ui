(function () {
    /* jshint laxbreak:true */
    "use strict";

    var app = angular.module("Adam"); 

    // The controller for the main form directive
    app.controller("BrowserController", BrowserController);
    
    /*@ngInject*/
    function BrowserController($scope, adamSvc, debugState, eavConfig, eavAdminDialogs, appRoot, fileType) {
        var vm = this;
        vm.debug = debugState;

        var initConfig = function initConfig() {
            vm.contentTypeName = $scope.contentTypeName;
            vm.entityGuid = $scope.entityGuid;
            vm.fieldName = $scope.fieldName;
            vm.subFolder = $scope.subFolder || "";
            vm.showImagesOnly = $scope.showImagesOnly = $scope.showImagesOnly || false;

            vm.folderDepth = (typeof $scope.folderDepth !== 'undefined' && $scope.folderDepth !== null)
                ? $scope.folderDepth
                : 2;
            vm.showFolders = !!vm.folderDepth;
            vm.allowAssetsInRoot = $scope.allowAssetsInRoot || true;    // if true, the initial folder can have files, otherwise only subfolders
            vm.metadataContentTypes = $scope.metadataContentTypes || "";
        };

        initConfig();
        
        vm.show = false;
        vm.appRoot = appRoot;        
        vm.adamModeConfig = $scope.adamModeConfig;

        vm.disabled = $scope.ngDisabled;
        vm.enableSelect = ($scope.enableSelect === false) ? false : true; // must do it like this, $scope.enableSelect || true will not work

        vm.activate = function () {
            if($scope.autoLoad)
                vm.toggle();
            if ($scope.registerSelf)
                $scope.registerSelf(vm);
        };

        // load svc...
        vm.svc = adamSvc(vm.contentTypeName, vm.entityGuid, vm.fieldName, vm.subFolder, $scope.adamModeConfig);

        // refresh - also used by callback after an upload completed
        vm.refresh = vm.svc.liveListReload;

        vm.get = function () {
            vm.items = vm.svc.liveList();
            vm.folders = vm.svc.folders;
            vm.svc.liveListReload();
        };

        vm.toggle = function toggle(newConfig) {
            // Reload configuration
            initConfig();
            var configChanged = false;
            if (newConfig) {
                // Detect changes in config, allows correct toggle behaviour
                if (JSON.stringify(newConfig) !== vm.oldConfig)
                    configChanged = true;
                vm.oldConfig = JSON.stringify(newConfig);

                vm.showImagesOnly = newConfig.showImagesOnly;
                $scope.adamModeConfig.usePortalRoot = !!(newConfig.usePortalRoot);
            }

            vm.show = configChanged || !vm.show;
            
            if (!vm.show)
                $scope.adamModeConfig.usePortalRoot = false;

            // Override configuration in portal mode
            if ($scope.adamModeConfig.usePortalRoot) {
                vm.showFolders = true;
                vm.folderDepth = 99;
            }

            if (vm.show)
                vm.get();
        };

        vm.openUpload = function () {
            // debugger;
            vm.dropzone.openUpload();
        };

        vm.select = function (fileItem) {
            if (vm.disabled || !vm.enableSelect)
                return;
            $scope.updateCallback(fileItem);
        };

        vm.addFolder = function () {
            if (vm.disabled)
                return;
            var folderName = window.prompt("Please enter a folder name"); // todo i18n
            if (folderName)
                vm.svc.addFolder(folderName)
                    .then(vm.refresh);
        };

        vm.del = function del(item) {
            if (vm.disabled)
                return;
            var ok = window.confirm("Are you sure you want to delete this item?"); // todo i18n
            if (ok)
                vm.svc.delete(item);
        };

        vm.rename = function rename(item) {
            var newName = window.prompt('Rename the file / folder to: ', item.Name);
            if (newName)
                vm.svc.rename(item, newName);
        };

        //#region Folder Navigation
        vm.goIntoFolder = function (folder) {
            var subFolder = vm.svc.goIntoFolder(folder);
            vm.subFolder = subFolder;
        };

        vm.goUp = function () {
            vm.subFolder = vm.svc.goUp();
        };

        vm.currentFolderDepth = function() {
            return vm.svc.folders.length;
        };

        vm.allowCreateFolder = function() {
            return vm.svc.folders.length < vm.folderDepth;
        };
        //#endregion

        //#region Metadata
        vm.editMetadata = function(item) {
            var items = [
                vm._itemDefinition(item, vm.getMetadataType(item))
            ];

            eavAdminDialogs.openEditItems(items, vm.refresh);
        };

        vm.getMetadataType = function(item) {
            var found;

            // check if it's a folder and if this has a special registration
            if (item.Type === "folder") {
                found = vm.metadataContentTypes.match(/^(folder)(:)([^\n]*)/im);
                if (found)
                    return found[3];
                else 
                    return null;
            }

            // check if the extension has a special registration
            // -- not implemented yet

            // check if the type "image" or "document" has a special registration
            // -- not implemneted yet


            // nothing found so far, go for the default with nothing as the prefix 
            found = vm.metadataContentTypes.match(/^([^:\n]*)(\n|$)/im);
            if (found)
                return found[1];

            // this is if we don't find anything
            return null;
        };

        // todo: move to service, shouldn't be part of the application
        vm._itemDefinition = function (item, metadataType) {
            var title = "EditFormTitle.Metadata"; // todo: i18n
            return item.MetadataId !== 0
                ? { EntityId: item.MetadataId, Title: title } // if defined, return the entity-number to edit
                : {
                    ContentTypeName: metadataType, // otherwise the content type for new-assegnment
                    Metadata: {
                        Key: (item.Type === "folder" ? "folder" : "file") + ":" + item.Id,
                        KeyType: "string",
                        TargetType: eavConfig.metadataOfCmsObject
                    },
                    Title: title,
                    Prefill: { EntityTitle: item.Name } // possibly prefill the entity title 
                };

        };

        //#endregion

        //#region icons
        vm.icon = function (item) {
            return fileType.getIconClass(item.Name);
        };
        //#endregion

        vm.allowedFileTypes = [];
        if ($scope.fileFilter) {
            vm.allowedFileTypes = $scope.fileFilter.split(',').map(function (i) {
                return i.replace('*', '').trim();
            });
        }

        vm.fileEndingFilter = function (item) {
            if (vm.allowedFileTypes.length === 0)
                return true;
            var extension = item.Name.match(/(?:\.([^.]+))?$/)[0];
            return vm.allowedFileTypes.indexOf(extension) != -1;
        };

        vm.activate();

        $scope.copyPasted = function (event) {
            var clipData = event.clipboardData;
            angular.forEach(clipData.items, function (item, key) {
                if (clipData.items[key].type.match(/image.*/)) {
                    // if it is a image form clipboard
                    var img = clipData.items[key].getAsFile();
                    // input image filename
                    if (browser() !== 'Edge') {
                        var imageFileName = 'image.png';
                        // todo: generate hash sha256 for name
                        imageFileName = window.prompt('Enter clipboard image file name: ', imageFileName); // todo: i18n 
                        img = twoSxcFile(img, imageFileName);
                    }
                    // todo: convert png to jpg
                    vm.dropzone.processFile(img);
                }
            });
        };


        /**
         * convert blob image to jpeg
         * @param {any} file
         * @param {any} quality
         * @param {any} outputFormat
         */
        function convertImageFormat(file, quality, outputFormat) {

            var mimeType;
            if (outputFormat === 'png') {
                mimeType = 'image/png';
            } else if (outputFormat === 'webp') {
                mimeType = 'image/webp';
            } else {
                mimeType = 'image/jpeg';
            }

            var img = new Image();
            img.src = URL.createObjectURL(file);
            URL.revokeObjectURL(img.src); // free up memory

            var canvas = document.createElement('canvas'); // create a temp. canvas
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d').drawImage(img, 0, 0);

            // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
            canvas.toBlob(function (blob) {
                file = new File([blob], file.name, { type: 'application/octet-stream' });
            }, mimeType, quality / 100);
        }


        /**
         * compress image to jpeg, png or webp
         * @param {Image} sourceImgObj
         * @param {integer} quality
         * @param {string} outputFormat
         */
        function compress(sourceImgObj, quality, outputFormat) {

            var mimeType;
            if (outputFormat === 'png') {
                mimeType = 'image/png';
            } else if (outputFormat === 'webp') {
                mimeType = 'image/webp';
            } else {
                mimeType = 'image/jpeg';
            }

            var canvas = document.createElement('canvas');
            canvas.width = sourceImgObj.naturalWidth;
            canvas.height = sourceImgObj.naturalHeight;
            var ctx = canvas.getContext('2d').drawImage(sourceImgObj, 0, 0);

            var newImageData = canvas.toDataURL(mimeType, quality / 100);
            var resultImageObj = new Image();
            resultImageObj.src = newImageData;
            return resultImageObj;
        }

        /**
         * creates new customized file
         * @param {File} file
         * @param {string} fileName
         */
        function twoSxcFile(file, fileName) {
            var data = new FormData();
            data.append('file', file, fileName);
            var newFile = data.get('file');
            return newFile;
        }

        /**
         * Gets the browser name or returns an empty string if unknown. 
         * This function also caches the result to provide for any 
         * future calls this function has.
         * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
         *
         * @returns {string}
         */
        function browser() {
            // Return cached result if avalible, else get result then cache it.
            if (browser.prototype._cachedResult)
                return browser.prototype._cachedResult;

            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            // Blink engine detection
            var isBlink = (isChrome || isOpera) && !!window.CSS;

            browser.prototype._cachedResult =
                isOpera ? 'Opera' :
                isFirefox ? 'Firefox' :
                isSafari ? 'Safari' :
                isChrome ? 'Chrome' :
                isIE ? 'IE' :
                isEdge ? 'Edge' :
                isBlink ? 'Blink' :
                "Don't know";

            return browser.prototype._cachedResult;
        }

    }

})();
