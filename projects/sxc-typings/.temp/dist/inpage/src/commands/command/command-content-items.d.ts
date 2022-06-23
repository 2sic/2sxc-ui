import { CommandContentTypeParams } from './command-content-type';
/**
 * Parameters used for the command `contentitems`.
 * <br>
 * The content-type name determines what items will be managed.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandContentItemsParams extends CommandContentTypeParams {
    /**
     * Filters to apply to the list of items.
     * <br>
     * Each property targets a field.
     * The value is a string, number or array for filtering EntityIds or EntityGuids
     */
    filters?: Record<string, string | number | string[] | number[]>;
}
