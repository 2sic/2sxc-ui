import { ContextIdentifier, isContextIdentifier } from '../../../../$2sxc/src';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
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

    /**
     * The tag on which the run was triggered - it's used to give the command a context to start from
     * We always need the tag OR the context, but never both
     */
    tag?: HTMLElement;

    /**
     * The context to run in, basically containing module id, etc.
     * We always need the tag OR the context, but never both
     */
    context?: SxcEdit | ContextIdentifier;

    /** The action to perform. Required if you don't have params which themselves have the action */
    action?: string;

    /** The command params, like contentType, entityId etc. */
    params?: CommandParams;

    /** The event which triggered this command - sometimes useful internally further use */
    event?: MouseEvent;

    /** Workflows work the same way as with a toolbar, except that they are added here and not registered on init */
    workflows?: Workflow | Workflow[];
}

/**
 * Checks if the run params are complete, as would be used in the $2sxc.cms.run
 */
export function is$sxcRunParams(o: unknown): o is RunParams {
    const t = o as RunParams;
    return (t.tag != null || (t.context != null && (isContextIdentifier(t.context) || SxcEdit.is(t.context)))) &&
        isInstanceRunParams(t);
}

/**
 * Checks if it's at least an instance run param - having at least `action` or `params`
 */
export function isInstanceRunParams(maybeRunParams: unknown): maybeRunParams is RunParams {
    const typed = maybeRunParams as RunParams;
    return (typed.action != null || typed.params != null);
}

const runContextInstanceMinimalRequirements = "'action' and/or 'params'";
const errPrefix = 'sxc instance run() expects runParams';

export function ensureInstanceRunParamsOrError(runParams: RunParams) {
    if (!isInstanceRunParams(runParams))
        throw `${errPrefix} with at least ${runContextInstanceMinimalRequirements}`;
    if (runParams.context)
        throw `${errPrefix} without 'context' since it already provides the context`;
}
