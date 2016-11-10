// add a clipboard to the WInPE
$(function () {

    // perform copy and paste commands - needs the clipboard
    $quickE.copyPasteInPage = function (cbAction, list, index, type) {
        var clip = $quickE.clipboard.createSpecs(type, list, index);

        // action!
        if (cbAction === "select") {
            $quickE.clipboard.mark(clip);
        } else if (cbAction === "paste") {
            var from = $quickE.clipboard.data.index, to = clip.index;
            if (isNaN(from) || isNaN(to) || from === to || from + 1 === to) // this moves it to the same spot, so ignore
                return $quickE.clipboard.clear(); // don't do anything

            $2sxc(list).manage._moveContentBlock(clip.parent, clip.field, from, to);
            $quickE.clipboard.clear();
        }
    };

    // clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
    $quickE.clipboard = {
        data: {},
        mark: function (newData) {
            if (newData) {
                // if it was already selected with the same thing, then release it
                if ($quickE.clipboard.data && $quickE.clipboard.data.item === newData.item)
                    return $quickE.clipboard.clear();
                $quickE.clipboard.data = newData;
            }
            $("." + $quickE.selectors.selected).removeClass($quickE.selectors.selected); // clear previous markings
            var cb = $($quickE.clipboard.data.item);
            cb.addClass($quickE.selectors.selected);
            if (cb.prev().is("iframe"))
                cb.prev().addClass($quickE.selectors.selected);
            $quickE.setSecondaryActionsState(true);
            $quickE.selected.toggle(cb);
        },
        clear: function () {
            $("." + $quickE.selectors.selected).removeClass($quickE.selectors.selected);
            $quickE.clipboard.data = null;
            $quickE.setSecondaryActionsState(false);
            $quickE.selected.toggle(false);
        },
        createSpecs: function (type, list, index) {
            var listItems = list.find($quickE.selectors[type].selector);
            if (index >= listItems.length) index = listItems.length - 1; // sometimes the index is 1 larger than the length, then select last
            var currentItem = listItems[index];
            var editContext = JSON.parse(list.attr($quickE.selectors.cb.context) || null) || { parent: "dnn", field: list.id };
            return { parent: editContext.parent, field: editContext.field, list: list, item: currentItem, index: index, type: type };
        }
    };


    $quickE.setSecondaryActionsState = function (state) {
        var btns = $("a.sc-content-block-menu-btn");
        btns = btns.filter(".icon-sxc-paste");
        btns.toggleClass("sc-unavailable", !state);
    };


    $quickE.selected.toggle = function (target) {
        if (!target)
            return $quickE.selected.hide();

        var coords = $quickE.getCoordinates(target);
        coords.yh = coords.y + 20;
        $quickE.positionAndAlign($quickE.selected, coords);
        $quickE.selected.target = target;
    };

    // give all actions
    $("a", $quickE.selected).click(function () {
        var action = $(this).data("action");
        var clip = $quickE.clipboard.data;
        switch (action) {
            case "cancel":
                return $quickE.clipboard.clear();
            case "delete":
                $quickE.cmds[clip.type].delete(clip);
        }
    });

});