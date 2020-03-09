"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var positioning_1 = require("./positioning");
/**
 * the quick-edit object
 * the quick-insert object
 */
var QuickE = /** @class */ (function () {
    function QuickE() {
        var _this = this;
        this.body = $('body');
        this.win = $(window);
        this.main = $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>");
        this.template = "<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a><a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>" + btn('select', 'ok', 'Select', true) + btn('paste', 'paste', 'Paste', true, true);
        this.selected = $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
            .append(btn('delete', 'trash-empty', 'Delete'), btn('sendToPane', 'export', 'Move', null, null, 'sc-cb-mod-only'), "<div id='paneList'></div>");
        // will be populated later in the module section
        this.contentBlocks = null;
        this.cachedPanes = null;
        this.modules = null;
        this.nearestCb = null;
        this.nearestMod = null;
        this.modManage = null;
        // add stuff which depends on other values to create
        this.cbActions = $(this.template);
        this.modActions = $(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
            .attr('data-context', 'module')
            .addClass('sc-content-block-menu-module');
        this.selected.toggle = function (target) {
            if (!target || target.length === 0) {
                _this.selected.hide();
            }
            else {
                var coords = positioning_1.getCoordinates(target);
                coords.yh = coords.y + 20;
                positioning_1.positionAndAlign(_this.selected, coords);
                _this.selected.target = target;
            }
        };
    }
    return QuickE;
}());
exports.$quickE = new QuickE();
function btn(action, icon, i18N, invisible, unavailable, classes) {
    return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + " " + (invisible ? ' sc-invisible ' : '') + (unavailable ? ' sc-unavailable ' : '') + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
}
/**
 * build the toolbar (hidden, but ready to show)
 */
function prepareToolbarInDom() {
    exports.$quickE.body.append(exports.$quickE.main)
        .append(exports.$quickE.selected);
    exports.$quickE.main.append(exports.$quickE.cbActions)
        .append(exports.$quickE.modActions);
}
exports.prepareToolbarInDom = prepareToolbarInDom;
//# sourceMappingURL=quick-e.js.map