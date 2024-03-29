import { MetadataTargetTypes } from './target-types';
/** 
 * A Metadata-Target identifier to tell an entity that it describes something else.
 * 
 * Usually used in Sxc instances with the [Data Service](xref:Api.Js.SxcJs.SxcData)
 * 
 * Warning: There is another MetadataFor type and they are not fully consistent. 
 * This is historical and not easy to correct, but we're working on it. 
 * @public
 */
export interface MetadataFor {
  /**
   * The target type identifier 
   * - TODO: @2dm - THIS SHOULD probably be number only
   */
  Target: string | MetadataTargetTypes;

  /**
   * The number of the target, if it's identified by a number.
   */
  Number?: number;

  /**
   * The string-id of the target, if it's identified by a string.
   */
  String?: string;

  /**
   * The GUID of the target, if it's identified by a GUID.
   */
  Guid?: string;

  /**
   * @internal
   */
  Singleton?: boolean;
}
  