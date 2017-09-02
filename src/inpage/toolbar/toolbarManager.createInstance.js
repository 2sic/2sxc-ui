(function () {

    var tbManager = $2sxc._toolbarManager;

    // create an object oriented simple call to access toolbar actions of an instance
    $2sxc._toolbarManager.createInstance = function (sxc) {

        var tb = {
            // 
            // Expects: settings, an object containing the specs for the expected buton
            /**
             * Generate a button (an <a>-tag) for one specific toolbar-action.
             * @param {Object<any>} actDef - settings, an object containing the specs for the expected buton
             * @param {int} groupIndex - number what button-group it's in'
             * @returns {string} html of a button
             */
            getButton: function(actDef, groupIndex) {
                return tbManager.generateButtonHtml(sxc, actDef, groupIndex);
            },

            // Builds the toolbar and returns it as HTML
            // expects settings - either for 1 button or for an array of buttons
            /**
             * Builds the toolbar and returns it as HTML
             * @param {Object<any>} tbConfig - general toolbar config
             * @param {Object<any>} moreSettings - additional / override settings
             * @returns {string} html of the current toolbar
             */
            getToolbar: function(tbConfig, moreSettings) {
                return tbManager.generateToolbarHtml(sxc, tbConfig, moreSettings);
            }

        };
        return tb;
    };

})();