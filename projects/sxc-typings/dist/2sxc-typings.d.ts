/**
 * @internal
 */
export declare const Actions: ContentListActions;

/** @internal */
export declare class AjaxPromise {
    private api;
    private sxc;
    constructor(api: SxcWebApi, sxc: Sxc);
    /**
     * Make a jQuery style promise request
     * @param settings: settings
     * @returns JQueryPromise<any>
     */
    makePromise(settings: ZzzAjaxSettingsDeprecated): any;
    /**
     * Generate the correct WebApi url
     * @param settings the settings as they would be in jQuery
     */
    private getActionUrl;
}

/**
 * The fallback AntiForgery token header name (as in Dnn)
 * @internal
 */
export declare const AntiForgeryTokenHeaderNameDnn = "RequestVerificationToken";

/**
 * Any identifier, which can be any of the above
 * @internal
 */
export declare type AnyIdentifier = (ItemIdentifierSimple | ItemIdentifierCopy | ItemIdentifierInList | TemplateIdentifier);

/**
 * This is a placeholder in the settings, which must be replaced with "2sxc" or another term for other dnn extensions
 * @internal
 */
export declare const ApiExtensionPlaceholder = "e.x.t";

/** @internal */
export declare const ApiUrlRoots: string[];

/** @internal */
export declare const AppApiMap: {
    'app-api': string;
    'app-query': string;
    'app-content': string;
};

/** @internal */
export declare const AppApiMarker = "app";

/**
 * Attribute Names used in the HTML
 */
export declare const Attributes: {
    InstanceId: string;
    Context: string;
    ContentBlockId: string;
};

/**
 * @internal
 */
declare interface AttrJsonContentGroup extends ContentBlockUnifiedInCtxAndAttr, ContentAppUnifiedInCtxAndAttr {
    IsCreated: boolean;
    IsList: boolean;
    TemplateId: number;
    Edition: string;
    /**
     * new 17.08, CSV of editions
     */
    editions: string;
    TemplatePath: string;
    QueryId: number | null;
    /** new 17.07 */
    queryName: string;
    /** new 17.07 */
    queryInfo: string;
    ContentTypeName: string;
    AppUrl: string;
    AppSettingsId: number;
    AppResourcesId: number;
    IsContent: boolean;
    HasContent: boolean;
    SupportsAjax: boolean;
    ZoneId: number;
    AppId: number;
    Guid: string;
    Id: number;
}

/**
 * @internal
 */
declare interface AttrJsonEditContext extends InstanceContext {
    Environment: AttrJsonEnvironment;
    User: AttrJsonUser;
    Language: AttrJsonLanguage;
    /** Reference to the content block with information about the parent */
    contentBlockReference?: ContentBlockReference;
    /** Information about the content block itself */
    contentBlock: AttrJsonContentGroup;
    error?: ContextErrorJsonAndObj;
    Ui?: AttrJsonUi;
    jsApi: EnvironmentSpecs;
}

/**
 * @internal
 */
declare interface AttrJsonEntity {
    Key: string;
    Value: string;
}

/**
 * @internal
 */
declare interface AttrJsonEnvironment {
    WebsiteId: number;
    WebsiteUrl: string;
    PageId: number;
    PageUrl: string;
    parameters: AttrJsonEntity[] | null;
    InstanceId: number;
    SxcVersion: string;
    SxcRootUrl: string;
    IsEditable: boolean;
}

/**
 * @internal
 */
declare interface AttrJsonLanguage {
    Current: string;
    Primary: string;
    All: string[] | null;
}

/**
 * @internal
 */
declare interface AttrJsonUi {
    AutoToolbar: boolean;
    Form: string;
}

/**
 * @internal
 */
declare interface AttrJsonUser {
    CanDevelop: boolean;
    CanAdmin: boolean;
    /**
     * user can switch editions; lower case!
     */
    canSwitchEdition: boolean;
}

/**
 * Contains a rule how to add/modify a toolbar.
 * @internal
 */
declare class BuildRule extends HasLog {
    ruleString: string;
    /** The ID for this rule - often the same as the name */
    id: string;
    /** Name of the thing being added - often a command name or can be the group name */
    name: string;
    /** The build command to run */
    step: BuildSteps | string;
    /** what this rule should do */
    operator: Operations;
    /** Group name - when adding more buttons */
    group: string;
    /**
     * position where something is added - the group or the button
     * Note that JS preserves -0
     */
    pos: number;
    params?: RuleParams;
    /**
     * Button Rules - determines what a button should do / not do
     * Note: can also be Partial<ToolbarSettings>
     */
    ui: ToolbarButtonSettings & Partial<ToolbarSettings>;
    context: {
        appId?: number;
        zoneId?: number;
        complete?: boolean;
    };
    /** WIP v20 new? */
    settings?: Record<string, unknown>;
    constructor(ruleString: string, parentLog: Log);
    static Create({ name, ui, params, pos, log }: {
        name: string;
        ui?: ToolbarButtonSettings & Partial<ToolbarSettings>;
        params?: RuleParams;
        pos?: number;
        log: Log;
    }): BuildRule;
    /** Tells if this rule will override the show settings  */
    overrideShow(): boolean | null;
    private load;
    private loadHeader;
    private setIdBasedOnOperation;
    /**
     * Load the header
     * @param forKey the key being loaded, to handle special case settings/toolbar
     * @param rest the parameters to process
     */
    private loadHeaderAndUi;
    private loadParamsAndPrefill;
}

/**
 * @internal
 */
declare enum BuildSteps {
    toolbar = "toolbar",
    group = "group",
    button = "button",
    params = "params",
    settings = "settings"
}

/**
 * Build a SXC Controller for the page. Should only ever be executed once
 * @internal
 */
export declare function buildSxcRoot(): SxcGlobal;

/**
 * This is a system to build button configurations
 * @internal
 */
declare class ButtonConfigLoader extends HasLog {
    #private;
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    /**
     * takes an object like "actionname" or { action: "actionname", ... }
     * and changes it to a { command: { action: "actionname" }, ... }
     */
    normalize(original: InPageButtonJson | InPageCommandJson | string): InPageButtonJson;
    btnConfigStructure(name: string, params: {}): InPageButtonJson;
    /**
     * remove buttons which are not valid based on add condition
     */
    removeDisableButtons(context: ContextComplete, full: Toolbar): void;
    /**
     * enhance button-object with default icons, etc.
     */
    addDefaultBtnSettings(btn: ButtonConfiguration, groupDefaults: Record<string, TypeValue> | null, tlbDefaults: Record<string, TypeValue> | null | undefined, actions: Commands): void;
}

/**
 * The real button configuration as it's used at runtime.
 * It identifies the button by an ID, has the command to run, and
 * gets defaults from the command definition.
 * @internal
 */
declare class ButtonConfiguration {
    overrides?: Partial<ButtonDefinition>;
    /** The ID is important for tracking this button and applying modifiers */
    id: string;
    /** The underlying command which will be run */
    command: CommandWithParams;
    /** The definition defaults to use for this button */
    definition: Partial<ButtonDefinition>;
    constructor(nameOrNamePair: string, command: CommandWithParams, overrides?: Partial<ButtonDefinition>);
    static splitName(identifier: string): {
        id: string;
        name: CommandNames;
    };
    /** Detect if this is a Button */
    static is(thing: unknown): thing is ButtonConfiguration;
    static isButtonArray(thing: unknown): thing is ButtonConfiguration[];
}

/**
 * A button definition contains all the possible properties which can be defined
 * for a button. These are then used to create command structures for potential buttons.
 * @public
 */
declare class ButtonDefinition {
    /** classes which will be applied to this button */
    classes: string;
    /** Configure the link generator before it creates the link */
    /** Replacement for configureLinkGenerator - v20.09 */
    customItems?: (ctx: ContextCompleteWithButton, items: AnyIdentifier[]) => AnyIdentifier[];
    tweakGeneratedUrlParameters?: (context: ContextCompleteWithButton, itemUrlParameters: ItemUrlParameters) => ItemUrlParameters;
    /** The dialog name */
    dialog?: ButtonPropGenOrValue<string>;
    /** Check if full-screen, always a function */
    fullScreen?: ButtonPropGen<boolean>;
    /** Determines if the button should be disabled */
    disabled?: ButtonPropGenOrValue<boolean>;
    /** Dynamically determine classes - must always be a function */
    dynamicClasses?: ButtonPropGen<string>;
    /** The icon to show in the button */
    icon?: ButtonPropGenOrValue<string>;
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
     * The color which could be supplied per button - new for `info`
     * New v15.04
     */
    color?: ButtonPropGen<string | undefined>;
    /**
     * The tippy which could be supplied per button - new for `info`
     * v15.04
     */
    tippy?: (context: ContextCompleteWithButton, tag: HTMLElement) => void;
    /**
     * Additional! parameters which are used to RUN the command.
     * So it's not used when preparing a toolbar button, but only when executing
     *
     * Important: used to be called 'addParamsToLink' up to v18.03
     */
    parameters?: ButtonPropGen<CommandParams>;
    /** this is just a UI interaction, won't create data so won't need pre-flight */
    uiActionOnly?: ButtonPropGen<boolean>;
    /**
     * Ability to specify notes which will be shown in the toolbar
     * @internal
     */
    notes?: ButtonPropGen<Note[]>;
    /**
     * Specify that this button should not include items in the command
     * New 18.03
     * @internal
     */
    noItems?: ButtonPropGenOrValue<boolean>;
    /**
     * Allow the button to drop certain conflicting parameters which may be inherited from the main toolbar definition.
     * New 2026-06-22 v22 2dm
     * @internal
     */
    preCleanSharedParams?: (globalParams: CommandParams) => CommandParams;
}

/**
 * @internal
 */
declare class ButtonGroup {
    buttons: ButtonConfiguration[];
    /**
     * Group name - for identification
     * It's automatically set if using toolbar templates, otherwise it'll probably be undefined
     */
    name?: string;
    defaults: Record<string, TypeValue>;
    constructor(buttons: ButtonConfiguration[]);
    /** Detect if this is a ButtonGroup */
    static is(thing: unknown): thing is ButtonGroup;
    /** Detect if this is a ButtonGroup */
    static isArray(thing: unknown[]): thing is ButtonGroup[];
}

/**
 * @internal
 */
declare class ButtonGroupConfigLoader extends HasLog {
    #private;
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    expandButtonGroups(fullToolbar: ToolbarWip): Toolbar;
    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    convertToButton(btn: InPageButtonJson, sharedParams: CommandParams | Record<string, TypeValue>, sharedDefaults: Record<string, TypeValue>, groupDefaults: Record<string, TypeValue>): ButtonConfiguration;
    private expandButtonAndAddToList;
    /** Add the "more" button at the end or beginning */
    private addMoreButton;
}

/**
 * @internal
 */
declare type ButtonGroupWip = ButtonGroup | InPageButtonGroupJson | ToolbarTemplateGroup;

/**
 * This is the most common call signature on most ButtonConfig properties
 * @public
 */
declare type ButtonPropGen<T> = (context: ContextCompleteWithButton) => T;

declare type ButtonPropGenOrValue<T> = ButtonPropGen<T> | T;

export declare const C: {
    Attributes: {
        InstanceId: string;
        Context: string;
        ContentBlockId: string;
    };
    Sel: {
        SxcDivs: string;
    };
};

/**
 * Structure for constants in the selectors, to guarantee we got everything
 */
declare interface CbOrMod {
    id: string;
    class: string;
    selector: string;
    findAllLists: () => HTMLElement[];
    findClosestList: (element: HTMLElement) => HTMLElement;
    context: string;
    singleItem?: string;
}

/**
 * @internal
 */
export declare class CmdParHlp {
    static getIndex(params: CommandParams | ContextComplete): number;
}

/**
 * The CMS engine is global, and needs the context to work.
 * @internal
 */
export declare class CmsEngine extends HasLog {
    private runParamsHelper;
    constructor(parentLog?: Log);
    detectParamsAndRun<T>(context: ContextBundleInstance, nameOrParams: string | CommandParams, eventOrParams: CommandParams | MouseEvent, event?: MouseEvent): Promise<void | T>;
    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    run<T>(context: ContextComplete, params: CommandParams, event: MouseEvent, paramsWithWorkflow?: RunParams, triggeredBy?: string): Promise<void | T>;
    /**
     * Open a new dialog of the angular-ui
     */
    static openDialog<T>(context: ContextCompleteWithButton, event: MouseEvent, triggeredBy?: string): Promise<void | T>;
    static applyLinkToButton(event: MouseEvent, link: string, target: string | null): boolean;
}

/**
 * Parameters used for the command `add-existing`.
 * <br>
 * The contentType name determines what items will be shown in the dialog.
 * Depending on your use case, you will need to use the
 * [](xref:Api.Js.SxcJs.CommandParamsEntityInList) or [](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock) parameters as well.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandAddExistingParams extends CommandAddParams {
}

/**
 * Parameters used for the command `add`.
 * <br>
 * The `contentType` determines what items will be created, the `index` where.
 * Depending on your use case, you will need to use the
 * [](xref:Api.Js.SxcJs.CommandParamsEntityInList) or [](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock) parameters as well.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandAddParams extends CommandContentTypeParams, Pick<CommandParamsEntityInList, 'index'>, Partial<Omit<CommandParamsEntityInList, 'index'>>, Partial<Omit<CommandParamsEntityInContentBlock, 'index'>> {
}

/**
 * @internal
 */
export declare type CommandCode = <T>(context: ContextCompleteWithButton, event: MouseEvent, triggeredBy?: string) => Promise<void | T>;

/**
 * Parameters used for the command `code` on toolbars (new in v14.4).
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandCodeParams {
    /**
     * Name of the function to call - must be available in the context.
     * This is usually as a function window. Example:
     * <br>
     * If `call` is `sayHello` you need a `window.sayHello(params, context, event)`.
     */
    call: string;
}

/**
 * Parameters used for the command `contenttype`.
 * <br>
 * The content-type name determines what items will be loaded to manage the fields.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandContentTypeParams {
    /**
     * The content-type name
     */
    contentType: string;
}

/**
 * Parameters used for the command `copy`.
 * Will copy the entity on `entityId`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandCopyParams extends CommandContentTypeParams, CommandParamsEntityById {
}

/**
 * Parameters used for the _old_ command `custom` on toolbars.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @internal - keep for reference, but don't communicate
 */
export declare interface CommandCustomParams {
    /**
     * Name of the function to call - must be available in the context.
     * This is usually as a function window. Example:
     * <br>
     * If `call` is `sayHello` you need a `window.sayHello(context, event)`.
     */
    call: string;
    /**
     * **OBSOLETE - avoid using**
     * <br>
     * JavaScript as string containing the code to execute.
     * This is the old V9 - it contains a function, not a name
     * @deprecated
     */
    customCode: string;
}

/**
 * Parameters used for the command `data`.
 * <br>
 * The content-type name determines what items will be managed.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandDataParams extends CommandContentTypeParams {
    /**
     * Filters to apply to the list of items.
     * <br>
     * Each property targets a field.
     * The value is a string, number or array for filtering EntityIds or EntityGuids
     */
    filters?: Record<string, string | number | string[] | number[]>;
}

/**
 * @internal
 */
export declare class CommandDefinition {
    name: string;
    constructor(name: string);
    /** the defaults are important for new buttons that just know this command */
    buttonDefaults: Partial<ButtonDefinition>;
    /**
     * @internal
     */
    mergeDefaults(translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): void;
    /**
     * If config has links, add them and enable interactive
     */
    private tippyAddLinks;
    /**
     * If it needs to be interactive, then changes are made to allow mouse to travel to it.
     * eg. we need to append it to the body
     */
    private tippyMakeInteractive;
    /**
     *
     * @returns
     * @internal
     */
    static build(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): CommandDefinition;
    /**
     * @internal
     */
    static clone(command: CommandDefinition, name: string): CommandDefinition;
}

/**
 * Parameters used for the command `delete`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandDeleteParams {
    /**
     * ID of item to delete, usually detected from context.
     */
    entityId: number;
    /**
     * Guid of item to delete, usually detected from context.
     */
    entityGuid: string;
    /**
     * Title of item to delete, usually detected from context.
     * This is important to show the "Are you sure?" dialog.
     */
    entityTitle: string;
}

/**
 * Parameters used for the command `metadata`.
 * <br>
 * Will do either one of these:
 * - if it has an `entityId`, will just open `edit` for that Entity
 * - if it has no `entityId`, will open `new` for the current `contentType`
 * and assign to the target specified by `metadata`:
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandMetadataParams extends CommandContentTypeParams, CommandParamsEntityById {
    /**
     * Target to assign the metadata to.
     */
    metadata: CommandParamsMetadata;
}

/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 * @public
 */
export declare const enum CommandNames {
    /**
     * `add` adds another demo-item to a **list of items**.
     * It does not open the edit-dialog.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br>💡
     * This is different than new, which opens a dialog to add something.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddParams)
     */
    add = "add",
    /**
     * `add-existing` opens a dialog allowing the user to select an existing item to add to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddExistingParams)
     * <br> 🆕 in v11.01
     */
    addExisting = "add-existing",
    /**
     * `app` opens the app-admin dialog
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    app = "app",
    /**
     * `app-import` opens the dialog to import an App.
     * <br> 🔘 This is not available on the toolbar.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appImport = "app-import",
    /**
     * `app-resources` opens the edit dialog for app-resources (multi-language texts, labels etc.).
     * <br> 🔘 It's disabled on the toolbar if the app doesn't have resource-values to configure.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appResources = "app-resources",
    /**
     * `app-settings` opens the edit dialog for the app-settings.
     * <br> 🔘 It's disabled on the toolbar if the app doesn't have setting-values to configure
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appSettings = "app-settings",
    /**
     * `apps` opens the manage all apps dialog.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected based on toolbar)
     */
    apps = "apps",
    /**
     * `data` opens the list to manage all items of a specific content-type.
     * <br> 🔘 Will use the settings of the current template to open.
     * It is only shown to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandDataParams)
     */
    data = "data",
    /**
     * old name
     * @internal
     */
    data_old_contentItems = "contentitems",
    /**
     * `fields` opens the dialog to view or modify fields of a content-type.
     * <br> 🔘 On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    fields = "fields",
    /**
     * old name
     * @internal
     */
    fields_old_contenttype = "contenttype",
    /**
     * `copy` opens the edit-dialog for the current item in copy-mode, so when saving it will be a new item.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCopyParams)
     * <br> 🆕 in v14.03
     */
    copy = "copy",
    /**
     * `code` will execute custom javascript.
     * <br> 🔘 This is mainly for toolbars, to add buttons with custom code.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCodeParams)
     * <br> _this used to be called `custom` and had a different setup_
     */
    code = "code",
    /**
     * old name
     * @internal
     */
    code_old_custom = "custom",
    /**
     * `delete` will delete (not just remove) a content-item.
     * <br> 💡 This is similar to `remove` but really deletes the data from the DB.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandDeleteParams)
     * (auto-detected from context)
     */
    delete = "delete",
    /**
     * `edit` opens an edit-dialog.
     * <br>
     * In scenarios where the page is currently showing a _demo item_, this will have the same effect as `add`.
     * So instead of editing the _demo item_ it would trigger a dialog to add a new item.
     * <br> 🔘 Only appears if `entityId` is known or item is in a list.
     * <br> 📩 Parameters either one of these:
     * [Id](xref:Api.Js.SxcJs.CommandParamsEntityById),
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    edit = "edit",
    /**
     * `help` shows a button with a question mark and a tooltip with some info.
     * <br>
     * When clicked it opens a link.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     * TODO: AS IT'S basically identical with link, we should reconsider this...?
     */
    help = "help",
    /**
     * `image` opens the edit-dialog for the metadata of the current image
     * @internal - may be removed soon
     */
    image = "image",
    /**
     * `info` shows a button with a info icon, with optional tooltip and an alert with some info.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     */
    info = "info",
    /**
     * `insights` opens the insights logs page
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required.
     */
    insights = "insights",
    /**
     * old name
     * @internal
     */
    insights_old_server = "insights-server",
    /**
     * `link` shows a button with a link icon, with optional tooltip.
     * When clicked it opens a link.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     */
    link = "link",
    /**
     * `instance-list` opens a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    list = "list",
    /**
     * old name
     * @internal
     */
    list_old_instanceList = "instance-list",
    /**
     * `layout` opens the in-page dialog to change the layout of the current content.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    layout = "layout",
    /**
     * just add a log, mainly for verifying functionality of running commands
     * @internal
     */
    log = "log",
    /**
     * WIP
     * @internal
     */
    edition = "edition",
    /**
     * `metadata` opens the edit-dialog for the current metadata item.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandMetadataParams)
     */
    metadata = "metadata",
    /**
     * `more` create a "…" (ellipsis) button which flips through the button groups of toolbars
     * <br> 🔘 It only appears if the toolbar has `more`=`auto` and has multiple groups.
     * <br> 📩 No params required,
     * (auto-detected based on toolbar)
     */
    more = "more",
    /**
     * `movedown` moves a content-item down one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 Parameters either one of these:
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    moveDown = "movedown",
    /**
     * `moveup` moves a content-item up one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 Parameters either one of these:
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    moveUp = "moveup",
    /**
     * `new` opens the edit-dialog to create a new item/entity.
     * <br>
     * If the previous item is in a list, it will add it to that list _after_ the previous item with the toolbar.
     * Otherwise it just creates it and the visualization will differ depending on the App.
     * <br> 🪜 It works differently for lists - in which case it also adds it to the list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandNewParams)
     * (usually auto-detected from context)
     */
    new = "new",
    /**
     * `new` sets new mode used in parameters
     * @internal - must move, this shouldn't be here as it's not a command!
     */
    newMode = "new",
    /**
     * `publish` tells the system to update a content-items status to published. If there was a published and a draft before, the draft will replace the previous item
     * <br> 🔘 Appears automatically if the item is in draft mode / not published.
     * <br> 📩 Parameters either one of these:
     * [Id](xref:Api.Js.SxcJs.CommandParamsEntityById),
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    publish = "publish",
    /**
     * `remove` removes an item from a list of items.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    remove = "remove",
    /**
     * `replace` opens the dialog to assign a different content-item in this slot on module-assigned content items
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    replace = "replace",
    /**
     * `template-develop` opens the template-editor dialog in a new window.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    template = "template",
    /**
     * old name
     * @internal
     */
    template_old_develop = "template-develop",
    /**
     * `template-query` opens the pipeline/query-designer in a new window.
     * <br> 🔘 It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    query = "query",
    /**
     * old name
     * @internal
     */
    query_old_templateQuery = "template-query",
    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    view = "view",
    /**
     * old name
     * @internal
     */
    view_old_templateSettings = "template-settings",
    /**
     * `system` opens the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    system = "system",
    /**
     * old name
     * @internal
     */
    system_old_zone = "zone"
}

/**
 * Parameters used for the command `new`
 * <br>
 * The ContentType name determines what kind of item will be created.
 * <br>
 * Can also contain `prefill` to add values to the new item.
 * <br>
 * Can also contain list-information, in which case it's added to that list.
 * Depending on your use case, you will need to use the
 * [](xref:Api.Js.SxcJs.CommandParamsEntityInList) or [](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock) parameters as well.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandNewParams extends CommandContentTypeParams, Partial<CommandParamsEntityInList>, Partial<CommandParamsEntityInContentBlock> {
    /**
     * Optional values to prefill in the new-form
     */
    prefill?: Record<string, boolean | string | number>;
}

/**
 * Command parameters are handed over to a command for execution.
 * It contains all possible combinations of parameters that can be used in a command.
 *
 * We will try to improve how this is documented, but ATM it just has all parameters,
 * even though you may need none, or just a few.
 *
 * _Note: For your specific commands, you can also pass other parameters._
 *
 * **Important for the docs**
 *
 * Most properties are actually not visible (you will get them in the types though).
 * So actually you will usually create one of these:
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityById)
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock)
 * * [](xref:Api.Js.SxcJs.CommandParamsEntityInList)
 * * [](xref:Api.Js.SxcJs.CommandAddParams)
 * * [](xref:Api.Js.SxcJs.CommandAddExistingParams)
 * * [](xref:Api.Js.SxcJs.CommandDataParams)
 * * [](xref:Api.Js.SxcJs.CommandCopyParams)
 * * [](xref:Api.Js.SxcJs.CommandCodeParams)
 * * [](xref:Api.Js.SxcJs.CommandDeleteParams)
 * * [](xref:Api.Js.SxcJs.CommandMetadataParams)
 * * [](xref:Api.Js.SxcJs.CommandNewParams)
 *
 * Because of this, most of the properties below are NOT documented, as their purpose can change depending on the command used.
 * @public
 */
export declare interface CommandParams extends Record<string, unknown> {
    /**
     * The action is used in scenarios where the command name must be included
     * @internal - wait with publishing this, it shouldn't actually be here. we may need to create another type which includes it
     */
    action?: CommandNames;
    /** @internal */
    items?: Array<ItemIdentifierSimple | ItemIdentifierInList>;
    /**
     * Special change of dialogs, for example to change the edit-dialog into a new-dialog.
     * @internal - not sure how this matches / replaces dialog, probably internal only
     */
    mode?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    contentType?: string;
    /** @internal old */
    contentTypeName?: string;
    /** @internal */
    pipelineId?: number;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    filters?: string;
    /** @internal */
    dialog?: string;
    /**
     * @internal
     * @deprecated but still in use
     */
    sortOrder?: number;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    index?: number;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityId?: number;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityGuid?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    entityTitle?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    title?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * This is only for the module-specific list of items.
     * When using parent/fields, this is not relevant.
     * @public
     */
    useModuleList?: true;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    metadata?: CommandParamsMetadata;
    /** @internal */
    isPublished?: boolean;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    prefill?: Record<string, boolean | string | number | Date>;
    /**
     * Custom Code in the previous V9 standard
     * @internal
     */
    customCode?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    call?: string;
    /**
     * New in 10.27 - list of apps for the quick dialog
     * @internal
     */
    apps?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    parent?: string;
    /**
     * Combined with the parent property determines what to edit
     * @internal
     */
    fields?: string;
    /**
     *
     * New 16.00 - not public yet
     * @internal
     */
    uifields?: string;
    /**
     * Form parameters
     *
     * New 16.02 - not public yet
     * @internal
     */
    form?: Record<string, TypeValue>;
    /**
     * for template edit dialog
     * @internal
     */
    isshared?: boolean;
    /**
     * for copying an entity - the id of the entity to copy - new 20.09
     * EXPERIMENTAL - WILL PROBABLY BE REMOVED AGAIN
     * @internal
     */
    copyId?: number;
    /**
     * Settings to pass to the dialog.
     *
     * @internal v18.07 - not public - trying to finalize v20 (believe it was not used yet)
     */
    settings?: unknown;
}

/**
 * Parameters used for commands which need an entity ID or a list-reference.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandParamsEntity extends CommandParamsEntityById, CommandParamsEntityInContentBlock, CommandParamsEntityInList {
}

/**
 * Parameters used for commands which address a specify entity.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandParamsEntityById {
    /**
     * ID of item to edit.
     */
    entityId: number;
}

/**
 * Parameters used for command which expect an item from a list of a ContentBlock.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandParamsEntityInContentBlock {
    /**
     * Determines the position of the item in the list.
     * index was added in v14.04 to replace the `sortOrder` which had a confusing name.
     */
    index: number;
    /**
     * Must be true, to work on the module list.
     */
    useModuleList: true;
}

/**
 * Parameters used for command which expect an item in a list (field) of a parent.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export declare interface CommandParamsEntityInList {
    /**
     * Determines the position of the item in the list of that entity-field.
     */
    index: number;
    /**
     * Parent Entity field(s) name(s).
     * Usually just one field, like `Authors`.
     * In field-sets it could be `Author,Award` or similar.
     */
    fields: string;
    /**
     * Parent entity _GUID_ which has the field referencing this item.
     */
    parent: string;
}

/**
 * Parameters on `metadata` for commands which have a metadata-target.
 * @public
 */
export declare interface CommandParamsMetadata {
    /**
     * The key which identifies the target of this metadata item
     */
    key: string;
    /**
     * the key type, will default to 'string'
     */
    keyType?: string;
    /**
     * The target type, will default to 10 = CMS-Item
     */
    targetType?: MetadataTargetTypes;
}

/**
 * Singleton Catalog of all commands
 * @internal
 */
export declare class Commands extends HasLog {
    #private;
    /** Singleton */
    static singleton(): Commands;
    static add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): CommandDefinition;
    static addCommand(command: CommandDefinition): void;
    list: Record<string, CommandDefinition>;
    private constructor();
    get: (name: string) => CommandDefinition;
    add(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<ButtonDefinition>): CommandDefinition;
    addCommand(command: CommandDefinition): void;
}

/**
 * @internal
 */
declare interface CommandWithParams {
    readonly commandDef: CommandDefinition;
    name: CommandNames;
    params?: CommandParams;
}

declare interface ContentAppUnifiedInCtxAndAttr {
    /**
     * App name for showing in the layout infos - new v17
     */
    appName: string;
}

/**
 * This contains a pointer to a content-block. The data is always provided by the server,
 * so this class is never really instantiated.
 * @internal
 */
declare interface ContentBlockReference {
    /** How changes are published - draft required/optional */
    publishingMode: string;
    /** ID of the reference item - very rarely used */
    id: number;
    /** GUID of the parent item referencing this Content Block */
    parentGuid: string | null;
    /** Field in which this content block is references */
    parentField: string | null;
    /** Index of the reference - what position it's in in the list of that field */
    parentIndex: number;
    /** If this content is part of the page */
    partOfPage: boolean;
}

declare interface ContentBlockUnifiedInCtxAndAttr {
    /**
     * Informs if the razor file is from a shared location - usually false.
     * Important for opening the code editor.
     *
     * True if the template comes from the shared location - new in v13
     * Changed to lower case in v17 and unified in v17
     */
    templateIsShared: boolean;
    /**
     * View name for showing in the layout infos - new v17
     */
    viewName: string;
    renderMs: number;
    renderLightspeed: boolean;
    /**
     * Disable the view switching, typically because the current view was triggered by a url parameter.
     */
    viewSwitchDisabled?: boolean;
}

/**
 * params for getAndReload WebAPI
 * @internal
 */
export declare class ContentListActionParams {
    id?: number;
    /** TODO: unclear if this really serves a purpose. it's only used in publish, replace etc., and I assume it must always publish both... */
    part?: string;
    parent?: string;
    fields?: string;
    /** The index for this item */
    index?: number;
    /** target index when re-ordering an item */
    toIndex?: number;
}

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @internal
 */
declare class ContentListActions {
    /**
     * add an item to the list at this position
     * @param {ContextCompleteWithButton} context
     * @param {number} index
     */
    addItem<T>(context: ContextCompleteWithButton, index: number): Promise<void | T>;
    /**
     * remove an item from a list, then reload
     */
    removeFromList(context: ContextCompleteWithButton): Promise<void>;
    /**
     * change the order of an item in a list, then reload
     */
    changeOrder(context: ContextCompleteWithButton, index: number, toIndex: number): Promise<void>;
    /**
     * set a content-item in this block to published, then reload
     */
    publish(context: ContextComplete, part: string, index: number): Promise<void>;
    /**
     * publish an item using it's ID
     */
    publishId(context: ContextComplete, entityId: number): Promise<void>;
}

/**
 * @public
 */
declare interface ContextBundleContent extends ContextBundleInstance {
    /**
     * information about the current item
     * @internal
     */
    /**
     * Reference to a Content-Block
     * @internal
     */
    contentBlockReference: ContentBlockReference;
    /**
     * The content-block itself with specs like is-app, etc.
     * @internal
     */
    contentBlock: ContextOfContentBlock;
}

/**
 * Context Bundle containing information about the current instance, app, page, system, user and ui.
 * Foundation for specific context bundles, even though ATM it's only inherited 1x and contains everything.
 * @public
 */
declare interface ContextBundleInstance {
    /**
     * Marker to specify that this is a correctly constructed context bundle
     * @internal
     */
    _isContext: true;
    /**
     * instance of sxc object
     * @internal
     */
    sxc: Sxc;
    /**
     * information related to the current DNN module, incl.instanceId, etc.
     * @internal
     */
    instance: ContextOfInstance;
    /**
     * this will be about the current app, settings of the app, app - paths, etc.
     * @internal
     */
    app: ContextOfApp;
    /**
     * ensure that the UI will load the correct assets to enable editing
     * @internal
     */
    ui: ContextOfUi;
    /**
     * this will be information related to the current page
     * @internal
     */
    page: ContextOfPage;
    /**
     * this will be everything about the current system, like system / api -paths etc.
     * @internal
     */
    system: ContextOfSystem;
    /** @internal */
    /**
     * things about the user
     * @internal
     */
    user: ContextOfUser;
}

/**
 * @public
 */
declare interface ContextBundleToolbar extends ContextBundleContent {
    /** @internal */
    toolbar?: Toolbar;
}

/**
 * @public
 */
declare interface ContextComplete extends ContextBundleToolbar {
    /** @internal */
    _isCtxComplete: true;
    /** @internal */
    button?: ButtonConfiguration;
    /** @internal */
    commandWorkflow?: ToolbarWorkflowManager;
}

/**
 * Complete context with a button (explicitly)
 * @internal
 */
declare interface ContextCompleteWithButton extends ContextComplete {
    /** @internal */
    button: ButtonConfiguration;
}

/**
 * @internal
 */
declare interface ContextErrorJsonAndObj {
    type: string;
    problems?: ContextProblems[];
}

declare class ContextHelpers {
    #private;
    /**
     * @internal
     */
    static isComplete(thing: unknown): thing is ContextComplete;
    /** @internal
     * must be implemented as static, because the final object is actually just an interface and created from values.
     */
    static getRule(ctx: ContextComplete): BuildRule | null;
    /**
     * Primary API to get the context (context is cached)
     * @internal
     */
    static expandContext(tagOrSxc: Sxc | HTMLElement | number, cbid?: number): ContextComplete;
}

/**
 * ContextIdentifier is used to initialize a Sxc object outside of the default context.
 * @public
 */
export declare class ContextIdentifier {
    /**
     * ZoneId of this Context
     * @requires zoneId
     */
    zoneId: number;
    /**
     * AppId of this Context
     * @requires appId
     */
    appId: number;
    /**
     * PageId of this Context (optional)
     * @optional
     */
    pageId?: number;
    /**
     * ModuleId of this Context (optional)
     * @optional
     */
    moduleId?: number;
    /**
     * Exclude pageId and moduleId headers in web requests.
     * Internal - only used in edit-ui formulas. Any other use must be documented here.
     * @internal
     */
    _noContextInHttpHeaders?: boolean;
    /**
     * Auto add the appid= and zoneid= to the url if not yet set
     * Internal - only used in edit-ui formulas. Any other use must be documented here.
     * @internal
     */
    _autoAppIdsInUrl?: boolean;
    /**
     * Marks the context as complete, so it won't merge in anything else
     * WIP #CustomContext ATM for the updated edit-ui
     * @internal
     */
    complete?: boolean;
    /**
     * WIP #CustomContext not really used yet
     * @internal
     */
    blockId?: number;
    /**
     * Type Guard to determine if an object is a ContextIdentifier
     * @param original
     * @returns
     * @internal
     */
    static is(original: unknown): original is ContextIdentifier;
    /**
     * Internal
     * @param ctx
     * @internal
     */
    static ensureCompleteOrThrow(ctx: ContextIdentifier): ContextIdentifier;
    /**
     * Create a string-id to identify in a cache.
     * @param ctx
     * @returns
     * @internal
     */
    static toCacheKey(ctx: ContextIdentifier): string;
}

/**
 * this will be about the current app, settings of the app, app - paths, etc.
 * @internal
 */
declare interface ContextOfApp extends ContentAppUnifiedInCtxAndAttr {
    /**
     * IsContent is used for 2 things
     * 1. Determine if certain buttons should be enabled in the toolbar
     * 2. To forward to the quick-dialog, which changes behavior based on this
     * Should default to true, because that's the more basic/restricted mode
     */
    isContent: boolean;
    settingsId: number | null;
    resourcesId: number | null;
    appPath?: string;
    hasContent: boolean;
    supportsAjax: boolean;
    zoneId: number;
    id: number;
    currentLanguage: string;
    primaryLanguage: string;
    allLanguages: string[] | null;
}

/**
 * information related to the current contentBlock, incl
 * @internal
 */
declare interface ContextOfContentBlock extends ContentBlockUnifiedInCtxAndAttr {
    isCreated: boolean;
    isList: boolean;
    queryId: number | null;
    /** new v17.07 for layout-info only ATM */
    queryName: string;
    /** new v17.07 for layout-info only ATM */
    queryInfo: string;
    templateId: number;
    contentTypeId: string;
    contentGroupId: string;
    templatePath?: string;
    edition?: string;
    /**
     * new 17.08, CSV of editions
     */
    editions?: string;
}

/**
 * information related to the current DNN module, incl.instanceId,
 * @internal
 */
declare interface ContextOfInstance {
    id: number;
    isEditable: boolean;
    allowPublish: boolean;
    sxcVersion: string;
    parameters: AttrJsonEntity[] | null;
    sxcRootUrl: string;
}

/**
 * this will be information related to the current page
 * @internal
 */
declare interface ContextOfPage {
    id: number;
}

/**
 * this will be everything about the current system, like system / api -paths etc.
 * @internal
 */
declare interface ContextOfSystem {
    error: string;
    problems?: ContextProblems[];
}

/**
 * ensure that the UI will load the correct assets to enable editing
 * @internal
 */
declare interface ContextOfUi {
    autoToolbar?: boolean;
}

/**
 * @internal
 */
declare interface ContextOfUser extends AttrJsonUser {
}

/**
 * Context problems - same type in Json and in object
 * @internal
 */
declare interface ContextProblems {
    severity: /*'none' | */ 'info' | 'warning' | 'error';
    scope: 'view' | 'app';
    code: string;
    message: string;
    link: string;
}

/**
 * The fallback path to the UI
 * @internal
 */
export declare const DnnUiRoot = "/desktopmodules/ToSic.Sxc/";

/**
 * This loads environment information from the meta-header tag.
 * Because of timing issues, it will try multiple times
 * @internal
 */
export declare class EnvironmentMetaLoader extends HasLog {
    env: SxcGlobalEnvironment;
    retries: number;
    private dynamicPageHelper;
    constructor(env: SxcGlobalEnvironment);
    loadMetaFromHeader(forceFallback?: boolean): void;
    updateEnv(newJsInfo: EnvironmentSpecs): void;
    getMetaContent(): string;
    getJsApiMetaTag(): Element;
    /**
     * Watch for changes in our special meta header, to update the variables.
     * Important for Oqtane, which changes the page on the fly without reloading.
     */
    startMetaTagObserver(): void;
    private observer;
}

/**
 * A context information for the current page, helping the JS talk with the backend
 * @public
 */
export declare interface EnvironmentSpecs {
    /** Page ID */
    page: number;
    /** Optional API key - optional if set from external, because it's auto derived from root */
    api: string;
    /** Optional App API Root - required because in Oqtane we'll have a different root for appAPIs */
    appApi: string;
    /** Portal root path - used for various things incl. the API root */
    root: string;
    /** Request verification token header name */
    rvtHeader: string;
    /** Request verification token value */
    rvt: string;
    /**
     * The root path for the UI
     * @internal
     */
    uiRoot: string;
    /** The platform code like 'dnn' or 'oqt' */
    platform: string;
    /**
     * Additional URL params for the dialog
     * added in v14.08
     * @internal
     */
    dialogQuery?: string;
    /**
     * The public key for secure endpoints
     * added in v18.05
     * @internal
     */
    publicKey?: string;
}

/**
 * Options for fetch requests.
 * Typically to customize encryption behavior (new v18.05)
 */
declare interface FetchOptions {
    method?: string;
    /**
     * Encrypt the request.
     * As of v18.05 it will only cover the body, but in future
     * it could also cover url parameters and maybe headers.
     */
    encrypt?: boolean | 'auto' | 'force';
    /**
     * Encrypt the body of the request.
     */
    encryptBody?: boolean | 'auto' | 'force';
    /**
     * Note: make this an undocumented feature.
     * Naming is not final, but we won't do anything ATM.
     * Developer should use error handling
     * @internal
     */
    encryptShowErrorToUser?: boolean;
}

/** @internal */
export declare function flattenSlashes(original: string): string;

/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 * @public
 */
export declare abstract class HasLog {
    /**
     * The logger for this object
     * @internal usually not relevant and could make docs confusing
     */
    log: Log;
    /**
     * initialize the logger
     * ideally it has a parent-logger to attach to
     * @param logName name to show in the logger
     * @param parentLog parent-logger to attach to
     * @param initialMessage optional start-message to log
     * @internal
     */
    constructor(logName: string, parentLog?: Log, initialMessage?: string);
    /** @internal */
    initLog: (name: string, parentLog?: Log, initialMessage?: string) => void;
    /** @internal */
    private initLogInternal;
}

/** @internal */
export declare const HeaderNames: {
    ContentBlockId: string;
    ModuleId: string;
    TabId: string;
    PageId: string;
};

export declare const iconPrefix = "icon-sxc-";

/**
 * @internal
 */
declare class InPageButtonGroupJson {
    buttons: InPageButtonJson[] | string;
}

/**
 * Button Definition v1. from old API
 * it is publicly used out of inpage, so take a care to preserve its signature
 * @internal
 */
declare class InPageButtonJson {
    /** the internal command which will be called, should contain both the name and the parameters like { action: "new", contentType: "BlogPost"} */
    command?: InPageCommandJson;
    /** text which is shown on mouse-over. Note that 2sxc will try to run it through the translator, so you can also use placeholders like Toolbar.Metadata */
    title?: string;
    /** a css class giving the button the icon. It can be one of the icons 2sxc provides, or it can be your own - just be sure to include a CSS & font which resolves the icon */
    icon?: string;
    classes?: string;
    /** disabled would disable the click on the button */
    disabled?: boolean;
    /**
     * partOfPage (new in 2sxc 9.5)
     * determines if resulting changes should effect the DNN Page Publishing
     * note that it only effects the page-lifecycle, if the resulting dialogs and APIs respect this setting
     */
    partOfPage?: boolean;
    /** if this is just something visual; otherwise a web service will ensure that a content-group exists (for editing etc.) */
    uiActionOnly?: boolean;
    /** the code executed on click, if it's not the default action */
    code?<T>(settings: CommandParams): Promise<void | T>;
    dialog?: string;
    newWindow?: boolean;
    inlineWindow?: boolean;
    fullScreen?: boolean;
    _expanded?: boolean;
    static is(thing: unknown): thing is InPageButtonJson;
    static isArray(thing: unknown[]): thing is InPageButtonJson[];
    static toButton(oldFormat: InPageButtonJson): Partial<ButtonDefinition>;
}

/**
 * @internal
 */
declare class InPageCommandJson {
    /** List of buttons to show */
    action?: CommandNames;
    /** The entity id to edit */
    entityId?: number;
    /** the content-type for new items */
    contentType?: string;
    /** determines that we should use a module list */
    useModuleList?: true;
    /** index in the list */
    sortOrder?: number;
    /** Experimental in 10.27 */
    modify?: string;
    /** Experimental for 10.30 */
    parent?: string;
    /** Experimental for 10.30 */
    fields?: string;
    static hasActions(thing: unknown): thing is InPageCommandJson;
    static hasModify(thing: unknown): thing is InPageCommandJson;
    /** Important for object merging - because otherwise action will be preserved */
    static noAction(thing: InPageCommandJson): InPageCommandJson;
}

/**
 * take various common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): \{ groups: [ \{\}, \{\}], name: ..., defaults: \{...\} \}
 * group of buttons (detected by "buttons): \{ buttons: "..." | [], name: ..., ... \}
 * list of buttons (detected by IsArray with action): [ \{ action: "..." | []\}, \{ action: ""|[]\} ]
 * button (detected by "command"): \{ command: ""|[], icon: "..", ... \}
 * just a command (detected by "action"): \{ entityId: 17, action: "edit" \}
 * array of commands: [\{entityId: 17, action: "edit"\}, \{contentType: "blog", action: "new"\}]
 * @internal
 */
declare type InPageToolbarConfigVariations = ToolbarWip | InPageButtonJson | InPageCommandJson | ToolbarTemplate;

/** @internal */
export declare const Insights: InsightsSingleton;

declare class InsightsLogSet {
    name: string;
    logs: LogList;
    constructor(name: string);
}

/** @internal */
declare class InsightsSingleton extends HasLog {
    constructor();
    history: {
        [key: string]: InsightsLogSet;
    };
    add(setName: string, logName: string, log: Log): void;
    show(partName: string, index?: number, start?: number, length?: number): void;
}

/**
 * @internal
 */
declare interface InstanceContext {
    jsApi: EnvironmentSpecs;
}

/**
 * Simple identifier, which is id/type-name
 * @internal
 * WAIT with publishing, we'll probably change the duplicate-entity to a bool instead of an id
 */
export declare interface ItemIdentifierCopy extends ItemIdentifierShared {
    DuplicateEntity: number;
    ContentTypeName?: string;
}

/**
 * Complex identifier using a group
 * @internal
 */
export declare interface ItemIdentifierInList extends ItemIdentifierShared {
    /** Whether to add the item - alternative is just to leave it, if it already existed */
    Add: boolean;
    /** The index position within that field/part */
    Index: number;
    /** The parent/group we're referencing */
    Parent: string;
    /** The field which contains the item we're referencing */
    Field: string;
}

/**
 * Shared properties of all item identifiers
 * @internal
 */
declare interface ItemIdentifierShared {
    EntityId?: number;
    Prefill?: Record<string, TypeValue>;
    /** New 16.01 - fields to show/hide in the edit-dialog */
    UiFields?: string;
    /** New 16.02 - parameters should be independent from prefill */
    Parameters?: Record<string, TypeValue>;
}

/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export declare interface ItemIdentifierSimple extends Omit<ItemIdentifierShared, "EntityId"> {
    EntityId: number;
    ContentTypeName?: string;
    Metadata?: CommandParamsMetadata;
}

/**
 * The parameters for the item-url
 * @internal
 */
export declare interface ItemUrlParameters {
    prefill?: Record<string, TypeValue>;
    items?: string;
    contentTypeName?: string;
    filters?: string;
}

/**
 * This marks a list of things - buttons or button-groups
 * which have an insert-cursor.
 * So any insert-operation should place additional things there.
 * @internal
 */
declare interface ListWithCursor {
    _insertCursor?: 0;
}

/**
 * A log object which will collect log entries for another object
 * @export
 * @interface Log
 * @public
 */
export declare class Log {
    /**
     * List of all entries added to this log
     */
    entries: LogEntry[];
    /** @internal */
    private depth;
    /** @internal */
    private callDepths;
    /** @internal */
    startTime: number;
    /**
     * Maximum amount of entries to add - to prevent memory hogging
     */
    maxEntries: number;
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     * @internal
     */
    constructor(name: string, parent?: Log | null, initialMessage?: string);
    /** @internal */
    liveDump: boolean;
    /** @internal */
    _parentHasLiveDump: boolean;
    /** @internal */
    keepData: boolean;
    /** @internal */
    _parentHasKeepData: boolean;
    /**
     * Full identifier of this log-object, with full hierarchy
     * @internal
     */
    fullIdentifier: () => string;
    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     * @internal
     */
    rename(name: string): void;
    /**
     * link this log to a parent
     * usually happens in constructor, but in rare cases
     * this must be called manually
     * @internal
     */
    linkLog: (parent?: Log | null) => void;
    /**
     * Add a simple message to the log
     * @param message
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    add(message: (() => string) | string, data?: unknown): string;
    /** @internal */
    addData(message: (() => string) | string, data: unknown): void;
    /** @internal */
    logData(): boolean;
    /** @internal */
    _prepareEntry(message: (() => string) | string, data?: unknown): LogEntry;
    /** @internal */
    private _prepareMessage;
    /** @internal */
    call(name: string, callParams?: string, message?: string, data?: {
        [key: string]: unknown;
    }): LogCall;
    /** @internal */
    _callDepthAdd(name: string): void;
    /** @internal */
    _callDepthRemove(name: string): void;
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     * @internal
     */
    dump(one?: LogEntry | null, separator?: string): void;
    /** @internal */
    dumpList(start?: number, length?: number): void;
    /** @internal */
    private dumpOne;
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     * @internal
     */
    _addEntry(entry: LogEntry): void;
    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     * @internal
     */
    private randomString;
    /**
     * parent logger - important if loggers are chained
     * @internal
     */
    private parent?;
    /**
     * scope of this logger - to easily see which ones
     * are about the same topic
     * @internal
     */
    private scope;
    /**
     * The name of this log, for scenarios where multiple loggers are mixed
     */
    name: string;
    /**
     * Unique 2-character ID of this specific log object
     * @internal
     */
    private id;
    /** @internal */
    private idCache?;
    /**
     * Unique identifier of this log object, with name and ID
     * @internal
     */
    private identifier;
}

/** @internal */
export declare class LogCall {
    log: Log;
    name: string;
    /** The initial entry created - important for later attaching the final result of the call */
    initialEntry: LogEntry;
    constructor(log: Log, name: string, callParams?: string, message?: string, data?: {
        [key: string]: unknown;
    });
    private lastMessage?;
    add(message: string, data?: unknown, behavior?: LogEntryOptions): void;
    onlyAddIfNew(message: string, behavior?: LogEntryOptions): void;
    /** Add data - but only if data logging is enabled */
    data(message: string, data: unknown): void;
    done(message?: string, behavior?: LogEntryOptions): void;
    return<T>(result: T, message?: string, behavior?: LogEntryOptions): T;
    private processExtraBehavior;
}

/**
 * A log entry item
 * @export
 * @interface LogEntry
 * @public
 */
export declare class LogEntry {
    /** @internal */
    private log;
    message: string;
    /** @internal */
    depth: number;
    /** A timestamp for this entry to better see sequences of things happening */
    time: number;
    /**
     * The result of an operation - treated differently in the output
     * @internal
     */
    result: string;
    /**
     * Data which is logged - if data-logging is enabled
     * @internal
     */
    get data(): unknown;
    /** @internal */
    set data(data: unknown);
    /** @internal */
    private _data?;
    /** @internal */
    source: () => string;
    /** @internal */
    constructor(
    /** @internal */
    log: Log, message: string, 
    /** @internal */
    depth: number, 
    /** A timestamp for this entry to better see sequences of things happening */
    time: number, data?: unknown);
}

/** @internal */
export declare enum LogEntryOptions {
    log = "log",
    warn = "warn",
    error = "error",
    throw = "throw"
}

/** @public */
declare type LogList = Array<{
    key: string;
    log: Log;
}>;

/**
 * A Metadata-Target identifier to tell an entity that it describes something else.
 *
 * Usually used in Sxc instances with the [Data Service](xref:Api.Js.SxcJs.SxcData)
 *
 * Warning: There is another MetadataFor type and they are not fully consistent.
 * This is historical and not easy to correct, but we're working on it.
 * @public
 */
export declare interface MetadataFor {
    /**
     * The target type identifier
     * - TODO: @2dm - THIS SHOULD probably be number only
     */
    Target: string | MetadataTargetTypes;
    /**
     * The number of the target, if it's identified by a number.
     */
    Number?: number;
    /**
     * The string-id of the target, if it's identified by a string.
     */
    String?: string;
    /**
     * The GUID of the target, if it's identified by a GUID.
     */
    Guid?: string;
    /**
     * @internal
     */
    Singleton?: boolean;
}

/**
 * Metadata Target Types
 *
 * These are constants to determine what something is assigned to (e.g. it describes an Entity, a file, etc.)
 *
 * Use it for the @see MetadataFor objects
 * @public
 */
export declare enum MetadataTargetTypes {
    /**
     * Undefined Type (0) - included for completeness.
     * Not usually used, actually None (1) is the default
     */
    Undefined = 0,
    /**
     * Things that are not used as Metadata (1). This is the default for most Entities.
     */
    None = 1,
    /**
     * Metadata of attributes / fields (2). This is used to store configuration like the field label, amount-of-rows, etc.
     * Remarks =
     * The key is always a number (int) pointing to the Attribute ID in the DB.
     */
    Attribute = 2,
    /**
     * App metadata (3). Used to give Apps additional properties.
     * Remarks =
     * The key should always be an int ID of the App.
     */
    App = 3,
    /**
     * Metadata of entities / data-items (4).
     * This lets us enhance entities with additional information.
     * Remarks =
     * The Key should always be a GUID
     */
    Entity = 4,
    /**
     * Metadata of a content-type / data-schema (5). Used to give it a description etc.
     */
    ContentType = 5,
    /**
     * Zone metadata (6) - used to give a Zone additional information.
     * Only used in very special cases, best not use.
     */
    Zone = 6,
    /**
     * Item / Object of the Platform, like a File or Folder etc. (10)
     * Remarks =
     * * The key is usually a string to further specify what it's describing, like "file:72"
     * * The text equivalent is CmsObject
     */
    CmsItem = 10,
    /**
     * The entire system / platform - so Metadata for the current Dnn/Oqtane installation (11).
     * Remarks =
     * This is not in use as of now, just added for completeness sakes.
     * New in v13
     */
    System = 11,
    /**
     * A Site - like the current site (12)
     * Remarks = New in v13</remarks>
     */
    Site = 12,
    /**
     * A Site - like the current site (13)
     * Remarks = New in v13 / beta</remarks>
     */
    SiteVariant = 13,
    /**
     * A Page - like the current page (14)
     * Remarks = New in v13</remarks>
     */
    Page = 14,
    /**
     * A Page - like the current page (15)
     * Remarks = New in v13 / beta</remarks>
     */
    PageVariant = 15,
    /**
     * A Module - like a module containing some content (16)
     * Remarks = New in v13</remarks>
     */
    Module = 16,
    /**
     * A Module - like a module containing some content (17)
     * Remarks = New in v13 / beta</remarks>
     */
    ModuleVariant = 17,
    /**
     * A User - like the admin-user (18)
     * Remarks = New in v13</remarks>
     */
    User = 18,
    /** Custom target (90). This is what you should use for basic apps which have a custom target that's none of the other defaults. */
    Custom = 90,
    /** Custom target (91). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom1 = 91,
    /** Custom target (92). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom2 = 92,
    /** Custom target (93). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom3 = 93,
    /** Custom target (94). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom4 = 94,
    /** Custom target (95). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom5 = 95,
    /** Custom target (96). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom6 = 96,
    /** Custom target (97). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom7 = 97,
    /** Custom target (98). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom8 = 98,
    /** Custom target (99). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
    Custom9 = 99
}

/**
 * The special header meta tag containing settings for 2sxc
 * @internal
 */
export declare const MetaHeaderJsApi = "_jsApi";

/**
 * Base class for module / content-block editors
 * @internal
 */
export declare abstract class ModifierBase extends HasLog {
    constructor(name: string);
    abstract delete(clip: Selection_2): Promise<void>;
    abstract isRealMove(oldClip: Selection_2, newClip: Selection_2): boolean;
    abstract move(oldClip: Selection_2, newClip: Selection_2): void;
}

/**
 * extend the quick edit with the core commands
 * @internal
 */
export declare class ModifierContentBlock extends ModifierBase {
    constructor();
    private getInstanceModifier;
    /** Delete an inner content-block */
    delete(clip: Selection_2): Promise<void>;
    create(parent: number, field: string, listIndex: number, appOrContent: string, list: HTMLElement, newGuid: string): Promise<void>;
    move(oldClip: Selection_2, newClip: Selection_2): void;
    isRealMove(oldClip: Selection_2, newClip: Selection_2): boolean;
    /**
     * find the real index of this block in the list - may not match the DOM index
     */
    findClipListIndex(clip: Selection_2): number;
    /**
     * find the real index of a block tag as it may not match the DOM index
     * TODO: @2dm - not really sure what this is, should be documented more clearly
     */
    findListIndex(tag: HTMLElement, fallback: number): number;
    /**
     * The button click handler. Must be static, as it will be attached to the buttons
     * So the 'this' is not a ContentBlockModifier, but the html-tag which was clicked
     */
    static onCbButtonClick(): void | Promise<void>;
}

/**
 * @internal
 */
export declare class ModifierDnnModule extends ModifierBase {
    private modInternal;
    constructor();
    delete(clip: Selection_2): Promise<void>;
    move(oldClip: Selection_2, newClip: Selection_2): void;
    isRealMove(oldClip: Selection_2, newClip: Selection_2): boolean;
    showSendToPane(): void;
    static onModuleButtonClick(): void | Promise<any>;
}

/**
 * module specific stuff
 * @internal
 */
export declare class ModifierDnnModuleInternal extends HasLog {
    constructor(parent: ModifierDnnModule);
    /**
     * Delete a module
     */
    delete(modId: number): Promise<any>;
    /**
     * Create a new module
     */
    create(paneName: string, index: number, type: string): Promise<any>;
    /**
     * Move a DNN Module
     */
    move(modId: number, pane: string, order: number): void;
    getPaneName(pane: HTMLElement): string;
    /**
     * find the correct module id from a list of classes - used on the module-wrapper
     */
    getModuleId(classes: string): number | null;
    getMoveButtons(current: string): HTMLElement;
}

/** @internal */
export declare class NoJQ {
    /** https://api.jquery.com/ready/ */
    static ready(callback: () => void): void;
    /** https://api.jquery.com/jquery.param/ */
    static param(obj: any): string;
    /** Build DOM elements from string */
    static domFromString(string: string): HTMLElement[];
    /** https://api.jquery.com/offset/ */
    static offset(element: HTMLElement): {
        left: number;
        top: number;
    };
    /** https://api.jquery.com/width/ */
    static width(element: HTMLElement): number;
    /** https://api.jquery.com/height/ */
    static height(element: HTMLElement): number;
    /** https://api.jquery.com/empty/ */
    static empty(element: HTMLElement): void;
    /** https://api.jquery.com/replacewith/ */
    static replaceWith(toBeReplaced: HTMLElement, newElement: HTMLElement, runScripts: boolean): void;
    /** https://api.jquery.com/append/ */
    static append(parent: HTMLElement, newElements: HTMLElement[], runScripts: boolean): void;
}

/**
 * @internal
 */
declare class Note {
    constructor(params?: Partial<Note>);
    /** The note itself, as text. ATM no HTML support. */
    note?: string;
    /** The type is mainly for the icon ATM. */
    type?: TypeNoteMode;
    links?: NoteLink[];
    /** background color */
    background?: string;
    /**
     * allowHtml - ATM not used - could change
     * @internal
     */
    asHtml?: boolean;
    /**
     * ATM not used - could change
     * @internal
     */
    interactive?: boolean;
    /**
     * delay in ms
     * @internal
     */
    delay?: number;
    /**
     * linger in ms
     * @internal
     */
    linger?: number;
    /**
     * indicates that this is a system note, which is usually a different color
     * @internal
     */
    isSystem?: boolean;
    static toJson64String(note: Note): string;
}

declare interface NoteLink {
    url: string;
    label?: string;
    primary?: boolean;
}

/**
 * This is a marker for an ID which is not defined
 * This is for situations where a 0 or even a negative number
 * could be real numbers, so this number is so big, it should never be a real ID
 * @internal
 */
export declare const NumberNotDefinedHuge = 274200000000;

/**
 * Object manipulator helpers
 * @internal
 */
export declare class Obj {
    static DeepClone<T>(original: T, ignoreCircular?: boolean): T;
}

/**
 * @internal
 */
declare enum Operations {
    add = "+",
    addAuto = "\u00B1",
    remove = "-",
    system = "$",// for $params, $settings?
    modify = "%"
}

/**
 * @internal
 */
export declare const PlatformDnn = "dnn";

/**
 * @internal
 */
export declare const PlatformOqtane = "oqtane";

/**
 * position, align and show a menu linked to another item
 * @internal
 */
declare function positionAndAlign(element: HTMLElement, coords: PositionCoordinates): HTMLElement;

/**
 * @internal
 */
export declare class PositionCoordinates {
    x: number;
    y: number;
    w?: number;
    yh?: number;
    element?: HTMLElement;
    constructor(x: number, y: number);
}

/**
 * Module with everything related to positioning the quick-edit in-page editing
 * @internal
 */
export declare class Positioning {
    static positionAndAlign: typeof positionAndAlign;
    static refresh: typeof refresh;
    /**
     * Find the position of an element
     */
    static get(element: HTMLElement): PositionCoordinates;
    /**
     * Prepare offset calculation based on body positioning
     */
    static getBodyPosition(): PositionCoordinates;
}

/**
 * @internal
 */
export declare type PromiseFactory<T> = (args: T) => Promise<T>;

/**
 * @internal
 */
export declare const QeSelectors: {
    blocks: {
        [key: string]: CbOrMod;
    };
    eitherCbOrMod: string;
    selected: string;
};

/**
 * the quick-edit object
 * the quick-insert object
 * @internal
 */
export declare class QuickE extends HasLog {
    /** Singleton */
    static singleton(): QuickE;
    private static _singleton;
    body: HTMLElement;
    main: QuickEditOverlay.Main;
    template: string;
    selected: QuickEditOverlay.Selection;
    contentBlocks: HTMLElement[];
    cachedPanes: HTMLElement[];
    modules: HTMLElement[];
    nearestCb: PositionCoordinates;
    nearestMod: PositionCoordinates;
    cbActions: HTMLElement[];
    modActions: HTMLElement[];
    config: QuickEditConfigRoot;
    bodyOffset: PositionCoordinates;
    private constructor();
    start(): void;
    /**
     * reset the quick-edit
     * for example after ajax-loading a content-block, which may cause changed configurations
     */
    reset(): void;
    /**
     * This checks if the page has any alternate configuration
     * Note that it's also used after ajax refreshes, which can change the config
     * So if it does reconfigure itself, it will start with the default config again
     */
    loadPageConfig(): void;
    /**
     * existing inner blocks found? Will affect if modules can be quick-inserted...
     */
    private detectWhichMenusToActivate;
    private enable;
    prepareToolbarInDom(): void;
    /**
     * cache the panes which can contain modules
     */
    private initPanes;
    /**
     * start watching for mouse-move
     */
    private initWatchMouse;
    private logConfig;
}

/**
 * add a clipboard to the quick edit
 * @internal
 */
export declare class QuickEClipboard extends HasLog {
    /** Singleton */
    static singleton(): QuickEClipboard;
    private static _singleton;
    /**
     * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
     */
    clipboard: Selection_2;
    mods: {
        [key: string]: ModifierBase;
    };
    modDnn: ModifierDnnModule;
    modCb: ModifierContentBlock;
    private constructor();
    /**
     * bind clipboard actions to DOM buttons
     */
    initializeSecondaryButtons(): void;
    /**
     * perform copy and paste commands - needs the clipboard
     * @param cbAction
     * @param list
     * @param domIndex
     * @param type
     */
    do(cbAction: string, list: HTMLElement, domIndex: number, type: string): void;
    private mark;
    /** Clear the UI so nothing is selected any more */
    private clearUi;
    private removeSelectionMarker;
    private setSecondaryActionsState;
    private createSpecs;
}

/**
 * Quick Edit Configuration which has an `enable` and specific button configurations
 * @public
 */
export declare class QuickEditConfig {
    /**
     * Determine whether this section is enabled.
     */
    enable?: boolean | 'auto';
    /**
     * Optional detailed configuration of the buttons.
     * The buttons configuration on the root.
     * Will be used for the `modules` and `innerBlocks` if not specified there.
     * Note that if not specified, will always default to true for all buttons.
     */
    buttons?: QuickEditConfigButtons;
}

/**
 * Buttons on a quick-edit toolbar
 * @public
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

export declare const QuickEditConfigEnableAuto: string;

/**
 * Quick Edit - Full configuration at root, with `enable` and rules for `modules` and `innerBlocks`
 * @public
 */
export declare class QuickEditConfigRoot extends QuickEditConfig {
    /**
     * Optional configuration for the Inner Content Blocks.
     */
    innerBlocks?: QuickEditConfig;
    /**
     * Optional configuration for the Modules.
     */
    modules?: QuickEditConfig;
    /**
     * @internal
     */
    static getDefault(): QuickEditConfigRoot;
}

/**
 * @internal
 */
export declare namespace QuickEditOverlay {
    export interface Selection extends HTMLElement {
        toggleOverlay(target: boolean | HTMLElement, buttons?: QuickEditConfigButtons): void;
        target: HTMLElement;
    }
    export interface Main extends HTMLElement {
        activeContentBlock: HTMLElement;
        activeModule: HTMLElement;
        _parentNode: HTMLElement;
    }
    export function setButtonActivationClasses(buttons: QuickEditConfigButtons, linkTags: HTMLElement[]): void;
    export function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string;
    const selectedOverlay: QuickEditOverlay.Selection;
}

/**
 * Refresh positioning / visibility of the quick-insert bar
 * @internal
 */
declare function refresh(e: MouseEvent): void;

/**
 * @internal
 */
declare class RuleManager extends HasLog {
    /** List of rules which were picked up and will be applied */
    rules: BuildRule[];
    ruleManagerId: number;
    /** Basic constructor, must be called from a ToolbarConfigLoader */
    constructor(parent: ToolbarConfigLoader);
    /** Load/initialize the rules which were found */
    load(rawList: string[]): BuildRule[];
    /**
     * Find out if there are any problems on this block, and add buttons to see them to the toolbar
     * @param context
     * @returns
     */
    addDeveloperInfos(context: ContextComplete): void;
    private debugAdded;
    /** Find a single rule matching an ID */
    find(id: string): BuildRule | undefined;
    /** find all rules matching a criteria */
    filter(criteria: (x: BuildRule) => boolean): BuildRule[];
    /**
     * The settings are usually retrieved on settings,
     * but you can also put them behind the toolbar.
     * But mixing both won't work ATM by design.
     */
    getSettings(): {
        ui: any;
        params: any;
    };
    /**
     * The params for the command - if not found, will use the toolbar params.
     * But it's either or, mixing won't work by design ATM.
     */
    getParams: () => BuildRule;
    getToolbar: () => BuildRule;
    getAdd: () => BuildRule[];
    getRemoveGroups: () => BuildRule[];
    /** Find a system rule (marked with '$') */
    private getSystemRule;
    /** Find a system rule (marked with '$') */
    private getSystemRuleS;
}

/**
 * @internal
 */
declare type RuleParams = Record<string, string> & {
    /** Special prefill-list used for any kind of new-action/operation with prefill */
    contentType?: string;
    entityId?: string | number;
    prefill?: Record<string, TypeValue>;
    filters?: Record<string, TypeValue | Array<unknown>>;
    /** new 16.02 */
    form?: Record<string, TypeValue | Array<unknown>>;
    /** this is how the metadata-param comes in - as a 'for=someId' - this node will be removed afterwards */
    for?: string;
    /**
     * This is the metadata node as it will be used as a real parameter
     * @internal
     */
    metadata?: CommandParamsMetadata;
    /**
     * link added for info-buttons / wip
     * @internal
     */
    link?: string;
};

/**
 * Parameters for the Instance sxc.cms.run(...) command.
 * New in 13.03
 */
export declare interface RunParams {
    /**
     * The action to perform.
     * Required.
     */
    action?: CommandNames;
    /**
     * The command params, like contentType, entityId etc.
     * Optional for many actions.
     */
    params?: CommandParams;
    /**
     * The event which triggered this command - sometimes useful internally further use.
     * Optional in most cases, but in some cases it will improve the behavior of the code.
     */
    event?: MouseEvent;
    /**
     * Workflows work the same way as with a toolbar, except that they are added here and not registered on init.
     * Because of limitations in automatic documentation, the type here is set to `unknown` but it's actually `WorkflowStep` | `WorkflowStep[]`
     */
    workflows?: unknown;
}

/**
 * Helper class to process parameters given to the Cms.Run statement
 * Important because certain params may sometimes be full objects, and sometimes just a name.
 * In addition, even if we have more than the name, we must ensure that defaults are also included
 *
 * @internal
 */
export declare class RunParamsHelpers extends HasLog {
    constructor(parentLog?: Log);
    /**
     * name or settings adapter to settings
     * @param nameOrSettings
     * @returns settings
     */
    getParamsFromNameOrParams(nameOrSettings: string | CommandParams): CommandParams;
    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param params
     *
     * 2025-11-24 2dm - I believe this doesn't do anything useful, and just makes things more complex.
     * so i'll #DisableExpandParamsWithDefaults and see if anything breaks.
     */
    /**
     * Checks if the run params are complete, as would be used in the $2sxc.cms.run
     * @internal
     */
    static is$sxcRunParams(o: unknown): o is RunParamsWithContext;
    /**
     * Checks if it's at least an instance run param - having at least `action` or `params`
     * @internal
     */
    private static isRunParamsInstance;
    /**
     * @internal
     */
    static ensureRunParamsInstanceOrError(runParams: RunParamsWithContext): void;
}

/**
 * Parameters for the **Global** $2sxc.cms.run(...) command in Addition to the [RunParams](xref:Api.Js.SxcJs.RunParams).
 * It provides context to the run-params such as a Sxc instance or a tag which it started on.
 * New in 12.10
 * @public
 */
export declare interface RunParamsWithContext extends RunParams {
    /**
     * The tag on which the run was triggered - it's used to give the command a context to start from
     * We always need the tag OR the context, but never both
     */
    tag?: HTMLElement;
    /**
     * The context to run in, basically containing module id, etc.
     * We always need the tag OR the context, but never both
     */
    context?: Sxc | ContextIdentifier;
    /**
     * Method caller (for logging)
     */
    triggeredBy?: string;
}

export declare interface RunParamsWithContextClean extends Omit<RunParamsWithContext, 'context'> {
    /**
     * The context to run in, basically containing module id, etc.
     * We always need the tag OR the context, but never both
     */
    context?: Sxc;
}

/**
 * Special internal interface to give workflows a more specific type
 * @internal
 */
export declare interface RunParamsWithWorkflows extends RunParams {
    /**
     * Workflows work the same way as with a toolbar, except that they are added here and not registered on init
     */
    workflows?: WorkflowStep | WorkflowStep[];
}

/**
 * @internal
 */
declare class Selection_2 {
    /** The parent is either "dnn" or a module information */
    parent: string | number;
    parentGuid: string;
    /** The field inside the parent used for this content */
    field: string;
    list: HTMLElement;
    item: HTMLElement;
    index: number;
    type: "mod" | "cb";
}
export { Selection_2 as Selection }

/**
 * Shared logic like for deciding if we show list buttons
 * here
 * @internal
 */
export declare class SharedLogic {
    static isPartOfBlockList(context: ContextCompleteWithButton): boolean;
    /**
     * This will tell us, if the item is being referenced (like in a list)
     * It's similar to isBlockList, but will return true even if it's
     * a non-list (single item only)
     */
    static isBlockReference(context: ContextCompleteWithButton): boolean;
    static isFieldList(context: ContextCompleteWithButton): boolean;
    static isList(context: ContextCompleteWithButton): boolean;
    static isReferencedItem(context: ContextCompleteWithButton): boolean;
}

/** @internal */
export declare class Stats {
    watchDomChanges: number;
}

/**
 * The typical sxc-instance object for a specific DNN module or content-block
 * @public
 */
export declare class Sxc extends HasLog {
    /** the sxc-instance ID, which is usually the DNN Module Id */
    id: number;
    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number;
    /**
     * the id/key of this instance in the cache for reset
     * @internal
     */
    cacheKey: string;
    /**
     * The environment information, important for http-calls
     * @internal
     */
    readonly root: SxcGlobal;
    /**
     * Custom context information provided by the constructor - will replace auto-context detection
     * @internal
     */
    ctx?: ContextIdentifier;
    /** @internal */
    private _isSxcInstance;
    /**
     * Web API calls for this instance.
     * This is the pure call APIs system.
     * To get data or queries, best use the data or query services.
     */
    webApi: SxcWebApi;
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     * @internal
     */
    manage: SxcManage;
    /**
     * CMS operations on this sxc-instance, such as opening the edit dialog etc.
     */
    cms: SxcCms;
    /** @internal */
    constructor(
    /** the sxc-instance ID, which is usually the DNN Module Id */
    id: number, 
    /**
     * content-block ID, which is either the module ID, or the content-block definition entity ID
     * this is an advanced concept you usually don't care about, otherwise you should research it
     */
    cbid: number, 
    /**
     * the id/key of this instance in the cache for reset
     * @internal
     */
    cacheKey: string, 
    /**
     * The environment information, important for http-calls
     * @internal
     */
    root: SxcGlobal, 
    /**
     * Custom context information provided by the constructor - will replace auto-context detection
     * @internal
     */
    ctx?: ContextIdentifier);
    /**
     * New v16.01 - WIP
     * We have the problem that sometimes the environment is not available on the page or is wrong.
     * * On a page where a 2sxc-module was just added
     * * On a module which is in the skin, so technically from a different page
     *
     * Based on this we are trying to include all relevant information from the root-env, but override it with the local env
     * @param root
     * @returns
     */
    private loadEnv;
    /**
     * Env helper for API calls and such
     * @internal
     */
    env: SxcGlobalEnvironment;
    /**
     * Http helper for API calls and such
     * @internal
     */
    http: SxcGlobalHttp;
    /**
     * TypeGuard for TypeScript to verify this is a SxcInstance
     * @param thing
     * @internal
     */
    static is(thing: unknown): thing is Sxc;
    /**
     * Get a data service for a specific content-type.
     *
     * @param contentType: name of the content type which this service will get
     */
    data<T = unknown>(contentType: string): SxcData<T>;
    /**
     *
     * @param query
     */
    query(query: string): SxcQuery;
    /**
     * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
     * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
     * @deprecated use http.apiUrl instead
     * @param virtualPath
     * @returns mapped path
     * @internal
     */
    resolveServiceUrl(virtualPath: string): string;
    /**
     * Show a nice error with more infos around 2sxc
     * @param result
     * @returns
     * @internal
     */
    showDetailedHttpError(result: any): any;
    /**
     * Test if the current code is in edit-mode and additional javascripts have been loaded to make it work
     * @returns true if we are in edit-mode
     */
    isEditMode(): boolean;
    /**
     *
     * @param resetCache
     * @returns
     * @internal
     */
    recreate(resetCache: boolean): Sxc;
}

/** @internal */
export declare const SxcApiUrlRoot = "desktopmodules/2sxc/api/";

/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @public
 */
export declare class SxcCms extends SxcPart {
    /** @internal */
    constructor(sxc: Sxc);
    /**
     * Run a command on this sxc-instance.
     * Requires edit mode to be on, which would enable the edit-JS parts.
     * To use, remember to activate `2sxc.JsCms` on the page
     * @param runParams - real type is actually RunParams
     */
    run<T>(runParams: RunParams): Promise<void | T>;
}

/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @internal
 */
export declare class SxcCmsReal extends SxcCms {
    /** @internal */
    constructor(sxc: Sxc);
    /**
     * Run a command on this sxc-instance.
     * Requires edit mode to be on, which would enable the edit-JS parts.
     * To use, remember to activate `2sxc.JsCms` on the page
     * @param runParams - real type is actually RunParams
     */
    run<T>(runParams: RunParams): Promise<void | T>;
}

/**
 * Data Service for an App / Sxc-Instance to get/create data of a specific Content-Type
 * @public
 */
export declare class SxcData<T = unknown> extends SxcDataServiceBase {
    readonly name: string;
    /**
     * Creates an instance of SxcData.
     * @param sxc:
     * @param name: the content-type name
     * @internal
     */
    constructor(sxc: Sxc, name: string);
    /**
     * Get all items of this type.
     * @param params optional parameters - typically for OData - new in v21.06
     */
    getAll(params?: string | Record<string, unknown>): Promise<T[]>;
    /**
     * Get the specific item with the ID. It will return null if not found
     */
    getOne(id: number): Promise<T> | null;
    /** Future
     *  @internal
     */
    private getMany;
    /**
     * Get all or one data entity from the backend
     * @param id optional id as number or string - if not provided, will get all
     * @param params optional parameters - ATM not usefuly but we plan to support more filters etc.
     * @returns an array with 1 or n entities in the simple JSON format
     * @internal
     */
    private getInternal;
    /**
     * Create a new entity with the values supplied
     * @param values a simple object containing the values to create
     */
    create(values: Record<string, unknown>): Promise<Record<string, unknown>>;
    /**
     * Create a new entity with the values supplied and also a metadata-for reference
     * @param values a simple object containing the values to create
     */
    create(values: Record<string, unknown>, metadataFor: MetadataFor | string): Promise<Record<string, unknown>>;
    /**
     * Update an existing entity with the values supplied
     */
    update(id: number, values: Record<string, unknown>): Promise<Record<string, unknown>>;
    /**
     * Delete an entity
     * @param id id of the item to delete
     */
    delete(id: number): Promise<null>;
    /**
     * Delete an entity
     * @param guid GUID of the item to delete
     */
    delete(guid: string): Promise<null>;
}

/**
 * Base class doing common checks.
 * This is internal and not important, but we can't keep it out of the docs.
 * @public
 */
export declare abstract class SxcDataServiceBase extends SxcPart {
    readonly name: string;
    protected readonly webApi: SxcWebApi;
    /**
     * Creates an instance of SxcData.
     * @param sxc:
     * @param name: the content-type name
     * @internal
     */
    constructor(sxc: Sxc, name: string, nameInError: string);
}

export declare const SxcDevBuild: boolean;

/**
 * This is the root global `window.$2sxc` function / object.
 *
 * It is both a function `window.$2sxc(...)` and object `window.$2sxc.insights...`
 *
 * If the page feature `2sxc.JsCms` is enabled, the `window.$2sxc` will also be a [SxcGlobalWithCms](xref:Api.Js.SxcJs.SxcGlobalWithCms)
 * @public
 */
export declare interface SxcGlobal {
    /**
     * Get an Sxc Instance
     * @param id number: moduleId | HTMLElement: tag in the page | Sxc: an existing sxc - will just be returned | ContextIdentifier: an identifier in complex scenarios without a moduleId/context
     * @param cbid number
     * @returns SxcInstance
     */
    (id: number | HTMLElement | ContextIdentifier | Sxc, cbid?: number): Sxc;
    /**
     * Get an Sxc Instance using the moduleId.
     * Using `$2sxc.get(...)` is the same as using `$2sxc(...)`
     * @param moduleId number: moduleId
     * @returns SxcInstance
     * @since v14.01
     */
    get(moduleId: number): Sxc;
    /**
     * Get an Sxc Instance using the moduleId and contentBlockId.
     * Using `$2sxc.get(...)` is the same as using `$2sxc(...)`
     * @param moduleId number: moduleId
     * @param contentBlockId number: content-block ID
     * @returns Sxc
     * @since v14.01
     */
    get(moduleId: number, contentBlockId: number): Sxc;
    /**
     * Get an Sxc Instance using a tag / `HtmlElement`. Using `$2sxc.get(...)` is the same as using `$2sxc(...)`
     * @param tag HTMLElement: tag in the page
     * @returns Sxc
     * @since v14.01
     */
    get(tag: HTMLElement): Sxc;
    /**
     * Get an Sxc Instance using a full context-identifier (advanced). Using `$2sxc.get(...)` is the same as using `$2sxc(...)`
     * @param context ContextIdentifier: full context identifier
     * @returns Sxc
     * @since v14.01
     */
    get(context: ContextIdentifier): Sxc;
    /**
     * Get an Sxc Instance passing in an existing Sxc - just for cases where you're not sure what you aready have. Using `$2sxc.get(...)` is the same as using `$2sxc(...)`
     * @param sxc Sxc: an existing sxc - will just be returned
     * @returns Sxc - the same Sxc as the one which was passed in
     * @since v14.01
     */
    get(sxc: Sxc): Sxc;
    /** @internal */
    _controllers: {
        [id: string]: Sxc;
    };
    /** @internal */
    beta: any;
    /** @internal */
    _manage: SxcGlobalManage;
    /** @internal */
    _translateInit: any;
    /**
     * 2022-06-01 2dm - I believe this is not used, probably remove
     * @internal */
    debug: SxcGlobalDebug;
    /** @internal */
    stats: Stats;
    /**
     * system information, mainly for checking which version of 2sxc is running
     * note: it's not always updated reliably, but it helps when debugging
     */
    sysinfo: {
        /** the version using the ##.##.## syntax */
        version: string;
        /** a short text description, for people who have no idea what this is */
        description: string;
    };
    /**
     * Environment information
     * @type {SxcGlobalEnvironment}
     */
    env: SxcGlobalEnvironment;
    /**
     * Http helper for API calls and such
     */
    http: SxcGlobalHttp;
    /**
     * The debugging / insights system.
     * Call the `$2sxc.insights()` without parameters to get instructions what the parameters could be.
     * @param partName optional name of a part of the system for which we want to see the logs
     * @param index optional index on that part for which log we want to see
     * @param start log start index - this is to skip the first few lines if there are too many
     * @param length amount of lines to show - in some cases will default to 25
     */
    insights(partName: string, index?: number, start?: number, length?: number): void;
    /** @internal */
    _insights: typeof Insights;
    /**
     * Internal logger to better see what's happening
     * @internal
     */
    log: Log;
    /**
     * Helper to work with url parameters behind ? or #
     */
    urlParams: UrlParams;
    /**
     * A helper to create full-screen popups
     * @internal
     */
    totalPopup: TotalPopup;
}

/**
 * Global Content-Management System on the $2sxc.cms.
 *
 * It is only available if the page is in edit mode / the page feature `2sxc.JsCms` has been activated.
 * @public
 */
export declare class SxcGlobalCms extends HasLog {
    #private;
    /**
     * @internal
     */
    autoDump: boolean;
    /**
     * @internal
     */
    constructor();
    /**
     * reset / clear the log
     * @internal
     */
    resetLog(): void;
    /**
     * Run a command within a specific context - mostly for internal use.
     * @param runParams The complete run params with a context
     * @returns A promise which triggers when the command has completed.
     */
    run<T>(runParams: RunParamsWithContext): Promise<void | T>;
    /**
     * Run a command within a specific context.
     * @param tag The context providing tag - an HTML tag inside a module/content-block
     * @param action command-name (action)
     * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
     * @returns A promise which triggers when the command has completed.
     */
    run<T>(tag: HTMLElement, action: string, event?: MouseEvent): Promise<void | T>;
    /**
     * Run a command within a specific context.
     * @param tag The context providing tag - an HTML tag inside a module/content-block
     * @param action command-name (action)
     * @param params an object containing the the command-params
     * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
     * @returns A promise which triggers when the command has completed.
     */
    run<T>(tag: HTMLElement, action: string, params?: CommandParams, event?: MouseEvent): Promise<void | T>;
    /**
     * Run a command within a specific context.
     * @param tag The context providing tag - an HTML tag inside a module/content-block
     * @param commandParams an object containing the the command-params as well as the command-name (action)
     * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
     * @returns A promise which triggers when the command has completed.
     */
    run<T>(tag: HTMLElement, commandParams: CommandParams, event?: MouseEvent): Promise<void | T>;
    /**
     * Run a command within a specific context.
     * @param context The context - either an HTML tag which determines a module/instance, or an Sxc instance
     * @param nameOrSettings
     * @param eventOrSettings
     * @param event Optional mouse-event which allows the command to do some optimizations for that case - like a mouse-click
     * @returns A promise which triggers when the command has completed.
     * @internal
     */
    runInternal<T>(context: ContextBundleInstance | HTMLElement | RunParamsWithContext, nameOrSettings?: string | CommandParams, eventOrSettings?: CommandParams | MouseEvent, event?: MouseEvent, triggeredBy?: string): Promise<void | T>;
    /**
     * Run a command within a specific context.
     * @param runParamsWithCtx The context - either an HTML tag which determines a module/instance, or an Sxc instance
     * @returns A promise which triggers when the command has completed.
     * @internal
     */
    runClean<T>(runParamsWithCtx: RunParamsWithContextClean): Promise<void | T>;
}

/** @internal */
export declare class SxcGlobalDebug {
    /**
     * The load-debug state (provided by the url with debug=true)
     */
    load: boolean;
    /**
     * Cache breaker string, contains the version number of 2sxc if one is provided with sxcver=...
     */
    uncache: string;
    constructor();
}

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 * @public
 */
export declare class SxcGlobalEnvironment extends HasLog {
    /** @internal */
    private header;
    /**
     * Flag to determine if the environment information is available.
     */
    ready: boolean;
    /**
     * Where the environment information came from.
     */
    source: string;
    /** @internal */
    metaLoader: EnvironmentMetaLoader;
    /** @internal */
    constructor();
    /**
     * Manually load a new EnvironmentSpecs in cases where the page cannot provide them.
     * This is only used in scenarios outside of Dnn / Oqtane, you will usually not need this.
     * @param envSpecs new info to load
     * @param source _optional_ name where the data came from
     */
    load(envSpecs: EnvironmentSpecs, source?: string): void;
    /** @internal */
    private replacedRvt;
    /** @internal */
    updateRvt(newRvt: string): void;
    /**
     * The API endpoint url from the environment
     */
    api(): string;
    /** @internal */
    appApi(): string;
    /**
     * The current page ID - often needed in API calls
     */
    page(): number;
    /**
     * The request verification token header name for internal WebAPI calls
     */
    rvtHeader(): string;
    /**
     * The request-verification token for internal WebAPI calls
     */
    rvt(): string;
    /**
     * The uiRoot path
     * @internal
     */
    uiRoot(): string;
    /**
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    platform(): string;
    /**
     * The dialogQuery added in 14.08 because of issues with opening the dialog on sub-portals
     * ATM very internal
     * Don't check if it was initialized, because it's valid if it doesn't exist
     * @internal
     */
    dialogQuery(): string;
    /**
     * The public key for secure endpoints
     * ATM very internal
     * Don't check if it was initialized, because it's valid if it doesn't exist
     * @internal
     */
    publicKey(): string;
    /** @internal */
    private ensureReadyOrThrow;
}

/**
 * Global HTTP Service for information and helpers on `$2sxc.http`
 * @public
 */
export declare class SxcGlobalHttp extends HasLog {
    private env;
    /** @internal */
    constructor(env: SxcGlobalEnvironment);
    /**
     * All the headers which are needed in an ajax call.
     * @returns Dictionary / Record of headers
     */
    headers(): Record<string, string>;
    /**
     * All the headers which are needed in an ajax call - within a module context.
     * @param id _optional_ module ID
     * @returns Dictionary / Record of headers
     */
    headers(id: number): Record<string, string>;
    /**
     * All the headers which are needed in an ajax call - within a module and content-block context.
     * @param id _optional_ module ID
     * @param cbid _optional_ content block ID
     * @returns Dictionary / Record of headers
     */
    headers(id: number, cbid: number): Record<string, string>;
    /**
     * All the headers which are needed in an ajax call.
     * Uses a module and content-block context (but these could also be null)
     * and a full context identifier for advanced operations.
     * @param id _optional_ module ID
     * @param cbid _optional_ content block ID
     * @param ctx _optional_ context information to include in the header
     * @returns Dictionary / Record of headers
     */
    headers(id: number, cbid: number, ctx: ContextIdentifier): Record<string, string>;
    /**
     * Get the API-Root path for a specific extension/endpoint
     * @returns
     * @internal Not relevant for 2sxc, only used if calling platform endpoints
     */
    apiRoot(endpointName: string): string;
    /**
     * Get the API-Root path for Apps
     * new in v12
     * @internal
     */
    appApiRoot(): string;
    /**
     * Convert short urls like `app/auto/api/Posts/All` to the full URL needed.
     * Will ignore urls which clearly already are the full url.
     * @param url short URL like `app/auto/api/Posts/All`
     * @returns the converted, long url with the full endpoint
     */
    apiUrl(url: string): string;
    /**
     * Convert short urls like `app/auto/api/Posts/All` to the full URL needed.
     * Will ignore urls which clearly already are the full url.
     * @param url short URL like `app/auto/api/Posts/All`
     * @param endpointName _optional_ endpoint name if accessing a different exotic endpoint
     * @returns the converted, long url with the full endpoint
     */
    apiUrl(url: string, endpointName: string): string;
}

/**
 * @internal
 */
export declare interface SxcGlobalManage {
    /**
     * Init the manage-object on a just-created sxc-instance
     * we must keep signature of initInstance in sync with the 2sxc.api.js
     * @param sxc
     */
    initInstance(sxc: Sxc): void;
    _toolbarManager: any;
}

/**
 * $2sxc global interface _extending_ the `SxcGlobal` when the page feature `JsCms` is enabled.
 *
 * If the page feature `2sxc.JsCms` is not enabled, the `window.$2sxc` will be a [SxcGlobal](xref:Api.Js.SxcJs.SxcGlobal)
 * @public
 */
export declare interface SxcGlobalWithCms {
    /**
     * System Upgrader component
     * @internal
     */
    system: SystemUpgrader;
    /**
     * Will retrieve a resource in the current language.
     * Mainly used for toolbars etc. to support localization.
     *
     * Only available when edit mode is on meaning the page feature JsCms is enabled
     * @param key the key of the resource to translate
     */
    translate(key: string): string;
    /**
     * @internal
     */
    context: typeof ContextHelpers.expandContext;
    /**
     * Content Management features on the $2sxc
     */
    cms: SxcGlobalCms;
}

/** @internal */
export declare interface SxcManage {
    /**
     * The context contains information about the Sxc Instance, like module-id, etc.
     */
    context: any;
    /**
     * This checks / reports whether the API is in edit mode.
     * Used to enabled/disable various features
     */
    _isEditMode(): boolean;
}

/**
 * Base class for anything attached to an sxc-instance.
 * This is internal and not important, but we can't keep it out of the docs.
 * @public
 */
export declare abstract class SxcPart {
    /** @internal */
    sxc: Sxc;
    /** @internal */
    partName: string;
    /**
     * Creates an instance of SxcData.
     * @param sxc: sxc
     * @param partName: name of the part
     * @internal
     */
    constructor(
    /** @internal */
    sxc: Sxc, 
    /** @internal */
    partName: string);
}

/**
 * Instance Query Service
 * @public
 */
export declare class SxcQuery extends SxcDataServiceBase {
    readonly name: string;
    /**
     * Creates an instance of SxcQuery.
     * @internal
     */
    constructor(sxc: Sxc, name: string);
    getAll<T = unknown>(): Promise<T>;
    getAll<T = unknown>(urlParams: string | Record<string, unknown>): Promise<T>;
    getAll<T = unknown>(urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
    /**
     * Get just one stream, returning an array of items in that stream
     *
     * @template T
     * @param stream
     * @returns {Promise<T[]>} containing an array of items - or empty if stream not found or nothing returned
     */
    getStream<T = unknown>(stream: string): Promise<T[]>;
    getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>): Promise<T[]>;
    getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T[]>;
    /**
     * Get a query but only the mentioned streams.
     * This will reduce the amount of data retrieved on queries that have many streams.
     * @template T The schema/interfaces of what will be returned
     * @returns {Promise<T>} Promise containing a object with stream-names and items in the streams.
     * @public
     */
    getStreams<T = unknown>(streams: string): Promise<T>;
    /**
     * Get a query but only the mentioned streams.
     * This will reduce the amount of data retrieved on queries that have many streams.
     * @template T The schema/interfaces of what will be returned
     * @param streams name of streams to get, comma separated
     * @param urlParams additional parameters for the URL, either as a string or as a object
     * @returns {Promise<T>} Promise containing a object with stream-names and items in the streams.
     * @public
     */
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>): Promise<T>;
    /**
     * Get a query but only the mentioned streams.
     * This will reduce the amount of data retrieved on queries that have many streams.
     * @template T The schema/interfaces of what will be returned
     * @param streams name of streams to get, comma separated
     * @param urlParams additional parameters for the URL, either as a string or as a object
     * @param data data to include in case of a POST call - if this is provided, it will use a post
     * @returns {Promise<T>} Promise containing a object with stream-names and items in the streams.
     * @public
     */
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
    /**
     * Get all or one data entity from the backend
     * @param id optional id as number or string - if not provided, will get all
     * @param params optional parameters - ATM not useful but we plan to support more filters etc.
     * @returns an array with 1 or n entities in the simple JSON format
     * @internal
     */
    private getInternal;
}

/**
 * @internal
 */
export declare class SxcTools {
    /**
     * get edit-context info of html element or sxc-object
     */
    static getEditContext(sxc: Sxc, htmlElement?: HTMLElement): AttrJsonEditContext;
}

/** @internal */
export declare const SxcVersion: string;

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export declare class SxcWebApi implements ZzzSxcWebApiDeprecated {
    private readonly sxc;
    /**
     *
     * @param sxc
     * @internal
     */
    constructor(sxc: Sxc);
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    get(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    post(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    delete(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    put(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    request(settings: string | ZzzAjaxSettingsDeprecated, params: any, data: any, preventAutoFail: boolean, method: string): any;
    /**
     * Will retrieve data from the backend using a standard fetch.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method or fetch options, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing a Response object, just like a normal fetch would.
     * example: webApi.fetchRaw('Rss/Feed');
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 })); // url params
     * example: webApi.fetchRaw('Rss/Feed', { id: 47 }); // post params
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 }), { something: 'this is a test' }); // url & post params
     * maybe: webApi.fetchRaw({url: 'Rss/Feed', params: { id: 47 }})
     * maybe: webApi.fetchRaw({url: ..., params: { ...}, body: { ...}, method: 'GET' })
     */
    fetchRaw(url: string, data?: string | Record<string, unknown>, method?: string | FetchOptions): Promise<Response>;
    private prepareOptions;
    /** @internal */
    fetch(url: string, data?: string | Record<string, any>, method?: string | FetchOptions): Promise<Response>;
    /**
     * Will retrieve data from the backend using a standard fetch and give you an object.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method or fetch options,, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing any object.
     */
    fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string | FetchOptions): Promise<T>;
    /**
     * All the headers which are needed in an ajax call for this to work reliably.
     * Use this if you need to get a list of headers in another system
     */
    headers(method?: string): Record<string, string>;
    /**
     *
     * @param url A short, medium or long url.
     * Short like `controller/method`,
     * medium like `app/auto/api/controller/method`
     * long like `https://xyz.
     * In all cases it can also have ?params etc.
     * @param params Optional parameters as string or object, will be added to url-params.
     * @returns In the cases of a short/medium url,
     * it will auto-expand to have the full url as needed for an API call.
     */
    url(url: string, params?: string | Record<string, any>): string;
}

/**
 * @internal
 */
declare class SystemUpgrader {
    finishUpgrade(domElement: HTMLElement): void;
}

/**
 * This object is used to change the structure of a toolbar template.
 * It's only purpose is to assist in the new V10 format for quickly making toolbars.
 * @internal
 */
declare class TemplateEditor extends HasLog {
    toolbar: ToolbarConfigLoader;
    constructor(toolbar: ToolbarConfigLoader);
    addButton(template: ToolbarTemplate, groupName: string, id: string, name: string, pos: number): void;
    private findInsertPosition;
    private correctPosStartEnd;
    add(template: ToolbarTemplate, rules: BuildRule[]): void;
    addGroup(template: ToolbarTemplate, groupName: string, pos: number): ToolbarTemplateGroup;
    removeGroup(template: ToolbarTemplate, groupName: string): void;
    private ensureGroups;
    private findGroup;
    private findGroupOrDefault;
}

/**
 * Template Identifier for telling the code-editor about this template
 * @internal
 */
export declare interface TemplateIdentifier {
    /** The entity Id of the View-configuration which points to the template file */
    EntityId: number;
    /** The template edition (kind of a path) - to ensure code-editor can find the right one */
    Edition?: string;
    /** The template path */
    Path?: string;
}

/** @internal */
declare const TLB_FOLLOW_ALWAYS = "always";

/** @internal */
declare const TLB_FOLLOW_INITIAL = "initial";

/** @internal */
declare const TLB_FOLLOW_SCROLL = "scroll";

/** @internal */
declare const TLB_HOV_LEFT = "left";

/** @internal */
declare const TLB_HOV_RIGHT = "right";

/** @internal */
declare const TLB_MORE_AUTO = "auto";

/** @internal */
declare const TLB_MORE_END = "end";

/** @internal */
declare const TLB_MORE_NEVER = "never";

/** @internal */
declare const TLB_MORE_START = "start";

/** @internal */
declare const TLB_SHOW_ALWAYS = "always";

/** @internal */
declare const TLB_SHOW_HOVER = "hover";

export declare const tlbI18nPrefix = "Toolbar.";

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 * @internal
 */
declare interface Toolbar {
    /** Toolbar ID to better identify which toolbar we're looking at - has special long name to never confuse with other IDs */
    identifier: string;
    /** The groups of buttons in this toolbar */
    groups: ButtonGroup[];
    /** Settings like floating of toolbar, etc. */
    settings?: ToolbarSettings;
    /** Params for the commands, like EntityId, Content - Type - Name */
    params?: Record<string, TypeValue>;
    /** show more debug info */
    debug?: boolean;
    /**  the button defaults like icon, etc. */
    defaults?: Record<string, TypeValue>;
}

/**
 * @internal
 */
declare interface ToolbarButtonSettings {
    icon?: string;
    class?: string;
    color?: string;
    show?: boolean;
    code?: string;
    title?: string;
    /** WIP 15.04 */
    note?: Note;
    [key: string]: TypeValue | Note;
}

/**
 * @internal
 */
declare class ToolbarConfigLoader extends HasLog {
    toolbarV09: ToolbarConfigLoaderV09;
    toolbarV10: ToolbarConfigLoaderV10;
    groups: ButtonGroupConfigLoader;
    button: ButtonConfigLoader;
    templates: ToolbarTemplateManager;
    templateEditor: TemplateEditor;
    logs: Array<{
        key: string;
        entries: LogEntry[];
    }>;
    /** Special constructor that can only be called from the ToolbarManager */
    constructor(_owner: ToolbarManager);
    private setLoggingAndCreateHelpers;
    load(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    buildTreeAndModifyAccordingToRules(toolbarContext: ContextComplete, configWip: ToolbarWip): Toolbar;
}

/**
 * @internal
 */
declare class ToolbarConfigLoaderV09 extends HasLog {
    #private;
    private configLoader;
    private rules;
    constructor(configLoader: ToolbarConfigLoader);
    loadV9(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    /**
     * this will take an input which could already be a tree, but it could also be a
     * button-definition, or just a string, and make sure that afterwards it's a tree with groups
     * the groups could still be in compact form, or already expanded, depending on the input
     * output is object with:
     * - groups containing buttons[], but buttons could still be very flat
     * - defaults, already officially formatted
     * - params, officially formatted
     */
    private ensureDefinitionTree;
}

/**
 * @internal
 */
declare class ToolbarConfigLoaderV10 extends HasLog {
    private configLoader;
    rules: RuleManager;
    constructor(configLoader: ToolbarConfigLoader);
    loadV10(context: ContextComplete, config: ToolbarInitConfig, raw: string[]): Toolbar;
}

/**
 * The configuration / settings of a toolbar as loaded from the DOM
 * @internal
 */
declare class ToolbarInitConfig {
    toolbar: InPageToolbarConfigVariations | string[];
    settings: ToolbarSettings;
    /**
     * Load the toolbar configuration from the sxc-toolbar attribute OR the old schema
     * @param tag
     * @returns a configuration object or null in case of an error
     */
    static loadFromTag(tag: HTMLElement): ToolbarInitConfig;
}

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 * @internal
 */
declare class ToolbarManager extends HasLog {
    /** Singleton */
    static singleton(): ToolbarManager;
    private static _singleton;
    private readonly toolbarFinder;
    private constructor();
    buildModule(parentTag: HTMLElement): void;
    build(node: HTMLElement): void;
    loadConfig(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    /** Generate a single-use loader. It must be single use so the logs work */
    getLoader(instanceName: string): ToolbarConfigLoader;
}

/**
 * Toolbar behavior settings like float, etc.
 * @internal
 */
declare class ToolbarSettings {
    /** Automatically add the '...' more button to the toolbar */
    autoAddMore: TypeAutoAddMore;
    /**
     * Hover placement of the toolbar
     * Note: originally it was just left | right | default etc.
     * In v15 we augmented this to allow right-middle, left-middle etc. for image toolbars
     */
    hover: TypeHoverH;
    /** Show behavior (always, hover, ...) */
    show: TypeShow;
    /**
     * Experimental - try to delay the show in certain cases where the toolbar is not typical
     * Introduced in 16.04, not officially released
     * Reason is that certain image toolbars should be felt to be different, as they affect non-private images
     * @internal
     */
    delayShow: number;
    /** Follow behavior - if the toolbar should scroll with the page or remain where it was hovered */
    follow: TypeFollow;
    /**
     * Old term, keep for compatibility. Please use `.class` instead
     * @deprecated
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
    static getForEmptyAsRule: () => string;
    /**
     * figure out best code to determine where to put it.
     * Important to neutralize historically different param names,
     * and to auto-detect if hover is left.
     * @param settings
     * @returns
     */
    static bestAddMorePos(settings: ToolbarSettings): "never" | "end" | "start";
}

/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 * @internal
 */
declare class ToolbarTemplate implements ListWithCursor {
    name: string;
    groups: ToolbarTemplateGroup[];
    defaults?: Record<string, TypeValue>;
    params?: Record<string, TypeValue>;
    settings?: Partial<ToolbarSettings>;
    debug?: boolean;
    _isToolbarTemplate: true;
    _insertCursor?: 0;
    static is(thing: unknown): thing is ToolbarTemplate;
    static hasGroups(thing: unknown): thing is ToolbarTemplate;
}

/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 * @internal
 */
declare class ToolbarTemplateGroup implements ListWithCursor {
    name: string;
    buttons: string;
    defaults?: Record<string, string>;
    _insertCursor?: 0;
    static is(thing: unknown): thing is ToolbarTemplateGroup;
}

/**
 * The template manager provides toolbar templates to the entire system.
 * It basically keeps a list of predefined templates, and returns the ones needed
 * @internal
 */
declare class ToolbarTemplateManager extends HasLog {
    /** Singleton */
    static singleton(): ToolbarTemplateManager;
    private static _singleton;
    configTemplateList: ToolbarTemplate[];
    /** hash - table of templates, to be used a list()['template - name'] */
    list: Record<string, ToolbarTemplate>;
    constructor();
    /**
     * Deep copy toolbar template, so it can be modified without changing the next use
     */
    copy(name: string): ToolbarTemplate;
    private findOrShowError;
    /**
     * adds a template to the list, if it doesn't exist
     */
    private add;
}

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 * @internal
 */
declare interface ToolbarWip {
    /** The groups of buttons in this toolbar */
    groups: ButtonGroupWip[];
    /** Settings like floating of toolbar, etc. */
    settings?: ToolbarSettings;
    /** Params for the commands, like EntityId, Content - Type - Name */
    params?: Record<string, TypeValue> | CommandParams;
    /** show more debug info */
    debug?: boolean;
    /**  the button defaults like icon, etc. */
    defaults?: Record<string, TypeValue>;
}

/**
 * Simple interface to extend a HtmlElement with Workflow Manager
 *
 * @internal
 */
export declare interface ToolbarWithWorkflow extends HTMLElement {
    commandWorkflow: ToolbarWorkflowManager;
}

/**
 * A workflow manager _of a Toolbar_ which will run stuff before / after commands.
 * When toolbars are created, they will add a Manager and then raise an event for in-page code to add workflow steps.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 * @public
 */
export declare class ToolbarWorkflowManager extends HasLog {
    private isDummy;
    /**
     * The workflow steps registered on this toolbar
     * @internal
     */
    steps: WorkflowStep[];
    /**
     * @internal
     */
    constructor(parentLog: Log, isDummy?: boolean);
    /**
     * Register one or many [workflow-steps](xref:Api.Js.SxcJs.WorkflowStep) to the toolbar, to use if toolbar commands are executed.
     */
    add(steps: WorkflowStep | WorkflowStep[]): void;
    /**
     * Add a single workflow step to this manager
     * @internal
     */
    private addOne;
    /**
     * Run a workflow.
     * @internal
     * @returns This will let you chain what happens. The arguments contain a status if it should be cancelled.
     */
    run(wfArgs: WorkflowStepCodeArguments): Promise<WorkflowStepCodeArguments>;
    /**
     * Attach a workflow to a toolbar.
     * Will be used at start to hook this manager to the toolbar.
     * Then the init-event will be called to allow adding steps.
     * @internal
     */
    attach(node: HTMLElement, context: ContextComplete): void;
    /**
     *
     * @internal
     */
    private runNextPromiseIfNotCancelled;
}

/** @internal */
export declare const ToSxcName = "2sxc";

/** @internal */
export declare class TotalPopup {
    frame: any;
    callback: any;
    open(url: string, callback: () => void): void;
    close(): void;
    closeThis(): void;
}

/** @internal */
declare type TypeAutoAddMore = null | typeof TLB_MORE_AUTO | typeof TLB_MORE_END | typeof TLB_MORE_START | typeof TLB_MORE_NEVER;

/** @internal */
declare type TypeFollow = 'default' | 'none' | typeof TLB_FOLLOW_INITIAL | typeof TLB_FOLLOW_ALWAYS | typeof TLB_FOLLOW_SCROLL;

/** @internal */
declare type TypeHoverH = typeof TLB_HOV_LEFT | typeof TLB_HOV_RIGHT | 'none';

/**
 * @internal
 */
declare type TypeNoteMode = 'info' | 'warning' | 'error' | 'help' | 'link' | undefined;

/** @internal */
declare type TypeShow = typeof TLB_SHOW_ALWAYS | typeof TLB_SHOW_HOVER;

export declare type TypeValue = boolean | string | number | Date;

/**
 * Helper object to read url params.
 * Available on `$2sxc.urlParams`
 * @public
 */
export declare class UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     * If not found, will return an empty string `''`
     * @param name
     */
    get(name: string): string;
    /**
     * Get a required param from the url, no matter if it's behind ? or #
     * Will throw an error if not found
     * @param name
     */
    require(name: string): string;
    /**
     * Checks if debug is enabled in the URL
     * @returns
     */
    isDebug(): boolean;
    /**
     * Convert an object to be used in a URL.
     * Uses a custom, brief syntax which can change at any time.
     * So to unwrap, always use the toObj method.
     * IMPORTANT: This is an old experiment from ca. 2020 and was never used in production.
     * @param obj
     * @returns
     * @internal
     */
    toUrl(obj: any): string;
    /**
     * Convert a url which was created by toUrl back to an object.
     * IMPORTANT: This is an old experiment from ca. 2020 and was never used in production.
     * @param url
     * @returns
     * @internal
     */
    toObj(url: string): unknown;
}

/**
 * @internal
 */
export declare const WorkflowCommands: {
    /** Special command: 'all' is a catch-all for workflows that should run on every command */
    all: string;
    /** Special Command: 'refresh' is usually run inside other commands after execution */
    refresh: string;
};

/**
 * Various helpers to get a workflow or determine result state
 * @internal
 */
export declare class WorkflowHelper {
    /**
     * Find the command workflow on a toolbar (or return null).
     * Will go upwards in the DOM to find the toolbar node which has the configuration stored
     */
    static getWorkflow(node: HTMLElement): ToolbarWorkflowManager;
    /**
     * Get a dummy workflow manager
     *
     * @returns the manager
     * @internal
     */
    static getDummyManager(): ToolbarWorkflowManager;
    /**
     * Determine if a workflow has been cancelled
     *
     * @returns is cancelled
     * @internal
     */
    static isCancelled(currentArgs: WorkflowStepCodeArguments | boolean): boolean;
    /**
     *
     * @returns
     * @internal
     */
    private static _isCancelled;
}

/**
 * Phases / events of a specific workflow.
 */
export declare enum WorkflowPhases {
    /**
     * Run at every phase - before and after events/commands
     */
    all = "all",
    /**
     * Run before a specific event / command
     */
    before = "before",
    /**
     * Run after a specific event / command
     */
    after = "after"
}

/**
 * @internal
 */
export declare type WorkflowPromiseFactory = PromiseFactory<WorkflowStepCodeArguments>;

/**
 * A workflow step (code-sequence) to run before/after specific events.
 * @public
 */
export declare interface WorkflowStep {
    /**
     * The name of this step, in case it needs to be replaced or somehow controlled
     * Will be empty by default
     */
    name?: string;
    /**
     * The action this step is for, can be 'any', 'edit', etc.
     * Will be 'all' by default
     */
    command: string;
    /**
     * Action-phase being run, like 'all', 'before', 'after'
     * will be 'before' by default
     */
    phase?: WorkflowPhases;
    /**
     * Execution priority, higher comes first
     * Will be 1 by default.
     */
    priority?: number;
    /**
     * The code which is run, must be a promise-factory.
     * So it's a function that will return a promise.
     * Required.
     * See [](xref:Api.Js.SxcJs.WorkflowStepCode)
     */
    code: (args: WorkflowStepCodeArguments) => WorkflowStepCodeArguments;
}

/**
 * Signature of your code which is used in workflows.
 * Basically it's just a function receiving [](xref:Api.Js.SxcJs.WorkflowStepCodeArguments)
 * @internal
 * Doc Notes: it must be internal, as docFx cannot process types, so it's documented there
 */
export declare type WorkflowStepCode = (args: WorkflowStepCodeArguments) => WorkflowStepCodeArguments;

/**
 * Arguments for [WorkflowStepCode](xref:Api.Js.SxcJs.WorkflowStepCode).
 * Will be passed to your code and should also be returned by your code.
 * This also allows cancelling further execution.
 * @public
 */
export declare class WorkflowStepCodeArguments {
    /**
     * Name this workflow is running for
     */
    command: string;
    /**
     * The phase it's in (before, after, etc.)
     */
    phase: WorkflowPhases;
    /**
     * Context of the current command / step being run
     */
    context: ContextComplete;
    /**
     * Result in after-phases of the workflow
     * BETA - never really tested this
     */
    result: unknown;
    /**
     * @internal
     */
    constructor(
    /**
     * Name this workflow is running for
     */
    command: string, 
    /**
     * The phase it's in (before, after, etc.)
     */
    phase: WorkflowPhases, 
    /**
     * Context of the current command / step being run
     */
    context: ContextComplete, 
    /**
     * Result in after-phases of the workflow
     * BETA - never really tested this
     */
    result?: unknown);
    /**
     * If the workflow should be cancelled.
     * Can be set by any workflow step.
     * If set to true, following steps / workflows will not run.
     */
    cancel: boolean;
}

/**
 * @internal
 */
export declare class WorkflowStepHelper {
    static initDefaults(step: WorkflowStep): WorkflowStep;
}

/**
 * Deprecated parameters for old jQuery AJAX calls.
 * Shouldn't be used any more.
 * @public
 * @deprecated
 */
export declare interface ZzzAjaxSettingsDeprecated {
    /**
     * Override the endpoint, which is usually '2sxc'
     * @internal
     */
    endpoint?: string;
    /**
     * Controller name, for controller/action calls
     */
    controller?: string;
    /**
     * action name, for controller/action calls
     */
    action?: string;
    /**
     * The params to be used in the url for the request
     */
    params?: any;
    /**
     * @internal
     */
    preventAutoFail?: boolean;
}

/**
 * **Deprecated**
 * Old APIs on sxc.webApi.
 * They only exist if jQuery is included on the page, and we highly discourage their use.
 * @deprecated
 */
export declare interface ZzzSxcWebApiDeprecated {
    /**
     * **Deprecated**
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson)
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     *
     * Returns an http-get promise using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    get(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated**
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson)
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     *
     * Returns an http-post promise using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    post(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated**
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson)
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     *
     * Returns an http-delete promise using jQuery
     * @param settingsOrUrl the url to talk to
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    delete(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated**
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson)
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     *
     * Returns an http-put promise using jQuery
     * @param settingsOrUrl the url to put
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    put(settingsOrUrl: string | ZzzAjaxSettingsDeprecated, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated**
     * Please use [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchJson)
     * or [fetchJson()](xref:Api.Js.SxcJs.SxcWebApi.fetchRaw) instead.
     *
     * Generic http request using jQuery
     * @param settingsOrUrl the url to get
     * @param params jQuery style ajax parameters
     * @param data jQuery style data for post/put requests
     * @param preventAutoFail
     * @param method the http verb name
     * @returns jQuery ajax promise object
     * @deprecated use fetchJson instead
     */
    request(settings: string | ZzzAjaxSettingsDeprecated, params: any, data: any, preventAutoFail: boolean, method: string): any;
}

export { }
