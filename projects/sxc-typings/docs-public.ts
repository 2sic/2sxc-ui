/* Excluded from this release type: Actions */

/* Excluded from this release type: AjaxPromise */

/* Excluded from this release type: AntiForgeryTokenHeaderNameDnn */

/* Excluded from this release type: ApiExtensionPlaceholder */

/* Excluded from this release type: ApiUrlRoots */

/* Excluded from this release type: AppApiMap */

/* Excluded from this release type: AppApiMarker */

/* Excluded from this release type: AssetsLoader */

/* Excluded from this release type: AttrJsonContentGroup */

/* Excluded from this release type: AttrJsonEditContext */

/* Excluded from this release type: AttrJsonEntity */

/* Excluded from this release type: AttrJsonEnvironment */

/* Excluded from this release type: AttrJsonError */

/* Excluded from this release type: AttrJsonLanguage */

/* Excluded from this release type: AttrJsonUi */

/* Excluded from this release type: AttrJsonUser */

/* Excluded from this release type: BuildRule */

/* Excluded from this release type: BuildSteps */

/* Excluded from this release type: buildSxcRoot */

/* Excluded from this release type: Button */

/* Excluded from this release type: ButtonCommand */

/* Excluded from this release type: ButtonConfigLoader */

declare type ButtonGenOrProp<T> = ButtonPropGen<T> | T;

/* Excluded from this release type: ButtonGroup */

/* Excluded from this release type: ButtonGroupConfigLoader */

/* Excluded from this release type: ButtonGroupsWip */

/* Excluded from this release type: ButtonGroupWip */

/**
 * This is the most common call signature on most ButtonConfig properties
 * @public
 */
declare type ButtonPropGen<T> = (context: ContextComplete) => T;

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

/* Excluded from this release type: CmdParHlp */

/* Excluded from this release type: CmsEngine */

/* Excluded from this release type: Command */

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

/* Excluded from this release type: CommandCode */

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

/* Excluded from this release type: CommandConfigLoader */

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

/* Excluded from this release type: CommandCustomParams */

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

/* Excluded from this release type: CommandLinkGenerator */

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
    /* Excluded from this release type: data_old_contentItems */
    /**
     * `fields` opens the dialog to view or modify fields of a content-type.
     * <br> 🔘 On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    fields = "fields",
    /* Excluded from this release type: fields_old_contenttype */
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
    /* Excluded from this release type: code_old_custom */
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
    /* Excluded from this release type: image */
    /**
     * `insights` opens the insights logs page
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required.
     */
    insights = "insights",
    /* Excluded from this release type: insights_old_server */
    /**
     * `instance-list` opens a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    list = "list",
    /* Excluded from this release type: list_old_instanceList */
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
     * `new` opens the edit-dialog to create a new item/entity.
     * <br>
     * If the previous item is in a list, it will add it to that list _after_ the previous item with the toolbar.
     * Otherwise it just creates it and the visualization will differ depending on the App.
     * <br> 🪜 It works differently for lists - in which case it also adds it to the list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandNewParams)
     * (usually auto-detected from context)
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
    template = "template",
    /* Excluded from this release type: template_old_develop */
    /**
     * `template-query` opens the pipeline/query-designer in a new window.
     * <br> 🔘 It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    query = "query",
    /* Excluded from this release type: query_old_templateQuery */
    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    view = "view",
    /* Excluded from this release type: view_old_templateSettings */
    /**
     * `system` opens the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    system = "system",
    /* Excluded from this release type: system_old_zone */
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
    /* Excluded from this release type: action */
    /* Excluded from this release type: items */
    /* Excluded from this release type: mode */
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    contentType?: string;
    /* Excluded from this release type: contentTypeName */
    /* Excluded from this release type: pipelineId */
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    filters?: string;
    /* Excluded from this release type: dialog */
    /* Excluded from this release type: sortOrder */
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
     * @public
     */
    useModuleList?: true;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    metadata?: CommandParamsMetadata;
    /* Excluded from this release type: isPublished */
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    prefill?: Record<string, boolean | string | number | Date>;
    /* Excluded from this release type: customCode */
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    call?: string;
    /* Excluded from this release type: apps */
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    parent?: string;
    /**
     * The purpose of this varies by [Command](xref:Api.Js.SxcJs.CommandNames).
     * @public
     */
    fields?: string;
    /* Excluded from this release type: isshared */
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
 * Parameters used for commands which address a specificy entity.
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
     * Determins the position of the item in the list.
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
     * Determins the position of the item in the list of that entity-field.
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

declare type CommandPromise<T> = Promise<T | void>;

/* Excluded from this release type: Commands */

/* Excluded from this release type: ContentBlockReference */

/* Excluded from this release type: ContentListActionParams */

/* Excluded from this release type: ContentListActions */

/**
 * @public
 */
declare class ContextBundleContent extends ContextBundleInstance {
    /* Excluded from this release type: item */
    /* Excluded from this release type: contentBlockReference */
    /* Excluded from this release type: contentBlock */
    /* Excluded from this release type: __constructor */
}

/**
 * @public
 */
declare class ContextBundleInstance {
    /**
     * instance of sxc object
     */
    sxc: Sxc;
    /* Excluded from this release type: instance */
    /* Excluded from this release type: app */
    /* Excluded from this release type: ui */
    /* Excluded from this release type: page */
    /* Excluded from this release type: system */
    /* Excluded from this release type: tenant */
    /* Excluded from this release type: user */
    _isContext: boolean;
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: is */
}

/**
 * @public
 */
declare class ContextBundleToolbar extends ContextBundleContent {
    /* Excluded from this release type: toolbar */
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: forButton */
}

/**
 * @public
 */
declare class ContextComplete extends ContextBundleToolbar {
    /* Excluded from this release type: _isCtxComplete */
    /* Excluded from this release type: button */
    /* Excluded from this release type: commandWorkflow */
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: findContext */
    /* Excluded from this release type: contextCopy */
    /* Excluded from this release type: getContextInstance */
    /* Excluded from this release type: is */
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
    /* Excluded from this release type: _ignoreHeaders */
    /* Excluded from this release type: complete */
    /* Excluded from this release type: blockId */
    /* Excluded from this release type: is */
    /* Excluded from this release type: ensureCompleteOrThrow */
}

/* Excluded from this release type: ContextOfApp */

/* Excluded from this release type: ContextOfContentBlock */

/* Excluded from this release type: ContextOfInstance */

/* Excluded from this release type: ContextOfItem */

/* Excluded from this release type: ContextOfPage */

/* Excluded from this release type: ContextOfSystem */

/* Excluded from this release type: ContextOfTenant */

/* Excluded from this release type: ContextOfUi */

/* Excluded from this release type: ContextOfUser */

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

/* Excluded from this release type: InPageButtonGroupJson */

/* Excluded from this release type: InPageButtonJson */

/* Excluded from this release type: InPageCommandJson */

/* Excluded from this release type: InPageCommandJsonWithTooMuchInfo */

/* Excluded from this release type: InPageToolbarConfigVariations */

/* Excluded from this release type: Insights */

declare class InsightsLogSet {
    name: string;
    logs: LogList;
    constructor(name: string);
}

/* Excluded from this release type: InsightsSingleton */

/* Excluded from this release type: ItemIdentifierCopy */

/* Excluded from this release type: ItemIdentifierGroup */

/* Excluded from this release type: ItemIdentifierInField */

/* Excluded from this release type: ItemIdentifierParent */

/* Excluded from this release type: ItemIdentifierShared */

/* Excluded from this release type: ItemIdentifierSimple */

/* Excluded from this release type: ListWithCursor */

/**
 * A log object which will collect log entries for another ojbect
 * @export
 * @interface Log
 * @public
 */
export declare class Log {
    /**
     * List of all entries added to this log
     */
    entries: LogEntry[];
    /* Excluded from this release type: depth */
    /* Excluded from this release type: callDepths */
    /* Excluded from this release type: startTime */
    /**
     * Maximum amount of entries to add - to prevent memory hoging
     */
    maxEntries: number;
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: liveDump */
    /* Excluded from this release type: _parentHasLiveDump */
    /* Excluded from this release type: keepData */
    /* Excluded from this release type: _parentHasKeepData */
    /* Excluded from this release type: fullIdentifier */
    /* Excluded from this release type: rename */
    /* Excluded from this release type: linkLog */
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
    /* Excluded from this release type: addData */
    /* Excluded from this release type: logData */
    /* Excluded from this release type: _prepareEntry */
    /* Excluded from this release type: _prepareMessage */
    /* Excluded from this release type: call */
    /* Excluded from this release type: _callDepthAdd */
    /* Excluded from this release type: _callDepthRemove */
    /* Excluded from this release type: dump */
    /* Excluded from this release type: dumpList */
    /* Excluded from this release type: dumpOne */
    /* Excluded from this release type: _addEntry */
    /* Excluded from this release type: randomString */
    /* Excluded from this release type: parent */
    /* Excluded from this release type: scope */
    /**
     * The name of this log, for scenarios where multiple loggers are mixed
     */
    name: string;
    /* Excluded from this release type: id */
    /* Excluded from this release type: idCache */
    /* Excluded from this release type: identifier */
}

/* Excluded from this release type: LogCall */

/**
 * A log entry item
 * @export
 * @interface LogEntry
 * @public
 */
export declare class LogEntry {
    /* Excluded from this release type: log */
    message: string;
    /* Excluded from this release type: depth */
    /** A timestamp for this entry to better see sequences of things happening */
    time: number;
    /* Excluded from this release type: result */
    /* Excluded from this release type: data */
    /* Excluded from this release type: data */
    /* Excluded from this release type: _data */
    /* Excluded from this release type: source */
    /* Excluded from this release type: __constructor */
}

/* Excluded from this release type: LogEntryOptions */

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

/* Excluded from this release type: ModifierBase */

/* Excluded from this release type: ModifierContentBlock */

/* Excluded from this release type: ModifierContentBlockInstance */

/* Excluded from this release type: ModifierDnnModule */

/* Excluded from this release type: ModifierDnnModuleInternal */

/* Excluded from this release type: NoJQ */

/* Excluded from this release type: NumberNotDefinedHuge */

/* Excluded from this release type: Obj */

/* Excluded from this release type: Operations */

/* Excluded from this release type: PlatformDnn */

/* Excluded from this release type: PlatformOqtane */

/* Excluded from this release type: positionAndAlign */

/* Excluded from this release type: PositionCoordinates */

/* Excluded from this release type: Positioning */

/* Excluded from this release type: PromiseFactory */

/* Excluded from this release type: QeSelectors */

/* Excluded from this release type: QuickE */

/* Excluded from this release type: QuickEClipboard */

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
     * The buttons configuration on the root.
     * Will be used for the `modules` and `innerBlocks` if not specified there.
     * Note that if not specified, will always default to true for all buttons.
     */
    buttons?: QuickEditConfigButtons;
    /**
     * Optional configuration for the Inner Content Blocks.
     */
    innerBlocks?: QuickEditConfig;
    /**
     * Optional configuration for the Modules.
     */
    modules?: QuickEditConfig;
    /* Excluded from this release type: getDefault */
}

/* Excluded from this release type: QuickEditOverlay */

/* Excluded from this release type: refresh */

/* Excluded from this release type: RuleManager */

/* Excluded from this release type: RuleParams */

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

/* Excluded from this release type: RunParamsHelpers */

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

/* Excluded from this release type: RunParamsWithWorkflows */

/* Excluded from this release type: Selection_2 */

/* Excluded from this release type: SharedLogic */

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
     * @param contentType: name of the content type which this service will get
     */
    data<T = unknown>(contentType: string): SxcData<T>;
    /**
     *
     * @param query
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

/* Excluded from this release type: SxcCmsReal */

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
 * Base class doing common checks.
 * This is internal and not important, but we can't keep it out of the docs.
 * @public
 */
export declare abstract class SxcDataServiceBase extends SxcPart {
    readonly name: string;
    protected readonly webApi: SxcWebApi;
    /* Excluded from this release type: __constructor */
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
     */
    urlParams: UrlParams;
    /* Excluded from this release type: totalPopup */
}

/**
 * Global Content-Management System on the $2sxc.cms.
 *
 * It is only available if the page is in edit mode / the page feature `2sxc.JsCms` has been activated.
 * @public
 */
export declare class SxcGlobalCms extends HasLog {
    /* Excluded from this release type: autoDump */
    /* Excluded from this release type: __constructor */
    /* Excluded from this release type: resetLog */
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
    /* Excluded from this release type: runInternal */
    /* Excluded from this release type: do */
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

/**
 * $2sxc global interface _extending_ the `SxcGlobal` when the page feature `JsCms` is enabled.
 *
 * If the page feature `2sxc.JsCms` is not enabled, the `window.$2sxc` will be a [SxcGlobal](xref:Api.Js.SxcJs.SxcGlobal)
 * @public
 */
export declare interface SxcGlobalWithCms {
    /* Excluded from this release type: system */
    /**
     * Will retrieve a resource in the current language.
     * Mainly used for toolbars etc. to support localization.
     *
     * Only available when edit mode is on meaning the page feature JsCms is enabled
     * @param key the key of the resource to translate
     */
    translate(key: string): string;
    /* Excluded from this release type: context */
    /**
     * Content Management features on the $2sxc
     */
    cms: SxcGlobalCms;
}

/* Excluded from this release type: SxcManage */

/**
 * Base class for anything attached to an sxc-instance.
 * This is internal and not important, but we can't keep it out of the docs.
 * @public
 */
export declare abstract class SxcPart {
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
    /* Excluded from this release type: getInternal */
}

/* Excluded from this release type: SxcTools */

/* Excluded from this release type: SxcVersion */

/**
 * helper API to run ajax / REST calls to the server
 * it will ensure that the headers etc. are set correctly
 * and that urls are rewritten
 * @public
 */
export declare class SxcWebApi implements ZzzSxcWebApiDeprecated {
    private readonly sxc;
    /* Excluded from this release type: env */
    /* Excluded from this release type: __constructor */
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

/* Excluded from this release type: SystemUpgrader */

/* Excluded from this release type: TemplateEditor */

/* Excluded from this release type: TemplateIdentifier */

/* Excluded from this release type: Toolbar */

/* Excluded from this release type: TOOLBAR_FOLLOW_ALWAYS */

/* Excluded from this release type: TOOLBAR_FOLLOW_INITIAL */

/* Excluded from this release type: TOOLBAR_FOLLOW_SCROLL */

/* Excluded from this release type: TOOLBAR_SHOW_ALWAYS */

/* Excluded from this release type: TOOLBAR_SHOW_HOVER */

/* Excluded from this release type: ToolbarButtonSettings */

/* Excluded from this release type: ToolbarConfigLoader */

/* Excluded from this release type: ToolbarConfigLoaderV09 */

/* Excluded from this release type: ToolbarConfigLoaderV10 */

/* Excluded from this release type: ToolbarInitConfig */

/* Excluded from this release type: ToolbarManager */

/* Excluded from this release type: ToolbarSettings */

/* Excluded from this release type: ToolbarTemplate */

/* Excluded from this release type: ToolbarTemplateGroup */

/* Excluded from this release type: ToolbarTemplateManager */

/* Excluded from this release type: ToolbarWip */

/* Excluded from this release type: ToolbarWithWorkflow */

/**
 * A workflow manager _of a Toolbar_ which will run stuff before / after commands.
 * When toolbars are created, they will add a Manager and then raise an event for in-page code to add workflow steps.
 * Normally the toolbar with raise a `toolbar-init` event where you can then add steps.
 * @public
 */
export declare class ToolbarWorkflowManager extends HasLog {
    private isDummy;
    /* Excluded from this release type: steps */
    /* Excluded from this release type: __constructor */
    /**
     * Register one or many [workflow-steps](xref:Api.Js.SxcJs.WorkflowStep) to the toolbar, to use if toolbar commands are executed.
     */
    add(steps: WorkflowStep | WorkflowStep[]): void;
    /* Excluded from this release type: addOne */
    /* Excluded from this release type: run */
    /* Excluded from this release type: attach */
    /* Excluded from this release type: runNextPromiseIfNotCancelled */
}

/* Excluded from this release type: ToSxcName */

/* Excluded from this release type: TotalPopup */

declare type TypeAutoAddMore = null | 'start' | 'end' | true;

/* Excluded from this release type: TypeFollow */

declare type TypeHover = 'left' | 'right' | 'none';

/* Excluded from this release type: TypeShow */

/* Excluded from this release type: TypeTbD */

export declare type TypeValue = boolean | string | number | Date;

/* Excluded from this release type: urlClean */

declare interface UrlItemParams {
    prefill?: Record<string, TypeValue>;
    items?: string;
    contentTypeName?: string;
    filters?: string;
}

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
    /* Excluded from this release type: toUrl */
    /* Excluded from this release type: toObj */
}

/* Excluded from this release type: WorkflowCommands */

/* Excluded from this release type: WorkflowHelper */

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

/* Excluded from this release type: WorkflowPromiseFactory */

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

/* Excluded from this release type: WorkflowStepCode */

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
    /* Excluded from this release type: __constructor */
    /**
     * If the workflow should be cancelled.
     * Can be set by any workflow step.
     * If set to true, following steps / workflows will not run.
     */
    cancel: boolean;
}

/* Excluded from this release type: WorkflowStepHelper */

/**
 * Deprecated parameters for old jQuery AJAX calls.
 * Shouldn't be used any more.
 * @public
 * @deprecated
 */
export declare interface ZzzAjaxSettingsDeprecated {
    /* Excluded from this release type: endpoint */
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
    /* Excluded from this release type: preventAutoFail */
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
