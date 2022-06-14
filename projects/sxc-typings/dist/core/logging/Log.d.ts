import { LogEntry } from '.';
/**
 * A log object which will collect log entries for another ojbect
 * @export
 * @interface Log
 */
export declare class Log {
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
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    add(message: (() => string) | string, data?: unknown): string;
    /**
     * The name of this log, for scenarios where multiple loggers are mixed
     */
    name: string;
}
