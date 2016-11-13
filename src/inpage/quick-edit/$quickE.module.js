// module specific stuff
$(function () {
    "use strict";
    $quickE.modActions.click(function () {
        var type = $(this).data("type"),
            dnnMod = $quickE.main.actionsForModule,
            pane = dnnMod.closest($quickE.selectors.mod.listSelector),
            //paneName = pane.attr("id").replace("dnn_", ""),
            index = 0;

        if (dnnMod.hasClass("DnnModule"))
            index = pane.find(".DnnModule").index(dnnMod[0]) + 1;

        var cbAction = $(this).data("action");
        if (cbAction)  // copy/paste
            return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);

        return $quickE.modManage.create($quickE.modManage.getPaneName(pane), index, type);
    });


    //$quickE.modManage = {
    //    "delete": deleteMod,
    //    create: createModWithTypeName,
    //    move: moveMod,
    //    getPaneName: function(pane) {
    //        return pane.attr("id").replace("dnn_", "");
    //    }
    //};

    //function xhrError (xhr, optionalMessage) {
    //    alert(optionalMessage || "Error while talking to server.");
    //    console.log(xhr);
    //}

    //// service calls we'll need
    //function createModWithTypeName(paneName, index, type) {
    //    return sendDnnAjax("controlbar/GetPortalDesktopModules", {
    //        data: "category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=",
    //        success: function (desktopModules) {
    //            var moduleToFind = type === "Default" ? " Content" : " App";
    //            var module = null;

    //            desktopModules.forEach(function (e, i) {
    //                if (e.ModuleName === moduleToFind)
    //                    module = e;
    //            });

    //            return (!module)
    //                ? alert(moduleToFind + " module not found.")
    //                : createMod(paneName, index, module.ModuleID);
    //        }
    //    });
    //}

    //function moveMod(modId, pane, order) {
    //    var service = $.dnnSF();
    //    var tabId = service.getTabId();
    //    var dataVar = {
    //        TabId: tabId,
    //        ModuleId: modId,
    //        Pane: pane,
    //        ModuleOrder: (2 * order + 4) // strange formula, copied from DNN https://github.com/dnnsoftware/Dnn.Platform/blob/fd225b8de07042837f7473cd49fba13de42a3cc0/Website/admin/Menus/ModuleActions/ModuleActions.js#L70
    //    };

    //    sendDnnAjax("ModuleService/MoveModule", {
    //        type: "POST",
    //        data: dataVar,
    //        success: function () {
    //            window.location.reload();
    //        }
    //    });

    //    //fire window resize to reposition action menus
    //    $(window).resize();
    //}
    

    //function deleteMod(modId) {
    //    var service = $.dnnSF();
    //    var tabId = service.getTabId();
    //    // calling https://github.com/dnnsoftware/Dnn.Platform/blob/fd225b8de07042837f7473cd49fba13de42a3cc0/DNN%20Platform/DotNetNuke.Web/InternalServices/ModuleServiceController.cs#L116-L132
    //    return sendDnnAjax("ModuleService/DeleteModule", {
    //        type: "POST",
    //        data: {
    //            TabId: tabId,
    //            ModuleId: modId,
    //            SoftDelete: true
    //        },
    //        success: function(d) {
    //            window.location.reload();
    //        },
    //        error: function(xhr) {
    //            xhrError(xhr, "Could not delete - you probably have a older DNN, you need DNN 7.4.1 or higher");
    //        }
    //    });
    //}

    //function sendDnnAjax(serviceName, options) {
    //    var service = $.dnnSF();
    //    var serviceUrl = service.getServiceRoot("internalservices");// + "controlbar/";
    //    return $.ajax($.extend( {
    //        type: "GET",
    //        url: serviceUrl + serviceName,
    //        beforeSend: service.setModuleHeaders,
    //        error: xhrError
    //    }, options));
    //}

    //function createMod(paneName, position, moduleId) {
    //    var postData = {
    //        Module: moduleId,
    //        Page: "",
    //        Pane: paneName,
    //        Position: -1,
    //        Sort: position,
    //        Visibility: 0,
    //        AddExistingModule: false,
    //        CopyModule: false
    //    };
    //    return sendDnnAjax("controlbar/AddModule", {
    //        type: "POST",
    //        data: postData,
    //        success: function (d) {
    //            window.location.reload();
    //        }
    //    });
    //}

});