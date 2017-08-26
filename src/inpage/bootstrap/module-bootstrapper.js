// module & toolbar bootstrapping (initialize all toolbars after loading page)
// this will run onReady...
$(function () {
    var initializedModules = [];

    initAllModules(true);
    document.body.addEventListener('DOMSubtreeModified', initAllModules, false);
    
    function initAllModules(isFirstRun) {
        $("div[data-edit-context]").each(function () { initModule(this, isFirstRun); });
    }

    function initModule(module, isFirstRun) {
        // check if module is already in the list of initialized modules
        if (initializedModules.find(function(m) {
            return m === module;
        })) return false;

        // add to modules-list
        initializedModules.push(module);

        var sxc = $2sxc(module);

        // note: this can't work - just re-finding the tag will cause many side-effects
        // the tag might have changed
        //ctl.manage.reloadContentBlockTag();
        var uninitialized = showGlassesButtonIfUninitialized(sxc);
        //var uninitialized = ctl.manage._showGlassesButtonIfUninitialized();

        if (isFirstRun && !uninitialized) $2sxc._toolbarManager.generateHtml(module);

        return true;
    }

    
    function showGlassesButtonIfUninitialized (sxc) {
        // already initialized
        if (sxc.manage.contentBlock.templateId !== 0) return false;

        // already has a glasses button
        if ($(sxc.manage._tag).find(".sc-uninitialized").length !== 0) return false;

        // note: title is added on mouseover, as the translation isn't ready at page-load
        var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');
        btn.on("click", function () {
            sxc.manage.run("layout");
        });

        $(sxc.manage._tag).append(btn);
        return true;
    }
});