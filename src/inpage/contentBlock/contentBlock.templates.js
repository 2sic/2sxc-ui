/* 
 * this is part of the content block manager
 */
(function () {

    var cbm = $2sxc._contentBlock;

    /**
     * prepare the instance so content can be added
     * this ensure the content-group has been created, which is required to add content
     * @param {} sxc 
     * @returns {} 
     */
    cbm.prepareToAddContent = function(sxc) {
        return cbm.persistTemplate(sxc, null, true);
    };

    /**
     * Save / Store the current preview - and optionally ensure that it's final enough to add content-items
     * @param {} sxc 
     * @param {} forceCreate 
     * @returns {} 
     */
    cbm.persistTemplate = function (sxc, templateId, forceCreate) {
        var manage = sxc.manage,
            contentGroup = manage._editContext.ContentGroup,
            isPreview = $2sxc._toolbarManager.isDisabled(sxc),
            // Save only if the currently saved is not the same as the new
            groupExistsAndTemplateUnchanged = !!contentGroup.HasContent && !isPreview;

        templateId = templateId || manage._editContext.ContentGroup.TemplateId;

        var promiseToSetState = (groupExistsAndTemplateUnchanged)
            ? $.when(null) // all is ok, create empty promise to allow chaining the result
            : cbm.saveTemplate(sxc, templateId, forceCreate)
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
            $2sxc._dialogManager.hide();

            // if it didn't have content, then it only has now...
            if (!contentGroup.HasContent) contentGroup.HasContent = forceCreate;

            // only re-load on ajax, not on app as that was already re-loaded on the preview
            if (isPreview)      // necessary to show the original template again
                cbm.reloadAndReInitialize(sxc);
        });

        return promiseToCorrectUi;
    };

    
})();