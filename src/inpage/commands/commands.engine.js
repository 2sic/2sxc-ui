
(function () {
    $2sxc._commands.engine = function (sxc, targetTag) {
        var cmc = {
            manage: "must-be-added-after-initialization",
            init: function (manage) {
                cmc.manage = manage;
            },

            // assemble an object which will store the configuration and execute it
            create: function (specialSettings) {
                var settings = $2sxc._lib.extend({}, cmc.manage._toolbarConfig, specialSettings); // merge button with general toolbar-settings
                var ngDialogUrl = cmc.manage._editContext.Environment.SxcRootUrl + "desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver="
                    + cmc.manage._editContext.Environment.SxcVersion;
                var isDebug = $2sxc.urlParams.get("debug") ? "&debug=true" : "";

                var cmd = {
                    settings: settings,
                    items: settings.items || [], // use predefined or create empty array
                    params: $2sxc._lib.extend({
                        dialog: settings.dialog || settings.action // the variable used to name the dialog changed in the history of 2sxc from action to dialog
                    }, settings.params),

                    addSimpleItem: function () {
                        var itm = {}, ct = cmd.settings.contentType || cmd.settings.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
                        if (cmd.settings.entityId) itm.EntityId = cmd.settings.entityId;
                        if (ct) itm.ContentTypeName = ct;

                        // only add if there was stuff to add
                        if (itm.EntityId || itm.ContentTypeName) cmd.items.push(itm);
                    },

                    // this adds an item of the content-group, based on the group GUID and the sequence number
                    addContentGroupItem: function (guid, index, part, isAdd, isEntity, cbid, sectionLanguageKey) {
                        cmd.items.push({
                            Group: { Guid: guid, Index: index, Part: part, Add: isAdd },
                            Title: $2sxc.translate(sectionLanguageKey)
                        });
                    },

                    // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
                    addContentGroupItemSetsToEditList: function (withPresentation) {
                        var isContentAndNotHeader = (cmd.settings.sortOrder !== -1),
                            index = isContentAndNotHeader ? cmd.settings.sortOrder : 0,
                            prefix = isContentAndNotHeader ? "" : "List",
                            cTerm = prefix + "Content",
                            pTerm = prefix + "Presentation",
                            isAdd = cmd.settings.action === "new",
                            groupId = cmd.settings.contentGroupId;
                        cmd.addContentGroupItem(groupId, index, cTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, "EditFormTitle." + cTerm);

                        if (withPresentation) cmd.addContentGroupItem(groupId, index, pTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, "EditFormTitle." + pTerm);
                    },

                    generateLink: function (dialogUrl) {
                        // if there is no items-array, create an empty one (it's required later on)
                        if (!cmd.settings.items) cmd.settings.items = [];
                        //#region steps for all actions: prefill, serialize, open-dialog
                        // when doing new, there may be a prefill in the link to initialize the new item
                        if (cmd.settings.prefill) {
                            for (var i = 0; i < cmd.items.length; i++) {
                                cmd.items[i].Prefill = cmd.settings.prefill;
                            }
                        }
                        cmd.params.items = JSON.stringify(cmd.items); // Serialize/json-ify the complex items-list
                        
                        return (dialogUrl || ngDialogUrl)
                            + "#" + $.param(cmc.manage._dialogParameters)
                            + "&" + $.param(cmd.params)
                            + isDebug;
                        //#endregion
                    }
                };
                return cmd;
            },

            // create a dialog link
            _linkToNgDialog: function (specialSettings) {
                var cmd = cmc.manage._commands.create(specialSettings);

                if (cmd.settings.useModuleList) cmd.addContentGroupItemSetsToEditList(true);
                else cmd.addSimpleItem();

                // if the command has own configuration stuff, do that now
                if (cmd.settings.configureCommand) cmd.settings.configureCommand(cmd);

                if (specialSettings.angularDialog) {
                    var modernDialogUrl = cmc.manage._editContext.Environment.SxcRootUrl + "desktopmodules/tosic_sexycontent/dist/ng/ui.html?sxcver="
                        + cmc.manage._editContext.Environment.SxcVersion;
                    return cmd.generateLink(modernDialogUrl);
                }
                return cmd.generateLink();
            },

            _openModernDialog: function (settings) {
                var link = cmc._linkToNgDialog(settings);
                return $2sxc._angularDialog.open(url, settings.name);
            },

            // open a new dialog of the angular-ui
            _openNgDialog: function (settings, event, closeCallback) {
                if (settings.params) settings.params.versioningRequirements = sxc.manage._editContext.ContentBlock.VersioningRequirements;
                var callback = function () {
                    cmc.manage.contentBlock.reloadAndReInitialize();
                    closeCallback();
                }, link = cmc._linkToNgDialog(settings);
                if (settings.newWindow || (event && event.shiftKey)) return window.open(link);
                if (settings.inlineWindow) return $2sxc._dialog(sxc, targetTag, link, callback, settings.dialog === 'item-history');
                return $2sxc.totalPopup.open(link, callback);
            },

            // ToDo: remove dead code
            executeAction: function (nameOrSettings, settings, event) {
                var conf,
                    // ToDo: review this code
                    // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
                    origEvent = event || window.event;

                // check if name is name (string) or object (settings)
                if (!event && settings && typeof settings.altKey !== 'undefined') { // no event param, but settings contains the event-object
                    event = settings;   // move it to the correct variable
                    settings = {};      // clear the settings variable
                }

                settings = (typeof nameOrSettings === "string")
                    ? $2sxc._lib.extend(settings || {}, { "action": nameOrSettings }) // place the name as an action-name into a command-object
                    : nameOrSettings;

                conf = cmc.manage._toolbar.actions[settings.action];
                settings = $2sxc._lib.extend({}, conf, settings); // merge conf & settings, but settings has higher priority

                if (!settings.dialog) settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
                if (!settings.code) settings.code = cmc._openNgDialog; // decide what action to perform

                if (conf.uiActionOnly) return settings.code(settings, origEvent, sxc); // 2016-11-03 cmc.manage);

                // if more than just a UI-action, then it needs to be sure the content-group is created first
                cmc.manage.contentBlock.prepareToAddContent()
                    .then(function () {
                        return settings.code(settings, origEvent, sxc); // 2016-11-03 cmc.manage);
                    });
            }
        };

        return cmc;
    };
})();