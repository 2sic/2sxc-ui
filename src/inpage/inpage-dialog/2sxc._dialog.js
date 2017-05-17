﻿// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._dialog = Dialog;

    var RESIZE_INTERVAL = 200,
        SHOW_DELAY = 400,
        activeDialog,
        container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>'),
        inpageFrame = container.find('.inpage-frame');

    $('body').append(container);

    $("body").on("mouseover", ".inpage-frame-wrapper", function () {
        $(this).toggleClass("dia-mouseover", true);
    });

    $("body").on("mouseout", ".inpage-frame-wrapper", function () {
        $(this).toggleClass("dia-mouseover", false);
    });

    setInterval(function () {
        try {
            var iframe = inpageFrame.find('iframe')[0], height;
            if (!iframe) return;
            height = iframe.contentDocument.body.offsetHeight + 10;
            if (iframe.previousHeight === height) return;
            window.diagBox = iframe;
            iframe.height = height + "px";
            iframe.previousHeight = height;
        } catch (e) {
        }
    }, RESIZE_INTERVAL);

    function Dialog(sxc, wrapperTag, url, closeCallback) {
        var iframe, // frame inside the dialog (HTMLElement)
            resizeInterval;

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
            toggle: function () {
                return toggle();
            },
            justHide: function () {
                return toggle(false);
            },
            isVisible: function () {
                return !container.hasClass("hidden");
            }
        });

        function init() {
            // REMOVE THIS
            /*url = url
               .replace('#', '&');*/
            url = url.replace("dist/dnn/ui.html?", "dist/ng/index.html?");

            try {
                var devMode = localStorage.getItem("devMode");
                if (devMode && ~~devMode)
                    url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng", "http://localhost:4200");
            } catch (e) { }

            iframe = document.createElement('iframe');
            toggle(true);
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
            } else {
                activeDialog = undefined;
            }

            container.toggleClass("dia-select", action);
        }

        function getManageInfo() {
            return sxc.manage._dialogParameters;
        }

        function getAdditionalDashboardConfig() {
            return sxc.manage._dashboardConfig;
        }

        function getCommands() {
            return iframe.vm;
        }
    }
})();