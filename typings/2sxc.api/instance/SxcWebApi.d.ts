/// <reference types="jquery" />
import { SxcInstance } from './SxcInstance';
import { Environment } from '../environment/Environment';
import { AjaxSettings } from '../ajax/AjaxSettings';
export declare class SxcWebApi {
    private readonly controller;
    readonly env: Environment;
    constructor(controller: SxcInstance);
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): JQueryPromise<any>;
    private request;
}
