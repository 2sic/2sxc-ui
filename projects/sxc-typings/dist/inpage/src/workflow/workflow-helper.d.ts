import { WorkflowStepCodeArguments, ToolbarWorkflowManager } from '.';
/**
 * Various helpers to get a workflow or determine result state
 *
 * @export
 * @class WorkflowHelper
 * @internal
 */
export declare class WorkflowHelper {
    /**
     * Find the command workflow on a toolbar (or return null).
     * Will go upwards in the DOM to find the toolbar node which has the configuration stored
     */
    static getWorkflow(node: HTMLElement): ToolbarWorkflowManager;
    /**
     * Get a dummy workflow manager
     *
     * @static
     * @returns {ToolbarWorkflowManager}
     * @memberof WorkflowHelper
     */
    static getDummyManager(): ToolbarWorkflowManager;
    /**
     * Determine if a workflow has been cancelled
     *
     * @static
     * @param {(WorkflowStepCodeArguments | boolean)} currentArgs
     * @returns {boolean}
     * @memberof WorkflowHelper
     */
    static isCancelled(currentArgs: WorkflowStepCodeArguments | boolean): boolean;
    private static _isCancelled;
}
