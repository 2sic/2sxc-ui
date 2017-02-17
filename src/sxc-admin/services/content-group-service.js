
angular.module("SxcServices")
    /*@ngInject*/
    .factory("contentGroupSvc", function ($http) {

        // Construct a service for this specific appId
        return function createSvc(appId) {
            var svc = {
                getItems: function(item) {
                    return $http.get("app-sys/contentgroup/replace", { params: { appId: appId, guid: item.guid, part: item.part, index: item.index } });
                },
                saveItem: function(item) {
                    return $http.post("app-sys/contentgroup/replace", {}, { params: { guid: item.guid, part: item.part, index: item.index, entityId: item.id } });
                },

                getList: function (contentGroup) {
                    return $http.get("app-sys/contentgroup/itemlist", { params: { appId: appId, guid: contentGroup.guid } });
                },

                saveList: function (contentGroup, resortedList) {
                    return $http.post("app-sys/contentgroup/itemlist", resortedList, { params: { appId: appId, guid: contentGroup.guid } });
                },

                getHeader: function (contentGroup) {
                    return $http.get("app-sys/contentgroup/header", { params: { appId: appId, guid: contentGroup.guid } });
                }


            };

            return svc;
        };
    });