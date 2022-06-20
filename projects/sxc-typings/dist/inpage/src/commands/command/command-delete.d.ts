/**
 * Parameters used for the command `delete`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandDeleteParams {
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
