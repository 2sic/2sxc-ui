angular.module("SxcServices")
    /*@ngInject*/
    .factory("languagesSvc", function ($http, eavConfig, svcCreator) {

        // Construct a service for this specific appId
        return function createSvc(appId) {
            var svc = {
                appId: appId
            };

            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get("app-sys/system/getlanguages");//, { params: { appId: svc.appId } });
            }));

            // delete, then reload
            svc.toggle = function toggle(item) {
                return $http.get("app-sys/system/switchlanguage", {params: {cultureCode: item.Code, enable: !item.IsEnabled }})
                    .then(svc.liveListReload);
            };

            svc.save = function save(item) {
                return $http.get("app-sys/system/switchlanguage", { params: { cultureCode: item.Code, enable: item.IsEnabled } })
                    .then(svc.liveListReload);
            };

            return svc;
        };
    });