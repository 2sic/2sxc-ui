import { HasLog, Log } from '.';
/** @public */
declare type LogList = Array<{
    key: string;
    log: Log;
}>;
/** @internal */
declare class InsightsSingleton extends HasLog {
    constructor();
    history: {
        [key: string]: InsightsLogSet;
    };
    add(setName: string, logName: string, log: Log): void;
    show(partName: string, index?: number, start?: number, length?: number): void;
}
declare class InsightsLogSet {
    name: string;
    logs: LogList;
    constructor(name: string);
}
/** @internal */
export declare const Insights: InsightsSingleton;
export {};
