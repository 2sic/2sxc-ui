import { prepareToAddContent } from '../contentBlock/templates';
import { ContextOfButton } from '../context/context-of-button';
import { ContextOfInstance } from '../context/context-of-instance';
import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';
import { settingsAdapter } from '../toolbar/adapters/settings-adapter';
import { ButtonAction } from '../toolbar/button/button-action';
import { ButtonConfig } from '../toolbar/button/button-config';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Commands } from './commands';
import { Settings } from './settings';

export class Engine extends HasLog {
  constructor(parentLog?: Log) {
    super('Cmd.Exec', parentLog);
  }

  detectParamsAndRun(
    context: ContextOfInstance,
    nameOrSettings: string | Partial<Settings>,
    eventOrSettings: Partial<Settings> | MouseEvent,
    event?: MouseEvent,
  ): Promise<any> {
    this.log.add(
      `detecting params and running - has ${arguments.length} params`,
    );

    let settings: Partial<Settings>;

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
      ) as Partial<Settings>;
    }

    // ensure we have the right event despite browser differences
    event = event || (window.event as MouseEvent);

    return this.run(context as ContextOfButton, settings, event);
  }

  /**
   * run a command
   * this method expects a clear order of parameters
   * @param context
   * @param settings
   * @param event
   */
  run(
    context: ContextOfButton,
    nameOrSettings: string | Partial<Settings>,
    event: MouseEvent,
  ): Promise<any> {
    // | any is temporary, just to get it to work; should be improved to only give a promise

    let settings = this.nameOrSettingsAdapter(nameOrSettings);

    settings = this.expandSettingsWithDefaults(settings);

    const origEvent = event;
    const name = settings.action;
    const contentType = settings.contentType;
    this.log.add(`run command ${name} for type ${contentType}`);

    // Toolbar API v2
    const newButtonAction = new ButtonAction(name, contentType, settings);
    newButtonAction.commandDefinition = Commands.getInstance().get(name);
    const newButtonConfig = new ButtonConfig(newButtonAction);
    newButtonConfig.name = name;

    const button = (context.button = Object.assign(
      newButtonConfig,
      newButtonAction.commandDefinition.buttonConfig,
      settingsAdapter(settings),
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
      this.log.add(
        'simple button without code - generating code to open standard dialog',
      );
      button.code = (
        contextParam: ContextOfButton,
        evt: MouseEvent,
      ): Promise<any> => {
        return commandOpenNgDialog(contextParam, evt);
      };
    }

    if (button.uiActionOnly(context)) {
      this.log.add(
        'just a UI command, will not run pre-flight to ensure content-block - now running the code',
      );
      return button.code(context, origEvent);
    }

    // if more than just a UI-action, then it needs to be sure the content-group is created first
    this.log.add(
      'command might change data, will wrap in pre-flight to ensure content-block',
    );
    return prepareToAddContent(context, settings.useModuleList).then(() => {
      return context.button.code(context, origEvent);
    });
  }

  /**
   * name or settings adapter to settings
   * @param nameOrSettings
   * @returns settings
   */
  nameOrSettingsAdapter(
    nameOrSettings: string | Partial<Settings>,
  ): Partial<Settings> {
    let settings: Partial<Settings>;
    // check if nameOrString is name (string) or object (settings)
    const nameIsString = typeof nameOrSettings === 'string';
    this.log.add(
      `adapting settings; name is string: ${nameIsString}; name = ${nameOrSettings}`,
    );

    if (nameIsString) {
      settings = Object.assign({}, { action: nameOrSettings }) as Partial<
        Settings
      >; // place the name as an action-name into a command-object
    } else {
      settings = nameOrSettings as Partial<Settings>;
    }

    return settings;
  }

  /**
   * Take a settings-name or partial settings object,
   * and return a full settings object with all defaults from
   * the command definition
   * @param settings
   */
  expandSettingsWithDefaults(settings: Partial<Settings>): Settings {
    const name = settings.action;
    this.log.add(`will add defaults for ${name} from buttonConfig`);
    const conf = Commands.getInstance().get(name).buttonConfig;
    const full = Object.assign({}, conf, settings) as Settings; // merge conf & settings, but settings has higher priority

    return full;
  }
}
