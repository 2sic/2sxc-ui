// module specific stuff
$(function () {

    $quickE.modActions.click(function () {
        var type = $(this).data("type"),
            dnnMod = $quickE.main.actionsForModule,
            pane = dnnMod.closest($quickE.selectors.mod.listSelector),
            paneName = pane.attr("id").replace("dnn_", "");

        var index = 0;
        if (dnnMod.hasClass("DnnModule")) 
            index = pane.find(".DnnModule").index(dnnMod[0]) + 1;
        

        var cbAction = $(this).data("action");
        if (cbAction)
            return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);

        return sendDnnAjax("GetPortalDesktopModules", { 
            data: "category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=",
            success: function (desktopModules) {
                var moduleToFind = type === "Default" ? " Content" : " App";
                var module = null;

                desktopModules.forEach(function (e, i) {
                    if (e.ModuleName === moduleToFind)
                        module = e;
                });

                return (!module)
                    ? alert(moduleToFind + " module not found.")
                    : createMod(paneName, index, module.ModuleID);
            }
        });
    });

    function xhrError (xhr) {
        alert("Error while adding module.");
        console.log(xhr);
    }

    // service calls we'll need
    function sendDnnAjax(serviceName, options) {
        var service = $.dnnSF();
        var serviceUrl = service.getServiceRoot("internalservices") + "controlbar/";
        return $.ajax($.extend( {
            type: "GET",
            url: serviceUrl + serviceName,
            beforeSend: service.setModuleHeaders,
            error: xhrError
        }, options));
    }

    function createMod(paneName, position, moduleId) {
        var postData = {
            Module: moduleId,
            Page: "",
            Pane: paneName,
            Position: -1,
            Sort: position,
            Visibility: 0,
            AddExistingModule: false,
            CopyModule: false
        };
        return sendDnnAjax("AddModule", {
            type: "POST",
            data: postData,
            success: function (d) {
                window.location.reload();
            },
        });

        //$.ajax({
        //    url: serviceUrl + "AddModule",
        //    type: "POST",
        //    data: postData,
        //    beforeSend: service.setModuleHeaders,
        //    success: function (d) {
        //        window.location.reload();
        //    },
        //    error: xhrError
        //});
    }

});