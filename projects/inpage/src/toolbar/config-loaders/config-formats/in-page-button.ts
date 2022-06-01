import { InPageCommandJson } from '..';
import { CommandParams } from '../../../commands/command-params';
import { TypeTbD, TypeUnsafe } from '../../../plumbing';
import { Button } from '../../config';

/**
 * Button Definition v1. from old API
 * it is publicly used out of inpage, so take a care to preserve its signature
 * @internal
 */
export class InPageButtonJson {

    /** the internal command which will be called, should contain both the name and the parameters like { action: "new", contentType: "BlogPost"} */
    command?: InPageCommandJson;

    /** text which is shown on mouse-over. Note that 2sxc will try to run it through the translator, so you can also use placeholders like Toolbar.Metadata */
    title?: string;

    /** a css class giving the button the icon. It can be one of the icons 2sxc provides, or it can be your own - just be sure to include a CSS & font which resolves the icon */
    icon?: string;

    // classes comma separated list of class-names like makeRed,glowHover
    classes?: string;

    /** disabled would disable the click on the button */
    disabled?: boolean;

    /**
     * partOfPage (new in 2sxc 9.5)
     * determines if resulting changes should effect the Evoq/DNN Page Publishing
     * note that it only effects the page-lifecyle, if the resulting dialogs and APIs respect this setting
     */
    partOfPage?: boolean;

    /** if this is just something visual; otherwise a webservice will ensure that a content-group exists (for editing etc.) */
    uiActionOnly?: boolean;

    /** the code executed on click, if it's not the default action */
    code?<T>(settings: CommandParams): Promise<void | T>;

    dialog?: string;
    newWindow?: boolean;
    inlineWindow?: boolean;
    fullScreen?: boolean;

    _expanded?: boolean; // marker to determine that the configuration has already been initialized

    // check two common signatures - command and action
    static is(thing: TypeTbD): thing is InPageButtonJson {
        return thing.command !== undefined || thing.action !== undefined;
    }

    static isArray(thing: TypeTbD[]): thing is InPageButtonJson[] {
        return thing.length > 0 && InPageButtonJson.is(thing[0]);
    }

    static toButton(oldFormat: InPageButtonJson): Partial<Button> {
        const config: Partial<Button> = {};

        // simple value properties
        if (oldFormat.classes) config.classes = oldFormat.classes;
        if (oldFormat.dialog) config.dialog = oldFormat.dialog;
        if (oldFormat.disabled) config.disabled = oldFormat.disabled;
        if (oldFormat.icon) config.icon = oldFormat.icon;

        // Method Properties
        if (oldFormat.fullScreen) config.fullScreen = evalPropOrFun(oldFormat.fullScreen);
        if (oldFormat.icon) config.icon = evalPropOrFun(oldFormat.icon);
        if (oldFormat.inlineWindow) config.inlineWindow = evalPropOrFun(oldFormat.inlineWindow);
        if (oldFormat.newWindow) config.newWindow = evalPropOrFun(oldFormat.newWindow);
        if (oldFormat.partOfPage) config.partOfPage = evalPropOrFun(oldFormat.partOfPage);
        if (oldFormat.title) config.title = evalPropOrFun(oldFormat.title);
        // if (oldFormat.dynamicClasses) config.dynamicClasses = evalPropOrFun(oldFormat.dynamicClasses);
        // if (oldFormat.showCondition) config.showCondition = evalPropOrFun(oldFormat.showCondition);

        return config;
    }

    //#region these are properties 2dm found but think they are never used. Keeping them till ca. May 2020

    // dynamicClasses(settings) can be used to dynamically build classes depending on the situation
    // 2020-03-27 2dm disabled this - doesn't make much sense in the in-page configuration
    // dynamicClasses?(settings: CommandParams): string;

    // showCondition - used to dynamically choose if this button should be shown or not
    // 2020-03-27 2dm disabled this - doesn't make much sense in the in-page configuration
    // showCondition?(settings: CommandParams): boolean;

    // 2020-03-27 2dm disabled, seems very unused
    // name?: string;

    // entity support (vertical compatibility for pre 2sxc v9.x)
    // entity?: number;
    // useModuleList?: boolean;
    // entityId?: number;
    // sortOrder?: number;

    // params?: CommandParams;
    //#endregion
}


function evalPropOrFun(propOrFunction: TypeTbD): TypeUnsafe {
    if (propOrFunction === undefined || propOrFunction === null) return false;
    if (typeof (propOrFunction) === 'function') return propOrFunction;
    return () => propOrFunction;
}
