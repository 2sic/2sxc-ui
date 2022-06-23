import { ContextComplete } from '../../context';
/**
 * Parameters used for the command `contenttype`.
 * <br>
 * The content-type name determines what items will be loaded to manage the fields.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandContentTypeParams {
    /**
     * The content-type name
     */
    contentType: string;
}
/**
 * @internal
 */
export declare function createContentTypeParams(context: ContextComplete): CommandContentTypeParams;
