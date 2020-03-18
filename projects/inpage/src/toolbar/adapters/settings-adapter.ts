import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { TypeTbD } from '../../plumbing';
import { TypeUnsafe } from '../../plumbing';
import { ButtonConfig } from '../config/button-config';

export function buttonConfigUpgrade(oldFormat: any): Partial<ButtonConfig> {

  const config: Partial<ButtonConfig> = {};

  if (oldFormat.classes) config.classes = oldFormat.classes;
  if (oldFormat.dialog) config.dialog = evalPropOrFun(oldFormat.dialog);
  if (oldFormat.disabled) config.disabled = evalPropOrFun(oldFormat.disabled);
  if (oldFormat.dynamicClasses) config.dynamicClasses = evalPropOrFun(oldFormat.dynamicClasses);
  if (oldFormat.fullScreen) config.fullScreen = evalPropOrFun(oldFormat.fullScreen);
  if (oldFormat.icon) config.icon = evalPropOrFun(oldFormat.icon);
  if (oldFormat.inlineWindow) config.inlineWindow = evalPropOrFun(oldFormat.inlineWindow);
  if (oldFormat.newWindow) config.newWindow = evalPropOrFun(oldFormat.newWindow);
  if (oldFormat.partOfPage) config.partOfPage = evalPropOrFun(oldFormat.partOfPage);
  if (oldFormat.showCondition) config.showCondition = evalPropOrFun(oldFormat.showCondition);
  if (oldFormat.title) config.title = evalPropOrFun(oldFormat.title);

  return config;
}

function evalPropOrFun(propOrFunction: TypeTbD): TypeUnsafe {
  if (propOrFunction === undefined || propOrFunction === null) {
    return false;
  }
  if (typeof (propOrFunction) === 'function') {
    return propOrFunction;
  } else {
    return (context: ContextBundleButton) => propOrFunction;
  }
}
