import { Constants } from './constants';
import { DebugConfig } from 'app/debug-config';


export class Log {
  /** global state to determine if logging to console should be done or not */
  public static forceLogToConsole = false;

  name = '';
  autoDump = DebugConfig.logger.logToConsole;
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
    if (this.autoDump || Log.forceLogToConsole) {
      arguments[0] = Constants.logName + ': ' + msg;
      console.log.apply(null, arguments);
    }
  }

  subLog(name: string, autoDump?: boolean): Log {
    const newLog = new Log(name, this);
    this.loggers[name] = newLog;
    newLog.autoDump = typeof(autoDump) === 'boolean'
      ? autoDump : this.autoDump;
    if (DebugConfig.logger.internals)
      this.add(`logger: subLog(${name}, ${autoDump}) resulting in autoDump=${newLog.autoDump}`);

    return newLog;
  }

  dump(): void {
    this.add('dumping to console');
    console.log(`Log dump for '${this.name}'`, this);
  }

  public static configureRuntimeLogging(state: boolean) {
    if(DebugConfig.logger.urlDebugActivatesLive)
      Log.forceLogToConsole = state;
  }
}


export const log = new Log();

window['logger'] = log;
