import { WorkflowManager } from '../workflow';

/**
 * Event arguments for toolbar events.
 */
export interface ToolbarEventArguments {
    /**
     * type of toolbar
     * - tag means it belongs to a tag, and was added as attribute. usually it's hovered
     * - standalone means that it's a toolbar that was added
     */

    // note: this was an idea, but we're not sure if it's actually needde, so don't use yet classic toolbar doesn't have this yet
    // type: ToolbarTypes;

    element: HTMLElement;

    identifier: string;

    workflow: WorkflowManager;
}
