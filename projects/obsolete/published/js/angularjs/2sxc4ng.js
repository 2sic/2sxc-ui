/*
    Extending 2sxc with angular capabilities
    This is an angular module which provides all 2sxc-information and services to an angular app
    It will be auto-added to your app when you use the bootstrapping
*/
(function (angular) {
    angular.module("2sxc4ng", ["ng"])
        // Configure $http for DNN web services (security tokens etc.)
        // ReSharper disable InconsistentNaming
        .config(function($httpProvider, HttpHeaders) {
        // ReSharper restore InconsistentNaming
            angular.extend($httpProvider.defaults.headers.common, HttpHeaders);
            $httpProvider.interceptors.push(function($q, sxc) {
                return {
                    // Rewrite 2sxc-urls if necessary
                    'request': function(config) {
                        config.url = sxc.resolveServiceUrl(config.url);
                        return config;
                    },

                    // Show very nice error if necessary
                    'responseError': function(rejection) {
                        if (!rejection.config.ignoreErrors)
                            sxc.showDetailedHttpError(rejection);
                        return $q.reject(rejection);
                    }
                };
            });

        })

        // provide the global $2sxc object to angular modules as a clear, clean dependency
        .factory("$2sxc", function() {
            if (!$2sxc) throw "the Angular service '$2sxc' in module '2sxc4ng' can't find the global $2sxc controller";
            return $2sxc;
        })

        // Provide the app-specific sxc helper for this module
        // ReSharper disable InconsistentNaming
        .factory("sxc", function(AppInstanceId, $2sxc) {
        // ReSharper restore InconsistentNaming
            // if (window.console) console.log("creating sxc service for id: " + AppInstanceId);
            var ngSxc = $2sxc(AppInstanceId); // make this service be the 2sxc-controller for this module
            return ngSxc;
        })


        /// Standard entity commands like get one, many etc.
        .factory("content", function($http) {
            // construct a service just for this content-type
            return function(contentType) {
                var oneType = {};
                oneType.contentType = contentType;
                oneType.root = "app/auto/content/" + contentType;

                // will get one or all of a content-type, depending on if an id was supplied
                oneType.get = oneType.read = function get(id) {
                    return $http.get(oneType.root + (id ? "/" + id : ""));
                };
                oneType.create = function create(values) {
                    return $http.post(oneType.root, values);
                };
                oneType.update = oneType.patch = function update(values, id) {
                    var realId = id || values.Id || values.id; // automatically use the correct Id
                    return $http.post(oneType.root + "/" + realId, values);
                };
                oneType.delete = function del(id) {
                    return $http.delete(oneType.root + "/" + id);
                };
                return oneType;
            };
        })

        /// simple helper service which will call a query
        .factory("query", function($http, sxc) {
            var createQueryObj = function(name) {
                var qry = {
                    root: "app/auto/query/" + name
                };

                qry.get = function(config) {
                    return !name
                        ? $http(angular.extend({ url: sxc.data.sourceUrl() }, config)) // otherwise use the current-view stuff
                        : $http.get(qry.root, config); // if it has a name, call that specific query
                };

                return qry;
            };

            return createQueryObj;
        })

        .directive("sxcToolbar", function(sxc) {
            return {
                restrict: "E",
                scope: {
                    // official syntax uses the toolbar configuration and the settings as standardized in 2sxc 8.6
                    // read about it in https://github.com/2sic/2sxc/wiki/AngularJs-1-Overview
                    toolbar: "&toolbar",
                    settings: "&settings"
                },
                link: function(scope, element, attrs) {
                    var manageCtrl = sxc.manage;
                    var toolbar = "";

                    // the manage only exists when in edit mode
                    if (manageCtrl) {
                        // run in new mode as defined in 2sxc 8.6
                        var tbObj = scope.toolbar();
                        if (tbObj !== undefined) {
                            var setObj = scope.settings();
                            toolbar = manageCtrl.getToolbar(tbObj, setObj);
                        }

                    }

                    element.html(toolbar);
                }
            };
        });
})(angular);