import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { TotalPopup } from '../tools/TotalPopup';
import { Stats } from '../Stats';
import { SxcRoot } from './SxcRoot';

export interface SxcRootInternals {
    _controllers: { [id: string] : SxcInstanceWithInternals }; // SxcInstanceWithInternals[key: string];
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
}

export interface SxcRootWithInternals extends SxcRoot, SxcRootInternals {}