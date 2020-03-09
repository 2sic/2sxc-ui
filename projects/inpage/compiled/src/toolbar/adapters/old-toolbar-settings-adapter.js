"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
 * @param toolbarSettings
 */
function oldToolbarSettingsAddapter(toolbarSettings) {
    var partialToolbaSettings = Object.assign({}, toolbarSettings);
    if (!partialToolbaSettings.autoAddMore) {
        delete partialToolbaSettings.autoAddMore;
    }
    if (!partialToolbaSettings.classes) {
        delete partialToolbaSettings.classes;
    }
    return partialToolbaSettings;
}
exports.oldToolbarSettingsAddapter = oldToolbarSettingsAddapter;
//# sourceMappingURL=old-toolbar-settings-adapter.js.map