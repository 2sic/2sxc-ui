import { RunParams } from '../../../../$2sxc/src/cms/run-params';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HasLog, Log } from '../../core';
import { ButtonConfiguration, ButtonSafe } from '../../toolbar/config';
import { WorkflowHelper, WorkflowPhases, WorkflowStepCodeArguments } from '../../workflow';
import { ToolbarWorkflowManager } from '../../workflow/toolbar-workflow-manager';
import { WorkflowStep } from '../../workflow/workflow-step';
import { CommandCode } from '../command-code';

const debug = false;

/**
 * The CMS engine is global, and needs the context to work.
 * @internal
 */
export class CmsWorkflow extends HasLog {

  constructor(parentLog?: Log) {
    super('Cmd.WF', parentLog, 'start');
  }

  wrapInWorkflow<T>(name: string, commandPromise: CommandCode, button: ButtonConfiguration, context: ContextComplete, origEvent: MouseEvent, paramsWithWorkflow?: RunParams): Promise<void | T> {
    const l = this.log.call('run<T>', null, undefined, { context });

    // New in 11.12 - find commandWorkflow of toolbar or use a dummy so the remaining code will always work
    // note: in cases where the click comes from elsewhere (like from the quick-dialog) there is no event

    // New in 12.10 - Workflow can be provided by run-call
    let wf: ToolbarWorkflowManager;
    if (paramsWithWorkflow?.workflows) {
      wf = new ToolbarWorkflowManager(this.log);
      wf.add(paramsWithWorkflow.workflows as WorkflowStep | WorkflowStep[]);
    } else
      wf = WorkflowHelper.getWorkflow(origEvent?.target as HTMLElement);

    // Attach to context, so it's available after running the command
    context.commandWorkflow = wf;
    const wrapperPromise = wf.run(new WorkflowStepCodeArguments(name, WorkflowPhases.before, context));

    // get button configuration to detect if it's only a UI action (like the more-button)
    let finalPromise: Promise<void | T>;
    if (new ButtonSafe(button, context).uiActionOnlySafe()) {
      l.add('UI command, no pre-flight to ensure content-block');
      finalPromise = wrapperPromise.then((wfArgs) => WorkflowHelper.isCancelled(wfArgs)
        ? Promise.resolve<T>(null)
        : commandPromise(context, origEvent, 'cmsEngine.run#UI command'));
    } else {
      // if more than just a UI-action, then it needs to be sure the content-group is created first
      l.add('command might change data, wrap in pre-flight to ensure content-block');
      finalPromise = wrapperPromise.then((wfArgs) => WorkflowHelper.isCancelled(wfArgs)
        ? Promise.resolve<T>(null)
        : ContentBlockEditor.singleton()
            .prepareToAddContent(context, button.command.params?.useModuleList)
            .then(() => commandPromise(context, origEvent, 'cmsEngine.run#non UI command'))
      );
    }

    // Attach post-command workflow
    const promiseWithAfterEffects = finalPromise
      .then((result) => wf
        .run(new WorkflowStepCodeArguments(name, WorkflowPhases.after, null, result))
        .then(() => result)
      );
    return l.return(promiseWithAfterEffects);
  }


}
