"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipboard_1 = require("./clipboard");
var quick_e_1 = require("./quick-e");
/**
 * module specific stuff
 */
var ModManage = /** @class */ (function () {
    function ModManage() {
        this.delete = deleteMod;
        this.create = createModWithTypeName;
        this.move = moveMod;
        this.getPaneName = getPaneName;
        this.getModuleId = getModuleId;
        this.getMoveButtons = generatePaneMoveButtons;
    }
    return ModManage;
}());
exports.ModManage = ModManage;
exports.modManage = new ModManage();
function getPaneName(pane) {
    return $(pane).attr('id').replace('dnn_', '');
}
// find the correct module id from a list of classes - used on the module-wrapper
function getModuleId(classes) {
    var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
    return (result && result.length === 2) ? Number(result[1]) : null;
}
// show an error when an xhr error occurs
function xhrError(xhr, optionalMessage) {
    alert(optionalMessage || 'Error while talking to server.');
    console.log(xhr);
}
// service calls we'll need
function createModWithTypeName(paneName, index, type) {
    return sendDnnAjax(null, 'controlbar/GetPortalDesktopModules', {
        data: 'category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=',
        success: function (desktopModules) {
            var moduleToFind = type === 'Default' ? ' Content' : ' App';
            var module = null;
            // ReSharper disable once UnusedParameter
            desktopModules.forEach(function (e, i) {
                if (e.ModuleName === moduleToFind)
                    module = e;
            });
            return (!module)
                ? alert(moduleToFind + ' module not found.')
                : createMod(paneName, index, module.ModuleID);
        },
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
        ModuleOrder: (2 * order + 0),
    };
    sendDnnAjax(modId, 'ModuleService/MoveModule', {
        type: 'POST',
        data: dataVar,
        success: function () { return window.location.reload(); },
    });
    // fire window resize to reposition action menus
    $(window).resize();
}
// delete a module
function deleteMod(modId) {
    var service = $.dnnSF(modId);
    var tabId = service.getTabId();
    return sendDnnAjax(modId, '2sxc/dnn/module/delete', {
        url: $.dnnSF().getServiceRoot('2sxc') + 'dnn/module/delete',
        type: 'GET',
        data: {
            tabId: tabId,
            modId: modId,
        },
        // ReSharper disable once UnusedParameter
        success: function (d) { return window.location.reload(); },
    });
}
// call an api on dnn
function sendDnnAjax(modId, serviceName, options) {
    var service = $.dnnSF(modId);
    return $.ajax($.extend({
        type: 'GET',
        url: service.getServiceRoot('internalservices') + serviceName,
        beforeSend: service.setModuleHeaders,
        error: xhrError,
    }, options));
}
// create / insert a new module
function createMod(paneName, position, modId) {
    var postData = {
        Module: modId,
        Page: '',
        Pane: paneName,
        Position: -1,
        Sort: position,
        Visibility: 0,
        AddExistingModule: false,
        CopyModule: false,
    };
    return sendDnnAjax(null, 'controlbar/AddModule', {
        type: 'POST',
        data: postData,
        // ReSharper disable once UnusedParameter
        success: function (d) { return window.location.reload(); },
    });
}
function generatePaneMoveButtons(current) {
    var pns = quick_e_1.$quickE.cachedPanes;
    // generate list of panes as links
    var targets = $('<div>');
    for (var p = 0; p < pns.length; p++) {
        var pName = getPaneName(pns[p]);
        var selected = (current === pName) ? ' selected ' : '';
        if (selected === '')
            targets.append("<a data='" + pName + "'>" + pName + "</a>");
    }
    // attach click event...
    // ReSharper disable once UnusedParameter
    targets.find('a').click(function (d) {
        var link = $(this);
        var clip = clipboard_1.data;
        var modId = getModuleId(clip.item.className);
        var newPane = link.attr('data');
        moveMod(modId, newPane, 0);
    });
    return targets;
}
//# sourceMappingURL=mod-manage.js.map