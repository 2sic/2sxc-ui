import { ButtonCommand } from '.';
import { CommandCode } from '../../commands/command-code';
import { CommandLinkGenerator } from '../../commands/command-link-generator';
import { CommandParams } from '../../commands/command-params';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { Obj, TypeTbD, TypeUnsafe } from '../../plumbing';
import { InPageButtonJson } from '../config-loaders';
import { ButtonModifier } from './button-modifier';


/** This is the most common call signature on most ButtonConfig properties */
export type ButtonPropertyGenerator<T> = (context: ContextComplete) => T;

/**
 * The real button configuration as it's used at runtime
 */
export class Button {
    action: ButtonCommand;
    classes: string = '';

    modifier?: ButtonModifier;

    constructor(action: ButtonCommand, public name: string /*, partialConfig?: Partial<Button> */) {
        if (action && action.command && action.command.buttonConfig) {
            this.action = action;
            // get defaults from action commandDefinition
            Obj.TypeSafeAssign(this, action.command.buttonConfig);
        }

        // if (partialConfig) TypeSafeAssign(this, partialConfig);
    }

    code: CommandCode; // void;
    configureCommand: (context: ContextComplete, linkGenerator: CommandLinkGenerator) => void;
    dialog: ButtonPropertyGenerator<string>;
    disabled: ButtonPropertyGenerator<boolean>;
    dynamicClasses: ButtonPropertyGenerator<string>;
    dynamicDisabled: (() => boolean) = () => false;
    fullScreen: ButtonPropertyGenerator<boolean>;
    icon: ButtonPropertyGenerator<string>;
    inlineWindow: ButtonPropertyGenerator<boolean>;
    newWindow: ButtonPropertyGenerator<boolean>;
    params: ButtonPropertyGenerator<CommandParams>;
    partOfPage: ButtonPropertyGenerator<boolean>;
    showCondition: ButtonPropertyGenerator<boolean>;
    title: ButtonPropertyGenerator<string>;
    uiActionOnly: ButtonPropertyGenerator<boolean>;


    static propertyToMethod(oldFormat: Partial<Button> | InPageButtonJson): Partial<Button> {
        const config: Partial<Button> = {};

        if (oldFormat.classes) config.classes = oldFormat.classes;
        if (oldFormat.dialog) config.dialog = evalPropOrFun(oldFormat.dialog);
        if (oldFormat.disabled) config.disabled = evalPropOrFun(oldFormat.disabled);
        if (oldFormat.dynamicClasses) config.dynamicClasses = evalPropOrFun(oldFormat.dynamicClasses);
        if (oldFormat.fullScreen) config.fullScreen = evalPropOrFun(oldFormat.fullScreen);
        if (oldFormat.icon) config.icon = evalPropOrFun(oldFormat.icon);
        if (oldFormat.inlineWindow) config.inlineWindow = evalPropOrFun(oldFormat.inlineWindow);
        if (oldFormat.newWindow) config.newWindow = evalPropOrFun(oldFormat.newWindow);
        if (oldFormat.partOfPage) config.partOfPage = evalPropOrFun(oldFormat.partOfPage);
        if (oldFormat.showCondition) config.showCondition = evalPropOrFun(oldFormat.showCondition);
        if (oldFormat.title) config.title = evalPropOrFun(oldFormat.title);

        return config;
    }

    /** Detect if this is a Button */
    static is(thing: TypeTbD): thing is Button {
        return (thing as Button).action !== undefined;
    }

    static isArray(thing: TypeTbD): thing is Button[] {
        return thing.length && Button.is(thing[0]);
    }
}

function evalPropOrFun(propOrFunction: TypeTbD): TypeUnsafe {
    if (propOrFunction === undefined || propOrFunction === null) return false;
    if (typeof (propOrFunction) === 'function') return propOrFunction;
    return () => propOrFunction;
}

type ButtonPropertyGeneratorOrValue<T> = (context: ContextComplete) => T | T;
