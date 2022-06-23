import { Sxc, SxcWebApi } from '..';
import { AjaxSettings } from './ajax-settings';
/** @internal */
export declare class AjaxPromise {
    private api;
    private sxc;
    constructor(api: SxcWebApi, sxc: Sxc);
    /**
     * Make a jQuery style promise request
     * @param {AjaxSettings} settings
     * @returns {JQueryPromise<any>}
     * @memberof AjaxPromise
     */
    makePromise(settings: AjaxSettings): any;
    /**
     * Generate the correct WebApi url
     * @param settings the settings as they would be in jQuery
     */
    private getActionUrl;
}
