import { Commands } from '..';
import { renderer } from '../../contentBlock/render';
import { ContentBlockEditor } from '../../contentBlock/content-block-editor';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { $2sxcInPage as $2sxc } from '../../interfaces/sxc-controller-in-page';
import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';
import { TypeUnsafe } from '../../plumbing/TypeTbD';
import { quickDialog } from '../../quick-dialog/quick-dialog';
import { DialogPaths } from '../../settings/DialogPaths';
import { Button } from '../../toolbar/config';
import { ButtonCommand } from '../../toolbar/config';
import { CommandLinkGenerator } from '../command-link-generator';
import { CommandParams } from '../command-params';

/**
 * The CMS engine is global, and needs the context to work.
 */
export class CmsEngine extends HasLog {
  constructor(parentLog?: Log) {
    super('Cmd.Exec', parentLog);
  }

  detectParamsAndRun<T>(
    context: ContextBundleInstance,
    nameOrParams: string | CommandParams,
    eventOrParams: CommandParams | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    this.log.add(`detecting params and running - has ${arguments.length} params`);

    let cmdParams: CommandParams;

    const thirdParamIsEvent = !event && eventOrParams && typeof (eventOrParams as MouseEvent).altKey !== 'undefined';
    this.log.add(`might cycle parameters. third is event=${thirdParamIsEvent}`);

    if (thirdParamIsEvent) {
      // no event param, but settings contains the event-object
      this.log.add('cycling params; event missing & eventOrSettings seems to be an event; settings assumed empty');
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

    return this.run(context as ContextBundleButton, cmdParams, event);
  }

  /**
   * run a command
   * this method expects a clear order of parameters
   * @param context
   * @param settings
   * @param event
   */
  run<T>(
    context: ContextBundleButton,
    nameOrParams: string | CommandParams,
    event: MouseEvent,
  ): Promise<T | void> {
    let cmdParams = this.nameOrSettingsAdapter(nameOrParams);

    cmdParams = this.expandSettingsWithDefaults(cmdParams);

    const origEvent = event;
    const name = cmdParams.action;
    const contentType = cmdParams.contentType;
    this.log.add(`run command ${name} for type ${contentType}`);

    // Toolbar API v2
    const newButtonAction = new ButtonCommand(name, contentType, cmdParams);
    const newButtonConfig = new Button(newButtonAction, name);

    // merge conf & settings, but settings has higher priority
    const button = (context.button = {
      ...newButtonConfig,
      ...newButtonAction.commandDefinition.buttonConfig,
      ...Button.normalize(cmdParams as unknown) });

    // todo: stv, fix this in case that is function
    if (!button.dialog) {
      this.log.add('button.dialog method missing, old implementation with action-name');
      button.dialog = () => name;
    }

    // todo: stv, fix this in case that is function
    if (!button.code) {
      this.log.add('simple button without code - generating code to open standard dialog');
      button.code = (contextParam: ContextBundleButton, evt: MouseEvent) => CmsEngine.openDialog(contextParam, evt);
    }

    if (button.uiActionOnly(context)) {
      this.log.add('UI command, will not run pre-flight to ensure content-block - running code');
      return button.code(context, origEvent);
    }

    // if more than just a UI-action, then it needs to be sure the content-group is created first
    this.log.add('command might change data, wrap in pre-flight to ensure content-block');
    return ContentBlockEditor.prepareToAddContent(context, cmdParams.useModuleList).then(() => {
      return context.button.code(context, origEvent);
    });
  }

  /**
   * name or settings adapter to settings
   * @param nameOrSettings
   * @returns settings
   */
  private nameOrSettingsAdapter(nameOrSettings: string | CommandParams): CommandParams {
    // check if nameOrString is name (string) or object (settings)
    const nameIsString = typeof nameOrSettings === 'string';
    this.log.add(`adapting settings; name string: ${nameIsString}; name = ${nameOrSettings}`);

    return (nameIsString
        ? { action: nameOrSettings }
        : nameOrSettings) as CommandParams;
  }

  /**
   * Take a settings-name or partial settings object,
   * and return a full settings object with all defaults from
   * the command definition
   * @param settings
   */
  private expandSettingsWithDefaults(settings: CommandParams): CommandParams {
    const name = settings.action;
    this.log.add(`will add defaults for ${name} from buttonConfig`);
    const conf = Commands.get(name).buttonConfig;
    // TODO: 2dm - suspicius cast
    const full = {...conf, ...settings} as CommandParams; // merge conf & settings, but
    // const full = O.bject.assign({}, conf, settings) as CommandParams; // merge conf & settings, but settings has higher priority

    return full;
  }



  /**
   * open a new dialog of the angular-ui
   */
  static openDialog<T>(context: ContextBundleButton, event: MouseEvent): Promise<T> {
    // the link contains everything to open a full dialog (lots of params added)
    let link = new CommandLinkGenerator(context).getLink(); // commandLinkToNgDialog(context);

    let fullScreen = false;
    const origEvent = event || (window.event as MouseEvent);

    return new Promise<T>((resolvePromise) => {
      // prepare promise for callback when the dialog closes
      // to reload the in-page view w/ajax or page reload
      const resolveAndReInit = () => {
        // very special thing: the signature always expects a Promise<T> so we're recasting
        resolvePromise(context as TypeUnsafe as T);
        renderer.reloadAndReInitialize(context);
      };

      // check if inline window (quick-dialog)
      if (context.button.inlineWindow) {
        // test if it should be full screen (value or resolve-function)
        if (typeof context.button.fullScreen === 'function')
          fullScreen = context.button.fullScreen(context);
        const diagName = context.button.dialog(context).toString();

        quickDialog
          .showOrToggleFromToolbar(context, link, fullScreen, diagName)
          .then((isChanged) => {
            if (isChanged) resolveAndReInit();
          });

        // else it's a normal pop-up dialog
      } else {
        // check if alt-key pressed, to open the old/new dialog instead
        if (origEvent && origEvent.altKey) {
          const toOld = link.indexOf(DialogPaths.ng8) > 0;
          link = link.replace(
            toOld ? DialogPaths.ng8 : DialogPaths.ng1,
            toOld ? DialogPaths.ng1 : DialogPaths.ng8,
          );
        }

        // check if new-window
        if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
          // very special thing: the signature always expects a Promise<T> so we're recasting
          resolvePromise(context as TypeUnsafe as T);
          window.open(link);
        } else {
          $2sxc.totalPopup.open(link, resolveAndReInit);
        }
      }
    });
  }
}
