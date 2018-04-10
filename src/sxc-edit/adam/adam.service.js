// note: don't prefix angular with window - something fails in production build if you do that
// ReSharper disable PossiblyUnassignedProperty
angular.module('Adam')
    /*@ngInject*/
    .factory('adamSvc', function ($http, eavConfig, sxc, svcCreator, appRoot, appId) {

        // Construct a service for this specific appId
        return function createSvc(contentType, entityGuid, field, subfolder, serviceConfig) {
            var svc = {
                url: sxc.resolveServiceUrl('app-content/' + contentType + '/' + entityGuid + '/' + field),
                subfolder: subfolder,
                folders: [],
                adamRoot: appRoot.substr(0, appRoot.indexOf('2sxc'))
            };

            // get the correct url for uploading as it is needed by external services (dropzone)
            svc.uploadUrl = function(targetSubfolder) {
                var url = (targetSubfolder === '')
                    ? svc.url
                    : svc.url + '?subfolder=' + targetSubfolder;
                url += (url.indexOf('?') === -1 ? '?' : '&')
                    + 'usePortalRoot=' + serviceConfig.usePortalRoot
                    + '&appId=' + appId;
                return url;
            };

            // extend a json-response with a path (based on the adam-root) to also have a fullPath
          svc.addFullPath = function(value, key) {
            // 2dm 2018-03-29 special fix - sometimes the path already has the full path, sometimes not
            // it should actually be resolved properly, but because I don't have time
            // ATM (data comes from different web-services, which are also used in other places
            // I'll just check if it's already in there
            value.fullPath = value.Path;
            // debugger;
            if(value.Path && value.Path.toLowerCase().indexOf(svc.adamRoot.toLowerCase()) === -1)
              value.fullPath = svc.adamRoot + value.Path;
          };

            svc = angular.extend(svc, svcCreator.implementLiveList(function getAll() {
                return $http.get(svc.url + '/items',
                        {
                            params: {
                                subfolder: svc.subfolder,
                                usePortalRoot: serviceConfig.usePortalRoot,
                                appId: appId
                            }
                        })
                    .then(function(result) {
                        angular.forEach(result.data, svc.addFullPath);
                        return result;
                    });
            }));

            // create folder
            svc.addFolder = function (newfolder) {
                return $http.post(svc.url + '/folder',
                        {},
                        {
                            params: {
                                subfolder: svc.subfolder,
                                newFolder: newfolder,
                                usePortalRoot: serviceConfig.usePortalRoot,
                                appId: appId
                            }
                        })
                    .then(svc.liveListReload);
            };

            svc.goIntoFolder = function(childFolder) {
                svc.folders.push(childFolder);
                var pathParts = childFolder.Path.split('/');
                var subPath = '';
                for (var c = 0; c < svc.folders.length; c++)
                    subPath = pathParts[pathParts.length - c - 2] + '/' + subPath;

                subPath = subPath.replace('//', '/');
                if (subPath[subPath.length - 1] === '/')
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
                    svc.subfolder = '';
                }
                svc.liveListReload();
                return svc.subfolder;
            };

            // delete, then reload
            // IF verb DELETE fails, so I'm using get for now
            svc.delete = function (item) {
                return $http.get(svc.url + '/delete',
                        {
                            params: {
                                subfolder: svc.subfolder,
                                isFolder: item.IsFolder,
                                id: item.Id,
                                usePortalRoot: serviceConfig.usePortalRoot,
                                appId: appId
                            }
                        })
                    .then(svc.liveListReload);
            };

            // rename, then reload
            svc.rename = function (item, newName) {
                return $http.get(svc.url + '/rename',
                        {
                            params: {
                                subfolder: svc.subfolder,
                                isFolder: item.IsFolder,
                                id: item.Id,
                                usePortalRoot: serviceConfig.usePortalRoot,
                                newName: newName,
                                appId: appId
                            }
                        })
                    .then(svc.liveListReload);
            };
            
            svc.reload = svc.liveListReload;

            return svc;
        };
    });
// ReSharper restore PossiblyUnassignedProperty
