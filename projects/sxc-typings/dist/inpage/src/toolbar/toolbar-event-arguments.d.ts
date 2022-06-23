import { ToolbarWorkflowManager } from '../workflow';
/**
 * Event arguments for toolbar events.
 * @internal
 */
export interface ToolbarEventArguments {
    /**
     * type of toolbar
     * - tag means it belongs to a tag, and was added as attribute. usually it's hovered
     * - standalone means that it's a toolbar that was added
     */
    element: HTMLElement;
    identifier: string;
    workflow: ToolbarWorkflowManager;
}
