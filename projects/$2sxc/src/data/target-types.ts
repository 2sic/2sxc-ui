/**
 * Metadata Target Types
 * 
 * These are constants to determine what something is assigned to (e.g. it describes an Entity, a file, etc.)
 * 
 * Use it for the @see MetadataFor objects
 * @public
 */
export enum MetadataTargetTypes {
  /** 
   * Undefined Type (0) - included for completeness.
   * Not usually used, actually None (1) is the default
   */
  Undefined = 0,

  /** 
   * Things that are not used as Metadata (1). This is the default for most Entities.
   */
  None = 1,

  /** 
   * Metadata of attributes / fields (2). This is used to store configuration like the field label, amount-of-rows, etc.
   * Remarks = 
   * The key is always a number (int) pointing to the Attribute ID in the DB.
   */
  Attribute = 2,

  /** 
   * App metadata (3). Used to give Apps additional properties. 
   * Remarks = 
   * The key should always be an int ID of the App.
   */
  App = 3,

  /** 
   * Metadata of entities / data-items (4). 
   * This lets us enhance entities with additional information. 
   * Remarks = 
   * The Key should always be a GUID
   */
  Entity = 4,

  /** 
   * Metadata of a content-type / data-schema (5). Used to give it a description etc. 
  */
  ContentType = 5,

  /** 
   * Zone metadata (6) - used to give a Zone additional information. 
   * Only used in very special cases, best not use.
   */
  Zone = 6,

  /** 
   * Item / Object of the Platform, like a File or Folder etc. (10)
   * Remarks = 
   * * The key is usually a string to further specify what it's describing, like "file:72"
   * * The text equivalent is CmsObject
   */
  CmsItem = 10,

  /** 
   * The entire system / platform - so Metadata for the current Dnn/Oqtane installation (11).
   * Remarks = 
   * This is not in use as of now, just added for completeness sakes.
   * New in v13
   */
  System = 11,

  /** 
   * A Site - like the current site (12)
   * Remarks = New in v13</remarks>
   */
  Site = 12,

  /** 
   * A Site - like the current site (13)
   * Remarks = New in v13 / beta</remarks>
   */
  // [PrivateApi]
  SiteVariant = 13,

  /** 
   * A Page - like the current page (14)
   * Remarks = New in v13</remarks>
   */
  Page = 14,

  /** 
   * A Page - like the current page (15) 
   * Remarks = New in v13 / beta</remarks>
   */
  // [PrivateApi]
  PageVariant = 15,

  /** 
   * A Module - like a module containing some content (16) 
   * Remarks = New in v13</remarks>
   */
  Module = 16,

  /** 
   * A Module - like a module containing some content (17)
   * Remarks = New in v13 / beta</remarks>
   */
  // [PrivateApi]
  ModuleVariant = 17,

  /** 
   * A User - like the admin-user (18)
   * Remarks = New in v13</remarks>
   */
  User = 18,

  /** Custom target (90). This is what you should use for basic apps which have a custom target that's none of the other defaults. */
  Custom = 90,

  /** Custom target (91). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom1 = 91,
  /** Custom target (92). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom2 = 92,
  /** Custom target (93). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom3 = 93,
  /** Custom target (94). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom4 = 94,
  /** Custom target (95). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom5 = 95,
  /** Custom target (96). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom6 = 96,
  /** Custom target (97). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom7 = 97,
  /** Custom target (98). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom8 = 98,
  /** Custom target (99). Use this for basic apps which need multiple different custom targets (advanced, rare use case) */
  Custom9 = 99,
}
