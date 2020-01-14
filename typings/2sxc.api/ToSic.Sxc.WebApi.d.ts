import { SxcInstance } from './ToSic.Sxc.Instance';
import { Environment } from './environment/Environment';
export declare class SxcWebApiWithInternals {
    private readonly controller;
    private readonly id;
    private readonly cbid;
    readonly env: Environment;
    constructor(controller: SxcInstance, id: number, cbid: number, env: Environment);
    get(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;
    post(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;
    delete(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;
    put(settingsOrUrl: string | any, params?: any, data?: any, preventAutoFail?: boolean): any;
    private request;
}
