angular.module("SxcServices")
    /*@ngInject*/
    .factory("featuresSvc", function ($http, eavConfig, svcCreator) {

        // Construct a service for this specific appId
        return function createSvc() {
            var svc = {};
            
            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get("app-sys/system/features");
            }));

            return svc;
        };
    });