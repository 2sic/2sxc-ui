import { Constants } from './constants';
import { DebugConfig } from 'app/debug-config';


class Log {
  name = '';
  autoDump = DebugConfig.live;
  logs = new Array<string>();
  parent: Log;
  loggers: any = new Object();

  constructor (name?: string, parent?: Log) {
    this.name = name;
    this.parent = parent;
  }

  add(msg: string, ...args: any[]): void {
    this.logs.push(msg);
    if (this.name) msg = this.name + ':' + msg;
    if (this.parent) this.parent.logs.push(msg);
    if (this.autoDump) {
      arguments[0] = Constants.logName + ': ' + msg;
      console.log.apply(null, arguments);
    }
  }

  subLog(name: string, autoDump?: boolean): Log {
    const newLog = new Log(name, this);
    this.loggers[name] = newLog;
    newLog.autoDump = typeof(autoDump) === 'boolean'
      ? autoDump : this.autoDump;
    return newLog;
  }

  dump(): void {
    this.add('dumping to console');
    console.log(`Log dump for '${this.name}'`, this);
  }
}


export const log = new Log();

window['logger'] = log;
