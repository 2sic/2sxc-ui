import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { RuleManager } from '../rules/rule-manager';
import { ToolbarTemplate } from '../templates';

type TypeAutoAddMore = null | 'start' | 'end' | true; //  [true: used to be right/start]
type TypeHover = 'left' | 'right' | 'none';
type TypeShow = 'always' | 'hover';

/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
    autoAddMore: TypeAutoAddMore = null;
    hover: TypeHover = 'right';
    show: TypeShow = 'hover';

    // old term, keep for compatibility, but new is class
    classes: string = '';

    // New 10.27 term for the class for simplicity and consistency with button styling
    class: string = '';

    /**
     * New in 10.27
     * color configuration which applies to all buttons
     * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
     */
    color?: string = '';

    /**
     * New in 10.27 - modifiers for the buttons
     * Should never be set from the page, but the toolbar initializer will set this
     */
    _rules?: RuleManager;

    constructor(defaults: { autoAddMore?: TypeAutoAddMore, hover?: TypeHover, show?: TypeShow }) {
        if (defaults.autoAddMore) this.autoAddMore = defaults.autoAddMore;
        if (defaults.hover) this.hover = defaults.hover;
        if (defaults.show)  this.show = defaults.show;
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

    static getDefaults = () => new ToolbarSettings({ autoAddMore: 'end', hover: 'right', show: 'hover' });

    /** Setup for situations where an empty toolbar is needed, without any data or configuration */
    static getForEmpty = () => new ToolbarSettings({ autoAddMore: 'start', hover: 'left', show: 'hover' });
}


// TODO: this is in the wrong place, shouldn't be in settings
export const ToolbarWhenNoToolbarProvided = {
  toolbar: {} as ToolbarTemplate,
  settings: ToolbarSettings.getForEmpty(),
} as ToolbarInitConfig;
