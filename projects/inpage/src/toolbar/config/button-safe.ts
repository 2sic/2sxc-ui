import { Button, ButtonPropGen } from '.';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { isNothing } from '../../plumbing';

/**
 * Special helper to read a button configuration
 * and make sure that all properties have the correct fallback values
 */
export class ButtonSafe {
    constructor(private button: Button, private context: ContextComplete) {
    }

    action = () => this.button.command;

    classes = () => this.button.classes || '';

    /** The dialog name - should default to the name */
    dialog = () => getVal (this.button.dialog, this.context, this.button.command.name);

    /** Determines if the button should be disabled */
    disabled = () => getVal (this.button.disabled, this.context, false);

    /** Dynamicaly determine classes - must always be a function */
    dynamicClasses = () => getVal (this.button.dynamicClasses, this.context, '');

    /** Check if full-screen, always a function */
    fullScreen = () => getVal (this.button.fullScreen, this.context, false);

    /** The icon to show in the button */
    icon = () => getVal (this.button.icon, this.context, '');

    /** Determine if it should use the inline window, always a function */
    inlineWindow = () => getVal (this.button.inlineWindow, this.context, false);

    /** Check if we should open a new window, always an FN */
    newWindow = () => getVal (this.button.newWindow, this.context, false);

    /** The parameters which are used to run the command */
    params = () => getVal (this.button.params, this.context, {});


    /** Determines if this button runs in the page - affecting publishing */
    partOfPage = () => getVal (this.button.partOfPage, this.context, false);


    /** Method which determines if it should be shown or not */
    showCondition = () => getVal (this.button.showCondition, this.context, true);


    /** The title of this button which will usually be i18n keys */
    title = () => getVal (this.button.title, this.context, 'unknown-title');

    /** this is just a UI interaction, won't create data so won't need pre-flight */
    uiActionOnly = () => getVal (this.button.uiActionOnly, this.context, true);

}


/** Evaluate a property or generator and return the property */
function getVal<T>(propOrGen: ButtonPropGen<T> | T, ctx: ContextComplete, fallback: T): T {
    return (isNothing(propOrGen))
        ? fallback
        : (Button.isPropGen(propOrGen) ? propOrGen(ctx) : propOrGen);
}