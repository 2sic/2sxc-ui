/**
 * Parameters used for commands which address a specificy entity.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandParamsEntityById {
    /**
     * ID of item to edit.
     */
    entityId: number;
}
/**
 * Parameters used for command which expect an item from a list of a ContentBlock.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandParamsEntityInContentBlock {
    /**
     * Determins the position of the item in the list that will be edited.
     */
    sortOrder: number;
    /**
     * Must be true, to work on the module list.
     */
    useModuleList: true;
}
/**
 * Parameters used for command which expect an item in a list (field) of a parent.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandParamsEntityInList {
    /**
     * Determins the position of the item in the list that will be edited.
     */
    sortOrder: number;
    /**
     * Parent entity GUID.
     */
    parent: string;
    /**
     * Parent Entity field(s) name(s).
     */
    fields: string;
}
/**
 * Parameters used for commands which need an entity ID or a list-reference.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandParamsEntity extends CommandParamsEntityById, CommandParamsEntityInContentBlock {
}
