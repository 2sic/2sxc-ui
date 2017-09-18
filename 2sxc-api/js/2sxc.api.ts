// this is the 2sxc-javascript API
// 2sxc will include this automatically when a user has edit-rights
// a template developer will typically use this to use the data-api to read 2sxc-data from the server
// read more about this in the wiki: https://github.com/2sic/2sxc/wiki/JavaScript-%242sxc

declare const $;

// ReSharper disable InconsistentNaming
interface Window { $2sxc: SxcControllerWithInternals; }


(() => {
    if (window.$2sxc) return;   // prevent double execution

    var $2sxc = window.$2sxc = getInstance as any as SxcControllerWithInternals;
    
    function getInstance(id: number | HTMLElement, cbid?: number): ToSic.Sxc.SxcInstanceWithInternals  {

        // if it's a dom-element, use auto-find
        if (typeof id === "object") return autoFind(id);

        if (!cbid) cbid = id;           // if content-block is unknown, use id of module
        const cacheKey = id + ":" + cbid; // neutralize the id from old "34" format to the new "35:353" format

        // either get the cached controller from previous calls, or create a new one
        if ($2sxc._controllers[cacheKey]) return $2sxc._controllers[cacheKey];

        // also init the data-cache in case it's ever needed
        if (!$2sxc._data[cacheKey]) $2sxc._data[cacheKey] = {};

        return $2sxc._controllers[cacheKey] = new ToSic.Sxc.SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, $.ServicesFramework);
    };
    

    $2sxc._controllers = {} as any;
    $2sxc.sysinfo = {
        version: "09.05.00",
        description: "The 2sxc Controller object - read more about it on 2sxc.org"
    };

    $2sxc.beta = {};
    $2sxc._data = {};


    // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
    $2sxc.totalPopup = {
        open(url: string, callback: Function):void {
            // count parents to see how high the z-index needs to be
            let z = 10000010, p = window; // Needs at least 10000000 to be on top of the DNN9 bar
            while (p !== window.top && z < 10000100) {
                z++;
                p = p.parent;
            }

            const wrapper = document.createElement("div");
            wrapper.setAttribute("style", " top: 0;left: 0;width: 100%;height: 100%; position:fixed; z-index:" + z);
            document.body.appendChild(wrapper);

            const ifrm = document.createElement("iframe");
            ifrm.setAttribute("allowtransparency", "true");
            ifrm.setAttribute("style", "top: 0;left: 0;width: 100%;height: 100%;");
            ifrm.setAttribute("src", url);
            wrapper.appendChild(ifrm);
            document.body.className += " sxc-popup-open";
            $2sxc.totalPopup.frame = ifrm;
            $2sxc.totalPopup.callback = callback;
        },
        close(): void {
            if ($2sxc.totalPopup.frame) {
                document.body.className = document.body.className.replace("sxc-popup-open", "");
                const frm = $2sxc.totalPopup.frame;
                frm.parentNode.parentNode.removeChild(frm.parentNode);
                $2sxc.totalPopup.callback();
            }
        },
        closeThis():void {
            (window.parent as any).$2sxc.totalPopup.close();
        },
        frame: undefined,
        callback: undefined
    };

    $2sxc.urlParams = {
        get(name) {
            // warning: this method is duplicated in 2 places - keep them in sync. 
            // locations are eav and 2sxc4ng 
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            const searchRx = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
            let results = searchRx.exec(location.search),
                strResult:string;

            if (results === null) {
                const hashRx = new RegExp("[#&]" + name + "=([^&#]*)", "i");
                results = hashRx.exec(location.hash);
            }

            // if nothing found, try normal URL because DNN places parameters in /key/value notation
            if (results === null) {
                // Otherwise try parts of the URL
                const matches = window.location.pathname.match(new RegExp("/" + name + "/([^/]+)", "i"));

                // Check if we found anything, if we do find it, we must reverse the results so we get the "last" one in case there are multiple hits
                if (matches && matches.length > 1)
                    strResult = matches.reverse()[0];
            } else
                strResult = results[1];

            return strResult === null || strResult === undefined ? "" : decodeURIComponent(strResult.replace(/\+/g, " "));
        },
        require(name) {
            const found = $2sxc.urlParams.get(name);
            if (found === "") {
                const message = `Required parameter (${name}) missing from url - cannot continue`;
                alert(message);
                throw message;
            }
            return found;
        }
    };

    function autoFind(domElement: HTMLElement): ToSic.Sxc.SxcInstanceWithInternals {
        const containerTag = $(domElement).closest(".sc-content-block")[0];
        if (!containerTag) return null;
        const iid = containerTag.getAttribute("data-cb-instance"),
            cbid = containerTag.getAttribute("data-cb-id");
        if (!iid || !cbid) return null;
        return $2sxc(iid, cbid) as any as ToSic.Sxc.SxcInstanceWithInternals;
    };

    // note: I would like to remove this from $2sxc, but it's currently used both in the inpage-edit and in the dialogs
    // debug state which is needed in various places
    $2sxc.debug = {
        load: ($2sxc.urlParams.get("debug") === "true"),
        uncache: $2sxc.urlParams.get("sxcver")
    };


    // mini-helpers to manage 2sxc parts, a bit like a dependency loader which will optimize to load min/max depending on debug state
    $2sxc.parts = {
        getUrl(url:string, preventUnmin:boolean) {
            let r = (preventUnmin || !$2sxc.debug.load) ? url : url.replace(".min", ""); // use min or not
            if ($2sxc.debug.uncache && r.indexOf("sxcver") === -1)
                r = r + ((r.indexOf("?") === -1) ? "?" : "&") + "sxcver=" + $2sxc.debug.uncache;
            return r;
        }
    };



    /**
    * helper API to run ajax / REST calls to the server
    * it will ensure that the headers etc. are set correctly
    * and that urls are rewritten
    */


    // var test = new _2sxc.T17();
})();
// ReSharper restore InconsistentNaming
