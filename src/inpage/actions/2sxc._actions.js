﻿/*
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
    function action(name, translateKey, icon, show, uiOnly, more) {
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

        var act = {
            // show the basic dashboard which allows view-changing
            "dash-view": action("dash", "Dashboard", "", "", true, { inlineWindow: true }),

            // open the import dialog
            "app-import": action("app-import", "Dashboard", "", "", true, {}),

            // open an edit-item dialog
            'edit': action("edit", "Edit", "pencil", "default", false, {
                params: { mode: "edit" },
                showCondition: function (settings, modConfig) {
                    return modConfig.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
                }
            }),

            // new is a dialog to add something, and will not add if cancelled
            // new can also be used for mini-toolbars which just add an entity not attached to a module
            // in that case it's essential to add a contentType like 
            // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
            'new': action("new", "New", "plus", "default", false, {
                params: { mode: "new" },
                dialog: "edit", // don't use "new" (default) but use "edit"
                showCondition: function (settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
                },
                code: function (settings, event, manager) {
                    // todo - should refactor this to be a toolbarManager.contentBlock command
                    manager._commands._openNgDialog($2sxc._lib.extend({}, settings, { sortOrder: settings.sortOrder + 1 }), event);
                }
            }),

            // add brings no dialog, just add an empty item
            'add': action("add", "AddDemo", "plus-circled", "edit", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock 
                        .addItem(settings.sortOrder + 1);
                }
            }),

            // create a metadata toolbar
            "metadata": action("metadata", "Metadata", "tag", "default", false, {
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
            'remove': action("remove", "Remove", "minus-circled", "edit", false, {
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

            'moveup': action("moveup", "MoveUp", "move-up", "edit", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock
                        .changeOrder(settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
                }
            }),
            'movedown': action("movedown", "MoveDown", "move-down", "edit", false, {
                showCondition: function(settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, manager) {
                    manager.contentBlock.changeOrder(settings.sortOrder, settings.sortOrder + 1);
                }
            }),
            'sort': action("sort", "Sort", "list-numbered", "edit", false, {
                showCondition: function (settings, modConfig) { return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; }
            }),
            'publish': action("publish", "Unpublished", "eye-off", "default", false, {
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

            //'unpublish': createActionConfig("publish", "Published", "eye", "edit", false, {
            //    icon2: "icon-sxc-eye-off",
            //    disabled: true,
            //    showCondition: function(settings, modConfig) {
            //        return true; 
            //    },
            //    code: function (settings, event, manager) {
            //        if (settings.isPublished) {
            //            alert($2sxc.translate("Toolbar.AlreadyPublished"));
            //            return;
            //        }
            //        var part = settings.sortOrder === -1 ? "listcontent" : "content";
            //        var index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
            //        manager.contentBlock.publish(part, index);
            //    }
            //}),

            'replace': action("replace", "Replace", "replace", "edit", false, {
                showCondition: function (settings) { return settings.useModuleList; }
            }),

            'layout': action("layout", "ChangeLayout", "glasses", "default", true, {
                code: function (settings, event, manager) {
                    manager.contentBlock.dialogToggle();
                }
            }),

            'develop': action("develop", "Develop", "code", "admin", true, {
                newWindow: true,
                showCondition: enableTools,
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: editContext.templateId }];
                }
            }),

            'contenttype': action("contenttype", "ContentType", "fields", "admin", true, {
                showCondition: enableTools
            }),

            'contentitems': action("contentitems", "ContentItems", "table", "admin", true, {
                params: { contentTypeName: editContext.contentTypeId },
                showCondition: enableTools && editContext.contentTypeId
            }),

            'app': action("app", "App", "settings", "admin", true, {
                showCondition: enableTools
            }),

            'zone': action("zone", "Zone", "manage", "admin", true, {
                showCondition: enableTools
            }),

            'custom': action("custom", "Custom", "bomb", "admin", true, {
                code: function (settings, event, manager) {
                    console.log("custom action with code - BETA feature, may change");
                    if (!settings.customCode) {
                        console.log("custom code action, but no onclick found to run");
                        return;
                    }
                    eval(settings.customCode); // jshint ignore:line
                }
            }),

            "more": action("more", "MoreActions", "options btn-mode", "default,edit,design,admin", true, {
                code: function (settings, event) {
                    var btn = $(event.target);
                    var fullMenu = btn.closest("ul.sc-menu"); 
                    var oldState = Number(fullMenu.attr("data-state") || 0);
                    var newState = oldState + 1;
                    var max = Number(fullMenu.attr("group-count"));
                    newState = newState % max;

                    fullMenu.removeClass("group-" + oldState)
                        .addClass("group-" + newState)
                        .attr("data-state", newState);
                }
            })
        };
        return act;
    };

})();
