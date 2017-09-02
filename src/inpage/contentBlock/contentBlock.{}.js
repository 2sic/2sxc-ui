/* 
 * this is a content block in the browser
 * 
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
(function () {
    /**
     * The main content-block manager
     */
    $2sxc._contentBlock = {

        // constants
        cViewWithoutContent: "_LayoutElement", // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
        cUseExistingTemplate: -1
    };


})();