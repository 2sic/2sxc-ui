import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { RuleManager } from '../rules/rule-manager';
import { ToolbarTemplate } from '../templates';

type TypeAutoAddMore = null | 'start' | 'end' | true; //  [true: used to be right/start]
type TypeHover = 'left' | 'right' | 'none';
type TypeShow = 'always' | 'hover';
export type TypeFollow = 'default' | 'none' | 'initial' | 'always' | 'scroll' ;

/**
 * Toolbar behavior settings like float, etc.
 */
export class ToolbarSettings {
    /** Automatically add the '...' more button to the toolbar */
    autoAddMore: TypeAutoAddMore = null;

    /** Hover placement of the toolbar */
    hover: TypeHover = 'right';

    /** Show behavior (always, hover, ...) */
    show: TypeShow = 'hover';

    /** Follow behavior - if the toolbar should scroll with the page or remain where it was hovered */
    follow: TypeFollow = 'default';

    /**
     * Old term, keep for compatibility. Please use `.class` instead
     * @obsolete
     */
    classes: string = '';

    /**
     * Term for the class for simplicity and consistency with button styling
     * New 10.27
     */
    class: string = '';

    /**
     * color configuration which applies to all buttons
     * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
     * New in 10.27
     */
    color?: string = '';

    /**
     * modifiers for the buttons
     * Should never be set from the page, but the toolbar initializer will set this
     * New in 10.27
     */
    _rules?: RuleManager;

    constructor(defaults: { autoAddMore?: TypeAutoAddMore, hover?: TypeHover, show?: TypeShow, follow?: TypeFollow }) {
        if (defaults.autoAddMore) this.autoAddMore = defaults.autoAddMore;
        if (defaults.hover) this.hover = defaults.hover;
        if (defaults.show)  this.show = defaults.show;
        this.follow = defaults.follow ?? 'default';
        if (this.follow === 'default') this.follow = 'none';
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

    static getDefaults = () => new ToolbarSettings({ autoAddMore: 'end', hover: 'right', show: 'hover', follow: 'default' });

    /** Setup for situations where an empty toolbar is needed, without any data or configuration */
    static getForEmpty = () => new ToolbarSettings({ autoAddMore: 'start', hover: 'left', show: 'hover', follow: 'default' });
}


// TODO: this is in the wrong place, shouldn't be in settings
export const ToolbarWhenNoToolbarProvided = {
  toolbar: {} as ToolbarTemplate,
  settings: ToolbarSettings.getForEmpty(),
} as ToolbarInitConfig;
