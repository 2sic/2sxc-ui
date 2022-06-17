// Documentation notes
//
// You cannot use @see in the docs, it doesn't work with docFx
// Instead, always use [text](xref:Api.Js.SxcJs.CommandNames)
// or similar
//
// End documentation notes


/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 */
export enum CommandNames {
    /**
     * `add` command opens a `new` dialog to create and add a new item to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br>💡
     * This is similar to `new` but also adds the item to the existing list of items shown on the page.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddParams)
     */
    add = 'add',

    /**
     * `add-existing` command opens a dialog allowing the user to select an existing item to add to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandAddExistingParams)
     * <br> 🆕 in v11.01
     */
    addExisting = 'add-existing',

    /**
     * `app` will open the app-admin dialog
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    app = 'app',

    /**
     * `app-import` command will open the dialog to import an App.
     * <br> 🔘 This is not available on the toolbar.
     */
    appImport = 'app-import',

    /**
     * `app-resources` will open the edit dialog for app-resources (multi-language texts, labels etc.).
     * <br> 🔘
     * It's disabled on the toolbar if the app doesn't have resource-values to configure.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    appResources = 'app-resources',

    /**
     * `app-settings` will open the edit dialog for the app-settings.
     * <br> 🔘
     * It's disabled on the toolbar if the app doesn't have setting-values to configure
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    appSettings = 'app-settings',

    /**
     * `apps` will open the manage all apps dialog.
     * <br> 🔘
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    apps = 'apps',

    /**
     * `contentitems` will open the list to manage all items of a specific content-type.
     * <br> 🔘
     * Will use the settings of the current template to open.
     * It is only shown to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentItemsParams)
     */
    contentItems = 'contentitems',

    /**
     * `contenttype` will open the dialog to view or modify fields of a content-type.
     * <br> 🔘
     * On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    contentType = 'contenttype',

    /**
     * `copy` command will open the edit-dialog for the current item in copy-mode, so when saving it will be a new item.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCopyParams)
     * <br> 🆕 in v14.03
     */
    copy = 'copy',

    /**
     * `custom` will execute custom javascript.
     * <br> 🔘
     * This is mainly for toolbars, to add buttons with custom code.
     */
    custom = 'custom',

    /**
     * `delete` will delete (not just remove) a content-item.
     * <br>
     * 💡 This is similar to `remove` but really deletes the data from the DB.
     * <br> 🔘
     * It only appears if the toolbar explicitly asks for it.
     * <br>
     * Needs:
     * entityId
     * entityGuid
     * entityTitle
     */
    delete = 'delete',

    /**
     * `edit` command will open an edit-dialog.
     * <br>
     * In scenarios where the page is currently showing a demo item, this will have the same effect as `add`
     */
    edit = 'edit',

    /**
     * `image` command will open the edit-dialog for the metadata of the current image
     * @internal - may be removed soon
     */
     image = 'image',

    /**
     * `insights-server` command will open the insights logs page
     * <br> 🔘
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    insightsServer = 'insights-server',

    /**
     * `instance-list` command will open a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     */
    instanceList = 'instance-list',

    /**
     * `layout` command will open the in-page dialog to change the layout of the current content.
     * <br>
     * [no parameters needed]
     */
    layout = 'layout',

    /**
     * `metadata` command will open the edit-dialog for the current metadata item.
     * <br> 🔘
     * It only appears if the toolbar explicitly asks for it.
     */
    metadata = 'metadata',

    /**
     * `more` command create a "…" button which flips through the menu-buttons of toolbars
     */
    more = 'more',

    /**
     * `movedown` command moves a content-item down one position in a **list of items**.
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     * ⚠️ do not use this yet, we plan to change the parameters
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     */
    moveDown = 'movedown',

    /**
     * `moveup` command moves a content-item up one position in a **list of items**.
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     * ⚠️ do not use this yet, we plan to change the parameters
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     */
    moveUp = 'moveup',

    /**
     * `new` command opens the edit-dialog for a new content-item.
     * <br>
     * It will only create an item, not add it to a list. 
     * For that you would need to use `add`
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    new = 'new',

    /**
     * `new` command sets new mode used in parameters
     * @internal - must move, this shouldn't be here as it's not a command!
     */
    newMode = 'new',

    /**
     * `publish` command tells the system to update a content-items status to published. If there was a published and a draft before, the draft will replace the previous item
     * <br> 🔘 Appears automatically if the item is in draft mode.
     * Only appears on the toolbar if the item is not published.
     */
    publish = 'publish',

    /**
     * `remove` command removes an item from a list of items.
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     */
    remove = 'remove',

    /**
     * `replace` command will open the dialog to assign a different content-item in this slot on module-assigned content items
     */
    replace = 'replace',

    /**
     * `template-develop` will open the template-editor dialog in a new window.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    templateDevelop = 'template-develop',

    /**
     * `template-query` will open the pipeline/query-designer in a new window.
     * <br> 🔘It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured. 
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    templateQuery = 'template-query',

    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    templateSettings = 'template-settings',

    /**
     * `zone` will open the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    zone = 'zone',
}


// Experimental
// Goal is to probably split the command names
// and then make a new CommandNames which merges all the previous ones
// type All = CommandNames | CommandNamesEdit;