import { WorkflowPhases, WorkflowStep } from '.';
import { WorkflowCommands } from '../commands';

/**
 * @internal
 */
export class WorkflowStepHelper {
  static initDefaults(step: WorkflowStep) {
    step.name = step.name ?? '';
    step.command = step.command ?? WorkflowCommands.all;
    step.phase = step.phase ?? WorkflowPhases.before;
    step.priority = step.priority ?? 1;
    if (!step.code || typeof(step.code) !== 'function')
      throw "Tried preparing a workflow step, but the promise either doesn't exist or is not a promise factory";
    return step;
  }
}
