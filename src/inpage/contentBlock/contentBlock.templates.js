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

    //#region functions working only with what they are given
    // 2017-08-27 2dm: I'm working on cleaning up this code, and an important part 
    // is to have code which doesn't use old state (like object-properties initialized earlier)
    // extracting these methods is part of the work


    // prepare the instance so content can be added (requires that the content-group has been created)
    cbm.prepareToAddContent = function(sxc) { return cbm.persistTemplate(sxc, true, false); };


    cbm.persistTemplate = function (sxc, forceCreate, selectorVisibility) {
        var manage = sxc.manage,
            cb = manage.contentBlock,
            ec = manage._editContext,
            // Save only if the currently saved is not the same as the new
            groupExistsAndTemplateUnchanged = !!ec.ContentGroup.HasContent && (cb.undoTemplateId === cb.templateId),
            promiseToSetState;

        if (groupExistsAndTemplateUnchanged)
            promiseToSetState = (ec.ContentBlock.ShowTemplatePicker)//.minfo.templateChooserVisible)
                ? cbm.setTemplateChooserState(sxc, false) // hide in case it was visible
                : $.when(null); // all is ok, create empty promise to allow chaining the result
        else
            promiseToSetState = cbm.saveTemplate(sxc, cb.templateId, forceCreate, selectorVisibility)
                .then(function (data, textStatus, xhr) {
                    if (xhr.status !== 200) { // only continue if ok
                        alert("error - result not ok, was not able to create ContentGroup");
                        return;
                    }
                    var newGuid = data;
                    if (!newGuid) return;
                    newGuid = newGuid.replace(/[\",\']/g, ""); // fixes a special case where the guid is given with quotes (dependes on version of angularjs) issue #532
                    if (console) console.log("created content group {" + newGuid + "}");

                    sxc.manage._updateContentGroupGuid(newGuid);
                });

        // todo: should move things like remembering undo etc. back into the contentBlock state manager
        // or just reset it, so it picks up the right values again ?
        var promiseToCorrectUi = promiseToSetState.then(function () {
            cb.undoTemplateId = cb.templateId; // remember for future undo
            cb.undoContentTypeId = cb.contentTypeId; // remember ...

            ec.ContentBlock.ShowTemplatePicker = false; // cb.minfo.templateChooserVisible = false;

            $2sxc._dialogManager.hide();
            //if (manage.dialog) manage.dialog.justHide();

            if (!ec.ContentGroup.HasContent) // if it didn't have content, then it only has now...
                ec.ContentGroup.HasContent = forceCreate;

            // only re-load on content, not on app as that was already re-loaded on the preview
            if (!cb.buttonsAreLoaded || (!groupExistsAndTemplateUnchanged && manage._reloadWithAjax))      // necessary to show the original template again
                cbm.reloadAndReInitialize(sxc);
        });

        return promiseToCorrectUi;
    };




    //#endregion


    
})();