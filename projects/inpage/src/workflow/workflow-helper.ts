import { ToolbarWithWorkflow, ToolbarWorkflowManager, WorkflowStepCodeArguments } from '.';

let dummyWorkflowManager: ToolbarWorkflowManager;
const debug = false;

/**
 * Various helpers to get a workflow or determine result state
 *
 * @class WorkflowHelper
 * @internal
 */
export class WorkflowHelper {

    /**
     * Find the command workflow on a toolbar (or return null).
     * Will go upwards in the DOM to find the toolbar node which has the configuration stored
     */
    static getWorkflow(node: HTMLElement): ToolbarWorkflowManager {
        if (!node) return WorkflowHelper.getDummyManager();

        if (debug) console.log('try to find command workflow on ', node);
        const maxParents = 100;
        let parentCount = 0;
        let current = node;
        while (current && parentCount++ < maxParents) {
            const cmdWf = (current as ToolbarWithWorkflow).commandWorkflow;
            if (cmdWf) return cmdWf;
            current = current.parentElement;
        }
        if (debug) console.log('not found, will return dummy');
        return WorkflowHelper.getDummyManager();
    }

    /**
     * Get a dummy workflow manager
     *
     * @static
     * @returns {ToolbarWorkflowManager}
     * @memberof WorkflowHelper
     */
    static getDummyManager(): ToolbarWorkflowManager {
        if (!dummyWorkflowManager) dummyWorkflowManager = new ToolbarWorkflowManager(null, true);
        return dummyWorkflowManager;
    }

    /**
     * Determine if a workflow has been cancelled
     *
     * @static
     * @param {(WorkflowStepCodeArguments | boolean)} currentArgs
     * @returns {boolean}
     * @memberof WorkflowHelper
     */
    static isCancelled(currentArgs: WorkflowStepCodeArguments | boolean): boolean {
        const cancel = this._isCancelled(currentArgs);
        if (debug) console.log('is cancelled: ' + cancel, currentArgs);
        return cancel;
    }

    private static _isCancelled(currentArgs: WorkflowStepCodeArguments | boolean): boolean {
        // promise forgot to return anything, no cancel
        if (currentArgs == null) return false;

        // promise returned simple false, cancel
        if (currentArgs === false) return true;

        // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
        return (currentArgs as WorkflowStepCodeArguments).cancel === true;
    }

}
