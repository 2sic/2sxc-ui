/**
 * @internal
 */
export interface AttrJsonUser {
  CanDevelop: boolean;

  // new v13
  CanAdmin: boolean;

  /**
   * user can switch editions; lower case!
   */
  canSwitchEdition: boolean;
}
