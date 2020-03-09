import * as Public from '../../sxc-typings/index';
import { LogEntry } from './LogEntry';

const maxEntriesReached = 'Maximum amount of entries added to log, will stop adding more';

export class Log implements Public.Log {
  name: string;
  text = "";
  entries: LogEntry[] = [];
  start: number;
  maxEntries = 100;

  constructor(name: string, message?: string) {
    this.name = name;
    this.start = new Date().getTime();
    if(message) this.add(message);
  }

  add(message: string) {
    // silently return if past the max
    if(this.entries.length > this.maxEntries) return;

    // if we just reached the max, add last message
    else if(this.entries.length == this.maxEntries) this._add(maxEntriesReached);
    
    // standard: just add this
    else this._add(message);
  }

  private _add(message: string)
  {
    this.text += message + '\n';
    this.entries.push({time: new Date().getTime() - this.start, message: message} as LogEntry);
  }
}

