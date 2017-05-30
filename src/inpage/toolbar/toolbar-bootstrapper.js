// toolbar bootstrapping (initialize all toolbars after loading page)
$(function () {
    var modules = [];

    // prevent propagation of the click (if menu was clicked)
    $(".sc-menu").click(function (e) {
        e.stopPropagation();
    });

    initModules(true);
    setInterval(initModules, 1000);

    function initModules(onPageLoad) {
        $("div[data-edit-context]").each(function () {
            var newModule = this;

            // check if the module has already been initialized
            if (modules.find(function (m) {
                return m === newModule;
            })) return;
            
            if (!onPageLoad) {

                // wait one second, because DNN does not set the class 'floating' instantly
                setTimeout(function () {
                    if ($(newModule).parents('.DnnModule.floating').length > 0) return false;
                    console.log("processed toolbar with delay");
                    processToolbar(newModule);
                }, 1000);
            } else {
                console.log("processed toolbar without delay");
                processToolbar(newModule);
            }
        });
    }

    function processToolbar(module) {
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