import { ToolbarTypes } from '.';
import { WorkflowManager } from '../commands';

/**
 * Event arguments for toolbar events.
 */
export interface ToolbarEventArguments {
    /**
     * type of toolbar
     * - tag means it belongs to a tag, and was added as attribute. usually it's hovered
     * - standalone means that it's a toolbar that was added
     */
    type: ToolbarTypes;

    element: HTMLElement;

    // id: string;

    identifier: string;

    workflow: WorkflowManager;
}
