import { Log } from '.';
/**
 * A log entry item
 * @export
 * @interface LogEntry
 * @public
 */
export declare class LogEntry {
    /** @internal */
    private log;
    message: string;
    /** @internal */
    depth: number;
    /** A timestamp for this entry to better see sequences of things happening */
    time: number;
    /**
     * The result of an operation - treated differently in the output
     * @internal
     */
    result: string;
    /**
     * Data which is logged - if data-logging is enabled
     * @internal
     */
    get data(): unknown;
    /** @internal */
    set data(data: unknown);
    /** @internal */
    private _data?;
    /** @internal */
    source: () => string;
    /** @internal */
    constructor(
    /** @internal */
    log: Log, message: string, 
    /** @internal */
    depth: number, 
    /** A timestamp for this entry to better see sequences of things happening */
    time: number, data?: unknown);
}
