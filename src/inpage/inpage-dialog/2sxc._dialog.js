// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._dialog = { create: Dialog };

    var RESIZE_INTERVAL = 200;

    function Dialog (sxc, wrapperTag, url, closeCallback) {
        var template =
            "<div class=\"inpage-frame-wrapper\">"
            + "<div class=\"inpage-frame\"><iframe width='100%' height='100px' src='" + url + "'></iframe></div>"
            + "<div class=\"backdrop\"></div>"
            + "</div>",
            container = $(template),
            iframe = container.find('iframe')[0],
            backdrop = container.find('.backdrop'),
            resizeInterval;

        container.on('load', loadEventListener);
        backdrop.on('click', function () {
            toggle(false);
        })
        $(wrapperTag).before(container);

        /**
         * Assign properties to the iframe for later use.
         */
        return Object.assign(iframe, {
            closeCallback: closeCallback,
            sxc: sxc,
            destroy: function () {
                window.clearInterval(resizeInterval);
                iframe.remove();
            },
            getManageInfo: getManageInfo,
            getAdditionalDashboardConfig: getAdditionalDashboardConfig,
            getCommands: getCommands,
            syncHeight: syncHeight,
            toggle: function () {
                return toggle();
            },
            justHide: function () {
                return toggle(false);
            },
            isVisible: function () {
                return !container.hasClass('hidden');
            }
        });

        function toggle(show) {
            if (show == undefined) return container.toggleClass('hidden');
            return container.toggleClass('hidden', !show);
        }

        function loadEventListener() {
            syncHeight();
            resizeInterval = window.setInterval(iframe.syncHeight, RESIZE_INTERVAL);
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

        function syncHeight() {
            var height = iframe.contentDocument.body.offsetHeight;
            if (iframe.previousHeight === height) return;
            window.diagBox = iframe;
            iframe.height = height + 'px';
            iframe.previousHeight = height;
        }
    };
})();