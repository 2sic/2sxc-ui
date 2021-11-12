import { WorkflowStep } from '../../workflow/workflow-step';
import { CommandParams } from '../command-params';

/**
 * WIP v12.10
 * Should extend the existing Command Params and at the same time ...?
 * @export
 * @interface RunParams
 * @extends {CommandParams}
 */
export interface RunParams /* extends CommandParams */ {

    /** The tag on which the run was triggered - it's used to give the command a context to start from */
    tag: HTMLElement;

    /** The action to perform, always required */
    action: string;

    /** todo */
    params?: CommandParams;

    /** The run command can also carry the event which triggered it (like the click) for further use */
    event?: MouseEvent;

    /** WIP v12.10 Workflow step would enable a command to also include workflow actions */
    workflowSteps: WorkflowStep | WorkflowStep[];
}

export function isRunParams(maybeRunParams: unknown): maybeRunParams is RunParams {
    return (maybeRunParams as RunParams).tag != null && (maybeRunParams as RunParams).action != null;
}
