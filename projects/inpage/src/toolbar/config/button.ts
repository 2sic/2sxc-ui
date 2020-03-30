import { ButtonCommand } from '.';
import { CommandCode } from '../../commands/command-code';
import { CommandLinkGenerator } from '../../commands/command-link-generator';
import { CommandParams } from '../../commands/command-params';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Obj, TypeTbD } from '../../plumbing';
import { BuildRule } from '../rules';

/** This is the most common call signature on most ButtonConfig properties */
export type ButtonPropGen<T> = (context: ContextComplete) => T;

type ButtonGenOrProp<T> = ButtonPropGen<T> | T;

/**
 * The real button configuration as it's used at runtime
 */
export class Button {
    id: string;
    action: ButtonCommand;
    classes: string = '';
    modifier?: BuildRule;

    constructor(action: ButtonCommand, public name: string) {
        this.action = action;
        // if the name is an identifier, split it
        const parts = name.split('=');
        this.id = parts[0];
        this.name = parts[1] || name;
        // get defaults from action commandDefinition
        if (action?.command?.buttonDefaults)
            Obj.TypeSafeAssign(this, action.command.buttonDefaults);
    }

    /** Configure the link generator before it creates the link */
    configureLinkGenerator: (context: ContextComplete, linkGenerator: CommandLinkGenerator) => void;

    /** The dialog name */
    dialog?: ButtonGenOrProp<string>;

    /** Check if full-screen, always a function */
    fullScreen?: ButtonPropGen<boolean>;

    /** Determines if the button should be disabled */
    disabled?: ButtonGenOrProp<boolean>;

    /** Dynamicaly determine classes - must always be a function */
    dynamicClasses: ButtonPropGen<string>;

    /** The icon to show in the button */
    icon?: ButtonGenOrProp<string>;

    /** Determine if it should use the inline window, always a function */
    inlineWindow?: ButtonPropGen<boolean> = () => false;

    /** Check if we should open a new window, always an FN */
    newWindow?: ButtonPropGen<boolean>;

    /** Method which determines if it should be shown or not */
    showCondition?: ButtonPropGen<boolean>;

    /** The title of this button which will usually be i18n keys */
    title?: ButtonPropGen<string>;

    /** Determines if this button runs in the page - affecting publishing */
    partOfPage?: ButtonPropGen<boolean>;

    /** The code to run for this button - if empty, will default to open a dialog */
    code?: CommandCode;

    /** The parameters which are used to run the command */
    params?: ButtonPropGen<CommandParams>;

    /** this is just a UI interaction, won't create data so won't need pre-flight */
    uiActionOnly: ButtonPropGen<boolean>;



    /** Detect if this is a Button */
    static is(thing: TypeTbD): thing is Button {
        return (thing as Button).action !== undefined;
    }

    static isArray(thing: TypeTbD): thing is Button[] {
        return thing.length && Button.is(thing[0]);
    }

    static isPropGen<T>(thing: ButtonPropGen<T> | T): thing is ButtonPropGen<T> {
        return typeof thing === 'function';
    }
}

