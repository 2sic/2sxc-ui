import { ToolbarWorkflowManager } from '.';
/**
 * Simple interface to extend a HtmlElement with Workflow Manager
 *
 * @export
 * @interface ToolbarWithWorkflow
 * @extends {HTMLElement}
 * @internal
 */
export interface ToolbarWithWorkflow extends HTMLElement {
    commandWorkflow: ToolbarWorkflowManager;
}
