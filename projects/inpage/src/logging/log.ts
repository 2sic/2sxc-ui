﻿import { Entry } from './entry';
import { LogCall } from './log-call';
const maxScopeLen = 3;
const maxNameLen = 6;

const liveDump = false;

export class Log {

    /**
     * all log-entries on this logger
     */
    entries = new Array<Entry>();
    private depth = 0;
    private callDepths: string[] = [];

    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     */
    constructor(name: string, parent?: Log, initialMessage?: string) {
        this.rename(name);
        this.linkLog(parent);
        if (initialMessage != null) this.add(initialMessage);
    }

    /* if we should live-dump, can be selectively activated */
    liveDump: boolean = liveDump;
    _parentHasLiveDump: boolean = false;
    keepData: boolean = false;
    _parentHasKeepData: boolean = false;

    /**
     * Full identifier of this log-object, with full hierarchy
     */
    fullIdentifier = (): string =>
        `${(this.parent ? this.parent.fullIdentifier() : '')}${this.identifier()}`

    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     */
    rename(name: string): void {
        try {
            const dot = name.indexOf('.');
            this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + '.' : '';
            const rest = dot > 0 ? name.substr(dot + 1) : name;
            this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
            this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
        } catch (e) {
            /* ignore */
        }
    }

    /**
     * link this log to a parent
     * usually happens in constructor, but in rare cases
     * this must be called manually
     */
    linkLog = (parent: Log): void => {
        this.parent = parent || this.parent; // if new parent isn't defined, don't replace
        if (this.parent) {
            this._parentHasLiveDump = this.parent.liveDump || this.parent._parentHasLiveDump;
            this._parentHasKeepData = this.parent.keepData || this.parent._parentHasKeepData;
        }
    }

    /**
     * add a message to the log-list
     * @param message
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    add(message: (() => string) | string, data?: unknown): string {
        const entry = this._prepareEntry(message, data);
        this._addEntry(entry);
        return entry.message;
    }

    _prepareEntry(message: (() => string) | string, data?: unknown): Entry {
        const msg = this._prepareMessage(message);
        const entry = new Entry(this, msg, this.depth, data);
        return entry;
    }

    private _prepareMessage(message: (() => string) | string): string {
        if (message instanceof Function) {
            try {
                return ((message as () => string)());
            } catch (e) {
                return 'err: message undefined';
            }
        }
        return message.toString();
    }


    call(name: string, callParams?: string, message?: string): LogCall {
        return new LogCall(this, name, callParams, message);
    }

    _callDepthAdd(name: string): void {
        this.depth++;
        this.callDepths.push(name);
    }

    _callDepthRemove(name: string): void {
        this.depth--;
        const last = this.callDepths.pop();
        if (last !== name) {
            console.warn(`log: call depth reduced by '${name}' but last was '${last}'`);
        }
    }

    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     */
    dump(one: Entry = null, separator = ' - '): void {
        if (one) this.dumpOne(one, separator);
        else this.entries.forEach((e) => this.dumpOne(e, separator));
    }

    private dumpOne(e: Entry, separator = ' - '): void {
        const result = (e.result) ? ' =' + e.result : '';
        const line = e.source() + separator + '..'.repeat(e.depth) + e.message + result;
        if (e.data) console.log(line, e.data);
        else console.log(line);
    }


    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     */
    _addEntry(entry: Entry): void {
        if (this.liveDump) this.dump(entry);
        this.entries.push(entry);
        if (this.parent) this.parent._addEntry(entry);
    }

    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     */
    private randomString(stringLength: number): string {
        const chars = '0123456789abcdefghiklmnopqrstuvwxyz';
        let randomstring = '';
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    /**
     * parent logger - important if loggers are chained
     */
    private parent: Log;

    /**
     * scope of this logger - to easily see which ones
     * are about the same topic
     */
    private scope = 'tdo';

    /**
     * name of this logger
     */
    private name = 'unknwn';


    /**
     * Unique 2-character ID of this specific log object
     */
    private id = (): string => this.idCache || (this.idCache = this.randomString(2));
    private idCache: string;

    /**
     * Unique identifier of this log object, with name and ID
     */
    private identifier = (): string => `${this.scope}${this.name}(${this.id()})`;

    }
