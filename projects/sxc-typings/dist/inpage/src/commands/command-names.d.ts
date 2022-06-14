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
     * `copy` command will open the edit-dialog for the current item in copy-mode, so when saving it will be a new item
     *
     * To work, it also needs `contentTypeName`
     * WIP v14.02
     */
    copy = "copy",
    /**
     * `edit` command will open the edit-dialog for the current item.
     * In scenarios where we have a list of items and it's currently showing the demo, this will have the same effect as `add`
     */
    edit = "edit"
}
