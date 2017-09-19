// ReSharper disable InconsistentNaming

module ToSic.Sxc {
    declare const $: any;

    /**
     * This is the interface for the main $2sxc object on the window
     */
    export interface SxcController {
        /**
         * returns a 2sxc-instance of the id or html-tag passed in
         * @param id 
         * @param cbid
         * @returns {} 
         */
        (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals,

        /**
         * system information, mainly for checking which version of 2sxc is running
         * note: it's not always updated reliably, but it helps when debugging
         */
        sysinfo: {
            /**
             * the version using the ##.##.## syntax
             */
            version: string,

            /**
             * a short text description, for people who have no idea what this is
             */
            description: string,
        },
    }

    /**
     * returns a 2sxc-instance of the id or html-tag passed in
     * @param id 
     * @param cbid
     * @returns {} 
     */
    function SxcController(id: number | HTMLElement, cbid?: number): Sxc.SxcInstanceWithInternals {
        let $2sxc = window.$2sxc as SxcControllerWithInternals;
        if (!$2sxc._controllers)
            throw "$2sxc not initialized yet";

        // if it's a dom-element, use auto-find
        if (typeof id === "object") {
            const idTuple = autoFind(id);
            id = idTuple[0];
            cbid = idTuple[1];
        }

        if (!cbid) cbid = id;           // if content-block is unknown, use id of module
        const cacheKey = id + ":" + cbid; // neutralize the id from old "34" format to the new "35:353" format

        // either get the cached controller from previous calls, or create a new one
        if ($2sxc._controllers[cacheKey]) return $2sxc._controllers[cacheKey];

        // also init the data-cache in case it's ever needed
        if (!$2sxc._data[cacheKey]) $2sxc._data[cacheKey] = {};

        return ($2sxc._controllers[cacheKey] = new Sxc.SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, $.ServicesFramework));
    }

    /**
     * Build a SXC Controller for the page. Should only ever be executed once
     */
    export function buildSxcController(): SxcController | SxcControllerWithInternals {
        const url = new Sxc.UrlParamManager();
        const debug = {
            load: (url.get("debug") === "true"),
            uncache: url.get("sxcver")
        };

        const addOn = {
                _controllers: {} as any,
                sysinfo: {
                    version: "09.05.02",
                    description: "The 2sxc Controller object - read more about it on 2sxc.org"
                },
                beta: {},
                _data: {},
                // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
                totalPopup: new Sxc.TotalPopup(),
                urlParams: url,
                // note: I would like to remove this from $2sxc, but it's currently used both in the inpage-edit and in the dialogs
                // debug state which is needed in various places
                debug: debug,
                // mini-helpers to manage 2sxc parts, a bit like a dependency loader which will optimize to load min/max depending on debug state
                parts: {
                    getUrl(url: string, preventUnmin: boolean) {
                        let r = (preventUnmin || !debug.load) ? url : url.replace(".min", ""); // use min or not
                        if (debug.uncache && r.indexOf("sxcver") === -1)
                            r = r + ((r.indexOf("?") === -1) ? "?" : "&") + "sxcver=" + debug.uncache;
                        return r;
                    }
                },
        };
        for (var property in addOn)
            if (addOn.hasOwnProperty(property))
                SxcController[property] = addOn[property];
        return SxcController as any as SxcControllerWithInternals;
    }
    
    
    function autoFind(domElement: HTMLElement): [number, number] { // ToSic.Sxc.SxcInstanceWithInternals {
        const containerTag = $(domElement).closest(".sc-content-block")[0];
        if (!containerTag) return null;
        const iid = containerTag.getAttribute("data-cb-instance"),
            cbid = containerTag.getAttribute("data-cb-id");
        if (!iid || !cbid) return null;
        return [iid, cbid]; // $2sxc(iid, cbid) as any as ToSic.Sxc.SxcInstanceWithInternals;
    }



    export interface SxcControllerWithInternals extends SxcController {
        (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals,
        totalPopup: TotalPopup;
        urlParams: UrlParamManager;
        beta: any,
        _controllers: any,
        _data: any,
        _manage: any,
        _translateInit: any,
        debug: any,
        parts: any,

    }
}
// ReSharper restore InconsistentNaming
