/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 */
export declare enum CommandNames {
    /**
     * `add` command open a `new` dialog to add a new item to a list of items
     * Note that this is similar to `new` but still not the same
     */
    add = "add",
    /**
     * `add-existing` command to open a dialog allowing the user to select something to add to a list of items
     */
    addExisting = "add-existing",
    /**
     * `app-import` command will open the dialog to import an App
     */
    appImport = "app-import",
    /**
     * `app-resources` will open the edit for app-resources (multi-language texts, labels etc.). It's disabled if the app doesn't have resource-values to configure
     */
    appResources = "app-resources",
    /**
     * `app-settings` will open the edit dialog for the app-settings. It's disabled if the app doesn't have setting-values to configure
     */
    appSettings = "app-settings",
    /**
     * `app` will open the app-admin dialog
     */
    app = "app",
    /**
     * `apps` will open the manage all apps dialog
     */
    apps = "apps",
    /**
     * `contentitems` will open the dialog to manage content-items for the current template. Will use the settings of the current template to open.
     *  contentType (optional) - name of data-type to manage/open
     */
    contentItems = "contentitems",
    /**
     * `contenttype` will open the dialog to view or change the current content-type, meaning you can change what fields it has, their types etc
     */
    contentType = "contenttype",
    /**
     * `copy` command will open the edit-dialog for the current item in copy-mode, so when saving it will be a new item
     *
     * To work, it also needs `contentTypeName`
     * WIP v14.02
     */
    copy = "copy",
    /**
     * `custom` will execute custom javascript
     * customCode - some JS like "alert('hello');"
     */
    custom = "custom",
    /**
     * `delete` will delete (not just remove) a content-item. Needs:
     * entityId
     * entityGuid
     * entityTitle
     */
    delete = "delete",
    /**
     * `edit` command will open the edit-dialog for the current item.
     * In scenarios where we have a list of items and it's currently showing the demo, this will have the same effect as `add`
     */
    edit = "edit",
    /**
     * `insights-server` command will open the insights logs page
     */
    insightsServer = "insights-server",
    /**
     * `instance-list` command will open a dialog to manually re-order items in a list. (note: in older versions was called "sort"
     */
    instanceList = "instance-list",
    /**
     * `layout` command will open the in-page dialog to change the layout of the current content.
     * [no parameters needed]
     */
    layout = "layout",
    /**
     * `metadata` command will open the edit-dialog for the current metadata item
     */
    metadata = "metadata",
    /**
     * `image` command will open the edit-dialog for the metadata of the current image
     */
    image = "image",
    /**
     * `more` command create a "…" button which flips through the menu-buttons of toolbars
     */
    more = "more",
    /**
     * `movedown` command moves a content-item down one position in the list
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     */
    moveDown = "movedown",
    /**
     * `moveup` command moves a content-item up one position in the list
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     */
    moveUp = "moveup",
    /**
     * `new` command opens the edit-dialog for a new content-item.
     * contentType
     *
     * Then it needs either the ID...:
     * entityId
     *
     * ...or it needs the position within the list:
     * useModuleList: true
     * sortOrder: [number] (important so it knows the position
     */
    new = "new",
    /**
     * `new` command sets new mode used in parameters
     */
    newMode = "new",
    /**
     * `publish` command tells the system to update a content-items status to published. If there was a published and a draft before, the draft will replace the previous item
     */
    publish = "publish",
    /**
     * `remove` command removes an item from a list of items.
     * useModuleList: true (required to be true for it to work)
     * sortOrder: [number] (important so it knows the position)
     */
    remove = "remove",
    /**
     * `replace` command will open the dialog to assign a different content-item in this slot on module-assigned content items
     */
    replace = "replace",
    /**
     * `template-develop` will open the template-editor dialog in a new window. (note: in older versions was called "develop")
     */
    templateDevelop = "replace",
    /**
     * `template-query` will open the pipeline/query-designer in a new window. It's invisible on content, and disabled if no pipeline is configured
     */
    templateQuery = "template-query",
    /**
     * `template-settings` will change settings on the template currently used
     */
    templateSettings = "template-settings",
    /**
     * `zone` will open the manage all apps dialog
     */
    zone = "zone"
}
