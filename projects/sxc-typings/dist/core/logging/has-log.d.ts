import { Log } from '.';
/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 */
export declare abstract class HasLog {
    /** @internal */
    private parentLog?;
    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
     * @internal usually not relevant and could make docs confusing
     */
    log: Log;
    /**
     * initialize the logger
     * ideally it has a parent-logger to attach to
     * @param logName name to show in the logger
     * @param parentLog parent-logger to attach to
     * @param initialMessage optional start-message to log
     * @internal
     */
    constructor(logName: string, 
    /** @internal */
    parentLog?: Log, initialMessage?: string);
    /** @internal */
    initLog: (name: string, parentLog?: Log, initialMessage?: string) => void;
    /** @internal */
    private initLogInternal;
}
