(function () {

    angular.module("ImportExport")
        .factory("ExportContentService", ExportContentService)
    ;


    /*@ngInject*/
    function ExportContentService(appId, zoneId, eavConfig, $http, $q) {
        return {
            getContentInfo: getContentInfo,
            exportContent: exportContent
        };

        function getContentInfo(scope) {
            return $http.get(eavConfig.getUrlPrefix("api") + "/app-sys/ImportExport/GetContentInfo", { params: { appId: appId, zoneId: zoneId, scope: scope || "2SexyContent" } }).then(function (result) { return result.data; });
        }

        function exportContent(contentTypeIds, entityIds, templateIds) {
            window.open(eavConfig.getUrlPrefix("api") + "/app-sys/ImportExport/ExportContent?appId=" + appId + "&zoneId=" + zoneId + "&contentTypeIdsString=" + contentTypeIds.join(";") + "&entityIdsString=" + entityIds.join(";") + "&templateIdsString=" + templateIds.join(";"), "_self", "");
            return $q.when(true);
        }

    }

}());