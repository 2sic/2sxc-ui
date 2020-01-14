import { SxcInstanceWithInternals } from './ToSic.Sxc.Instance';
export declare class SxcDataWithInternals {
    private controller;
    source: any;
    "in": any;
    List: any;
    constructor(controller: SxcInstanceWithInternals);
    sourceUrl(params?: string): string;
    load(source?: any): SxcDataWithInternals;
    reload(): SxcDataWithInternals;
    on(events: Event, callback: () => void): Promise<any>;
    _triggerLoaded(): Promise<any>;
    one(events: Event, callback: (x: any, y: any) => void): SxcDataWithInternals;
}
