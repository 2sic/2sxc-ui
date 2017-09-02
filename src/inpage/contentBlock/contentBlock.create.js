// Todo: Refactoring
// Todo: then find out where these commands are used, and try to replace with the stateless version
// Todo: move entire dialog-state out of the content-block into manage/quick-dialog
// Todo: then re-enable preview without toolbars if possible

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
    // the content-block-manager contains many stateless methods to do things with content-blocks
    var cbm = $2sxc._contentBlock;

$2sxc._contentBlock.createCbInstance = function (sxc, manage) {
    //#region loads of old stuff, should be cleaned, mostly just copied from the angulare code

    var cViewWithoutContent = "_LayoutElement"; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
    var editContext = manage._editContext;
    var ctid = (editContext.ContentGroup.ContentTypeName === "" && editContext.ContentGroup.TemplateId !== null)
        ? cViewWithoutContent // has template but no content, use placeholder
        : editContext.ContentGroup.ContentTypeName;

    //#endregion

    var cb = {
        templateId: editContext.ContentGroup.TemplateId,
        undoTemplateId: editContext.ContentGroup.TemplateId,
        contentTypeId: ctid,
        undoContentTypeId: ctid,
        buttonsAreLoaded: true,

        // ajax update/replace the content of the content-block
        // todo 2017-09-01 2dm temp - keep returned sxc, till we get this content-block to be stateless
        replace: function(newContent, justPreview) { sxc = cbm.replace(sxc, newContent, justPreview); },

        //2017-08-27 todo 2dm seems unused, but should be used for the preview...
        //replacePreview: function (newContent) { cb.replace(newContent, true); },

        // this one assumes a replace / change has already happened, but now must be finalized...
        // note: have a deep dependency on the angular-ui, must change
        reloadAndReInitialize: function(forceAjax, preview) {return cbm.reloadAndReInitialize(sxc, forceAjax, preview);},

        reload: function(templateId) { return cbm.reload(sxc, templateId); },

        // this shows a message that there is no ajax-preview for something
        // note: also used with deep dependency from angular-ui
        reloadNoLivePreview: function (msg) {
            cb.replace(msg);
            return $.when();
        },

        //#region simple item commands like publish, remove, add, re-order

        // Cancel and reset back to original state
        // note: is accessed from the angular-ui
        _cancelTemplateChange: function () {
            cb.templateId = cb.undoTemplateId;
            cb.contentTypeId = cb.undoContentTypeId;

            // dialog...
            // todo: ugly kind of callback, this only works, because this method is called from inside this dialog, so it exist at that time
            $2sxc._dialogManager.hide();
            //sxc.manage.dialog.justHide();
            //cb._setTemplateChooserState(false)
            cbm.setTemplateChooserState(sxc, false)
                .then(function () { cbm.reloadAndReInitialize(sxc); });
        },

        // persist the template state - needed if the template was more in preview than really changed
        //persistTemplate: function (forceCreate, selectorVisibility) { return cbm.persistTemplate(sxc, forceCreate, selectorVisibility); }
        
    };


    return cb;
};

})();