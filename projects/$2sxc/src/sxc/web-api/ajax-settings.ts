/**
 * Deprecated parameters for old jQuery AJAX calls.
 * Shouldn't be used any more. 
 * @public
 * @deprecated
 */
export interface ZzzAjaxSettingsDeprecated {
    /**
     * Override the endpoint, which is usually '2sxc'
     * @internal
     */
    endpoint?: string;

    /**
     * Controller name, for controller/action calls
     */
    controller?: string;

    /**
     * action name, for controller/action calls
     */
    action?: string;

    /** 
     * The params to be used in the url for the request 
     */
    params?: any;

    /**
     * @internal
     */
    preventAutoFail?: boolean;
}
