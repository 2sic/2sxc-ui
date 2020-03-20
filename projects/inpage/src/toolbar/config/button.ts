﻿import { ButtonCommand } from '.';
import { CommandCode } from '../../commands/command-code';
import { CommandLinkGenerator } from '../../commands/command-link-generator';
import { CommandParams } from '../../commands/command-params';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { TypeSafeAssign, TypeTbD, TypeUnsafe } from '../../plumbing';
import { InPageButtonJson } from '../config-loaders/in-page-button';


/** This is the most common call signature on most ButtonConfig properties */
export type ButtonPropertyGenerator<T> = (context: ContextBundleButton) => T;

/**
 * The real button configuration as it's used at runtime
 */
export class Button {
    action: ButtonCommand;
    classes: string = '';
    show: boolean = null; // maybe

    constructor(action: ButtonCommand, public name: string /*, partialConfig?: Partial<Button> */) {
        if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
            this.action = action;
            // get defaults from action commandDefinition
            TypeSafeAssign(this, action.commandDefinition.buttonConfig);
        }

        // if (partialConfig) TypeSafeAssign(this, partialConfig);
    }

    code: CommandCode; // void;
    configureCommand: (context: ContextBundleButton, linkGenerator: CommandLinkGenerator) => void;
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


    static normalize(oldFormat: Partial<Button> | ButtonConfigWithFunctionsStillAsValues | InPageButtonJson): Partial<Button> {
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

type ButtonPropertyGeneratorOrValue<T> = (context: ContextBundleButton) => T | T;

/**
 * This is a kind of clone of the ButtonConfig,
 * but with most properties being string/function possible
 * for later conversion into ButtonConfig
 */
interface ButtonConfigWithFunctionsStillAsValues {
    classes: string;
    // code: CommandCode; // void;
    // configureCommand: (context: ContextBundleButton, cmd: CommandExecution) => void;
    dialog: ButtonPropertyGeneratorOrValue<string>;
    disabled: ButtonPropertyGeneratorOrValue<boolean>;
    dynamicClasses: ButtonPropertyGeneratorOrValue<string>;
    dynamicDisabled: (() => boolean) | boolean;
    fullScreen: ButtonPropertyGeneratorOrValue<boolean>;
    icon: ButtonPropertyGeneratorOrValue<string>;
    inlineWindow: ButtonPropertyGeneratorOrValue<boolean>;
    newWindow: ButtonPropertyGeneratorOrValue<boolean>;
    // params: ButtonPropertyGenerator<DictionaryValue>;
    partOfPage: ButtonPropertyGeneratorOrValue<boolean>;
    showCondition: ButtonPropertyGeneratorOrValue<boolean>;
    title: ButtonPropertyGeneratorOrValue<string>;
    // uiActionOnly: ButtonPropertyGenerator<boolean>;
}