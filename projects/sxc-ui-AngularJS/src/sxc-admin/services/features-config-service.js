angular.module("SxcServices")
    /*@ngInject*/
    .factory("featuresConfigSvc", function ($http, eavConfig, svcCreator) {

        // Construct a service for this specific appId
        return function createSvc() {
            var svc = {};
            
            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get("app-sys/system/features");
            }));

            svc.reload = function () {
                return $http.get('app-sys/system/features', { params: { reload: true } })
                    .then(svc.liveListReload);
            };

            // this will retrieve an advanced getting-started url to use in an the iframe
            svc.getManageFeaturesUrl = function gettingManageFeaturesUrl() {
                return $http.get("app-sys/system/managefeaturesurl");
            };

            svc.saveFeatures = function saveFeatures(features) {
                return $http.post("app-sys/system/SaveFeatures", features )
                    .then(function (result) {
                        if (result.data === false) // must check for an explicit false, to avoid undefineds
                            alert("server reported that save feature failed"); // todo: i18n
                        return result;
                    })
                    .then(svc.liveListReload);
            };

            return svc;
        };
    });