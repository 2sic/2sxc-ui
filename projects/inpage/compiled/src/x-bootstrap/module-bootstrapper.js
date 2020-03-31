"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../manage/api");
var build_toolbars_1 = require("../toolbar/build-toolbars");
var sxc_1 = require("./sxc");
var log_1 = require("../logging/log");
var log_utils_1 = require("../logging/log-utils");
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
var QuickEditState = require("../quick-dialog/state");
var window_in_page_1 = require("../interfaces/window-in-page");
var DebugConfig_1 = require("../DebugConfig");
var tag_toolbar_1 = require("../toolbar/tag-toolbar");
/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
var initializedInstances = [];
var openedTemplatePickerOnce = false;
var diagCancelStateOnStart = QuickEditState.cancelled.get();
$(document).ready(function () {
    // reset cancelled state after one reload
    if (diagCancelStateOnStart)
        QuickEditState.cancelled.remove();
    // initialize all modules
    initAllInstances(true);
    // start observing the body for configured mutations
    watchDomChanges();
});
/**
 * Scan all instances and initialize them
 * @param isFirstRun should be true only on the very initial call
 */
function initAllInstances(isFirstRun) {
    window_in_page_1.windowInPage.$2sxc.stats.watchDomChanges++;
    $('div[data-edit-context]').each(function () { initInstance(this, isFirstRun); });
    if (isFirstRun)
        tryShowTemplatePicker();
}
/**
 * create an observer instance and start observing
 */
function watchDomChanges() {
    var observer = new MutationObserver(function () { return initAllInstances(false); });
    observer.observe(document.body, { attributes: false, childList: true, subtree: true });
}
/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker() {
    var sxc = undefined;
    // first check if we should show one according to the state-settings
    var openDialogId = QuickEditState.cbId.get();
    if (openDialogId) {
        // must check if it's on this page, as it could be from another page
        var found = $("[data-cb-id=\"" + openDialogId + "\"]");
        if (found.length)
            sxc = window_in_page_1.windowInPage.$2sxc(openDialogId);
    }
    if (!sxc) {
        var uninitializedModules = $('.sc-uninitialized');
        if (diagCancelStateOnStart || openedTemplatePickerOnce)
            return false;
        // already showing a dialog
        if (quick_dialog_1.quickDialog.isVisible())
            return false;
        // not exactly one uninitialized module
        if (uninitializedModules.length !== 1)
            return false;
        // show the template picker of this module
        var module_1 = uninitializedModules.parent('div[data-edit-context]')[0];
        sxc = sxc_1.getSxcInstance(module_1);
    }
    if (sxc) {
        sxc.manage.run('layout');
        openedTemplatePickerOnce = true;
    }
    return true;
}
function initInstance(module, isFirstRun) {
    // check if module is already in the list of initialized modules
    if (initializedInstances.find(function (m) { return m === module; }))
        return;
    // add to modules-list first, in case we run into recursions
    initializedInstances.push(module);
    var sxc = sxc_1.getSxcInstance(module);
    // check if the sxc must be re-created. This is necessary when modules are dynamically changed
    // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
    if (!isFirstRun)
        sxc = sxc.recreate(true);
    // check if we must show the glasses
    // this must always run because it can be added ajax-style
    var wasEmpty = showGlassesButtonIfUninitialized(sxc);
    // Remove orphan tag-toolbars
    if (!isFirstRun)
        tag_toolbar_1.CleanupTagToolbars();
    if (isFirstRun || !wasEmpty) {
        // use a logger for each iteration
        var log = new log_1.Log('Bts.Module');
        build_toolbars_1.buildToolbars(log, module);
        if (DebugConfig_1.DebugConfig.bootstrap.initInstance)
            log_utils_1.LogUtils.logDump(log);
    }
    ;
}
function showGlassesButtonIfUninitialized(sxci) {
    // already initialized
    if (isInitialized(sxci))
        return false;
    // already has a glasses button
    var tag = $(api_1.getTag(sxci));
    if (tag.find('.sc-uninitialized').length !== 0)
        return false;
    // note: title is added on mouseover, as the translation isn't ready at page-load
    var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">'
        + '<div class="icon-sxc-glasses"></div>'
        + '</div>');
    btn.on('click', function () { return sxci.manage.run('layout'); });
    tag.append(btn);
    return true;
}
function isInitialized(sxci) {
    var cg = sxci && sxci.manage && sxci.manage._editContext && sxci.manage._editContext.ContentGroup;
    return (cg && cg.TemplateId !== 0);
}
//# sourceMappingURL=module-bootstrapper.js.map