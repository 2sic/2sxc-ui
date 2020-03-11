import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { ButtonCommand } from '../button/button-command';
import { ButtonConfig } from '../config/button/button-config';
import { ButtonConfigurationBuilder } from '../config/button/button-config-builder';
import { InPageButtonConfiguration } from '../config/button/in-page-button-configuration';
import { InPageCodeParametersProbablyUnused } from '../config/button/in-page-code-params-probably-unused';
import { flattenActionDefinition } from './flatten-action-definition';
import { removeActionProperty } from './parameters-adapter';

export function buttonConfigAdapter(oldButtonDef: InPageButtonConfiguration): ButtonConfig {

  const partialButtonConfig: Partial<ButtonConfig> = {};

  if (oldButtonDef.code) {
    partialButtonConfig.code = (context: ContextBundleButton) => {
      // TODO: 2dm unclear why we're just giving an empty configuration
      // I believe this is a mistake, STV had some todos to try to find the values
      // so I believe for years now, the object was always empty
      // so it's probably never been used
      return oldButtonDef.code(context.button.action.params, new InPageCodeParametersProbablyUnused());
    };
  }

  if (oldButtonDef.icon) {
    partialButtonConfig.icon = () => {
      return `icon-sxc-${oldButtonDef.icon}`;
    };
  }

  if (oldButtonDef.classes) {
    partialButtonConfig.classes = oldButtonDef.classes;
  }

  if (oldButtonDef.dialog) {
    partialButtonConfig.dialog = () => {
      return oldButtonDef.dialog;
    };
  }

  if (oldButtonDef.disabled) {
    partialButtonConfig.disabled = () => {
      return oldButtonDef.disabled;
    };
  }

  if (oldButtonDef.dynamicClasses) {
    partialButtonConfig.dynamicClasses = (context: ContextBundleButton) => {
      return oldButtonDef.dynamicClasses(context.button.action.params);
    };
  }

  if (oldButtonDef.fullScreen) {
    partialButtonConfig.fullScreen = () => {
      return oldButtonDef.fullScreen;
    };
  }

  if (oldButtonDef.inlineWindow) {
    partialButtonConfig.inlineWindow = () => {
      return oldButtonDef.inlineWindow;
    };
  }

  if (oldButtonDef.name) {
    partialButtonConfig.name = oldButtonDef.name;
  }

  if (oldButtonDef.newWindow) {
    partialButtonConfig.newWindow = () => {
      return oldButtonDef.newWindow;
    };
  }

  if (oldButtonDef.params) {
    // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
    // we need parameter adapter to do this...
    Object.assign(partialButtonConfig.params, oldButtonDef.params);
  }

  if (oldButtonDef.partOfPage) {
    partialButtonConfig.partOfPage = () => {
      return oldButtonDef.partOfPage;
    };
  }

  if (oldButtonDef.showCondition) {
    partialButtonConfig.showCondition = (context: ContextBundleButton) => {
      // TODO: 2dm unclear why we're just giving an empty configuration
      // I believe this is a mistake, STV had some todos to try to find the values
      // so I believe for years now, the object was always empty
      // so it's probably never been used
      return oldButtonDef.showCondition(context.button.action.params, new InPageCodeParametersProbablyUnused());
    };
  }

  if (oldButtonDef.title) {
    partialButtonConfig.title = () => {
      return `Toolbar.${oldButtonDef.title}`;
    };
  }

  if (oldButtonDef.uiActionOnly) {
    partialButtonConfig.uiActionOnly = () => {
      return oldButtonDef.uiActionOnly;
    };
  }

  oldButtonDef = new ButtonConfigurationBuilder(null).normalize(oldButtonDef);

  const name = oldButtonDef.command.action;
  const contentType = oldButtonDef.command.contentType;

  // if the button belongs to a content-item, move the specs up to the item into the settings-object
  flattenActionDefinition(oldButtonDef.command);

  // parameters adapter from v1 to v2
  const params = removeActionProperty(oldButtonDef.command);

  // Toolbar API v2
  const newButtonAction = new ButtonCommand(name, contentType, params);
  const newButtonConfig = new ButtonConfig(newButtonAction);
  newButtonConfig.name = name;

  return newButtonConfig;
}
