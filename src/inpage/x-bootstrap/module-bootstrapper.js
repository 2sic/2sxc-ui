// module & toolbar bootstrapping (initialize all toolbars after loading page)
// this will run onReady...
$(function () {
    var initializedModules = [];
    var openedTemplatePickerOnce = false;
    var cancelledDialog = localStorage.getItem('cancelled-dialog');

    if (cancelledDialog) localStorage.removeItem('cancelled-dialog');

    initAllModules(true);

    // watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
    document.body.addEventListener("DOMSubtreeModified", function (event) {
        initAllModules(false);
    }, false);

    return; // avoid side-effects

    function initAllModules(isFirstRun) {
        $("div[data-edit-context]").each(function () {
            initModule(this, isFirstRun);
        });
        tryShowTemplatePicker();
    }

    /**
     * Show the template picker if
     * - template picker has not yet been opened
     * - dialog has not been cancelled
     * - only one uninitialized module on page
     * @returns
     */
    function tryShowTemplatePicker() {
        var uninitializedModules = $('.sc-uninitialized');

        if (cancelledDialog || openedTemplatePickerOnce) return false;

        // already showing a dialog
        if ($2sxc._quickDialog.current !== null) return false;

        // not exactly one uninitialized module
        if (uninitializedModules.length !== 1) return false;

        // show the template picker of this module
        var module = uninitializedModules.parent('div[data-edit-context]')[0];
        $2sxc(module).manage.run('layout');
        openedTemplatePickerOnce = true;
    }

    function initModule(module, isFirstRun) {

        // check if module is already in the list of initialized modules
        if (initializedModules.find(function (m) {
                return m === module;
            })) return false;
        
        // add to modules-list
        initializedModules.push(module);
        
        var sxc = $2sxc(module);
        
        // check if the sxc must be re-created. This is necessary when modules are dynamically changed
        // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
        if (!isFirstRun) sxc = sxc.recreate(true);
        
        // check if we must show the glasses
        // this must run even after first-run, because it can be added ajax-style
        var wasEmpty = showGlassesButtonIfUninitialized(sxc);
        
        if (isFirstRun || !wasEmpty) $2sxc._toolbarManager.buildToolbars(module);

        return true;
    }

    function showGlassesButtonIfUninitialized(sxc) {

        // already initialized
        if (sxc.manage._editContext.ContentGroup.TemplateId !== 0) return false;

        // already has a glasses button
        var tag = $($2sxc._manage.getTag(sxc));
        if (tag.find(".sc-uninitialized").length !== 0) return false;

        // note: title is added on mouseover, as the translation isn't ready at page-load
        var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');
        btn.on("click", function () {
            sxc.manage.run("layout");
        });

        tag.append(btn);
        return true;
    }
});