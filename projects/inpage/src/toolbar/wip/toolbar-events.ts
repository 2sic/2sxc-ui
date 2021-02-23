
// TODO: MAYBE NOT USED - MAYBE REMOVE OR SYNC WITH WORKFLOW STUFF

import { WorkflowManager } from '../../commands';
export interface ToolbarEventParams {

    type: 'tag' | 'default';

    element: HTMLElement;

    id: string;

    identifier: string;

    workflow: WorkflowManager;
}
