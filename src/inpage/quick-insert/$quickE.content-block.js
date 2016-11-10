// content-block specific stuff like actions
$(function () {
    $quickE.cbActions.click(function () {
        var list = $quickE.main.actionsForCb.closest($quickE.selectors.cb.listSelector);
        var listItems = list.find($quickE.selectors.cb.selector);
        var actionConfig = JSON.parse(list.attr($quickE.selectors.cb.context));
        var index = 0;

        if ($quickE.main.actionsForCb.hasClass($quickE.selectors.cb.class))
            index = listItems.index($quickE.main.actionsForCb[0]) + 1;

        // check cut/paste
        var cbAction = $(this).data("action");
        if (!cbAction) {
            var appOrContent = $(this).data("type");
            return $2sxc(list).manage._createContentBlock(actionConfig.parent, actionConfig.field, index, appOrContent, list);
        } else
            // this is a cut/paste action
            return $quickE.copyPasteInPage(cbAction, list, index, $quickE.selectors.cb.id);
    });

});