import { Commands } from '../.';
import { renderer } from '../../contentBlock/render';
import { prepareToAddContent } from '../../contentBlock/templates';
import { ContextBundleInstance } from '../../context/bundles/context-bundle-instance';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { $2sxcInPage as $2sxc } from '../../interfaces/sxc-controller-in-page';
import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';
import { quickDialog } from '../../quick-dialog/quick-dialog';
import { DialogPaths } from '../../settings/DialogPaths';
import { buttonConfigUpgrade } from '../../toolbar/adapters/settings-adapter';
import { ButtonCommand } from '../../toolbar/button/button-command';
import { ButtonConfig } from '../../toolbar/config/button-config';
import { RunParams } from '../run-params';
import { CommandExecution } from './command-execution';
import { TypeUnsafe } from '../../plumbing/TypeTbD';

export class Engine extends HasLog {
  constructor(parentLog?: Log) {
    super('Cmd.Exec', parentLog);
  }

  detectParamsAndRun<T>(
    context: ContextBundleInstance,
    nameOrSettings: string | Partial<RunParams>,
    eventOrSettings: Partial<RunParams> | MouseEvent,
    event?: MouseEvent,
  ): Promise<void | T> {
    this.log.add(`detecting params and running - has ${arguments.length} params`);

    let settings: Partial<RunParams>;

    const thirdParamIsEvent =
      !event &&
      eventOrSettings &&
      typeof (eventOrSettings as MouseEvent).altKey !== 'undefined';
    this.log.add(
      `might cycle parameters, in case not all were given. third is event=${thirdParamIsEvent}`,
    );
    if (thirdParamIsEvent) {
      // no event param, but settings contains the event-object
      this.log.add(
        'cycling parameters as event was missing & eventOrSettings seems to be an event; settings must be empty',
      );
      event = eventOrSettings as MouseEvent; // move it to the correct variable
      settings = this.nameOrSettingsAdapter(nameOrSettings);
    } else {
      settings = Object.assign(
        eventOrSettings || {},
        this.nameOrSettingsAdapter(nameOrSettings),
      ) as Partial<RunParams>;
    }

    // ensure we have the right event despite browser differences
    event = event || (window.event as MouseEvent);

    return this.run(context as ContextBundleButton, settings, event);
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
    nameOrSettings: string | Partial<RunParams>,
    event: MouseEvent,
  ): Promise<T | void> {
    let settings = this.nameOrSettingsAdapter(nameOrSettings);

    settings = this.expandSettingsWithDefaults(settings);

    const origEvent = event;
    const name = settings.action;
    const contentType = settings.contentType;
    this.log.add(`run command ${name} for type ${contentType}`);

    // Toolbar API v2
    const newButtonAction = new ButtonCommand(name, contentType, settings);
    const newButtonConfig = new ButtonConfig(newButtonAction);
    newButtonConfig.name = name;

    const button = (context.button = Object.assign(
      newButtonConfig,
      newButtonAction.commandDefinition.buttonConfig,
      buttonConfigUpgrade(settings),
    ) as ButtonConfig); // merge conf & settings, but settings has higher priority

    // todo: stv, fix this in case that is function
    if (!button.dialog) {
      this.log.add(
        'button.dialog method missing, must be old implementation which used the action-name - generating method',
      );
      button.dialog = () => {
        return name;
      };
    }

    // todo: stv, fix this in case that is function
    if (!button.code) {
      this.log.add('simple button without code - generating code to open standard dialog');
      button.code = (contextParam: ContextBundleButton, evt: MouseEvent) => Engine.openDialog(contextParam, evt);
    }

    if (button.uiActionOnly(context)) {
      this.log.add('UI command, will not run pre-flight to ensure content-block - running code');
      return button.code(context, origEvent);
    }

    // if more than just a UI-action, then it needs to be sure the content-group is created first
    this.log.add('command might change data, wrap in pre-flight to ensure content-block');
    return prepareToAddContent(context, settings.useModuleList).then(() => {
      return context.button.code(context, origEvent);
    });
  }

  /**
   * name or settings adapter to settings
   * @param nameOrSettings
   * @returns settings
   */
  private nameOrSettingsAdapter(nameOrSettings: string | Partial<RunParams>): Partial<RunParams> {
    let settings: Partial<RunParams>;
    // check if nameOrString is name (string) or object (settings)
    const nameIsString = typeof nameOrSettings === 'string';
    this.log.add(
      `adapting settings; name is string: ${nameIsString}; name = ${nameOrSettings}`,
    );

    if (nameIsString) {
      settings = Object.assign({}, { action: nameOrSettings }) as Partial<
        RunParams
      >; // place the name as an action-name into a command-object
    } else {
      settings = nameOrSettings as Partial<RunParams>;
    }

    return settings;
  }

  /**
   * Take a settings-name or partial settings object,
   * and return a full settings object with all defaults from
   * the command definition
   * @param settings
   */
  private expandSettingsWithDefaults(settings: Partial<RunParams>): RunParams {
    const name = settings.action;
    this.log.add(`will add defaults for ${name} from buttonConfig`);
    const conf = Commands.get(name).buttonConfig;
    const full = Object.assign({}, conf, settings) as RunParams; // merge conf & settings, but settings has higher priority

    return full;
  }



  /**
   * open a new dialog of the angular-ui
   */
  static openDialog<T>(context: ContextBundleButton, event: MouseEvent): Promise<T> {
    // the link contains everything to open a full dialog (lots of params added)
    let link = new CommandExecution(context).getLink(); // commandLinkToNgDialog(context);

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
