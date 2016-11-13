// extend the quick edit with the core commands
$(function () {
    $quickE.cmds = {
        cb: {
            "delete": function (clip) {
                return $2sxc(clip.list).manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
            },
            "create": function(parent, field, index, appOrContent, list, newGuid) {
                return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
            }
        },
        mod: {
            "delete": function (clip) {
                if (!confirm("are you sure?"))
                    return;
                var modId = getModuleId(clip.item.className);
                $quickE.modManage.delete(modId);
            },
            move: function (oldClip, newClip, from, to) {
                var modId = getModuleId(oldClip.item.className);
                var pane = $quickE.modManage.getPaneName(newClip.list);
                $quickE.modManage.move(modId, pane, to);
            },
            sendToPane: function() {
                var pane = $quickE.main.actionsForModule.closest($quickE.selectors.mod.listSelector);

                // show the pane-options
                var pl = $quickE.selected.find("#paneList");
                if (!pl.is(":empty"))
                    pl.empty();
                pl.append(generatePaneMoveButtons($quickE.modManage.getPaneName(pane)));

            }
        }
    };


    // todo: move to...modManage
    function getModuleId(classes) {
        var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? result[1] : null;
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
        targets.find("a").click(function(d) {
            var link = $(this),
                clip = $quickE.clipboard.data,
                modId = getModuleId(clip.item.className),
                newPane = link.attr("data");

            $quickE.modManage.move(modId, newPane, 0);
        });
        
        return targets;
    }



});