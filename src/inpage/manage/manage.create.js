// A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
// all in-page toolbars etc.
// if loaded, it's found under the $2sxc(module).manage
// it has commands to
// - getButton
// - getToolbar
// - run(...)
// - isEditMode

(function () {
    $2sxc._manage.initInstance = function(sxc) {
        try {
            initInstance(sxc);
        } catch (e) {
            console.error("error in 2sxc - will log but not throw", e);
        }
    };

    var mngApi = $2sxc._manage;
    function initInstance(sxc) {
        var editContext = mngApi.getEditContext(sxc);
        var userInfo = mngApi.getUserOfEditContext(editContext);

        var cmdEngine = $2sxc._commands.instanceEngine(sxc, editContext);

        var editManager = sxc.manage = {
            //#region Official, public properties and commands, which are stable for use from the outside
            /**
             * run a command - often used in toolbars and custom buttons
             */
            run: cmdEngine.executeAction,

            /**
             * Generate a button (an <a>-tag) for one specific toolbar-action.
             * @param {Object<any>} actDef - settings, an object containing the specs for the expected buton
             * @param {int} groupIndex - number what button-group it's in'
             * @returns {string} html of a button
             */
            getButton: function (actDef, groupIndex) {
                return $2sxc._toolbarManager.generateButtonHtml(sxc, actDef, groupIndex);
            },

            /**
             * Builds the toolbar and returns it as HTML
             * @param {Object<any>} tbConfig - general toolbar config
             * @param {Object<any>} moreSettings - additional / override settings
             * @returns {string} html of the current toolbar
             */
            getToolbar: function (tbConfig, moreSettings) {
                return $2sxc._toolbarManager.generateToolbarHtml(sxc, tbConfig, moreSettings);
            },
            //#endregion official, public properties - everything below this can change at any time

            // internal method to find out if it's in edit-mode
            _isEditMode: function () { return editContext.Environment.IsEditable; },
            _reloadWithAjax: editContext.ContentGroup.SupportsAjax,
            _dialogParameters: mngApi.buildNgDialogParams(sxc, editContext),      // used for various dialogs
            _instanceConfig: mngApi.buildInstanceConfig(editContext), // used to configure buttons / toolbars
            _editContext: editContext,              // metadata necessary to know what/how to edit
            _quickDialogConfig: mngApi.buildQuickDialogConfig(editContext),           // used for in-page dialogs
            _commands: cmdEngine,                        // used to handle the commands for this content-block
            _user: userInfo,

            // init this object 
            init: function init() {
                // enhance UI in case there are known errors / issues
                if (editContext.error.type)
                    editManager._handleErrors(editContext.error.type, $2sxc._manage.getTag(sxc));

                // todo: move this to dialog-handling
                // display the dialog
                var openDialogId = sessionStorage.getItem("dia-cbid");
                if (editContext.error.type || !openDialogId || openDialogId !== sxc.cbid) return false;
                sessionStorage.removeItem("dia-cbid");
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
                editManager._instanceConfig = mngApi.buildInstanceConfig(editContext);
            },

            _getCbManipulator: function () {
                return $2sxc._contentBlock.manipulator(sxc);
            }
        };

        editManager.init();
        return editManager;
    }
})();