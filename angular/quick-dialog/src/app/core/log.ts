import { Constants } from './constants';


class Log {
  enabled = true;
  logs = new Array<string>();

  add(msg: string) {
    this.logs.push(msg);
    if (this.enabled) {
      arguments[0] = Constants.logName + ': ' + msg;
      console.log.apply(null, arguments);
    }
  }
}


export const log = new Log();
