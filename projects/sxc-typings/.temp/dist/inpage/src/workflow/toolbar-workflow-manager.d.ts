import { WorkflowStep, WorkflowStepCodeArguments } from '.';
import { ContextComplete } from '../context';
import { HasLog, Log } from '../core';
/**
 * A workflow manager _of a Toolbar_ which will run stuff before / after commands.
 * When toolbars are created, they will add a Manager and then raise an event for in-page code to add workflow steps.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 */
export declare class ToolbarWorkflowManager extends HasLog {
    private isDummy;
    /**
     * The workflow steps registered on this toolbar
     * @internal
     */
    steps: WorkflowStep[];
    /**
     * @internal
     */
    constructor(parentLog: Log, isDummy?: boolean);
    /**
     * Register one or many [workflow-steps](xref:Api.Js.SxcJs.WorkflowStep) to the toolbar, to use if toolbar commands are executed.
     */
    add(steps: WorkflowStep | WorkflowStep[]): void;
    /**
     * Add a single workflow step to this manager
     * @internal
     */
    private addOne;
    /**
     * Run a workflow.
     * @internal
     * @returns {Promise<WorkflowStepCodeArguments>} This will let you chain what happens. The arguments contain a status if it should be cancelled.
     */
    run(wfArgs: WorkflowStepCodeArguments): Promise<WorkflowStepCodeArguments>;
    /**
     * Attach a workflow to a toolbar.
     * Will be used at start to hook this manager to the toolbar.
     * Then the init-event will be called to allow adding steps.
     * @internal
     */
    attach(node: HTMLElement, context: ContextComplete): void;
    /**
     *
     * @param currentArgs
     * @param prevArgs
     * @param nextFactory
     * @returns
     * @internal
     */
    private runNextPromiseIfNotCancelled;
}
