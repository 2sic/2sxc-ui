// Type definitions for 2sxc 09.05.00
// Project: 2sxc Content-Management and App System
// Definitions by: Daniel Mettler (iJungleboy) www.2sxc.org

/**
 * This is the interface for the main $2sxc object on the window
 */
interface SxcController {
    /**
     * returns a 2sxc-instance of the id or html-tag passed in
     * @param id 
     * @param cbid
     * @returns {} 
     */
    (id: number | HTMLElement, cbid?: number): SxcInstance,

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
 * The typical sxc-instance object for a specific DNN module or content-block
 */
interface SxcInstance {
    /**
     * the sxc-instance ID, which is usually the DNN Module Id
     */
    id: number,

    /**
     * content-block ID, which is either the module ID, or the content-block definitiion entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number,


    /**
     * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
     * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
     * @param virtualPath 
     * @returns mapped path 
     */
    resolveServiceUrl(virtualPath: string): string,

    /**
     * helpers for ajax calls
     */
    webApi: SxcWebApi,
}

/**
 * Enhanced sxc instance with additional editing functionality
 * Use this, if you intend to run content-management commands like "edit" from your JS directly
 */
interface SxcInstanceWithEditing extends SxcInstance {
    /**
     * checks if we're currently in edit mode
     * @returns {boolean} 
     */
    isEditMode(): boolean,

    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     */
    manage: any,
}

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 */
interface SxcWebApi {
    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail 
     * @returns {Promise} jQuery ajax promise object
     */
    get(settingsOrUrl, params?, data?, preventAutoFail?: boolean): any,

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail 
     * @returns {Promise} jQuery ajax promise object
     */
    post(settings, params?, data?, preventAutoFail?: boolean): any,

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail 
     * @returns {Promise} jQuery ajax promise object
     */
    delete(settings, params?, data?, preventAutoFail?: boolean): any,

    /**
     * returns an http-get promise
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail 
     * @returns {Promise} jQuery ajax promise object
     */
    put(settings, params?, data?, preventAutoFail?: boolean): any,
}


