(function () {
    $2sxc._toolbarManager.generateButtonHtml = generateButtonHtml;
    return;

    // does some clean-up work on a button-definition object
    // because the target item could be specified directly, or in a complex internal object called entity
    function flattenActionDefinition(actDef) {
        if (!actDef.entity || !actDef.entity._2sxcEditInformation) return;

        var editInfo = actDef.entity._2sxcEditInformation;
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
        if (editInfo.entityId !== undefined) actDef.entityId = editInfo.entityId;
        if (editInfo.sortOrder !== undefined) actDef.sortOrder = editInfo.sortOrder;
        delete actDef.entity; // clean up edit-info
    }

    // generate the html for a button
    // Expects: instance sxc, action-definition, + group-index in which the button is shown
    function generateButtonHtml(sxc, actDef, groupIndex) {

        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        flattenActionDefinition(actDef);

        // retrieve configuration for this button
        var showClasses = "group-" + groupIndex + (actDef.disabled ? " disabled" : ""),
            classesList = (actDef.classes || "").split(","),
            box = $("<div/>"),
            symbol = $("<i class=\"" + actDef.icon + "\" aria-hidden=\"true\"></i>"),
            onclick = actDef.disabled ?
            "" :
            "$2sxc(" + sxc.id + ", " + sxc.cbid + ").manage.run(" + JSON.stringify(actDef.command) + ", event);";

        for (var c = 0; c < classesList.length; c++) showClasses += " " + classesList[c];

        var button = $("<a />", {
            'class': "sc-" + actDef.action + " " + showClasses +
                (actDef.dynamicClasses ? " " + actDef.dynamicClasses(actDef) : ""),
            'onclick': onclick,
            'data-i18n': "[title]" + actDef.title
        });
        button.html(box.html(symbol));
        return button[0].outerHTML;
    }
})();