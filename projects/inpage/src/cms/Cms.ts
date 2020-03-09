import { Engine } from '../commands/engine';
import { Settings } from '../commands/settings';
import { context as getContext } from '../context/context';
import {
  ContextOfInstance,
  isContextOfInstance,
} from '../context/context-of-instance';
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

  run(
    context: ContextOfInstance | HTMLElement,
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings?: Partial<Settings> | MouseEvent,
    event?: MouseEvent,
  ): Promise<any> {
    const realContext = isContextOfInstance(context)
      ? context
      : getContext(context);

    return this.do(() =>
      new Engine(this.log).detectParamsAndRun(
        realContext,
        nameOrSettings,
        eventOrSettings,
        event,
      ),
    );
  }

  /**
   * reset/clear the log if alwaysResetLog is true
   */
  private do(innerCall: () => Promise<any>): Promise<any> {
    if (this.autoReset) this.resetLog();
    const result = innerCall();
    if (this.autoDump) console.log(this.log.dump());
    return result;
  }
}
