(function () {
    window: window.parent,
    sxc: iframe.sxc,
    contentBlock: iframe.sxc.manage.contentBlock,
    // getManageInfo: iframe.getManageInfo,
    dashInfo: iframe.getAdditionalDashboardConfig
    var svc = moduleApiService;
    var di = vm.dashInfo = wrapper.dashInfo();

    /*@ngInject*/
    module.controller("TemplateSelectorCtrl", function ($scope, $interval, moduleApiService, AppInstanceId, sxc, $filter, $q, $window, $translate, $sce, contentBlockLink, $http) {
        // Auto-set view-dropdown if content-type changed
        realScope.$watch("vm.contentTypeId", function (newContentTypeId, oldContentTypeId) {
            if (newContentTypeId === oldContentTypeId)
                return;
            // Select first template if contentType changed
            var firstTemplateId = vm.filteredTemplates(newContentTypeId)[0].TemplateId;
            if (vm.templateId !== firstTemplateId && firstTemplateId !== null)
                vm.templateId = firstTemplateId;
        });

        // Save/reload on app-change or show import-window
        realScope.$watch("vm.appId", function (newAppId, oldAppId) {
            if (newAppId === oldAppId || newAppId === null)
                return;

            // special case: add app
            if (newAppId === cAppActionImport) {
                return vm.appImport();
            }

            // find new app specs
            var newApp = $filter('filter')(vm.apps, { AppId: newAppId })[0];

            svc.setAppId(newAppId)
                .then(function () {
                    if (newApp.SupportsAjaxReload) {
                        vm.reInitAll(true); // special code to force app-change/reload
                    } else
                        wrapper.window.location.reload();
                });
        });

        vm.manageApps = function () { wrapper.sxc.manage.run("zone"); };
        vm.appSettings = function () { wrapper.sxc.manage.run("app"); };
        vm.appImport = function () { wrapper.sxc.manage.run("app-import"); };

        // Cancel and reset back to original state
        vm.cancelTemplateChange = wrapper.contentBlock._cancelTemplateChange;

        // store the template state to the server, optionally force create of content, and hide the selector
        vm.persistTemplate = wrapper.contentBlock.persistTemplate;
        vm.renderTemplate = wrapper.contentBlock.reload;  // just map to that method
        vm.reInitAll = wrapper.contentBlock.reloadAndReInitialize;  // just map to that method

        vm.appStore = function () {
            window.open("http://2sxc.org/en/apps");
        };
        
        // Optionally change the show state, then 
        // check if it should be shown and load/show
        vm.show = function (stateChange) {
            // todo 8.4 disabled this, as this info should never be set from here again...
            if (stateChange !== undefined)  // optionally change the show-state
                vm.dashInfo.templateChooserVisible = stateChange;

            if (vm.dashInfo.templateChooserVisible) {
                var promises = [];
                if (vm.appId !== null) // if an app had already been chosen OR the content-app (always chosen)
                    promises.push(vm.reloadTemplatesAndContentTypes());

                // if it's the app-dialog and the app's haven't been loaded yet...
                if (!vm.isContentApp && vm.apps.length === 0)
                    promises.push(vm.loadApps());
                $q.all(promises).then(vm.externalInstaller.showIfConfigIsEmpty);
            }
        };

        //#region some *Installer* helpers to show the i-frame and link up the ablity to then install stuff
        vm.externalInstaller = {
            // based on situation, decide if we should show the auto-install IFrame
            showIfConfigIsEmpty: function () {
                var showAutoInstaller = (vm.isContentApp)
                    ? vm.templates.length === 0
                    : vm.appCount === 0;

                if (showAutoInstaller)
                    vm.externalInstaller.setup();
            },

            configureCallback: function setupCallback() {
                window.addEventListener("message", function forwardMessage(event) {
                    processInstallMessage(event, AppInstanceId, vm.progressIndicator, $http); // this calls an external, non-angular method to handle resizing & installation...
                }, false);
            },

            setup: function () {
                svc.gettingStartedUrl().then(function (result) {
                    if (result.data) {  // only show getting started if it's really still a blank system, otherwise the server will return null, then don't do anything
                        vm.externalInstaller.configureCallback();
                        vm.showRemoteInstaller = true;
                        enableProgressIndicator();
                        vm.remoteInstallerUrl = $sce.trustAsResourceUrl(result.data);
                        console.log(result.data);
                    }
                });
            }
        };
        //#endregion

        // todo 8.4 - this should re-load state if re-shown
        vm.toggle = function () {
            if (vm.dashInfo.templateChooserVisible)
                vm.cancelTemplateChange();
            else {
                vm.show(true);
            }
        };

        vm.loadApps = function () {
            return svc.getSelectableApps()
                .then(function (data) {
                    vm.apps = data.data;
                    vm.appCount = data.data.length; // needed in the future to check if it shows getting started

                    if (vm.showAdvanced) {
                        vm.apps.push({ Name: "TemplatePicker.Install", AppId: cAppActionImport });
                        //vm.apps.push({ Name: "create your own app...", AppId: cAppActionCreate }); // todo: i18n
                        //vm.apps.push({ Name: "manage apps...", AppId: cAppActionManage }); // todo: i18n
                    }
                });
        };

        //#region initialize this

        vm.activate = function () {
            vm.show(true);
        };

        vm.activate();

        //#endregion
    });
})();