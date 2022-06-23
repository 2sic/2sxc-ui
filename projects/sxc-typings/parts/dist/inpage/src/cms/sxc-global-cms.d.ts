import { CommandParams, RunParamsWithContext } from '../../../$2sxc/src/cms';
import { ContextBundleInstance } from '../context/bundles/context-bundle-instance';
import { HasLog } from '../core';
/**
 * Global Content-Management System on the $2sxc.cms.
 *
 * It is only available if the page is in edit mode / the page feature `2sxc.JsCms` has been activated.
 */
export declare class SxcGlobalCms extends HasLog {
    /**
     * @internal
     */
    autoDump: boolean;
    /**
     * @internal
     */
    constructor();
    /**
     * reset / clear the log
     * @internal
     */
    resetLog(): void;
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
     * Run a command within a specific context.
     * @param context The context - either an HTML tag which determines a module/instance, or an Sxc instance
     * @param nameOrSettings
     * @param eventOrSettings
     * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
     * @returns A promise which triggers when the command has completed.
     * @internal
     */
    runInternal<T>(context: ContextBundleInstance | HTMLElement | RunParamsWithContext, nameOrSettings?: string | CommandParams, eventOrSettings?: CommandParams | MouseEvent, event?: MouseEvent): Promise<void | T>;
    /**
     * reset/clear the log if alwaysResetLog is true
     * @internal
     */
    private do;
}
