/* 
  This is the base class for the Manage object on 2sxc instances.
  It's typed here, so that API code is strongly typed, but it's incomplete.
*/

/** @internal */
export interface SxcInstanceManage {
  /**
   * The context contains information about the Sxc Instance, like module-id, etc.
   */
  context: any;

  /**
   * This checks / reports whether the API is in edit mode.
   * Used to enabled/disable various features
   */
  _isEditMode(): boolean;
}
