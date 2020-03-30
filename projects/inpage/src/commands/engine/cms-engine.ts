import { Commands } from '..';
import { C } from '../../constants';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { $2sxcInPage as $2sxc } from '../../interfaces/sxc-controller-in-page';
import { HasLog, Log } from '../../logging';
import { TypeUnsafe } from '../../plumbing';
import { QuickDialog } from '../../quick-dialog/quick-dialog';
import { Button, ButtonSafe } from '../../toolbar/config';
import { ButtonCommand } from '../../toolbar/config';
import { InPageButtonJson } from '../../toolbar/config-loaders/config-formats/in-page-button';
import { CommandLinkGenerator } from '../command-link-generator';
import { CommandParams } from '../command-params';

/**
 * The CMS engine is global, and needs the context to work.
 */
export class CmsEngine extends HasLog {
    constructor(parentLog?: Log) {
        super('Cmd.Exec', parentLog, 'start');
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
            cmdParams = this.nameOrSettingsAdapter(nameOrParams);
        } else {
            cmdParams = { //  O.bject.assign(
                ...(eventOrParams || {}),
                ...this.nameOrSettingsAdapter(nameOrParams),
            };
        }

        // ensure we have the right event despite browser differences
        event = event || (window.event as MouseEvent);

        const result: Promise<T|void> = this.run(context as ContextComplete, cmdParams, event);
        return cl.return(result);
    }

    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    run<T>(context: ContextComplete, nameOrParams: string | CommandParams,
           event: MouseEvent,
    ): Promise<T | void> {
        const cl = this.log.call('run<T>');
        let cmdParams = this.nameOrSettingsAdapter(nameOrParams);

        cmdParams = this.expandSettingsWithDefaults(cmdParams);

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
            // 2020-03-27 2dm disabled this, already happens in the constructor of the button
            // ...newButtonAction.command.buttonDefaults,
            ...InPageButtonJson.toButton(cmdParams),
        };

        // attach to context for inner calls which might access it
        context.button = button;

        // In case we don't have special code, use generic code
        let code = button.code;
        if (!code) {
            cl.add('button, no code - generating code to open standard dialog');
            code = (contextParam: ContextComplete, evt: MouseEvent) => CmsEngine.openDialog(contextParam, evt);
        }

        if (new ButtonSafe(button, context).uiActionOnly()) {
            cl.add('UI command, no pre-flight to ensure content-block');
            return cl.return(code(context, origEvent));
        }

        // if more than just a UI-action, then it needs to be sure the content-group is created first
        cl.add('command might change data, wrap in pre-flight to ensure content-block');
        const promise = ContentBlockEditor
            .prepareToAddContent(context, cmdParams.useModuleList)
            .then(() => code(context, origEvent));
        return cl.return(promise) as Promise<T>;
    }

    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    private nameOrSettingsAdapter(nameOrSettings: string | CommandParams): CommandParams {
        const cl = this.log.call('nameOrSettingsAdapter', `${nameOrSettings}`);
        // check if nameOrString is name (string) or object (settings)
        const nameIsString = typeof nameOrSettings === 'string';
        cl.add(`adapting settings; name string: ${nameIsString}; name = ${nameOrSettings}`);
        const result = (nameIsString
            ? { action: nameOrSettings }
            : nameOrSettings) as CommandParams;
        return cl.return(result);
    }

    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param settings
     */
    private expandSettingsWithDefaults(settings: CommandParams): CommandParams {
        const cl = this.log.call('expandSettingsWithDefaults');
        const name = settings.action;
        cl.add(`will add defaults for ${name} from buttonConfig`);
        const defaults = Commands.get(name).buttonDefaults;
        cl.data('defaults to merge', defaults);
        // TODO: 2dm - suspicious cast
        // merge conf & settings, but
        return cl.return({...defaults, ...settings} as CommandParams);
    }



    /**
     * open a new dialog of the angular-ui
     */
    static openDialog<T>(context: ContextComplete, event: MouseEvent): Promise<T> {
        // the link contains everything to open a full dialog (lots of params added)
        let link = new CommandLinkGenerator(context).getLink();
        const btn = new ButtonSafe(context.button, context);

        const origEvent = event || (window.event as MouseEvent);

        return new Promise<T>((resolvePromise) => {
            // prepare promise for callback when the dialog closes
            // to reload the in-page view w/ajax or page reload
            const completePromise = () => {
                resolvePromise(context as unknown as T);
                renderer.reloadAndReInitialize(context);
            };

            // check if inline window (quick-dialog)
            if (btn.inlineWindow()) {
                // test if it should be full screen (value or resolve-function)
                QuickDialog
                    .showOrToggleFromToolbar(context, link, btn.fullScreen(), btn.dialog())
                    .then((isChanged) => { if (isChanged) completePromise(); });
            } else {
                // else it's a normal pop-up dialog
                link = CmsEngine.convertUrlIfAltPressed(origEvent, link);
                const isNewWindow = btn.newWindow();
                // check if new-window
                if (isNewWindow || (origEvent && origEvent.shiftKey)) {
                    // resolve promise, as the window won't report when closed
                    resolvePromise(context as TypeUnsafe as T);
                    window.open(link);
                } else {
                    $2sxc.totalPopup.open(link, completePromise);
                }
            }
        });
    }

    /** Switch to old NG9 dialog if the user pressed ALT */
    private static convertUrlIfAltPressed(origEvent: MouseEvent, link: string) {
        if (origEvent && origEvent.altKey) {
            const toOld = link.indexOf(C.DialogPaths.ng8) > 0;
            link = link.replace(toOld ? C.DialogPaths.ng8 : C.DialogPaths.ng1, toOld ? C.DialogPaths.ng1 : C.DialogPaths.ng8);
        }
        return link;
    }
}
