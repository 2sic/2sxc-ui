
/**
 * Names of commands known to 2sxc CMS - for use in toolbars and calling commands directly from code
 */
export enum CommandNames {
    /**
     * `add` command open a `new` dialog to add a new item to a list of items
     * Note that this is similar to `new` but still not the same
     */
    add = 'add',

    /**
     * `add-existing` command to open a dialog allowing the user to select something to add to a list of items
     */
    addExisting = 'add-existing',

    /**
     * `app-import` command will open the dialog to import an App
     */
    appImport = 'app-import',


    /**
     * `copy` command will open the edit-dialog for the current item in copy-mode, so when saving it will be a new item
     *
     * To work, it also needs `contentTypeName`
     * WIP v14.02
     */
    copy = 'copy',

    /**
     * `edit` command will open the edit-dialog for the current item.
     * In scenarios where we have a list of items and it's currently showing the demo, this will have the same effect as `add`
     */
    edit = 'edit',

    // TODO: @2mh / 2dar - Move all the verbs here
    // 1. Create the variable using camelCase
    // 2. Use it in the command - but only for the command, not the icon
    // 3. Test where the old variable is still used - replace that
    // 4. remove the old variable
    // 5. change the export * in the index.ts to be an import with the @internal prefix
    // 5. Add minimal documentation what the command does to this document
    // 6. build to verify nothing breaks (best keep the watcher on)
}
