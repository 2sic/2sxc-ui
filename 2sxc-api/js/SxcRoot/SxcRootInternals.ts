import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { TotalPopup } from '../tools/TotalPopup';
import { UrlParamManager } from '../tools/UrlParamManager';
import { Stats } from '../Stats';

export interface SxcRootInternals {
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
