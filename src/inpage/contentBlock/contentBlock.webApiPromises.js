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

    /*
    ToDo: make the code more readable:
    return Object.assign(cbm, {
        getAndReload: getAndReload,
        setTemplateChooserState: setTemplateChooserState,
        saveTemplate: saveTemplate,
        getPreviewWithTemplate: getPreviewWithTemplate,
    })*/

    //#region functions working only with what they are given
    // 2017-08-27 2dm: I'm working on cleaning up this code, and an important part 
    // is to have code which doesn't use old state (like object-properties initialized earlier)
    // extracting these methods is part of the work
    cbm.getAndReload = function (sxc, url, params) {
        return sxc.webApi.get({
            url: url,
            params: params
        }).then(function () { cbm.reloadAndReInitialize(sxc); });
    };

    cbm.setTemplateChooserState = function (sxc, state) {
        return sxc.webApi.get({
            url: 'view/module/SetTemplateChooserState',
            params: { state: state }
        });
    };

    cbm.saveTemplate = function (sxc, templateId, forceCreateContentGroup, newTemplateChooserState) {
        return sxc.webApi.get({
            url: 'view/module/savetemplateid',
            params: {
                templateId: templateId,
                forceCreateContentGroup: forceCreateContentGroup,
                newTemplateChooserState: newTemplateChooserState
            }
        });
    };

    cbm.getPreviewWithTemplate = function (sxc, templateId) {
        var ec = sxc.manage._editContext;
        return sxc.webApi.get({
            url: 'view/module/rendertemplate',
            params: {
                templateId: templateId,
                lang: ec.Language.Current,
                cbisentity: ec.ContentBlock.IsEntity,
                cbid: ec.ContentBlock.Id,
                originalparameters: JSON.stringify(ec.Environment.parameters)
            },
            dataType: 'html'
        });
    };
    //#endregion
})();