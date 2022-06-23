import { LogEntry, LogCall } from '.';
/**
 * A log object which will collect log entries for another ojbect
 * @export
 * @interface Log
 * @internal
 */
export declare class Log {
    /**
     * List of all entries added to this log
     */
    entries: LogEntry[];
    /** @internal */
    private depth;
    /** @internal */
    private callDepths;
    /** @internal */
    startTime: number;
    /**
     * Maximum amount of entries to add - to prevent memory hoging
     */
    maxEntries: number;
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     * @internal
     */
    constructor(name: string, parent?: Log, initialMessage?: string);
    /** @internal */
    liveDump: boolean;
    /** @internal */
    _parentHasLiveDump: boolean;
    /** @internal */
    keepData: boolean;
    /** @internal */
    _parentHasKeepData: boolean;
    /**
     * Full identifier of this log-object, with full hierarchy
     * @internal
     */
    fullIdentifier: () => string;
    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     * @internal
     */
    rename(name: string): void;
    /**
     * link this log to a parent
     * usually happens in constructor, but in rare cases
     * this must be called manually
     * @internal
     */
    linkLog: (parent: Log) => void;
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
    /** @internal */
    addData(message: (() => string) | string, data: unknown): void;
    /** @internal */
    logData(): boolean;
    /** @internal */
    _prepareEntry(message: (() => string) | string, data?: unknown): LogEntry;
    /** @internal */
    private _prepareMessage;
    /** @internal */
    call(name: string, callParams?: string, message?: string, data?: {
        [key: string]: unknown;
    }): LogCall;
    /** @internal */
    _callDepthAdd(name: string): void;
    /** @internal */
    _callDepthRemove(name: string): void;
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     * @internal
     */
    dump(one?: LogEntry, separator?: string): void;
    /** @internal */
    dumpList(start?: number, length?: number): void;
    /** @internal */
    private dumpOne;
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     * @internal
     */
    _addEntry(entry: LogEntry): void;
    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     * @internal
     */
    private randomString;
    /**
     * parent logger - important if loggers are chained
     * @internal
     */
    private parent;
    /**
     * scope of this logger - to easily see which ones
     * are about the same topic
     * @internal
     */
    private scope;
    /**
     * The name of this log, for scenarios where multiple loggers are mixed
     */
    name: string;
    /**
     * Unique 2-character ID of this specific log object
     * @internal
     */
    private id;
    /** @internal */
    private idCache;
    /**
     * Unique identifier of this log object, with name and ID
     * @internal
     */
    private identifier;
}
