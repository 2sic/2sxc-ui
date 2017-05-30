// Toolbar bootstrapping (initialize all toolbars after loading page)
$(function () {
    var modules = [];
    
    // Prevent propagation of the click (if menu was clicked)
    $(".sc-menu").click(function (e) {
        e.stopPropagation();
    });
    
    setInterval(function () {
        $("div[data-edit-context]").each(function () {
            var newModule = this;
            return modules.find(function (m) {
                return m[0] === newModule[0];
            }) ? undefined : processToolbar(newModule);
        })
    }, 1000);
    
    function processToolbar(module) {
        if ($(module).parents('.DnnModule.floating').length > 0) return false;
        modules.push(module);
        var ctl = $2sxc(module);
        if (ctl.manage) ctl.manage._toolbar._processToolbars(module);
    }
    
    // this will add a css-class to auto-show all toolbars (or remove it again)
    function toggleAllToolbars() {
        $(document.body).toggleClass("sc-tb-show-all");
    }
    
    // start shake-event monitoring, which will then generate a window-event
    var myShakeEvent = new Shake({ callback: toggleAllToolbars });
    myShakeEvent.start();

});