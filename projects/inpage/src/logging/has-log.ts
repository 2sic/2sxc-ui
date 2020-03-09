import { Log } from './log';
import { IHasLog } from './ihas-log';

export class HasLog  implements  IHasLog {
  log : Log;

  /**
   * initialize the logger
   * ideally it has a parent-logger to attach to
   * @param logName name to show in the logger
   * @param parentLog parent-logger to attach to
   * @param initialMessage optional start-message to log
   */
  constructor(logName:string, private parentLog?: Log, initialMessage?: string) {
    this.initLogInternal(logName, parentLog, initialMessage);
  }

  public initLog = (name: string, parentLog?: Log, initialMessage?: string)
    : void => this.initLogInternal(name, parentLog, initialMessage);

  private initLogInternal(name:string, parentLog?:Log, initialMessage?:string): void
  {
    if (this.log == null)
    // standard & most common case: just create log
    this.log = new Log(name, parentLog, initialMessage);
    else {
    // late-init case, where the log was already created - just reconfig keeping what was in it
      this.log.rename(name);
      this.linkLog(parentLog);
      if (initialMessage != null)
        this.log.add(initialMessage);
    }
  }

  private logId = 'unknwn';

  linkLog = (parentLog: Log): void => this.log.linkLog(parentLog);

}