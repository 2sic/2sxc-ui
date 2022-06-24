import { WorkflowPhases, WorkflowStep, WorkflowStepCodeArguments, WorkflowStepHelper } from '.';
import { WorkflowCommands } from '../commands';
import { ContextComplete } from '../context';
import { HasLog, Insights, Log } from '../core';
import { ToolbarWithWorkflow } from './toolbar-with-workflow';
import { WorkflowHelper } from './workflow-helper';

/**
 * A workflow manager _of a Toolbar_ which will run stuff before / after commands.
 * When toolbars are created, they will add a Manager and then raise an event for in-page code to add workflow steps.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 * @public
 */
export class ToolbarWorkflowManager extends HasLog {

  /**
   * The workflow steps registered on this toolbar
   * @internal
   */
  steps: WorkflowStep[] = [];

  /**
   * @internal
   */
  constructor(parentLog: Log, private isDummy = false) {
    super('Cmd.Wrkflw', parentLog, 'constructor');
  }

  /**
   * Register one or many [workflow-steps](xref:Api.Js.SxcJs.WorkflowStep) to the toolbar, to use if toolbar commands are executed.
   */
  // @publicApi("Used publicly on the Workflow-object in toolbar-init")
  add(steps: WorkflowStep | WorkflowStep[]) {
    if (!steps) return;
    if (Array.isArray(steps)) {
      steps.forEach((s) => this.addOne(s));
    } else
      this.addOne(steps);
  }

  /**
   * Add a single workflow step to this manager
   * @internal
   */
  private addOne(step: WorkflowStep) {
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
   * @internal
   * @returns This will let you chain what happens. The arguments contain a status if it should be cancelled.
   */
  run(wfArgs: WorkflowStepCodeArguments): Promise<WorkflowStepCodeArguments> {
    const cl = this.log.call('run', `'${wfArgs.command}' for '${wfArgs.phase}'`);

    // if this is just a temporary / dummy workflow manager, just return a success-promise
    if (this.isDummy) {
      cl.done('Dummy workflow, nothing to run, will return a resolved promise');
      return emptyWorkflow(wfArgs);
    }

    // Find all steps to run
    const stepsForCommand = this.steps
      // only those of this command or all
      .filter((s) => s.command === wfArgs.command || s.command === WorkflowCommands.all)
      .filter((s) => s.phase === wfArgs.phase || s.phase === WorkflowPhases.all)
      // only those having real code
      .filter((s) => s.code)
      .sort((s) => s.priority);

    if (stepsForCommand.length === 0) {
      cl.done('no steps found for this command / phase, will return a resolved promise');
      return emptyWorkflow(wfArgs);
    }

    // run in sequence but cancel at any time if necessary
    const promise = new Promise<WorkflowStepCodeArguments>((resolve, reject) => {
      let promiseChain = Promise.resolve(wfArgs);
      // let previousArgs = wfArgs;
      // let interruptChain = false;
      for (let stepCount = 0; stepCount < stepsForCommand.length; stepCount++) {
        const nextStep = stepsForCommand[stepCount];
        promiseChain = promiseChain.then((resultingArgs) => {
          return this.runNextPromiseIfNotCancelled(resultingArgs, wfArgs, nextStep.code);
        });
      }

      promiseChain.then((finalArgs) => { resolve(finalArgs); });
      promiseChain.catch(reject);
    });
    return promise;
  }

  /**
   * Attach a workflow to a toolbar.
   * Will be used at start to hook this manager to the toolbar.
   * Then the init-event will be called to allow adding steps.
   * @internal
   */
  attach(node: HTMLElement, context: ContextComplete) {
    const cl = this.log.call('attach');
    if (!node) return;
    (node as ToolbarWithWorkflow).commandWorkflow = this;
    Insights.add('workflow', context.toolbar?.identifier, this.log);
    cl.done();
  }

  /**
   *
   * @internal
   */
  private runNextPromiseIfNotCancelled(currentArgs: WorkflowStepCodeArguments | boolean, prevArgs: WorkflowStepCodeArguments, nextFactory: WorkflowStep['code']) {
    // determine cancel based on either a boolean result or a real WorkflowArguments with cancel.
    const cancel = WorkflowHelper.isCancelled(currentArgs);
    // make sure we have real arguments no matter what came in - assuming we have prevArgs
    currentArgs = (currentArgs && typeof(currentArgs) !== 'boolean') ? currentArgs : { ...prevArgs };
    // in case the cancel came as boolean, we must now set it on the currentArgs
    currentArgs.cancel = cancel;
    return cancel ? emptyWorkflow(currentArgs) : nextFactory(currentArgs);
  }

}

function emptyWorkflow(wfArgs: WorkflowStepCodeArguments) {
  return Promise.resolve<WorkflowStepCodeArguments>(wfArgs);
}
