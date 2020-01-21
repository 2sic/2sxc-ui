import { SxcInstanceWithInternals } from './SxcInstanceWithInternals';
export declare class SxcInstanceDataDeprecated {
    private controller;
    source: any;
    "in": any;
    List: any;
    constructor(controller: SxcInstanceWithInternals);
    sourceUrl(params?: string): string;
    load(source?: any): SxcInstanceDataDeprecated;
    reload(): SxcInstanceDataDeprecated;
    on(events: Event, callback: () => void): Promise<any>;
    _triggerLoaded(): Promise<any>;
    one(events: Event, callback: (x: any, y: any) => void): SxcInstanceDataDeprecated;
}
