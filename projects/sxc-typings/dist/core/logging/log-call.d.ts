import { LogEntry, Log, LogEntryOptions as LEO } from '.';
/** @internal */
export declare class LogCall {
    log: Log;
    name: string;
    /** The initial entry created - important for later attaching the final result of the call */
    initialEntry: LogEntry;
    constructor(log: Log, name: string, callParams?: string, message?: string, data?: {
        [key: string]: unknown;
    });
    private lastMessage;
    add(message: string, data?: unknown, behavior?: LEO): void;
    onlyAddIfNew(message: string, behavior?: LEO): void;
    /** Add data - but only if data logging is enabled */
    data(message: string, data: unknown): void;
    done(message?: string, behavior?: LEO): void;
    return<T>(result: T, message?: string, behavior?: LEO): T;
    private processExtraBehavior;
}
