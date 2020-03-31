"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function settingsAdapter(oldSettings) {
    var newSettings = {};
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
exports.settingsAdapter = settingsAdapter;
function evalPropOrFunction(propOrFunction) {
    if (propOrFunction === undefined || propOrFunction === null) {
        return false;
    }
    if (typeof (propOrFunction) === 'function') {
        return propOrFunction;
    }
    else {
        return function (context) { return propOrFunction; };
    }
}
//# sourceMappingURL=settings-adapter.js.map