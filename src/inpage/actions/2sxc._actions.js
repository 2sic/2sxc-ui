/*
 * Actions of 2sxc - mostly used in toolbars
 * 
 * Minimal documentation regarding a button
 * the button can have the following properties / methods
 * - the indexer in the array (usually the same as the name)
 * - name (created in the buttonConfig)
 * - title - actually the translation key to retrieve the title (buttonConfig)
 * - icon - the icon-class
 * - uiActionOnly - true/false if this is just something visual; otherwise a webservice will ensure that a content-group exists (for editing etc.)
 * - showCondition(settings, moduleConfiguration) - would conditionally prevent adding this button by default
 * - code(settings, event) - the code executed on click, if it's not the default action
 * - dynamicClasses(settings) - can conditionally add more css-class names to add to the button, like the "empty" added if something doesn't have metadata
 * - params - ...
 */

(function () {
    // helper function to create the configuration object
    function action(name, translateKey, icon, uiOnly, more) {
        return $2sxc._lib.extend({
            name: name,
            title: "Toolbar." + translateKey,
            icon: "icon-sxc-" + icon,
            uiActionOnly: uiOnly
        }, more);
    }

    $2sxc._actions = {};
    $2sxc._actions.create = function (editContext) {
        var enableTools = editContext.canDesign;
        var isContent = editContext.isContent;

        var act = {
            // show the basic dashboard which allows view-changing
            "dash-view": action("dash-view", "Dashboard", "", true, { inlineWindow: true }),

            // open the import dialog
            "app-import": action("app-import", "Dashboard", "", true, {}),

            // open an edit-item dialog
            'edit': action("edit", "Edit", "pencil", false, {
                params: { mode: "edit" },
                showCondition: function (settings, modConfig) {
                    return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
                }
            }),

            // new is a dialog to add something, and will not add if cancelled
            // new can also be used for mini-toolbars which just add an entity not attached to a module
            // in that case it's essential to add a contentType like 
            // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
            'new': action("new", "New", "plus", false, {
                params: { mode: "new" },
                dialog: "edit", // don't use "new" (default) but use "edit"
                showCondition: function (settings, modConfig) {
                    return settings.contentType || modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
                },
                code: function (settings, event, manager) {
                    // todo - should refactor this to be a toolbarManager.contentBlock command
                    manager._commands._openNgDialog($2sxc._lib.extend({}, settings, { sortOrder: settings.sortOrder + 1 }), event);
                }
            }),

            // add brings no dialog, just add an empty item
            'add': action("add", "AddDemo", "plus-circled", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock 
                        .addItem(settings.sortOrder + 1);
                }
            }),

            // create a metadata toolbar
            "metadata": action("metadata", "Metadata", "tag", false, {
                params: { mode: "new" },
                dialog: "edit", // don't use "new" (default) but use "edit"
                dynamicClasses: function (settings) {
                    // if it doesn't have data yet, make it less strong
                    return settings.entityId ? "" : "empty";
                    // return settings.items && settings.items[0].entityId ? "" : "empty";
                },
                showCondition: function(settings) {
                    return !!settings.metadata;
                }, // only add a metadata-button if it has metadata-infos
                configureCommand: function (cmd) {
                    var itm = {
                        Title: "EditFormTitle.Metadata",
                        Metadata: $2sxc._lib.extend({ keyType: "string", targetType: 10 }, cmd.settings.metadata)
                    };
                    $2sxc._lib.extend(cmd.items[0], itm);
                }
            }),

            // remove an item from the placeholder (usually for lists)
            'remove': action("remove", "Remove", "minus-circled", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, manager) {
                    if (confirm($2sxc.translate("Toolbar.ConfirmRemove"))) {
                        manager.contentBlock
                            .removeFromList(settings.sortOrder);
                    }
                }
            }),

            // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
            //'delete': {
            //    title: "Toolbar.Delete",
            //    icon: "icon-sxc-cancel",
            //    disabled: true,
            //    showCondition: function (settings) { return !settings.useModuleList; },
            //    code: function (settings, event) {
            //        if (confirm(tbContr.translate("Toolbar.ReallyDelete"))) {
            //            tbContr._getAngularVm().reallyDelete(settings.entityId);
            //        }
            //    }
            //},

            'moveup': action("moveup", "MoveUp", "move-up", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock
                        .changeOrder(settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
                }
            }),
            'movedown': action("movedown", "MoveDown", "move-down", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock.changeOrder(settings.sortOrder, settings.sortOrder + 1);
                }
            }),

            'instance-list': action("instance-list", "Sort", "list-numbered", false, {
                showCondition: function (settings, modConfig) { return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; }
            }),

            'publish': action("publish", "Unpublished", "eye-off", false, {
                showCondition: function (settings, modConfig) {
                    return settings.isPublished === false;
                },
                code: function (settings, event, manager) {
                    if (settings.isPublished) {
                        alert($2sxc.translate("Toolbar.AlreadyPublished"));
                        return;
                    }
                    var part = settings.sortOrder === -1 ? "listcontent" : "content";
                    var index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
                    manager.contentBlock.publish(part, index);
                }
            }),

            'replace': action("replace", "Replace", "replace", false, {
                showCondition: function (settings) { return settings.useModuleList; }
            }),


            //#region template commands: contenttype, contentitems, query, develop

            'contenttype': action("contenttype", "ContentType", "fields", true, {
                showCondition: enableTools
            }),

            'contentitems': action("contentitems", "ContentItems", "table", true, {
                params: { contentTypeName: editContext.contentTypeId },
                showCondition: enableTools && editContext.contentTypeId
            }),


            'template-develop': action("develop", "Develop", "code", true, {
                newWindow: true,
                dialog: "develop",
                showCondition: enableTools,
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: editContext.templateId }];
                }
            }),

            // todo: improve condition
            'query': action("query", "QueryEdit", "filter", true, {
                showCondition: function (settings, modConfig) {
                    return enableTools && !isContent && editContext.queryId;
                },
                dynamicClasses: function (settings) {
                    return editContext.queryId ? "" : "empty";  // if it doesn't have a query, make it less strong
                }
            }),

            // todo: title i18n
            'template-settings': action("template-settings", "TemplateSettings", "sliders", true, {
                dialog: "edit",
                showCondition: enableTools,
                configureCommand: function (cmd) {
                    cmd.Title = "EditFormTitle.TemplateSettings"; 
                    cmd.items = [{ EntityId: editContext.templateId }];
                }

            }),
            //#endregion template commands

            //#region app-actions: app-settings, app-resources
            // todo: improve condition
            // todo: dynamicClasses like metadata, to disable if not ready...
            'app-settings': action("app-settings", "AppSettings", "sliders", true, {
                dialog: "edit",
                showCondition: function(settings, modConfig) {
                    return enableTools && !isContent && editContext.appSettingsId != null; // only if settings exist, or are 0 (to be created)
                },
                configureCommand: function (cmd) {
                    cmd.Title = "TODO"; //TODO
                    cmd.items = [{ EntityId: editContext.appSettingsId }];
                }
            }),

            // todo: improve condition
            'app-resources': action("app-resources", "AppResources", "language", true, {
                dialog: "edit",
                showCondition: function (settings, modConfig) {
                    return enableTools && !isContent && editContext.appResourcesId != null; // only if resources exist or are 0 (to be created)...
                },
                configureCommand: function (cmd) {
                    cmd.Title = "TODO"; //todo
                    cmd.items = [{ EntityId: editContext.appResourcesId }];
                }
            }),
            //#endregion

            //#region app & zone

            'app': action("app", "App", "settings", true, {
                showCondition: enableTools
            }),

            'zone': action("zone", "Zone", "manage", true, {
                showCondition: enableTools
            }),
            //#endregion

            'custom': action("custom", "Custom", "bomb", true, {
                code: function (settings, event, manager) {
                    console.log("custom action with code - BETA feature, may change");
                    if (!settings.customCode) {
                        console.warn("custom code action, but no onclick found to run", settings);
                        return;
                    }
                    try {
                        var fn = new Function("settings", "event", "manager", settings.customCode); // jshint ignore:line
                        fn(settings, event, manager);
                    } catch (err) {
                        console.error("error in custom button-code: ", settings);
                    }
                }
            }),

            //#region UI actions: layout, more
            'layout': action("layout", "ChangeLayout", "glasses", true, {
                code: function (settings, event, manager) {
                    manager.contentBlock.dialogToggle();
                }
            }),

            "more": action("more", "MoreActions", "options btn-mode", true, {
                code: function (settings, event) {
                    var btn = $(event.target),
                        fullMenu = btn.closest("ul.sc-menu"),
                        oldState = Number(fullMenu.attr("data-state") || 0),
                        max = Number(fullMenu.attr("group-count")),
                        newState = (oldState + 1) % max;

                    fullMenu.removeClass("group-" + oldState)
                        .addClass("group-" + newState)
                        .attr("data-state", newState);
                }
            })

            //#endregion
        };

        return act;
    };

})();
