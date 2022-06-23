import { RunParams } from '../../../../$2sxc/src/cms';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { HasLog, Log } from '../../core';
import { CommandParams } from '../../../../$2sxc/src/cms';
declare type CommandPromise<T> = Promise<T | void>;
/**
 * The CMS engine is global, and needs the context to work.
 * @internal
 */
export declare class CmsEngine extends HasLog {
    private runParamsHelper;
    constructor(parentLog?: Log);
    detectParamsAndRun<T>(context: ContextBundleInstance, nameOrParams: string | CommandParams, eventOrParams: CommandParams | MouseEvent, event?: MouseEvent): Promise<void | T>;
    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    run<T>(context: ContextComplete, nameOrParams: string | CommandParams, event: MouseEvent, wipParamsWithWorkflow?: RunParams): CommandPromise<T>;
    /**
     * Open a new dialog of the angular-ui
     */
    static openDialog<T>(context: ContextComplete, event: MouseEvent): CommandPromise<T>;
}
export {};
