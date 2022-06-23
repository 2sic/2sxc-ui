import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { RuleManager } from '../rules/rule-manager';
declare type TypeAutoAddMore = null | 'start' | 'end' | true;
declare type TypeHover = 'left' | 'right' | 'none';
/**
 * @internal
 */
export declare const TOOLBAR_SHOW_ALWAYS = "always";
/**
 * @internal
 */
export declare const TOOLBAR_SHOW_HOVER = "hover";
declare type TypeShow = typeof TOOLBAR_SHOW_ALWAYS | typeof TOOLBAR_SHOW_HOVER;
/**
 * @internal
 */
export declare const TOOLBAR_FOLLOW_INITIAL = "initial";
/**
 * @internal
 */
export declare const TOOLBAR_FOLLOW_ALWAYS = "always";
/**
 * @internal
 */
export declare const TOOLBAR_FOLLOW_SCROLL = "scroll";
/**
 * @internal
 */
export declare type TypeFollow = 'default' | 'none' | typeof TOOLBAR_FOLLOW_INITIAL | typeof TOOLBAR_FOLLOW_ALWAYS | typeof TOOLBAR_FOLLOW_SCROLL;
/**
 * Toolbar behavior settings like float, etc.
 * @internal
 */
export declare class ToolbarSettings {
    /** Automatically add the '...' more button to the toolbar */
    autoAddMore: TypeAutoAddMore;
    /** Hover placement of the toolbar */
    hover: TypeHover;
    /** Show behavior (always, hover, ...) */
    show: TypeShow;
    /** Follow behavior - if the toolbar should scroll with the page or remain where it was hovered */
    follow: TypeFollow;
    /**
     * Old term, keep for compatibility. Please use `.class` instead
     * @obsolete
     */
    classes: string;
    /**
     * Term for the class for simplicity and consistency with button styling
     * New 10.27
     */
    class: string;
    /**
     * color configuration which applies to all buttons
     * use "colorname", "#xxyyzz" or "color1,color2" to specify the colors
     * New in 10.27
     */
    color?: string;
    /**
     * modifiers for the buttons
     * Should never be set from the page, but the toolbar initializer will set this
     * New in 10.27
     */
    _rules?: RuleManager;
    constructor(defaults: Partial<ToolbarSettings>);
    /**
     * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
     *
     * Note 2dm: not sure why we're doing this, but it seems like we only need this to merge
     * various objects, so we probably want to make sure the in-html-toolbar doesn't accidentally
     * contain null-items we don't want passed on
     * @param toolbarSettings
     */
    static dropEmptyProperties(toolbarSettings: ToolbarSettings): Partial<ToolbarSettings>;
    static getDefaults: () => ToolbarSettings;
    /** Setup for situations where an empty toolbar is needed, without any data or configuration */
    static getForEmpty: () => ToolbarSettings;
}
/**
 * @internal
 */
export declare const ToolbarWhenNoToolbarProvided: ToolbarInitConfig;
export {};
