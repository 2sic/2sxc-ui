import { CmsEngine } from '../commands/';
import { CommandParams } from '../commands/command-params';
import { ContextBundleInstance, isContextOfInstance } from '../context/bundles/context-bundle-instance';
import { findContext as getContext } from '../context/context';
import { DebugConfig } from '../DebugConfig';
import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';

const logId = 'Cms.Api';

export class Cms extends HasLog {
  /**
   * if true (default) will reset the log everytime something is done
   * if false, will preserve the log over multiple calls
   */
  autoReset = true;
  autoDump = DebugConfig.cms.autoDump;

  constructor() {
    super(logId, null);
  }

  /**
   * reset / clear the log
   */
  resetLog() {
    this.log = new Log(logId, null, 'log was reset');
  }

  run<T>(
    context: ContextBundleInstance | HTMLElement,
    nameOrSettings: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const realContext = isContextOfInstance(context)
      ? context
      : getContext(context);

    return this.do(() =>
      new CmsEngine(this.log).detectParamsAndRun(realContext, nameOrSettings, eventOrSettings, event));
  }

  /**
   * reset/clear the log if alwaysResetLog is true
   */
  private do<T>(innerCall: () => Promise<T>): Promise<T> {
    if (this.autoReset) this.resetLog();
    const result = innerCall();
    if (this.autoDump) console.log(this.log.dump());
    return result;
  }
}
