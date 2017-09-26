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

    /**
     * TODO - unclear if still in use
     * @param {object} sxc 
     * @param {boolean} state 
     * @returns {promise} 
     */
    // 2017-09-02 2dm removed, deprecated, it's not stored on the server any more
    //cbm.setTemplateChooserState = function(sxc, state) {
    //    return sxc.webApi.get({
    //        url: "view/module/SetTemplateChooserState",
    //        params: { state: state }
    //    });
    //};

    /**
     * Save the template configuration for this instance
     * @param {object} sxc 
     * @param {int} templateId 
     * @param {boolean} [forceCreateContentGroup]
     * @returns {promise} 
     */
    cbm.saveTemplate = function(sxc, templateId, forceCreateContentGroup) {
        return sxc.webApi.get({
            url: "view/module/savetemplateid",
            params: {
                templateId: templateId,
                forceCreateContentGroup: forceCreateContentGroup,
                newTemplateChooserState: false
            }
        });
    };

    /**
     * Retrieve the preview from the web-api
     * @param {object} sxc 
     * @param {int} templateId 
     * @returns {promise} promise with the html in the result
     */
    cbm.getPreviewWithTemplate = function(sxc, templateId) {
        var ec = sxc.manage._editContext;
        templateId = templateId || -1; // fallback, meaning use saved ID
        return sxc.webApi.get({
            url: "view/module/rendertemplate",
            params: {
                templateId: templateId,
                lang: ec.Language.Current,
                cbisentity: ec.ContentBlock.IsEntity,
                cbid: ec.ContentBlock.Id,
                originalparameters: JSON.stringify(ec.Environment.parameters)
            },
            dataType: "html"
        });
    };
    //#endregion


})();