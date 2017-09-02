// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._quickDialog = Dialog;

    // dialog manager - the currently active dialog object
    var diagManager = $2sxc._dialogManager = {
        current: null,
        hide: function() { if (diagManager.current) diagManager.current.justHide(); }
    };

    var isFullscreen = false,
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
            //sxc: sxc,
            destroy: function () {
                // TODO: evaluate what to do here
            },
            getManageInfo: getManageInfo,
            getAdditionalDashboardConfig: getAdditionalDashboardConfig,
            getCommands: getCommands,
            scrollToTarget: function () {
                $("body").animate({ scrollTop: $(activeWrapper).offset().top - SCROLL_TOP_OFFSET });
            },
            toggle: function () {
                return toggle();
            },
            justHide: function () {
                return toggle(false);
            },
            isVisible: function () {
                return !container.hasClass("hidden");
            },
            persistDia: persistDia, 

            // 2017-09-02 2dm - moving all api calls out of angular
            // todo: once this works, go to stateless calls
            run: function(verb) { 
                 sxc.recreate().manage.run(verb);
            },
            cancelTemplateChange: function() {
                sxc.recreate().manage.contentBlock._cancelTemplateChange();
            },
            showMessage: function (message) {
                $2sxc._contentBlock.message(sxc.recreate(), '<p class="no-live-preview-available">' + message + "</p>");
            },
            reloadAndReInit:function() {
                return sxc.recreate().manage.contentBlock.reloadAndReInitialize(true, true);
            },
            saveTemplate: function(templateId) {
                sxc = sxc.recreate(); 
                sxc.manage.contentBlock.templateId = templateId; // temporary, must refactor
                return $2sxc._contentBlock.persistTemplate(sxc, false, false);
            },
            previewTemplate: function(templateId) {
                return sxc.recreate().manage.contentBlock.reload(templateId);
            }
        });

        return diagManager.current;

        function init() {
            url = url.replace("dist/dnn/ui.html?", "dist/ng/ui.html?");

            try {
                var devMode = localStorage.getItem("devMode");
                if (devMode && ~~devMode) url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng/ui.html", "http://localhost:4200");
            } catch (e) { }

            iframe = document.createElement("iframe");
            container.css("min-height", fullScreen ? "100%" : "230px");
            toggle(true);
        }

        function persistDia() {
            sessionStorage.setItem("dia-cbid", sxc.cbid);
        }

        function toggle(show) {
            var action = show === undefined ? (activeDialog !== iframe) : show,
                dirty;

            if (action) {
                if (activeDialog === iframe) return false;
                if (activeDialog !== undefined) {
                    dirty = false; // activeDialog.vm.isDirty();
                    // TODO: i18n
                    if (dirty && !window.confirm("Unsaved changes detected. Would you like to continue?")) return false;
                }
                iframe.setAttribute("src", url);
                $(inpageFrame).html(iframe);
                activeDialog = iframe;
                activeWrapper = wrapperParent;
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

        function getCommands() {
            return iframe.vm;
        }
    }
})();