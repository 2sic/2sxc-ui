﻿// everything related to positioning the wonderful in-page editing
$(function () {


    // Prepare offset calculation based on body positioning
    $quickE.getBodyPosition = function () {
        var bodyPos = $quickE.body.css("position");
        return bodyPos === "relative" || bodyPos === "absolute"
            ? { x: $quickE.body.offset().left, y: $quickE.body.offset().top }
            : { x: 0, y: 0 };
    };

    // todo: this should be in an init/start method
    $quickE.bodyOffset = $quickE.getBodyPosition();

    // Refresh content block and modules elements
    $quickE.refreshDomObjects = function () {
        $quickE.bodyOffset = $quickE.getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar

        // Cache the panes (because panes can't change dynamically)
        if (!$quickE.cachedPanes)
            $quickE.cachedPanes = $($quickE.selectors.mod.listSelector);

        if ($quickE.config.innerBlocks.enable)
            $quickE.contentBlocks = $($quickE.selectors.cb.listSelector).find($quickE.selectors.cb.selector).add($quickE.selectors.cb.listSelector);
        if ($quickE.config.modules.enable)
            $quickE.modules = $quickE.cachedPanes.find($quickE.selectors.mod.selector).add($quickE.cachedPanes);
    };

    // position, align and show a menu linked to another item
    $quickE.positionAndAlign = function (element, coords) {
        return element.css({
            'left': coords.x - $quickE.bodyOffset.x,
            'top': coords.yh - $quickE.bodyOffset.y,
            'width': coords.element.width()
        }).show();
    };

    // Refresh positioning / visibility of the quick-insert bar
    $quickE.refresh = function (e) {

        if (!$quickE.refreshDomObjects.lastCall || (new Date() - $quickE.refreshDomObjects.lastCall > 1000)) {
            // console.log('refreshed contentblock and modules');
            $quickE.refreshDomObjects.lastCall = new Date();
            $quickE.refreshDomObjects();
        }

        if ($quickE.config.innerBlocks.enable && $quickE.contentBlocks) {
            $quickE.nearestCb = $quickE.findNearest($quickE.contentBlocks, { x: e.clientX, y: e.clientY }, $quickE.selectors.cb.selector);
        }

        if ($quickE.config.modules.enable && $quickE.modules) {
            $quickE.nearestMod = $quickE.findNearest($quickE.modules, { x: e.clientX, y: e.clientY }, $quickE.selectors.mod.selector);
        }

        $quickE.modActions.toggleClass("sc-invisible", $quickE.nearestMod === null);
        $quickE.cbActions.toggleClass("sc-invisible", $quickE.nearestCb === null);

        // if previously a parent-pane was highlighted, un-highlight it now
        if ($quickE.main.parentContainer)
            $($quickE.main.parentContainer).removeClass("sc-cb-highlight-for-insert");

        if ($quickE.nearestCb !== null || $quickE.nearestMod !== null) {
            var alignTo = $quickE.nearestCb || $quickE.nearestMod;

            // find parent pane to highlight
            var parentPane = $(alignTo.element).closest($quickE.selectors.mod.listSelector);
            var parentCbList = $(alignTo.element).closest($quickE.selectors.cb.listSelector);
            var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];

            if (parentPane.length > 0) {
                var paneName = parentPane.attr("id") || "";
                if (paneName.length > 4) paneName = paneName.substr(4);
                $quickE.modActions.filter("[titleTemplate]").each(function () {
                    var t = $(this);
                    t.attr("title", t.attr("titleTemplate").replace("{0}", paneName));
                });
            }

            $quickE.positionAndAlign($quickE.main, alignTo, true);

            // Keep current block as current on menu
            $quickE.main.actionsForCb = $quickE.nearestCb ? $quickE.nearestCb.element : null;
            $quickE.main.actionsForModule = $quickE.nearestMod ? $quickE.nearestMod.element : null;
            $quickE.main.parentContainer = parentContainer;
            $(parentContainer).addClass("sc-cb-highlight-for-insert");
        } else {
            $quickE.main.hide();
        }
    };

    // Return the nearest element to the mouse cursor from elements (jQuery elements)
    $quickE.findNearest = function (elements, position) {
        var maxDistance = 30; // Defines the maximal distance of the cursor when the menu is displayed

        var nearestItem = null;
        var nearestDistance = maxDistance;

        var posX = position.x + $quickE.win.scrollLeft();
        var posY = position.y + $quickE.win.scrollTop();

        // Find nearest element
        elements.each(function () {
            var e = $quickE.getCoordinates($(this));

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
    };

    $quickE.getCoordinates = function (element) {
        return {
            element: element,
            x: element.offset().left,
            w: element.width(),
            y: element.offset().top,
            // For content-block ITEMS, the menu must be visible at the end
            // For content-block-LISTS, the menu must be at top
            yh: element.offset().top + (element.is($quickE.selectors.eitherCbOrMod) ? element.height() : 0)
        };
    };
});