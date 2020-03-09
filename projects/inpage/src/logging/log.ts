import { Entry } from './entry';
const maxScopeLen = 3;
const maxNameLen = 6;

const liveDump = false;

export class Log {

  /**
   * all log-entries on this logger
   */
  entries = new Array<Entry>();

  /**
   * Create a logger and optionally attach it to a parent logger
   * @param string name this logger should use
   * @param Log optional parrent logger to attach to
   * @param string optional initial message to log
   */
  constructor(name: string, parent?: Log, initialMessage?: string) {
    this.rename(name);
    this.linkLog(parent);
    if (initialMessage != null)
      this.add(initialMessage);

  }

  /**
   * Full identifier of this log-object, with full hierarchy
   */
  fullIdentifier = (): string =>
    `${(this.parent ? this.parent.fullIdentifier() : '')}${this.identifier()}`;

  /**
   * give this logger a new name
   * usually happens in constructor, but in rare cases 
   * it's called manually
   * @param name
   */
  rename(name: string) : void
  {
    try {
      const dot = name.indexOf('.');
      this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + '.' : '';
      const rest = dot > 0 ? name.substr(dot + 1) : name;
      this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
      this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
    }
    catch (e) {
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
  add(message: Function | string): string {
    let messageText: string;
    if (message instanceof Function) {
      try {
        messageText = ((message as Function)()).toString();
        message = null; // maybe it is unnecessary, but added to be safe as possible that arrow function parameter will be garbage collected
      } catch (e) {
        messageText = 'undefined';
      }
    } else {
      messageText = message.toString(); 
    }
    const entry = new Entry(this, messageText);
    this.addEntry(entry);
    if(liveDump) console.log(this.dump(undefined, undefined, undefined, entry));
    return messageText;
  }

  /**
   * helper to create a text-output of the log info
   * @param separator
   * @param start
   * @param end
   */
  dump(separator = ' - ', start = '', end = '', one : Entry = null ): string {
    var lg = start;
    const dumpOne = (e: Entry) => lg += e.source() + separator + e.message + '\n';
    if (one)
      dumpOne(one);
    else
      this.entries.forEach(dumpOne);
    lg += end;
    return lg;
  }

  /**
   * add an entry-object to this logger
   * this is often called by sub-loggers to add to parent
   * @param entry
   */
  private addEntry(entry: Entry): void
  {
    this.entries.push(entry);
    if (this.parent)
      this.parent.addEntry(entry);
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