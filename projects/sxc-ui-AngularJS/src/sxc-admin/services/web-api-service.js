angular.module("SxcServices")
    /*@ngInject*/
    .factory("webApiSvc", function ($http, eavConfig, svcCreator) {

        // Construct a service for this specific appId
        return function createSvc(appId) {
            var svc = {
                appId: appId
            };

            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get("app-sys/appassets/list", { params: { appId: svc.appId, path: "api", mask: "*.cs" } });
            }));

            return svc;
        };
    });