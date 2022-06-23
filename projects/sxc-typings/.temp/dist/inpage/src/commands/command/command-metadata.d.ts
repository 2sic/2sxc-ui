import { Command, CommandParamsEntityById } from '..';
import { CommandParamsMetadata } from '../../../../$2sxc/src/cms';
import { CommandContentTypeParams } from './command-content-type';
/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 * @internal
 */
export declare const MetadataCommand: Command;
/**
 * @internal
 */
export declare const ImageMetadataCommand: Command;
/**
 * Parameters used for the command `metadata`.
 * <br>
 * Will do either one of these:
 * - if it has an `entityId`, will just open `edit` for that Entity
 * - if it has no `entityId`, will open `new` for the current `contentType`
 * and assign to the target specified by `metadata`:
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandMetadataParams extends CommandContentTypeParams, CommandParamsEntityById {
    /**
     * Target to assign the metadata to.
     */
    metadata: CommandParamsMetadata;
}
