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
