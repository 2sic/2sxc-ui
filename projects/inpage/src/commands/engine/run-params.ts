import { Workflow } from '../../workflow/workflow';
import { CommandParams } from '../command-params';

/**
 * Parameters for the cms.run(...) command.
 * New in 12.10
 * @export
 * @interface RunParams
 * @extends {CommandParams}
 */
export interface RunParams {

    /** The tag on which the run was triggered - it's used to give the command a context to start from */
    tag: HTMLElement;

    /** The action to perform. Required if you don't have params which themselves have the action */
    action?: string;

    /** The command params, like contentType, entityId etc. */
    params?: CommandParams;

    /** The event which triggered this command - sometimes useful internally further use */
    event?: MouseEvent;

    /** Workflows work the same way as with a toolbar, except that they are added here and not registered on init */
    workflows?: Workflow | Workflow[];
}

export function isRunParams(maybeRunParams: unknown): maybeRunParams is RunParams {
    const typed = maybeRunParams as RunParams;
    return typed.tag != null && (typed.action != null || typed.params != null);
}