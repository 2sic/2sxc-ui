$(function () {
    "use strict";

    // the Wonderful In Page Editing object
    var $quickE = window.$quickE = {};


    // selectors used all over the in-page-editing
    // var enableModuleMove = false; // not implemented yet
    $quickE.selectors = {
        cb: {
            id: "cb",
            "class": "sc-content-block",
            selector: ".sc-content-block",
            listSelector: ".sc-content-block-list",
            context: "data-list-context",
            singleItem: "single-item"
        },
        mod: {
            id: "mod",
            "class": "DnnModule",
            selector: ".DnnModule",
            listSelector: ".DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)", // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
            context: null
        },
        eitherCbOrMod: ".DnnModule, .sc-content-block",
        selected: "sc-cb-is-selected"
    };


    $quickE.btn = function(action, icon, i18N, invisible, unavailable, classes) {
        return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + " "
            + (invisible ? " sc-invisible " : "")
            + (unavailable ? " sc-unavailable " : "")
            + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
    };

    // the quick-insert object
    $2sxc._lib.extend($quickE, {
        body: $("body"),
        win: $(window),
        main: $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>"),
        template: "<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>"
            + "<a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>"
            + $quickE.btn("select", "ok", "Select", true)
            + $quickE.btn("paste", "paste", "Paste", true, true),
        selected: $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
            .append(/*$quickE.btn("cancel", "ok", "Cancel") + */ $quickE.btn("delete", "trash-empty", "Delete")),
        contentBlocks: null,
        modules: null,
        nearestCb: null, 
        nearestMod: null
    });

    // add stuff which must be added in a second run
    $2sxc._lib.extend($quickE, {
        cbActions: $($quickE.template),
        modActions: $($quickE.template.replace(/QuickInsertMenu.AddBlock/g, "QuickInsertMenu.AddModule")).attr("data-context", "module").addClass("sc-content-block-menu-module")
    });

    // build the toolbar (hidden, but ready to show)
    $quickE.prepareToolbarInDom = function() {
        $quickE.body.append($quickE.main);
        $quickE.body.append($quickE.selected);

        // content blocks actions
        if ($quickE.config.innerBlocks.enable)
            $quickE.main.append($quickE.cbActions);

        // module actions
        if ($quickE.config.modules.enable)
            $quickE.main.append($quickE.modActions);
    };

});