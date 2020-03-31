import { CmsEngine } from '../commands/';
import { CommandParams } from '../commands/command-params';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../context/bundles/context-bundle-instance';
import { HasLog, Insights, Log } from '../logging';

const logId = 'Cms.Api';

export class Cms extends HasLog {
    /**
     * if true (default) will reset the log everytime something is done
     * if false, will preserve the log over multiple calls
     */
    // autoReset = true;
    autoDump = C.Debug.cms.autoDump;

    constructor() {
        super(logId, null);
    }

    /**
     * reset / clear the log
     */
    resetLog() {
        this.log = new Log(logId, null, 'log was reset');
        Insights.add('cms', 'run', this.log);
    }

    run<T>(
        context: ContextBundleInstance | HTMLElement,
        nameOrSettings: string | CommandParams,
        eventOrSettings?: CommandParams | MouseEvent,
        event?: MouseEvent,
    ): Promise<void | T> {
        const cl = this.log.call('run<T>');
        const realCtx = ContextBundleInstance.is(context)
            ? context
            : ContextComplete.findContext(context);

        const result: Promise<void | T> = this.do(() =>
            new CmsEngine(this.log)
                .detectParamsAndRun(realCtx, nameOrSettings, eventOrSettings, event));
        return cl.return(result, 'ok');
    }

    /**
     * reset/clear the log if alwaysResetLog is true
     */
    private do<T>(innerCall: () => Promise<T>): Promise<T> {
        const cl = this.log.call('do');
        this.resetLog();
        const result = innerCall();
        if (this.autoDump) this.log.dump();
        return cl.return(result);
    }
}
