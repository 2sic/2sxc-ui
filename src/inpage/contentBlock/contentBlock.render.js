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

    var cbm = $2sxc._contentBlock;

    // ajax update/replace the content of the content-block
    cbm.replace = function (sxc, newContent, justPreview) {
        var cb = sxc.manage.contentBlock;
        try {
            var newStuff = $(newContent);
            // don't do this yet, too many side-effects
            //if (justPreview) {    
            //    newStuff.attr("data-cb-id", "preview" + newStuff.attr("data-cb-id"));
            //    newStuff.Attr("data-cb-preview", true);
            //}
            // todo: not nice dependency, manipulating the manage object, must find a better way
            $(sxc.manage._tag).replaceWith(newStuff);
            cb.buttonsAreLoaded = false;
            //$2sxc._toolbarManager.buildToolbars(newStuff); // init it...
        } catch (e) {
            console.log("Error while rendering template:");
            console.log(e);
        }
        return sxc.recreate();
    };

    cbm.reload = function (sxc, templateId) {
        var manage = sxc.manage,
            cb = manage.contentBlock;
        // if nothing specified, use stored id
        if (!templateId) templateId = cb.templateId;

        // if nothing specified / stored, cancel
        if (!templateId)
            return $.Deferred().reject();

        // if reloading a non-content-app, re-load the page
        if (!manage._reloadWithAjax) // special code to force ajax-app-change
            return window.location.reload();

        // remember for future persist/save/undo
        cb.templateId = templateId;

        // ajax-call, then replace
        return cbm.getPreviewWithTemplate(sxc, templateId)
            .then(cb.replace)
            .then($quickE.reset); // reset quick-edit, because the config could have changed
    };

    // this one assumes a replace / change has already happened, but now must be finalized...
    cbm.reloadAndReInitialize = function (sxc, forceAjax, preview) {
        var manage = sxc.manage,
            cb = manage.contentBlock;

        // force ajax is set when a new app was chosen, and the new app supports ajax
        // this value can only be true, or not exist at all
        if (forceAjax) manage._reloadWithAjax = true;

        // necessary to show the original template again
        if (manage._reloadWithAjax) return (forceAjax
            ? cb.reload(-1) // -1 is important to it doesn't try to use the old templateid
            : cb.reload())
            .then(function () {
                if (manage._reloadWithAjax && manage.dialog) manage.dialog.destroy(); // only remove on force, which is an app-change
                if (preview) return;
                sxc = sxc.recreate(); // create new sxc-object
                $2sxc._toolbarManager.buildToolbars(null, sxc.id);// sub-optimal deep dependency
                //cb.sxc.manage._toolbar._processToolbars(); // sub-optimal deep dependency
                sxc.manage.contentBlock.buttonsAreLoaded = true;
            }, function () {
                // nothing to load
            });
        return window.location.reload();
    };

})();