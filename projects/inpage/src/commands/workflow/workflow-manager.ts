import { WorkflowArguments, WorkflowPhases, WorkflowStep, WorkflowStepHelper } from '.';
import { SpecialCommands } from '..';
import { HasLog, Log } from '../../logging';
import { ToolbarWithWorkflow } from './toolbar-with-workflow';
import { WorkflowHelper } from './workflow-helper';
import { WorkflowPromiseFactory } from './workflow-step';
import { cancelled } from '../../quick-dialog/state';

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
            let promiseChain = Promise.resolve(wfArgs);
            // let previousArgs = wfArgs;
            // let interruptChain = false;
            for (let stepCount = 0; stepCount < stepsForCommand.length; stepCount++) {
                const nextStep = stepsForCommand[stepCount];
                promiseChain = promiseChain.then((resultingArgs) => {
                    return this.runNextPromiseIfNotCancelled(resultingArgs, wfArgs, nextStep.promise);
                    // make sure that empty resulting args will mean we continue with the previous ones
                    // resultingArgs = resultingArgs ?? previousArgs;
                    // // make sure that a simple 'false' will be treaded as cancel
                    // if (resultingArgs as unknown as boolean === false) {
                    //     interruptChain = true;
                    //     resultingArgs = { cancel: true, ...previousArgs };
                    // }
                    // if (resultingArgs?.cancel === true) interruptChain = true;

                    // // preserve for next iteration
                    // previousArgs = resultingArgs;

                    // return (interruptChain) ? emptyWorkflow(previousArgs) : nextStep.promise(previousArgs);
                });
            }

            promiseChain.then((finalArgs) => {
                resolve(finalArgs);
            });
            promiseChain.catch(reject);
        });
        return promise;
    }

    /** Attach a workflow to a toolbar */
    attach(node: HTMLElement) {
        if (!node) return;
        (node as ToolbarWithWorkflow).commandWorkflow = this;
    }

    static isCancelled(currentArgs: WorkflowArguments | boolean) {
        const cancel = this._isCancelled(currentArgs);
        console.log('is cancelled: ' + cancel, currentArgs);
        return cancel;
    }

    private static _isCancelled(currentArgs: WorkflowArguments | boolean) {
        // promise forgot to return anything, no cancel
        if (currentArgs == null) return false;

        // promise returned simple false, cancel
        if (currentArgs === false) return true;

        // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
        return (currentArgs as WorkflowArguments).cancel === true;
    }

    private runNextPromiseIfNotCancelled(currentArgs: WorkflowArguments | boolean, prevArgs: WorkflowArguments, nextFactory: WorkflowPromiseFactory) {
        // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
        const cancel = WorkflowManager.isCancelled(currentArgs);
        // make sure we have real arguments no matter what came in - assuming we have prevArgs
        currentArgs = (currentArgs && typeof(currentArgs) !== 'boolean') ? currentArgs : { ...prevArgs };
        // in case the cancel came as boolean, we must now set it on the currentArgs
        currentArgs.cancel = cancel;
        return cancel ? emptyWorkflow(currentArgs) : nextFactory(currentArgs);
    }

}

function emptyWorkflow(wfArgs: WorkflowArguments) {
    return Promise.resolve<WorkflowArguments>(wfArgs);
}
