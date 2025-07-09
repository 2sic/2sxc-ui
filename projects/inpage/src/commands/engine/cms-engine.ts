import { RunParams } from '../../../../$2sxc/src/cms/run-params';
import { CommandParams } from '../../../../$2sxc/src/cms/command-params';
import { RunParamsHelpers } from '../../cms/run-params-helpers';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { HasLog, Insights, Log } from '../../core';
import { QuickDialog } from '../../quick-dialog/quick-dialog';
import { Button, ButtonSafe } from '../../toolbar/config';
import { ButtonCommand } from '../../toolbar/config';
import { InPageButtonJson } from '../../toolbar/config-loaders/config-formats/in-page-button';
import { WorkflowHelper, WorkflowPhases, WorkflowStepCodeArguments } from '../../workflow';
import { ToolbarWorkflowManager } from '../../workflow/toolbar-workflow-manager';
import { WorkflowStep } from '../../workflow/workflow-step';
import { CommandLinkGenerator } from '../command-link-generator';
import { Debug } from '../../constants/debug';

const debug = false;

type CommandPromise<T> = Promise<T|void>;

/**
 * The CMS engine is global, and needs the context to work.
 * @internal
 */
export class CmsEngine extends HasLog {

  private runParamsHelper: RunParamsHelpers;

  constructor(parentLog?: Log) {
    super('Cmd.Exec', parentLog, 'start');
    this.runParamsHelper = new RunParamsHelpers(this.log);
  }

  detectParamsAndRun<T>(
    context: ContextBundleInstance,
    nameOrParams: string | CommandParams,
    eventOrParams: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    const cl = this.log.call('detectParamsAndRun', `${arguments.length} params`);
    let cmdParams: CommandParams;

    const thirdParamIsEvent = !event && eventOrParams && typeof (eventOrParams as MouseEvent).altKey !== 'undefined';
    cl.add(`might cycle parameters. third is event=${thirdParamIsEvent}`);

    if (thirdParamIsEvent) {
      // no event param, but settings contains the event-object
      cl.add('cycling params; event missing & eventOrSettings seems to be an event; settings assumed empty');
      event = eventOrParams as MouseEvent; // move it to the correct variable
      cmdParams = this.runParamsHelper.getParamsFromNameOrParams(nameOrParams);
    } else {
      cmdParams = {
        ...(eventOrParams || {}),
        ...this.runParamsHelper.getParamsFromNameOrParams(nameOrParams),
      };
    }

    // ensure we have the right event despite browser differences
    event = event || (window.event as MouseEvent);

    const result: CommandPromise<T> = this.run(context as ContextComplete, cmdParams, event, undefined, 'sxcGlobalCms.detectParamsAndRun');
    return cl.return(result);
  }

  /**
   * run a command
   * this method expects a clear order of parameters
   * @param context
   * @param settings
   * @param event
   */
  run<T>(context: ContextComplete, nameOrParams: string | CommandParams, event: MouseEvent, wipParamsWithWorkflow?: RunParams, triggeredBy?: string): CommandPromise<T> {
    const cl = this.log.call('run<T>', `triggeredBy: ${triggeredBy}`, undefined, { context });
    let cmdParams = this.runParamsHelper.getParamsFromNameOrParams(nameOrParams);
    cmdParams = this.runParamsHelper.expandParamsWithDefaults(cmdParams);

    const origEvent = event;
    const name = cmdParams.action;
    // 2dm 2022-07-05 #badContentTypeExtractAndRefill - we seem to extract it, just to put it back on the ButtonCommand
    // const contentType = cmdParams.contentType;
    // cl.add(`run command '${name}' for type ${contentType}`);
    cl.add(`run command '${name}'`);

    // Toolbar API v2
    const btnCommand = new ButtonCommand(name, cmdParams);
    const newButtonConfig = new Button(btnCommand, btnCommand.name);

    // merge conf & settings, but settings has higher priority
    const button: Button = {
      ...newButtonConfig,
      ...InPageButtonJson.toButton(cmdParams as unknown),
    };

    // attach to context for inner calls which might access it
    context.button = button;
    cl.data('button', context.button);

    // New in 11.12 - find commandWorkflow of toolbar or use a dummy so the remaining code will always work
    // note: in cases where the click comes from elsewhere (like from the quick-dialog) there is no event

    // New in 12.10 - Workflow can be provided by run-call
    let wf: ToolbarWorkflowManager;
    if (wipParamsWithWorkflow?.workflows) {
      wf = new ToolbarWorkflowManager(this.log);
      wf.add(wipParamsWithWorkflow.workflows as WorkflowStep | WorkflowStep[]);
    } else
      wf = WorkflowHelper.getWorkflow(origEvent?.target as HTMLElement);

    // Attach to context, so it's available after running the command
    context.commandWorkflow = wf;
    const wrapperPromise = wf.run(new WorkflowStepCodeArguments(name, WorkflowPhases.before, context));

    // In case we don't have special code, use generic code
    let commandPromise = button.code;
    if (!commandPromise) {
      cl.add('button, no code - generating code to open standard dialog');
      commandPromise = CmsEngine.openDialog;
    }

    // get button configuration to detect if it's only a UI action (like the more-button)
    let finalPromise: CommandPromise<T>;
    if (new ButtonSafe(button, context).uiActionOnly()) {
      cl.add('UI command, no pre-flight to ensure content-block');
      finalPromise = wrapperPromise.then((wfArgs) => WorkflowHelper.isCancelled(wfArgs)
        ? Promise.resolve<T>(null)
        : commandPromise(context, origEvent, 'cmsEngine.run#UI command'));
    } else {
      // if more than just a UI-action, then it needs to be sure the content-group is created first
      cl.add('command might change data, wrap in pre-flight to ensure content-block');
      finalPromise = wrapperPromise.then((wfArgs) => WorkflowHelper.isCancelled(wfArgs)
        ? Promise.resolve<T>(null)
        : ContentBlockEditor.singleton()
            .prepareToAddContent(context, cmdParams.useModuleList)
            .then(() => commandPromise(context, origEvent, 'cmsEngine.run#non UI command'))
      );
    }

    // Attach post-command workflow
    const promiseWithAfterEffects = finalPromise.then((result) => {
      return wf
        .run(new WorkflowStepCodeArguments(name, WorkflowPhases.after, null, result))
        .then(() => result);
    });

    return cl.return(promiseWithAfterEffects);
  }



  /**
   * Open a new dialog of the angular-ui
   */
  static openDialog<T>(context: ContextComplete, event: MouseEvent, triggeredBy: string): CommandPromise<T> {
    const log = new Log('Cms.OpnDlg', null, `triggeredBy: ${triggeredBy}`);
    Insights.add('cms', 'open-dialog', log);
    // the link contains everything to open a full dialog (lots of params added)
    const btn = new ButtonSafe(context.button, context);
    const link = new CommandLinkGenerator(btn, context, log).getLink();

    Debug.log(`CmsEngine.openDialog: link: ${link}`, context, btn);

    const origEvent = event || (window.event as MouseEvent);

    return new Promise<T>((resolve) => {
      // prepare promise for callback when the dialog closes
      // to reload the in-page view w/ajax or page reload
      const completePromise = () => {
        // call the normal promise-resolve so the `.then` will be continued
        resolve(context as unknown as T);
        // reload the UI as specified
        renderer.reloadAndReInitialize(context, 'cmsEngine.openDialog');
      };

      // Case 1: check if inline window (quick-dialog)
      if (btn.inlineWindow()) {
        // test if it should be full screen (value or resolve-function)
        QuickDialog.singleton()
          .showOrToggleFromToolbar(context, link, btn.fullScreen(), btn.dialog())
          .then((isChanged) => { if (isChanged) completePromise(); });
        return;
      }

      // Case 2: It's a normal pop-up dialog - either in a new tab/window or in a popup
      const isNewWindow = btn.newWindow();

      // Experimental v17 - ctrl-click opens in new window; shift-click opens in popup
      if (isNewWindow || origEvent?.ctrlKey || origEvent?.shiftKey) {
        // 1. resolve promise, as the window won't report when closed
        resolve(context as unknown as T);

        if (debug) console.log('2dm link click with ctrl/shift - open in new window');

        // 2. add real link to the A tag. The first tag is probably the <i> tag, so we need to find the <a> tag
        if (CmsEngine.applyLinkToButton(origEvent, link, isNewWindow ? '_blank' : null)) {
          if (debug) console.log('link click with ctrl/shift all done');
          return;
        }

        if (debug) console.log('2sxc run: link should open in a new window, but was not started from a link. Using window.open()');
        window.open(link);
        return;
      }

      // case 3: not new window, no special ctrl/shift, so use the normal popup
      window.$2sxc.totalPopup.open(link, completePromise);
    });
  }

  static applyLinkToButton(event: MouseEvent, link: string, target: string): boolean {
    if (debug) console.log('applyLinkToButton', event, link, target);

    // Get clicked tag from event and try to find a parent link tag
    // event can be unknown, eg. when triggered from the Dnn-Module-Menu https://github.com/2sic/2sxc/issues/3280
    let tag = event?.target as HTMLElement;
    while (tag != null && tag.tagName !== 'A') tag = tag.parentElement;

    // If we didn't find an A tag, we can't apply the link. Return false so the caller handles it.
    if (tag == null) {
      if (debug) console.log('no tag found, returning false');
      return false;
    }

    if (debug) console.log('tag found, applying link to it', tag);

    // Remember the old link / target, in case we accidentally change a link which is not part of the toolbar
    const aTag = tag as HTMLLinkElement;
    const oldLink = aTag.href;
    const oldTarget = aTag.target;
    aTag.href = link;

    // 3. If it's a new window, we must also set the target
    if (target) aTag.target = target;
            
    // 4. After the click is run, we must clear the href again, so it doesn't open in the current window
    setTimeout(() => {
      if (debug) console.log('restoring old link', aTag, oldLink, oldTarget);
      // note: we usually must removeAttribute, otherwise next-normal-clicks will not behave as expected
      if (oldLink) aTag.href = oldLink; else aTag.removeAttribute('href');
      if (oldTarget) aTag.target = oldTarget; else aTag.removeAttribute('target');
    }, 100);

    return true;
  }
}
