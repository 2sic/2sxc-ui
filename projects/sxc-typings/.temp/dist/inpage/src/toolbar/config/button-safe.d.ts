import { Button } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 * @internal
 */
export declare class ButtonSafe {
    private button;
    private context;
    constructor(button: Button, context: ContextComplete);
    action: () => import("./button-command").ButtonCommand;
    classes: () => string;
    /** The dialog name - should default to the name */
    dialog: () => string;
    /** Determines if the button should be disabled */
    disabled: () => boolean;
    /** Dynamicaly determine classes - must always be a function */
    dynamicClasses: () => string;
    /** Check if full-screen, always a function */
    fullScreen: () => boolean;
    /** The icon to show in the button */
    icon: () => string;
    /** Determine if it should use the inline window, always a function */
    inlineWindow: () => boolean;
    /** Check if we should open a new window, always an FN */
    newWindow: () => boolean;
    /** The parameters which are used to run the command */
    addParamsToLink: () => import("../../commands").CommandParams;
    /** Determines if this button runs in the page - affecting publishing */
    partOfPage: () => boolean;
    /** Method which determines if it should be shown or not */
    showCondition: () => boolean;
    /** The title of this button which will usually be i18n keys */
    title: () => string;
    /** this is just a UI interaction, won't create data so won't need pre-flight */
    uiActionOnly: () => boolean;
}
