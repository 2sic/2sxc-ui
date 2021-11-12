import { WorkflowPhases, WorkflowStep, WorkflowStepArguments, WorkflowStepHelper } from '.';
import { SpecialCommands } from '../commands';
import { ContextComplete } from '../context';
import { HasLog, Insights, Log } from '../logging';
import { ToolbarWithWorkflow } from './toolbar-with-workflow';
import { WorkflowHelper } from './workflow-helper';
import { WorkflowCode } from './workflow-step';

/**
 * A workflow manager which will run stuff before / after commands.
 * As of now, it must be attached to a toolbar to take effect.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps
 */
export class WorkflowManager extends HasLog {

    /** The workflow steps registered here */
    steps: WorkflowStep[] = [];

    constructor(parentLog: Log, private isDummy = false) {
        super('Cmd.Wrkflw', parentLog, 'constructor');
    }

    /**
     * Add a workflow step to this manager
     */
    add(step: WorkflowStep) {
        step = WorkflowStepHelper.initDefaults(step);
        const cl = this.log.call('add', `'${step.name}' for '${step.command}'-'${step.phase}'`);
        if (!step) {
            const errorMsg = "Trying to add workflow step but didn't get anything";
            cl.add(errorMsg);
            throw errorMsg;
        }
        this.steps.push(step);
        cl.done();
    }

    /**
     * Run a workflow.
     * @returns {Promise<WorkflowStepArguments>} This will let you chain what happens. The arguments contain a status if it should be cancelled.
     */
    run(wfArgs: WorkflowStepArguments): Promise<WorkflowStepArguments> {
        const cl = this.log.call('run', `'${wfArgs.command}' for '${wfArgs.phase}'`);

        // if this is just a temporary / dummy workflow manager, just return a success-promise
        if (this.isDummy) {
            cl.done('Dummy workflow, nothing to run, will return a resolved promise');
            return emptyWorkflow(wfArgs);
        }

        // Find all steps to run
        const stepsForCommand = this.steps
            // only those of this command or all
            .filter((s) => s.command === wfArgs.command || s.command === SpecialCommands.all)
            .filter((s) => s.phase === wfArgs.phase || s.phase === WorkflowPhases.all)
            // only those having real code
            .filter((s) => s.code)
            .sort((s) => s.priority);

        if (stepsForCommand.length === 0) {
            cl.done('no steps found for this command / phase, will return a resolved promise');
            return emptyWorkflow(wfArgs);
        }

        // run in sequence but cancel at any time if necessary
        const promise = new Promise<WorkflowStepArguments>((resolve, reject) => {
            let promiseChain = Promise.resolve(wfArgs);
            // let previousArgs = wfArgs;
            // let interruptChain = false;
            for (let stepCount = 0; stepCount < stepsForCommand.length; stepCount++) {
                const nextStep = stepsForCommand[stepCount];
                promiseChain = promiseChain.then((resultingArgs) => {
                    return this.runNextPromiseIfNotCancelled(resultingArgs, wfArgs, nextStep.code);
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
    attach(node: HTMLElement, context: ContextComplete) {
        const cl = this.log.call('attach');
        if (!node) return;
        (node as ToolbarWithWorkflow).commandWorkflow = this;
        Insights.add('workflow', context.toolbar?.identifier, this.log);
        cl.done();
    }

    private runNextPromiseIfNotCancelled(currentArgs: WorkflowStepArguments | boolean, prevArgs: WorkflowStepArguments, nextFactory: WorkflowCode) {
        // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
        const cancel = WorkflowHelper.isCancelled(currentArgs);
        // make sure we have real arguments no matter what came in - assuming we have prevArgs
        currentArgs = (currentArgs && typeof(currentArgs) !== 'boolean') ? currentArgs : { ...prevArgs };
        // in case the cancel came as boolean, we must now set it on the currentArgs
        currentArgs.cancel = cancel;
        return cancel ? emptyWorkflow(currentArgs) : nextFactory(currentArgs);
    }

}

function emptyWorkflow(wfArgs: WorkflowStepArguments) {
    return Promise.resolve<WorkflowStepArguments>(wfArgs);
}
