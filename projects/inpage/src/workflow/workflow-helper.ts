import { ToolbarWithWorkflow, WorkflowArguments, WorkflowManager } from '.';

let dummyWorkflowHelper: WorkflowManager;
const debug = false;
export class WorkflowHelper {

    /**
     * Find the command workflow on a toolbar (or return null).
     * Will go upwards in the DOM to find the toolbar node which has the configuration stored
     */
    static getWorkflow(node: HTMLElement) {
        if (!node) return WorkflowHelper.getDummy();

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
        return WorkflowHelper.getDummy();
    }

    static getDummy() {
        if (!dummyWorkflowHelper) dummyWorkflowHelper = new WorkflowManager(null, true);
        return dummyWorkflowHelper;
    }

    static isCancelled(currentArgs: WorkflowArguments | boolean) {
        const cancel = this._isCancelled(currentArgs);
        if (debug) console.log('is cancelled: ' + cancel, currentArgs);
        return cancel;
    }

    private static _isCancelled(currentArgs: WorkflowArguments | boolean) {
        // promise forgot to return anything, no cancel
        if (currentArgs == null) return false;

        // promise returned simple false, cancel
        if (currentArgs === false) return true;

        // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
        return (currentArgs as WorkflowArguments).cancel === true;
    }

}
