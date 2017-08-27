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
        //sxc: sxc,
        templateId: editContext.ContentGroup.TemplateId,
        undoTemplateId: editContext.ContentGroup.TemplateId,
        contentTypeId: ctid,
        undoContentTypeId: ctid,
        buttonsAreLoaded: true,

        // ajax update/replace the content of the content-block
        replace: function(newContent, justPreview) { cbm.replace(sxc, newContent, justPreview); },

        //2017-08-27 todo 2dm seems unused, but should be used for the preview...
        //replacePreview: function (newContent) { cb.replace(newContent, true); },

        // this one assumes a replace / change has already happened, but now must be finalized...
        // note: have a deep dependency on the angular-ui, must change
        reloadAndReInitialize: function(forceAjax, preview) {return cbm.reloadAndReInitialize(sxc, forceAjax, preview);},

        reload: function (templateId) { return cbm.reload(sxc, templateId); },

        // this shows a message that there is no ajax-preview for something
        // note: also used with deep dependency from angular-ui
        reloadNoLivePreview: function (msg) {
            cb.replace(msg);
            return $.when();
        },

        //_getAndReload: function(url, params) {
        //    return sxc.webApi.get({
        //            url: url,
        //            params: params
        //        }).then(function() { cbm.reloadAndReInitialize(sxc); });
        //},

        //#region simple item commands like publish, remove, add, re-order
        // set a content-item in this block to published, then reload
        publish: function (part, sortOrder) { return cbm.getAndReload(sxc, "view/module/publish", { part: part, sortOrder: sortOrder }); },

        publishId: function (entityId) { return cbm.getAndReload(sxc, "view/module/publish", { id: entityId }); },

        // remove an item from a list, then reload
        removeFromList: function (sortOrder) { return cbm.getAndReload(sxc, "view/module/removefromlist", { sortOrder: sortOrder }); },

        // change the order of an item in a list, then reload
        changeOrder: function (initOrder, newOrder) { return cbm.getAndReload(sxc, "view/module/changeorder", { sortOrder: initOrder, destinationSortOrder: newOrder }); },

        // add an item to the list at this position
        addItem: function (sortOrder) { return cbm.getAndReload(sxc, "view/module/additem", { sortOrder: sortOrder }); },

        // Cancel and reset back to original state
        // note: is accessed from the angular-ui
        _cancelTemplateChange: function () {
            cb.templateId = cb.undoTemplateId;
            cb.contentTypeId = cb.undoContentTypeId;

            // dialog...
            // todo: ugly kind of callback, this only works, because this method is called from inside this dialog, so it exist at that time
            sxc.manage.dialog.justHide();
            //cb._setTemplateChooserState(false)
            cbm.setTemplateChooserState(sxc, false)
                .then(function () { cbm.reloadAndReInitialize(sxc); });
        },

        // prepare the instance so content can be added (requires that the content-group has been created)
        prepareToAddContent: function () { return cb.persistTemplate(true, false); },

        // persist the template state - needed if the template was more in preview than really changed
        persistTemplate: function (forceCreate, selectorVisibility) { return cbm.persistTemplate(sxc, forceCreate, selectorVisibility); }
        
    };


    return cb;
};

})();