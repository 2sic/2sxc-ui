(function () {
    var tbManager = $2sxc._toolbarManager;

    // create an object oriented simple call to access toolbar actions of an instance
    $2sxc._toolbarManager.createInstance = function (sxc) {
        return {
            getButton: getButton,
            getToolbar: getToolbar
        };

        // Generate a button (an <a>-tag) for one specific toolbar-action. 
        // Expects: settings, an object containing the specs for the expected buton
        function getButton(actDef, groupIndex) {
            return tbManager.generateButtonHtml(sxc, actDef, groupIndex);
        }

        // Builds the toolbar and returns it as HTML
        // expects settings - either for 1 button or for an array of buttons
        function getToolbar(tbConfig, moreSettings) {
            return tbManager.generateToolbarHtml(sxc, tbConfig, moreSettings);
        }
    };
})();