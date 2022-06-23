/// <reference types="jquery" />
/** @internal */
export interface AjaxSettings extends JQueryAjaxSettings {
    /** Override the endpoint, which is usually '2sxc' */
    endpoint?: string;
    /** Controller name, for controller/action calls */
    controller?: string;
    /** action name, for controller/action calls */
    action?: string;
    /** The params to be used in the url for the request */
    params?: any;
    preventAutoFail?: boolean;
}
