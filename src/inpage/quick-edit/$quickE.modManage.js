// module specific stuff
$(function () {
    "use strict";

    $quickE.modManage = {
        "delete": deleteMod,
        create: createModWithTypeName,
        move: moveMod,
        getPaneName: getPaneName,
        getModuleId: getModuleId,
        getMoveButtons: generatePaneMoveButtons
    };


    function getPaneName(pane) {
        return $(pane).attr("id").replace("dnn_", "");
    }

    // find the correct module id from a list of classes - used on the module-wrapper
    function getModuleId(classes) {
        var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? result[1] : null;
    }

    // show an error when an xhr error occurs
    function xhrError (xhr, optionalMessage) {
        alert(optionalMessage || "Error while talking to server.");
        console.log(xhr);
    }

    // service calls we'll need
    function createModWithTypeName(paneName, index, type) {
        return sendDnnAjax(null, "controlbar/GetPortalDesktopModules", {
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
    }

    // move a dnn module
    function moveMod(modId, pane, order) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        var dataVar = {
            TabId: tabId,
            ModuleId: modId,
            Pane: pane,
            ModuleOrder: (2 * order + 4) // strange formula, copied from DNN https://github.com/dnnsoftware/Dnn.Platform/blob/fd225b8de07042837f7473cd49fba13de42a3cc0/Website/admin/Menus/ModuleActions/ModuleActions.js#L70
        };

        sendDnnAjax(modId, "ModuleService/MoveModule", {
            type: "POST",
            data: dataVar,
            success: function () {
                window.location.reload();
            }
        });

        //fire window resize to reposition action menus
        $(window).resize();
    }
    
    // delete a module
    function deleteMod(modId) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        return sendDnnAjax(modId, "2sxc/dnn/module/delete", {
            url: $.dnnSF().getServiceRoot("2sxc") + "dnn/module/delete",
            type: "GET",
            data: {
                tabId: tabId,
                modId: modId
            },
            success: function(d) {
                window.location.reload();
            }
        });
    }

    // call an api on dnn
    function sendDnnAjax(modId, serviceName, options) {
        var service = $.dnnSF(modId);

        return $.ajax($.extend( {
            type: "GET",
            url: service.getServiceRoot("internalservices") + serviceName,
            beforeSend: service.setModuleHeaders,
            error: xhrError
        }, options));
    }

    // create / insert a new module
    function createMod(paneName, position, modId) {
        var postData = {
            Module: modId,
            Page: "",
            Pane: paneName,
            Position: -1,
            Sort: position,
            Visibility: 0,
            AddExistingModule: false,
            CopyModule: false
        };
        return sendDnnAjax(null, "controlbar/AddModule", {
            type: "POST",
            data: postData,
            success: function (d) {
                window.location.reload();
            }
        });
    }


    function generatePaneMoveButtons(current) {
        var pns = $quickE.cachedPanes;
        // generate list of panes as links
        var targets = $("<div>");
        for (var p = 0; p < pns.length; p++) {
            var pName = $quickE.modManage.getPaneName(pns[p]),
                selected = (current === pName) ? " selected " : "";
            if (!selected)
                targets.append("<a data='" + pName + "'>" + pName + "</a>");
        }

        // attach click event...
        targets.find("a").click(function (d) {
            var link = $(this),
                clip = $quickE.clipboard.data,
                modId = $quickE.modManage.getModuleId(clip.item.className),
                newPane = link.attr("data");

            $quickE.modManage.move(modId, newPane, 0);
        });

        return targets;
    }

});