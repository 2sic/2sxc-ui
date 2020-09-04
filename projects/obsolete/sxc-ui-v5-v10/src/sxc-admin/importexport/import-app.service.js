(function () {

    angular.module("ImportExport")
        .factory("ImportAppService", ImportAppService)
    ;


    function ImportAppService(appId, zoneId, eavConfig, $http, $q) {
        var srvc = {
            importApp: importApp,
        };
        return srvc;


        function importApp(file, name) {
            return $http({
                method: "POST",
                url: "app-sys/ImportExport/ImportApp",
                headers: { "Content-Type": undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("AppId", data.AppId);
                    formData.append("ZoneId", data.ZoneId);
                    formData.append("File", data.File);
                    formData.append("Name", data.Name ? data.Name : '');
                    return formData;
                },
                data: { AppId: appId, ZoneId: zoneId, File: file, Name: name }
            });
        }
    }
}());