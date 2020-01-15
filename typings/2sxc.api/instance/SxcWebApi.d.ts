/// <reference types="jquery" />
import { SxcInstance } from './SxcInstance';
import { Environment } from '../environment/Environment';
import { AjaxSettings } from '../ajax/AjaxSettings';
import { Dictionary } from '../tools/Dictionary_T';
export declare class SxcWebApi {
    private readonly sxc;
    readonly env: Environment;
    constructor(sxc: SxcInstance);
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): JQueryPromise<any>;
    headers(): Dictionary<string>;
}
