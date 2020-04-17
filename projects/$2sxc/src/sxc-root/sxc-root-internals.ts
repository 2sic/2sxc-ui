import { SxcInstanceWithInternals } from '../sxc-instance/sxc-instance-with-internals';
import { TotalPopup } from '../tools/total-popup';
import { Stats } from '../Stats';
import { SxcRoot } from './sxc-root';
import { Debug } from '..';
import { Insights } from '..';

export interface SxcRootInternals {
    _controllers: { [id: string] : SxcInstanceWithInternals };
    beta: any;
    _data: any;
    debug: Debug;
    stats: Stats;

    /** The debugging / insights system */
    insights: typeof Insights.show;
    _insights: typeof Insights;

    _manage: any;
    _translateInit: any;

    /** Very internal bit, probably will be deprecated */
    parts: any;

    /** internal helper to get jQuery from DNN or internal */
    jq(): JQuery;

    totalPopup: TotalPopup;
}

export interface SxcRootWithInternals extends SxcRoot, SxcRootInternals {}