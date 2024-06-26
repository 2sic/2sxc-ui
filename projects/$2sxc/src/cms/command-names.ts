// Documentation notes
//
// You cannot use @see in the docs, it doesn't work with docFx
// Instead, always use [text](xref:Api.Js.SxcJs.CommandNames)
// or similar
//
// End documentation notes


/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 * @public
 */
// IMPORTANT: this must be a `const enum`, otherwise it won't work in d.ts files
export const enum CommandNames {
    /**
     * `add` adds another demo-item to a **list of items**.
     * It does not open the edit-dialog.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br>💡
     * This is different than new, which opens a dialog to add something. 
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddParams)
     */
    add = 'add',

    /**
     * `add-existing` opens a dialog allowing the user to select an existing item to add to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddExistingParams)
     * <br> 🆕 in v11.01
     */
    addExisting = 'add-existing',

    /**
     * `app` opens the app-admin dialog
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    app = 'app',

    /**
     * `app-import` opens the dialog to import an App.
     * <br> 🔘 This is not available on the toolbar.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appImport = 'app-import',

    /**
     * `app-resources` opens the edit dialog for app-resources (multi-language texts, labels etc.).
     * <br> 🔘 It's disabled on the toolbar if the app doesn't have resource-values to configure.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appResources = 'app-resources',

    /**
     * `app-settings` opens the edit dialog for the app-settings.
     * <br> 🔘 It's disabled on the toolbar if the app doesn't have setting-values to configure
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    appSettings = 'app-settings',

    /**
     * `apps` opens the manage all apps dialog.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected based on toolbar)
     */
    apps = 'apps',

    /**
     * `data` opens the list to manage all items of a specific content-type.
     * <br> 🔘 Will use the settings of the current template to open.
     * It is only shown to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandDataParams)
     */
    data = 'data',

    /**
     * old name
     * @internal
     */
    data_old_contentItems = 'contentitems',

    /**
     * `fields` opens the dialog to view or modify fields of a content-type.
     * <br> 🔘 On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    fields = 'fields',

    /**
     * old name
     * @internal
     */
    fields_old_contenttype = 'contenttype',


    /**
     * `copy` opens the edit-dialog for the current item in copy-mode, so when saving it will be a new item.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCopyParams)
     * <br> 🆕 in v14.03
     */
    copy = 'copy',

    /**
     * `code` will execute custom javascript.
     * <br> 🔘 This is mainly for toolbars, to add buttons with custom code.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCodeParams)
     * <br> _this used to be called `custom` and had a different setup_
     */
    code = 'code',

    /**
     * old name
     * @internal
     */
    code_old_custom = 'custom',

    /**
     * `delete` will delete (not just remove) a content-item.
     * <br> 💡 This is similar to `remove` but really deletes the data from the DB.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandDeleteParams)
     * (auto-detected from context)
     */
    delete = 'delete',

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
    edit = 'edit',

    /**
     * `help` shows a button with a question mark and a tooltip with some info.
     * <br>
     * When clicked it opens a link.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     * TODO: AS IT'S basically identical with link, we should reconsider this...?
     */
    help = 'help',

    /**
     * `image` opens the edit-dialog for the metadata of the current image
     * @internal - may be removed soon
     */
    image = 'image',

    /**
     * `info` shows a button with a info icon, with optional tooltip and an alert with some info.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     */
    info = 'info',

    /**
     * `insights` opens the insights logs page
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required.
     */
    insights = 'insights',

    /**
     * old name
     * @internal
     */
    insights_old_server = 'insights-server',

    /**
     * `link` shows a button with a link icon, with optional tooltip.
     * When clicked it opens a link.
     * <br> 📩 Parameters either one of these: TODO
     * @internal - still WIP v15.04
     */
    link = 'link',

    /**
     * `instance-list` opens a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    list = 'list',

    /**
     * old name
     * @internal
     */
    list_old_instanceList = 'instance-list',


    /**
     * `layout` opens the in-page dialog to change the layout of the current content.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    layout = 'layout',

    /**
     * just add a log, mainly for verifying functionality of running commands
     * @internal
     */
    log = 'log',

    /**
     * WIP
     * @internal
     */
    edition = 'edition',

    /**
     * `metadata` opens the edit-dialog for the current metadata item.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandMetadataParams)
     */
    metadata = 'metadata',

    /**
     * `more` create a "…" (ellipsis) button which flips through the button groups of toolbars
     * <br> 🔘 It only appears if the toolbar has `more`=`auto` and has multiple groups.
     * <br> 📩 No params required, 
     * (auto-detected based on toolbar)
     */
    more = 'more',

    /**
     * `movedown` moves a content-item down one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 Parameters either one of these: 
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    moveDown = 'movedown',

    /**
     * `moveup` moves a content-item up one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 Parameters either one of these: 
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    moveUp = 'moveup',

    /**
     * `new` opens the edit-dialog to create a new item/entity.
     * <br>
     * If the previous item is in a list, it will add it to that list _after_ the previous item with the toolbar. 
     * Otherwise it just creates it and the visualization will differ depending on the App.
     * <br> 🪜 It works differently for lists - in which case it also adds it to the list. 
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandNewParams)
     * (usually auto-detected from context)
     */
    new = 'new',

    /**
     * `new` sets new mode used in parameters
     * @internal - must move, this shouldn't be here as it's not a command!
     */
    newMode = 'new',

    /**
     * `publish` tells the system to update a content-items status to published. If there was a published and a draft before, the draft will replace the previous item
     * <br> 🔘 Appears automatically if the item is in draft mode / not published.
     * <br> 📩 Parameters either one of these: 
     * [Id](xref:Api.Js.SxcJs.CommandParamsEntityById),
     * [In Block](xref:Api.Js.SxcJs.CommandParamsEntityInContentBlock),
     * [In List](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    publish = 'publish',

    /**
     * `remove` removes an item from a list of items.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    remove = 'remove',

    /**
     * `replace` opens the dialog to assign a different content-item in this slot on module-assigned content items
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandParamsEntityInList)
     * (auto-detected from context)
     */
    replace = 'replace',

    /**
     * `template-develop` opens the template-editor dialog in a new window.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    template = 'template',

    /**
     * old name
     * @internal
     */
    template_old_develop = 'template-develop',


    /**
     * `template-query` opens the pipeline/query-designer in a new window.
     * <br> 🔘 It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured. 
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    query = 'query',

    /**
     * old name
     * @internal
     */
    query_old_templateQuery = 'template-query',
    
    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    view = 'view',

    /**
     * old name
     * @internal
     */
    view_old_templateSettings = 'template-settings',

    /**
     * `system` opens the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required,
     * (auto-detected from context)
     */
    system = 'system',

    /**
     * old name
     * @internal
     */
    system_old_zone = 'zone',
}


// Experimental
// Goal is to probably split the command names
// and then make a new CommandNames which merges all the previous ones
// type All = CommandNames | CommandNamesEdit;