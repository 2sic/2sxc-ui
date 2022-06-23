import { WorkflowPhases } from '.';
import { ContextComplete } from '../context';
/**
 * Arguments for [WorkflowStepCode](xref:Api.Js.SxcJs.WorkflowStepCode).
 * Will be passed to your code and should also be returned by your code.
 * This also allows cancelling further execution.
 * @export
 */
export declare class WorkflowStepCodeArguments {
    /**
     * Name this workflow is running for
     */
    command: string;
    /**
     * The phase it's in (before, after, etc.)
     */
    phase: WorkflowPhases;
    /**
     * Context of the current command / step being run
     */
    context: ContextComplete;
    /**
     * Result in after-phases of the workflow
     * BETA - never really tested this
     */
    result: unknown;
    /**
     * @internal
     */
    constructor(
    /**
     * Name this workflow is running for
     */
    command: string, 
    /**
     * The phase it's in (before, after, etc.)
     */
    phase: WorkflowPhases, 
    /**
     * Context of the current command / step being run
     */
    context: ContextComplete, 
    /**
     * Result in after-phases of the workflow
     * BETA - never really tested this
     */
    result?: unknown);
    /**
     * If the workflow should be cancelled.
     * Can be set by any workflow step.
     * If set to true, following steps / workflows will not run.
     */
    cancel: boolean;
}
