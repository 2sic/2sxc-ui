(function () {
    var tbManager = $2sxc._toolbarManager;
    tbManager.create = function (sxc, editContext) {
        var id = sxc.id,
            cbid = sxc.cbid,
            ec = editContext,
            cg = ec.ContentGroup,
            allActions = $2sxc._commands.definitions.create({
                canDesign: ec.User.CanDesign,
                templateId: cg.TemplateId,
                contentTypeId: cg.ContentTypeName,
                isContent: cg.IsContent,
                queryId: cg.QueryId,
                appResourcesId: cg.AppResourcesId,
                appSettingsId: cg.AppSettingsId
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
            refreshConfig: function () { tb.config = createToolbarConfig(editContext); },
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
                    onclick = actDef.disabled ? "" : "$2sxc(" + id + ", " + cbid + ").manage.run(" + JSON.stringify(actDef.command /*, tb._jsonifyFilterGroup*/) + ", event);";

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
            getToolbar: function (tbConfig, moreSettings) {

                // if it has an action or is an array, keep that. Otherwise get standard buttons
                tbConfig = tbConfig || {};// if null/undefined, use empty object
                var btnList = tbConfig;
                if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
                    btnList = tbManager.standardButtons(editContext.User.CanDesign, tbConfig);

                // whatever we had, if more settings were provided, override with these...
                //if (moreSettings)
                //    $2sxc._lib.extend(btnList.settings, moreSettings);

                var tlbDef = tbManager.buttonHelpers.buildFullDefinition(btnList, allActions, tb.config, moreSettings);
                var btnGroups = tlbDef.groups;
                var behaviourClasses = " sc-tb-hover-" + tlbDef.settings.hover
                    + " sc-tb-show-" + tlbDef.settings.show;



                // todo: this settings assumes it's not in an array...
                var tbClasses = "sc-menu group-0 "
                    + behaviourClasses + " "
                    + ((tbConfig.sortOrder === -1) ? " listContent" : "")
                    + (tlbDef.settings.classes ? " " + tlbDef.settings.classes : "");
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
                // find current toolbars on this tag
                function getToolbars() { return $(".sc-menu[toolbar],.sc-menu[data-toolbar]", parentTag); }

                // don't add, if it is has un-initialized content
                var disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;

                var toolbars = getToolbars(),
                    settingsForEmptyToolbar = {
                        hover: "left",
                        autoAddMore: "left"
                    };
                if (toolbars.length === 0 && !disableAutoAdd) // no toolbars found, must help a bit because otherwise editing is hard
                {
                    //console.log("didn't find a toolbar, so will create an automatic one to help for the block", parentTag);
                    var outsideCb = !parentTag.hasClass('sc-content-block');
                    var contentTag = outsideCb ? parentTag.find("div.sc-content-block") : parentTag;
                    contentTag.addClass("sc-element");
                    // todo: make the empty-toolbar-default-settings used below as well...
                    var settingsString = JSON.stringify(settingsForEmptyToolbar);
                    contentTag.prepend($("<ul class='sc-menu' toolbar='' settings='" + settingsString + "'/>"));
                    toolbars = getToolbars();
                }

                function initToolbar() {
                    try {
                        var tag = $(this), data, toolbarConfig, toolbarSettings;

                        try {
                            data = tag.attr("toolbar") || tag.attr("data-toolbar");
                            toolbarConfig = data ? JSON.parse(data) : {};
                        }
                        catch (err) {
                            console.error("error on toolbar JSON - probably invalid - make sure you also quote your properties like \"name\": ...", data, err);
                            return;
                        }

                        try {
                            data = tag.attr("settings") || tag.attr("data-settings");
                            toolbarSettings = data ? JSON.parse(data) : {};
                            if (toolbarConfig === {} && toolbarSettings === {})
                                toolbarSettings = settingsForEmptyToolbar;
                        }
                        catch (err) {
                            console.error("error on settings JSON - probably invalid - make sure you also quote your properties like \"name\": ...", data, err);
                            return;
                        }

                        var newTb = $2sxc(tag).manage.getToolbar(toolbarConfig, toolbarSettings);
                        tag.replaceWith(newTb);
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