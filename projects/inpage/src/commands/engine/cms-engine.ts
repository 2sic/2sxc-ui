import { RunParams } from '../../../../$2sxc/src/cms/run-params';
import { CommandParams } from '../../../../$2sxc/src/cms/command-params';
import { RunParamsHelpers } from '../../cms/run-params-helpers';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { HasLog, Insights, Log } from '../../core';
import { QuickDialog } from '../../quick-dialog/quick-dialog';
import { ButtonConfiguration, ButtonWithContext } from '../../toolbar/config';
import { CommandWithParams } from '../../toolbar/config';
import { InPageButtonJson } from '../../toolbar/config-loaders/config-formats/in-page-button';
import { WorkflowHelper, WorkflowPhases, WorkflowStepCodeArguments } from '../../workflow';
import { ToolbarWorkflowManager } from '../../workflow/toolbar-workflow-manager';
import { WorkflowStep } from '../../workflow/workflow-step';
import { CommandLinkGenerator } from '../command-link-generator';
import { Debug } from '../../constants/debug';
import { CommandCode } from '../command-code';
import { CmsWorkflow } from './cms-workflow';

const debug = false;

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

    const result = this.run<T>(context as ContextComplete, cmdParams, event, undefined, 'sxcGlobalCms.detectParamsAndRun');
    return cl.return(result);
  }

  /**
   * run a command
   * this method expects a clear order of parameters
   * @param context
   * @param settings
   * @param event
   */
  run<T>(context: ContextComplete, params: CommandParams, event: MouseEvent, paramsWithWorkflow?: RunParams, triggeredBy?: string): Promise<void | T> {
    const l = this.log.call('run<T>', `triggeredBy: ${triggeredBy}`, undefined, { context });

    const name = params.action;
    const origEvent = event;

    // #DisableExpandParamsWithDefaults
    // const cmdParams = this.runParamsHelper.expandParamsWithDefaults(params);
    const cmdParams = params;

    // console.warn('2dm: cms-engine.ts: run', { context, params, cmdParams });
    
    l.add(`run command '${name}'`);

    // Toolbar API v2
    const btnCommand = new CommandWithParams(name, cmdParams);

    // Support old 2sxc v8 API, where the params could be a JS object with method/properties
    const overrides = InPageButtonJson.toButton(params as unknown as InPageButtonJson);
    const newButtonConfig = new ButtonConfiguration(btnCommand.name, btnCommand, overrides);
    const button = newButtonConfig;

    // attach to context for inner calls which might access it
    context.button = button;
    l.data('button', context.button);

    // In case we don't have special code, use generic code
    let commandPromise = button.definition.code;
    if (!commandPromise) {
      l.add('button, no code - generating code to open standard dialog');
      commandPromise = CmsEngine.openDialog;
    }

    const cmsWorkflow = new CmsWorkflow(this.log);
    const promiseWithWorkflow = cmsWorkflow.wrapInWorkflow<T>(
      name,
      commandPromise,
      button,
      context,
      origEvent,
      paramsWithWorkflow
    );
    return l.return(promiseWithWorkflow);
  }




  /**
   * Open a new dialog of the angular-ui
   */
  static openDialog<T>(context: ContextComplete, event: MouseEvent, triggeredBy: string): Promise<void | T> {
    const log = new Log('Cms.OpnDlg', null, `triggeredBy: ${triggeredBy}`);
    Insights.add('cms', 'open-dialog', log);
    // the link contains everything to open a full dialog (lots of params added)
    const btn = new ButtonWithContext(context.button, context);
    const link = new CommandLinkGenerator(btn, context, log).getLink();

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
      if (btn.getInlineWindow()) {
        // test if it should be full screen (value or resolve-function)
        QuickDialog.singleton()
          .showOrToggleFromToolbar(context, link, btn.getFullScreen(), btn.getDialog())
          .then((isChanged) => { if (isChanged) completePromise(); });
        return;
      }

      // Case 2: It's a normal pop-up dialog - either in a new tab/window or in a popup
      const isNewWindow = btn.getNewWindow();

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
