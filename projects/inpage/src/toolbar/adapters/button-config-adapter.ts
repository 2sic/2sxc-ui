import { Commands } from '../../commands/commands';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from '../button/button-action';
import { ButtonConfig } from '../button/button-config';
import { ButtonDefinition } from '../button/button-definition';
import { expandButtonConfig } from '../button/expand-button-config';
import { ModConfig } from '../button/mod-config';
import { flattenActionDefinition } from './flatten-action-definition';
import { parametersAdapter } from './parameters-adapter';

export function buttonConfigAdapter(actDef: ButtonDefinition): ButtonConfig {

  const partialButtonConfig: Partial<ButtonConfig> = {};

  if (actDef.code) {
    partialButtonConfig.code = (context: ContextOfButton) => {

      const modConfig = new ModConfig();
      // todo: stv find this data
      // modConfig.target = '';
      // modConfig.isList = false;

      return actDef.code(context.button.action.params, modConfig);
    };
  }

  if (actDef.icon) {
    partialButtonConfig.icon = () => {
      return `icon-sxc-${actDef.icon}`;
    };
  }

  if (actDef.classes) {
    partialButtonConfig.classes = actDef.classes;
  }

  if (actDef.dialog) {
    partialButtonConfig.dialog = () => {
      return actDef.dialog;
    };
  }

  if (actDef.disabled) {
    partialButtonConfig.disabled = () => {
      return actDef.disabled;
    };
  }

  if (actDef.dynamicClasses) {
    partialButtonConfig.dynamicClasses = (context: ContextOfButton) => {
      return actDef.dynamicClasses(context.button.action.params);
    };
  }

  if (actDef.fullScreen) {
    partialButtonConfig.fullScreen = () => {
      return actDef.fullScreen;
    };
  }

  if (actDef.inlineWindow) {
    partialButtonConfig.inlineWindow = () => {
      return actDef.inlineWindow;
    };
  }

  if (actDef.name) {
    partialButtonConfig.name = actDef.name;
  }

  if (actDef.newWindow) {
    partialButtonConfig.newWindow = () => {
      return actDef.newWindow;
    };
  }

  if (actDef.params) {
    // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
    // we need parameter adapter to do this...
    Object.assign(partialButtonConfig.params, actDef.params);
  }

  if (actDef.partOfPage) {
    partialButtonConfig.partOfPage = () => {
      return actDef.partOfPage;
    };
  }

  if (actDef.showCondition) {
    partialButtonConfig.showCondition = (context: ContextOfButton) => {
      const modConfig = new ModConfig();

      // todo: stv find this data
      // modConfig.target = '';
      // modConfig.isList = false;

      return actDef.showCondition(context.button.action.params, modConfig);
    };
  }

  if (actDef.title) {
    partialButtonConfig.title = () => {
      return `Toolbar.${actDef.title}`;
    };
  }

  if (actDef.uiActionOnly) {
    partialButtonConfig.uiActionOnly = () => {
      return actDef.uiActionOnly;
    };
  }

  actDef = (expandButtonConfig(actDef, [], null)) as ButtonDefinition;

  const name = actDef.command.action;
  const contentType = actDef.command.contentType;

  // if the button belongs to a content-item, move the specs up to the item into the settings-object
  flattenActionDefinition(actDef.command);

  // parameters adapter from v1 to v2
  const params = parametersAdapter(actDef.command);

  // Toolbar API v2
  const actions = Commands.getInstance();
  const newButtonAction = new ButtonAction(name, contentType, params);
  newButtonAction.commandDefinition = actions.get(name);
  const newButtonConfig = new ButtonConfig(newButtonAction);
  newButtonConfig.name = name;

  return newButtonConfig;
}
