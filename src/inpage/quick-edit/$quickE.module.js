// module specific stuff
$(function () {

    function onModuleButtonClick() {
        var type = $(this).data("type"),
            dnnMod = $quickE.main.actionsForModule,
            pane = dnnMod.closest($quickE.selectors.mod.listSelector),
            index = 0;

        if (dnnMod.hasClass("DnnModule"))
            index = pane.find(".DnnModule").index(dnnMod[0]) + 1;

        var cbAction = $(this).data("action");
        if (cbAction)  // copy/paste
            return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);

        return $quickE.modManage.create($quickE.modManage.getPaneName(pane), index, type);
    }

    // bind module actions click
    $quickE.modActions.click(onModuleButtonClick);
});