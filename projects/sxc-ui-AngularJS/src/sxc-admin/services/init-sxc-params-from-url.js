﻿// By default, eav-controls assume that all their parameters (appId, etc.) are instantiated by the bootstrapper
// but the "root" component must get it from the url
// Since different objects could be the root object (this depends on the initial loader), the root-one must have
// a connection to the Url, but only when it is the root
// So the trick is to just include this file - which will provide values for the important attribute
//
// As of now, it supplies
// - dialog -> which dialog to show
// - tabid -> the url tab id
// - items - list of items to edit

//(function () {
    angular.module("InitSxcParametersFromUrl", ["2sxc4ng"])
        /*@ngInject*/
        .factory("dialog", function ($2sxc) {
            return $2sxc.urlParams.get("dialog");
        })
        /*@ngInject*/
        .factory("tabId", function ($2sxc) {
            return $2sxc.urlParams.get("tid");
        })
        /*@ngInject*/
        .factory("websiteRoot", function ($2sxc) {
            return $2sxc.urlParams.get("websiteroot");
        })
        /*@ngInject*/
        .factory("systemRoot", function (websiteRoot) {
            return websiteRoot + "desktopmodules/tosic_sexycontent/";
        })
        /*@ngInject*/
        .factory("portalRoot", function ($2sxc) {
            return $2sxc.urlParams.get("portalroot");
        })
        /*@ngInject*/
        .factory("appRoot", function ($2sxc) {
                return $2sxc.urlParams.get("appRoot");
        })
        /*@ngInject*/
        .factory("items", function ($2sxc) {
                var found = $2sxc.urlParams.get("items");
                if (found)
                    return (found) ? JSON.parse(found) : null;
        })
        /*@ngInject*/
        .factory("beta", function ($2sxc) {
            return $2sxc.urlParams.get("beta");
        })
    ;



// }());