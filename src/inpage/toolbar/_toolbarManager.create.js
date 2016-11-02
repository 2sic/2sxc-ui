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
            getButton: function (actDef, groupIndex) {
                // if the button belongs to a content-item, move the specs up to the item into the settings-object
                flattenActionDefinition(actDef);

                // retrieve configuration for this button
                var showClasses = "group-" + groupIndex,
                    classesList = (actDef.classes || "").split(","),
                    box = $("<div/>"),
                    symbol = $("<i class=\"" + actDef.icon + "\" aria-hidden=\"true\"></i>"),
                    onclick = actDef.onclick || "$2sxc(" + id + ", " + cbid + ").manage.run(" + JSON.stringify(actDef.command /*, tb._jsonifyFilterGroup*/) + ", event);";

                //console.log("onclick: " + onclick);

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


            // Builds the toolbar and returns it as HTML
            // expects settings - either for 1 button or for an array of buttons
            getToolbar: function (settings) {
                if ($2sxc.debug.load) {
                    console.log("creating toolbar");
                    console.log(settings);
                }

                // if it has an action or is an array, keep that. Otherwise get standard buttons
                settings = settings || {};// if null/undefined, use empty object
                var btnList = settings; 
                if (!settings.action && !settings.groups && !settings.buttons && !Array.isArray(settings))
                    btnList = tbManager.standardButtons(editContext.User.CanDesign, settings);

                var tlbDef = tbManager.buttonHelpers.buildFullDefinition(btnList, allActions, /*settings,*/ tb.config);
                var btnGroups = tlbDef.groups;

                // todo: this settings assumes it's not in an array...
                var tbClasses = "sc-menu group-0 " + ((settings.sortOrder === -1) ? " listContent" : "");
                var toolbar = $("<ul />", { 'class': tbClasses, 'onclick': "var e = arguments[0] || window.event; e.stopPropagation();" });

                for (var g = 0; g < btnGroups.length; g++) {
                    var btns = btnGroups[g].buttons;
                    for (var i = 0; i < btns.length; i++)
                        toolbar.append($("<li />").append($(tb.getButton(btns[i], g))));
                }

                toolbar.attr("group-count", btnGroups.length);

                return toolbar[0].outerHTML;
            },

            // find all toolbar-info-attributes in the HTML, convert to <ul><li> toolbar
            _processToolbars: function (parentTag) {
                parentTag = parentTag ? $(parentTag) : $(".DnnModule-" + id);
                function getToolbars() { return $(".sc-menu[data-toolbar]", parentTag); }

                var toolbars = getToolbars();
                if (toolbars.length === 0) // no toolbars found, must help a bit because otherwise editing is hard
                {
                    console.warn("didn't find a toolbar, so will create an automatic one to help for the block", parentTag);
                    var outsideCb = !parentTag.hasClass('sc-content-block');
                    var contentTag = outsideCb ? parentTag.find("div.sc-content-block") : parentTag;
                    contentTag.addClass("sc-element");
                    contentTag.prepend($("<ul class='sc-menu' data-toolbar=''/>"));
                    toolbars = getToolbars();
                }

                function initToolbar() {
                    try {
                        var toolbarTag = $(this), data = toolbarTag.attr("data-toolbar"), toolbarSettings = null;
                        try {
                            toolbarSettings = $.parseJSON(data);
                        }
                        catch(err) {
                            console.error("error on toolbar JSON - probably invalid - make sure you also quote your properties like \"name\": ...", data, err);
                            return;
                        }

                        var newTb = $2sxc(toolbarTag).manage.getToolbar(toolbarSettings);
                        toolbarTag.replaceWith(newTb);
                    } catch (err) {
                        // note: errors can happen a lot on custom toolbars, must be sure the others are still rendered
                        console.error("error creating toolbar - will skip this one", err);
                    }
                }

                toolbars.each(initToolbar);
            }

        };
        return tb;
    };




})();