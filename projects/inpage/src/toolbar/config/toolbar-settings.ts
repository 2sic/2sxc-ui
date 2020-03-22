import { ButtonModifier } from '.';
import { TypeSafeAssign } from '../../plumbing/type-safe-assign';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { ToolbarTemplate } from '../templates/toolbar-template-toolbar';

/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
    autoAddMore: null | 'start' | 'end' | true = null; //  [true: used to be right/start]
    hover: 'left' | 'right' | 'none' = 'right';
    show: 'always' | 'hover' = 'hover';
    classes: string = '';

    /**
     * Experimental 10.27 - modifiers for the buttons
     * Should never be set from the page, but the toolbar initializer will set this
     */
    _btnModifiers: ButtonModifier[] = [];

    constructor(toolbarSettings?: Partial<ToolbarSettings>) {
        if (toolbarSettings)
            TypeSafeAssign(this, toolbarSettings);
    }

    static evalModifier(name: string, settings: ToolbarSettings) {
        name = name.toLocaleLowerCase();
        const set = settings._btnModifiers.find((bf) => bf.name === name);
        return (set) ? set.operation : null;
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
