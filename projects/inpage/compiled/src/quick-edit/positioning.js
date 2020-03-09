"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coords_1 = require("./coords");
var quick_e_1 = require("./quick-e");
var selectors_instance_1 = require("./selectors-instance");
/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
/**
 * Point is used as return type to store X,Y coordinates
 */
/**
 * Prepare offset calculation based on body positioning
 * @returns Point
 */
function getBodyPosition() {
    var bodyPos = quick_e_1.$quickE.body.css('position');
    return bodyPos === 'relative' || bodyPos === 'absolute'
        ? new coords_1.Coords(quick_e_1.$quickE.body.offset().left, quick_e_1.$quickE.body.offset().top)
        : new coords_1.Coords(0, 0);
}
exports.getBodyPosition = getBodyPosition;
/**
 * Refresh content block and modules elements
 */
function refreshDomObjects() {
    quick_e_1.$quickE.bodyOffset =
        getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
    //// Cache the panes (because panes can't change dynamically)
    // if (!quickE.cachedPanes)
    //    quickE.cachedPanes = $(selectors.mod.listSelector);
    if (quick_e_1.$quickE.config.innerBlocks.enable) {
        // get all content-block lists which are empty, or which allow multiple child-items
        var lists = $(selectors_instance_1.selectors.cb.listSelector).filter(":not(." + selectors_instance_1.selectors.cb.singleItem + "), :empty");
        quick_e_1.$quickE.contentBlocks = lists // $(selectors.cb.listSelector)
            .find(selectors_instance_1.selectors.cb.selector)
            .add(lists); // selectors.cb.listSelector);
    }
    if (quick_e_1.$quickE.config.modules.enable)
        quick_e_1.$quickE.modules = quick_e_1.$quickE.cachedPanes
            .find(selectors_instance_1.selectors.mod.selector)
            .add(quick_e_1.$quickE.cachedPanes);
}
/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
(function (refreshDomObjects) {
})(refreshDomObjects || (refreshDomObjects = {}));
/**
 * position, align and show a menu linked to another item
 */
function positionAndAlign(element, coords) {
    return element.css({
        left: coords.x - quick_e_1.$quickE.bodyOffset.x,
        top: coords.yh - quick_e_1.$quickE.bodyOffset.y,
        width: coords.element.width(),
    }).show();
}
exports.positionAndAlign = positionAndAlign;
/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
function refresh(e) {
    var highlightClass = 'sc-cb-highlight-for-insert';
    var newDate = new Date();
    if ((!refreshDomObjects.lastCall) || (newDate.getTime() - refreshDomObjects.lastCall.getTime() > 1000)) {
        // console.log('refreshed contentblock and modules');
        refreshDomObjects.lastCall = newDate;
        refreshDomObjects();
    }
    if (quick_e_1.$quickE.config.innerBlocks.enable && quick_e_1.$quickE.contentBlocks) {
        quick_e_1.$quickE.nearestCb = findNearest(quick_e_1.$quickE.contentBlocks, new coords_1.Coords(e.clientX, e.clientY));
    }
    if (quick_e_1.$quickE.config.modules.enable && quick_e_1.$quickE.modules) {
        quick_e_1.$quickE.nearestMod = findNearest(quick_e_1.$quickE.modules, new coords_1.Coords(e.clientX, e.clientY));
    }
    quick_e_1.$quickE.modActions.toggleClass('sc-invisible', quick_e_1.$quickE.nearestMod === null);
    quick_e_1.$quickE.cbActions.toggleClass('sc-invisible', quick_e_1.$quickE.nearestCb === null);
    var oldParent = quick_e_1.$quickE.main.parentContainer;
    if (quick_e_1.$quickE.nearestCb !== null || quick_e_1.$quickE.nearestMod !== null) {
        var alignTo = quick_e_1.$quickE.nearestCb || quick_e_1.$quickE.nearestMod;
        // find parent pane to highlight
        var parentPane = $(alignTo.element).closest(selectors_instance_1.selectors.mod.listSelector);
        var parentCbList = $(alignTo.element).closest(selectors_instance_1.selectors.cb.listSelector);
        var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];
        // put part of the pane-name into the button-labels
        if (parentPane.length > 0) {
            var paneName_1 = parentPane.attr('id') || '';
            if (paneName_1.length > 4)
                paneName_1 = paneName_1.substr(4);
            quick_e_1.$quickE.modActions.filter('[titleTemplate]').each(function () {
                var t = $(this);
                t.attr('title', t.attr('titleTemplate').replace('{0}', paneName_1));
            });
        }
        positionAndAlign(quick_e_1.$quickE.main, alignTo);
        // Keep current block as current on menu
        quick_e_1.$quickE.main.actionsForCb = quick_e_1.$quickE.nearestCb ? quick_e_1.$quickE.nearestCb.element : null;
        quick_e_1.$quickE.main.actionsForModule = quick_e_1.$quickE.nearestMod ? quick_e_1.$quickE.nearestMod.element : null;
        quick_e_1.$quickE.main.parentContainer = parentContainer;
        $(parentContainer).addClass(highlightClass);
    }
    else {
        quick_e_1.$quickE.main.parentContainer = null;
        quick_e_1.$quickE.main.hide();
    }
    // if previously a parent-pane was highlighted, un-highlight it now
    if (oldParent && oldParent !== quick_e_1.$quickE.main.parentContainer)
        $(oldParent).removeClass(highlightClass);
}
exports.refresh = refresh;
/**
 * Return the nearest element to the mouse cursor from elements (jQuery elements)
 * @param elements
 * @param position
 */
function findNearest(elements, position) {
    var maxDistance = 30; // Defines the maximal distance of the cursor when the menu is displayed
    var nearestItem = null;
    var nearestDistance = maxDistance;
    var posX = position.x + quick_e_1.$quickE.win.scrollLeft();
    var posY = position.y + quick_e_1.$quickE.win.scrollTop();
    // Find nearest element
    elements.each(function () {
        var e = getCoordinates($(this));
        // First check x coordinates - must be within container
        if (posX < e.x || posX > e.x + e.w)
            return;
        // Check if y coordinates are within boundaries
        var distance = Math.abs(posY - e.yh);
        if (distance < maxDistance && distance < nearestDistance) {
            nearestItem = e;
            nearestDistance = distance;
        }
    });
    return nearestItem;
}
exports.findNearest = findNearest;
function getCoordinates(element) {
    // sometimes element.length === 0 and element.offset() = undefined
    // console.log("element.offset():", element.offset());
    // console.log("element.length:", element.length);
    var coords = {
        element: element,
        x: element.offset().left,
        w: element.width(),
        y: element.offset().top,
        // For content-block ITEMS, the menu must be visible at the end
        // For content-block-LISTS, the menu must be at top
        yh: element.offset().top + (element.is(selectors_instance_1.selectors.eitherCbOrMod) ? element.height() : 0),
    };
    return coords;
}
exports.getCoordinates = getCoordinates;
//# sourceMappingURL=positioning.js.map