import { WorkflowManager } from './workflow-manager';

export interface ToolbarWithWorkflow extends HTMLElement {
    commandWorkflow: WorkflowManager;
}
