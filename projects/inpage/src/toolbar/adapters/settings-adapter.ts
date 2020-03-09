import { ContextOfButton } from '../../context/context-of-button';

export function settingsAdapter(oldSettings: any): any {

  const newSettings: any = {};

  // 'classes',
  if (oldSettings.classes) {
    newSettings.classes = oldSettings.classes;
  }

  // 'dialog',
  if (oldSettings.dialog) {
    newSettings.dialog = evalPropOrFunction(oldSettings.dialog);
  }
  // 'disabled'
  if (oldSettings.disabled) {
    newSettings.disabled = evalPropOrFunction(oldSettings.disabled);
  }

  // 'dynamicClasses',
  if (oldSettings.dynamicClasses) {
    newSettings.dynamicClasses = evalPropOrFunction(oldSettings.dynamicClasses);
  }

  // 'fullScreen',
  if (oldSettings.fullScreen) {
    newSettings.fullScreen = evalPropOrFunction(oldSettings.fullScreen);
  }

  // 'icon',
  if (oldSettings.icon) {
    newSettings.icon = evalPropOrFunction(oldSettings.icon);
  }

  // 'inlineWindow',
  if (oldSettings.inlineWindow) {
    newSettings.inlineWindow = evalPropOrFunction(oldSettings.inlineWindow);
  }

  // 'newWindow',
  if (oldSettings.newWindow) {
    newSettings.newWindow = evalPropOrFunction(oldSettings.newWindow);
  }

  // partOfPage
  if (oldSettings.partOfPage) {
    newSettings.partOfPage = evalPropOrFunction(oldSettings.partOfPage);
  }

  // 'showCondition',
  if (oldSettings.showCondition) {
    newSettings.showCondition = evalPropOrFunction(oldSettings.showCondition);
  }

  // 'title',
  if (oldSettings.title) {
    newSettings.title = evalPropOrFunction(oldSettings.title);
  }

  return newSettings;
}

function evalPropOrFunction(propOrFunction: any): any {
  if (propOrFunction === undefined || propOrFunction === null) {
    return false;
  }
  if (typeof (propOrFunction) === 'function') {
    return propOrFunction;
  } else {
    return (context: ContextOfButton) => propOrFunction;
  }
}
