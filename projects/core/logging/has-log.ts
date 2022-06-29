import { Log } from '.';

/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 * @public
 */
export abstract class HasLog {
  /**
   * The logger for this object
   * @internal usually not relevant and could make docs confusing
   */
  log: Log;

  /**
   * initialize the logger
   * ideally it has a parent-logger to attach to
   * @param logName name to show in the logger
   * @param parentLog parent-logger to attach to
   * @param initialMessage optional start-message to log
   * @internal
   */
  constructor(
    logName: string,
    /** @internal */
    private parentLog?: Log,
    initialMessage?: string,
  ) {
    this.initLogInternal(logName, parentLog, initialMessage);
  }

  /** @internal */
  public initLog = (name: string, parentLog?: Log, initialMessage?: string)
    : void => this.initLogInternal(name, parentLog, initialMessage)

  /** @internal */
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
