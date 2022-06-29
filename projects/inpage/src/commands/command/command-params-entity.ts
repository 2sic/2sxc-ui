
/**
 * Parameters used for commands which address a specificy entity.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
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
 * @public
 */
 export interface CommandParamsEntityInContentBlock {
  /**
   * Determins the position of the item in the list.
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
 export interface CommandParamsEntityInList {
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
 * Parameters used for commands which need an entity ID or a list-reference.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
// tslint:disable-next-line: align
export interface CommandParamsEntity extends CommandParamsEntityById, CommandParamsEntityInContentBlock, CommandParamsEntityInList {

}
