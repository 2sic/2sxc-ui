import { ContextIdentifier, Sxc } from '../../../$2sxc/src';
import { CommandParams } from '../commands/command-params';
import { WorkflowStep } from '../workflow';

/**
 * Parameters for the Instance cms.run(...) command.
 * New in 13.03
 */
export interface RunParams {
  /**
   * The action to perform.
   * Required if you don't have params which themselves have the action
   */
  action?: string;

  /**
   * The command params, like contentType, entityId etc.
   * Optional for many actions, but can themselves also contain the property `action`, in which case action can be ommited.
   */
  params?: CommandParams;

  /**
   * The event which triggered this command - sometimes useful internally further use.
   * Optional in most cases, but in some cases it will improve the behavior of the code.
   */
  event?: MouseEvent;

  /**
   * Workflows work the same way as with a toolbar, except that they are added here and not registered on init
   */
  workflows?: WorkflowStep | WorkflowStep[];
}

/**
 * Parameters for the Global cms.run(...) command in Addition to the RunParams
 * New in 12.10
 * @internal
 */
export interface RunParamsWithContext extends RunParams {
  /**
   * The tag on which the run was triggered - it's used to give the command a context to start from
   * We always need the tag OR the context, but never both
   */
  tag?: HTMLElement;

  /**
   * The context to run in, basically containing module id, etc.
   * We always need the tag OR the context, but never both
   */
  context?: Sxc | ContextIdentifier;
}

/**
 * Checks if the run params are complete, as would be used in the $2sxc.cms.run
 * @internal
 */
export function is$sxcRunParams(o: unknown): o is RunParamsWithContext {
  const t = o as RunParamsWithContext;
  return (t.tag != null || (t.context != null && (ContextIdentifier.is(t.context) || Sxc.is(t.context)))) &&
    isRunParamsInstance(t);
}

/**
 * Checks if it's at least an instance run param - having at least `action` or `params`
 * @internal
 */
export function isRunParamsInstance(maybeRunParams: unknown): maybeRunParams is RunParams {
  const typed = maybeRunParams as RunParams;
  return (typed.action != null || typed.params != null);
}

const runContextInstanceMinimalRequirements = "'action' and/or 'params'";
const errPrefix = 'sxc instance run() expects runParams';

/**
 * @internal
 */
export function ensureRunParamsInstanceOrError(runParams: RunParamsWithContext) {
  if (!isRunParamsInstance(runParams))
    throw `${errPrefix} with at least ${runContextInstanceMinimalRequirements}`;
  if (runParams.context)
    throw `${errPrefix} without 'context' since it already provides the context`;
}
