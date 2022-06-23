/* Excluded from this release type: AjaxPromise */

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

/* Excluded from this release type: AntiForgeryTokenHeaderNameDnn */

/* Excluded from this release type: ApiExtensionPlaceholder */

/* Excluded from this release type: ApiUrlRoots */

/* Excluded from this release type: AppApiMap */

/* Excluded from this release type: AppApiMarker */

/* Excluded from this release type: AssetsLoader */

/* Excluded from this release type: buildSxcRoot */

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
    /* Excluded from this release type: image */
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
    /* Excluded from this release type: newMode */
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

/* Excluded from this release type: CommandParams */

/* Excluded from this release type: CommandParamsMetadata */

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
    /* Excluded from this release type: _ignoreHeaders */
    /* Excluded from this release type: complete */
    /* Excluded from this release type: blockId */
    /* Excluded from this release type: is */
    /* Excluded from this release type: ensureCompleteOrThrow */
}

/* Excluded from this release type: DnnUiRoot */

/* Excluded from this release type: EnvironmentMetaLoader */

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
    /* Excluded from this release type: uiRoot */
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
    /* Excluded from this release type: parentLog */
    /* Excluded from this release type: log */
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: initLog */
    /* Excluded from this release type: initLogInternal */
}

/* Excluded from this release type: HeaderNames */

/* Excluded from this release type: Insights */

/* Excluded from this release type: InsightsLogSet */

/* Excluded from this release type: InsightsSingleton */

/* Excluded from this release type: ItemIdentifierCopy */

/* Excluded from this release type: ItemIdentifierGroup */

/* Excluded from this release type: ItemIdentifierInField */

/* Excluded from this release type: ItemIdentifierParent */

/* Excluded from this release type: ItemIdentifierShared */

/* Excluded from this release type: ItemIdentifierSimple */

/* Excluded from this release type: Log */

/* Excluded from this release type: LogCall */

/* Excluded from this release type: LogEntry */

/* Excluded from this release type: LogEntryOptions */

/* Excluded from this release type: LogList */

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
    /* Excluded from this release type: Singleton */
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

/* Excluded from this release type: MetaHeaderJsApi */

/* Excluded from this release type: NoJQ */

/* Excluded from this release type: NumberNotDefinedHuge */

/* Excluded from this release type: Obj */

/* Excluded from this release type: PlatformDnn */

/* Excluded from this release type: PlatformOqtane */

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
    /* Excluded from this release type: params */
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

/* Excluded from this release type: Stats */

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
    /* Excluded from this release type: cacheKey */
    /* Excluded from this release type: root */
    /* Excluded from this release type: ctx */
    /* Excluded from this release type: _isSxcInstance */
    /**
     * Web API calls for this instance.
     * This is the pure call APIs system.
     * To get data or queries, best use the data or query services.
     * @type {SxcWebApi}
     * @memberof Sxc
     */
    webApi: SxcWebApi;
    /* Excluded from this release type: manage */
    /**
     * CMS operations on this sxc-instance, such as opening the edit dialog etc.
     */
    cms: SxcCms;
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: is */
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
    /* Excluded from this release type: resolveServiceUrl */
    /* Excluded from this release type: showDetailedHttpError */
    /**
     * Test if the current code is in edit-mode and additional javascripts have been loaded to make it work
     * @returns true if we are in edit-mode
     */
    isEditMode(): boolean;
    /* Excluded from this release type: recreate */
}

/* Excluded from this release type: SxcApiUrlRoot */

/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @public
 */
export declare class SxcCms extends SxcPart {
    /* Excluded from this release type: __constructor */
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
    /* Excluded from this release type: __constructor */
    /**
     * Get all items of this type.
     */
    getAll(): Promise<T[]>;
    /**
     * Get the specific item with the ID. It will return null if not found
     */
    getOne(id: number): Promise<T> | null;
    /* Excluded from this release type: getMany */
    /* Excluded from this release type: getInternal */
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
    /* Excluded from this release type: _controllers */
    /* Excluded from this release type: beta */
    /* Excluded from this release type: _manage */
    /* Excluded from this release type: _translateInit */
    /* Excluded from this release type: debug */
    /* Excluded from this release type: stats */
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
    /* Excluded from this release type: _insights */
    /* Excluded from this release type: log */
    /**
     * Helper to work with url parameters behind ? or #
     * @type {UrlParams}
     * @memberof SxcRoot
     */
    urlParams: UrlParams;
    /* Excluded from this release type: totalPopup */
}

/* Excluded from this release type: SxcGlobalDebug */

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 * @public
 */
export declare class SxcGlobalEnvironment extends HasLog {
    /* Excluded from this release type: header */
    /**
     * Flag to determine if the environment information is available.
     */
    ready: boolean;
    /**
     * Where the environment information came from.
     */
    source: string;
    /* Excluded from this release type: metaLoader */
    /* Excluded from this release type: __constructor */
    /**
     * Manually load a new EnvironmentSpecs in cases where the page cannot provide them.
     * This is only used in scenarios outside of Dnn / Oqtane, you will usually not need this.
     * @param envSpecs new info to load
     * @param source _optional_ name where the data came from
     */
    load(envSpecs: EnvironmentSpecs, source?: string): void;
    /* Excluded from this release type: replacedRvt */
    /* Excluded from this release type: updateRvt */
    /**
     * The API endpoint url from the environment
     */
    api(): string;
    /* Excluded from this release type: appApi */
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
    /* Excluded from this release type: uiRoot */
    /**
     * The platform code like 'oqt' or 'dnn' in case the JS needs to know the difference
     */
    platform(): string;
    /* Excluded from this release type: ensureReadyOrThrow */
}

/**
 * Global HTTP Service for information and helpers on `$2sxc.http`
 * @public
 */
export declare class SxcGlobalHttp extends HasLog {
    private env;
    /* Excluded from this release type: __constructor */
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
    /* Excluded from this release type: apiRoot */
    /* Excluded from this release type: appApiRoot */
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

/* Excluded from this release type: SxcGlobalManage */

/* Excluded from this release type: SxcManage */

/**
 * Base class for anything attached to an sxc-instance
 * @public
 */
export declare class SxcPart {
    /* Excluded from this release type: sxc */
    /* Excluded from this release type: partName */
    /* Excluded from this release type: __constructor */
}

/**
 * Instance Query Service
 * @public
 */
export declare class SxcQuery extends SxcDataServiceBase {
    readonly name: string;
    /* Excluded from this release type: __constructor */
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
    /* Excluded from this release type: getInternal */
}

/* Excluded from this release type: SxcVersion */

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export declare class SxcWebApi implements SxcWebApiDeprecated {
    private readonly sxc;
    /* Excluded from this release type: env */
    /* Excluded from this release type: __constructor */
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    get(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    post(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    delete(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
     */
    put(settingsOrUrl: string | AjaxSettings, params?: any, data?: any, preventAutoFail?: boolean): any;
    /**
     * **Deprecated** - docs in the separate interface
     * @deprecated use fetchJson instead
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
    /* Excluded from this release type: fetch */
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

/* Excluded from this release type: TemplateIdentifier */

/* Excluded from this release type: ToSxcName */

/* Excluded from this release type: TotalPopup */

export declare type TypeValue = boolean | string | number | Date;

/* Excluded from this release type: urlClean */

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
    /* Excluded from this release type: toUrl */
    /* Excluded from this release type: toObj */
}

export { }
