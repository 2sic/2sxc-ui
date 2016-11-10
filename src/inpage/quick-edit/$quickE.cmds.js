// extend the wonderful in-page editing with the core commands
$(function () {
    $quickE.cmds = {
        cb: {
            "delete": function (clip) {
                return $2sxc(clip.list).manage._getCbManipulator().delete /*_deleteContentBlock*/(clip.parent, clip.field, clip.index);
            },
            "create": function(parent, field, index, appOrContent, list, newGuid) {
                return $2sxc(list).manage._getCbManipulator().create/*_createContentBlock*/(parent, field, index, appOrContent, list, newGuid);
            }
        },
        mod: {
            "delete": function (clip) {
                alert("module delete not implemented yet");
                // todo: get tabid and mod id, then call delete
                //if (confirm("delete?")) { // todo i18n
                //    var apiCmd = { url: "dnn/module/delete", params: { tabId: 0, modId: 17 } };
                //    var sxc = $2sxc(0).webApi.get(apiCmd)
                //}
            },
            move: function (clip, etc) {
                // todo
            }
        }
    };
});