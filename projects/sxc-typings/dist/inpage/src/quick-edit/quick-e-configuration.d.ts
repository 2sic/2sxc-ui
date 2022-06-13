export declare const QuickEditConfigEnableAuto: string;
/**
 * Buttons on a quick-edit toolbar
 */
export declare class QuickEditConfigButtons {
    /**
     * Enable the button to "Add Content"
     */
    addContent?: boolean;
    /**
     * Enable the button to "add App"
     */
    addApp?: boolean;
    /**
     * Enable the button "Select"
     */
    select?: boolean;
    /**
     * Enable the button "Paste"
     */
    paste?: boolean;
    /**
     * Enable the button "Delete"
     */
    delete?: boolean;
    /**
     * Enable the button "Move"
     */
    move?: boolean;
}
/**
 * Quick Edit Configuration which has an `enable` and specific button configurations
 */
export declare class QuickEditConfig {
    /**
     * Determine whether this section is enabled.
     */
    enable?: boolean | 'auto';
    /**
     * Optional detailed configuration of the buttons.
     */
    buttons?: QuickEditConfigButtons;
}
/**
 * Quick Edit - Full configuration at root, with `enable` and rules for `modules` and `innerBlocks`
 */
export declare class QuickEditConfigRoot extends QuickEditConfig {
    /**
     * The buttons configuration on the root.
     * Will be used for the `modules` and `innerBlocks` if not specified there.
     * Note that if not specified, will always default to true for all buttons.
     */
    buttons?: QuickEditConfigButtons;
    /**
     * Optional configuration for the Inner Content Blocks.
     */
    innerBlocks?: QuickEditConfig;
    /**
     * Optional configuration for the Modules.
     */
    modules?: QuickEditConfig;
}
