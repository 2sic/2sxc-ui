(function () {
    var tbManager = $2sxc._toolbarManager;
    tbManager.create = function (sxc, editContext) {
        var id = sxc.id,
            cbid = sxc.cbid,
            allActions = $2sxc._actions.create({
            canDesign: editContext.User.CanDesign,
            templateId: editContext.ContentGroup.TemplateId,
            contentTypeId: editContext.ContentGroup.ContentTypeName
        });

        // #region helper functions
        function createToolbarConfig(context) {
            return {
                portalId: context.Environment.WebsiteId,
                tabId: context.Environment.PageId,
                moduleId: context.Environment.InstanceId,
                version: context.Environment.SxcVersion,

                contentGroupId: context.ContentGroup.Guid, 
                cbIsEntity: context.ContentBlock.IsEntity,
                cbId: context.ContentBlock.Id,
                appPath: context.ContentGroup.AppUrl,
                isList: context.ContentGroup.IsList
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
                delete actDef.entity;   // clean up edit-info
            }
        }


        //#endregion helper functions



        var tb = {
            config: createToolbarConfig(editContext),
            refreshConfig: function() { tb.config = createToolbarConfig(); },
            actions: allActions,
            // Generate a button (an <a>-tag) for one specific toolbar-action. 
            // Expects: settings, an object containing the specs for the expected buton
            getButton: function (actDef) {
                // if the button belongs to a content-item, move the specs up to the item into the settings-object
                flattenActionDefinition(actDef);

                // retrieve configuration for this button
                var groupId = actDef.group.index,
                    showClasses = "group-" + groupId,
                    classesList = (actDef.classes || "").split(","),
                    box = $("<div/>"),
                    symbol = $("<i class=\"" + actDef.icon + "\" aria-hidden=\"true\"></i>"),
                    onclick = actDef.onclick || "$2sxc(" + id + ", " + cbid + ").manage.action(" + JSON.stringify(actDef.command /*, tb._jsonifyFilterGroup*/) + ", event);";

                console.log("onclick: " + onclick);

                for (var c = 0; c < classesList.length; c++)
                    showClasses += " " + classesList[c];

                var button = $("<a />", {
                    'class': "sc-" + actDef.action + " " + showClasses + (actDef.dynamicClasses ? " " + actDef.dynamicClasses(actDef) : ""),
                    'onclick': onclick,
                    'data-i18n': "[title]" + actDef.title
                });

                button.html(box.html(symbol));

                return button[0].outerHTML;
            },

            _jsonifyFilterGroup: function (key, value) {
                return key === "groups" ? undefined : value;
                //return key === "group" || key === "icon" || key === "title" ? undefined : value;
            },


            // Builds the toolbar and returns it as HTML
            // expects settings - either for 1 button or for an array of buttons
            getToolbar: function (settings) {
                if ($2sxc.debug.load) {
                    console.log("creating toolbar");
                    console.log(settings);
                }

                // if it has an action or is an array, keep that. Otherwise get standard buttons
                var btnList = settings;
                if (!settings.action && !Array.isArray(settings)) 
                    btnList = tbManager.standardButtons(editContext.User.CanDesign, settings);

                var btns = tbManager.buttonHelpers.createFlatList(btnList, allActions, settings, tb.config);
                

                var tbClasses = "sc-menu group-0 " + ((settings.sortOrder === -1) ? " listContent" : "");
                var toolbar = $("<ul />", { 'class': tbClasses, 'onclick': "var e = arguments[0] || window.event; e.stopPropagation();" });

                for (var i = 0; i < btns.length; i++)
                    toolbar.append($("<li />").append($(tb.getButton(btns[i]))));

                //toolbar.data("groups", btns[0] && btns[0].group.groups);
                toolbar.attr("group-count", btns[0] && btns[0].group.groups.length);

                return toolbar[0].outerHTML;
            },

            // find all toolbar-info-attributes in the HTML, convert to <ul><li> toolbar
            _processToolbars: function (parentTag) {
                parentTag = parentTag ? $(parentTag) : $(".DnnModule-" + id);
                $(".sc-menu[data-toolbar]", parentTag).each(function() {
                    var toolbarSettings = $.parseJSON($(this).attr("data-toolbar"));
                    var toolbarTag = $(this);
                    var newTb = $2sxc(toolbarTag).manage.getToolbar(toolbarSettings);
                    toolbarTag.replaceWith(newTb);
                });
            }


        };
        return tb;
    };




})();