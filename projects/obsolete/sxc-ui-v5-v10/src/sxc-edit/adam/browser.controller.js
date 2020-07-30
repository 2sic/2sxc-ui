(function () {
  /* jshint laxbreak:true */
  "use strict";

  var app = angular.module("Adam");

  // The controller for the main form directive
  app.controller("BrowserController", BrowserController);

  /*@ngInject*/
  function BrowserController($scope, adamSvc, debugState, eavConfig, eavAdminDialogs, appRoot, fileType, featuresSvc, toastr) {
    var vm = this;
    vm.debug = debugState;

    vm.clipboardPasteImageFunctionalityDisabled = true;

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

      // add clipboard paste image feature if enabled
      featuresSvc.enabled('f6b8d6da-4744-453b-9543-0de499aa2352').then(
        function (enabled) {
          if (enabled) {
            vm.clipboardPasteImageFunctionalityDisabled = false;
          }
        });
    };

    initConfig();

    vm.show = false;
    vm.appRoot = appRoot;
    vm.adamModeConfig = $scope.adamModeConfig;

    vm.disabled = $scope.ngDisabled;
    vm.enableSelect = ($scope.enableSelect === false) ? false : true; // must do it like this, $scope.enableSelect || true will not work

    vm.activate = function () {
      if ($scope.autoLoad)
        vm.toggle();
      if ($scope.registerSelf)
        $scope.registerSelf(vm);
    };

    // load svc...
    vm.svc = adamSvc(vm.contentTypeName, vm.entityGuid, vm.fieldName, vm.subFolder, $scope.adamModeConfig);

    vm.allowEdit = function() { 
      return vm.svc.getAllowEdit();
    };

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
          .then(vm.refresh)
          .catch(function(error) {
            console.error(error);
            toastr.error('permission denied', 'can\'t create new folder'); // todo i18n
          });
    };

    vm.del = function del(item) {
      if (vm.disabled)
        return;
      var ok = window.confirm("Are you sure you want to delete this item?"); // todo i18n
      if (ok)
        vm.svc.delete(item)
        .catch(function(error) {
          console.error(error);
          toastr.error('permission denied', 'can\'t delete'); // todo i18n
        });
    };

    vm.rename = function rename(item) {
      var newName = window.prompt('Rename the file / folder to: ', item.Name);
      if (newName)
        vm.svc.rename(item, newName)
        .catch(function(error) {
          console.error(error);
          toastr.error('permission denied', 'can\'t rename'); // todo i18n
        });
    };

    //#region Folder Navigation
    vm.goIntoFolder = function (folder) {
      var subFolder = vm.svc.goIntoFolder(folder);
      vm.subFolder = subFolder;
    };

    vm.goUp = function () {
      vm.subFolder = vm.svc.goUp();
    };

    vm.currentFolderDepth = function () {
      return vm.svc.folders.length;
    };

    vm.allowCreateFolder = function () {
      return (vm.allowEdit()) && (vm.svc.folders.length < vm.folderDepth);
    };
    //#endregion

    //#region Metadata
    vm.editMetadata = function (item) {
      var items = [
        vm._itemDefinition(item, vm.getMetadataType(item))
      ];

      eavAdminDialogs.openEditItems(items, vm.refresh);
    };

    vm.getMetadataType = function (item) {
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
  }

})();
