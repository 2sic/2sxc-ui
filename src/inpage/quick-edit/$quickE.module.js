// module specific stuff
$(function () {

    $quickE.modActions.click(function () {
        var type = $(this).data("type");
        var pane = $quickE.main.actionsForModule.closest($quickE.selectors.mod.listSelector);
        var paneName = pane.attr("id").replace("dnn_", "");

        var index = 0;
        if ($quickE.main.actionsForModule.hasClass("DnnModule"))
            index = pane.find(".DnnModule").index($quickE.main.actionsForModule[0]) + 1;

        var cbAction = $(this).data("action");
        if (cbAction)
            return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);

        // todo: try to use $2sxc(...).webApi instead of custom re-assembling these common build-up things
        // how: create a object containing the url, data, then just use the sxc.webApi(yourobject)
        var service = $.dnnSF();
        var serviceUrl = service.getServiceRoot("internalservices") + "controlbar/";

        var xhrError = function (xhr) {
            alert("Error while adding module.");
            console.log(xhr);
        };
        $.ajax({
            url: serviceUrl + "GetPortalDesktopModules",
            type: "GET",
            data: "category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=",
            beforeSend: service.setModuleHeaders,
            success: function (desktopModules) {
                var moduleToFind = type === "Default" ? " Content" : " App";
                var module = null;

                desktopModules.forEach(function (e, i) {
                    if (e.ModuleName === moduleToFind)
                        module = e;
                });

                if (!module)
                    return alert(moduleToFind + " module not found.");

                var postData = {
                    Module: module.ModuleID,
                    Page: "",
                    Pane: paneName,
                    Position: -1,
                    Sort: index,
                    Visibility: 0,
                    AddExistingModule: false,
                    CopyModule: false
                };



                $.ajax({
                    url: serviceUrl + "AddModule",
                    type: "POST",
                    data: postData,
                    beforeSend: service.setModuleHeaders,
                    success: function (d) {
                        window.location.reload();
                    },
                    error: xhrError
                });
            },
            error: xhrError
        });



    });

});