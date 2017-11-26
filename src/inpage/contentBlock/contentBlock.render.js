/* 
 * this is the content block manager in the browser
 * 
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
(function () {
    var cbm = $2sxc._contentBlock;

    /**
     * ajax update/replace the content of the content-block
     * optionally also initialze the toolbar (if not just preview)
     * @param {Object<>} sxc 
     * @param {string} newContent 
     * @param {boolean} justPreview 
     * @returns {} 
     */
    cbm.replaceCb = function (sxc, newContent, justPreview) {
        try {
            var newStuff = $(newContent);

            // Must disable toolbar before we attach to DOM
            if (justPreview) $2sxc._toolbarManager.disable(newStuff);

            $($2sxc._manage.getTag(sxc)).replaceWith(newStuff);

            // reset the cache, so the sxc-object is refreshed
            sxc.recreate(true);
        } catch (e) {
            console.log("Error while rendering template:", e);
        }
    };

    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {object} sxc 
     * @param {string} newContent 
     * @returns {} - nothing
     */
    cbm.showMessage = function (sxc, newContent) {
        $($2sxc._manage.getTag(sxc)).html(newContent);
    };

    cbm.ajaxLoad = function (sxc, alternateTemplateId, justPreview) {
        // ajax-call, then replace
        return cbm.getPreviewWithTemplate(sxc, alternateTemplateId)
            .then(function (result) {
                return cbm.replaceCb(sxc, result, justPreview);
            })
            .then($quickE.reset); // reset quick-edit, because the config could have changed
    };

    // this one assumes a replace / change has already happened, but now must be finalized...
    cbm.reloadAndReInitialize = function (sxc, forceAjax, preview) {
        var manage = sxc.manage;

        // if ajax is not supported, we must reload the whole page
        if (!forceAjax && !manage._reloadWithAjax) return window.location.reload();

        return cbm.ajaxLoad(sxc, cbm.cUseExistingTemplate, !!preview)
            .then(function () {
                
                // tell Evoq that page has changed if it has changed (Ajax call)
                if (window.dnn_tabVersioningEnabled) // this only exists in evoq or on new DNNs with tabVersioning
                    try {
                        window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                    }
                    catch(e) {}

                // maybe check if already publish
                // compare to HTML module
                // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button

                // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
                // must check for side-effects, which would need the manager to re-build the configuration
                $2sxc._quickDialog.hide();
            });
    };

})();
