﻿// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._quickDialog = Dialog;

    var isFullscreen = false,
        RESIZE_INTERVAL = 200,
        SHOW_DELAY = 400,
        SCROLL_TOP_OFFSET = 80,
        activeDialog,
        activeWrapper,
        container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>'),
        inpageFrame = container.find('.inpage-frame');
    
    $('body').append(container);

    setInterval(function () {
        try {
            var iframe = inpageFrame.find('iframe')[0], height;
            if (!iframe) return;
            height = iframe.contentDocument.body.offsetHeight;
            if (iframe.previousHeight === height) return;
            window.diagBox = iframe;
            iframe.style.minHeight = container.css('min-height');
            iframe.style.height = height + "px";
            iframe.previousHeight = height;
            if (isFullscreen) {
                iframe.style.height = "100%";
                iframe.style.position = "absolute";
            }
        } catch (e) { }
    }, RESIZE_INTERVAL);

    function Dialog(sxc, wrapperTag, url, closeCallback, fullScreen) {
        var iframe, // frame inside the dialog (HTMLElement)
            resizeInterval,
            wrapperParent = $(wrapperTag).parent().eq(0);

        isFullscreen = fullScreen;

        init();
        
        /**
         * Assign properties to the iframe for later use.
         */
        return Object.assign(iframe, {
            closeCallback: closeCallback,
            sxc: sxc,
            destroy: function () {
                // TODO: evaluate what to do here
            },
            getManageInfo: getManageInfo,
            getAdditionalDashboardConfig: getAdditionalDashboardConfig,
            getCommands: getCommands,
            scrollToTarget: function () {
                $('body').animate({ scrollTop: $(activeWrapper).offset().top - SCROLL_TOP_OFFSET });
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
            persistDia: persistDia
        });

        function init() {
            url = url.replace("dist/dnn/ui.html?", "dist/ng/ui.html?");

            try {
                var devMode = localStorage.getItem("devMode");
                if (devMode && ~~devMode) url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng/ui.html", "http://localhost:4200");
            } catch (e) { }

            iframe = document.createElement('iframe');
            container.css('min-height', fullScreen ? '100%' : '230px');
            toggle(true);
        }

        function persistDia() {
            sessionStorage.setItem('dia-cbid', sxc.cbid);
        }

        function toggle(show) {
            var action = show === undefined ? (activeDialog != iframe) : show,
                dirty;

            if (action) {
                if (activeDialog == iframe) return false;
                if (activeDialog !== undefined) {
                    dirty = false; // activeDialog.vm.isDirty();
                    // TODO: i18n
                    if (dirty && !window.confirm("Unsaved changes detected. Would you like to continue?")) return false;
                }
                iframe.setAttribute('src', url);
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