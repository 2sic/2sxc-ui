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
 * - disabled (new!)
 * - params - ...
 */

(function () {
    // helper function to create the configuration object
    function makeDef(name, translateKey, icon, uiOnly, more) {
        return $2sxc._lib.extend({
            name: name,
            title: "Toolbar." + translateKey,
            icon: "icon-sxc-" + icon,
            uiActionOnly: uiOnly
        }, more);
    }

    $2sxc._commands.definitions = {};
    $2sxc._commands.definitions.create = function (editContext) {
        var enableTools = editContext.canDesign;
        var isContent = editContext.isContent;

        var act = {
            // show the basic dashboard which allows view-changing
            "dash-view": makeDef("dash-view", "Dashboard", "", true, { inlineWindow: true }),

            // open the import dialog
            "app-import": makeDef("app-import", "Dashboard", "", true, {}),

            // open an edit-item dialog
            'edit': makeDef("edit", "Edit", "pencil", false, {
                params: { mode: "edit" },
                showCondition: function (settings, modConfig) {
                    return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
                }
            }),

            // new is a dialog to add something, and will not add if cancelled
            // new can also be used for mini-toolbars which just add an entity not attached to a module
            // in that case it's essential to add a contentType like 
            // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
            'new': makeDef("new", "New", "plus", false, {
                params: { mode: "new" },
                dialog: "edit", // don't use "new" (default) but use "edit"
                showCondition: function (settings, modConfig) {
                    return settings.contentType || modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
                },
                code: function (settings, event, sxc) {
                    // todo - should refactor this to be a toolbarManager.contentBlock command
                    sxc.manage._commands._openNgDialog($2sxc._lib.extend({}, settings, { sortOrder: settings.sortOrder + 1 }), event);
                }
            }),

            // add brings no dialog, just add an empty item
            'add': makeDef("add", "AddDemo", "plus-circled", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    sxc.manage.contentBlock
                        .addItem(settings.sortOrder + 1);
                }
            }),

            // create a metadata toolbar
            "metadata": makeDef("metadata", "Metadata", "tag", false, {
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
            'remove': makeDef("remove", "Remove", "minus-circled", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    if (confirm($2sxc.translate("Toolbar.ConfirmRemove"))) {
                        sxc.manage.contentBlock
                            .removeFromList(settings.sortOrder);
                    }
                }
            }),

            // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
            'deleteItem': makeDef("deleteItem", "Delete", "cancel", true, {
                // disabled: true,
                // showCondition: false, //function (settings) { return !settings.useModuleList; },
                code: function (settings, event, sxc) {
                    $2sxc.contentItems.delete(sxc, settings.entityId);
                    //$2sxc.contentItems.delete(sxc, settings.entityGuid);
                    //if (confirm(tbContr.translate("Toolbar.ReallyDelete"))) {
                    //    tbContr._getAngularVm().reallyDelete(settings.entityId);
                    //}
                }
            }),

            'moveup': makeDef("moveup", "MoveUp", "move-up", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
                },
                code: function (settings, event, sxc) {
                    sxc.manage.contentBlock
                        .changeOrder(settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
                }
            }),
            'movedown': makeDef("movedown", "MoveDown", "move-down", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    sxc.manage.contentBlock.changeOrder(settings.sortOrder, settings.sortOrder + 1);
                }
            }),

            'instance-list': makeDef("instance-list", "Sort", "list-numbered", false, {
                showCondition: function (settings, modConfig) { return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; }
            }),

            'publish': makeDef("publish", "Unpublished", "eye-off", false, {
                showCondition: function (settings, modConfig) {
                    return settings.isPublished === false;
                },
                code: function (settings, event, sxc) {
                    if (settings.isPublished) 
                        return alert($2sxc.translate("Toolbar.AlreadyPublished"));

                    // if we have an entity-id, publish based on that
                    if (settings.entityId)
                        return sxc.manage.contentBlock.publishId(settings.entityId);

                    var part = settings.sortOrder === -1 ? "listcontent" : "content";
                    var index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
                    return sxc.manage.contentBlock.publish(part, index);
                }
            }),

            'replace': makeDef("replace", "Replace", "replace", false, {
                showCondition: function (settings) { return settings.useModuleList; }
            }),



            //#region app-actions: app-settings, app-resources

            'app-settings': makeDef("app-settings", "AppSettings", "sliders", true, {
                dialog: "edit",
                disabled: editContext.appSettingsId === null,
                title: "Toolbar.AppSettings" + (editContext.appSettingsId === null ? "Disabled" : ""),
                showCondition: function(settings, modConfig) {
                    return enableTools && !isContent /*&& editContext.appSettingsId !== null*/; // only if settings exist, or are 0 (to be created)
                },
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: editContext.appSettingsId }];
                },
                dynamicClasses: function (settings) {
                    return editContext.appSettingsId !== null ? "" : "empty";  // if it doesn't have a query, make it less strong
                }
            }),

            'app-resources': makeDef("app-resources", "AppResources", "language", true, {
                dialog: "edit",
                disabled: editContext.appResourcesId === null,
                title: "Toolbar.AppResources" + (editContext.appResourcesId === null ? "Disabled" : ""),
                showCondition: function (settings, modConfig) {
                    return enableTools && !isContent /*&& editContext.appResourcesId !== null*/; // only if resources exist or are 0 (to be created)...
                },
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: editContext.appResourcesId }];
                },
                dynamicClasses: function (settings) {
                    return editContext.appResourcesId !== null ? "" : "empty";  // if it doesn't have a query, make it less strong
                }
            }),
            //#endregion

            //#region app & zone

            'app': makeDef("app", "App", "settings", true, {
                showCondition: enableTools
            }),

            'zone': makeDef("zone", "Zone", "manage", true, {
                showCondition: enableTools
            })
            //#endregion

        };

        // quick helper so we can better debug the creation of definitions
        function addDef(def) { act[def.name] = def; }

        //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings

        addDef(makeDef("contenttype", "ContentType", "fields", true, {
            showCondition: enableTools
        }));

        addDef(makeDef("contentitems", "ContentItems", "table", true, {
            params: { contentTypeName: editContext.contentTypeId },
            showCondition: function(settings, modConfig) {
                return enableTools && (settings.contentType || editContext.contentTypeId);
            },
            configureCommand: function(cmd) {
                if (cmd.settings.contentType) // optionally override with custom type
                    cmd.params.contentTypeName = cmd.settings.contentType;
                // maybe: if item doesn't have a type, use that of template
                // else if (editContext.contentTypeId)
                //    cmd.params.contentTypeName = editContext.contentTypeId;
                if (cmd.settings.filters) {
                    var enc = JSON.stringify(cmd.settings.filters);

                    // special case - if it contains a "+" character, this won't survive 
                    // encoding through the hash as it's always replaced with a space, even if it would be preconverted to %2b
                    // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
                    if (enc.indexOf("+") > -1)
                        enc = btoa(enc);
                    cmd.params.filters = enc;
                }
            }
        }));


        addDef(makeDef("template-develop", "Develop", "code", true, {
            newWindow: true,
            dialog: "develop",
            showCondition: enableTools,
            configureCommand: function(cmd) {
                cmd.items = [{ EntityId: editContext.templateId }];
            }
        }));

        addDef(makeDef("template-query", "QueryEdit", "filter", true, {
            dialog: "pipeline-designer",
            params: { pipelineId: editContext.queryId },
            newWindow: true,
            disabled: editContext.appSettingsId === null,
            title: "Toolbar.QueryEdit" + (editContext.queryId === null ? "Disabled" : ""),
            showCondition: function(settings, modConfig) {
                return enableTools && !isContent;
            },
            dynamicClasses: function(settings) {
                return editContext.queryId ? "" : "empty"; // if it doesn't have a query, make it less strong
            }
            //configureCommand: function (cmd) {
            //    cmd.params.pipelineId = editContext.queryId;
            //}
        }));

        addDef(makeDef("template-settings", "TemplateSettings", "sliders", true, {
            dialog: "edit",
            showCondition: enableTools,
            configureCommand: function(cmd) {
                cmd.items = [{ EntityId: editContext.templateId }];
            }

        }));
        //#endregion template commands

        //#region custom code buttons
        addDef(makeDef("custom", "Custom", "bomb", true, {
            code: function(settings, event, sxc) {
                console.log("custom action with code - BETA feature, may change");
                if (!settings.customCode) {
                    console.warn("custom code action, but no onclick found to run", settings);
                    return;
                }
                try {
                    var fn = new Function("settings", "event", "sxc", settings.customCode); // jshint ignore:line
                    fn(settings, event, sxc);
                } catch (err) {
                    console.error("error in custom button-code: ", settings);
                }
            }
        }));
        //#endregion

        //#region UI actions: layout, more
        addDef(makeDef("layout", "ChangeLayout", "glasses", true, {
            code: function(settings, event, sxc) {
                sxc.manage.contentBlock.dialogToggle();
            }
        }));

        addDef(makeDef("more", "MoreActions", "options btn-mode", true, {
            code: function(settings, event) {
                var btn = $(event.target),
                    fullMenu = btn.closest("ul.sc-menu"),
                    oldState = Number(fullMenu.attr("data-state") || 0),
                    max = Number(fullMenu.attr("group-count")),
                    newState = (oldState + 1) % max;

                fullMenu.removeClass("group-" + oldState)
                    .addClass("group-" + newState)
                    .attr("data-state", newState);
            }
        }));

        //#endregion

        return act;
    };

})();
