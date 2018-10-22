import { Constants } from './constants';


class Log {
  name = '';
  enabled = true;
  logs = new Array<string>();
  parent: Log;

  constructor(name?: string, parent?: Log) {
    this.name = name;
    this.parent = parent;
  }

  add(msg: string, ...args: any[]): void {
    if (this.name) msg = this.name + ':' + msg;
    this.logs.push(msg);
    if (this.enabled) {
      arguments[0] = Constants.logName + ': ' + msg;
      console.log.apply(null, arguments);
    }
  }

  subLog(name: string): Log {
    const newLog = new Log(name, this);
    newLog.logs = this.logs;
    return newLog;
  }
}


export const log = new Log();
