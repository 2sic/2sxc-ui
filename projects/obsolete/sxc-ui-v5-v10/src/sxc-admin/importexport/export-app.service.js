﻿(function () {
    angular.module("ImportExport")
        .factory("ExportAppService", ExportAppService)
    ;


    /*@ngInject*/
    function ExportAppService(appId, zoneId, eavConfig, $http, $q) {
        var srvc = {
            getAppInfo: getAppInfo,
            exportApp: exportApp,
            exportForVersionControl: exportForVersionControl
        };
        return srvc;

        function getAppInfo() {
            return $http.get(eavConfig.getUrlPrefix("api") + "/app-sys/ImportExport/GetAppInfo", { params: { appId: appId, zoneId: zoneId } }).then(function (result) { return result.data; });
        }

        function exportApp(includeContentGroups, resetAppGuid) {
            window.open(eavConfig.getUrlPrefix("api") + "/app-sys/ImportExport/ExportApp?appId=" + appId + "&zoneId=" + zoneId + "&includeContentGroups=" + includeContentGroups + "&resetAppGuid=" + resetAppGuid, "_self", "");
            return $q.when(true);
        }

        function exportForVersionControl(includeContentGroups, resetAppGuid) {
            // todo: put params in nice params object
            return $http.get("app-sys/ImportExport/ExportForVersionControl?appId=" + appId + "&zoneId=" + zoneId + "&includeContentGroups=" + includeContentGroups + "&resetAppGuid=" + resetAppGuid);

        }
    }
}());