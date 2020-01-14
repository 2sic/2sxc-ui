import { SxcInstance } from '../instance/SxcInstance';
import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { TotalPopup } from '../tools/TotalPopup';
import { UrlParamManager } from '../tools/UrlParamManager';
import { SxcController } from './SxcController';
import { Stats } from '../Stats';

export interface SxcControllerInternals {
    _controllers: SxcInstanceWithInternals[];
    beta: any;
    _data: any;
    debug: any;
    stats: Stats;

    _manage: any;
    _translateInit: any;

    /** Very internal bit, probably will be deprecated */
    parts: any;

    /** internal helper to get jQuery from DNN or internal */
    jq(): JQuery;

    totalPopup: TotalPopup;
    urlParams: UrlParamManager;

}

// export interface SxcControllerWithInternals extends SxcController {
//     // (id: number | HTMLElement, cbid?: number): SxcInstance | SxcInstanceWithInternals;
//     totalPopup: TotalPopup;
//     urlParams: UrlParamManager;
//     // beta: any;
//     // _controllers: any;
//     // _data: any;
//     // _manage: any;
//     // _translateInit: any;
//     // debug: any;
//     // parts: any;

// }