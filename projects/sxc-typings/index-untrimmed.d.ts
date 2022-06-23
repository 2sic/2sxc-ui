/** @internal */
export declare class AjaxPromise {
    private api;
    private sxc;
    constructor(api: SxcWebApi, sxc: Sxc);
    /**
     * Make a jQuery style promise request
     * @param {AjaxSettings} settings
     * @returns {JQueryPromise<any>}
     * @memberof AjaxPromise
     */
    makePromise(settings: AjaxSettings): any;
    /**
     * Generate the correct WebApi url
     * @param settings the settings as they would be in jQuery
     */
    private getActionUrl;
}

/** @public */
export declare interface AjaxSettings {
    /** Override the endpoint, which is usually '2sxc' */
    endpoint?: string;
    /** Controller name, for controller/action calls */
    controller?: string;
    /** action name, for controller/action calls */
    action?: string;
    /** The params to be used in the url for the request */
    params?: any;
    preventAutoFail?: boolean;
}

/**
 * The fallback AntiForgery token header name (as in Dnn)
 * @internal
 */
export declare const AntiForgeryTokenHeaderNameDnn = "RequestVerificationToken";

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

/** @internal */
export declare class AssetsLoader {
    /** Asynchronously runs external and inline scripts in series */
    static runScripts(scripts: HTMLScriptElement[], callback: () => void): void;
}

/**
 * Build a SXC Controller for the page. Should only ever be executed once
 * @internal
 */
export declare function buildSxcRoot(): SxcGlobal;

/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 * @public
 */
export declare enum CommandNames {
    /**
     * `add` opens a `new` dialog to create and add a new item to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br>💡
     * This is similar to `new` but also adds the item to the existing list of items shown on the page.
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
     * `contentitems` opens the list to manage all items of a specific content-type.
     * <br> 🔘 Will use the settings of the current template to open.
     * It is only shown to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentItemsParams)
     */
    contentItems = "contentitems",
    /**
     * `contenttype` opens the dialog to view or modify fields of a content-type.
     * <br> 🔘 On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    contentType = "contenttype",
    /**
     * `copy` opens the edit-dialog for the current item in copy-mode, so when saving it will be a new item.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCopyParams)
     * <br> 🆕 in v14.03
     */
    copy = "copy",
    /**
     * `custom` will execute custom javascript.
     * <br> 🔘 This is mainly for toolbars, to add buttons with custom code.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCustomParams)
     */
    custom = "custom",
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
     * In scenarios where the page is currently showing a demo item, this will have the same effect as `add`
     * <br> 🔘 Only appears if `entityId` is known or item is in a list.
     * <br> 📩 Parameters either one of these:
     * [Id](xref:Api.Js.SxcJs.CommandParamsEntityById),
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    edit = "edit",
    /**
     * `image` opens the edit-dialog for the metadata of the current image
     * @internal - may be removed soon
     */
    image = "image",
    /**
     * `insights-server` opens the insights logs page
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required.
     */
    insightsServer = "insights-server",
    /**
     * `instance-list` opens a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    instanceList = "instance-list",
    /**
     * `layout` opens the in-page dialog to change the layout of the current content.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    layout = "layout",
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
     * `new` opens the edit-dialog for a new content-item.
     * <br>
     * It will only create an item, not add it to a list.
     * For that you would need to use `add`
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     * (auto-detected from context)
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
    templateDevelop = "template-develop",
    /**
     * `template-query` opens the pipeline/query-designer in a new window.
     * <br> 🔘 It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    templateQuery = "template-query",
    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    templateSettings = "template-settings",
    /**
     * `zone` opens the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    zone = "zone"
}

/**
 * Command parameters are handed over to a command for execution
 * @internal
 */
export declare interface CommandParams {
    /** The action is used in scenarios where the command name must be included */
    action?: CommandNames;
    items?: Array<ItemIdentifierSimple | ItemIdentifierGroup>;
    mode?: string;
    contentType?: string;
    contentTypeName?: string;
    pipelineId?: number;
    filters?: string;
    dialog?: string;
    sortOrder?: number;
    entityId?: number;
    /** The guid - for people creating custom toolbars before 10.27 or automatically added since 10.27 */
    entityGuid?: string;
    /** The manually added title from before 10.27 - automatically enabled the delete-button */
    entityTitle?: string;
    title?: string;
    useModuleList?: boolean;
    metadata?: CommandParamsMetadata;
    isPublished?: boolean;
    prefill?: Record<string, TypeValue>;
    /** Custom Code in the previous V9 standard */
    customCode?: string;
    /** Custom Code function name only in the new V10.27 standard */
    call?: string;
    /** New in 10.27 - list of apps for the quick dialog */
    apps?: string;
    /** Experimental in 10.27 */
    parent?: string;
    /** Experimental in 10.27 */
    fields?: string;
    /** for template edit dialog */
    isshared?: boolean;
}

/**
 * Parameters on `metadata` for commands which have a metadata-target.
 * @internal
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
     * Exclude pageId and moduleId headers in web requests
     * @internal
     */
    _ignoreHeaders?: boolean;
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
}

/**
 * The fallback path to the UI
 * @internal
 */
export declare const DnnUiRoot = "/desktopmodules/tosic_sexycontent/";

/**
 * This loads environment information from the meta-header tag.
 * Because of timing issues, it will try multiple times
 * @internal
 */
export declare class EnvironmentMetaLoader extends HasLog {
    env: SxcGlobalEnvironment;
    retries: number;
    log: Log;
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
}

/**
 * Any object that has an own log object
 * @export
 * @interface HasLog
 * @public
 */
export declare abstract class HasLog {
    /** @internal */
    private parentLog?;
    /**
     * The logger for this object
     * @type {Log}
     * @memberof HasLog
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
    constructor(logName: string, 
    /** @internal */
    parentLog?: Log, initialMessage?: string);
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

/** @internal */
export declare const Insights: InsightsSingleton;

/** @internal */
export declare class InsightsLogSet {
    name: string;
    logs: LogList;
    constructor(name: string);
}

/** @internal */
export declare class InsightsSingleton extends HasLog {
    constructor();
    history: {
        [key: string]: InsightsLogSet;
    };
    add(setName: string, logName: string, log: Log): void;
    show(partName: string, index?: number, start?: number, length?: number): void;
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
export declare interface ItemIdentifierGroup extends ItemIdentifierShared {
    Group: ItemIdentifierParent;
}

/**
 * Experimental in 10.27
 * @internal
 */
export declare interface ItemIdentifierInField extends ItemIdentifierSimple {
    Parent?: string;
    Field?: string;
    Add?: boolean;
}

/**
 * Group identifier
 * @internal
 * TODO: KEEP INTERNAL, PROBABLY RENAME "Part" to "Field" or something in the whole chain
 * TODO: MAY BE replaced completely with ItemIdentifierInField, as it has the same purpose
 */
export declare interface ItemIdentifierParent {
    /** The parent entity GUID - in these cases usually the ContentBlock */
    Guid: string;
    /** The part of the parent it's in, kind of the "Field" - should be renamed to Field ASAP */
    Part?: string;
    /** The index position within that field/part */
    Index: number;
    /** Whether to add the item - alternative is just to leave it, if it already existed */
    Add: boolean;
}

/**
 * Shared properties of all item identifiers
 * @internal
 */
export declare interface ItemIdentifierShared {
    EntityId?: number;
    Prefill?: Record<string, TypeValue>;
}

/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export declare interface ItemIdentifierSimple {
    EntityId: number;
    ContentTypeName?: string;
    Metadata?: CommandParamsMetadata;
    Prefill?: Record<string, TypeValue>;
}

/**
 * A log object which will collect log entries for another ojbect
 * @export
 * @interface Log
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
     * Maximum amount of entries to add - to prevent memory hoging
     */
    maxEntries: number;
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     * @internal
     */
    constructor(name: string, parent?: Log, initialMessage?: string);
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
    linkLog: (parent: Log) => void;
    /**
     * Add a simple message to the log
     * @param {string} message
     * @memberof Log
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
    dump(one?: LogEntry, separator?: string): void;
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
    private parent;
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
    private idCache;
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
    private lastMessage;
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
 * @internal
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

/** @internal */
export declare type LogList = Array<{
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
     * @type {number}
     * @memberof MetadataFor
     */
    Number?: number;
    /**
     * The string-id of the target, if it's identified by a string.
     * @type {string}
     * @memberof MetadataFor
     */
    String?: string;
    /**
     * The GUID of the target, if it's identified by a GUID.
     * @type {string}
     * @memberof MetadataFor
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
    /** https://api.jquery.com/outerWidth/ */
    static outerWidth(element: HTMLElement): number;
    /** https://api.jquery.com/empty/ */
    static empty(element: HTMLElement): void;
    /** https://api.jquery.com/replacewith/ */
    static replaceWith(toBeReplaced: HTMLElement, newElement: HTMLElement, runScripts: boolean): void;
    /** https://api.jquery.com/append/ */
    static append(parent: HTMLElement, newElements: HTMLElement[], runScripts: boolean): void;
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
    /**
     * This is the same as Object.assign, but type-safe.
     * Use it as a replacetment for Object.Assign(this, ... ) in constructors
     */
    static TypeSafeAssign<T, K extends keyof T>(...args: T[]): void;
    static DeepClone<T>(original: T, ignoreCircular?: boolean): T;
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
     * Optional for many actions, but can themselves also contain the property `action`, in which case action can be ommited.
     * @internal
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
     * @type {SxcWebApi}
     * @memberof Sxc
     */
    webApi: SxcWebApi;
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     * @memberof SxcInstance
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
     * TypeGuard for TypeScript to verify this is a SxcInstance
     * @param thing
     * @internal
     */
    static is(thing: unknown): thing is Sxc;
    /**
     * Get a data service for a specific content-type.
     *
     * @param {string} contentType name of the content type which this service will get
     * @returns SxcData<T>
     * @memberof SxcInstance
     */
    data<T = unknown>(contentType: string): SxcData<T>;
    /**
     *
     * @param query
     * @returns SxcQuery
     * @memberof SxcInstance
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
 * Data Service for an App / Sxc-Instance to get/create data of a specific Content-Type
 * @public
 */
export declare class SxcData<T = unknown> extends SxcDataServiceBase {
    readonly name: string;
    /**
     * Creates an instance of SxcData.
     * @param {Sxc} sxc
     * @param {string} name the content-type name
     * @memberof SxcData
     * @internal
     */
    constructor(sxc: Sxc, name: string);
    /**
     * Get all items of this type.
     */
    getAll(): Promise<T[]>;
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
 * Base class doing common checks
 * @public
 */
export declare class SxcDataServiceBase extends SxcPart {
    readonly name: string;
    protected readonly webApi: SxcWebApi;
    /**
     * Creates an instance of SxcData.
     * @param {Sxc} sxc
     * @param {string} name the content-type name
     * @memberof SxcData
     */
    constructor(sxc: Sxc, name: string, nameInError: string);
}

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
     */
    log: Log;
    /**
     * Helper to work with url parameters behind ? or #
     * @type {UrlParams}
     * @memberof SxcRoot
     */
    urlParams: UrlParams;
    /**
     * A helper to create full-screen popups
     * @internal
     */
    totalPopup: TotalPopup;
}

/** @internal */
export declare class SxcGlobalDebug {
    /**
     * The load-debug state (provided by the url with debug=true)
     */
    load: boolean;
    /**
     * Cache breaker string, contans the version number of 2sxc if one is provided with sxcver=...
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
     * @param endpointName
     * @returns {string}
     * @memberof Http
     * @internal Not relevant for 2sxc, only used if calling platform endpoints
     */
    apiRoot(endpointName: string): string;
    /**
     * Get the API-Root path for Apps
     * new in v12
     * @param {string} endpointName
     * @returns {string}
     * @memberof SxcHttp
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
 * Base class for anything attached to an sxc-instance
 * @public
 */
export declare class SxcPart {
    /** @internal */
    sxc: Sxc;
    /** @internal */
    partName: string;
    /**
     * Creates an instance of SxcData.
     * @param {Sxc} sxc
     * @param {string} partName name of the part
     * @memberof SxcData
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
     * @param {Sxc} sxc
     * @param {string} name
     * @memberof SxcQuery
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
     * @param {string} stream
     * @returns {Promise<T[]>} containing an array of items - or empty if stream not found or nothing returned
     * @memberof SxcQuery
     */
    getStream<T = unknown>(stream: string): Promise<T[]>;
    getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>): Promise<T[]>;
    getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T[]>;
    getStreams<T = unknown>(streams: string): Promise<T>;
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>): Promise<T>;
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
    /**
     * Get all or one data entity from the backend
     * @param id optional id as number or string - if not provided, will get all
     * @param params optional parameters - ATM not usefuly but we plan to support more filters etc.
     * @returns an array with 1 or n entities in the simple JSON format
     * @internal
     */
    private getInternal;
}

/** @internal */
export declare const SxcVersion: string;

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export declare class SxcWebApi implements SxcWebApiDeprecated {
    private readonly sxc;
    /**
     * @type {SxcGlobalEnvironment}
     * @memberof SxcWebApi
     * @internal
     */
    readonly env: SxcGlobalEnvironment;
    /**
     *
     * @param sxc
     * @internal
     */
    constructor(sxc: Sxc);
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     * @internal
     */
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): any;
    /**
     * Will retrieve data from the backend using a standard fetch.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing a Response object, just like a normal fetch would.
     * example: webApi.fetchRaw('Rss/Feed');
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 })); // url params
     * example: webApi.fetchRaw('Rss/Feed', { id: 47 }); // post params
     * example: webApi.fetchRaw(webApi.url('Rss/Feed', { id: 47 }), { something: 'this is a test' }); // url & post params
     * maybe: webApi.fetchRaw({url: 'Rss/Feed', params: { id: 47 }})
     * maybe: webApi.fetchRaw({url: ..., params: { ...}, body: { ...}, method: 'GET' })
     */
    fetchRaw(url: string, data?: string | Record<string, any>, method?: string): Promise<Response>;
    /** @internal */
    fetch(url: string, data?: string | Record<string, any>, method?: string): Promise<Response>;
    /**
     * Will retrieve data from the backend using a standard fetch and give you an object.
     * @param url a full url or short-hand like `controller/method?params` `app/auto/api/controller/method?params`. Note that params would also be specified on the url.
     * @param data optional POST data
     * @param method optional method, defaults to `GET` unless it has data, in which case it defaults to `POST`
     * @returns a Promise containing any object.
     */
    fetchJson<T = any>(url: string, data?: string | Record<string, any>, method?: string): Promise<T>;
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
 * **Deprecated**
 * Old APIs on sxc.webApi.
 * They only exist if jQuery is included on the page, and we highly discourage their use.
 * @deprecated
 */
export declare interface SxcWebApiDeprecated {
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
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
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
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
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
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
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
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
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
    request(settings: string | AjaxSettings, params: any, data: any, preventAutoFail: boolean, method: string): any;
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
export declare const ToSxcName = "2sxc";

/** @internal */
export declare class TotalPopup {
    frame: any;
    callback: any;
    open(url: string, callback: () => void): void;
    close(): void;
    closeThis(): void;
}

export declare type TypeValue = boolean | string | number | Date;

/** @internal */
export declare function urlClean(original: string): string;

/**
 * Helper object to read url params.
 * Available on `$2sxc.urlParams`
 * @public
 */
export declare class UrlParams {
    /**
     * Get a param from the url, no matter if it's behind ? or #
     * If not found, will return an empty string `''`
     * @param {string} name
     * @memberof QueryParams
     */
    get(name: string): string;
    /**
     * Get a required param from the url, no matter if it's behind ? or #
     * Will throw an error if not found
     * @param {string} name
     * @memberof QueryParams
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
     * @param obj
     * @returns
     * @internal
     */
    toUrl(obj: any): string;
    /**
     * Convert a url which was created by toUrl back to an object.
     * @param url
     * @returns
     * @internal
     */
    toObj(url: string): unknown;
}

export { }
