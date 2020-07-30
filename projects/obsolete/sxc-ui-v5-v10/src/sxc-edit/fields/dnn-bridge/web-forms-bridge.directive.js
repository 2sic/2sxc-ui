﻿
// this is in charge of the iframe which shows the dnn-bridge components

(function () {
	"use strict";

	angular.module("sxcFieldTemplates")


    /*@ngInject*/
	.directive("webFormsBridge", function (sxc, portalRoot) {
	    var webFormsBridgeUrl = portalRoot + "Default.aspx?tabid=" + $2sxc.urlParams.require("tid") + "&ctl=webformsbridge&mid=" + sxc.id + "&dnnprintmode=true&SkinSrc=%5bG%5dSkins%2f_default%2fNo+Skin&ContainerSrc=%5bG%5dContainers%2f_default%2fNo+Container"; //"&popUp=true";

		return {
			restrict: "A",
			scope: {
				type: "@bridgeType",
				bridge: "=webFormsBridge",
				bridgeSyncHeight: "@bridgeSyncHeight"
			},
			link: function (scope, elem, attrs) {

			    var params = "";
			    if (scope.bridge.params) {
			        params = Object.keys(scope.bridge.params).map(function (prop) {
			            if (scope.bridge.params[prop] === null || scope.bridge.params[prop] === '')
			                return;
			            return [prop, scope.bridge.params[prop]].map(encodeURIComponent).join("=");
			        }).join("&");
			    }

			    elem[0].src = webFormsBridgeUrl + "&type=" + scope.type + (scope.bridge.params ? "&" + params : "");
				elem.on("load", function () {					
				    var w = elem[0].contentWindow || elem[0];
                    // test if the connectBridge works, if not, it's usually a telerik-not-installed issue
				    if (!w.connectBridge)
				        return alert("can't connect to the dialog - you are probably running a new DNN (v.8+) and didn't activate the old Telerik components. Please install these in the host > extensions to get this to work");
				    
					w.connectBridge(scope.bridge);

					// Sync height
					if (scope.bridgeSyncHeight === "true") {
						
						var resize = function () {
							elem.css("height", "");
							elem.css("height", w.document.body.scrollHeight + "px");
						};

						//w.$(w).resize(resize); // Performance issues when uncommenting this line...
						resize();
						w.$(w.document).ready(function() {
							resize();
						});
						w.$(w.document).on('triggerbridgeresize', function () {
						    window.setTimeout(resize, 0);
						});

					}
				});
			}
		};
	});

})();