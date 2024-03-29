import { CommandParamsMetadata } from '../../../../$2sxc/src/cms/command-params-metadata';
import { CommandParamsEntityById, CommandParamsEntityInContentBlock, CommandParamsEntityInList } from './command-params-entity';


/**
 * Parameters used for the command `contenttype`.
 * <br>
 * The content-type name determines what items will be loaded to manage the fields.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export interface CommandContentTypeParams {
  /**
   * The content-type name
   */
  contentType: string;
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
export interface CommandAddParams extends
  CommandContentTypeParams,
  Pick<CommandParamsEntityInList, 'index'>,
  Partial<Omit<CommandParamsEntityInList, 'index'>>,
  Partial<Omit<CommandParamsEntityInContentBlock, 'index'>> {
}

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
// tslint:disable-next-line: no-empty-interface
export interface CommandAddExistingParams extends CommandAddParams {
}



/**
 * Parameters used for the command `data`.
 * <br>
 * The content-type name determines what items will be managed.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export interface CommandDataParams extends CommandContentTypeParams {
  /**
   * Filters to apply to the list of items.
   * <br>
   * Each property targets a field.
   * The value is a string, number or array for filtering EntityIds or EntityGuids
   */
  filters?: Record<string, string | number | string[] | number[]>;
  // TODO: TRY TO RENAME TO filter (without s) as this is how we use it elsewhere
}


/**
 * Parameters used for the command `copy`.
 * Will copy the entity on `entityId`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export interface CommandCopyParams extends CommandContentTypeParams, CommandParamsEntityById {
}



/**
 * Parameters used for the _old_ command `custom` on toolbars.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @internal - keep for reference, but don't communicate
 */
export interface CommandCustomParams {
  /**
   * Name of the function to call - must be available in the context.
   * This is usually as a function window. Example:
   * <br>
   * If `call` is `sayHello` you need a `window.sayHello(context, event)`.
   */
  call: string;

  /**
   * **OBSOLETE - avoid using**
   * <br>
   * JavaScript as string containing the code to execute.
   * This is the old V9 - it contains a function, not a name
   * @deprecated
   */
  customCode: string;
}

/**
 * Parameters used for the command `code` on toolbars (new in v14.4).
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
 */
export interface CommandCodeParams {
  /**
   * Name of the function to call - must be available in the context.
   * This is usually as a function window. Example:
   * <br>
   * If `call` is `sayHello` you need a `window.sayHello(params, context, event)`.
   */
  call: string;
}


/**
 * Parameters used for the command `delete`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 * @public
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
export interface CommandMetadataParams extends CommandContentTypeParams, CommandParamsEntityById {
  /**
   * Target to assign the metadata to.
   */
  metadata: CommandParamsMetadata;
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
// tslint:disable-next-line: no-empty-interface
export interface CommandNewParams extends CommandContentTypeParams, Partial<CommandParamsEntityInList>, Partial<CommandParamsEntityInContentBlock> {
  /**
   * Optional values to prefill in the new-form
   */
  prefill?: Record<string, boolean | string | number>;
}
