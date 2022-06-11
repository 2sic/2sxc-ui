import { RunParams } from '../../cms/run-params';
import { RunParamsHelpers } from '../../cms/run-params-helpers';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { HasLog, Insights, Log } from '../../logging';
import { QuickDialog } from '../../quick-dialog/quick-dialog';
import { Button, ButtonSafe } from '../../toolbar/config';
import { ButtonCommand } from '../../toolbar/config';
import { InPageButtonJson } from '../../toolbar/config-loaders/config-formats/in-page-button';
import { WorkflowHelper, WorkflowPhases, WorkflowStepCodeArguments } from '../../workflow';
import { WorkflowManager } from '../../workflow/workflow-manager';
import { CommandLinkGenerator } from '../command-link-generator';
import { CommandParams } from '../command-params';

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

        const result: CommandPromise<T> = this.run(context as ContextComplete, cmdParams, event);
        return cl.return(result);
    }

    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    run<T>(context: ContextComplete, nameOrParams: string | CommandParams, event: MouseEvent, wipParamsWithWorkflow?: RunParams): CommandPromise<T> {
        const cl = this.log.call('run<T>');
        let cmdParams = this.runParamsHelper.getParamsFromNameOrParams(nameOrParams);
        cmdParams = this.runParamsHelper.expandParamsWithDefaults(cmdParams);

        const origEvent = event;
        const name = cmdParams.action;
        const contentType = cmdParams.contentType;
        cl.add(`run command '${name}' for type ${contentType}`);

        // Toolbar API v2
        const command = new ButtonCommand(name, contentType, cmdParams);
        const newButtonConfig = new Button(command, command.name);

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
        let wf: WorkflowManager;
        if (wipParamsWithWorkflow?.workflows) {
            wf = new WorkflowManager(this.log);
            wf.add(wipParamsWithWorkflow.workflows);
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
                : commandPromise(context, origEvent));
        } else {
            // if more than just a UI-action, then it needs to be sure the content-group is created first
            cl.add('command might change data, wrap in pre-flight to ensure content-block');
            finalPromise = wrapperPromise.then(
                (wfArgs) => WorkflowHelper.isCancelled(wfArgs)
                    ? Promise.resolve<T>(null)
                    : ContentBlockEditor.singleton()
                        .prepareToAddContent(context, cmdParams.useModuleList)
                        .then(() => commandPromise(context, origEvent)));
        }

        // Attach post-command workflow
        const promiseWithAfterEffects = finalPromise.then((result) => {
            return wf.run(new WorkflowStepCodeArguments(name, WorkflowPhases.after, null, result))
                .then(() => result);
        });

        return cl.return(promiseWithAfterEffects);
    }



    /**
     * Open a new dialog of the angular-ui
     */
    static openDialog<T>(context: ContextComplete, event: MouseEvent): CommandPromise<T> {
        const log = new Log('Cms.OpnDlg');
        Insights.add('cms', 'open-dialog', log);
        // the link contains everything to open a full dialog (lots of params added)
        const link = new CommandLinkGenerator(context, log).getLink();
        const btn = new ButtonSafe(context.button, context);

        const origEvent = event || (window.event as MouseEvent);

        return new Promise<T>((resolve) => {
            // prepare promise for callback when the dialog closes
            // to reload the in-page view w/ajax or page reload
            const completePromise = () => {
                // call the normal promise-resolve so the `.then` will be continued
                resolve(context as unknown as T);
                // reload the UI as specified
                renderer.reloadAndReInitialize(context);
            };

            // check if inline window (quick-dialog)
            if (btn.inlineWindow()) {
                // test if it should be full screen (value or resolve-function)
                QuickDialog.singleton()
                    .showOrToggleFromToolbar(context, link, btn.fullScreen(), btn.dialog())
                    .then((isChanged) => { if (isChanged) completePromise(); });
            } else {
                // else it's a normal pop-up dialog
                const isNewWindow = btn.newWindow();
                // check if new-window
                if (isNewWindow || (origEvent?.shiftKey)) {
                    // resolve promise, as the window won't report when closed
                    resolve(context as unknown as T);
                    window.open(link);
                } else {
                    window.$2sxc.totalPopup.open(link, completePromise);
                }
            }
        });
    }
}
