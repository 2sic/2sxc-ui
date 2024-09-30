import { Sxc } from '../../../$2sxc/src/sxc/sxc';
import { ContextIdentifier } from '../../../$2sxc/src/sxc-global/context-identifier';
import { RunParamsWithContext } from '../../../$2sxc/src/cms/run-params';
import { CommandParams } from '../../../$2sxc/src/cms/command-params';
import { CmsEngine } from '../commands';
import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../context/bundles/context-bundle-instance';
import { HasLog, Insights, Log } from '../core';
import { RunParamsHelpers } from './run-params-helpers';

const logId = 'Cms.Api';

/**
 * Global Content-Management System on the $2sxc.cms.
 *
 * It is only available if the page is in edit mode / the page feature `2sxc.JsCms` has been activated.
 * @public
 */
// Note that it can be used standalone, not just on $2sxc, as it doesn't directly rely on that.
export class SxcGlobalCms extends HasLog {
  /**
   * @internal
   */
  autoDump = C.Debug.cms.autoDump;

  /**
   * @internal
   */
  constructor() {
    super(logId, null);
  }

  /**
   * reset / clear the log
   * @internal
   */
  resetLog() {
    this.log = new Log(logId, null, 'log was reset');
    Insights.add('cms', 'run', this.log);
  }


  /**
   * Run a command within a specific context - mostly for internal use.
   * @param runParams The complete run params with a context
   * @returns A promise which triggers when the command has completed.
   */
  run<T>(runParams: RunParamsWithContext): Promise<void | T>;


  /**
   * Run a command within a specific context.
   * @param tag The context providing tag - an HTML tag inside a module/content-block
   * @param action command-name (action)
   * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
   * @returns A promise which triggers when the command has completed.
   */
  run<T>(tag: HTMLElement, action: string, event?: MouseEvent): Promise<void | T>;

  /**
   * Run a command within a specific context.
   * @param tag The context providing tag - an HTML tag inside a module/content-block
   * @param action command-name (action)
   * @param params an object containing the the command-params
   * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
   * @returns A promise which triggers when the command has completed.
   */
  run<T>(tag: HTMLElement, action: string, params?: CommandParams, event?: MouseEvent): Promise<void | T>;

  /**
   * Run a command within a specific context.
   * @param tag The context providing tag - an HTML tag inside a module/content-block
   * @param commandParams an object containing the the command-params as well as the command-name (action)
   * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
   * @returns A promise which triggers when the command has completed.
   */
  run<T>(tag: HTMLElement, commandParams: CommandParams, event?: MouseEvent): Promise<void | T>;

  /**
   * Run - full signature, internal use, not publicly documented; only included because docs-generator needs it.
   * Please use other signatures with more specific parameter types
   */
  run<T>(
    context: HTMLElement | RunParamsWithContext,
    nameOrSettings?: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    return this.runInternal(context, nameOrSettings, eventOrSettings, event, "sxcGlobalCms.run");
  }

  /**
   * Run a command within a specific context.
   * @param context The context - either an HTML tag which determines a module/instance, or an Sxc instance
   * @param nameOrSettings
   * @param eventOrSettings
   * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
   * @returns A promise which triggers when the command has completed.
   * @internal
   */
  runInternal<T>(
    context: ContextBundleInstance | HTMLElement | RunParamsWithContext,
    nameOrSettings?: string | CommandParams,
    eventOrSettings?: CommandParams | MouseEvent,
    event?: MouseEvent,
    triggeredBy?: string,
  ): Promise<void | T> {
    const cl = this.log.call('run<T>2', `triggeredBy: ${triggeredBy}`);

    const cmsEngine = new CmsEngine(this.log);

    // Figure out inner-call based on if context is new RunParams or not (in that case it should be a tag or a full context)
    let innerCall: () => Promise<void>;
    if (RunParamsHelpers.is$sxcRunParams(context)) {
      // V1 which has RunParamsWithContext all in the first parameter
      const contextGiver = (ContextIdentifier.is(context.context) || Sxc.is(context.context))
        ? window.$2sxc(context.context)
        : context.tag;
      const realCtx = ContextComplete.findContext(contextGiver);
      context.params = { action: context.action, ...context.params };
      innerCall = () => cmsEngine.run(realCtx, context.params, context.event, context, 'sxcGlobalCms.runInternal');
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
   * @internal
   */
  private do<T>(innerCall: () => Promise<T>): Promise<T> {
    const cl = this.log.call('do');
    this.resetLog();
    const result = innerCall();
    if (this.autoDump) this.log.dump();
    return cl.return(result);
  }
}
