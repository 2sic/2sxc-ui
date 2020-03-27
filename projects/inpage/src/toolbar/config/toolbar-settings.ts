import { ButtonModifier } from '.';
import { Obj } from '../../plumbing';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { ToolbarTemplate } from '../templates';

/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
    autoAddMore: null | 'start' | 'end' | true = null; //  [true: used to be right/start]
    hover: 'left' | 'right' | 'none' = 'right';
    show: 'always' | 'hover' = 'hover';
    classes: string = '';

    /**
     * BETA EXPERIMENTAL
     * color configuration which applies to all buttons
     * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
     */
    color?: string = '';

    /**
     * Experimental 10.27 - modifiers for the buttons
     * Should never be set from the page, but the toolbar initializer will set this
     */
    _modifiers: ButtonModifier[] = [];

    constructor(toolbarSettings?: Partial<ToolbarSettings>) {
        if (toolbarSettings)
            Obj.TypeSafeAssign(this, toolbarSettings);
    }


    /**
     * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
     *
     * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
     * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
     * contain null-items we don't want passed on
     * @param toolbarSettings
     */
    static dropEmptyProperties(toolbarSettings: ToolbarSettings): Partial<ToolbarSettings> {
        const partialSettings = {...toolbarSettings};
        if (!partialSettings.autoAddMore) delete partialSettings.autoAddMore;
        if (!partialSettings.classes) delete partialSettings.classes;
        return partialSettings;
    }

}



// ToDo: refactor to avoid side-effects
export const ToolbarSettingsDefaults = new ToolbarSettings({
  autoAddMore: null, // null | 'start' | 'end' | true
  hover: 'right', // 'left' |'right' | 'none'
  show: 'hover', // 'always' | 'hover'
});

/** default / fallback settings for toolbars when nothings is specified */
export const ToolbarSettingsForEmpty = new ToolbarSettings({
  autoAddMore: 'start', // ex: 'left'
  hover: 'left',
  show: 'hover',
});

// TODO: this is in the wrong place, shouldn't be in settings
export const ToolbarEmpty = {
  toolbar: {} as ToolbarTemplate,
  settings: ToolbarSettingsForEmpty,
} as ToolbarInitConfig;
