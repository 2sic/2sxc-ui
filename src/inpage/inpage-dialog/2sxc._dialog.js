// this is a dialog handler which will create in-page dialogs for 
// - the template / view picker
// - the getting-started / install-templates dialog
// 
// known issues
// - we never got around to making the height adjust automatically
(function () {
    $2sxc._dialog = Dialog;

    var RESIZE_INTERVAL = 200,
        SHOW_DELAY = 400,
        activeDialog;

    $('body').on('mouseover', '.inpage-frame-wrapper', function () {
        $(this).parents('.DNNModuleContent').eq(0).toggleClass('dia-mouseover', true);
    });

    $('body').on('mouseout', '.inpage-frame-wrapper', function () {
        $(this).parents('.DNNModuleContent').eq(0).toggleClass('dia-mouseover', false);
    });

    function Dialog(sxc, wrapperTag, url, closeCallback) {
        var container, // the dialog (jQuery object)
            iframe, // frame inside the dialog (HTMLElement)
            resizeInterval;

        init();

        $(wrapperTag).before(container);

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

        function init() {
            var res = $(wrapperTag).parent().find('.inpage-frame-wrapper');

            // the dialog has already been initialized
            if (res.length > 0) {
                container = res.eq(0);
                iframe = container.find('iframe')[0];
                load();
                return res.eq(0);
            }
            
            // REMOVE THIS
            url = url
                .replace('/dist/dnn/ui.html', '/dist/ng/')
                .replace('#', '&');
            
            container = $('<div class="inpage-frame-wrapper">'
                + '<div class="inpage-frame"><iframe width="100%" height="100px" src="' + url + '"></iframe></div>'
                + '</div>');
            iframe = container.find('iframe')[0];

            $(iframe).on('load', load);

            function load() {
                var interval;
                if (activeDialog == iframe) {
                    console.log('this dialog is already open');
                    return false;
                }
                syncHeight();
                interval = setInterval(function () {
                    try {
                        syncHeight();
                    } catch (e) {
                        clearInterval(interval);
                    }
                }, RESIZE_INTERVAL);
                setTimeout(function () {
                    toggle(true);
                }, SHOW_DELAY);
            }
        }

        function toggle(show) {
            var moduleContent = container.parents('.DNNModuleContent').eq(0),
                action = show === undefined ? !moduleContent.hasClass('dia-select') : show,
                dirty;

            if (action) {
                if (activeDialog !== undefined) {
                    if (activeDialog == iframe) return false;
                    dirty = false; // activeDialog.vm.isDirty();
                    // TODO: i18n
                    if (dirty && !window.confirm('Unsaved changes detected. Would you like to continue?')) return false;
                    $(activeDialog).eq(0).parents('.DNNModuleContent').eq(0).toggleClass('dia-select', false);
                }
                activeDialog = iframe;
            } else {
                activeDialog = undefined;
            }
            
            moduleContent.toggleClass('dia-select', action);
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
    }
})();