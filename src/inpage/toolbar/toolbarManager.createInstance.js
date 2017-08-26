(function () {
    // #region helper functions - without state
    function createToolbarConfig(context) {
        var c = context, ce = c.Environment, cg = c.ContentGroup, cb = c.ContentBlock;
        return {
            portalId: ce.WebsiteId,
            tabId: ce.PageId,
            moduleId: ce.InstanceId,
            version: ce.SxcVersion,

            contentGroupId: cg.Guid,
            cbIsEntity: cb.IsEntity,
            cbId: cb.Id,
            appPath: cg.AppUrl,
            isList: cg.IsList
        };
    }

    // does some clean-up work on a button-definition object
    // because the target item could be specified directly, or in a complex internal object called entity
    function flattenActionDefinition(actDef) {
        if (actDef.entity && actDef.entity._2sxcEditInformation) {
            var editInfo = actDef.entity._2sxcEditInformation;
            actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
            if (editInfo.entityId !== undefined)
                actDef.entityId = editInfo.entityId;
            if (editInfo.sortOrder !== undefined)
                actDef.sortOrder = editInfo.sortOrder;
            delete actDef.entity; // clean up edit-info
        }
    }

    //#endregion helper functions


    var tbManager = $2sxc._toolbarManager;



    tbManager.createInstance = function (sxc, editContext) {
        //var // id = sxc.id,
        //    // cbid = sxc.cbid,
        //    // ec = editContext,
        //    cg = editContext.ContentGroup,
        //    allActions = $2sxc._commands.definitions.create({
        //        canDesign: editContext.User.CanDesign,
        //        templateId: cg.TemplateId,
        //        contentTypeId: cg.ContentTypeName,
        //        isContent: cg.IsContent,
        //        queryId: cg.QueryId,
        //        appResourcesId: cg.AppResourcesId,
        //        appSettingsId: cg.AppSettingsId
        //    });


        var tb = {
            config: createToolbarConfig(editContext),
            refreshConfig: function() { tb.config = createToolbarConfig(editContext); },
            //actions: allActions,

            // Generate a button (an <a>-tag) for one specific toolbar-action. 
            // Expects: settings, an object containing the specs for the expected buton
            getButton: function(actDef, groupIndex) {

                // if the button belongs to a content-item, move the specs up to the item into the settings-object
                flattenActionDefinition(actDef);

                // retrieve configuration for this button
                var showClasses = "group-" + groupIndex,
                    classesList = (actDef.classes || "").split(","),
                    box = $("<div/>"),
                    symbol = $("<i class=\"" + actDef.icon + "\" aria-hidden=\"true\"></i>"),
                    onclick = actDef.disabled
                        ? ""
                        : "$2sxc(" + sxc.id + ", " + sxc.cbid + ").manage.run(" + JSON.stringify(actDef.command) + ", event);";

                for (var c = 0; c < classesList.length; c++)
                    showClasses += " " + classesList[c];

                var button = $("<a />",
                {
                    'class': "sc-" + actDef.action + " " + showClasses +
                        (actDef.dynamicClasses ? " " + actDef.dynamicClasses(actDef) : ""),
                    'onclick': onclick,
                    'data-i18n': "[title]" + actDef.title
                });

                button.html(box.html(symbol));

                return button[0].outerHTML;
            },

            // Builds the toolbar and returns it as HTML
            // expects settings - either for 1 button or for an array of buttons
            getToolbar: function(tbConfig, moreSettings) {
                // if it has an action or is an array, keep that. Otherwise get standard buttons
                tbConfig = tbConfig || {}; // if null/undefined, use empty object
                var btnList = tbConfig;
                if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
                    btnList = tbManager.standardButtons(editContext.User.CanDesign, tbConfig);

                // whatever we had, if more settings were provided, override with these...
                var tlbDef = tbManager.buttonHelpers.buildFullDefinition(btnList, sxc.manage._actions, tb.config, moreSettings);
                var btnGroups = tlbDef.groups;
                var behaviourClasses = " sc-tb-hover-" + tlbDef.settings.hover + " sc-tb-show-" + tlbDef.settings.show;

                // todo: these settings assume it's not in an array...
                var tbClasses = "sc-menu group-0 " + behaviourClasses + " " +
                    ((tbConfig.sortOrder === -1) ? " listContent" : "") +
                    (tlbDef.settings.classes ? " " + tlbDef.settings.classes : "");
                var toolbar = $("<ul />",
                    { 'class': tbClasses, 'onclick': "var e = arguments[0] || window.event; e.stopPropagation();" });

                for (var i = 0; i < btnGroups.length; i++) {
                    var btns = btnGroups[i].buttons;
                    for (var h = 0; h < btns.length; h++)
                        toolbar.append($("<li />").append($(tb.getButton(btns[h], i))));
                }

                toolbar.attr("group-count", btnGroups.length);

                return toolbar[0].outerHTML;
            }

        };
        return tb;
    };





})();