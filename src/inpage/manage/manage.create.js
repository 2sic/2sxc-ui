// A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
// all in-page toolbars etc.
// if loaded, it's found under the $2sxc(module).manage
// it has commands to
// - getButton
// - getToolbar
// - run(...)
// - isEditMode

(function () {
    $2sxc._manage.attach = function (sxc) {
        var contentBlockTag = getContentBlockTag(sxc);
        var editContext = getContextInfo(contentBlockTag);
        
        // assemble all parameters needed for the common dialogs if we open anything
        var ngDialogParams = {
            zoneId: editContext.ContentGroup.ZoneId,
            appId: editContext.ContentGroup.AppId,
            tid: editContext.Environment.PageId,
            mid: editContext.Environment.InstanceId,
            cbid: sxc.cbid,
            lang: editContext.Language.Current,
            langpri: editContext.Language.Primary,
            langs: JSON.stringify(editContext.Language.All),
            portalroot: editContext.Environment.WebsiteUrl,
            websiteroot: editContext.Environment.SxcRootUrl,
            partOfPage: true,
            versioningRequirements: editContext.ContentBlock.VersioningRequirements,

            // todo: probably move the user into the dashboard info
            user: { canDesign: editContext.User.CanDesign, canDevelop: editContext.User.CanDesign },
            approot: editContext.ContentGroup.AppUrl || null // this is the only value which doesn't have a slash by default.  note that the app-root doesn't exist when opening "manage-app"
        };
        var dashConfig = {
            appId: editContext.ContentGroup.AppId,
            isContent: editContext.ContentGroup.IsContent,
            hasContent: editContext.ContentGroup.HasContent,
            isList: editContext.ContentGroup.IsList,
            templateId: editContext.ContentGroup.TemplateId,
            contentTypeId: editContext.ContentGroup.ContentTypeName,
            templateChooserVisible: editContext.ContentBlock.ShowTemplatePicker, // todo: maybe move to content-goup
            user: { canDesign: editContext.User.CanDesign, canDevelop: editContext.User.CanDesign },
            supportsAjax: editContext.ContentGroup.SupportsAjax
        };
        
        function initializeInstance(editContext) {
            var cg = editContext.ContentGroup;
            return $2sxc._commands.definitions.create({
                canDesign: editContext.User.CanDesign,
                templateId: cg.TemplateId,
                contentTypeId: cg.ContentTypeName,
                isContent: cg.IsContent,
                queryId: cg.QueryId,
                appResourcesId: cg.AppResourcesId,
                appSettingsId: cg.AppSettingsId
            });
        }


        var instanceCommands = initializeInstance(editContext);
        var toolsAndButtons = $2sxc._toolbarManager.createInstance(sxc, editContext);
        var cmds = $2sxc._commands.engine(sxc, contentBlockTag);

        var editManager = sxc.manage = {
            //#region Official, public properties and commands, which are stable for use from the outside
            // run a command - often used in toolbars and custom buttons
            run: cmds.executeAction,

            // get a button or a toolbar for something
            getButton: toolsAndButtons.getButton,
            getToolbar: toolsAndButtons.getToolbar,
            //#endregion official, public properties - everything below this can change at any time

            // 2017-08-26 2dm temp - moving commands/actions to here from toolbar
            _actions: instanceCommands,

            // internal method to find out if it's in edit-mode
            _isEditMode: function () { return editContext.Environment.IsEditable; },
            _reloadWithAjax: editContext.ContentGroup.SupportsAjax,
            _dialogParameters: ngDialogParams,      // used for various dialogs
            _toolbarConfig: toolsAndButtons.config, // used to configure buttons / toolbars
            _editContext: editContext,              // metadata necessary to know what/how to edit
            _dashboardConfig: dashConfig,           // used for in-page dialogs
            _commands: cmds,                        // used to handle the commands for this content-block
            _tag: contentBlockTag,
            //#region toolbar quick-access commands - might be used by other scripts, so I'm keeping them here for the moment, but may just delete them later
            _toolbar: toolsAndButtons, // should use this from now on when accessing from outside
            //#endregion

            // init this object 
            init: function init() {
                // enhance UI in case there are known errors / issues
                if (editContext.error.type)
                    editManager._handleErrors(editContext.error.type, editManager._tag);

                // finish init of sub-objects
                editManager._commands.init(editManager);
                editManager.contentBlock = $2sxc._contentBlock.create(sxc, editManager, editManager._tag);

                // display the dialog
                var openDialogId = sessionStorage.getItem('dia-cbid');
                if (editContext.error.type || !openDialogId || openDialogId !== sxc.cbid) return false;
                sessionStorage.removeItem('dia-cbid');
                editManager.run("layout");
            },

            // private: show error when the app-data hasn't been installed yet for this imported-module
            _handleErrors: function (errType, cbTag) {
                var errWrapper = $("<div class=\"dnnFormMessage dnnFormWarning sc-element\"></div>");
                var msg = "";
                var toolbar = $("<ul class='sc-menu'></ul>");
                if (errType === "DataIsMissing") {
                    msg = "Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import";
                    toolbar.attr("data-toolbar", '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
                }
                errWrapper.append(msg);
                errWrapper.append(toolbar);
                $(cbTag).append(errWrapper);
            },
            // change config by replacing the guid, and refreshing dependend sub-objects
            _updateContentGroupGuid: function (newGuid) {
                editContext.ContentGroup.Guid = newGuid;
                toolsAndButtons.refreshConfig();
                editManager._toolbarConfig = toolsAndButtons.config;
            },
            _getCbManipulator: function () {
                return $2sxc._contentBlock.manipulator(sxc);
            }
        };

        editManager.init();
        return editManager;
    };




    //#region helper functions
    function getContentBlockTag(sxci) {
        return $("div[data-cb-id='" + sxci.cbid + "']")[0];
    }

    function getContextInfo(cb) {
        var attr = cb.getAttribute("data-edit-context");
        return JSON.parse(attr || "");
    }
    //#endregion
})();