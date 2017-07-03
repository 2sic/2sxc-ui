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
                if (!confirm("are you sure?")) return;
                var modId = $quickE.modManage.getModuleId(clip.item.className);
                $quickE.modManage.delete(modId);
            },
            // todo: unsure if this is a good place for this bit of code...
            move: function (oldClip, newClip, from, to) {
                var modId = $quickE.modManage.getModuleId(oldClip.item.className);
                var pane = $quickE.modManage.getPaneName(newClip.list);
                $quickE.modManage.move(modId, pane, to);
            },
            sendToPane: function() {
                var pane = $quickE.main.actionsForModule.closest($quickE.selectors.mod.listSelector);

                // show the pane-options
                var pl = $quickE.selected.find("#paneList");
                if (!pl.is(":empty"))
                    pl.empty();
                pl.append($quickE.modManage.getMoveButtons($quickE.modManage.getPaneName(pane)));

            }
        }
    };



});