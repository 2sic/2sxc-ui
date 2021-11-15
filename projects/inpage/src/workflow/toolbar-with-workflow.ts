import { WorkflowManager } from '.';

/**
 * Simple interface to extend a HtmlElement with Workflow Manager
 *
 * @export
 * @interface ToolbarWithWorkflow
 * @extends {HTMLElement}
 */
export interface ToolbarWithWorkflow extends HTMLElement {
    commandWorkflow: WorkflowManager;
}
