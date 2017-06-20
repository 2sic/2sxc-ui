// toolbar bootstrapping (initialize all toolbars after loading page)
$(function () {
    var modules = [];

    // prevent propagation of the click (if menu was clicked)
    $(".sc-menu").click(function (e) {
        e.stopPropagation();
    });

    initModules(true);
    document.body.addEventListener('DOMSubtreeModified', initModules, false);
    
    function initModules(initial) {
        $("div[data-edit-context]").each(function () {
            processToolbar(this, initial);
        });
    }
    
    function processToolbar(module, initial) {
        var ctl;
        
        // check if module is already initialized
        if (modules.find(function (m) {
            return m === module;
        })) return false;

        // new element or moved
        modules.push(module);
        ctl = $2sxc(module);
        
        // the tag might have changed
        ctl.manage.reloadContentBlockTag();
        ctl.manage.initGlassesButton();

        if (initial) ctl.manage._toolbar._processToolbars(module);
    }

    // this will add a css-class to auto-show all toolbars (or remove it again)
    function toggleAllToolbars() {
        $(document.body).toggleClass("sc-tb-show-all");
    }

    // start shake-event monitoring, which will then generate a window-event
    var myShakeEvent = new Shake({ callback: toggleAllToolbars });
    myShakeEvent.start();
});