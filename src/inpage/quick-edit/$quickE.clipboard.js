// add a clipboard to the quick edit
$(function () {

    // perform copy and paste commands - needs the clipboard
    $quickE.copyPasteInPage = function (cbAction, list, index, type) {
        var newClip = $quickE.clipboard.createSpecs(type, list, index);

        // action!
        switch (cbAction) {
            case "select":
                $quickE.clipboard.mark(newClip);
                break;
            case "paste":
                var from = $quickE.clipboard.data.index, to = newClip.index;
                // check that we only move block-to-block or module to module
                if ($quickE.clipboard.data.type !== newClip.type)
                    return alert("can't move module-to-block; move only works from module-to-module or block-to-block");

                if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                    return $quickE.clipboard.clear(); // don't do anything

                // cb-numbering is a bit different, because the selector is at the bottom
                // only there we should also skip on +1;
                if(newClip.type === $quickE.selectors.cb.id && from + 1 === to)
                    return $quickE.clipboard.clear(); // don't do anything

                if (type === $quickE.selectors.cb.id) {
                    $2sxc(list).manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
                } else {
                    $quickE.cmds.mod.move($quickE.clipboard.data, newClip, from, to);
                }
                $quickE.clipboard.clear();
                break;
            default:
        }
        return null;
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
            $quickE.selected.toggle(cb, $quickE.clipboard.data.type);
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

    // bind clipboard actions 
    $("a", $quickE.selected).click(function () {
        var action = $(this).data("action");
        var clip = $quickE.clipboard.data;
        switch (action) {
            case "delete":
                return $quickE.cmds[clip.type].delete(clip);
            case "sendToPane":
                return $quickE.cmds.mod.sendToPane(clip);
        }
    });

});