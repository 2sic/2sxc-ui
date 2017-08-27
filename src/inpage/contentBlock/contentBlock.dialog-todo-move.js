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

    cbm.dialogToggle = function (sxc) {
        // check if the dialog already exists, if yes, use that
        // it can already exist as part of the manage-object, 
        // ...or if the manage object was reset, we must find it in the DOM

        var diag = sxc.manage.dialog;
        if (!diag) {
            // todo: look for it in the dom
        }
        if (!diag) {
            // still not found, create it
            diag = sxc.manage.dialog = sxc.manage.run("dash-view"); // not ideal, must improve
        } else {
            diag.toggle();
        }

        var isVisible = diag.isVisible();
        if (sxc.manage._editContext.ContentBlock.ShowTemplatePicker === isVisible) return;

        // 2017-06-01 change to not send to server, as not used any more
        //cb._setTemplateChooserState(isVisible)
        cbm.setTemplateChooserState(sxc, isVisible)
            .then(function () {
                sxc.manage._editContext.ContentBlock.ShowTemplatePicker = isVisible;
            });
    };
    //#endregion


    
})();