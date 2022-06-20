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
     * `add` opens a `new` dialog to create and add a new item to a **list of items**.
     * <br> The new item is placed after the item the (+) was clicked on.
     * <br>💡
     * This is similar to `new` but also adds the item to the existing list of items shown on the page.
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
     * <br> 📩 No params required, auto-detects all from context.
     */
    app = 'app',

    /**
     * `app-import` opens the dialog to import an App.
     * <br> 🔘 This is not available on the toolbar.
     * <br> 📩 No params required, auto-detects all from context.
     */
    appImport = 'app-import',

    /**
     * `app-resources` opens the edit dialog for app-resources (multi-language texts, labels etc.).
     * <br> 🔘
     * It's disabled on the toolbar if the app doesn't have resource-values to configure.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects all from context.
     */
    appResources = 'app-resources',

    /**
     * `app-settings` opens the edit dialog for the app-settings.
     * <br> 🔘
     * It's disabled on the toolbar if the app doesn't have setting-values to configure
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects all from context.
     */
    appSettings = 'app-settings',

    /**
     * `apps` opens the manage all apps dialog.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects based on the groups in the toolbar.
     */
    apps = 'apps',

    /**
     * `contentitems` opens the list to manage all items of a specific content-type.
     * <br> 🔘
     * Will use the settings of the current template to open.
     * It is only shown to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentItemsParams)
     */
    contentItems = 'contentitems',

    /**
     * `contenttype` opens the dialog to view or modify fields of a content-type.
     * <br> 🔘
     * On a toolbar it will use the content-type of the current item.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
     */
    contentType = 'contenttype',

    /**
     * `copy` opens the edit-dialog for the current item in copy-mode, so when saving it will be a new item.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCopyParams)
     * <br> 🆕 in v14.03
     */
    copy = 'copy',

    /**
     * `custom` will execute custom javascript.
     * <br> 🔘 This is mainly for toolbars, to add buttons with custom code.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandCustomParams)
     */
    custom = 'custom',

    /**
     * `delete` will delete (not just remove) a content-item.
     * <br> 💡 This is similar to `remove` but really deletes the data from the DB.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandDeleteParams) - will auto-detect from context
     */
    delete = 'delete',

    /**
     * `edit` opens an edit-dialog.
     * <br>
     * In scenarios where the page is currently showing a demo item, this will have the same effect as `add`
     */
    edit = 'edit',

    /**
     * `image` opens the edit-dialog for the metadata of the current image
     * @internal - may be removed soon
     */
     image = 'image',

    /**
     * `insights-server` opens the insights logs page
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required.
     */
    insightsServer = 'insights-server',

    /**
     * `instance-list` opens a dialog to manually re-order **items in a list**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 No params required, auto-detects all from context.
     */
    instanceList = 'instance-list',

    /**
     * `layout` opens the in-page dialog to change the layout of the current content.
     * <br> 📩 No params required, auto-detects all from context.
     */
    layout = 'layout',

    /**
     * `metadata` opens the edit-dialog for the current metadata item.
     * <br> 🔘 It only appears if the toolbar explicitly asks for it.
     */
    metadata = 'metadata',

    /**
     * `more` create a "…" (ellipsis) button which flips through the button groups of toolbars
     * <br> 🔘 It only appears if the toolbar has `more`=`auto` and has multiple groups.
     * <br> 📩 No params required, auto-detects based on the groups in the toolbar.
     */
    more = 'more',

    /**
     * `movedown` moves a content-item down one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandMoveParams) - will auto-detect from context
     * <br> ⚠️ do not use parameters custom code, we plan to change the signature
     */
    moveDown = 'movedown',

    /**
     * `moveup` moves a content-item up one position in a **list of items**.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandMoveParams) - will auto-detect from context
     * <br> ⚠️ do not use parameters code, we plan to change the signature
     */
    moveUp = 'moveup',

    /**
     * `new` opens the edit-dialog for a new content-item.
     * <br>
     * It will only create an item, not add it to a list. 
     * For that you would need to use `add`
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandContentTypeParams)
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
     */
    publish = 'publish',

    /**
     * `remove` removes an item from a list of items.
     * <br> 🪜 Only appears on toolbars of items which are in a list.
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandMoveParams) - will auto-detect from context
     * <br> ⚠️ do not use parameters custom code, we plan to change the signature
     */
    remove = 'remove',

    /**
     * `replace` opens the dialog to assign a different content-item in this slot on module-assigned content items
     * <br> 📩 [Parameters](xref:Api.Js.SxcJs.CommandReplaceParams) - will auto-detect from context
     * <br> ⚠️ do not use parameters custom code, we plan to change the signature
     */
    replace = 'replace',

    /**
     * `template-develop` opens the template-editor dialog in a new window.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects all from context.
     */
    templateDevelop = 'template-develop',

    /**
     * `template-query` opens the pipeline/query-designer in a new window.
     * <br> 🔘It's not available on the simple Content App, only on full Apps.
     * It is disabled if no query is configured. 
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects all from context.
     */
    templateQuery = 'template-query',

    /**
     * `template-settings` will change settings on the template currently used
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     */
    templateSettings = 'template-settings',

    /**
     * `zone` opens the system dialog for this zone/site.
     * <br> 🔐 Toolbar shows this automatically to elevated admins.
     * <br> 📩 No params required, auto-detects all from context.
     */
    zone = 'zone',
}


// Experimental
// Goal is to probably split the command names
// and then make a new CommandNames which merges all the previous ones
// type All = CommandNames | CommandNamesEdit;