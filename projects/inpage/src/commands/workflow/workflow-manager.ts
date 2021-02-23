import { WorkflowArguments, WorkflowPhases, WorkflowStep, WorkflowStepHelper } from '.';
import { SpecialCommands } from '..';
import { HasLog, Log } from '../../logging';
import { ToolbarWithWorkflow } from './toolbar-with-workflow';

export class WorkflowManager extends HasLog {

    /** The workflow steps registered here */
    steps: WorkflowStep[] = [];

    constructor(parentLog: Log, private isDummy = false) {
        super('Cmd.Wrkflw', parentLog);
    }

    add(step: WorkflowStep) {
        if (!step) throw "Trying to add workflow step but didn't get anything";
        console.log(`add step '${step.name}' for '${step.command}'-'${step.phase}'`);
        this.steps.push(WorkflowStepHelper.initDefaults(step));
    }

    run(wfArgs: WorkflowArguments): Promise<WorkflowArguments> {
        console.log(`run '${wfArgs.command}' for '${wfArgs.phase}'`);

        // if this is just a temporary / dummy workflow manager, just return a success-promise
        if (this.isDummy) return emptyWorkflow(wfArgs);

        // Find all steps to run
        const stepsForCommand = this.steps
            // only those of this command or all
            .filter((s) => s.command === wfArgs.command || s.command === SpecialCommands.all)
            .filter((s) => s.phase === wfArgs.phase || s.phase === WorkflowPhases.all)
            // only those having real code
            .filter((s) => s.promise)
            .sort((s) => s.priority);

        if (stepsForCommand.length === 0) return emptyWorkflow(wfArgs);

        // run in sequence but cancel at any time if necessary
        const promise = new Promise<WorkflowArguments>((resolve, reject) => {
            const innerChain = Promise.resolve(wfArgs);
            for (let stepCount = 0; stepCount < stepsForCommand.length; stepCount++) {
                const currentStep = stepsForCommand[stepCount];
                innerChain.then(currentStep.promise);
            }

            innerChain.then((finalArgs) => {
                resolve(finalArgs);
            });
            innerChain.catch(reject);
        });
        return promise;
    }

    /** Attach a workflow to a toolbar */
    attach(node: HTMLElement) {
        if (!node) return;
        (node as ToolbarWithWorkflow).commandWorkflow = this;
    }



}

function emptyWorkflow(wfArgs: WorkflowArguments) {
    return Promise.resolve<WorkflowArguments>(wfArgs);
}
