(function () { // TN: this is a helper construct, research iife or read https://github.com/johnpapa/angularjs-styleguide#iife

    angular.module("AppsManagementApp", [
        "EavServices",
        "EavConfiguration",
        "SxcServices",
        "SxcTemplates",         // inline templates
        "EavAdminUi",           // dialog (modal) controller
        "SxcAdminUi"
    ])
        /*@ngInject*/
        .config(function ($translatePartialLoaderProvider) {
            // ensure the language pack is loaded
            $translatePartialLoaderProvider.addPart("sxc-admin");
        })

        .controller("AppList", AppListController)
        ;

    /*@ngInject*/
    function AppListController(appsSvc, eavAdminDialogs, sxcDialogs, eavConfig, appSettings, appId, zoneId, $uibModalInstance, $scope, $window, $translate, featuresConfigSvc, sxc) {
        var vm = this;

        function blankCallback() { }

        var svc = appsSvc(zoneId);
        vm.items = svc.liveList();
        vm.refresh = svc.liveListReload;
        vm.insightsUrl = sxc.resolveServiceUrl('app-sys/insights/help').replace('app-sys', 'sys');
        console.debug('insights url' + vm.insightsUrl);

        

        vm.add = function add() {
            var result = prompt($translate.instant("AppManagement.Prompt.NewApp"));
            if (result)
                svc.create(result);
        };


        vm.tryToDelete = function tryToDelete(item) {
            var result = prompt($translate.instant('AppManagement.Prompt.DeleteApp', { name: item.Name, id: item.Id }));
            //prompt("This cannot be undone. To really delete this app, type (or copy/past) the app-name here: Delete '" + item.Name + "' (" + item.Id + ") ?");
            if (result === null)
                return;
            if (result === item.Name || result === 'yes!')
                svc.delete(item.Id);
            else
                alert($translate.instant('AppManagement.Prompt.FailedDelete'));
        };

        // note that manage MUST open in a new iframe, to give the entire application 
        // a new initial context. otherwise we get problems with AppId and similar
        vm.manage = function manage(item) {
            var url = window.location.href;
            url = url
                .replace(new RegExp("appid=[0-9]*", "i"), "appid=" + item.Id) // note: sometimes it doesn't have an appid, so it's [0-9]* instead of [0-9]+
                .replace(/approot=[^&]*/, "approot=" + item.AppRoot + "/")
                .replace("dialog=zone", "dialog=app");

            sxcDialogs.openTotal(url, svc.liveListReload);
        };


        // when the user changes to the settings-tab
        // it should load the features and show in the table
        // call app-sys/system/features
        var featureConfigService = featuresConfigSvc();
        vm.loadFeatures = featureConfigService.liveList();

        vm.featureSpinner = false;
        vm.featuresShow = true; // initially shows table with list of features and hides iframe (until manage Features button is clicked)

        vm.featuresSwitch = function featuresSwitch() {
            vm.featuresShow = flip(vm.featuresShow); // false - show iframe
            if (!vm.featuresShow) {
                featuresManagement();
            }
        };

        function flip(flag) {
            return !flag;
        }

        function featuresManagement() {
            vm.featureSpinner = true; // show spinner
            new Promise(function (resolve, reject) {
                vm.manageFeaturesUrl = [""]; // set empty iframe
                return resolve(featureConfigService.getManageFeaturesUrl());
            }).then(function (response) {
                var url = response.data;
                if (url.indexOf("error: user needs host permissions") === -1) {
                    vm.manageFeaturesUrl = [url]; // load "Installation and Feature Management" in iframe
                    return url;
                } else {
                    throw "User needs host permissions!";
                }
            }).then(function (url) {
                vm.featureSpinner = false; // hide spinner
                $scope.$apply(); // refresh
            }).catch(function (error) {
                vm.featureSpinner = false;
                vm.featuresShow = true;
                console.log('error', error);
                alert(error);
            });
        }

        vm.featureReload = function() {
            featureConfigService.reload();
        };

        // event to receive message from iframe
        $window.addEventListener('message', function(event) {
            if (typeof (event.data) !== 'undefined') {
                // handle message   
                if (event.origin.endsWith('2sxc.org') === false) {
                    // something from an unknown domain, let's ignore it
                    return;
                }
                vm.featuresCallback(event.data);
                vm.featuresShow = true;
            }
        });

        vm.featuresCallback = function (features) {
            // this should await callbacks from the iframe
            try {
                // and if it gets a valid callback containing a json, it should send it to the server
                var featuresString = JSON.stringify(features);
                // call: app-sys/system/savefeatures
                featureConfigService.saveFeatures(featuresString);                
            } catch (e) {} 
            // you can find examples how this is done in the app/content installer, where the iframe also gives back data to the page
        };


        vm.browseCatalog = function () {
            window.open("http://2sxc.org/apps");
        };


        vm.import = function imp() {
            sxcDialogs.openAppImport(vm.refresh);
        };

        // export is disabled for now, because it actually doesn't use the id given here, but the 
        // original appId - part of #887
        vm.export = function exp(item) {
            var resolve = eavAdminDialogs.CreateResolve({
                appId: item.Id
            });
            return eavAdminDialogs.OpenModal(
                "importexport/export-app.html",
                "ExportApp as vm",
                "lg",
                resolve, blankCallback);
        };

        vm.languages = function languages() {
            sxcDialogs.openLanguages(zoneId, vm.refresh);
        };

        vm.close = function () { $uibModalInstance.dismiss("cancel"); };
    }

}());