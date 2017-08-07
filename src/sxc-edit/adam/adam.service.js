angular.module("Adam")
    /*@ngInject*/
    .factory("adamSvc", function ($http, eavConfig, sxc, svcCreator, appRoot) {

        // Construct a service for this specific appId
        return function createSvc(contentType, entityGuid, field, subfolder, serviceConfig) {
            var svc = {
                url: sxc.resolveServiceUrl("app-content/" + contentType + "/" + entityGuid + "/" + field),
                subfolder: subfolder,
                folders: [],
                adamRoot: appRoot.substr(0, appRoot.indexOf("2sxc"))
            };

            // get the correct url for uploading as it is needed by external services (dropzone)
            svc.uploadUrl = function(targetSubfolder) {
                var url = (targetSubfolder === "")
                    ? svc.url
                    : svc.url + "?subfolder=" + targetSubfolder;
                url += (url.indexOf("?") == -1 ? "?" : "&") + "usePortalRoot=" + serviceConfig.usePortalRoot;
                return url;
            };

            // extend a json-response with a path (based on the adam-root) to also have a fullPath
            svc.addFullPath = function addFullPath(value, key) {
                value.fullPath = svc.adamRoot + value.Path;
            };

            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get(svc.url + "/items", { params: { subfolder: svc.subfolder, usePortalRoot: serviceConfig.usePortalRoot } })
                    .then(function (result) {
                        angular.forEach(result.data, svc.addFullPath);
                        return result;
                    });
            }));

            // create folder
            svc.addFolder = function add(newfolder) {
                return $http.post(svc.url + "/folder", {}, { params: { subfolder: svc.subfolder, newFolder: newfolder, usePortalRoot: serviceConfig.usePortalRoot } })
                    .then(svc.liveListReload);
            };

            svc.goIntoFolder = function(childFolder) {
                svc.folders.push(childFolder);
                var pathParts = childFolder.Path.split("/");
                var subPath = "";
                for (var c = 0; c < svc.folders.length; c++)
                    subPath = pathParts[pathParts.length - c - 2] + "/" + subPath;

                subPath = subPath.replace("//", "/");
                if (subPath[subPath.length - 1] === "/")
                    subPath = subPath.substr(0, subPath.length - 1);

                childFolder.Subfolder = subPath;

                // now assemble the correct subfolder based on the folders-array
                svc.subfolder = subPath;
                svc.liveListReload();
                return subPath;
            };

            svc.goUp = function() {
                if (svc.folders.length > 0)
                    svc.folders.pop();
                if (svc.folders.length > 0) {
                    svc.subfolder = svc.folders[svc.folders.length - 1].Subfolder;
                } else {
                    svc.subfolder = "";
                }
                svc.liveListReload();
                return svc.subfolder;
            };

            // delete, then reload
            // IF verb DELETE fails, so I'm using get for now
            svc.delete = function del(item) {
                return $http.get(svc.url + "/delete", { params: { subfolder: svc.subfolder, isFolder: item.IsFolder, id: item.Id, usePortalRoot: serviceConfig.usePortalRoot  } })
                    .then(svc.liveListReload);
            };
            
            svc.reload = svc.liveListReload;

            return svc;
        };
    });