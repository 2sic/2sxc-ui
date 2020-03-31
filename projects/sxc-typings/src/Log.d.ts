/**
 * A log object which will collect log entries for another ojbect
 * @export
 * @interface Log
 */
export interface Log {
    /**
     * The name of this log, for scenarios where multiple loggers are mixed
     */
    name: string;

    /**
     * List of all entries added to this log
     */
    entries: LogEntry[];

    /**
     * Maximum amount of entries to add - to prevent memory hoging
     */
    maxEntries: number;

    /**
     * Add a simple message to the log
     * @param {string} message
     * @memberof Log
     */
    add(message: (() => string) | string, data?: unknown): void;
}
  
/**
 * A log entry item
 * @export
 * @interface LogEntry
 */
export interface LogEntry {
    time: number;
    message: string;
}

/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 */
export interface HasLog {
    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
     */
    log: Log;
}