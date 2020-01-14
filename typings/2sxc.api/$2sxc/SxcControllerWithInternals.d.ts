/// <reference types="jquery" />
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { TotalPopup } from '../tools/TotalPopup';
import { UrlParamManager } from '../tools/UrlParamManager';
import { Stats } from '../Stats';
export interface SxcControllerInternals {
    _controllers: SxcInstanceWithInternals[];
    beta: any;
    _data: any;
    debug: any;
    stats: Stats;
    _manage: any;
    _translateInit: any;
    parts: any;
    jq(): JQuery;
    totalPopup: TotalPopup;
    urlParams: UrlParamManager;
}
