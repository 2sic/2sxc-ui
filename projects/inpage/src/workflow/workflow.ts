import { WorkflowPhases, WorkflowArguments } from '.';
import { SpecialCommands } from '../commands';

export type PromiseFactory<T> = (args: T) => Promise<T>;

export type WorkflowPromiseFactory = PromiseFactory<WorkflowArguments>;

export type WorkflowCode = (args: WorkflowArguments) => WorkflowArguments;

/**
 * A workflow (code-sequence) to run before/after specific events.
 *
 * @export
 * @interface Workflow
 */
export interface Workflow {
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
     * Action-phase being run, like 'init', 'before', 'after', 'cancel'
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
    code: WorkflowCode;
}

export class WorkflowStepHelper {
    static initDefaults(step: Workflow) {
        step.name = step.name ?? '';
        step.command = step.command ?? SpecialCommands.all;
        step.phase = step.phase ?? WorkflowPhases.before;
        step.priority = step.priority ?? 1;
        if (!step.code || typeof(step.code) !== 'function') throw `Tried preparing a workflow step, but the promise either doesn't exist or is not a promise factory`;
        return step;
    }
}
