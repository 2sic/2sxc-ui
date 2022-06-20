import { CommandContentTypeParams } from './command-content-type';
/**
 * Parameters used for the command `add`.
 * <br>
 * The contentType name determines what items will be created.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandAddParams extends CommandContentTypeParams {
    /**
     * Determins the position where a new item will be added to.
     */
    sortOrder: number;
}
