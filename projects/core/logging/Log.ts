import { LogEntry, LogCall } from '.';
import { Debug } from '../../inpage/src/constants/debug';

const keepData = document.location.search.indexOf("debug=true") !== -1;

const maxScopeLen = 3;
const maxNameLen = 6;
const liveDump = false;
const maxEntriesReached = 'Maximum amount of entries added to log, will stop adding more';

/**
 * A log object which will collect log entries for another object
 * @export
 * @interface Log
 * @public
 */
export class Log {

  /**
   * List of all entries added to this log
   */
  entries = new Array<LogEntry>();

  /** @internal */
  private depth = 0;

  /** @internal */
  private callDepths: string[] = [];
  
  /** @internal */
  startTime: number;

  /**
   * Maximum amount of entries to add - to prevent memory hogging
   */
  maxEntries = 1000;

  /**
   * Create a logger and optionally attach it to a parent logger
   * @param string name this logger should use
   * @param Log optional parrent logger to attach to
   * @param string optional initial message to log
   * @internal
   */
  constructor(name: string, parent?: Log, initialMessage?: string) {
    this.rename(name);
    this.linkLog(parent);

    // after linking, check if we have debug settings
    if (Debug.isDevBuild) {
      const shouldDebug = (Debug.parts as Record<string, boolean>)[name];
      if (shouldDebug != null) {
        this.liveDump = shouldDebug;
        this.keepData = shouldDebug;
      }
    }

    this.startTime = new Date().getTime();
    if (initialMessage != null) this.add(initialMessage);
  }

  /* if we should live-dump, can be selectively activated */
  /** @internal */
  liveDump: boolean = liveDump;

  /** @internal */
  _parentHasLiveDump: boolean = false;

  /** @internal */
  keepData: boolean = keepData;

  /** @internal */
  _parentHasKeepData: boolean = false;

  /**
   * Full identifier of this log-object, with full hierarchy
   * @internal
   */
  fullIdentifier = (): string => `${(this.parent ? this.parent.fullIdentifier() : '')}${this.identifier()}`

  /**
   * give this logger a new name
   * usually happens in constructor, but in rare cases
   * it's called manually
   * @param name
   * @internal
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
   * @internal
   */
  linkLog = (parent: Log): void => {
    this.parent = parent || this.parent; // if new parent isn't defined, don't replace
    if (this.parent) {
      this._parentHasLiveDump = this.parent.liveDump || this.parent._parentHasLiveDump;
      this._parentHasKeepData = this.parent.keepData || this.parent._parentHasKeepData;
    }
  }

  /**
   * Add a simple message to the log
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
    // check if the log is already too big
    if (this.entries.length > this.maxEntries) 
      return this._prepareMessage(message);

    // if we just reached the max, add special message
    if (this.entries.length === this.maxEntries) 
      this._addEntry(this._prepareEntry(maxEntriesReached));

    const entry = this._prepareEntry(message, data);
    this._addEntry(entry);
    return entry.message;
  }

  /** @internal */
  addData(message: (() => string) | string, data: unknown): void {
    if (this.logData()) this.add(message, data);
  }

  /** @internal */
  logData(): boolean {
    return this.keepData || this._parentHasKeepData;
  }

  /** @internal */
  _prepareEntry(message: (() => string) | string, data?: unknown): LogEntry {
    const msg = this._prepareMessage(message);
    const time = new Date().getTime() - this.startTime;
    const entry = new LogEntry(this, msg, this.depth, time, data);
    return entry;
  }

  /** @internal */
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

  /** @internal */
  call(name: string, callParams?: string, message?: string, data?: {[key:string]: unknown }): LogCall {
    return new LogCall(this, name, callParams, message, data);
  }

  /** @internal */
  _callDepthAdd(name: string): void {
    this.depth++;
    this.callDepths.push(name);
  }

  /** @internal */
  _callDepthRemove(name: string): void {
    this.depth--;
    const last = this.callDepths.pop();
    if (last !== name)
      console.warn(`log: call depth reduced by '${name}' but last was '${last}'`);
  }

  /**
   * helper to create a text-output of the log info
   * @param separator
   * @param start
   * @param end
   * @internal
   */
  dump(one: LogEntry = null, separator = ' - '): void {
    if (one) this.dumpOne(0, one, separator);
    else this.dumpList();
  }

  /** @internal */
  dumpList(start: number = 0, length?: number) {
    let index = start;
    this.entries
      .slice(start, length ? start + length : undefined)
      .forEach((e) => this.dumpOne(index++, e));
  }

  /** @internal */
  private dumpOne(index: number, e: LogEntry, separator = ' - '): void {
    const result = (e.result) ? ' =' + e.result : '';
    const line = ('0000' + index).slice(-4) + ' ' + e.source() + separator + '..'.repeat(e.depth) + e.message + result;
    if (e.data) console.log(line, e.data);
    else console.log(line);
  }


  /**
   * add an entry-object to this logger
   * this is often called by sub-loggers to add to parent
   * @param entry
   * @internal
   */
  _addEntry(entry: LogEntry): void {
    if (this.liveDump) this.dump(entry);
    this.entries.push(entry);
    if (this.parent) this.parent._addEntry(entry);
  }

  /**
   * helper to generate a random 2-char ID
   * @param stringLength
   * @internal
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
   * @internal
   */
  private parent: Log;

  /**
   * scope of this logger - to easily see which ones
   * are about the same topic
   * @internal
   */
  private scope = 'tdo';

  /**
   * The name of this log, for scenarios where multiple loggers are mixed
   */
  public name = 'unknwn';


  /**
   * Unique 2-character ID of this specific log object
   * @internal
   */
  private id = (): string => this.idCache || (this.idCache = this.randomString(2));

  /** @internal */
  private idCache: string;

  /**
   * Unique identifier of this log object, with name and ID
   * @internal
   */
  private identifier = (): string => `${this.scope}${this.name}(${this.id()})`;

}
