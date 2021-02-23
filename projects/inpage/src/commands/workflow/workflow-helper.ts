import { ToolbarWithWorkflow, WorkflowManager } from '.';

let dummyWorkflowHelper: WorkflowManager;

export class WorkflowHelper {

    /**
     * Find the command workflow on a toolbar (or return null).
     * Will go upwards in the DOM to find the toolbar node which has the configuration stored
     */
    static getWorkflow(node: HTMLElement) {
        if (!node) return WorkflowHelper.getDummy();

        console.log('try to find command workflow on ', node);
        const maxParents = 100;
        let parentCount = 0;
        let current = node;
        while (current && parentCount++ < maxParents) {
            const cmdWf = (current as ToolbarWithWorkflow).commandWorkflow;
            if (cmdWf) return cmdWf;
            current = current.parentElement;
        }
        console.log('not found');
        return WorkflowHelper.getDummy();
    }

    private static getDummy() {
        if (!dummyWorkflowHelper) dummyWorkflowHelper = new WorkflowManager(null, true);
        return dummyWorkflowHelper;
    }

}
