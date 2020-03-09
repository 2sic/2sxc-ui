/// <reference types="jquery" />
import { SxcInstance, SxcInstanceWithInternals } from './ToSic.Sxc.Instance';
import { TotalPopup } from './ToSic.Sxc.TotalPopup';
import { UrlParamManager } from './ToSic.Sxc.Url';
import { Stats } from './Stats';
import { Environment } from './environment/Environment';
export interface Window {
    $2sxc: SxcController | SxcControllerWithInternals;
}
export interface SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
    sysinfo: {
        version: string;
        description: string;
    };
    env: Environment;
    jq(): JQuery;
    _controllers: SxcInstanceWithInternals[];
    beta: any;
    _data: any;
    totalPopup: TotalPopup;
    urlParams: UrlParamManager;
    debug: any;
    stats: Stats;
    parts: any;
}
export declare function buildSxcController(): SxcController | SxcControllerWithInternals;
export interface SxcControllerWithInternals extends SxcController {
    (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
    totalPopup: TotalPopup;
    urlParams: UrlParamManager;
    beta: any;
    _controllers: any;
    _data: any;
    _manage: any;
    _translateInit: any;
    debug: any;
    parts: any;
}
