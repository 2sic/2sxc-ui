import { ContextIdentifier, Sxc } from '..';
import { CommandParams } from './command-params';

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
   * Workflows work the same way as with a toolbar, except that they are added here and not registered on init.
   * Because of limitations in automatic documentation, the type here is set to `unknown` but it's actually `WorkflowStep` | `WorkflowStep[]`
   */
  workflows?: unknown;
}

/**
 * Parameters for the Global cms.run(...) command in Addition to the RunParams.
 * It provides context to the run-params such as a Sxc instance or a tag which it started on.
 * New in 12.10
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
