import { ButtonCommand } from '.';
import { CommandNames, CommandParams } from '../../commands';
import { CommandCode } from '../../commands/command-code';
import { CommandLinkGenerator } from '../../commands/command-link-generator';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { TypeTbD } from '../../plumbing';
/**
 * This is the most common call signature on most ButtonConfig properties
 * @internal
 */
export declare type ButtonPropGen<T> = (context: ContextComplete) => T;
declare type ButtonGenOrProp<T> = ButtonPropGen<T> | T;
/**
 * The real button configuration as it's used at runtime
 * @internal
 */
export declare class Button {
    /** The ID is important for tracking this button and applying modifiers */
    id: string;
    /** The underlying command which will be run */
    command: ButtonCommand;
    /** classes which will be applied to this button */
    classes: string;
    constructor(command: ButtonCommand, name: string);
    static splitName(identifier: string): {
        id: string;
        name: CommandNames;
    };
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
    inlineWindow?: ButtonPropGen<boolean>;
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
    /**
     * Additional parameters which are used to RUN the command.
     * So it's not used when preparing a toolbar button, but only when executing
     */
    addParamsToLink?: ButtonPropGen<CommandParams>;
    /** this is just a UI interaction, won't create data so won't need pre-flight */
    uiActionOnly: ButtonPropGen<boolean>;
    /** Detect if this is a Button */
    static is(thing: unknown): thing is Button;
    static isArray(thing: TypeTbD): thing is Button[];
    static isPropGen<T>(thing: ButtonGenOrProp<T>): thing is ButtonPropGen<T>;
}
export {};
