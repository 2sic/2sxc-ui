import { CommandContentTypeParams } from './command-content-type';
import { CommandParamsEntityById } from './command-params-entity';
/**
 * Parameters used for the command `copy`.
 * Will copy the entity on `entityId`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandCopyParams extends CommandContentTypeParams, CommandParamsEntityById {
}
