import { WorkflowPhases, WorkflowStepCode } from '.';

/**
 * A workflow step (code-sequence) to run before/after specific events.
 */
export interface WorkflowStep {
  /**
   * The name of this step, in case it needs to be replaced or somehow controlled
   * Will be empty by default
   */
  name?: string;

  /**
   * The action this step is for, can be 'any', 'edit', etc.
   * Will be 'all' by default
   */
  command: string;

  /**
   * Action-phase being run, like 'all', 'before', 'after'
   * will be 'before' by default
   */
  phase?: WorkflowPhases;

  /**
   * Execution priority, higher comes first
   * Will be 1 by default.
   */
  priority?: number;

  /**
   * The code which is run, must be a promise-factory.
   * So it's a function that will return a promise.
   * Required.
   */
  code: WorkflowStepCode;
}
