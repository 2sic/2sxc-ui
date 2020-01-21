/// <reference types="jquery" />
import { SxcInstance } from '../instance/SxcInstance';
import { AjaxSettings } from './AjaxSettings';
import { SxcWebApi } from '../instance/SxcWebApi';
export declare class AjaxPromise {
    private api;
    private sxc;
    constructor(api: SxcWebApi, sxc: SxcInstance);
    makePromise(settings: AjaxSettings): JQueryPromise<any>;
    private getActionUrl;
}
