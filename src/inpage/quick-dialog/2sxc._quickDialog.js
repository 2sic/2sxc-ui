// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._quickDialog = Dialog;

    var cbApi = $2sxc._contentBlock,
        diagManager = $2sxc._dialogManager,
        isFullscreen = false,
        RESIZE_INTERVAL = 200,
        //SHOW_DELAY = 400,
        SCROLL_TOP_OFFSET = 80,
        activeDialog,
        activeWrapper,
        container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>'),
        inpageFrame = container.find(".inpage-frame");
    
    $("body").append(container);

    setInterval(function () {
        try {
            var iframe = inpageFrame.find("iframe")[0];
            if (!iframe) return;
            var height = iframe.contentDocument.body.offsetHeight;
            if (iframe.previousHeight === height) return;
            window.diagBox = iframe;
            iframe.style.minHeight = container.css("min-height");
            iframe.style.height = height + "px";
            iframe.previousHeight = height;
            if (isFullscreen) {
                iframe.style.height = "100%";
                iframe.style.position = "absolute";
            }
        } catch (e) { }
    }, RESIZE_INTERVAL);

    // ReSharper disable once InconsistentNaming
    function Dialog(sxc, wrapperTag, url, closeCallback, fullScreen) {
        var iframe, // frame inside the dialog (HTMLElement)
            // resizeInterval,
            wrapperParent = $(wrapperTag).parent().eq(0);

        isFullscreen = fullScreen;

        init();
       
        /**
         * build an iframe object, tell $2sxc that it's the current one, and
         * give it back all initialized to do work on this sxc-instance
         * Assign properties to the iframe for later use.
         */
        diagManager.current = Object.assign(iframe, {
            closeCallback: closeCallback,

            getManageInfo: getManageInfo,
            getAdditionalDashboardConfig: getAdditionalDashboardConfig,

            // 2dm seems unused
            //getCommands: getCommands,

            scrollToTarget: function () {
                $("body").animate({ scrollTop: $(activeWrapper).offset().top - SCROLL_TOP_OFFSET });
            },

            toggle: toggle,

            // seems unused...
            //isVisible: function () {
            //    return !container.hasClass("hidden");
            //},
            persistDia: persistDia, 

            cancel: function() {
                toggle(false);
                return cbApi.reloadAndReInitialize(sxc.recreate());
            },
            run: function(verb) { sxc.recreate().manage.run(verb); },
            showMessage: function (message) { cbApi.showMessage(sxc.recreate(), '<p class="no-live-preview-available">' + message + "</p>"); },
            reloadAndReInit: function () { return cbApi.reloadAndReInitialize(sxc.recreate(), true, true); },
            saveTemplate: function(templateId) { return cbApi.persistTemplate(sxc.recreate(), templateId, false); },
            previewTemplate: function (templateId) { return cbApi.ajaxLoad(sxc.recreate(), templateId, true); }
        });

        return diagManager.current;

        function init() {
            url = url.replace("dist/dnn/ui.html?", "dist/ng/ui.html?");

            // special debug-code when running on local ng-serve
            // this is only activated if the developer manually sets a value in the localStorage
            try {
                var devMode = localStorage.getItem("devMode");
                if (devMode && ~~devMode) url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng/ui.html", "http://localhost:4200");
            } catch (e) { }

            iframe = document.createElement("iframe");
            container.css("min-height", fullScreen ? "100%" : "230px");
            toggle(true);
        }

        /**
         * Remember dialog state across page-reload
         */
        function persistDia() {
            sessionStorage.setItem("dia-cbid", sxc.cbid);
        }

        // todo 2cb - this is totally messed up - the show-parameter does something different so doesn't work reliably
        // must review/discuss
        function toggle(show) {
            var action = show === undefined ? (activeDialog !== iframe) : show;

            if (action) {
                if (activeDialog !== iframe) {
                    if (activeDialog !== undefined) {
                        var dirty = false; // activeDialog.vm.isDirty();
                        // TODO: i18n
                        if (dirty && !window.confirm("Unsaved changes detected. Would you like to continue?")) return false;
                    }
                    iframe.setAttribute("src", url);
                    $(inpageFrame).html(iframe);
                    activeDialog = iframe;
                    activeWrapper = wrapperParent;
                }
            } else {
                activeDialog = undefined;
                activeWrapper = undefined;
            }

            container.toggleClass("dia-select", action);
        }

        function getManageInfo() {
            return sxc.manage._dialogParameters;
        }

        function getAdditionalDashboardConfig() {
            return sxc.manage._quickDialogConfig;
        }

        // 2dm seems unused
        //function getCommands() {
        //    return iframe.vm;
        //}
    }
})();