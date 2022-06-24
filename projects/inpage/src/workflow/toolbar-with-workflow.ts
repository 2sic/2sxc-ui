import { ToolbarWorkflowManager } from '.';

/**
 * Simple interface to extend a HtmlElement with Workflow Manager
 *
 * @internal
 */
export interface ToolbarWithWorkflow extends HTMLElement {
    commandWorkflow: ToolbarWorkflowManager;
}
