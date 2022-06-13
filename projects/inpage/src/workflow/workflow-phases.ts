/**
 * Phases / events of a specific workflow.
 * @export
 * @enum {number}
 */
export enum WorkflowPhases {
  /**
   * Run at every phase - before and after events/commands
   */
  all = 'all',

  /**
   * Run before a specific event / command
   */
  before = 'before',

  /**
   * Run after a specific event / command
   */
  after = 'after',
}
