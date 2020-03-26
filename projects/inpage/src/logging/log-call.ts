import { Entry, Log } from '.';

export class LogCall {
    public initialEntry: Entry;
    constructor(public log: Log, public name: string, callParams?: string, message?: string) {
        this.initialEntry = this.log._prepareEntry(name + '(' + (callParams || '') + ')');
        this.log._callDepthAdd(name);
        this.log._addEntry(this.initialEntry);
        if (message) this.add(message);
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

    done(message?: string): void {
        this.return(null, message);
    }

    return<T>(result: T, message?: string) {
        message = message || 'ok';
        this.initialEntry.result = message;
        this.log._callDepthRemove(this.name);
        // if we're in keep-data / debug mode, keep that
        this.initialEntry.data = result;
        // if we're in live-dump mode, then the entry was already dumped, show again
        if (this.log.liveDump || this.log._parentHasLiveDump)
            this.add(this.name + ' = ' + message, result);
        return result;
    }
}
