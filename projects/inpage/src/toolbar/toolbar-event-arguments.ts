import { ToolbarTypes } from '.';
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

    // TODO: classic toolbar doesn't have this yet
    type: ToolbarTypes;

    element: HTMLElement;

    identifier: string;

    workflow: WorkflowManager;
}
