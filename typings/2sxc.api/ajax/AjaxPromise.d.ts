/// <reference types="jquery" />
import { SxcInstance } from '../instance/ToSic.Sxc.Instance';
import { AjaxSettings } from './AjaxSettings';
export declare class AjaxPromise {
    private sxc;
    constructor(sxc: SxcInstance);
    makePromise(settings: AjaxSettings): JQueryPromise<any>;
    private GetHeaders;
    private getActionUrl;
}
