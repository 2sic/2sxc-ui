import { ContextIdentifier, Sxc } from '../../../$2sxc/src';
import { CmsEngine } from '../commands/';
import { CommandParams } from '../commands/command-params';
import { is$sxcRunParams, RunParamsWithContext } from '../commands/engine/run-params';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../context/bundles/context-bundle-instance';
import { SxcRoot } from '../interfaces/sxc-controller-in-page';
import { HasLog, Insights, Log } from '../logging';

const logId = 'Cms.Api';
/**
 * @internal
 */
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
        context: ContextBundleInstance | HTMLElement | RunParamsWithContext,
        nameOrSettings?: string | CommandParams,
        eventOrSettings?: CommandParams | MouseEvent,
        event?: MouseEvent,
    ): Promise<void | T> {
        const cl = this.log.call('run<T>');

        const cmsEngine = new CmsEngine(this.log);

        // Figure out inner-call based on if context is new RunParams or not (in that case it should be a tag or a full context)
        let innerCall: () => Promise<void>;
        if (is$sxcRunParams(context)) {
            // V1 with Context
            const contextGiver = (ContextIdentifier.is(context.context) || Sxc.is(context.context))
                ? (window.$2sxc as SxcRoot)(context.context)
                : context.tag;
            const realCtx = ContextComplete.findContext(contextGiver);
            context.params = { action: context.action, ...context.params };
            innerCall = () => cmsEngine.run(realCtx, context.params, context.event, context);
        } else {
            const realCtx = ContextBundleInstance.is(context)
                ? context
                : ContextComplete.findContext(context);

            innerCall = () => cmsEngine.detectParamsAndRun(realCtx, nameOrSettings, eventOrSettings, event);
        }

        const result: Promise<void | T> = this.do(innerCall);
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
