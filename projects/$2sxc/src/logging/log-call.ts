import { Entry, Log, LogEntryOptions as LEO } from '.';

export class LogCall {
    /** The initial entry created - important for later attaching the final result of the call */
    public initialEntry: Entry;

    constructor(public log: Log, public name: string, callParams?: string, message?: string, data?: {[key:string]: unknown }) {
        this.initialEntry = this.log._prepareEntry(name + '(' + (callParams || '') + ')');
        this.log._callDepthAdd(name);
        this.log._addEntry(this.initialEntry);
        if (typeof message === 'string') this.add(message);
        if (data) {
            // todo: add logging for data
        }
    }

    private lastMessage: string;

    add(message: string, data?: unknown) {
        this.lastMessage = message;
        this.log.add(message, data);
    }

    onlyAddIfNew(message: string) {
        if (this.lastMessage !== message)
        this.add(message);
    }

    /** Add data - but only if data logging is enabled */
    data(message: string, data: unknown) {
        this.log.addData(message, data);
    }

    done(message?: string, behavior?: LEO): void {
        this.return(null, message || '👍', behavior);
    }

    return<T>(result: T, message?: string, behavior?: LEO) {
        message = message || '👍';
        this.initialEntry.result = message;
        this.log._callDepthRemove(this.name);

        // if we're in keep-data / debug mode, keep that
        this.initialEntry.data = result;

        // if we're in live-dump mode, then the entry was already dumped, show again
        if (this.log.liveDump || this.log._parentHasLiveDump)
            this.add(this.name + ' = ' + message, result);

        this.processExtraBehavior<T>(behavior, message, result);
        return result;
    }

    /* 
     * treat all extra output or errors
     * to allow setting a debug stop point when needed
     * then you can trace the stack-call to see where the error originated
     */
    private processExtraBehavior<T>(behavior?: LEO, message: string, result: T) {
        if (!behavior) return;
        debugger;
        if (behavior === LEO.log) console.log(message, result);
        if (behavior === LEO.warn) console.warn(message, result);
        if (behavior === LEO.error || behavior === LEO.throw) console.error(message, result);
        if (behavior === LEO.throw) throw message;
    }
}
