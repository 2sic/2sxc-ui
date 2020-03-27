import { ButtonCommand } from '.';
import { CommandCode } from '../../commands/command-code';
import { CommandLinkGenerator } from '../../commands/command-link-generator';
import { CommandParams } from '../../commands/command-params';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { isNothing, Obj, TypeTbD } from '../../plumbing';
import { ButtonModifier } from './button-modifier';

/** This is the most common call signature on most ButtonConfig properties */
export type ButtonPropGen<T> = (context: ContextComplete) => T;

type ButtonGenOrProp<T> = ButtonPropGen<T> | T;

/**
 * The real button configuration as it's used at runtime
 */
export class Button {
    action: ButtonCommand;
    classes: string = '';

    modifier?: ButtonModifier;

    constructor(action: ButtonCommand, public name: string) {
        if (action?.command?.buttonDefaults) {
            this.action = action;
            // get defaults from action commandDefinition
            Obj.TypeSafeAssign(this, action.command.buttonDefaults);
        }
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

    code: CommandCode; // void;

    /** The parameters which are used to run the command */
    params?: ButtonPropGen<CommandParams>;

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

    /** Evaluate a property or generator and return the property */
    static getVal<T>(propOrGen: ButtonPropGen<T> | T, ctx: ContextComplete, fallback: T): T {
        return (isNothing(propOrGen))
            ? fallback
            : (Button.isPropGen(propOrGen) ? propOrGen(ctx) : propOrGen);
    }
}

