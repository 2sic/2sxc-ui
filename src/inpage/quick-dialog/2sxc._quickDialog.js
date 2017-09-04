
// this is a dialog manager which is in charge of all
// quick-dialogs. 
// it always has a reference to the latest dialog created by any module instance

(function() {

    var resizeInterval = 200,
        scrollTopOffset = 80,
        resizeWatcher = null,
        diagShowClass = "dia-select";

    /**
     * dialog manager - the currently active dialog object
     */
    var diagManager = $2sxc._quickDialog = {
        current: null,

        /**
         * toggle visibility
         * @param {boolean} [show]
         * @returns {} 
         */
        toggle: function (show) {
            var cont = $(diagManager.getContainer());
            if (show === undefined)
                show = !cont.hasClass(diagShowClass);
            // show/hide visually
            cont.toggleClass(diagShowClass, show);
            diagManager.current = show ? diagManager.getIFrame() : null;
        },

        hide: function() {
            if (diagManager.current) diagManager.toggle(false);
        },

        /**
         * cancel the current dialog
         */
        cancel: function() {
            if (diagManager.current) diagManager.current.cancel(); // cancel & hide
        },

        /**
         * Remember dialog state across page-reload
         */
        persistDialog: function(sxc) {
            sessionStorage.setItem("dia-cbid", sxc.cbid);
        },

        /**
         * get the current container
         * @returns {element} html element of the div
         */
        getContainer: function() {
            var container = $(".inpage-frame-wrapper");
            return (container.length > 0) ? container : buildContainerAndIFrame();
        },

        /**
         * find the iframe which hosts the dialog
         * @param {html} [container]
         * @returns {html} iframe object
         */
        getIFrame: function(container) {
            if (!container) container = diagManager.getContainer();
            return container.find("iframe")[0];
        },

        /**
         * show / reset the current iframe to use new url and callback
         * @param {} sxc 
         * @param {} url 
         * @param {} closeCallback 
         * @param {} fullScreen 
         * @returns {} 
         */
        show: function(sxc, url, closeCallback, fullScreen) {
            setSize(fullScreen);
            var iFrame = diagManager.getIFrame();

            iFrame.rewire(sxc, closeCallback);
            iFrame.setAttribute("src", rewriteUrl(url));
            // if the window had already been loaded, re-init
            if (iFrame.contentWindow && iFrame.contentWindow.reboot)
                iFrame.contentWindow.reboot();

            // make sure it's visible'
            iFrame.toggle(true);
            return iFrame;
        }

    };


    /**
     * build the container in the dom w/iframe for re-use
     * @return {jquery} jquery dom-object 
     */
    function buildContainerAndIFrame() {
        var container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>');
        container.isFullscreen = false;
        var newIFrame = document.createElement("iframe");
        newIFrame = extendIFrameWithSxcState(newIFrame);
        container.find(".inpage-frame").html(newIFrame);
        $("body").append(container);

        watchForResize();
        return container;
    }

    function setSize(fullScreen) {
        var container = diagManager.getContainer();
        // set container height
        container.css("min-height", fullScreen ? "100%" : "230px");

        // remember...
        container.isFullscreen = fullScreen;
    }

    function extendIFrameWithSxcState(iFrame) {
        var hiddenSxc = null,
            cbApi = $2sxc._contentBlock,
            tagModule = null;

        /**
        * get the sxc-object of this iframe
        * @param {Object<any>} [newSxc]
        * @returns {Object<any>} refreshed sxc-object
        */
        function reSxc() {
            if (!hiddenSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
            return hiddenSxc.recreate();
        }

        var newFrm = Object.assign(iFrame, {
            closeCallback: null,
            rewire: function(sxc, callback) {
                hiddenSxc = sxc;
                tagModule = $( $($2sxc._manage.getTag(sxc)).parent().eq(0));
                newFrm.closeCallback = callback;
            },

            getManageInfo: function () { return reSxc().manage._dialogParameters; },
            getAdditionalDashboardConfig: function() { return reSxc().manage._quickDialogConfig; },

            persistDia: function() { diagManager.persistDialog(reSxc()); },

            scrollToTarget: function () {
                $("body").animate({ scrollTop: tagModule.offset().top - scrollTopOffset });
            },

            toggle: function (show) { diagManager.toggle(show); },

            cancel: function() {
                newFrm.toggle(false);
                //todo: only re-init if something was changed?
                return cbApi.reloadAndReInitialize(reSxc());
            },

            run: function(verb) { reSxc().manage.run(verb); },
            showMessage: function(message) {
                cbApi.showMessage(reSxc(), '<p class="no-live-preview-available">' + message + "</p>");
            },
            reloadAndReInit: function() { return cbApi.reloadAndReInitialize(reSxc(), true, true); },
            saveTemplate: function(templateId) { return cbApi.persistTemplate(reSxc(), templateId, false); },
            previewTemplate: function(templateId) { return cbApi.ajaxLoad(reSxc(), templateId, true); }

            });
        return newFrm;
    }
    

    /**
     * rewrite the url to fit the quick-dialog situation
     * optionally with a live-compiled version from ng-serve
     * @param {string} url 
     * @returns {string} new url
     */
    function rewriteUrl(url) {
        // change default url-schema from the primary angular-app to the quick-dialog
        url = url.replace("dist/dnn/ui.html?", "dist/ng/ui.html?");

        // special debug-code when running on local ng-serve
        // this is only activated if the developer manually sets a value in the localStorage
        try {
            var devMode = localStorage.getItem("devMode");
            if (devMode && ~~devMode)
                url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng/ui.html", "http://localhost:4200");
        } catch (e) { }
        return url;
    }

    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     * @returns {} 
     */
    function watchForResize(keepWatching) {
        if (keepWatching === false && resizeWatcher) {
            clearInterval(resizeWatcher);
            resizeWatcher = null;
            return null;
        }

        var cont = diagManager.getContainer();
        if (!resizeWatcher) // only add a timer if not already running
            resizeWatcher = setInterval(function () {
                try {
                    var frm = diagManager.getIFrame(cont);
                    if (!frm) return;
                    var height = frm.contentDocument.body.offsetHeight;
                    if (frm.previousHeight === height) return;
                    frm.style.minHeight = cont.css("min-height");
                    frm.style.height = height + "px";
                    frm.previousHeight = height;
                    if (cont.isFullscreen) {
                        frm.style.height = "100%";
                        frm.style.position = "absolute";
                    }
                } catch (e) {
                }
            },
                resizeInterval);
        return resizeWatcher;
    }

})();