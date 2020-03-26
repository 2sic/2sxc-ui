import { Log } from '.';
import { HasLog as IHasLog } from '../../../sxc-typings/index';
export abstract class HasLog  implements Omit<IHasLog, 'log'> {
  log: Log;

  /**
   * initialize the logger
   * ideally it has a parent-logger to attach to
   * @param logName name to show in the logger
   * @param parentLog parent-logger to attach to
   * @param initialMessage optional start-message to log
   */
  constructor(logName: string, private parentLog?: Log, initialMessage?: string) {
    this.initLogInternal(logName, parentLog, initialMessage);
  }

  public initLog = (name: string, parentLog?: Log, initialMessage?: string)
    : void => this.initLogInternal(name, parentLog, initialMessage)

  private initLogInternal(name: string, parentLog?: Log, initialMessage?: string): void {
    if (this.log == null)
    // standard & most common case: just create log
    this.log = new Log(name, parentLog, initialMessage);
    else {
    // late-init case, where the log was already created - just reconfig keeping what was in it
      this.log.rename(name);
      this.log.linkLog(parentLog);
      if (initialMessage != null)
        this.log.add(initialMessage);
    }
  }

}
