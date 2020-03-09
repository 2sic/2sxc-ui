"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** contains toolbar behaviour settings like float, etc. */
var ToolbarSettings = /** @class */ (function () {
    function ToolbarSettings(toolbarSettings) {
        this.autoAddMore = null; //  [true: used to be right/start]
        this.hover = 'right';
        this.show = 'hover';
        this.classes = '';
        if (toolbarSettings) {
            Object.assign(this, toolbarSettings);
        }
    }
    return ToolbarSettings;
}());
exports.ToolbarSettings = ToolbarSettings;
// ToDo: refactor to avoid side-effects
exports.defaultToolbarSettings = new ToolbarSettings({
    autoAddMore: null,
    hover: 'right',
    show: 'hover',
});
/** default / fallback settings for toolbars when nothings is specified */
exports.settingsForEmptyToolbar = new ToolbarSettings({
    autoAddMore: 'start',
    hover: 'left',
    show: 'hover',
});
exports.emptyToolbar = {
    toolbar: '',
    settings: exports.settingsForEmptyToolbar,
};
//# sourceMappingURL=toolbar-settings.js.map