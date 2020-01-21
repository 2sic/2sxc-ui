/// <reference types="jquery" />
export interface AjaxSettings extends JQueryAjaxSettings {
    endpoint?: string;
    controller?: string;
    action?: string;
    params?: any;
    preventAutoFail?: boolean;
}
