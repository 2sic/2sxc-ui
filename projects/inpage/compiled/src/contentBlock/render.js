"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = require("../interfaces/window-in-page");
var api_1 = require("../manage/api");
var start_1 = require("../quick-edit/start");
var build_toolbars_1 = require("../toolbar/build-toolbars");
var main_content_block_1 = require("./main-content-block");
var web_api_promises_1 = require("./web-api-promises");
/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {ContextOfButton} context
     * @param {string} newContent
     * @returns {} nothing
     */
    Renderer.prototype.showMessage = function (context, newContent) {
        $(api_1.getTag(context.sxc)).html(newContent);
    };
    /**
     * this one assumes a replace / change has already happened, but now must be finalized...
     * @param {ContextOfButton} context
     * @param {boolean} forceAjax
     * @param {boolean} preview
     */
    Renderer.prototype.reloadAndReInitialize = function (context, forceAjax, preview) {
        // if ajax is not supported, we must reload the whole page
        if (!forceAjax && !context.app.supportsAjax) {
            window_in_page_1.windowInPage.location.reload();
            return Promise.resolve();
        }
        return this.ajaxLoad(context, main_content_block_1.MainContentBlock.cUseExistingTemplate, preview)
            .then(function (result) {
            // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
            if (window_in_page_1.windowInPage.dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
                try {
                    window_in_page_1.windowInPage.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                }
                catch (e) {
                    // ignore
                }
            }
            // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
            // must check for side-effects, which would need the manager to re-build the configuration
            // 2018-11-03 2dm disabled completely for now
            // quickDialog.hide();
            return result;
        }).catch(function (error) { return console.log('Error in reloadAndReInitialize', error); });
    };
    /**
     * ajax-call, then replace
     * @param {ContextOfButton} context
     * @param {number} alternateTemplateId
     * @param {boolean} justPreview
     */
    Renderer.prototype.ajaxLoad = function (context, alternateTemplateId, justPreview) {
        var _this = this;
        return web_api_promises_1.getPreviewWithTemplate(context, alternateTemplateId)
            .then(function (result) {
            _this.replaceContentBlock(context, result, justPreview);
        })
            .then(function () {
            start_1.reset();
        }); // reset quick-edit, because the config could have changed
    };
    /**
     * ajax update/replace the content of the content-block
     * optionally also initialize the toolbar (if not just preview)
     * @param {ContextOfButton} context
     * @param {string} newContent
     * @param {boolean} justPreview
     */
    Renderer.prototype.replaceContentBlock = function (context, newContent, justPreview) {
        try {
            var newDom = $(newContent);
            // Must disable toolbar before we attach to DOM
            if (justPreview)
                build_toolbars_1.disable(newDom);
            $(api_1.getTag(context.sxc)).replaceWith(newDom);
            // reset the cache, so the sxc-object is refreshed
            context.sxc.recreate(true);
        }
        catch (e) {
            console.log('Error while rendering template:', e);
        }
    };
    return Renderer;
}());
exports.renderer = new Renderer();
//# sourceMappingURL=render.js.map