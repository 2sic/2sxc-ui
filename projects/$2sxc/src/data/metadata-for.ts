/** 
 * A Metadata-Target identifier to tell an entity that it describes something else
 */
export interface MetadataFor {
  /**
   * The target type identifier - TODO @2dm - THIS SHOULD probably be number only
   */
  Target: string | number;

  /**
   * The number of the target, if it's identified by a number.
   * @type {number}
   * @memberof MetadataFor
   */
  Number?: number;

  /**
   * The string-id of the target, if it's identified by a string.
   * @type {string}
   * @memberof MetadataFor
   */
  String?: string;

  /**
   * The GUID of the target, if it's identified by a GUID.
   * @type {string}
   * @memberof MetadataFor
   */
  Guid?: string;

  /**
   * @internal
   */
  Singleton?: boolean;
}
  